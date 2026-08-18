import { createClient } from "./client";
import {
  Appointment,
  AppointmentStatus,
  ClinicPhoto,
  ClinicSettings,
  Profile,
  UserRole,
} from "@/types/supabase";

const APPOINTMENT_COLUMNS =
  "id, patient_name, patient_phone, patient_email, service_title, preferred_date, notes, status, created_at, updated_at";

export interface AppointmentInput {
  patient_name: string;
  patient_phone: string;
  patient_email?: string | null;
  service_title: string;
  preferred_date?: string | null;
  notes?: string | null;
}

function throwIfError(error: { message: string } | null, fallback: string): void {
  if (error) {
    throw new Error(error.message || fallback);
  }
}

export async function createAppointment(input: AppointmentInput): Promise<Appointment> {
  const supabase = createClient();
  const payload = {
    patient_name: input.patient_name.trim(),
    patient_phone: input.patient_phone.trim(),
    patient_email: input.patient_email?.trim() || null,
    service_title: input.service_title.trim(),
    preferred_date: input.preferred_date?.trim() || null,
    notes: input.notes?.trim() || null,
    status: "pending" as const,
  };

  const { data, error } = await supabase
    .from("appointments")
    .insert(payload)
    .select(APPOINTMENT_COLUMNS)
    .single();

  throwIfError(error, "Unable to submit the intake request.");
  if (!data) {
    throw new Error("The intake request was not created.");
  }

  return data as Appointment;
}

export async function listAppointments(): Promise<Appointment[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select(APPOINTMENT_COLUMNS)
    .order("created_at", { ascending: false });

  throwIfError(error, "Unable to load appointments.");
  return (data ?? []) as Appointment[];
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
): Promise<Appointment> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("appointments")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select(APPOINTMENT_COLUMNS)
    .single();

  throwIfError(error, "Unable to update the appointment.");
  if (!data) {
    throw new Error("The appointment was not updated.");
  }

  return data as Appointment;
}

export async function deleteAppointment(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("appointments").delete().eq("id", id);
  throwIfError(error, "Unable to delete the cancelled appointment.");
}

export async function listProfiles(): Promise<Profile[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, avatar_url, created_at")
    .order("created_at", { ascending: false });

  throwIfError(error, "Unable to load user profiles.");
  return (data ?? []) as Profile[];
}

export async function updateProfileRole(id: string, role: UserRole): Promise<Profile> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", id)
    .select("id, email, full_name, role, avatar_url, created_at")
    .single();

  throwIfError(error, "Unable to update the user role.");
  if (!data) {
    throw new Error("The user role was not updated.");
  }

  return data as Profile;
}

export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, avatar_url, created_at")
    .eq("id", user.id)
    .single();

  throwIfError(error, "Unable to load the current profile.");
  return data as Profile;
}

export async function getClinicSettings(): Promise<ClinicSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clinic_settings")
    .select("id, business_name, phone, email, address, operating_hours, updated_at")
    .eq("id", "default")
    .single();

  throwIfError(error, "Unable to load clinic settings.");
  if (!data) throw new Error("Clinic settings are not configured.");
  return data as ClinicSettings;
}

export async function updateClinicSettings(
  settings: Omit<ClinicSettings, "id" | "updated_at">
): Promise<ClinicSettings> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clinic_settings")
    .update({ ...settings, updated_at: new Date().toISOString() })
    .eq("id", "default")
    .select("id, business_name, phone, email, address, operating_hours, updated_at")
    .single();

  throwIfError(error, "Unable to save clinic settings.");
  if (!data) throw new Error("Clinic settings were not saved.");
  return data as ClinicSettings;
}

const GALLERY_BUCKET = "clinic-gallery";
const GALLERY_CATEGORIES = ["treatment", "equipment", "amenities"] as const;

type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

function getGalleryCategory(path: string): GalleryCategory {
  const category = path.split("/")[0];
  return GALLERY_CATEGORIES.includes(category as GalleryCategory)
    ? (category as GalleryCategory)
    : "treatment";
}

export async function listGalleryPhotos(): Promise<ClinicPhoto[]> {
  const supabase = createClient();
  const results = await Promise.all(
    GALLERY_CATEGORIES.map(async (category) => {
      const { data, error } = await supabase.storage.from(GALLERY_BUCKET).list(category, {
        limit: 100,
        sortBy: { column: "created_at", order: "desc" },
      });
      throwIfError(error, "Unable to load clinic photos.");
      return (data ?? []).map((file) => ({ file, path: `${category}/${file.name}` }));
    })
  );

  return results.flat().map(({ file, path }) => {
    const publicUrl = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl;
    const metadata = file.metadata as { size?: number } | null;

    return {
      id: path,
      name: file.name,
      category: getGalleryCategory(path),
      url: publicUrl,
      created_at: file.created_at ?? new Date().toISOString(),
      size_bytes: metadata?.size,
    } satisfies ClinicPhoto;
  });
}

export async function uploadGalleryPhoto(
  file: File,
  category: GalleryCategory
): Promise<ClinicPhoto> {
  const supabase = createClient();
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${safeName}`;
  const path = `${category}/${id}-${safeName}`;

  const { error } = await supabase.storage.from(GALLERY_BUCKET).upload(path, file, {
    cacheControl: "3600",
    contentType: file.type,
    upsert: false,
  });

  throwIfError(error, "Unable to upload the clinic photo.");

  const publicUrl = supabase.storage.from(GALLERY_BUCKET).getPublicUrl(path).data.publicUrl;
  return {
    id: path,
    name: safeName,
    category,
    url: publicUrl,
    created_at: new Date().toISOString(),
    size_bytes: file.size,
  };
}

export async function deleteGalleryPhoto(path: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(GALLERY_BUCKET).remove([path]);
  throwIfError(error, "Unable to delete the clinic photo.");
}
