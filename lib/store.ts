import { Appointment, AppointmentStatus, Profile, UserRole } from "@/types/supabase";

const APPOINTMENTS_KEY = "flextend_live_appointments";
const USERS_KEY = "flextend_live_users";

const APPOINTMENT_STATUS_TRANSITIONS: Record<AppointmentStatus, AppointmentStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

// Default Initial Admin User Account
const INITIAL_USERS: Profile[] = [
  {
    id: "USR-ADMIN-01",
    email: "admin@flextend.ph",
    full_name: "Dr. Admin Peral (Clinic Director)",
    role: "admin",
    created_at: new Date().toISOString().split("T")[0],
  },
  {
    id: "USR-CLINICIAN-01",
    email: "dr.santos@flextend.ph",
    full_name: "Maria Santos, PTRP",
    role: "clinician",
    created_at: new Date().toISOString().split("T")[0],
  },
];

export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveAppointment(data: {
  patient_name: string;
  patient_phone: string;
  patient_email?: string;
  service_title: string;
  preferred_date?: string;
  notes?: string;
}): Appointment {
  const current = getAppointments();
  const newApt: Appointment = {
    id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    patient_name: data.patient_name,
    patient_phone: data.patient_phone,
    patient_email: data.patient_email || "",
    service_title: data.service_title,
    preferred_date: data.preferred_date || new Date().toLocaleString(),
    notes: data.notes || "",
    status: "pending",
    created_at: new Date().toLocaleString(),
  };

  const updated = [newApt, ...current];
  if (typeof window !== "undefined") {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("flextend_appointments_updated"));
  }
  return newApt;
}

export function updateAppointmentStatus(id: string, newStatus: AppointmentStatus): Appointment[] {
  const current = getAppointments();
  const updated = current.map((apt) =>
    apt.id === id && APPOINTMENT_STATUS_TRANSITIONS[apt.status].includes(newStatus)
      ? { ...apt, status: newStatus }
      : apt
  );
  if (typeof window !== "undefined") {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("flextend_appointments_updated"));
  }
  return updated;
}

export function canTransitionAppointmentStatus(
  currentStatus: AppointmentStatus,
  nextStatus: AppointmentStatus
): boolean {
  return APPOINTMENT_STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
}

export function deleteAppointment(id: string): Appointment[] {
  const current = getAppointments();
  const updated = current.filter((apt) => apt.id !== id || apt.status !== "cancelled");
  if (typeof window !== "undefined" && updated.length !== current.length) {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("flextend_appointments_updated"));
  }
  return updated;
}

export function getUsers(): Profile[] {
  if (typeof window === "undefined") return INITIAL_USERS;
  try {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(data);
  } catch {
    return INITIAL_USERS;
  }
}

export function updateUserRole(id: string, newRole: UserRole): Profile[] {
  const current = getUsers();
  const updated = current.map((u) => (u.id === id ? { ...u, role: newRole } : u));
  if (typeof window !== "undefined") {
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("flextend_users_updated"));
  }
  return updated;
}
