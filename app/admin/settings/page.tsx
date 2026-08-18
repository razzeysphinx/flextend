"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Database, Save, ShieldCheck } from "lucide-react";
import {
  getClinicSettings,
  getCurrentProfile,
  updateClinicSettings,
} from "@/lib/supabase/data";
import { ClinicSettings } from "@/types/supabase";

const EMPTY_SETTINGS: ClinicSettings = {
  id: "default",
  business_name: "",
  phone: "",
  email: "",
  address: "",
  operating_hours: "",
  updated_at: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<ClinicSettings>(EMPTY_SETTINGS);
  const [canEdit, setCanEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadSettings = async () => {
      try {
        const [nextSettings, profile] = await Promise.all([
          getClinicSettings(),
          getCurrentProfile(),
        ]);
        if (isMounted) {
          setSettings(nextSettings);
          setCanEdit(profile?.role === "admin");
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load clinic settings.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    void loadSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  const updateField = (field: keyof Omit<ClinicSettings, "id" | "updated_at">, value: string) => {
    setSettings((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;

    setIsSaving(true);
    setErrorMessage("");
    setSaved(false);

    try {
      const updated = await updateClinicSettings({
        business_name: settings.business_name,
        phone: settings.phone,
        email: settings.email,
        address: settings.address,
        operating_hours: settings.operating_hours,
      });
      setSettings(updated);
      setSaved(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to save clinic settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const fieldDisabled = isLoading || !canEdit || isSaving;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "Not configured";

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            Admin Settings & Supabase Integration
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Persistent clinic details used by the administration portal.
          </p>
        </div>
        <Badge variant={canEdit ? "gold" : "secondary"} className="self-start sm:self-center font-bold text-[10px]">
          <ShieldCheck className="h-3.5 w-3.5" />
          {canEdit ? "Admin Editing" : "View Only"}
        </Badge>
      </div>

      {errorMessage && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {saved && (
        <div role="status" className="p-4 rounded-2xl bg-green-50 text-green-800 text-xs font-bold flex items-center gap-2 border border-green-200 shadow-sm">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          Settings successfully updated.
        </div>
      )}

      <Card className="bg-[#032D22] text-white p-6 border-2 border-[#C9A24B]/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="h-6 w-6 text-[#C9A24B]" />
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Supabase Project Connection</h3>
              <p className="text-xs text-[#FAF7F2]/70 font-mono">Project-backed configuration</p>
            </div>
          </div>
          <Badge variant="gold" className="font-bold text-[10px]">Configured</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-[#064E3B]">
          <div>
            <span className="text-[#8A9D96] block mb-1">Supabase URL</span>
            <code className="bg-[#064E3B] px-3 py-1.5 rounded-lg text-white font-mono text-[11px] block truncate">
              {supabaseUrl}
            </code>
          </div>
          <div>
            <span className="text-[#8A9D96] block mb-1">Client key</span>
            <code className="bg-[#064E3B] px-3 py-1.5 rounded-lg text-white font-mono text-[11px] block">
              Publishable key configured
            </code>
          </div>
        </div>
      </Card>

      {!canEdit && !isLoading && (
        <div className="rounded-2xl border border-[#C9A24B]/30 bg-[#C9A24B]/10 p-4 text-xs font-semibold text-[#7B591D]">
          Only Admin accounts can change clinic settings. Clinicians can view the current values.
        </div>
      )}

      <Card className="bg-[#FCF8F2] border border-[#064E3B]/15 p-6">
        <CardHeader className="p-0 pb-6 mb-4 border-b border-[#064E3B]/10">
          <CardTitle className="text-xl font-bold text-[#032D22]">Clinic Information & Contact</CardTitle>
          <CardDescription className="text-xs text-[#4A5D56]">
            These values are stored in Supabase and can be reused by public contact and booking surfaces.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="clinic-name">Clinic Business Name</Label>
              <Input id="clinic-name" value={settings.business_name} disabled={fieldDisabled} onChange={(e) => updateField("business_name", e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="clinic-phone">Clinic Phone Hotline</Label>
                <Input id="clinic-phone" value={settings.phone} disabled={fieldDisabled} onChange={(e) => updateField("phone", e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clinic-email">Public Inquiry Email</Label>
                <Input id="clinic-email" type="email" value={settings.email} disabled={fieldDisabled} onChange={(e) => updateField("email", e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="clinic-address">Clinic Physical Address</Label>
              <Input id="clinic-address" value={settings.address} disabled={fieldDisabled} onChange={(e) => updateField("address", e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="clinic-hours">Operating Schedule</Label>
              <Input id="clinic-hours" value={settings.operating_hours} disabled={fieldDisabled} onChange={(e) => updateField("operating_hours", e.target.value)} />
            </div>

            <div className="pt-4 border-t border-[#064E3B]/10">
              <Button type="submit" disabled={fieldDisabled} className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold rounded-full h-11 px-8 gap-2">
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
