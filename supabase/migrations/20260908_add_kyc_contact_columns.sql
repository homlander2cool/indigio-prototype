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
