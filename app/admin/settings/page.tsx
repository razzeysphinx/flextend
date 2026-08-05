"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings, ShieldCheck, Database, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            Admin Settings & Supabase Integration
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Configure clinic contact details, operating hours, and Supabase project API settings.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-green-50 text-green-800 text-xs font-bold flex items-center gap-2 border border-green-200 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Settings successfully updated!
        </div>
      )}

      {/* Supabase Connection Status Card */}
      <Card className="bg-[#032D22] text-white p-6 border-2 border-[#C9A24B]/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-[#C9A24B]" />
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Supabase Project Connection</h3>
              <p className="text-xs text-[#FAF7F2]/70 font-mono">Project Ref: azyjanzhoiajltywdzge</p>
            </div>
          </div>
          <Badge variant="gold" className="font-bold text-[10px]">
            Connected & Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#064E3B]">
          <div>
            <span className="text-[#8A9D96] block mb-1">Supabase URL</span>
            <code className="bg-[#064E3B] px-3 py-1.5 rounded-lg text-white font-mono text-[11px] block truncate">
              https://azyjanzhoiajltywdzge.supabase.co
            </code>
          </div>
          <div>
            <span className="text-[#8A9D96] block mb-1">Anon Public Key</span>
            <code className="bg-[#064E3B] px-3 py-1.5 rounded-lg text-white font-mono text-[11px] block truncate">
              eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
            </code>
          </div>
        </div>
      </Card>

      {/* Clinic Details Form */}
      <Card className="bg-[#FCF8F2] border border-[#064E3B]/15 p-6">
        <CardHeader className="p-0 pb-6 mb-4 border-b border-[#064E3B]/10">
          <CardTitle className="text-xl font-bold text-[#032D22]">
            Clinic Information & Contact
          </CardTitle>
          <CardDescription className="text-xs text-[#4A5D56]">
            Details displayed across patient booking confirmation emails and footer links.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="clinic-name">Clinic Business Name</Label>
              <Input id="clinic-name" defaultValue="FlexTend Physical Therapy Clinic" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="clinic-phone">Clinic Phone Hotline</Label>
                <Input id="clinic-phone" defaultValue="+63 967 195 6863" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clinic-email">Public Inquiry Email</Label>
                <Input id="clinic-email" defaultValue="flextendtherapy2024@gmail.com" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="clinic-address">Clinic Physical Address</Label>
              <Input id="clinic-address" defaultValue="299 San Jose Subdivision, Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="clinic-hours">Operating Schedule</Label>
              <Input id="clinic-hours" defaultValue="Monday – Saturday: 8:00 AM – 4:00 PM" />
            </div>

            <div className="pt-4 border-t border-[#064E3B]/10">
              <Button type="submit" className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold rounded-full h-11 px-8 gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
