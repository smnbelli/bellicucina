import { getDb } from '../../db'
import { produtos } from '../../db/schema'

export default defineEventHandler(async (event) => {
  if (getCookie(event, 'belli_admin') !== 'authenticated') throw createError({ statusCode: 401, statusMessage: 'Não autorizado' })
  const config = useRuntimeConfig(event)
  if (!config.databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
  const body = await readBody<{ categoriaId?: number; sabor?: string; preco?: number }>(event)
  if (!body.categoriaId || !body.sabor || body.preco === undefined) throw createError({ statusCode: 400, statusMessage: 'Preencha categoria, sabor/recheio e preço' })
  const [product] = await getDb(config.databaseUrl).insert(produtos).values({ categoriaId: Number(body.categoriaId), sabor: body.sabor, preco: Number(body.preco), ativo: true, estoqueAtual: null }).returning()
  return product
})
