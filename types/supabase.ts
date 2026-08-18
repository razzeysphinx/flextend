export type UserRole = "admin" | "clinician" | "patient";

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  service_title: string;
  preferred_date?: string;
  notes?: string;
  status: AppointmentStatus;
  created_at: string;
  updated_at?: string;
}

export interface ClinicPhoto {
  id: string;
  name: string;
  url: string;
  category: "treatment" | "equipment" | "amenities";
  created_at: string;
  size_bytes?: number;
}

export interface ClinicSettings {
  id: "default";
  business_name: string;
  phone: string;
  email: string;
  address: string;
  operating_hours: string;
  updated_at: string;
}
