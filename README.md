# Belli Cucina

Site institucional e painel de disponibilidade do cardápio, construído com Nuxt 3, Tailwind CSS, Nitro e Drizzle.

## Desenvolvimento

```bash
npm install
npm run dev
```

O app usa PostgreSQL como fonte de dados. `ADMIN_PASSWORD` e `ADMIN_SESSION_SECRET` são obrigatórias para acessar o admin.

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

O usuário local é `belli`, a senha é `belli_local` e o banco é `belli_cucina`. Para outro ambiente, copie `.env.example` para `.env` e preencha `DATABASE_URL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` e `WHATSAPP_NUMBER`.

Depois de subir o banco local, use `npm run db:push` apenas em desenvolvimento. Para Neon/produção, gere e aplique migrations versionadas:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

O `db:generate` deve ser executado depois de cada alteração em `server/db/schema.ts`; os arquivos gerados em `server/db/migrations` devem ser commitados. O `db:migrate` aplica esses arquivos na base indicada por `DATABASE_URL`.

## Deploy no Netlify

No Netlify, configure em **Site configuration > Environment variables**:

```text
DATABASE_URL=postgresql://...neon.tech/...?...&sslmode=require
ADMIN_PASSWORD=uma-senha-forte
ADMIN_SESSION_SECRET=um-segredo-aleatorio-com-pelo-menos-32-caracteres
WHATSAPP_NUMBER=5511999999999
```

O build usa `npm run build` e publica `dist`. Depois de salvar as variáveis, faça um novo deploy. `DATABASE_URL` é obrigatória porque o cardápio usa PostgreSQL em runtime.

`GET /api/cardapio`, `GET /api/admin/produtos`, `PUT /api/admin/produtos` e `PUT /api/admin/produtos/:id` usam PostgreSQL via Drizzle. O JSON é usado apenas pelo script inicial de seed e não é consultado pelo site.

## Rotas

- `/` - apresentação da marca
- `/cardapio` - cardápio público e pedidos pelo WhatsApp
- `/informacoes` - entrega, antecedência e conservação
- `/modo-de-preparo` - instruções por tipo de massa
- `/admin` - login e gestão de preço, estoque e disponibilidade
