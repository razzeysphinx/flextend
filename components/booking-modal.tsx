"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { saveAppointment } from "@/lib/store";
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

  useEffect(() => {
    if (isOpen) {
      setFullName("");
      setPhone("");
      setEmail("");
      setSavedSuccess(false);
    }
  }, [isOpen]);

  const handleSubmitIntake = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) return;

    saveAppointment({
      patient_name: fullName,
      patient_phone: phone,
      patient_email: email,
      service_title: serviceName,
      notes: `Requested via Landing Page Modal for ${serviceName}`,
    });

    setSavedSuccess(true);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
                    const value = e.target.value;
                    if (value.length <= 13) setPhone(value);
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

            <Button
              type="submit"
              className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-sm h-11 rounded-full gap-2"
            >
              <Calendar className="h-4 w-4" />
              Submit Intake Request
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
