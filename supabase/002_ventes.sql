-- Déclic : suivi des ventes (à exécuter une fois dans Supabase → SQL Editor → Run).
-- Peut être relancé sans risque.
alter table public.items add column if not exists sold_at timestamptz;
alter table public.items add column if not exists sold_price int check (sold_price is null or sold_price between 0 and 1000000);
grant update (sold_at, sold_price) on public.items to authenticated;
