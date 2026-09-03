import { getCatalog } from '../../utils/catalog'

export default defineEventHandler(async (event) => { if (getCookie(event, 'belli_admin') !== 'authenticated') throw createError({ statusCode: 401, statusMessage: 'Não autorizado' }); const config = useRuntimeConfig(event); return getCatalog(config.databaseUrl) })
