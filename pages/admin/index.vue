<script setup lang="ts">
const loggedIn = ref(false)
const password = ref('')
const loginError = ref('')
const saving = ref<number | null>(null)
const notice = ref('')
const selectedSlug = ref('')
const showNew = ref(false)
const showNewCategory = ref(false)
const showEditCategory = ref(false)
const modalField = ref<HTMLElement | null>(null)
const newCategory = reactive({ nome: '', slug: '', peso: '500g', preparo: '' })
const editCategory = reactive({ id: 0, nome: '', peso: '', preparo: '' })
const newProduct = reactive({ categoriaId: 0, sabor: '', preco: 0 })
const categoryCarousel = ref<HTMLElement | null>(null)
const dragStart = ref(0)
const scrollStart = ref(0)
const isDragging = ref(false)
const ignoreCategoryClick = ref(false)
const pointerActive = ref(false)
const showLeftFade = ref(false)
const showRightFade = ref(false)
const { data, refresh } = await useFetch<{ categorias: any[] }>('/api/admin/produtos', { immediate: false })
const selectedCategory = computed(() => data.value?.categorias.find(category => category.slug === selectedSlug.value) || data.value?.categorias[0])
const startDrag = (event: PointerEvent) => { if (!categoryCarousel.value) return; pointerActive.value = true; isDragging.value = false; dragStart.value = event.clientX; scrollStart.value = categoryCarousel.value.scrollLeft }
const dragCategories = (event: PointerEvent) => { if (!categoryCarousel.value || !pointerActive.value) return; if (Math.abs(event.clientX - dragStart.value) > 6) isDragging.value = true; if (isDragging.value) categoryCarousel.value.scrollLeft = scrollStart.value - (event.clientX - dragStart.value) }
const endCategoryDrag = () => { ignoreCategoryClick.value = isDragging.value; isDragging.value = false; pointerActive.value = false }
const selectAdminCategory = (slug: string) => { if (ignoreCategoryClick.value) { ignoreCategoryClick.value = false; return } selectedSlug.value = slug }
const slugify = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const openProductModal = () => { showNewCategory.value = false; showNew.value = true; nextTick(() => modalField.value?.focus()) }
const openCategoryModal = () => { showNew.value = false; showNewCategory.value = true; nextTick(() => modalField.value?.focus()) }
const openEditCategory = () => { if (!selectedCategory.value) return; Object.assign(editCategory, { id: selectedCategory.value.id, nome: selectedCategory.value.nome, peso: selectedCategory.value.peso, preparo: selectedCategory.value.preparo || '' }); showNew.value = false; showNewCategory.value = false; showEditCategory.value = true; nextTick(() => modalField.value?.focus()) }
const saveCategory = async () => { await $fetch(`/api/admin/categorias/${editCategory.id}`, { method: 'PUT', body: { nome: editCategory.nome, peso: editCategory.peso, preparo: editCategory.preparo } }); showEditCategory.value = false; await refresh(); selectedSlug.value = data.value?.categorias.find(category => category.id === editCategory.id)?.slug || selectedSlug.value; notice.value = 'Categoria atualizada.' }
const closeModal = () => { showNew.value = false; showNewCategory.value = false; showEditCategory.value = false }
const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') closeModal() }
const updateCategoryFades = () => { if (!categoryCarousel.value) return; showLeftFade.value = categoryCarousel.value.scrollLeft > 1; showRightFade.value = categoryCarousel.value.scrollLeft + categoryCarousel.value.clientWidth < categoryCarousel.value.scrollWidth - 1 }
onMounted(() => { window.addEventListener('pointerup', endCategoryDrag); window.addEventListener('resize', updateCategoryFades); window.addEventListener('keydown', closeOnEscape); nextTick(updateCategoryFades) })
onBeforeUnmount(() => { window.removeEventListener('pointerup', endCategoryDrag); window.removeEventListener('resize', updateCategoryFades); window.removeEventListener('keydown', closeOnEscape) })
watch(data, () => nextTick(updateCategoryFades))

