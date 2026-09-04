import { updateCatalogItems } from '../../utils/catalog'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const config = useRuntimeConfig(event)
  const body = await readBody<{ items?: Array<{ id: number; preco: number; ativo: boolean; estoque_atual: number | null }> }>(event)
  if (!body.items?.length) throw createError({ statusCode: 400, statusMessage: 'Nenhuma alteração enviada' })
  return updateCatalogItems(config.databaseUrl, body.items)
})