<script setup lang="ts">
const props = defineProps<{ item: { id?: number; sabor: string; preco: number; ativo?: boolean; estoque_atual?: number | null }; categoria: string }>()
const { add } = useCart()
const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const addToCart = () => add({ key: `${props.categoria}-${props.item.id || props.item.sabor}`, sabor: props.item.sabor, categoria: props.categoria, preco: props.item.preco })
</script>
<template>
    <article class="flex flex-col justify-between gap-4 border-b border-forest/10 py-5 sm:flex-row sm:items-center"
        :class="{ 'opacity-45': item.ativo === false }">
        <div>
            <div class="flex items-center gap-2">
                <h3 class="display text-xl font-bold">{{ item.sabor }}</h3><span
                    v-if="item.ativo !== false && typeof item.estoque_atual === 'number' && item.estoque_atual > 0"
                    class="availability-tooltip relative cursor-help text-sm font-bold text-leaf" tabindex="0"
                    aria-label="Item disponível para pronta entrega">●<span class="availability-tooltip-content">Pronta
                        entrega{{ item.estoque_atual !== null && item.estoque_atual !== '' ? `: ${item.estoque_atual}
                        unidades` : '' }}</span></span><span v-else-if="item.ativo !== false"
                    class="availability-tooltip relative cursor-help text-sm font-bold text-gold" tabindex="0"
                    aria-label="Item sob encomenda">●<span class="availability-tooltip-content">Sob encomenda:
                        <strong>faça seu pedido com antecedência</strong></span></span>
            </div>
            <p v-if="item.ativo === false" class="mt-1 text-xs font-bold uppercase tracking-widest text-tomato">
                Indisponível</p>
        </div>
        <div class="flex items-center justify-between gap-5 sm:justify-end"><strong class="text-lg">{{
            formatPrice(item.preco) }}</strong><button v-if="item.ativo !== false" type="button"
                class="rounded-full bg-forest px-4 py-2 text-xs font-bold text-white transition hover:bg-tomato"
                @click="addToCart">Adicionar ao carrinho</button></div>
    </article>
</template>
