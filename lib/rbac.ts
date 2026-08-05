import { UserRole } from "@/types/supabase";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  patient: 1,
  clinician: 2,
  admin: 3,
};

export const ROLE_PERMISSIONS = {
  admin: {
    canManageAppointments: true,
    canManageUsers: true,
    canUploadStorage: true,
    canViewAdminPanel: true,
    canManageSettings: true,
  },
  clinician: {
    canManageAppointments: true,
    canManageUsers: false,
    canUploadStorage: true,
    canViewAdminPanel: true,
    canManageSettings: false,
  },
  patient: {
    canManageAppointments: false,
    canManageUsers: false,
    canUploadStorage: false,
    canViewAdminPanel: false,
    canManageSettings: false,
  },
};

export function hasPermission(
  role: UserRole | undefined,
  permission: keyof typeof ROLE_PERMISSIONS.admin
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}

export function isAdmin(role?: UserRole): boolean {
  return role === "admin";
}

export function isClinician(role?: UserRole): boolean {
  return role === "clinician" || role === "admin";
}
