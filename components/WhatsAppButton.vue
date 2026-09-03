<script setup lang="ts">
const props = defineProps<{ sabor: string; categoria: string; preco: number }>()
const config = useRuntimeConfig()
const href = computed(() => `https://wa.me/${config.public.whatsappNumber}?text=${encodeURIComponent(`Olá, Belli Cucina! Quero pedir ${props.categoria} sabor ${props.sabor} (${formatPrice(props.preco)}).`)}`)
const formatPrice = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
</script>
<template><a :href="href" target="_blank" rel="noreferrer" class="inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-bold text-white transition hover:bg-tomato">Pedir pelo WhatsApp <span aria-hidden="true">↗</span></a></template>
