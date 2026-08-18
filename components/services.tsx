"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Calendar, Sparkles } from "lucide-react";

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function Services({ onOpenBooking }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const services = [
    {
      id: "pt",
      category: "pt",
      categoryLabel: "Physical Therapy",
      title: "Physical Therapy Evaluation & Rehab",
      badge: "Core Specialty",
      description:
        "Comprehensive assessment and targeted manual therapy, exercise prescription, and pain management for musculoskeletal conditions.",
      features: [
        "Spine, back, and neck pain relief",
        "Joint rehabilitation (Knee, Shoulder, Hip)",
        "Post-operative orthopedics & fracture recovery",
        "Gait & posture re-education",
      ],
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "ot",
      category: "ot",
      categoryLabel: "Occupational Therapy",
      title: "Occupational Therapy & ADL Retraining",
      badge: "Functional Living",
      description:
        "Restoring upper extremity function and daily life independence for adults and seniors recovering from injury or illness.",
      features: [
        "Activities of Daily Living (ADL) training",
        "Hand & wrist therapy / Splinting support",
        "Ergonomic & home safety guidance",
        "Fine motor skill re-building",
      ],
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "peds",
      category: "peds",
      categoryLabel: "Pediatric Rehab",
      title: "Pediatric Physical & Occupational Therapy",
      badge: "Child Development",
      description:
        "Gentle, play-based interventions helping children achieve developmental motor milestones, balance, and coordination.",
      features: [
        "Developmental delay intervention",
        "Cerebral palsy & neuromuscular support",
        "Sensory integration & motor coordination",
        "Pediatric posture & gait guidance",
      ],
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "sports",
      category: "specialized",
      categoryLabel: "Specialized Care",
      title: "Sports Injury Rehab & Performance",
      badge: "Athletes & Active",
      description:
        "Evidence-informed athletic rehabilitation designed to safely return athletes to peak physical performance and sport.",
      features: [
        "ACL & knee ligament recovery protocols",
        "Rotator cuff & shoulder conditioning",
        "Return-to-sport testing & mechanics",
        "Overuse injury prevention",
      ],
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "dryneedling",
      category: "specialized",
      categoryLabel: "Specialized Care",
      title: "Dry Needling & Myofascial Therapy",
      badge: "Targeted Relief",
      description:
        "Targeted neuromuscular release using sterile micro-needles to deactivate painful muscle trigger points and chronic tightness.",
      features: [
        "Chronic neck & upper back knot release",
        "Sciatica & gluteal muscle decompression",
        "Accelerated blood flow & tissue healing",
        "Immediate muscle mobility gains",
      ],
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "neuro",
      category: "specialized",
      categoryLabel: "Specialized Care",
      title: "Stroke & Neurological Rehabilitation",
      badge: "Neuromuscular",
      description:
        "Specialized neuro-rehabilitation helping stroke survivors and neurological patients rebuild nerve paths and motor control.",
      features: [
        "Post-stroke motor re-learning",
        "Balance, transfer & fall prevention",
        "Parkinson's mobility maintenance",
        "Functional stamina building",
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-[#FCF8F2]">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Our Clinical Services
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
            Evidence-Based Therapies Tailored to You
          </h2>
          <p className="text-[#4A5D56] text-base mt-4">
            From acute sports injury rehabilitation to specialized pediatric and neurological care, our licensed clinicians provide dedicated hands-on treatment.
          </p>

          {/* Filter Tabs */}
          <div className="flex justify-center mt-8">
            <Tabs defaultValue="all" onValueChange={setActiveCategory} className="w-full max-w-xl">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 bg-[#064E3B]/10 p-1.5 rounded-full">
                <TabsTrigger value="all">All Services</TabsTrigger>
                <TabsTrigger value="pt">Physical Therapy</TabsTrigger>
                <TabsTrigger value="ot">Occupational</TabsTrigger>
                <TabsTrigger value="specialized">Specialized</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="bg-[#FAF7F2] border border-[#064E3B]/10 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div>
                {/* Image header */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#032D22]/80 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-[#064E3B] text-white px-3 py-1 rounded-full shadow">
                    {service.badge}
                  </span>
                </div>

                <CardHeader className="p-6 pb-3">
                  <span className="text-xs font-semibold text-[#2E9B7C] uppercase tracking-wider">
                    {service.categoryLabel}
                  </span>
                  <CardTitle className="text-xl font-extrabold text-[#032D22] group-hover:text-[#064E3B] transition-colors mt-1">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-[#4A5D56] mt-2 leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 pt-0">
                  <div className="border-t border-[#064E3B]/10 pt-4 mt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2 block">
                      Key Interventions:
                    </span>
                    <ul className="space-y-2">
                      {service.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#032D22]">
                          <CheckCircle2 className="h-4 w-4 text-[#2E9B7C] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold gap-2 text-xs py-3 rounded-full"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Book {service.categoryLabel}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
