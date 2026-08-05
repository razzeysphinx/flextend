-- Harden auth, RLS, and privileged helper functions for FlexTend.

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS public.user_role
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public, pg_temp
AS $$
  SELECT role
  FROM public.profiles
  WHERE id = (SELECT auth.uid())
$$;

REVOKE ALL ON FUNCTION public.current_user_role() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;

DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile role" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Staff can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = id);

CREATE POLICY "Staff can view profiles" ON public.profiles
  FOR SELECT
  TO authenticated
  USING (public.current_user_role() IN ('admin', 'clinician'));

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE
  TO authenticated
  USING ((SELECT auth.uid()) = id)
  WITH CHECK ((SELECT auth.uid()) = id AND role = public.current_user_role());

CREATE POLICY "Admins can manage profiles" ON public.profiles
  FOR ALL
  TO authenticated
  USING (public.current_user_role() = 'admin')
  WITH CHECK (public.current_user_role() = 'admin');

DROP POLICY IF EXISTS "Anyone can insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Clinicians and Admins can view all appointments" ON public.appointments;
DROP POLICY IF EXISTS "Clinicians and Admins can update appointments" ON public.appointments;

CREATE POLICY "Anyone can insert appointments" ON public.appointments
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(patient_name) BETWEEN 2 AND 120
    AND char_length(patient_phone) BETWEEN 7 AND 32
    AND (patient_email IS NULL OR char_length(patient_email) <= 254)
    AND char_length(service_title) BETWEEN 2 AND 160
    AND (preferred_date IS NULL OR char_length(preferred_date) <= 120)
    AND (notes IS NULL OR char_length(notes) <= 2000)
    AND status = 'pending'::public.appointment_status
  );

CREATE POLICY "Clinicians and Admins can view all appointments" ON public.appointments
  FOR SELECT
  TO authenticated
  USING (public.current_user_role() IN ('admin', 'clinician'));

CREATE POLICY "Clinicians and Admins can update appointments" ON public.appointments
  FOR UPDATE
  TO authenticated
  USING (public.current_user_role() IN ('admin', 'clinician'))
  WITH CHECK (public.current_user_role() IN ('admin', 'clinician'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'patient'::public.user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

DROP POLICY IF EXISTS "Admin and Clinicians Can Upload to Clinic Gallery" ON storage.objects;

CREATE POLICY "Admin and Clinicians Can Upload to Clinic Gallery" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'clinic-gallery'
    AND public.current_user_role() IN ('admin', 'clinician')
  );
