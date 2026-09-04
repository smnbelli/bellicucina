import { getDb } from '../../db'
import { categorias } from '../../db/schema'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const config = useRuntimeConfig(event)
  if (!config.databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
  const body = await readBody<{ nome?: string; slug?: string; peso?: string; preparo?: string }>(event)
  if (!body.nome || !body.slug || !body.peso || !body.preparo) throw createError({ statusCode: 400, statusMessage: 'Preencha nome, identificador, peso e modo de preparo' })
  const db = getDb(config.databaseUrl)
  const [category] = await db.insert(categorias).values({ nome: body.nome, slug: body.slug, pesoPadrao: body.peso, preparo: body.preparo || undefined }).returning({ id: categorias.id })
  return { category }
})