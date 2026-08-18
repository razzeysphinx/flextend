"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createAppointment } from "@/lib/supabase/data";
import { Calendar, Phone, Mail, Clock, MapPin, CheckCircle2, ShieldCheck } from "lucide-react";

export function BookingSection() {
  const [selectedService, setSelectedService] = useState("Physical Therapy Evaluation");
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phoneNum || !email) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      await createAppointment({
        patient_name: name,
        patient_phone: phoneNum,
        patient_email: email,
        service_title: selectedService,
        notes: symptoms || `Inline Form Request for ${selectedService}`,
      });

      setSubmittedMessage(true);
      setName("");
      setPhoneNum("");
      setEmail("");
      setSymptoms("");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to submit the intake request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#FCF8F2] relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Info */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C9A24B] bg-[#C9A24B]/15 px-3.5 py-1.5 rounded-full border border-[#C9A24B]">
              Appointment Intake
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
              Ready to Start Your Recovery?
            </h2>

            <p className="text-[#4A5D56] text-base leading-relaxed">
              Schedule your physical or occupational therapy evaluation today. Submissions are linked live to our clinic admin portal.
            </p>

            {/* Quick Contact & Info List */}
            <div className="space-y-4 pt-4 border-t border-[#064E3B]/10">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                    Clinic Address
                  </div>
                  <a
                    href="https://maps.app.goo.gl/QBoQGC5gAwqWQKBH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#032D22] hover:underline"
                  >
                    299 San Jose Subd., Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                    Phone & Hotline
                  </div>
                  <a
                    href="tel:+639671956863"
                    className="text-sm font-semibold text-[#032D22] hover:underline"
                  >
                    +63 967 195 6863
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                    Email Inquiry
                  </div>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=flextendtherapy2024@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#032D22] hover:underline"
                  >
                    flextendtherapy2024@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#064E3B] uppercase tracking-wider">
                    Operating Hours
                  </div>
                  <div className="text-sm font-semibold text-[#032D22]">
                    Monday – Saturday: 8:00 AM – 4:00 PM
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Inline Form Card */}
          <div className="lg:col-span-7">
            <Card className="bg-[#FAF7F2] border-2 border-[#064E3B]/20 p-8 shadow-xl">
              <CardHeader className="p-0 pb-6 mb-4 border-b border-[#064E3B]/10">
                <CardTitle className="text-2xl font-extrabold text-[#032D22]">
                  Book an Evaluation Appointment
                </CardTitle>
                <CardDescription className="text-sm text-[#4A5D56]">
                  Submit your contact details and the clinic team will contact you to confirm an appointment time.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                {submittedMessage && (
                  <div className="mb-4 p-3 rounded-2xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
                    Intake recorded! The clinic team will contact you to confirm a time.
                  </div>
                )}

                {errorMessage && (
                  <div role="alert" className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-700">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="inline-service">Preferred Specialty / Treatment Area</Label>
                    <select
                      id="inline-service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="flex h-12 w-full rounded-xl border border-[#064E3B]/20 bg-white px-4 py-2 text-sm font-semibold text-[#032D22] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                    >
                      <option value="Physical Therapy Evaluation">Physical Therapy Evaluation</option>
                      <option value="Occupational Therapy Evaluation">Occupational Therapy Evaluation</option>
                      <option value="Pediatric Rehabilitation">Pediatric Physical & Occupational Therapy</option>
                      <option value="Sports Injury Rehabilitation">Sports Injury Rehabilitation</option>
                      <option value="Dry Needling Therapy">Dry Needling & Myofascial Relief</option>
                      <option value="Neurological Rehabilitation">Stroke & Neurological Rehabilitation</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="inline-name">Full Name *</Label>
                    <Input
                      id="inline-name"
                      placeholder="e.g. Maria Santos"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="inline-phone">Phone Number *</Label>
                      <Input
                        id="inline-phone"
                        type="tel"
                        placeholder="+63 9XX XXX XXXX"
                        maxLength={13}
                        required
                        value={phoneNum}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.length <= 13) setPhoneNum(val);
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="inline-email">Email Address *</Label>
                      <Input
                        id="inline-email"
                        type="email"
                        placeholder="maria@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="inline-symptoms">Symptoms or Goals (Optional)</Label>
                    <textarea
                      id="inline-symptoms"
                      rows={3}
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Briefly describe your pain, injury, or therapy goals..."
                      className="w-full rounded-xl border border-[#064E3B]/20 bg-white p-3 text-sm text-[#0A1C16] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#064E3B]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col gap-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold text-base h-[52px] rounded-full shadow-md gap-2"
                    >
                      <Calendar className="h-5 w-5" />
                      {isSubmitting ? "Submitting..." : "Submit Intake Request"}
                    </Button>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-xs text-[#4A5D56] text-center pt-2">
                    <ShieldCheck className="h-4 w-4 text-[#2E9B7C]" />
                    Submissions sync live to the Admin Panel.
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
