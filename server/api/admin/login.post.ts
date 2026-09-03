export default defineEventHandler(async (event) => {
  const body = await readBody<{ password?: string }>(event)
  const config = useRuntimeConfig(event)
  if (!body?.password || body.password !== config.adminPassword) throw createError({ statusCode: 401, statusMessage: 'Senha inválida' })
  setCookie(event, 'belli_admin', 'authenticated', { httpOnly: true, sameSite: 'lax', secure: !import.meta.dev, maxAge: 60 * 60 * 24 * 7, path: '/' })
  return { ok: true }
})
