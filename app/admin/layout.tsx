import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminHeader } from "@/components/admin/header";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/server";
import { UserRole } from "@/types/supabase";
import { ShieldAlert, ArrowLeft, LogIn, Lock } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?unauthorized=true");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("email, full_name, role")
    .eq("id", user.id)
    .single();

  const role = profile?.role as UserRole | undefined;
  const isAuthorized = role === "admin" || role === "clinician";

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <Card className="bg-[#FCF8F2] border-2 border-red-200 shadow-2xl p-8 text-center space-y-6">
            <div className="h-16 w-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <div>
              <Badge variant="terracotta" className="mb-2 text-[10px] font-bold">
                <Lock className="h-3 w-3" />
                403 Unauthorized Access
              </Badge>
              <CardTitle className="text-2xl font-extrabold text-[#032D22]">
                Admin Access Denied
              </CardTitle>
              <CardDescription className="text-xs text-[#4A5D56] mt-2 leading-relaxed">
                You do not have permission to view the FlexTend Admin Portal. This area is restricted to authenticated <strong className="text-[#064E3B]">Admin</strong> and <strong className="text-[#2E9B7C]">Clinician</strong> accounts.
              </CardDescription>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <Button
                asChild
                className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-xs py-3 rounded-full gap-2 shadow"
              >
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Sign In with Admin / Clinician Account
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full border-[#064E3B]/20 text-[#064E3B] font-bold text-xs py-3 rounded-full gap-2"
              >
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Public Website
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAF7F2]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          email={profile?.email ?? user.email ?? "Unknown user"}
          role={role}
        />
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
