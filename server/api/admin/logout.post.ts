export default defineEventHandler((event) => { deleteCookie(event, 'belli_admin', { path: '/' }); return { ok: true } })
