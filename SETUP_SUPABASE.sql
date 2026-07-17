-- FITTY: Tabelle für Körpergewichts-Tracking
-- Einmalig ausführen: Supabase Dashboard -> SQL Editor -> einfügen -> "Run".
-- Solange die Tabelle fehlt, speichert die App Gewichtseinträge nur lokal im Browser.

create table if not exists public.body_weight (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    date date not null,
    weight numeric(5, 2) not null,
    created_at timestamptz not null default now(),
    unique (user_id, date)
);

alter table public.body_weight enable row level security;

create policy "body_weight_select_own" on public.body_weight
    for select using (auth.uid() = user_id);

create policy "body_weight_insert_own" on public.body_weight
    for insert with check (auth.uid() = user_id);

create policy "body_weight_update_own" on public.body_weight
    for update using (auth.uid() = user_id);

create policy "body_weight_delete_own" on public.body_weight
    for delete using (auth.uid() = user_id);
