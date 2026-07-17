-- ============================================================
-- FITTY: Komplettes Datenbank-Setup (Tabellen + Seeds + RLS)
-- Für ein FRISCHES Supabase-Projekt: SQL Editor -> alles einfügen -> Run.
-- Idempotent: kann gefahrlos mehrfach ausgeführt werden.
-- ============================================================

-- ---------- Tabellen ----------

create table if not exists public.profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    nickname text not null,
    goal text,
    age_range text,
    created_at timestamptz not null default now()
);

create table if not exists public.workouts (
    id uuid primary key default gen_random_uuid(),
    name text not null
);

create table if not exists public.exercises (
    id text primary key,
    name text not null
);

create table if not exists public.sessions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    workout_id uuid references public.workouts (id),
    date timestamptz not null default now()
);

create table if not exists public.sets (
    id uuid primary key default gen_random_uuid(),
    session_id uuid not null references public.sessions (id) on delete cascade,
    exercise_id text references public.exercises (id),
    exercise_name text,
    weight numeric(6, 2) not null default 0,
    reps integer not null default 0,
    "order" integer not null default 1
);

create table if not exists public.custom_workouts (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    name text not null,
    exercises jsonb not null default '[]',
    created_at timestamptz not null default now()
);

create table if not exists public.friendships (
    id uuid primary key default gen_random_uuid(),
    requester_id uuid not null references public.profiles (id) on delete cascade,
    addressee_id uuid not null references public.profiles (id) on delete cascade,
    status text not null default 'pending',
    created_at timestamptz not null default now()
);

create table if not exists public.body_weight (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users (id) on delete cascade,
    date date not null,
    weight numeric(5, 2) not null,
    created_at timestamptz not null default now(),
    unique (user_id, date)
);

-- ---------- Seeds für die zwei Standard-Pläne (IDs sind im App-Code fest verdrahtet) ----------

insert into public.workouts (id, name) values
    ('d5e86566-a4c3-4d64-8ab3-c36b81a7b1fb', 'Workout Grundübungen Tag 1'),
    ('a12bc85d-8b01-447a-b552-320e8b2b78a9', 'Workout Grundübungen Tag 2')
on conflict (id) do nothing;

insert into public.exercises (id, name) values
    ('a1', 'Kniebeugen'),
    ('a2', 'Kreuzheben'),
    ('a3', 'Klimmziehen eng'),
    ('a4', 'Schrägbankdrücken'),
    ('a5', 'Langhantelrudern OG'),
    ('a6', 'Trizepsdrücken (Stange)'),
    ('a7', 'Hammer Curls'),
    ('b1', 'Kniebeugen'),
    ('b2', 'Bankdrücken'),
    ('b3', 'Langhantelrudern UG'),
    ('b4', 'Schulterdrücken (LH)'),
    ('b5', 'SZ-Curls'),
    ('b6', 'Trizepsdrücken (Seil)')
on conflict (id) do nothing;

-- ---------- Row Level Security ----------
-- Die App spricht direkt aus dem Browser mit Supabase; diese Policies sind
-- der einzige echte Schutz zwischen den Daten verschiedener Nutzer.

-- profiles
alter table public.profiles enable row level security;

drop policy if exists "profiles_select_authenticated" on public.profiles;
create policy "profiles_select_authenticated" on public.profiles
    for select to authenticated using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
    for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
    for update using (auth.uid() = id) with check (auth.uid() = id);

-- sessions
alter table public.sessions enable row level security;

drop policy if exists "sessions_select_own" on public.sessions;
create policy "sessions_select_own" on public.sessions
    for select using (auth.uid() = user_id);

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

-- sets (kein user_id -> Schutz über die eigene Session)
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

-- custom_workouts
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

-- friendships
alter table public.friendships enable row level security;

drop policy if exists "friendships_select_own" on public.friendships;
create policy "friendships_select_own" on public.friendships
    for select using (auth.uid() in (requester_id, addressee_id));

drop policy if exists "friendships_insert_own" on public.friendships;
create policy "friendships_insert_own" on public.friendships
    for insert with check (auth.uid() = requester_id and requester_id <> addressee_id);

drop policy if exists "friendships_update_addressee" on public.friendships;
create policy "friendships_update_addressee" on public.friendships
    for update using (auth.uid() = addressee_id) with check (auth.uid() = addressee_id);

drop policy if exists "friendships_delete_own" on public.friendships;
create policy "friendships_delete_own" on public.friendships
    for delete using (auth.uid() in (requester_id, addressee_id));

create unique index if not exists friendships_pair_unique
    on public.friendships (least(requester_id, addressee_id), greatest(requester_id, addressee_id));

-- Referenztabellen: eingeloggt lesbar, niemand darf schreiben
alter table public.workouts enable row level security;
drop policy if exists "workouts_select_authenticated" on public.workouts;
create policy "workouts_select_authenticated" on public.workouts
    for select to authenticated using (true);

alter table public.exercises enable row level security;
drop policy if exists "exercises_select_authenticated" on public.exercises;
create policy "exercises_select_authenticated" on public.exercises
    for select to authenticated using (true);

-- body_weight
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
