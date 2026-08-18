"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Appointment, Profile } from "@/types/supabase";
import { listAppointments, listGalleryPhotos, listProfiles } from "@/lib/supabase/data";
import {
  CalendarCheck,
  Users,
  Image as ImageIcon,
  TrendingUp,
  CheckCircle2,
  Plus,
  Inbox,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [photoCount, setPhotoCount] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      try {
        const [nextAppointments, nextUsers, nextPhotos] = await Promise.all([
          listAppointments(),
          listProfiles(),
          listGalleryPhotos(),
        ]);
        if (isMounted) {
          setAppointments(nextAppointments);
          setUsers(nextUsers);
          setPhotoCount(nextPhotos.length);
          setErrorMessage("");
        }
      } catch (error) {
        if (isMounted) {
          setErrorMessage(error instanceof Error ? error.message : "Unable to load dashboard data.");
        }
      }
    };

    void loadData();
    const refreshTimer = window.setInterval(loadData, 30000);
    return () => {
      isMounted = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const totalIntakes = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === "confirmed").length;
  const pendingCount = appointments.filter((a) => a.status === "pending").length;

  const stats = [
    {
      title: "Total Intake Requests",
      value: `${totalIntakes}`,
      change: `${pendingCount} pending review`,
      icon: CalendarCheck,
      color: "text-[#064E3B]",
      bg: "bg-[#064E3B]/10",
    },
    {
      title: "Confirmed Appointments",
      value: `${confirmedCount}`,
      change: "Scheduled for clinic",
      icon: CheckCircle2,
      color: "text-[#2E9B7C]",
      bg: "bg-[#2E9B7C]/15",
    },
    {
      title: "Registered Users & Staff",
      value: `${users.length}`,
      change: "Active RBAC profiles",
      icon: Users,
      color: "text-[#7B591D]",
      bg: "bg-[#C9A24B]/20",
    },
    {
      title: "Supabase Storage Assets",
      value: photoCount === null ? "—" : `${photoCount}`,
      change: "Live clinic media assets",
      icon: ImageIcon,
      color: "text-[#C1663F]",
      bg: "bg-[#C1663F]/15",
    },
  ];

  return (
    <div className="space-y-8">
      {errorMessage && (
        <div role="alert" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Real-time live summary of FlexTend clinic appointments, patients, and Supabase assets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-xs rounded-full gap-2 px-5 py-2.5 shadow-sm"
          >
            <Link href="/admin/appointments">
              <Plus className="h-4 w-4" />
              Manage Intake Requests
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="bg-[#FCF8F2] border border-[#064E3B]/10 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#4A5D56]">{stat.title}</span>
                <div className={`h-10 w-10 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-[#032D22] font-heading">{stat.value}</div>
              <div className="text-xs font-semibold text-[#2E9B7C] flex items-center gap-1 mt-2">
                <TrendingUp className="h-3.5 w-3.5" />
                {stat.change}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Appointments & Storage Quick Shortcuts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Intake Table */}
        <div className="lg:col-span-8">
          <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-6">
            <CardHeader className="p-0 pb-4 border-b border-[#064E3B]/10 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold text-[#032D22]">
                  Live Intake Submissions
                </CardTitle>
                <CardDescription className="text-xs text-[#4A5D56]">
                  Real-time appointment requests submitted from the website landing page
                </CardDescription>
              </div>
              <Button asChild variant="outline" size="sm" className="text-xs font-bold text-[#064E3B] border-[#064E3B]/20 rounded-full">
                <Link href="/admin/appointments">View All →</Link>
              </Button>
            </CardHeader>

            <CardContent className="p-0 pt-4">
              {appointments.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#4A5D56] space-y-3">
                  <div className="h-12 w-12 rounded-full bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mx-auto">
                    <Inbox className="h-6 w-6" />
                  </div>
                  <p className="font-bold text-sm text-[#032D22]">No intake requests yet</p>
                  <p className="max-w-md mx-auto text-[#4A5D56]">
                    Submit an appointment form on the <Link href="/" className="text-[#064E3B] underline font-bold" target="_blank">public website landing page</Link> to see it appear here live!
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#064E3B]/10 text-[#064E3B] font-bold uppercase tracking-wider">
                        <th className="pb-3 px-2">Patient</th>
                        <th className="pb-3 px-2">Requested Service</th>
                        <th className="pb-3 px-2">Time / Date</th>
                        <th className="pb-3 px-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#064E3B]/10">
                      {appointments.slice(0, 5).map((b) => (
                        <tr key={b.id} className="hover:bg-[#064E3B]/5 transition-colors">
                          <td className="py-3 px-2">
                            <div className="font-bold text-[#032D22]">{b.patient_name}</div>
                            <div className="text-[10px] text-[#4A5D56]">{b.patient_phone}</div>
                          </td>
                          <td className="py-3 px-2 font-semibold text-[#032D22]">{b.service_title}</td>
                          <td className="py-3 px-2 text-[#4A5D56] font-medium">{b.preferred_date || b.created_at}</td>
                          <td className="py-3 px-2">
                            <Badge
                              variant={b.status === "confirmed" ? "jade" : b.status === "pending" ? "secondary" : "default"}
                              className="text-[10px] font-bold capitalize"
                            >
                              {b.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-[#032D22] text-white p-6 border-2 border-[#C9A24B]/30 shadow-xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C9A24B] bg-[#C9A24B]/20 px-3 py-1 rounded-full border border-[#C9A24B]/40">
              Supabase Storage
            </span>
            <h3 className="font-heading text-xl font-bold mt-3 mb-2 text-white">
              Clinic Photo Bucket
            </h3>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed mb-6">
              Upload and manage treatment facility images, equipment photos, and patient resources directly via Supabase Storage.
            </p>
            <Button
              asChild
              className="w-full bg-[#C9A24B] hover:bg-[#B8923A] text-[#032D22] font-extrabold text-xs py-3 rounded-full gap-2 shadow"
            >
              <Link href="/admin/gallery">
                <ImageIcon className="h-4 w-4" />
                Manage Supabase Photos
              </Link>
            </Button>
          </Card>

          <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-6 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B]">
              RBAC Role Control
            </span>
            <p className="text-xs text-[#4A5D56]">
              Assign user privileges (`Admin`, `Clinician`, `Patient`) to enforce system access security.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full border-[#064E3B]/20 text-[#064E3B] font-bold text-xs py-2.5 rounded-full"
            >
              <Link href="/admin/patients">
                <Users className="h-4 w-4 mr-1.5" />
                View User RBAC Directory
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
