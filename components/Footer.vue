<template>
    <footer class="mt-20 border-t border-forest/10 bg-forest px-5 py-10 text-cream">
        <div class="mx-auto flex max-w-6xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div><img src="/logo-branca.svg" alt="Belli Cucina" width="112" height="64" loading="lazy" decoding="async"
                    class="h-16 w-28 object-contain object-left" />
                <p class="mt-1 text-sm text-cream/70">Massa artesanal para deixar o dia mais gostoso.</p>
            </div>
            <div class="flex items-center gap-5">
                <p class="text-sm text-cream/60">Feito em família, servido com carinho.</p>
                <NuxtLink to="/admin" aria-label="Acessar painel administrativo" title="Acessar painel administrativo"
                    class="inline-flex h-9 w-9 items-center justify-center rounded-full text-cream/35 transition hover:bg-cream/10 hover:text-cream/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        aria-hidden="true">
                        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
    </footer>
</template>
