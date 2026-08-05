-- Supabase Database Migration Script for FlexTend PT Clinic
-- Project Ref: azyjanzhoiajltywdzge

-- 1. Create Enums
CREATE TYPE public.user_role AS ENUM ('admin', 'clinician', 'patient');
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- 2. Create Profiles Table (RBAC Mapping)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role public.user_role DEFAULT 'patient'::public.user_role NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on Profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

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

-- Profiles Policies
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

-- 3. Create Appointments Table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT,
  service_title TEXT NOT NULL,
  preferred_date TEXT,
  notes TEXT,
  status public.appointment_status DEFAULT 'pending'::public.appointment_status NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on Appointments
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Appointments Policies
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

-- 4. Trigger for automatic profile creation on signup
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

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Create Storage Bucket for Clinic Photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('clinic-gallery', 'clinic-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Read Access on Clinic Gallery" ON storage.objects
  FOR SELECT USING (bucket_id = 'clinic-gallery');

CREATE POLICY "Admin and Clinicians Can Upload to Clinic Gallery" ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'clinic-gallery'
    AND public.current_user_role() IN ('admin', 'clinician')
  );
