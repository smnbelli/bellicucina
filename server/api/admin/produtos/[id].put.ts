import { updateCatalogItem } from '../../../utils/catalog'
import { requireAdmin } from '../../../utils/auth'

export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ preco?: number; ativo?: boolean; estoque_atual?: number | null }>(event)
  const config = useRuntimeConfig(event)
  const values = { preco: Number(body.preco), ativo: Boolean(body.ativo), estoque_atual: body.estoque_atual === null || body.estoque_atual === undefined ? null : Number(body.estoque_atual) }
  const updated = await updateCatalogItem(config.databaseUrl, id, values)
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
  return updated
})
