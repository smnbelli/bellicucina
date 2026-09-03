<script setup lang="ts">
const { items, isOpen, total, count, formatPrice, add, decrease, remove, clear, whatsappHref } = useCart()
</script>
<template>
    <Transition name="cart-fade">
        <div v-if="isOpen" class="fixed inset-0 z-40 bg-ink/35 backdrop-blur-sm" @click.self="isOpen = false">
            <aside class="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream p-6 shadow-2xl sm:p-8"
                aria-label="Carrinho de compras">
                <div class="flex items-center justify-between border-b border-forest/15 pb-5">
                    <div>
                        <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Seu pedido</p>
                        <h2 class="display mt-1 text-3xl font-bold text-forest">Carrinho <span
                                class="text-base text-ink/50">({{ count }})</span></h2>
                    </div><button type="button" aria-label="Fechar carrinho" class="text-2xl text-forest"
                        @click="isOpen = false">×</button>
                </div>
                <div v-if="!items.length" class="flex flex-1 flex-col items-center justify-center text-center">
                    <p class="display text-2xl font-bold text-forest">Seu carrinho está vazio.</p>
                    <NuxtLink to="/cardapio" class="mt-4 font-bold text-tomato underline" @click="isOpen = false">Ver
                        cardápio</NuxtLink>
                </div>
                <template v-else>
                    <div class="flex-1 divide-y divide-forest/10 overflow-y-auto">
                        <article v-for="item in items" :key="item.key" class="py-5">
                            <div class="flex justify-between gap-4">
                                <div>
                                    <h3 class="font-bold text-forest">{{ item.sabor }}</h3>
                                    <p class="mt-1 text-xs text-ink/60">{{ item.categoria }}</p>
                                </div><button type="button" class="text-xs font-bold text-tomato underline"
                                    @click="remove(item.key)">Remover</button>
                            </div>
                            <div class="mt-3 flex items-center justify-between">
                                <div class="flex items-center gap-3"><button type="button"
                                        class="h-8 w-8 rounded-full border border-forest/25 text-lg"
                                        aria-label="Diminuir quantidade" @click="decrease(item.key)">-</button><span
                                        class="w-5 text-center font-bold">{{ item.quantidade }}</span><button
                                        type="button" class="h-8 w-8 rounded-full border border-forest/25 text-lg"
                                        aria-label="Aumentar quantidade" @click="add(item)">+</button></div><strong>{{
                                            formatPrice(item.preco * item.quantidade) }}</strong>
                            </div>
                        </article>
                    </div>
                    <div class="border-t border-forest/15 pt-5">
                        <div class="flex items-center justify-between text-lg"><span
                                class="font-bold text-forest">Total</span><strong>{{ formatPrice(total) }}</strong>
                        </div><a :href="whatsappHref" target="_blank" rel="noreferrer"
                            class="mt-5 flex w-full items-center justify-center rounded-full bg-forest px-5 py-3 font-bold text-white hover:bg-tomato">Direcionar
                            para o WhatsApp ↗</a><button type="button"
                            class="mt-3 w-full text-xs font-bold text-ink/55 underline" @click="clear">Limpar
                            carrinho</button>
                    </div>
                </template>
            </aside>
        </div>
    </Transition>
</template>
<style scoped>
.cart-fade-enter-active,
.cart-fade-leave-active {
    transition: opacity .2s ease;
}

.cart-fade-enter-from,
.cart-fade-leave-to {
    opacity: 0;
}
</style>
