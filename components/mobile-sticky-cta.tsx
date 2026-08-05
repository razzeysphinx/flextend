"use client";

import React from "react";
import { Phone, Calendar, MessageSquare } from "lucide-react";

interface MobileStickyCTAProps {
  onOpenBooking: () => void;
}

export function MobileStickyCTA({ onOpenBooking }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-[#032D22] border-t border-[#C9A24B]/30 p-2.5 md:hidden shadow-2xl flex items-center justify-between gap-2">
      <a
        href="tel:+639671956863"
        className="flex-1 py-2.5 px-2 rounded-2xl bg-white/10 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
      >
        <Phone className="h-4 w-4 text-[#C9A24B]" />
        <span>Call Clinic</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-[1.5] py-2.5 px-3 rounded-2xl bg-[#064E3B] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform border border-[#2E9B7C]/40"
      >
        <Calendar className="h-4 w-4 text-[#C9A24B]" />
        <span>Book Now</span>
      </button>

      <a
        href="sms:+639671956863"
        className="flex-1 py-2.5 px-2 rounded-2xl bg-white/10 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"
      >
        <MessageSquare className="h-4 w-4 text-[#2E9B7C]" />
        <span>Text Us</span>
      </a>
    </div>
  );
}
