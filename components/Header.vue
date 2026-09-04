<template>
    <header class="relative border-b border-forest/10 bg-cream/95 sticky top-0 z-20 backdrop-blur">
        <div class="mx-auto flex min-w-0 max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-5 sm:py-4">
            <NuxtLink to="/" aria-label="Belli Cucina" class="flex h-10 w-20 shrink-0 items-center sm:h-12 sm:w-44"><img
                    src="/logo-preta.svg" alt="Belli Cucina" class="max-h-full max-w-full object-contain" /></NuxtLink>
            <button type="button"
                class="inline-flex h-10 w-10 items-center justify-center rounded-full text-forest md:hidden"
                :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'" :aria-expanded="menuOpen"
                @click="menuOpen = !menuOpen"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" aria-hidden="true">
                    <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16" />
                    <path v-else d="M6 6l12 12M18 6L6 18" />
                </svg></button>
            <nav
                class="hidden items-center gap-7 text-sm font-bold md:absolute md:left-1/2 md:flex md:-translate-x-1/2">
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
        <Transition name="mobile-menu">
            <nav v-if="menuOpen" class="border-t border-forest/10 bg-cream px-4 py-3 md:hidden">
                <NuxtLink to="/cardapio" class="block border-b border-forest/10 py-3 font-bold"
                    @click="menuOpen = false">Cardápio</NuxtLink>
                <NuxtLink to="/modo-de-preparo" class="block border-b border-forest/10 py-3 font-bold"
                    @click="menuOpen = false">Preparo</NuxtLink>
                <NuxtLink to="/informacoes" class="block py-3 font-bold" @click="menuOpen = false">Informações
                </NuxtLink>
            </nav>
        </Transition>
    </header>
</template>
<script setup lang="ts">
const { isOpen, count } = useCart()
const menuOpen = ref(false)
</script>
<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: opacity .18s ease, transform .18s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}
</style>
