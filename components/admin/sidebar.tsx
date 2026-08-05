"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Image as ImageIcon,
  Settings,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Appointments Intake",
      href: "/admin/appointments",
      icon: CalendarCheck,
    },
    {
      name: "Patients & RBAC Roles",
      href: "/admin/patients",
      icon: Users,
    },
    {
      name: "Supabase Storage Gallery",
      href: "/admin/gallery",
      icon: ImageIcon,
    },
    {
      name: "Settings & Setup",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-[#032D22] text-[#FAF7F2] border-r border-[#C9A24B]/30 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-[#064E3B] flex items-center gap-3">
          <img
            src="https://res.cloudinary.com/zylwakez/image/upload/v1784795283/FLEXTEND_plecil.png"
            alt="FlexTend Logo"
            className="h-10 w-10 rounded-full border border-[#C9A24B] bg-white"
          />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold text-white tracking-tight">
              FlexTend
            </span>
            <span className="text-[9px] font-extrabold text-[#C9A24B] uppercase tracking-wider">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5">
          <span className="text-[10px] font-extrabold text-[#8A9D96] uppercase tracking-widest px-3 block mb-2">
            Main Management
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#064E3B] text-white shadow-md border border-[#2E9B7C]/40"
                    : "text-[#FAF7F2]/70 hover:bg-[#064E3B]/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#C9A24B]" : "text-[#2E9B7C]"}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-[#C9A24B]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#064E3B] space-y-3">
        <div className="p-3 rounded-2xl bg-[#064E3B]/40 border border-[#C9A24B]/20 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#C9A24B]" />
            <span className="font-bold text-[#F8E7C9]">RBAC Protected</span>
          </div>
        </div>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2E9B7C] hover:underline py-1"
        >
          <span>View Public Site</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </aside>
  );
}
