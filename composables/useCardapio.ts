export const useCardapio = () => {
  const nuxtApp = useNuxtApp()
  // reaproveita o payload entre navegações em vez de refazer a chamada
  const { data, pending, error, refresh } = useFetch('/api/cardapio', {
    key: 'cardapio',
    getCachedData: (key) => nuxtApp.payload.data[key] ?? nuxtApp.static.data[key]
  })
  return { categorias: computed(() => data.value?.categorias || []), pending, error, refresh }
}
