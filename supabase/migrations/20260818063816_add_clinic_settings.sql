create table if not exists public.clinic_settings (
  id text primary key default 'default',
  business_name text not null,
  phone text not null,
  email text not null,
  address text not null,
  operating_hours text not null,
  updated_at timestamptz default now() not null,
  constraint clinic_settings_singleton check (id = 'default'),
  constraint clinic_settings_business_name_length check (char_length(btrim(business_name)) between 2 and 160),
  constraint clinic_settings_phone_length check (char_length(btrim(phone)) between 7 and 32),
  constraint clinic_settings_email_length check (char_length(btrim(email)) between 3 and 254),
  constraint clinic_settings_address_length check (char_length(btrim(address)) between 5 and 300),
  constraint clinic_settings_hours_length check (char_length(btrim(operating_hours)) between 3 and 120)
);

alter table public.clinic_settings enable row level security;

insert into public.clinic_settings (id, business_name, phone, email, address, operating_hours)
values (
  'default',
  'FlexTend Physical Therapy Clinic',
  '+63 967 195 6863',
  'flextendtherapy2024@gmail.com',
  '299 San Jose Subdivision, Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217',
  'Monday – Saturday: 8:00 AM – 4:00 PM'
)
on conflict (id) do nothing;

grant select, update on public.clinic_settings to authenticated;

create policy "Staff can view clinic settings" on public.clinic_settings
  for select
  to authenticated
  using ((select private.current_user_role()) in ('admin', 'clinician'));

create policy "Admins can update clinic settings" on public.clinic_settings
  for update
  to authenticated
  using ((select private.current_user_role()) = 'admin')
  with check ((select private.current_user_role()) = 'admin');
