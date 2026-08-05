"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Appointment, AppointmentStatus } from "@/types/supabase";
import { getAppointments, updateAppointmentStatus } from "@/lib/store";
import { CalendarCheck, Search, CheckCircle2, Clock, XCircle, Phone, Mail, Inbox, ExternalLink } from "lucide-react";

export default function AppointmentsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadData = () => {
    setAppointments(getAppointments());
  };

  useEffect(() => {
    loadData();
    window.addEventListener("flextend_appointments_updated", loadData);
    return () => {
      window.removeEventListener("flextend_appointments_updated", loadData);
    };
  }, []);

  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    const updated = updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesSearch =
      apt.patient_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.service_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#FCF8F2] p-6 rounded-3xl border border-[#064E3B]/15 shadow-sm">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#032D22]">
            Appointments & Intake Management
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5D56] mt-1">
            Review patient evaluation requests, confirm schedules, or update appointment status live.
          </p>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8A9D96]" />
            <Input
              placeholder="Search patient name or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-xs bg-white rounded-full border-[#064E3B]/20"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((st) => (
              <Button
                key={st}
                size="sm"
                variant={filterStatus === st ? "default" : "outline"}
                onClick={() => setFilterStatus(st)}
                className={`text-xs font-bold capitalize rounded-full h-8 px-3.5 ${
                  filterStatus === st
                    ? "bg-[#064E3B] text-white"
                    : "text-[#064E3B] border-[#064E3B]/20"
                }`}
              >
                {st}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card className="bg-[#FCF8F2] border border-[#064E3B]/10 p-12 text-center">
            <div className="h-14 w-14 rounded-full bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center mx-auto mb-3">
              <Inbox className="h-7 w-7" />
            </div>
            <h3 className="font-heading text-lg font-bold text-[#032D22]">
              No appointments found
            </h3>
            <p className="text-xs text-[#4A5D56] max-w-md mx-auto mt-1 leading-relaxed">
              When patients fill out an intake request on the website landing page or booking modal, their details will appear here live!
            </p>
            <div className="pt-4">
              <Button asChild variant="outline" className="text-xs font-bold text-[#064E3B] border-[#064E3B]/20 rounded-full px-6">
                <Link href="/" target="_blank">
                  Open Public Site & Test Booking <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          </Card>
        ) : (
          filteredAppointments.map((apt) => (
            <Card
              key={apt.id}
              className="bg-[#FCF8F2] border border-[#064E3B]/15 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Patient Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#C9A24B] bg-[#C9A24B]/15 px-2.5 py-0.5 rounded-full border border-[#C9A24B]/30">
                      {apt.id}
                    </span>
                    <h3 className="font-heading text-lg font-extrabold text-[#032D22]">
                      {apt.patient_name}
                    </h3>
                    <Badge
                      variant={
                        apt.status === "confirmed"
                          ? "jade"
                          : apt.status === "pending"
                          ? "secondary"
                          : apt.status === "completed"
                          ? "default"
                          : "terracotta"
                      }
                      className="text-[10px] font-bold capitalize"
                    >
                      {apt.status}
                    </Badge>
                  </div>

                  <div className="text-xs font-bold text-[#064E3B]">{apt.service_title}</div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#4A5D56] pt-1">
                    <span className="flex items-center gap-1 font-semibold text-[#032D22]">
                      <Phone className="h-3.5 w-3.5 text-[#2E9B7C]" />
                      {apt.patient_phone}
                    </span>
                    {apt.patient_email && (
                      <span className="flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-[#2E9B7C]" />
                        {apt.patient_email}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-[#C9A24B] font-bold">
                      <Clock className="h-3.5 w-3.5" />
                      Submitted: {apt.preferred_date || apt.created_at}
                    </span>
                  </div>

                  {apt.notes && (
                    <p className="text-xs text-[#4A5D56] italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#064E3B]/10 max-w-xl">
                      &ldquo;{apt.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
                  {apt.status !== "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(apt.id, "confirmed")}
                      className="bg-[#2E9B7C] hover:bg-[#258369] text-white font-bold text-xs rounded-full gap-1"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Confirm
                    </Button>
                  )}
                  {apt.status !== "completed" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(apt.id, "completed")}
                      className="bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-xs rounded-full gap-1"
                    >
                      Complete
                    </Button>
                  )}
                  {apt.status !== "cancelled" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(apt.id, "cancelled")}
                      className="border-red-200 text-red-600 hover:bg-red-50 font-bold text-xs rounded-full gap-1"
                    >
                      <XCircle className="h-3.5 w-3.5" />
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