const login = async () => {
    loginError.value = ''
    try {
        await $fetch('/api/admin/login', { method: 'POST', body: { password: password.value }, credentials: 'include' })
        loggedIn.value = true
        await refresh()
        selectedSlug.value = data.value?.categorias[0]?.slug || ''
    } catch (error: any) { loginError.value = error?.data?.message || error?.data?.statusMessage || 'Não foi possível entrar no painel.' }
}
const saveAll = async () => {
    notice.value = ''
    try {
        const items = data.value?.categorias.flatMap(category => category.itens).map(item => ({ id: item.id, preco: Number(item.preco), ativo: item.ativo, estoque_atual: item.estoque_atual === '' ? null : item.estoque_atual })) || []
        saving.value = -1
        await Promise.all([
            $fetch('/api/admin/produtos', { method: 'PUT', body: { items } }),
            selectedCategory.value?.id ? $fetch(`/api/admin/categorias/${selectedCategory.value.id}`, { method: 'PUT', body: { preparo: selectedCategory.value.preparo } }) : Promise.resolve()
        ])
        notice.value = 'Todas as alterações foram salvas.'
    } catch { notice.value = 'Não foi possível salvar as alterações.' } finally { saving.value = null }
}
const addCategory = async () => {
    await $fetch('/api/admin/categorias', { method: 'POST', body: { ...newCategory, slug: slugify(newCategory.nome) } })
    Object.assign(newCategory, { nome: '', slug: '', peso: '500g', preparo: '' })
    showNewCategory.value = false
    await refresh()
    selectedSlug.value = data.value?.categorias.at(-1)?.slug || ''
    notice.value = 'Nova massa incluída.'
}
const addProduct = async () => {
    await $fetch('/api/admin/produtos', { method: 'POST', body: newProduct })
    const categorySlug = data.value?.categorias.find(category => category.id === newProduct.categoriaId)?.slug
    Object.assign(newProduct, { categoriaId: 0, sabor: '', preco: 0 })
    showNew.value = false
    await refresh()
    selectedSlug.value = categorySlug || data.value?.categorias[0]?.slug || ''
    notice.value = 'Nova massa incluída.'
}
const logout = async () => { await $fetch('/api/admin/logout', { method: 'POST' }); loggedIn.value = false; data.value = undefined }
</script>
<template>
    <div class="mx-auto max-w-6xl px-5 py-14">
        <div v-if="!loggedIn" class="mx-auto max-w-md border border-forest/15 bg-white/40 p-8">
            <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Área restrita</p>
            <h1 class="display mt-3 text-4xl font-bold text-forest">Painel Belli.</h1>
            <p class="mt-3 text-sm text-ink/60">Entre para atualizar preços e disponibilidade do cardápio.</p>
            <form class="mt-8" @submit.prevent="login"><label class="text-sm font-bold"
                    for="password">Senha</label><input id="password" v-model="password" type="password"
                    class="mt-2 w-full border border-forest/20 bg-cream px-4 py-3 outline-none focus:border-tomato"
                    placeholder="Sua senha" />
                <p v-if="loginError" class="mt-2 text-sm text-tomato">{{ loginError }}</p><button
                    class="mt-5 w-full rounded-full bg-forest px-5 py-3 font-bold text-white hover:bg-tomato">Entrar</button>
            </form>
        </div>
        <template v-else>
            <div class="flex flex-col justify-between gap-5 border-b border-forest/15 pb-8 sm:flex-row sm:items-end">
                <div>
                    <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Administração</p>
                    <h1 class="display mt-2 text-5xl font-bold text-forest">Controle do cardápio.</h1>
                </div>
                <div class="flex gap-4"><span v-if="notice" class="self-center text-sm font-bold text-leaf">{{ notice
                        }}</span><button class="text-sm font-bold text-tomato underline" @click="logout">Sair</button>
                </div>
            </div>
            <div class="mt-8 flex flex-wrap items-center gap-3">
                <div :class="[showLeftFade ? 'before:opacity-100' : 'before:opacity-0', showRightFade ? 'after:opacity-100' : 'after:opacity-0']"
                    class="relative max-w-full before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:z-10 before:w-8 before:bg-gradient-to-r before:from-cream before:to-transparent before:transition-opacity after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:top-0 after:z-10 after:w-8 after:bg-gradient-to-l after:from-cream after:to-transparent after:transition-opacity">
                    <div ref="categoryCarousel"
                        class="hide-scrollbar flex max-w-full touch-pan-y cursor-grab gap-2 overflow-x-auto pb-2 active:cursor-grabbing"
                        @pointerdown="startDrag" @pointermove="dragCategories" @pointerup="endCategoryDrag"
                        @pointercancel="endCategoryDrag" @scroll="updateCategoryFades"><button
                            v-for="categoria in data?.categorias" :key="categoria.slug" type="button"
                            class="shrink-0 rounded-full border px-4 py-2 text-sm font-bold"
                            :class="selectedCategory?.slug === categoria.slug ? 'border-tomato bg-tomato text-white' : 'border-forest/20'"
                            @click="selectAdminCategory(categoria.slug)">{{ categoria.nome }}</button></div>
                </div>
                <div class="flex gap-2"><button
                        class="rounded-full border border-forest px-4 py-2 text-sm font-bold text-forest"
                        @click="openProductModal">+ Nova massa</button><button
                        class="rounded-full bg-forest px-4 py-2 text-sm font-bold text-white"
                        @click="openCategoryModal">+ Nova categoria</button></div>
            </div>
            <div v-if="showNew || showNewCategory || showEditCategory"
                class="fixed inset-0 z-50 flex items-center justify-center bg-ink/45 p-4 backdrop-blur-sm" role="dialog"
                aria-modal="true" @click.self="closeModal">
                <form v-if="showNew"
                    class="grid max-h-[90vh] w-full max-w-2xl gap-4 overflow-y-auto border border-forest/15 bg-cream p-5 shadow-2xl sm:grid-cols-2"
                    @submit.prevent="addProduct">
                    <div class="flex items-center justify-between sm:col-span-2">
                        <h2 class="display text-2xl font-bold text-forest">Nova massa</h2><button type="button"
                            class="text-sm font-bold text-tomato underline" @click="closeModal">Fechar</button>
                    </div>
                    <div class="floating-field sm:col-span-2"><select ref="modalField"
                            v-model.number="newProduct.categoriaId" required
                            :class="{ 'has-value': newProduct.categoriaId }">
                            <option disabled :value="0">Selecione uma categoria</option>
                            <option v-for="categoria in data?.categorias" :key="categoria.id" :value="categoria.id">{{
                                categoria.nome }}</option>
                        </select><label>Categoria</label></div>
                    <div class="floating-field"><input id="product-sabor" v-model="newProduct.sabor" required
                            placeholder=" " /><label for="product-sabor">Sabor/recheio</label></div>
                    <div class="floating-field"><input id="product-preco" v-model.number="newProduct.preco" required
                            type="number" min="0" placeholder=" " /><label for="product-preco">Preço da porção</label>
                    </div>
                    <button class="rounded-full bg-forest px-5 py-3 font-bold text-white sm:col-span-2">Adicionar
                        massa</button>
                </form>
                <form v-if="showNewCategory"
                    class="grid max-h-[90vh] w-full max-w-2xl gap-4 overflow-y-auto border border-forest/15 bg-cream p-5 shadow-2xl sm:grid-cols-2"
                    @submit.prevent="addCategory">
                    <div class="flex items-center justify-between sm:col-span-2">
                        <h2 class="display text-2xl font-bold text-forest">Nova categoria</h2><button type="button"
                            class="text-sm font-bold text-tomato underline" @click="closeModal">Fechar</button>
                    </div>
                    <div class="floating-field"><input ref="modalField" id="category-nome" v-model="newCategory.nome"
                            required placeholder=" " /><label for="category-nome">Massa</label></div>
                    <div class="floating-field"><input id="category-peso" v-model="newCategory.peso" required
                            placeholder=" " /><label for="category-peso">Peso da porção</label></div>
                    <div class="floating-field sm:col-span-2"><textarea id="category-preparo"
                            v-model="newCategory.preparo" required rows="3" placeholder=" "></textarea><label
                            for="category-preparo">Modo de preparo da
                            categoria</label></div>
                    <div class="text-sm text-ink/60 sm:col-span-2">Depois de criar a categoria, use “Nova massa” para
                        adicionar os sabores e recheios.</div><button
                        class="rounded-full bg-forest px-5 py-3 font-bold text-white sm:col-span-2">Criar
                        categoria</button>
                </form>
                <form v-if="showEditCategory"
                    class="grid max-h-[90vh] w-full max-w-2xl gap-4 overflow-y-auto border border-forest/15 bg-cream p-5 shadow-2xl sm:grid-cols-2"
                    @submit.prevent="saveCategory">
                    <div class="flex items-center justify-between sm:col-span-2">
                        <h2 class="display text-2xl font-bold text-forest">Editar categoria</h2><button type="button"
                            class="text-sm font-bold text-tomato underline" @click="closeModal">Fechar</button>
                    </div>
                    <div class="floating-field"><input ref="modalField" id="edit-category-nome"
                            v-model="editCategory.nome" required placeholder=" " /><label for="edit-category-nome">Nome
                            da categoria</label></div>
                    <div class="floating-field"><input id="edit-category-peso" v-model="editCategory.peso" required
                            placeholder=" " /><label for="edit-category-peso">Peso da porção</label></div>
                    <div class="floating-field sm:col-span-2"><textarea id="edit-category-preparo"
                            v-model="editCategory.preparo" required rows="4" placeholder=" "></textarea><label
                            for="edit-category-preparo">Modo de preparo da categoria</label></div>
                    <button class="rounded-full bg-forest px-5 py-3 font-bold text-white sm:col-span-2">Salvar
                        categoria</button>
                </form>
            </div>
            <section v-if="selectedCategory" class="mt-10">
                <div class="flex items-baseline justify-between">
                    <div class="flex items-center gap-3">
                        <h2 class="display text-2xl font-bold text-forest">{{ selectedCategory.nome }}</h2><button
                            type="button"
                            class="inline-flex h-8 w-8 items-center justify-center rounded-full text-tomato transition hover:bg-tomato/10"
                            aria-label="Editar categoria" title="Editar categoria" @click="openEditCategory"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" aria-hidden="true">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                            </svg></button>
                    </div><span class="text-xs font-bold uppercase tracking-widest text-ink/50">{{ selectedCategory.peso
                        }}</span>
                </div>
                <div class="mt-3 overflow-x-auto border-y border-forest/10">
                    <div v-for="item in selectedCategory.itens" :key="item.id"
                        class="grid min-w-[760px] grid-cols-[1fr_120px_150px_130px_100px] items-center gap-4 border-b border-forest/10 py-3 last:border-0">
                        <span class="font-bold">{{ item.sabor }}</span><label class="text-xs text-ink/55">Preço<input
                                v-model.number="item.preco" type="number" min="0" step="1"
                                class="mt-1 w-full border border-forest/15 bg-cream px-2 py-2 font-bold" /></label><label
                            class="text-xs text-ink/55">Estoque <span class="text-[10px]">(vazio =
                                sob encomenda)</span><input v-model.number="item.estoque_atual" type="number" min="0"
                                class="mt-1 w-full border border-forest/15 bg-cream px-2 py-2 font-bold" /></label>
                        <div class="text-xs text-ink/55">Disponibilidade<strong
                                class="mt-1 block text-lg text-forest">{{ typeof item.estoque_atual === 'number' &&
                                    item.estoque_atual > 0 ? `${item.estoque_atual} pronta entrega` : 'Sob encomenda'
                                }}</strong></div><button
                            :class="item.ativo ? 'bg-leaf text-white' : 'bg-ink/10 text-ink/60'"
                            class="rounded-full px-3 py-2 text-xs font-bold" @click="item.ativo = !item.ativo">{{
                                item.ativo ? 'Ativo' : 'Pausado' }}</button>
                    </div>
                </div><button
                    class="mt-8 w-full rounded-full bg-tomato px-5 py-3 font-bold text-white disabled:opacity-50"
                    :disabled="saving === -1" @click="saveAll"><span v-if="saving === -1">Salvando...</span><span
                        v-else>Salvar todas as alterações</span></button>
            </section>
        </template>
    </div>
</template>
