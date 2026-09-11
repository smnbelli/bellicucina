<template>
    <div class="mx-auto max-w-4xl px-5 py-16">
        <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Fale com a gente</p>
        <h1 class="display mt-3 text-5xl font-bold text-forest">Contato.</h1>
        <p class="mt-4 max-w-xl text-ink/65">Pedidos, dúvidas ou sugestões: nos chame pelo WhatsApp ou siga a gente no
            Instagram.</p>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
            <a :href="whatsappUrl" target="_blank" rel="noreferrer"
                class="flex items-center gap-4 border border-forest/15 bg-white/40 p-6 transition hover:border-tomato">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"
                    class="shrink-0 text-forest" aria-hidden="true">
                    <path
                        d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm5.83 14.27c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.32-.3.5-.15.18-.31.4-.44.53-.15.15-.3.31-.13.6.17.3.77 1.27 1.66 2.05 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45Z" />
                </svg>
                <div>
                    <p class="font-bold text-forest">WhatsApp</p>
                    <p class="text-sm text-ink/60">Peça direto pelo chat</p>
                </div>
            </a>
            <a :href="instagramUrl" target="_blank" rel="noreferrer"
                class="flex items-center gap-4 border border-forest/15 bg-white/40 p-6 transition hover:border-tomato">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="shrink-0 text-forest" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                <div>
                    <p class="font-bold text-forest">Instagram</p>
                    <p class="text-sm text-ink/60">Acompanhe novidades e bastidores</p>
                </div>
            </a>
        </div>
    </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig()
const whatsappUrl = computed(() => `https://wa.me/${config.public.whatsappNumber}`)
const instagramUrl = computed(() => config.public.instagramUrl)
</script>
