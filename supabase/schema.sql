create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role text not null default 'investor' check (role in ('admin', 'investor')),
  dashboard_asset_usd numeric(18, 2) not null default 0,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
create policy "Users can read their own profile"
  on public.profiles for select using (auth.uid() = id);
