"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Profile, UserRole } from "@/types/supabase";
import { listProfiles, updateProfileRole } from "@/lib/supabase/data";
import { Search, ShieldCheck, UserCheck, Lock } from "lucide-react";

export default function PatientsRBACPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<Profile[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadUsers = async () => {
      try {
        const nextUsers = await listProfiles();
        if (isMounted) {
          setUsers(nextUsers);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load user profiles.");
        }
      }
    };

    void loadUsers();
    const refreshTimer = window.setInterval(loadUsers, 30000);
    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const updated = await updateProfileRole(userId, newRole);
      setUsers((current) => current.map((user) => user.id === userId ? updated : user));
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to update the user role.");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {errorMessage && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            User Directory & RBAC Control
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Manage user accounts and assign system permissions (`Admin`, `Clinician`, `Patient`).
          </p>
        </div>
      </div>

      {/* Permissions Summary Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#032D22] text-white p-4 border-2 border-[#C9A24B]/30">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-5 w-5 text-[#C9A24B]" />
            <span className="font-bold text-sm text-[#C9A24B]">👑 Admin Role</span>
          </div>
          <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
            Full system control: Manage appointments, edit RBAC roles, upload storage files, change settings.
          </p>
        </Card>

        <Card className="bg-[#FCF8F2] p-4 border border-[#2E9B7C]/40">
          <div className="flex items-center gap-2 mb-2">
            <UserCheck className="h-5 w-5 text-[#2E9B7C]" />
            <span className="font-bold text-sm text-[#064E3B]">🩺 Clinician Role</span>
          </div>
          <p className="text-xs text-[#4A5D56] leading-relaxed">
            Clinical management: View & update appointments status, upload therapy images.
          </p>
        </Card>

        <Card className="bg-[#FCF8F2] p-4 border border-[#064E3B]/10">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-5 w-5 text-[#064E3B]" />
            <span className="font-bold text-sm text-[#032D22]">👤 Patient Role</span>
          </div>
          <p className="text-xs text-[#4A5D56] leading-relaxed">
            Public client: Book evaluation appointments, explore interactive body map. Access to `/admin` denied.
          </p>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A9D96]" />
          <Input
            placeholder="Search users by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 text-xs bg-white rounded-full border-[#064E3B]/20"
          />
        </div>
      </Card>

      {/* User Directory Table */}
      <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#064E3B]/10 text-[#064E3B] font-bold uppercase tracking-wider">
                <th className="pb-3 px-3">User Profile</th>
                <th className="pb-3 px-3">Email</th>
                <th className="pb-3 px-3">Current Role</th>
                <th className="pb-3 px-3">Joined Date</th>
                <th className="pb-3 px-3 text-right">Assign RBAC Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#064E3B]/10">
              {filteredUsers.map((usr) => (
                <tr key={usr.id} className="hover:bg-[#064E3B]/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-[#032D22]">
                    {usr.full_name}
                    <div className="text-[10px] text-[#4A5D56] font-normal">{usr.id}</div>
                  </td>
                  <td className="py-3 px-3 font-medium text-[#4A5D56]">{usr.email}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        usr.role === "admin"
                          ? "gold"
                          : usr.role === "clinician"
                          ? "jade"
                          : "outline"
                      }
                      className="text-[10px] font-bold uppercase"
                    >
                      {usr.role}
                    </Badge>
                  </td>
                  <td className="py-3 px-3 text-[#4A5D56]">{usr.created_at}</td>
                  <td className="py-3 px-3 text-right">
                    <select
                      value={usr.role}
                      onChange={(e) => handleRoleChange(usr.id, e.target.value as UserRole)}
                      className="h-9 px-3 rounded-full border border-[#064E3B]/20 bg-white text-xs font-bold text-[#032D22] focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                    >
                      <option value="patient">Patient Role</option>
                      <option value="clinician">Clinician Role</option>
                      <option value="admin">Admin Role</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
