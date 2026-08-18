"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { UserRole } from "@/types/supabase";
import { LogOut, ShieldCheck, User } from "lucide-react";

export function AdminHeader({
  email,
  role,
}: {
  email: string;
  role: UserRole;
}) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2] border-b border-[#064E3B]/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h2 className="font-heading text-lg font-bold text-[#032D22]">
          {role === "admin" ? "Admin Control Center" : "Clinician Workspace"}
        </h2>
        <Badge
          variant={role === "admin" ? "gold" : role === "clinician" ? "jade" : "secondary"}
          className="text-[10px] font-bold"
        >
          <ShieldCheck className="h-3 w-3" />
          Role: {role.toUpperCase()}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 bg-[#FCF8F2] px-3.5 py-1.5 rounded-full border border-[#064E3B]/15">
          <div className="h-7 w-7 rounded-full bg-[#064E3B] text-white flex items-center justify-center text-xs font-bold">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-[#032D22]">{email}</span>
            <span className="text-[10px] text-[#4A5D56] font-semibold">Active Session</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="border-[#064E3B]/20 text-[#064E3B] hover:bg-red-50 hover:text-red-700 hover:border-red-200 text-xs font-bold rounded-full gap-1.5 px-4"
        >
          <LogOut className="h-3.5 w-3.5" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
