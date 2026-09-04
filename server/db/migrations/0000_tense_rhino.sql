CREATE TABLE "admin_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"senha_hash" text NOT NULL,
	CONSTRAINT "admin_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "categorias" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" text NOT NULL,
	"slug" text NOT NULL,
	"peso_padrao" text NOT NULL,
	"preparo" text DEFAULT 'Siga as instruções da embalagem e ajuste o tempo ao seu forno ou fogão.' NOT NULL,
	CONSTRAINT "categorias_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "produtos" (
	"id" serial PRIMARY KEY NOT NULL,
	"categoria_id" integer NOT NULL,
	"sabor" text NOT NULL,
	"preco" integer NOT NULL,
	"ativo" boolean DEFAULT true NOT NULL,
	"estoque_atual" integer,
	"criado_em" timestamp DEFAULT now(),
	"atualizado_em" timestamp DEFAULT now()
);
