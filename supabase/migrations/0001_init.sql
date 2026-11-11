-- Gym PR Board — schema
-- Safe to run more than once.

create extension if not exists "pgcrypto";

create table if not exists public.gym_pr_board_lifts (
  id uuid primary key default gen_random_uuid(),
  exercise text,
  weight_kg numeric,
  reps integer,
  set_type text,
  lifted_on date,
  created_at timestamptz not null default now()
);

create index if not exists gym_pr_board_lifts_created_idx on public.gym_pr_board_lifts (created_at desc);

alter table public.gym_pr_board_lifts enable row level security;

drop policy if exists "gym_pr_board_lifts_read" on public.gym_pr_board_lifts;
create policy "gym_pr_board_lifts_read" on public.gym_pr_board_lifts for select using (true);

drop policy if exists "gym_pr_board_lifts_insert" on public.gym_pr_board_lifts;
create policy "gym_pr_board_lifts_insert" on public.gym_pr_board_lifts for insert with check (true);
