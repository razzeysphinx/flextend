"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { ShieldCheck, LogIn, ArrowLeft, AlertCircle, ShieldAlert } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [unauthorizedBanner, setUnauthorizedBanner] = useState(false);

  useEffect(() => {
    if (searchParams.get("unauthorized") === "true") {
      setUnauthorizedBanner(true);
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(
          error.message.toLowerCase().includes("invalid api key")
            ? "Supabase rejected the API key. Update NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local, then restart the dev server."
            : error.message
        );
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#064E3B]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />

      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#064E3B] hover:text-[#032D22] bg-[#064E3B]/10 px-4 py-2 rounded-full border border-[#064E3B]/20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Clinic Website
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border-2 border-[#C9A24B] bg-[#FCF8F2] shadow-md mb-3">
            <img
              src="https://res.cloudinary.com/zylwakez/image/upload/v1784795283/FLEXTEND_plecil.png"
              alt="FlexTend Logo"
              className="h-12 w-12 rounded-full object-cover max-w-[48px] max-h-[48px]"
              style={{ maxWidth: "48px", maxHeight: "48px" }}
            />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-[#032D22]">
            FlexTend Admin & Portal
          </h1>
          <p className="text-xs font-semibold text-[#4A5D56] mt-1">
            Sign in to access clinic appointments, RBAC controls, and Supabase storage.
          </p>
        </div>

        <Card className="bg-[#FCF8F2] border-2 border-[#064E3B]/15 shadow-2xl p-6 sm:p-8 space-y-5">
          {unauthorizedBanner && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center gap-2.5">
              <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
              <span>You must sign in as an Admin or Clinician to access the Admin Panel.</span>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold flex items-center gap-2 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {errorMessage}
            </div>
          )}

          <CardHeader className="p-0 pb-4 border-b border-[#064E3B]/10">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-[#032D22]">
                Account Sign In
              </CardTitle>
              <Badge variant="gold" className="text-[10px]">
                <ShieldCheck className="h-3 w-3" />
                Supabase Auth
              </Badge>
            </div>
            <CardDescription className="text-xs text-[#4A5D56] mt-1">
              Enter your Supabase Auth credentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-0 space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@flextend.ph"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold h-12 rounded-full gap-2 text-sm shadow-md mt-2"
              >
                <LogIn className="h-4 w-4" />
                {isLoading ? "Signing in..." : "Sign In to Portal"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-xs font-bold text-[#064E3B]">
        Loading Authentication...
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
