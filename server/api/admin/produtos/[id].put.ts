import { updateCatalogItem } from '../../../utils/catalog'

export default defineEventHandler(async (event) => {
  if (getCookie(event, 'belli_admin') !== 'authenticated') throw createError({ statusCode: 401, statusMessage: 'Não autorizado' })
  const id = Number(getRouterParam(event, 'id'))
  const body = await readBody<{ preco?: number; ativo?: boolean; estoque_atual?: number | null }>(event)
  const config = useRuntimeConfig(event)
  const values = { preco: Number(body.preco), ativo: Boolean(body.ativo), estoque_atual: body.estoque_atual === null || body.estoque_atual === undefined ? null : Number(body.estoque_atual) }
  const updated = await updateCatalogItem(config.databaseUrl, id, values)
  if (!updated) throw createError({ statusCode: 404, statusMessage: 'Produto não encontrado' })
  return updated
})
