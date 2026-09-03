export const useCardapio = () => {
  const { data, pending, error, refresh } = useFetch('/api/cardapio')
  return { categorias: computed(() => data.value?.categorias || []), pending, error, refresh }
}
