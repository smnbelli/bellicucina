import 'dotenv/config'
import fallback from '../data/cardapio.json'
import { asc, eq } from 'drizzle-orm'
import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { categorias, produtos } from '../server/db/schema'

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL é obrigatório para o seed.')
const client = postgres(process.env.DATABASE_URL)
const db = drizzle(client)

for (const category of fallback.categorias) {
  await db.insert(categorias).values({ nome: category.nome, slug: category.slug, pesoPadrao: category.peso, preparo: category.preparo }).onConflictDoUpdate({ target: categorias.slug, set: { nome: category.nome, pesoPadrao: category.peso, preparo: category.preparo } })
  const [savedCategory] = await db.select({ id: categorias.id }).from(categorias).where(eq(categorias.slug, category.slug))
  if (!savedCategory) continue
  for (const item of category.itens) {
    const existing = await db.select({ sabor: produtos.sabor }).from(produtos).where(eq(produtos.categoriaId, savedCategory.id)).orderBy(asc(produtos.id))
    if (!existing.some(product => product.sabor === item.sabor)) await db.insert(produtos).values({ categoriaId: savedCategory.id, sabor: item.sabor, preco: item.preco, ativo: true, estoqueAtual: null })
  }
}
await client.end()
console.log('Cardápio inicial inserido.')
