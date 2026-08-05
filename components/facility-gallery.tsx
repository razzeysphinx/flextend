"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Image as ImageIcon, MapPin } from "lucide-react";

export function FacilityGallery() {
  const slides = [
    {
      id: 1,
      category: "treatment",
      title: "Private Manual Therapy & Evaluation Suites",
      subtitle: "Comfortable, hygienic individual treatment spaces",
      desc: "Equipped with high-comfort therapeutic plinths and motorized examination tables for targeted one-on-one clinician care.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      category: "equipment",
      title: "Modern Electrotherapy & Modality Station",
      subtitle: "Advanced therapeutic pain management tools",
      desc: "Clinical TENS, ultrasound, myofascial release, and thermal modalities for rapid inflammation reduction.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      category: "amenities",
      title: "Air-Conditioned Patient Reception Lounge",
      subtitle: "Warm, welcoming, and accessible facility",
      desc: "Clean reception area designed for hassle-free check-in, comfortable seating, and clear patient guidance.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      category: "treatment",
      title: "Pediatric Rehabilitation Activity Zone",
      subtitle: "Engaging, safe environment for young patients",
      desc: "Equipped with soft mats, sensory integration tools, and balance toys to foster enjoyable physical development.",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredSlides =
    activeCategory === "all"
      ? slides
      : slides.filter((s) => s.category === activeCategory);

  // Auto-advance slides every 6s
  useEffect(() => {
    if (filteredSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [filteredSlides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + filteredSlides.length) % filteredSlides.length
    );
  };

  const activeSlide = filteredSlides[currentSlide] || slides[0];

  return (
    <section id="gallery" className="py-20 bg-[#FCF8F2]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <ImageIcon className="h-3.5 w-3.5" />
            Facility & Clinic Showcase
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
            Take a Virtual Tour of FlexTend Clinic
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Located in Lipa City, Batangas, our clean, modern, and accessible rehabilitation facility is designed for maximum patient safety and comfort.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex justify-center mt-8">
            <Tabs
              defaultValue="all"
              onValueChange={(val) => {
                setActiveCategory(val);
                setCurrentSlide(0);
              }}
              className="w-full max-w-lg"
            >
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 bg-[#064E3B]/10 p-1.5 rounded-full">
                <TabsTrigger value="all">All Photos</TabsTrigger>
                <TabsTrigger value="treatment">Suites</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Carousel Visual Container */}
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border-2 border-[#064E3B]/20 bg-[#032D22] text-white shadow-2xl">
          {/* Main Slide Image */}
          <div className="relative h-[360px] sm:h-[480px] w-full overflow-hidden">
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="h-full w-full object-cover transition-all duration-700 ease-in-out"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#032D22] via-[#032D22]/40 to-transparent" />

            {/* Top Badge Overlay */}
            <div className="absolute top-6 left-6 flex items-center gap-2">
              <Badge variant="secondary" className="bg-[#C9A24B] text-[#032D22] font-bold border-none">
                <MapPin className="h-3.5 w-3.5" />
                Lipa City Facility
              </Badge>
            </div>

            {/* Slide Navigation Arrow Buttons */}
            {filteredSlides.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 text-white hover:bg-[#064E3B] backdrop-blur-md border border-white/20 transition-all"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 text-white hover:bg-[#064E3B] backdrop-blur-md border border-white/20 transition-all"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            {/* Slide Info Footer Bar */}
            <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 bg-gradient-to-t from-[#032D22] to-transparent">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C9A24B] block mb-1">
                {activeSlide.subtitle}
              </span>
              <h3 className="font-heading text-xl sm:text-3xl font-extrabold text-white mb-2">
                {activeSlide.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 max-w-2xl leading-relaxed">
                {activeSlide.desc}
              </p>

              {/* Indicator Dots */}
              {filteredSlides.length > 1 && (
                <div className="flex items-center gap-2 mt-6">
                  {filteredSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? "w-8 bg-[#C9A24B]"
                          : "w-2.5 bg-white/40 hover:bg-white/70"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
