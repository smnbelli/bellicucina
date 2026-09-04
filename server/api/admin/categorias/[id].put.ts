import { eq } from 'drizzle-orm'
import { getDb } from '../../../db'
import { categorias } from '../../../db/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const config = useRuntimeConfig(event)
  if (!config.databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ nome?: string; peso?: string; preparo?: string }>(event)
  if (!body.nome?.trim() || !body.peso?.trim() || !body.preparo?.trim()) throw createError({ statusCode: 400, statusMessage: 'Preencha nome, peso e modo de preparo' })
  const [category] = await getDb(config.databaseUrl).update(categorias).set({ nome: body.nome.trim(), pesoPadrao: body.peso.trim(), preparo: body.preparo.trim() }).where(eq(categorias.id, id)).returning({ id: categorias.id, nome: categorias.nome, peso: categorias.pesoPadrao, preparo: categorias.preparo })
  if (!category) throw createError({ statusCode: 404, statusMessage: 'Categoria não encontrada' })
  return category
})
