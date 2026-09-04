import { createAdminSession } from '../../utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const config = useRuntimeConfig(event)
  if (!config.adminPassword) throw createError({ statusCode: 500, message: 'ADMIN_PASSWORD não configurada no ambiente de produção' })
  if (!config.adminSessionSecret || config.adminSessionSecret.length < 32) throw createError({ statusCode: 500, message: 'ADMIN_SESSION_SECRET ausente ou menor que 32 caracteres' })
  if (!body?.password || body.password !== config.adminPassword) throw createError({ statusCode: 401, message: 'Senha inválida' })
  createAdminSession(event)
  return { ok: true }
})
