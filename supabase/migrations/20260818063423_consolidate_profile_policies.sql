-- Reduce overlapping permissive profile policies while preserving owner/staff access.
drop policy if exists "Users can view their own profile" on public.profiles;
drop policy if exists "Staff can view profiles" on public.profiles;
drop policy if exists "Users can update their own profile" on public.profiles;
drop policy if exists "Admins can manage profiles" on public.profiles;
drop policy if exists "Admins can delete profiles" on public.profiles;

create policy "Users and staff can view profiles" on public.profiles
  for select
  to authenticated
  using (
    (select auth.uid()) = id
    or (select private.current_user_role()) in ('admin', 'clinician')
  );

create policy "Users and admins can update profiles" on public.profiles
  for update
  to authenticated
  using (
    (select auth.uid()) = id
    or (select private.current_user_role()) = 'admin'
  )
  with check (
    (select private.current_user_role()) = 'admin'
    or (
      (select auth.uid()) = id
      and role = (select private.current_user_role())
    )
  );

create policy "Admins can delete profiles" on public.profiles
  for delete
  to authenticated
  using ((select private.current_user_role()) = 'admin');
