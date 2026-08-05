"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calendar, Phone } from "lucide-react";

interface NavbarProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Body Map", href: "#bodymap" },
    { name: "Gallery", href: "#gallery" },
    { name: "Clinicians", href: "#team" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-nav border-b border-[#064E3B]/10 transition-all duration-300">
      <div className="container flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#C9A24B]/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <img
              src="https://res.cloudinary.com/zylwakez/image/upload/v1784795283/FLEXTEND_plecil.png"
              alt="FlexTend Physical Therapy Clinic Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold text-[#032D22] tracking-tight group-hover:text-[#064E3B] transition-colors">
              FlexTend
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#C9A24B] uppercase">
              Physical Therapy Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-[#4A5D56]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="transition-colors hover:text-[#064E3B] relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#2E9B7C] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+639671956863"
            className="flex items-center gap-2 text-xs font-bold text-[#064E3B] hover:text-[#032D22] transition-colors bg-[#064E3B]/10 px-4 py-2.5 rounded-full border border-[#064E3B]/20"
          >
            <Phone className="h-3.5 w-3.5" />
            +63 967 195 6863
          </a>
          <Button
            onClick={() => onOpenBooking("Physical Therapy Evaluation")}
            className="bg-[#064E3B] hover:bg-[#032D22] shadow-sm text-white flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger Drawer */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenBooking("Physical Therapy Evaluation")}
            className="text-xs px-3 bg-[#064E3B]/10 border-[#064E3B]/20 text-[#064E3B]"
          >
            Book
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-[#032D22] p-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#FAF7F2] border-l border-[#064E3B]/10 flex flex-col justify-between">
              <div>
                <SheetHeader className="text-left border-b border-[#064E3B]/10 pb-4 mb-6">
                  <SheetTitle className="flex items-center gap-3">
                    <img
                      src="https://res.cloudinary.com/zylwakez/image/upload/v1784795283/FLEXTEND_plecil.png"
                      alt="FlexTend Logo"
                      className="h-10 w-10 rounded-full border border-[#C9A24B]/30"
                    />
                    <div className="flex flex-col">
                      <span className="font-heading text-lg font-bold text-[#032D22]">FlexTend</span>
                      <span className="text-[9px] font-semibold text-[#C9A24B] uppercase">Lipa City, Batangas</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-4 font-semibold text-base text-[#032D22]">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 px-3 rounded-xl transition-colors hover:bg-[#064E3B]/10 hover:text-[#064E3B]"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-[#064E3B]/10">
                <a
                  href="tel:+639671956863"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#064E3B]/10 text-[#064E3B] font-bold text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call +63 967 195 6863
                </a>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking("Physical Therapy Evaluation");
                  }}
                  className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule Appointment
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
