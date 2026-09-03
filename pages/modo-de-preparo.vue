<script setup lang="ts">const { categorias, pending } = useCardapio()</script>
<template>
    <div class="mx-auto max-w-4xl px-5 py-16">
        <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Na cozinha</p>
        <h1 class="display mt-3 text-5xl font-bold text-forest">Modo de preparo.</h1>
        <p class="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65">Do congelador direto para a panela ou forno. Veja
            como preparar cada família de massa para preservar textura, recheio e sabor.</p>
        <div v-if="pending" class="py-20 text-center text-forest/60">Carregando instruções...</div>
        <div v-else class="mt-12 space-y-5">
            <article v-for="(categoria, index) in categorias" :key="categoria.slug"
                class="border border-forest/15 bg-white/20 p-7">
                <div class="flex items-start gap-5"><span class="text-sm font-bold text-tomato">{{ String(index +
                    1).padStart(2, '0') }}</span>
                    <div>
                        <h2 class="display text-2xl font-bold text-forest">{{ categoria.nome }}</h2>
                        <p class="mt-3 leading-relaxed text-ink/70">{{ categoria.preparo }}</p>
                        <!-- <p class="mt-4 border-l-2 border-gold pl-3 text-sm font-bold text-ink/60">Mantenha congelado até
                             o momento do preparo e sirva assim que finalizar.</p> -->
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>
