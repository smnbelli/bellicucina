import { createAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const config = useRuntimeConfig(event)
  if (!config.adminPassword || !body?.password || body.password !== config.adminPassword) throw createError({ statusCode: 401, message: 'Senha inválida' })
  createAdminSession(event)
  return { ok: true }
})
