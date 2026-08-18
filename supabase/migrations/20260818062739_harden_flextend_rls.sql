-- Harden the live Supabase project before enabling persistent admin workflows.

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to authenticated;

-- Role checks are used by RLS policies, but should not be exposed as an RPC endpoint.
create or replace function private.current_user_role()
returns public.user_role
language sql
security definer
stable
set search_path = ''
as $$
  select p.role
  from public.profiles as p
  where p.id = (select auth.uid())
$$;

revoke all on function private.current_user_role() from public, anon, authenticated, service_role;
grant execute on function private.current_user_role() to authenticated;

drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Staff can view profiles" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can manage profiles" on public.profiles;

create policy "Users can view their own profile" on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "Staff can view profiles" on public.profiles
  for select
  to authenticated
  using ((select private.current_user_role()) in ('admin', 'clinician'));

create policy "Users can update their own profile" on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id)
  with check (
    (select auth.uid()) = id
    and role = (select private.current_user_role())
  );

create policy "Admins can manage profiles" on public.profiles
  for all
  to authenticated
  using ((select private.current_user_role()) = 'admin')
  with check ((select private.current_user_role()) = 'admin');

drop policy if exists "Anyone can insert appointments" on public.appointments;
drop policy if exists "Clinicians and Admins can view all appointments" on public.appointments;
drop policy if exists "Clinicians and Admins can update appointments" on public.appointments;

alter table public.appointments
  add column if not exists updated_at timestamptz default now() not null;

create index if not exists appointments_created_at_idx
  on public.appointments (created_at desc);

create index if not exists appointments_status_idx
  on public.appointments (status);

create policy "Anyone can insert appointments" on public.appointments
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(patient_name)) between 2 and 120
    and char_length(btrim(patient_phone)) between 7 and 32
    and (patient_email is null or char_length(btrim(patient_email)) between 3 and 254)
    and char_length(btrim(service_title)) between 2 and 160
    and (preferred_date is null or char_length(btrim(preferred_date)) <= 120)
    and (notes is null or char_length(notes) <= 2000)
    and status = 'pending'::public.appointment_status
  );

create policy "Clinicians and Admins can view all appointments" on public.appointments
  for select
  to authenticated
  using ((select private.current_user_role()) in ('admin', 'clinician'));

create policy "Clinicians and Admins can update appointments" on public.appointments
  for update
  to authenticated
  using ((select private.current_user_role()) in ('admin', 'clinician'))
  with check ((select private.current_user_role()) in ('admin', 'clinician'));

-- Keep the signup trigger private and prevent direct RPC execution.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    'patient'::public.user_role
  );
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated, service_role;

-- Public clinic media may be read by everyone, but only staff may mutate it.
drop policy if exists "Public Read Access on Clinic Gallery" on storage.objects;
drop policy if exists "Admin and Clinicians Can Upload to Clinic Gallery" on storage.objects;
drop policy if exists "Admin and Clinicians Can Update Clinic Gallery" on storage.objects;
drop policy if exists "Admin and Clinicians Can Delete Clinic Gallery" on storage.objects;

create policy "Public Read Access on Clinic Gallery" on storage.objects
  for select
  to public
  using (bucket_id = 'clinic-gallery');

create policy "Admin and Clinicians Can Upload to Clinic Gallery" on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'clinic-gallery'
    and (select private.current_user_role()) in ('admin', 'clinician')
  );

create policy "Admin and Clinicians Can Update Clinic Gallery" on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'clinic-gallery'
    and (select private.current_user_role()) in ('admin', 'clinician')
  )
  with check (
    bucket_id = 'clinic-gallery'
    and (select private.current_user_role()) in ('admin', 'clinician')
  );

create policy "Admin and Clinicians Can Delete Clinic Gallery" on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'clinic-gallery'
    and (select private.current_user_role()) in ('admin', 'clinician')
  );

update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']::text[]
where id = 'clinic-gallery';

-- The old public helper is no longer referenced by policies.
revoke all on function public.current_user_role() from public, anon, authenticated, service_role;
drop function if exists public.current_user_role();
