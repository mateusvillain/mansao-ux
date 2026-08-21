# Contrato de dados — Mansão UX v1

Fonte: `supabase/migrations/20260820_000001_init.sql`. Este documento é o contrato que
permite as issues de UI serem implementadas em paralelo com a camada de dados (#9).

## Tabelas

### `guests` — identidade do hóspede
| coluna | tipo | notas |
|---|---|---|
| `id` | uuid PK | gerado pelo banco |
| `name` | text | único, não pode ser vazio |
| `created_at` | timestamptz | |

Não há login. O `id` é guardado no dispositivo após o primeiro acesso (#12) e é o que
dá autoria a perfis, recados, músicas e votos.

### `profiles` — Perfil Relâmpago (#16, #17, #18)
| coluna | tipo | notas |
|---|---|---|
| `id` | uuid PK | |
| `guest_id` | uuid FK → `guests` | **único**: um perfil por hóspede |
| `role` | text | "o que faz" |
| `fun_fact` | text | "um fato curioso" |
| `talk_to_me_about` | text | "me chama pra falar sobre..." |
| `created_at` / `updated_at` | timestamptz | |

### `notes` — Mural de Recados (#19, #20, #21)
| coluna | tipo | notas |
|---|---|---|
| `id` | uuid PK | |
| `guest_id` | uuid FK → `guests` | autor |
| `body` | text | não vazio, **máx. 280 caracteres** (validado no banco) |
| `created_at` | timestamptz | índice desc para a listagem |

### `tracks` — sugestões de música (#22, #23)
| coluna | tipo | notas |
|---|---|---|
| `id` | uuid PK | |
| `guest_id` | uuid FK → `guests` | quem sugeriu |
| `title` / `artist` | text | **únicos em conjunto**: bloqueia duplicata exata |
| `created_at` | timestamptz | desempate do ranking |

### `votes` — votos na playlist (#24)
| coluna | tipo | notas |
|---|---|---|
| `id` | uuid PK | |
| `track_id` | uuid FK → `tracks` | |
| `guest_id` | uuid FK → `guests` | |
| `created_at` | timestamptz | |

`unique (track_id, guest_id)` garante **um voto por hóspede por música** no schema — a UI
não precisa policiar isso, só tratar o erro de conflito.

### `tracks_ranked` — view de ranking
Retorna todos os campos de `tracks` mais `vote_count`. A listagem da #23 lê desta view e
ordena por `vote_count desc, created_at asc` — sem agregação no cliente.

## Realtime

`profiles`, `notes`, `tracks` e `votes` estão na publicação `supabase_realtime`. As três
listagens ao vivo (#17, #20, #23) assinam suas tabelas via `subscribeToTable` (`lib/db/realtime.ts`).

## Segurança

RLS está **habilitado** em todas as tabelas, com policies de leitura e escrita públicas.
Isso é uma decisão de produto explícita, não um default: o app não tem login (ver **Fora
do escopo** no PRD), o link é privado do grupo e a casa dura quatro dias. As policies são
declaradas uma a uma para que essa escolha fique visível em review.

Consequência conhecida: a autoria é uma convenção do cliente, não uma garantia do banco —
qualquer pessoa com o link poderia, via API, apagar o recado de outra. Aceitável neste
contexto; seria bloqueante em qualquer produto com usuários reais.
