-- Déclic : schéma de la base Supabase.
-- À exécuter une fois dans Supabase → SQL Editor → New query → coller → Run.
-- Le script peut être relancé sans risque.

-- ───────────── Profils (un par compte) ─────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  pref text not null default 'vinted' check (pref in ('vinted', 'ebay')),
  plan text not null default 'free' check (plan in ('free', 'plus', 'pro')),
  stripe_customer_id text unique,
  stripe_subscription_id text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

drop policy if exists "profil lisible par son titulaire" on public.profiles;
create policy "profil lisible par son titulaire" on public.profiles
  for select to authenticated using (id = auth.uid());

drop policy if exists "profil modifiable par son titulaire" on public.profiles;
create policy "profil modifiable par son titulaire" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Le navigateur ne peut modifier que le prénom et la plateforme préférée.
-- L'offre et les identifiants Stripe ne sont écrits que par le serveur.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (name, pref) on public.profiles to authenticated;

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, left(coalesce(new.raw_user_meta_data ->> 'name', ''), 40))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────────── Compteur mensuel ─────────────
create table if not exists public.monthly_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  month text not null,              -- "2026-11"
  count int not null default 0,
  photos int not null default 0,
  primary key (user_id, month)
);
alter table public.monthly_usage enable row level security;
revoke all on public.monthly_usage from anon, authenticated;

drop policy if exists "compteur lisible par son titulaire" on public.monthly_usage;
create policy "compteur lisible par son titulaire" on public.monthly_usage
  for select to authenticated using (user_id = auth.uid());
grant select on public.monthly_usage to authenticated;

-- Réserve une analyse si le quota le permet. Renvoie le nouveau total, ou null si la limite est atteinte.
-- Atomique : deux analyses lancées en même temps ne peuvent pas dépasser la limite.
create or replace function public.consume_credit(p_user uuid, p_month text, p_limit int, p_photos int)
returns int language plpgsql security definer set search_path = public as $$
declare n int;
begin
  if p_limit < 1 then return null; end if;
  insert into public.monthly_usage (user_id, month, count, photos)
  values (p_user, p_month, 1, p_photos)
  on conflict (user_id, month) do update
    set count = monthly_usage.count + 1, photos = monthly_usage.photos + excluded.photos
    where monthly_usage.count < p_limit
  returning count into n;
  return n;
end $$;

-- Rend l'analyse si l'appel à l'IA a échoué.
create or replace function public.refund_credit(p_user uuid, p_month text, p_photos int)
returns void language sql security definer set search_path = public as $$
  update public.monthly_usage
     set count = greatest(count - 1, 0), photos = greatest(photos - p_photos, 0)
   where user_id = p_user and month = p_month;
$$;

revoke execute on function public.consume_credit(uuid, text, int, int) from public, anon, authenticated;
revoke execute on function public.refund_credit(uuid, text, int) from public, anon, authenticated;

-- ───────────── Annonces enregistrées ─────────────
create table if not exists public.items (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null check (char_length(title) <= 200),
  cat text not null default '' check (char_length(cat) <= 40),
  lo int, hi int, pr int,
  txt text not null check (char_length(txt) <= 6000),
  created_at timestamptz not null default now()
);
create index if not exists items_user_created on public.items (user_id, created_at desc);
alter table public.items enable row level security;

drop policy if exists "annonces du titulaire" on public.items;
create policy "annonces du titulaire" on public.items
  for all to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, delete on public.items to authenticated;

-- ───────────── Avis clients ─────────────
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() unique references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 30),
  stars int not null check (stars between 1 and 5),
  body text not null check (char_length(body) between 15 and 600),
  cat text not null default '' check (char_length(cat) <= 40),
  status text not null default 'pending' check (status in ('pending', 'published')),
  created_at timestamptz not null default now()
);
alter table public.reviews enable row level security;

drop policy if exists "avis publiés visibles par tous" on public.reviews;
create policy "avis publiés visibles par tous" on public.reviews
  for select to anon, authenticated using (status = 'published' or user_id = auth.uid());

drop policy if exists "un avis en attente par compte" on public.reviews;
create policy "un avis en attente par compte" on public.reviews
  for insert to authenticated with check (user_id = auth.uid() and status = 'pending');

revoke all on public.reviews from anon, authenticated;
grant select on public.reviews to anon, authenticated;
grant insert (name, stars, body, cat) on public.reviews to authenticated;

-- ───────────── Droits du serveur (clé service_role) ─────────────
-- Explicites, pour fonctionner même si « Automatically expose new tables » est décoché.
grant usage on schema public to anon, authenticated, service_role;
grant all on public.profiles, public.monthly_usage, public.items, public.reviews to service_role;
grant execute on function public.consume_credit(uuid, text, int, int) to service_role;
grant execute on function public.refund_credit(uuid, text, int) to service_role;
