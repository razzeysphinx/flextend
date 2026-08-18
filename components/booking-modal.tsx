"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAppointment } from "@/lib/supabase/data";
import { Calendar, CheckCircle2, ShieldCheck } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  serviceName = "Physical Therapy Evaluation",
}: BookingModalProps) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setSavedSuccess(false);
    setIsSubmitting(false);
    setErrorMessage("");
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
      onClose();
    }
  };

  const handleSubmitIntake = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = fullName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    if (!trimmedName || !trimmedPhone || !trimmedEmail) {
      setErrorMessage("Please complete your name, phone number, and email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await createAppointment({
        patient_name: trimmedName,
        patient_phone: trimmedPhone,
        patient_email: trimmedEmail,
        service_title: serviceName,
        notes: `Requested via Landing Page Modal for ${serviceName}`,
      });
      setSavedSuccess(true);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit the intake request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-w-2xl bg-[#FAF7F2] p-6 sm:p-8 rounded-3xl border border-[#064E3B]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-[#032D22]">
            Patient Intake Information
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-[#4A5D56]">
            Provide your contact details and the clinic team will contact you to confirm an appointment time.
          </DialogDescription>
        </DialogHeader>

        {savedSuccess ? (
          <div className="space-y-4 mt-2">
            <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-sm font-bold flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
              <span>Your intake request was saved. The clinic team will contact you to confirm your appointment.</span>
            </div>
            <Button
              type="button"
              onClick={onClose}
              className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold h-11 rounded-full"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitIntake} className="space-y-4 mt-2">
            {errorMessage && (
              <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                {errorMessage}
              </div>
            )}

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
                autoComplete="name"
                minLength={2}
                maxLength={120}
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
                  inputMode="tel"
                  autoComplete="tel"
                  minLength={7}
                  maxLength={32}
                  required
                  value={phone}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 32) setPhone(value);
                  }}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="modal-email">Email Address *</Label>
                <Input
                  id="modal-email"
                  type="email"
                  placeholder="maria@example.com"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-sm h-11 rounded-full gap-2"
            >
              <Calendar className="h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit Intake Request"}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8A9D96] pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#2E9B7C]" />
              Your request is saved securely for the clinic team.
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
