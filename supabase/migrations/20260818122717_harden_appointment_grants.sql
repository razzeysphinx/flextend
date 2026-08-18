-- Keep table privileges aligned with the appointment RLS policies.
-- Anonymous visitors only submit intake requests; they never need to read,
-- update, delete, or otherwise administer appointment rows.
revoke all on table public.appointments from anon;
grant insert on table public.appointments to anon;

-- Authenticated clinicians and admins use the CRUD operations exposed by the
-- dashboard. RLS still decides which rows and status transitions are allowed.
revoke all on table public.appointments from authenticated;
grant select, insert, update, delete on table public.appointments to authenticated;
