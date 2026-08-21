# 🏡 Mansão UX

App da casa compartilhada do **UX Conf** (24/09 a 27/09): infos práticas da casa, Perfil
Relâmpago, Mural de Recados e Playlist Colaborativa.

- **PRD:** [Wiki › Mansão UX](https://github.com/mateusvillain/mansao-ux/wiki/Mansao-UX)
- **Plano de execução:** [Milestone Mansão UX — v1](https://github.com/mateusvillain/mansao-ux/milestone/1)
- **Produção:** https://mansao-ux-mateus-villains-projects.vercel.app

## Stack

Next.js 15 (App Router) · TypeScript strict · Tailwind CSS · Supabase (Postgres + Realtime) · Deploy na Vercel.

## Setup local

```bash
npm install
cp .env.example .env.local   # preencha com as chaves do Supabase
npm run dev                  # http://localhost:3000
```

Sem as variáveis do Supabase o app **ainda sobe** — a home renderiza e sinaliza que o
banco não está configurado. Isso é proposital: nenhuma tela deve quebrar por falta de
backend.

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (inclui checagem de tipos) |
| `npm run typecheck` | Só a checagem de tipos |
| `npm run types:db` | Regenera `lib/supabase/database.types.ts` a partir do projeto Supabase |

## Banco

O schema vive em `supabase/migrations/` e está documentado em
[`docs/schema.md`](docs/schema.md) — leia esse arquivo antes de implementar qualquer
feature, ele é o contrato que permite trabalhar em paralelo.

Para aplicar a migration em um projeto novo, cole o conteúdo de
`supabase/migrations/20260820_000001_init.sql` no SQL Editor do Supabase (ou rode
`supabase db push` com a CLI linkada).

## Estrutura

```
app/            rotas (App Router)
components/ui/  componentes base compartilhados
content/        conteúdo editável da casa (endereço, wi-fi, combinados)
lib/supabase/   cliente e tipos do banco
lib/db/         camada de acesso a dados, uma função por operação
supabase/       migrations
docs/           contrato de dados
```
