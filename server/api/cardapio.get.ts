import { getCatalog, isAvailable } from '../utils/catalog'

export default defineEventHandler(async (event) => { const config = useRuntimeConfig(event); const data = await getCatalog(config.databaseUrl); return { categorias: data.categorias.map(category => ({ ...category, itens: category.itens.filter(isAvailable) })) } })
