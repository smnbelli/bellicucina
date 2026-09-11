import { getCatalog, isAvailable } from '../utils/catalog'

// cache em memória por 60s: getCatalog faz join pesado no banco a cada chamada
export default defineCachedEventHandler(async (event) => { const config = useRuntimeConfig(event); setResponseHeader(event, 'Cache-Control', 'public, max-age=60, stale-while-revalidate=600'); const data = await getCatalog(config.databaseUrl); return { categorias: data.categorias.map(category => ({ ...category, itens: category.itens.filter(isAvailable) })) } }, { maxAge: 60, name: 'cardapio', getKey: () => 'public' })
