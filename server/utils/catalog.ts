import { asc, eq } from 'drizzle-orm'
import { getDb } from '../db'
import { categorias, produtos } from '../db/schema'

export type CatalogItem = { id?: number; sabor: string; preco: number; ativo?: boolean; estoque_atual?: number | null }
export type CatalogCategory = { id?: number; slug: string; nome: string; peso: string; preparo?: string; itens: CatalogItem[] }

export const isAvailable = (item: CatalogItem) => item.ativo !== false

export const getCatalog = async (databaseUrl: string) => {
	if (!databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
	const rows = await getDb(databaseUrl).select({ categoryId: categorias.id, slug: categorias.slug, nome: categorias.nome, peso: categorias.pesoPadrao, preparo: categorias.preparo, productId: produtos.id, sabor: produtos.sabor, preco: produtos.preco, ativo: produtos.ativo, estoque_atual: produtos.estoqueAtual }).from(categorias).leftJoin(produtos, eq(produtos.categoriaId, categorias.id)).orderBy(asc(categorias.id), asc(produtos.id))
	const result = { categorias: [] as CatalogCategory[] }
	for (const row of rows) {
		let category = result.categorias.find(item => item.id === row.categoryId)
		if (!category) { category = { id: row.categoryId, slug: row.slug, nome: row.nome, peso: row.peso, preparo: row.preparo, itens: [] }; result.categorias.push(category) }
		if (row.productId) category.itens.push({ id: row.productId, sabor: row.sabor!, preco: row.preco!, ativo: row.ativo!, estoque_atual: row.estoque_atual })
	}
	return result
}

export const updateCatalogItem = async (databaseUrl: string, id: number, values: { preco: number; ativo: boolean; estoque_atual: number | null }) => {
	if (!databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
	const [item] = await getDb(databaseUrl).update(produtos).set({ preco: values.preco, ativo: values.ativo, estoqueAtual: values.estoque_atual, atualizadoEm: new Date() }).where(eq(produtos.id, id)).returning({ id: produtos.id, sabor: produtos.sabor, preco: produtos.preco, ativo: produtos.ativo, estoque_atual: produtos.estoqueAtual })
	return item
}

export const updateCatalogItems = async (databaseUrl: string, items: Array<{ id: number; preco: number; ativo: boolean; estoque_atual: number | null }>) => {
	if (!databaseUrl) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL não configurada' })
	return getDb(databaseUrl).transaction(async (tx) => {
		for (const item of items) await tx.update(produtos).set({ preco: item.preco, ativo: item.ativo, estoqueAtual: item.estoque_atual, atualizadoEm: new Date() }).where(eq(produtos.id, item.id))
		return { updated: items.length }
	})
}
