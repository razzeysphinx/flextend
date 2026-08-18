import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#032D22] text-[#FAF7F2] pt-16 pb-24 md:pb-12 border-t-2 border-[#C9A24B]/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#064E3B]">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://res.cloudinary.com/zylwakez/image/upload/v1784795283/FLEXTEND_plecil.png"
                alt="FlexTend Physical Therapy Clinic Logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-[#C9A24B]/40 bg-white"
              />
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-white tracking-tight">
                  FlexTend
                </span>
                <span className="text-[10px] font-semibold text-[#C9A24B] uppercase tracking-wider">
                  Physical Therapy Clinic
                </span>
              </div>
            </div>
            <p className="text-xs text-[#FAF7F2]/70 leading-relaxed">
              Evidence-based physical and occupational therapy clinic in Lipa City, Batangas. Restoring movement, independence, and quality of life.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#C9A24B] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#FAF7F2]/80">
              <li>
                <a href="#home" className="hover:text-[#C9A24B] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9A24B] transition-colors">
                  Services & Treatments
                </a>
              </li>
              <li>
                <a href="#bodymap" className="hover:text-[#C9A24B] transition-colors">
                  Interactive Body Map
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9A24B] transition-colors">
                  Facility Gallery
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#C9A24B] transition-colors">
                  Our Clinicians
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9A24B] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Clinical Focus */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#C9A24B] uppercase tracking-wider mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#FAF7F2]/80">
              <li>Physical Therapy Evaluation</li>
              <li>Occupational Therapy & ADL</li>
              <li>Pediatric Rehabilitation</li>
              <li>Sports Injury Rehab</li>
              <li>Dry Needling & Myofascial</li>
              <li>Stroke Neuro-Rehab</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="font-heading text-sm font-bold text-[#C9A24B] uppercase tracking-wider mb-4">
              Contact & Hours
            </h4>
            <ul className="space-y-3 text-xs text-[#FAF7F2]/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#2E9B7C] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/QBoQGC5gAwqWQKBH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white font-medium"
                >
                  299 San Jose Subd., Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#2E9B7C] shrink-0" />
                <a href="tel:+639671956863" className="hover:underline text-white font-medium">
                  +63 967 195 6863
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#2E9B7C] shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=flextendtherapy2024@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-white font-medium"
                >
                  flextendtherapy2024@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#C9A24B] shrink-0" />
                <span>Mon – Sat: 8:00 AM – 4:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center text-xs text-[#8A9D96] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 FlexTend Physical Therapy Clinic. All rights reserved.</p>
          <p className="text-[11px] text-[#C9A24B]">
            Refactored with Next.js, Tailwind CSS & shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}
