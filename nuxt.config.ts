export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: false },
  experimental: { appManifest: false },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || '',
    adminPassword: process.env.ADMIN_PASSWORD || 'belli2025',
    whatsappNumber: process.env.WHATSAPP_NUMBER || '5511967479054',
    public: {
      whatsappNumber: process.env.WHATSAPP_NUMBER || '5511967479054'
    }
  },
  app: {
    head: {
      title: 'Belli Cucina | Massas artesanais',
      meta: [{ name: 'description', content: 'Massas artesanais congeladas, feitas com carinho.' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo-laranja.svg' }]
    }
  }
})
