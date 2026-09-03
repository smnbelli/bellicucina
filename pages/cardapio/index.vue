<script setup lang="ts">
const { categorias, pending } = useCardapio()
const selectedSlug = ref('')
const carousel = ref<HTMLElement | null>(null)

onMounted(() => { if (!selectedSlug.value && categorias.value.length) selectedSlug.value = categorias.value[0].slug })
const selectedCategory = computed(() => categorias.value.find(category => category.slug === selectedSlug.value) || categorias.value[0])
const dragStart = ref(0)
const scrollStart = ref(0)
const isDragging = ref(false)
const ignoreClick = ref(false)
const pointerActive = ref(false)
const showLeftFade = ref(false)
const showRightFade = ref(false)
const drag = (event: PointerEvent) => { if (!carousel.value) return; pointerActive.value = true; isDragging.value = false; dragStart.value = event.clientX; scrollStart.value = carousel.value.scrollLeft }
const move = (event: PointerEvent) => { if (!carousel.value || !pointerActive.value) return; if (Math.abs(event.clientX - dragStart.value) > 6) isDragging.value = true; if (isDragging.value) carousel.value.scrollLeft = scrollStart.value - (event.clientX - dragStart.value) }
const endDrag = () => { ignoreClick.value = isDragging.value; isDragging.value = false; pointerActive.value = false }
const selectCategory = (slug: string) => { if (ignoreClick.value) { ignoreClick.value = false; return } selectedSlug.value = slug }
const updateFades = () => { if (!carousel.value) return; showLeftFade.value = carousel.value.scrollLeft > 1; showRightFade.value = carousel.value.scrollLeft + carousel.value.clientWidth < carousel.value.scrollWidth - 1 }
onMounted(() => { window.addEventListener('pointerup', endDrag); window.addEventListener('resize', updateFades); nextTick(updateFades) })
onBeforeUnmount(() => { window.removeEventListener('pointerup', endDrag); window.removeEventListener('resize', updateFades) })
</script>
<template>
    <div class="mx-auto max-w-6xl px-5 py-14">
        <div class="mb-10 max-w-2xl">
            <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Cardápio</p>
            <h1 class="display mt-3 text-5xl font-bold text-forest md:text-6xl">Feito para compartilhar.</h1>
            <p class="mt-4 text-ink/65">Escolha uma categoria para ver os sabores disponíveis e fale com a gente pelo
                WhatsApp.</p>
        </div>
        <div :class="[showLeftFade ? 'before:opacity-100' : 'before:opacity-0', showRightFade ? 'after:opacity-100' : 'after:opacity-0']"
            class="relative mb-14 before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:top-0 before:z-10 before:w-8 before:bg-gradient-to-r before:from-cream before:to-transparent before:transition-opacity after:pointer-events-none after:absolute after:bottom-0 after:right-0 after:top-0 after:z-10 after:w-8 after:bg-gradient-to-l after:from-cream after:to-transparent after:transition-opacity">
            <div ref="carousel"
                class="hide-scrollbar flex touch-pan-y cursor-grab gap-2 overflow-x-auto pb-3 active:cursor-grabbing"
                @pointerdown="drag" @pointermove="move" @pointerup="endDrag" @pointercancel="endDrag"
                @scroll="updateFades"><button v-for="categoria in categorias" :key="categoria.slug" type="button"
                    :data-category="categoria.slug"
                    class="shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition"
                    :class="selectedSlug === categoria.slug ? 'border-tomato bg-tomato text-white' : 'border-forest/20 hover:border-tomato hover:text-tomato'"
                    @click="selectCategory(categoria.slug)">{{ categoria.nome }}</button></div>
        </div>
        <div v-if="pending" class="py-20 text-center text-forest/60">Carregando sabores...</div>
        <Transition name="category-change" mode="out-in">
            <div v-if="selectedCategory" :key="selectedCategory.slug" class="fade-up">
                <MenuCategory :categoria="selectedCategory" />
            </div>
        </Transition>
    </div>
</template>
