"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAppointment } from "@/lib/store";
import { Calendar, ArrowRight, ArrowLeft, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
  initialStep?: number;
}

export function BookingModal({
  isOpen,
  onClose,
  serviceName = "Physical Therapy Evaluation",
  initialStep = 1,
}: BookingModalProps) {
  const [step, setStep] = useState(initialStep);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setStep(initialStep);
    setSavedSuccess(false);
  }, [initialStep, isOpen]);

  const handleSubmitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    // Save to live store so it appears on Admin Panel
    saveAppointment({
      patient_name: fullName,
      patient_phone: phone,
      patient_email: email,
      service_title: serviceName,
      notes: `Requested via Landing Page Modal for ${serviceName}`,
    });

    setSavedSuccess(true);
    setStep(2);
  };

  const CALENDLY_URL = "https://calendly.com/flextendtherapy2024";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#064E3B]/20">
        <DialogHeader>
          {/* Stepper Tabs Header */}
          <div className="flex items-center gap-2 mb-4 bg-[#064E3B]/10 p-1.5 rounded-full text-xs font-bold">
            <button
              onClick={() => setStep(1)}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-2 transition-all ${
                step === 1
                  ? "bg-[#064E3B] text-white shadow-sm"
                  : "text-[#064E3B] hover:bg-[#064E3B]/10"
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                1
              </span>
              1. Intake Details
            </button>
            <div className="w-4 h-[2px] bg-[#064E3B]/20" />
            <button
              onClick={() => setStep(2)}
              className={`flex-1 py-2 px-3 rounded-full flex items-center justify-center gap-2 transition-all ${
                step === 2
                  ? "bg-[#064E3B] text-white shadow-sm"
                  : "text-[#064E3B] hover:bg-[#064E3B]/10"
              }`}
            >
              <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                2
              </span>
              2. Calendly Portal
            </button>
          </div>

          <DialogTitle className="text-2xl font-extrabold text-[#032D22]">
            {step === 1 ? "Patient Intake Information" : "Select Live Appointment Slot"}
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#4A5D56]">
            {step === 1
              ? "Provide your contact details. This will automatically record your request in the clinic admin panel."
              : "Pick a date and time slot via FlexTend's official Calendly scheduling calendar below."}
          </DialogDescription>
        </DialogHeader>

        {/* STEP 1: INTAKE FORM */}
        {step === 1 && (
          <form onSubmit={handleSubmitIntake} className="space-y-4 mt-2">
            <div className="flex items-center justify-between gap-2 p-3 bg-[#FCF8F2] border border-[#C9A24B]/30 rounded-2xl text-xs">
              <span className="font-semibold text-[#032D22] flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#064E3B]" />
                Prefer scheduling on Calendly directly?
              </span>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#032D22] bg-[#C9A24B] px-3 py-1 rounded-full flex items-center gap-1 hover:bg-[#B8923A] transition-colors"
              >
                Open Calendly <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="modal-service">Requested Service Focus</Label>
              <Input
                id="modal-service"
                value={serviceName}
                readOnly
                className="bg-[#FCF8F2] font-bold text-[#064E3B] cursor-not-allowed border-[#064E3B]/20"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="modal-name">Full Name *</Label>
              <Input
                id="modal-name"
                placeholder="e.g. Maria Santos"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="modal-phone">Phone Number *</Label>
                <Input
                  id="modal-phone"
                  type="tel"
                  placeholder="+63 9XX XXX XXXX"
                  maxLength={13}
                  required
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val.length <= 13) setPhone(val);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="modal-email">Email Address *</Label>
                <Input
                  id="modal-email"
                  type="email"
                  placeholder="maria@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center border border-[#064E3B]/20 text-[#064E3B] font-bold text-xs py-3 rounded-full hover:bg-[#064E3B]/10 transition-colors flex items-center justify-center gap-1"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Direct Link
              </a>
              <Button
                type="submit"
                className="flex-[1.5] bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-sm h-11 rounded-full gap-2"
              >
                Next: Save Intake & Calendly
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A9D96] pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2E9B7C]" />
              Your request is saved live to the Admin Panel.
            </div>
          </form>
        )}

        {/* STEP 2: CALENDLY SCHEDULER EMBED */}
        {step === 2 && (
          <div className="space-y-4 mt-2">
            {savedSuccess && (
              <div className="p-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                <span>Intake submission saved! Viewable live in Admin Panel under Appointments.</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-[#064E3B] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Intake Info
              </button>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#7B591D] bg-[#C9A24B]/20 px-3 py-1 rounded-full border border-[#C9A24B] flex items-center gap-1"
              >
                Open in New Tab <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            {/* Embedded Calendly Frame */}
            <div className="w-full h-[380px] rounded-2xl border border-[#064E3B]/20 overflow-hidden bg-white shadow-inner">
              <iframe
                src={CALENDLY_URL}
                title="FlexTend Live Calendly Scheduler"
                className="w-full h-full border-0"
              />
            </div>

            <div className="pt-2">
              <Button
                onClick={onClose}
                variant="outline"
                className="w-full border-[#064E3B]/30 text-[#064E3B] font-bold rounded-full py-3"
              >
                Complete & Close Window
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
