"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Calendar, ArrowRight, Award, Clock, Star } from "lucide-react";

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function Hero({ onOpenBooking }: HeroProps) {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-gradient-to-b from-[#FAF7F2] via-[#FCF8F2] to-[#FAF7F2]">
      {/* Background Decorative Subtle Circles */}
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#2E9B7C]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 h-80 w-80 rounded-full bg-[#C9A24B]/15 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="px-3.5 py-1.5 text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-[#7B591D]" />
                Licensed PT & OT Clinicians
              </Badge>
              <Badge variant="jade" className="px-3.5 py-1.5 text-[11px]">
                Lipa City, Batangas
              </Badge>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#032D22] leading-[1.15] tracking-tight">
              Evidence-Based <span className="text-[#064E3B] underline decoration-[#C9A24B]/40 decoration-wavy decoration-2">Rehabilitation</span> That Restores Your Active Life.
            </h1>

            <p className="text-base sm:text-lg text-[#4A5D56] leading-relaxed max-w-2xl font-body">
              Specialized Physical & Occupational Therapy in Lipa City, Batangas. We deliver targeted, hands-on treatment plans tailored to your recovery goals with new patients seen within 48 hours.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto pt-2">
              <Button
                size="lg"
                onClick={() => onOpenBooking("Physical Therapy Evaluation")}
                className="w-full sm:w-auto bg-[#064E3B] hover:bg-[#032D22] text-white shadow-md hover:shadow-lg font-bold gap-2 text-base h-13"
              >
                <Calendar className="h-5 w-5" />
                Schedule Evaluation
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto border-[#064E3B]/30 text-[#064E3B] font-semibold gap-2 text-base h-13"
              >
                <a href="#services">
                  Explore Services
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Key Stat Cards */}
            <div className="grid grid-cols-3 gap-4 w-full pt-6 border-t border-[#064E3B]/10 mt-4">
              <div className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#064E3B]">100%</span>
                <span className="text-xs font-semibold text-[#4A5D56] flex items-center gap-1 mt-0.5">
                  <Award className="h-3.5 w-3.5 text-[#C9A24B]" />
                  Licensed Clinicians
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#064E3B]">48 HR</span>
                <span className="text-xs font-semibold text-[#4A5D56] flex items-center gap-1 mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-[#2E9B7C]" />
                  Patient Access
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl sm:text-3xl font-extrabold text-[#064E3B]">5.0 ★</span>
                <span className="text-xs font-semibold text-[#4A5D56] flex items-center gap-1 mt-0.5">
                  <Star className="h-3.5 w-3.5 text-[#C9A24B] fill-[#C9A24B]" />
                  Patient Ratings
                </span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Showcase Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#064E3B]/20 to-[#C9A24B]/30 blur-xl opacity-70" />

              {/* Main Banner Image Container */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#064E3B]/20 bg-[#FCF8F2] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
                  alt="Physical therapy rehabilitation clinician assisting patient at FlexTend"
                  className="h-[360px] sm:h-[440px] w-full object-cover"
                />

                {/* Floating Badge Overlay 1 */}
                <div className="absolute top-4 left-4 rounded-2xl bg-[#FAF7F2]/95 backdrop-blur-md p-3.5 border border-[#064E3B]/15 shadow-lg flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#064E3B] flex items-center justify-center text-white">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#032D22]">Evidence-Based</div>
                    <div className="text-[11px] font-medium text-[#4A5D56]">Customized Care Plans</div>
                  </div>
                </div>

                {/* Floating Badge Overlay 2 */}
                <div className="absolute bottom-4 right-4 rounded-2xl bg-[#032D22]/95 text-white backdrop-blur-md p-3.5 border border-[#C9A24B]/40 shadow-lg flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#C9A24B] flex items-center justify-center text-[#032D22]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#F8E7C9]">Mon – Sat</div>
                    <div className="text-[11px] font-medium text-[#8A9D96]">8:00 AM – 4:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
