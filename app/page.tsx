"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { BodyMap } from "@/components/body-map";
import { FacilityGallery } from "@/components/facility-gallery";
import { Clinicians } from "@/components/clinicians";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { BookingSection } from "@/components/booking-section";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { MobileStickyCTA } from "@/components/mobile-sticky-cta";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalService, setModalService] = useState("Physical Therapy Evaluation");

  const handleOpenBooking = (serviceName: string = "Physical Therapy Evaluation") => {
    setModalService(serviceName);
    setIsModalOpen(true);
  };

  const handleCloseBooking = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar onOpenBooking={handleOpenBooking} />
      <main className="flex-1">
        <Hero onOpenBooking={handleOpenBooking} />
        <Features />
        <Services onOpenBooking={handleOpenBooking} />
        <BodyMap onOpenBooking={handleOpenBooking} />
        <FacilityGallery />
        <Clinicians />
        <Testimonials />
        <FAQ />
        <BookingSection />
      </main>
      <Footer />
      <MobileStickyCTA onOpenBooking={() => handleOpenBooking("Physical Therapy Evaluation")} />
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseBooking}
        serviceName={modalService}
      />
    </div>
  );
}
