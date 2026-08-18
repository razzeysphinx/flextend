-- Allow staff to remove only cancelled intake records from the admin UI.
create policy "Staff can delete cancelled appointments" on public.appointments
  for delete
  to authenticated
  using (
    status = 'cancelled'::public.appointment_status
    and (select private.current_user_role()) in ('admin', 'clinician')
  );
