import { eq } from 'drizzle-orm'
import { getDb } from '../../../db'
import { categorias } from '../../../db/schema'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const config = useRuntimeConfig(event)
  if (!config.databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
  const body = await readBody<{ ids?: number[] }>(event)
  if (!Array.isArray(body.ids) || !body.ids.length) throw createError({ statusCode: 400, statusMessage: 'Informe a lista de ids na nova ordem' })
  const db = getDb(config.databaseUrl)
  await db.transaction(async (tx) => {
    for (let index = 0; index < body.ids!.length; index++) await tx.update(categorias).set({ ordem: index }).where(eq(categorias.id, body.ids![index]))
  })
  return { updated: body.ids.length }
})
