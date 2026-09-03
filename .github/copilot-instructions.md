# Diretrizes de Resposta (Foco em Redução de Tokens)

- NUNCA adicione saudações, introduções, conclusões ou explicações detalhadas.
- NUNCA narre o que vai fazer antes de fazer ("vou analisar...", "primeiro vou..."). Execute direto.
- NUNCA peça confirmação ("Quer que eu..."); assuma a ação mais óbvia e prossiga.
- Retorne estritamente o código ou o comando de terminal solicitado. Exceção: se não tiver certeza de algo em código, assuma a opção mais provável e sinalize com `// TODO: confirmar X`; em comandos de terminal (onde comentários não são válidos), sinalize a incerteza em uma linha à parte, antes do comando.
- Para modificações em arquivos existentes, use formato de diff unificado (+/-) com exatamente 2 linhas de contexto acima e abaixo de cada alteração. NUNCA reescreva o arquivo inteiro. Bloco de código puro (sem diff) só é aceitável para arquivo novo.
- Não explique como o código funciona a menos que seja explicitamente solicitado com a palavra "EXPLIQUE". Para perguntas conceituais ou de arquitetura sem código associado, responda em prosa concisa sem necessidade da palavra EXPLIQUE.
- Nunca peça desculpas, nunca use hedging ("pode ser que", "talvez", "acho que").
- Se faltar contexto, assuma a convenção mais comum da stack do projeto (abaixo) e prossiga. Não pare para perguntar.

# Padrões do Projeto e Stack Técnica

- Projeto único (não monorepo). Gerenciador de pacotes exclusivo é o npm. Não sugira comandos pnpm ou yarn.
- Framework: Nuxt 3 (Vue 3, Composition API + `<script setup>`, SSR habilitado). Nunca sugira Options API ou sintaxe Vue 2.
- Estilização com Tailwind CSS. Sem bibliotecas de UI prontas.
- Backend: Nuxt server routes (`server/api/`), rodando sobre Nitro. Sem NestJS, sem servidor separado. Rotas admin protegidas por sessão via cookie assinado + senha (`ADMIN_PASSWORD`), sem sistema de usuários completo nem Passport/JWT.
- Banco de Dados: Utilize estritamente a sintaxe do **Drizzle ORM** com driver `postgres` (node-postgres/postgres-js) — não Prisma. Queries relacionais via `db.query.<tabela>.findFirst/findMany` com `with`; mutações via `db.insert/update/delete`. Migrations via `drizzle-kit` (`db:push` em dev, migrations versionadas em produção).
- Fallback: quando `DATABASE_URL` não estiver configurada, o cardápio público deve cair para leitura do `data/cardapio.json` local. Nunca remova esse fallback sem solicitação explícita.
- Sem realtime, sem WebSocket, sem voz/vídeo, sem storage de arquivos externo nesta fase. Não sugira Socket.io, Redis, LiveKit ou R2 a menos que o escopo do projeto mude explicitamente.
- CI/CD: build e deploy via Vercel ou Netlify (Nuxt build padrão). Scripts de pipeline curtos e focados.
- Comentários de código em português, curtos, e apenas quando o código não é autoexplicativo.

# Resolução de Erros e Refatoração

- Ao analisar stack traces, identifique a causa raiz internamente e imprima apenas a linha de código corrigida (com contexto mínimo em formato diff).
- Ao solicitar testes, gere apenas os blocos `it`/`test` relevantes, sem reescrever mocks e setups já existentes no arquivo.
- Erros de tipo do Drizzle geralmente vêm de schema desatualizado (rodar `db:push` ou gerar migration) ou de import incorreto do client (`server/utils/db.ts` deve ser a única fonte da instância `db`) — verifique isso antes de reescrever a query.
