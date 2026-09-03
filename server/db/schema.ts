import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const categorias = pgTable('categorias', { id: serial('id').primaryKey(), nome: text('nome').notNull(), slug: text('slug').notNull().unique(), pesoPadrao: text('peso_padrao').notNull(), preparo: text('preparo').notNull().default('Siga as instruções da embalagem e ajuste o tempo ao seu forno ou fogão.') })
export const produtos = pgTable('produtos', { id: serial('id').primaryKey(), categoriaId: integer('categoria_id').notNull(), sabor: text('sabor').notNull(), preco: integer('preco').notNull(), ativo: boolean('ativo').notNull().default(true), estoqueAtual: integer('estoque_atual'), criadoEm: timestamp('criado_em').defaultNow(), atualizadoEm: timestamp('atualizado_em').defaultNow() })
export const adminUsers = pgTable('admin_users', { id: serial('id').primaryKey(), email: text('email').notNull().unique(), senhaHash: text('senha_hash').notNull() })
