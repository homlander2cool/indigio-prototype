-- Add contact fields required by the admin KYC queue.
-- Safe to run more than once.

alter table public.kyc_submissions
  add column if not exists reference_id text,
  add column if not exists full_name text,
  add column if not exists registration_email text,
  add column if not exists registration_phone text,
  add column if not exists registration_ip inet,
  add column if not exists registration_country text,
  add column if not exists document_path text,
  add column if not exists referral_code text,
  add column if not exists referred_by_code text,
  add column if not exists data_json jsonb,
  add column if not exists created_at timestamptz default now();

-- Older submissions stored these values in data_json before the dedicated
-- columns existed. Preserve them for admin access.
update public.kyc_submissions
set
  registration_email = coalesce(nullif(registration_email, ''), data_json ->> 'email'),
  registration_phone = coalesce(nullif(registration_phone, ''), data_json ->> 'phone'),
  registration_country = coalesce(nullif(registration_country, ''), data_json ->> 'country')
where registration_email is null
   or registration_email = ''
   or registration_phone is null
   or registration_phone = ''
   or registration_country is null
   or registration_country = '';

create index if not exists idx_kyc_submissions_registration_email
  on public.kyc_submissions (registration_email);

insert into storage.buckets (id, name, public)
values ('kyc-documents', 'kyc-documents', false)
on conflict (id) do update set public = false;

-- Make the new columns immediately available through Supabase's REST API.
notify pgrst, 'reload schema';

create table if not exists public.wallet_settings (
  id boolean primary key default true check (id),
  asset text not null default 'USDC',
  network text not null default 'Polygon',
  investment_wallet_address text not null default '',
  withdrawal_notice text not null default 'Withdrawals are reviewed and processed within 7 working days.',
  updated_at timestamptz not null default now()
);
create table if not exists public.wallet_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance numeric(24, 8) not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);
create table if not exists public.wallet_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null check (type in ('deposit', 'withdrawal', 'admin_adjustment')),
  amount numeric(24, 8) not null check (amount > 0),
  asset text not null default 'USDC',
  network text not null default 'Polygon',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'processed')),
  tx_hash text,
  destination_address text,
  note text,
  created_at timestamptz not null default now(),
  processed_at timestamptz,
  processed_by uuid references auth.users(id)
);
create unique index if not exists idx_wallet_transactions_tx_hash
  on public.wallet_transactions(tx_hash) where tx_hash is not null;
create index if not exists idx_wallet_transactions_user_created
  on public.wallet_transactions(user_id, created_at desc);
create table if not exists public.support_bot_settings (
  id boolean primary key default true check (id),
  enabled boolean not null default true,
  instructions text not null default '',
  welcome_message text not null default '',
  updated_at timestamptz not null default now()
);
create table if not exists public.investment_package_selections (
  user_id uuid primary key references auth.users(id) on delete cascade,
  deal_slug text not null references public.deals(slug) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_package_selections_deal_slug on public.investment_package_selections(deal_slug);
insert into public.wallet_settings (id) values (true) on conflict (id) do nothing;
insert into public.support_bot_settings (id) values (true) on conflict (id) do nothing;
alter table public.wallet_settings enable row level security;
alter table public.wallet_accounts enable row level security;
alter table public.wallet_transactions enable row level security;
alter table public.support_bot_settings enable row level security;
alter table public.investment_package_selections enable row level security;
drop policy if exists "Users can read their wallet account" on public.wallet_accounts;
create policy "Users can read their wallet account" on public.wallet_accounts for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Users can read their wallet transactions" on public.wallet_transactions;
create policy "Users can read their wallet transactions" on public.wallet_transactions for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Users can read their package selection" on public.investment_package_selections;
create policy "Users can read their package selection" on public.investment_package_selections for select to authenticated using ((select auth.uid()) = user_id);
notify pgrst, 'reload schema';
