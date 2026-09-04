<template>
    <header class="border-b border-forest/10 bg-cream/95 sticky top-0 z-20 backdrop-blur">
        <div class="mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-5 sm:py-4">
            <NuxtLink to="/" aria-label="Belli Cucina" class="flex h-10 w-20 shrink-0 items-center sm:h-12 sm:w-44"><img
                    src="/logo-preta.svg" alt="Belli Cucina" class="max-h-full max-w-full object-contain" /></NuxtLink>
            <nav class="hidden items-center gap-7 text-sm font-bold md:flex">
                <NuxtLink to="/cardapio" class="hover:text-tomato">Cardápio</NuxtLink>
                <NuxtLink to="/modo-de-preparo" class="hover:text-tomato">Preparo</NuxtLink>
                <NuxtLink to="/informacoes" class="hover:text-tomato">Informações</NuxtLink>
            </nav>
            <div class="ml-auto shrink-0">
                <button v-if="count" type="button"
                    class="rounded-full border border-forest px-3 py-2 text-xs font-bold text-forest sm:px-4 sm:text-sm"
                    @click="isOpen = true">Carrinho ({{ count }})</button>
                <NuxtLink v-else to="/cardapio"
                    class="rounded-full bg-tomato px-3 py-2 text-xs font-bold text-white transition hover:bg-forest sm:px-4 sm:text-sm">
                    Pedir
                    agora</NuxtLink>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">
const { isOpen, count } = useCart()
</script>
