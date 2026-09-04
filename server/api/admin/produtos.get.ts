import { getCatalog } from '../../utils/catalog'
import { requireAdmin } from '../../utils/auth'

export default defineEventHandler(async (event) => { requireAdmin(event); const config = useRuntimeConfig(event); return getCatalog(config.databaseUrl) })
