import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const clients = new Map<string, ReturnType<typeof postgres>>()

export const getDb = (url: string) => {
	// prepare:false evita prepared statements, necessário p/ conexões via pooler (pgbouncer/Neon)
	const client = clients.get(url) || postgres(url, { prepare: false })
	clients.set(url, client)
	return drizzle(client)
}
