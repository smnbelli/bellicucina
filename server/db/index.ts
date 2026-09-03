import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'

const clients = new Map<string, ReturnType<typeof postgres>>()

export const getDb = (url: string) => {
	const client = clients.get(url) || postgres(url)
	clients.set(url, client)
	return drizzle(client)
}
