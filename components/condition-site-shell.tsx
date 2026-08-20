"use client";

import { useState } from "react";
import { BookingModal } from "@/components/booking-modal";
import { Footer } from "@/components/footer";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";
import { Navbar } from "@/components/navbar";

export function ConditionSiteShell({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("Physical Therapy Evaluation");

  const openBooking = (serviceName = "Physical Therapy Evaluation") => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenBooking={openBooking} />
      <div className="flex-1">{children}</div>
      <Footer />
      <MobileStickyCTA onOpenBooking={() => openBooking()} />
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={modalService}
      />
    </div>
  );
}
