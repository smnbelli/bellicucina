# Belli Cucina

Site institucional e painel de disponibilidade do cardápio, construído com Nuxt 3, Tailwind CSS, Nitro e Drizzle.

## Desenvolvimento

```bash
npm install
npm run dev
```

O app usa PostgreSQL como fonte de dados. A senha local do admin é `belli2025` quando `ADMIN_PASSWORD` não está definida.

## PostgreSQL

Para testar localmente com Docker Desktop:

```bash
copy .env.example .env
npm run db:up
npm run db:push
npm run db:seed
npm run dev
```

No PowerShell, `copy` também pode ser substituído por `Copy-Item .env.example .env`. Para parar o banco, use `npm run db:down`. O volume `belli_cucina_pgdata` mantém os dados entre reinícios.

O usuário local é `belli`, a senha é `belli_local` e o banco é `belli_cucina`. Para outro ambiente, copie `.env.example` para `.env` e preencha `DATABASE_URL`, `ADMIN_PASSWORD` e `WHATSAPP_NUMBER`.

Depois de subir o banco, crie as tabelas com `npm run db:push` e popule `categorias` e `produtos` com `npm run db:seed`.

`GET /api/cardapio`, `GET /api/admin/produtos`, `PUT /api/admin/produtos` e `PUT /api/admin/produtos/:id` usam PostgreSQL via Drizzle. O JSON é usado apenas pelo script inicial de seed e não é consultado pelo site.

## Rotas

- `/` - apresentação da marca
- `/cardapio` - cardápio público e pedidos pelo WhatsApp
- `/informacoes` - entrega, antecedência e conservação
- `/modo-de-preparo` - instruções por tipo de massa
- `/admin` - login e gestão de preço, estoque e disponibilidade
