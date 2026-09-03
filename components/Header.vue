<template>
    <header class="border-b border-forest/10 bg-cream/95 sticky top-0 z-20 backdrop-blur">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <NuxtLink to="/" aria-label="Belli Cucina" class="flex h-12 w-44 items-center"><img src="/logo-laranja.svg"
                    alt="Belli Cucina" class="max-h-full max-w-full object-contain" /></NuxtLink>
            <nav class="hidden items-center gap-7 text-sm font-bold md:flex">
                <NuxtLink to="/cardapio" class="hover:text-tomato">Cardápio</NuxtLink>
                <NuxtLink to="/modo-de-preparo" class="hover:text-tomato">Preparo</NuxtLink>
                <NuxtLink to="/informacoes" class="hover:text-tomato">Informações</NuxtLink>
            </nav>
            <button v-if="count" type="button"
                class="rounded-full border border-forest px-4 py-2 text-sm font-bold text-forest"
                @click="isOpen = true">Carrinho ({{ count }})</button>
            <NuxtLink v-else to="/cardapio"
                class="rounded-full bg-tomato px-4 py-2 text-sm font-bold text-white transition hover:bg-forest">Pedir
                agora</NuxtLink>
        </div>
    </header>
</template>
<script setup lang="ts">
const { isOpen, count } = useCart()
</script>
