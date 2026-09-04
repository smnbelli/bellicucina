<script setup lang="ts">
defineProps<{ categoria: { slug: string; nome: string; peso: string; itens: any[]; preparo?: string } }>()
</script>
<template>
    <section :id="categoria.slug" class="scroll-mt-24">
        <div class="mb-2 flex items-end justify-between gap-4">
            <div class="flex min-w-0 items-center gap-3">
                <h2 class="menu-category-title display text-3xl font-bold text-forest">{{ categoria.nome }}</h2>
            </div><span class="shrink-0 text-sm font-bold uppercase tracking-widest text-tomato">{{ categoria.peso
                }}</span>
        </div>
        <p v-if="categoria.preparo" class="mb-2 text-sm text-ink/60">{{ categoria.preparo }}</p>
        <MenuItem v-for="item in categoria.itens" :key="item.sabor" :item="item" :categoria="categoria.nome" />
    </section>
</template>
