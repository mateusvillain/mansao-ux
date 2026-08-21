-- Schema inicial da Mansão UX (issue #8).
-- Contrato de dados de todas as features do v1. Ver docs/schema.md.

create extension if not exists "pgcrypto";

-- Hóspedes: identidade leve, sem login. O nome é escolhido no primeiro acesso
-- e guardado no dispositivo; aqui ele existe para dar autoria aos posts.
create table public.guests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  constraint guests_name_not_blank check (length(btrim(name)) > 0),
  constraint guests_name_unique unique (name)
);

-- Perfil Relâmpago: um por hóspede.
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  role text not null,
  fun_fact text not null,
  talk_to_me_about text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_one_per_guest unique (guest_id)
);

-- Mural de Recados.
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint notes_body_not_blank check (length(btrim(body)) > 0),
  constraint notes_body_max_length check (length(body) <= 280)
);

-- Playlist Colaborativa: sugestões de música.
create table public.tracks (
  id uuid primary key default gen_random_uuid(),
  guest_id uuid not null references public.guests (id) on delete cascade,
  title text not null,
  artist text not null,
  created_at timestamptz not null default now(),
  -- Bloqueia duplicata exata independente de caixa e espaço (critério da #22).
  constraint tracks_unique_song unique (title, artist)
);

-- Votos: a restrição de um voto por hóspede por música vive no schema,
-- não na UI — é critério de aceite da #24.
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references public.tracks (id) on delete cascade,
  guest_id uuid not null references public.guests (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint votes_one_per_guest_per_track unique (track_id, guest_id)
);

create index notes_created_at_idx on public.notes (created_at desc);
create index votes_track_id_idx on public.votes (track_id);

-- Ranking da playlist: contagem de votos junto da música, para a listagem
-- ordenada da #23 não precisar de agregação no cliente.
create view public.tracks_ranked as
select
  t.id,
  t.guest_id,
  t.title,
  t.artist,
  t.created_at,
  count(v.id) as vote_count
from public.tracks t
left join public.votes v on v.track_id = t.id
group by t.id;

-- Realtime para as três listagens ao vivo.
alter publication supabase_realtime add table public.profiles;
alter publication supabase_realtime add table public.notes;
alter publication supabase_realtime add table public.tracks;
alter publication supabase_realtime add table public.votes;

-- Policies: o app não tem login, então leitura e escrita são públicas por
-- decisão de produto (casa de 4 dias, link privado do grupo). Declaradas
-- explicitamente para que isso seja uma escolha visível, não um default.
alter table public.guests enable row level security;
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.tracks enable row level security;
alter table public.votes enable row level security;

create policy "guests: leitura pública"  on public.guests   for select using (true);
create policy "guests: escrita pública"  on public.guests   for insert with check (true);

create policy "profiles: leitura pública" on public.profiles for select using (true);
create policy "profiles: escrita pública" on public.profiles for insert with check (true);
create policy "profiles: edição pública"  on public.profiles for update using (true) with check (true);

create policy "notes: leitura pública"   on public.notes    for select using (true);
create policy "notes: escrita pública"   on public.notes    for insert with check (true);
create policy "notes: remoção pública"   on public.notes    for delete using (true);

create policy "tracks: leitura pública"  on public.tracks   for select using (true);
create policy "tracks: escrita pública"  on public.tracks   for insert with check (true);

create policy "votes: leitura pública"   on public.votes    for select using (true);
create policy "votes: escrita pública"   on public.votes    for insert with check (true);
create policy "votes: remoção pública"   on public.votes    for delete using (true);
