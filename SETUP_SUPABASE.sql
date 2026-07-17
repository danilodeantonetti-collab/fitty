-- ============================================================
-- FITTY: Komplettes Sicherheits-Setup (Row Level Security)
-- Einmalig ausführen: Supabase Dashboard -> SQL Editor -> Run.
-- Idempotent: kann gefahrlos mehrfach ausgeführt werden.
--
-- Hintergrund: Die App spricht direkt aus dem Browser mit Supabase.
-- Der einzige echte Schutz zwischen den Daten verschiedener Nutzer
-- sind diese RLS-Policies. Ohne sie könnte jeder eingeloggte Nutzer
-- per API die Daten aller anderen lesen und manipulieren.
-- ============================================================

-- ---------- 1) body_weight (Körpergewichts-Tracking, neu) ----------
create table if not exists public.body_weight (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    date date not null,
    weight numeric(5, 2) not null,
    created_at timestamptz not null default now(),
    unique (user_id, date)
);

alter table public.body_weight enable row level security;

drop policy if exists "body_weight_select_own" on public.body_weight;
create policy "body_weight_select_own" on public.body_weight
    for select using (auth.uid() = user_id);

drop policy if exists "body_weight_insert_own" on public.body_weight;
create policy "body_weight_insert_own" on public.body_weight
    for insert with check (auth.uid() = user_id);

drop policy if exists "body_weight_update_own" on public.body_weight;
create policy "body_weight_update_own" on public.body_weight
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "body_weight_delete_own" on public.body_weight;
create policy "body_weight_delete_own" on public.body_weight
    for delete using (auth.uid() = user_id);

-- ---------- 2) profiles ----------
alter table public.profiles enable row level security;

-- Lesen: für eingeloggte Nutzer (nötig für Freunde-Suche + Bestenliste).
drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles
    for select to authenticated using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
    for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
    for update using (auth.uid() = id) with check (auth.uid() = id);

-- ---------- 3) sessions ----------
alter table public.sessions enable row level security;

drop policy if exists "sessions_select_own" on public.sessions;
create policy "sessions_select_own" on public.sessions
    for select using (auth.uid() = user_id);

-- Bestenliste: angenommene Freunde dürfen Sessions (nur Existenz/Datum) sehen
drop policy if exists "sessions_select_friends" on public.sessions;
create policy "sessions_select_friends" on public.sessions
    for select using (
        exists (
            select 1 from public.friendships f
            where f.status = 'accepted'
              and ((f.requester_id = auth.uid() and f.addressee_id = sessions.user_id)
                or (f.addressee_id = auth.uid() and f.requester_id = sessions.user_id))
        )
    );

drop policy if exists "sessions_insert_own" on public.sessions;
create policy "sessions_insert_own" on public.sessions
    for insert with check (auth.uid() = user_id);

drop policy if exists "sessions_delete_own" on public.sessions;
create policy "sessions_delete_own" on public.sessions
    for delete using (auth.uid() = user_id);

-- ---------- 4) sets (kein user_id -> Schutz über die eigene Session) ----------
alter table public.sets enable row level security;

drop policy if exists "sets_select_own" on public.sets;
create policy "sets_select_own" on public.sets
    for select using (
        exists (select 1 from public.sessions s where s.id = sets.session_id and s.user_id = auth.uid())
    );

drop policy if exists "sets_insert_own" on public.sets;
create policy "sets_insert_own" on public.sets
    for insert with check (
        exists (select 1 from public.sessions s where s.id = sets.session_id and s.user_id = auth.uid())
    );

drop policy if exists "sets_delete_own" on public.sets;
create policy "sets_delete_own" on public.sets
    for delete using (
        exists (select 1 from public.sessions s where s.id = sets.session_id and s.user_id = auth.uid())
    );

-- ---------- 5) custom_workouts ----------
alter table public.custom_workouts enable row level security;

drop policy if exists "custom_workouts_select_own" on public.custom_workouts;
create policy "custom_workouts_select_own" on public.custom_workouts
    for select using (auth.uid() = user_id);

drop policy if exists "custom_workouts_insert_own" on public.custom_workouts;
create policy "custom_workouts_insert_own" on public.custom_workouts
    for insert with check (auth.uid() = user_id);

drop policy if exists "custom_workouts_update_own" on public.custom_workouts;
create policy "custom_workouts_update_own" on public.custom_workouts
    for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "custom_workouts_delete_own" on public.custom_workouts;
create policy "custom_workouts_delete_own" on public.custom_workouts
    for delete using (auth.uid() = user_id);

-- ---------- 6) friendships ----------
alter table public.friendships enable row level security;

drop policy if exists "friendships_select_own" on public.friendships;
create policy "friendships_select_own" on public.friendships
    for select using (auth.uid() in (requester_id, addressee_id));

-- Anfragen nur im eigenen Namen, nicht an sich selbst
drop policy if exists "friendships_insert_own" on public.friendships;
create policy "friendships_insert_own" on public.friendships
    for insert with check (auth.uid() = requester_id and requester_id <> addressee_id);

-- Annehmen/Ablehnen darf nur der Empfänger der Anfrage
drop policy if exists "friendships_update_addressee" on public.friendships;
create policy "friendships_update_addressee" on public.friendships
    for update using (auth.uid() = addressee_id) with check (auth.uid() = addressee_id);

drop policy if exists "friendships_delete_own" on public.friendships;
create policy "friendships_delete_own" on public.friendships
    for delete using (auth.uid() in (requester_id, addressee_id));

-- Doppelte Anfragen verhindern (falls noch kein Unique-Constraint existiert)
create unique index if not exists friendships_pair_unique
    on public.friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

-- ---------- 7) Referenztabellen (exercises, workouts): nur lesen ----------
do $$
begin
    if to_regclass('public.exercises') is not null then
        execute 'alter table public.exercises enable row level security';
        execute 'drop policy if exists "exercises_select_authenticated" on public.exercises';
        execute 'create policy "exercises_select_authenticated" on public.exercises for select to authenticated using (true)';
    end if;
    if to_regclass('public.workouts') is not null then
        execute 'alter table public.workouts enable row level security';
        execute 'drop policy if exists "workouts_select_authenticated" on public.workouts';
        execute 'create policy "workouts_select_authenticated" on public.workouts for select to authenticated using (true)';
    end if;
end $$;
