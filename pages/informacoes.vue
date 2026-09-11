<template>
    <div class="mx-auto max-w-4xl px-5 py-16">
        <p class="text-xs font-bold uppercase tracking-[.25em] text-tomato">Antes de pedir</p>
        <h1 class="display mt-3 text-5xl font-bold text-forest">Informações importantes.</h1>
        <div class="mt-12 grid gap-0 border-t border-forest/15">
            <div v-for="info in infos" :key="info.title"
                class="grid gap-3 border-b border-forest/15 py-8 sm:grid-cols-[180px_1fr] sm:items-center">
                <h2 class="display text-2xl font-bold text-forest">{{ info.title }}</h2>
                <p class="whitespace-pre-line leading-relaxed text-ink/70">{{ info.text }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">const infos = [
    { title: 'Antecedência', text: 'Trabalhamos com encomendas. Faça seu pedido com pelo menos 2 dias de antecedência para garantirmos tudo fresquinho.' },
    { title: 'Entrega', text: 'Consulte a taxa de entrega para o seu endereço pelo WhatsApp. Também é possível retirar diretamente conosco.\nEstamos localizados na Vila Formosa - São Paulo, SP.' },
    { title: 'Massas coloridas', text: 'Massas coloridas têm acréscimo de R$ 5,00 por porção ou quilo.\nSempre utilizamos corantes naturais como espinafre, beterraba, açafrão, pitaya e outros.' },
    { title: 'Conservação', text: 'Recomendamos a manutenção dos produtos congelados até 24 horas antes do consumo. Assim você preserva textura e sabor.' },
    { title: 'Validade', text: 'Não utilizamos conservantes artificiais, portanto nossos produtos CONGELADOS possuem validade de até 90 dias, e REFRIGERADOS de 3 dias.' }
]</script>
