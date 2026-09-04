import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'belli_admin'
const MAX_AGE = 60 * 60 * 24 * 7

const getSecret = (event: Parameters<typeof getCookie>[0]) => {
  const secret = useRuntimeConfig(event).adminSessionSecret
  if (!secret || secret.length < 32) throw createError({ statusCode: 500, message: 'ADMIN_SESSION_SECRET deve ter pelo menos 32 caracteres' })
  return secret
}

const sign = (value: string, secret: string) => createHmac('sha256', secret).update(value).digest('base64url')

export const createAdminSession = (event: Parameters<typeof getCookie>[0]) => {
  const issuedAt = Math.floor(Date.now() / 1000).toString()
  const payload = `${issuedAt}.${sign(issuedAt, getSecret(event))}`
  setCookie(event, COOKIE_NAME, payload, { httpOnly: true, sameSite: 'lax', secure: !import.meta.dev, maxAge: MAX_AGE, path: '/' })
}

export const clearAdminSession = (event: Parameters<typeof getCookie>[0]) => deleteCookie(event, COOKIE_NAME, { path: '/' })

export const requireAdmin = (event: Parameters<typeof getCookie>[0]) => {
  const value = getCookie(event, COOKIE_NAME)
  if (!value) throw createError({ statusCode: 401, message: 'Não autorizado' })
  const [issuedAt, signature] = value.split('.')
  const expected = sign(issuedAt || '', getSecret(event))
  const validSignature = !!signature && signature.length === expected.length && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  const validTime = Number.isInteger(Number(issuedAt)) && Math.floor(Date.now() / 1000) - Number(issuedAt) <= MAX_AGE && Number(issuedAt) <= Math.floor(Date.now() / 1000)
  if (!validSignature || !validTime) throw createError({ statusCode: 401, message: 'Sessão inválida ou expirada' })
}
