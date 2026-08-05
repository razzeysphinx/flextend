"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Activity, ArrowRight, ShieldAlert, CheckCircle2 } from "lucide-react";

interface BodyMapProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function BodyMap({ onOpenBooking }: BodyMapProps) {
  const regions = [
    {
      num: "01",
      id: "head_neck",
      title: "Head, Neck & Cervical Spine",
      regionLabel: "Cervical Spine & Jaw",
      desc: "Targeted therapy for tension headaches, cervical spondylosis, neck stiffness, and TMJ jaw pain.",
      conditions: ["Tension Headaches", "Cervical Stiffness", "Tech-Neck Strain", "TMJ Dysfunction", "Occipital Neuralgia"],
      coords: { top: "14%", left: "70%" },
    },
    {
      num: "02",
      id: "upper_back",
      title: "Trapezius, Shoulder & Scapula",
      regionLabel: "Trapezius & Upper Back",
      desc: "Myofascial knot release, rotator cuff repair, scapular dyskinesia therapy, and posture correction.",
      conditions: ["Trapezius Muscle Knots", "Rotator Cuff Strain", "Frozen Shoulder", "Scapular Pain", "Postural Fatigue"],
      coords: { top: "26%", left: "28%" },
    },
    {
      num: "03",
      id: "lumbar_spine",
      title: "Lumbar Spine & Lower Back",
      regionLabel: "Lumbar Spine & Sacrum",
      desc: "Spinal traction, disc herniation protocol, sciatica relief, and deep core musculature strengthening.",
      conditions: ["Sciatica Nerve Pain", "Herniated Disc", "Lumbar Muscle Strain", "Lumbago", "Spondylolisthesis"],
      coords: { top: "40%", left: "27%" },
    },
    {
      num: "04",
      id: "shoulder_chest",
      title: "Pectorals & Anterior Shoulder",
      regionLabel: "Anterior Shoulder Joint",
      desc: "Impingement syndrome therapy, clavicle recovery, and anterior shoulder capsule mobilization.",
      conditions: ["Shoulder Impingement", "Biceps Tendonitis", "Pectoral Strain", "AC Joint Sprain"],
      coords: { top: "22%", left: "63%" },
    },
    {
      num: "05",
      id: "abdomen_core",
      title: "Abdomen & Lumbo-Pelvic Core",
      regionLabel: "Abdominal & Core Wall",
      desc: "Diastasis recti recovery, pelvic floor coordination, and deep transverse abdominis stabilization.",
      conditions: ["Core Instability", "Post-Surgical Core Weakness", "Pelvic Tilt Correction", "Abdominal Strain"],
      coords: { top: "44%", left: "69%" },
    },
    {
      num: "06",
      id: "wrist_hand",
      title: "Wrist, Hand & Upper Extremity",
      regionLabel: "Wrist & Fine Motor",
      desc: "Occupational hand therapy, carpal tunnel decompression, tendon glides, and custom splint fitting.",
      conditions: ["Carpal Tunnel", "Wrist Tendonitis", "De Quervain's Tenosynovitis", "Hand Stiffness"],
      coords: { top: "51%", left: "54%" },
    },
    {
      num: "07",
      id: "knee_joint",
      title: "Knee Joint & Quadriceps",
      regionLabel: "Knee & Patellar Tendon",
      desc: "Post-ACL reconstruction, meniscus rehabilitation, patellofemoral pain syndrome, and cartilage preservation.",
      conditions: ["ACL/MCL Ligament Sprain", "Meniscus Tear", "Knee Osteoarthritis", "Jumper's Knee"],
      coords: { top: "67%", left: "67%" },
    },
    {
      num: "08",
      id: "ankle_foot",
      title: "Ankle Joint & Achilles Tendon",
      regionLabel: "Ankle & Plantar Fascia",
      desc: "Ankle sprain mobilization, plantar fasciitis heel pain therapy, Achilles tendonitis, and gait alignment.",
      conditions: ["Ankle Sprain (Inversion)", "Plantar Fasciitis", "Achilles Tendonitis", "Flat Feet & Gait Strain"],
      coords: { top: "88%", left: "68%" },
    },
  ];

  const [activeRegion, setActiveRegion] = useState(regions[2]); // Default Lumbar Spine

  return (
    <section id="bodymap" className="py-20 bg-[#FAF7F2] border-y border-[#064E3B]/10 relative overflow-hidden">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="terracotta" className="mb-3">
            <Activity className="h-3.5 w-3.5" />
            Anatomical Symptom Explorer
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
            Interactive Human Muscular Model
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Click on any anatomical marker on the muscular model below to view specific treatment protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Muscular Model Illustration Column */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md bg-white border-2 border-[#064E3B]/15 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col items-center justify-between min-h-[580px]">

              {/* Detailed Dual-View Muscular Model Container */}
              <div className="relative w-full h-[520px] flex items-center justify-center overflow-hidden my-auto">

                {/* SVG High-Fidelity Medical Muscular Anatomy Graphic */}
                <svg
                  viewBox="0 0 400 520"
                  className="w-full h-full drop-shadow-md select-none pointer-events-none"
                >
                  <defs>
                    <linearGradient id="muscleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#D96B52" />
                      <stop offset="50%" stopColor="#B84A35" />
                      <stop offset="100%" stopColor="#8A2E1C" />
                    </linearGradient>
                    <linearGradient id="tendonGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5ECE8" />
                      <stop offset="100%" stopColor="#D8C4BC" />
                    </linearGradient>
                  </defs>

                  {/* ================= LEFT FIGURE: POSTERIOR (BACK VIEW) ================= */}
                  <g id="posterior_body">
                    {/* Head & Neck Back */}
                    <path d="M 100 35 C 80 35 72 55 75 75 C 78 90 90 98 100 98 C 110 98 122 90 125 75 C 128 55 120 35 100 35 Z" fill="url(#muscleGrad)" />
                    <path d="M 94 88 L 106 88 L 108 112 L 92 112 Z" fill="url(#tendonGrad)" />

                    {/* Spine Line */}
                    <path d="M 100 90 L 100 240" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="6 3" opacity="0.9" />

                    {/* Trapezius & Shoulders Back */}
                    <path d="M 60 115 C 80 102 120 102 140 115 L 155 150 L 138 155 L 128 125 C 110 120 90 120 72 125 L 62 155 L 45 150 Z" fill="url(#muscleGrad)" />
                    {/* Upper Back Musculature */}
                    <path d="M 72 125 L 128 125 L 122 200 L 78 200 Z" fill="url(#muscleGrad)" stroke="#702213" strokeWidth="1" />

                    {/* Gluteal Musculature */}
                    <path d="M 78 200 C 60 205 58 245 76 260 C 94 270 100 262 100 240 C 100 262 106 270 124 260 C 142 245 140 205 122 200 Z" fill="url(#muscleGrad)" />

                    {/* Left & Right Legs (Back View) */}
                    <path d="M 72 260 C 68 300 70 340 76 430 L 92 430 C 94 360 92 300 88 260 Z" fill="url(#muscleGrad)" />
                    <path d="M 128 260 C 132 300 130 340 124 430 L 108 430 C 106 360 108 300 112 260 Z" fill="url(#muscleGrad)" />
                    {/* Calves & Achilles Tendons */}
                    <path d="M 80 430 L 80 470 L 88 470 L 86 430 Z" fill="url(#tendonGrad)" />
                    <path d="M 120 430 L 120 470 L 112 470 L 114 430 Z" fill="url(#tendonGrad)" />

                    {/* Arms (Back View) */}
                    <path d="M 45 150 L 32 230 L 44 233 L 58 158 Z" fill="url(#muscleGrad)" />
                    <path d="M 155 150 L 168 230 L 156 233 L 142 158 Z" fill="url(#muscleGrad)" />
                    {/* Hands */}
                    <path d="M 28 230 C 22 245 25 260 33 265 L 40 233 Z" fill="url(#tendonGrad)" />
                    <path d="M 172 230 C 178 245 175 260 167 265 L 160 233 Z" fill="url(#tendonGrad)" />
                  </g>

                  {/* ================= RIGHT FIGURE: ANTERIOR (FRONT VIEW) ================= */}
                  <g id="anterior_body">
                    {/* Head & Face Front */}
                    <path d="M 280 35 C 260 35 252 55 255 75 C 258 90 270 98 280 98 C 290 98 302 90 305 75 C 308 55 300 35 280 35 Z" fill="url(#muscleGrad)" />
                    <path d="M 274 88 L 286 88 L 288 112 L 272 112 Z" fill="url(#tendonGrad)" />

                    {/* Chest & Pectorals */}
                    <path d="M 240 115 C 260 108 300 108 320 115 L 312 165 C 295 175 265 175 248 165 Z" fill="url(#muscleGrad)" />
                    <path d="M 270 118 L 290 118 L 290 162 L 270 162 Z" fill="url(#tendonGrad)" opacity="0.7" />

                    {/* Abdominal Abs Core Grid */}
                    <path d="M 248 165 C 265 175 295 175 312 165 L 304 225 C 290 232 270 232 256 225 Z" fill="url(#muscleGrad)" />
                    <line x1="280" y1="165" x2="280" y2="225" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
                    <line x1="260" y1="185" x2="300" y2="185" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />
                    <line x1="260" y1="205" x2="300" y2="205" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" />

                    {/* Pelvis & Hips Front */}
                    <path d="M 256 225 C 270 232 290 232 304 225 L 298 260 L 262 260 Z" fill="url(#tendonGrad)" />

                    {/* Legs & Quadriceps (Front View) */}
                    <path d="M 252 260 C 248 300 250 340 256 430 L 272 430 C 274 360 272 300 268 260 Z" fill="url(#muscleGrad)" />
                    <path d="M 308 260 C 312 300 310 340 304 430 L 288 430 C 286 360 288 300 292 260 Z" fill="url(#muscleGrad)" />
                    {/* Knee Joints */}
                    <circle cx="264" cy="345" r="9" fill="url(#tendonGrad)" stroke="#B84A35" strokeWidth="1.5" />
                    <circle cx="296" cy="345" r="9" fill="url(#tendonGrad)" stroke="#B84A35" strokeWidth="1.5" />
                    {/* Feet & Ankles */}
                    <ellipse cx="264" cy="460" rx="14" ry="7" fill="url(#tendonGrad)" />
                    <ellipse cx="296" cy="460" rx="14" ry="7" fill="url(#tendonGrad)" />

                    {/* Arms (Front View) */}
                    <path d="M 225 150 L 212 230 L 224 233 L 238 158 Z" fill="url(#muscleGrad)" />
                    <path d="M 335 150 L 348 230 L 336 233 L 322 158 Z" fill="url(#muscleGrad)" />
                    {/* Hands */}
                    <path d="M 208 230 C 202 245 205 260 213 265 L 220 233 Z" fill="url(#tendonGrad)" />
                    <path d="M 352 230 C 358 245 355 260 347 265 L 340 233 Z" fill="url(#tendonGrad)" />
                  </g>
                </svg>

                {/* Interactive Hotspot Buttons Matching Reference Image */}
                {regions.map((reg) => {
                  const isActive = activeRegion.id === reg.id;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => setActiveRegion(reg)}
                      style={{ top: reg.coords.top, left: reg.coords.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isActive ? "scale-125 z-30" : "hover:scale-110 z-20"
                        }`}
                      title={reg.title}
                    >
                      {/* White Circular Dot Marker Matching Reference Image */}
                      <div className="relative flex h-8 w-8 items-center justify-center">
                        {isActive && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#064E3B] opacity-60" />
                        )}
                        <span
                          className={`relative inline-flex h-8 w-8 rounded-full items-center justify-center shadow-md transition-all border-2 ${isActive
                              ? "bg-[#064E3B] border-white ring-4 ring-[#064E3B]/30"
                              : "bg-white border-[#E2E8F0] hover:border-[#064E3B]"
                            }`}
                        >
                          {/* Inner Dark Emerald Dot */}
                          <span
                            className={`h-3 w-3 rounded-full ${isActive ? "bg-[#C9A24B]" : "bg-[#064E3B]"
                              }`}
                          />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-[#4A5D56] pt-3 border-t border-[#064E3B]/10 w-full justify-center">
                <ShieldAlert className="h-4 w-4 text-[#064E3B]" />
                Select any white marker to explore targeted rehab protocols
              </div>
            </div>
          </div>

          {/* Target Region Details Column */}
          <div className="lg:col-span-6">
            <Card className="bg-[#FCF8F2] border-2 border-[#064E3B]/20 p-8 shadow-xl">
              <CardHeader className="p-0 pb-6 border-b border-[#064E3B]/10 flex flex-row items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-extrabold text-[#C9A24B] font-heading">
                      {activeRegion.num}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider bg-[#2E9B7C]/15 text-[#064E3B] px-3 py-1 rounded-full border border-[#2E9B7C]">
                      {activeRegion.regionLabel}
                    </span>
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-extrabold text-[#032D22]">
                    {activeRegion.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="p-0 py-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2">
                    Clinical Overview & Modalities
                  </h4>
                  <p className="text-sm sm:text-base text-[#4A5D56] leading-relaxed">
                    {activeRegion.desc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-3">
                    Targeted Conditions Treated:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.conditions.map((cond, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 bg-[#FAF7F2] text-[#032D22] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#064E3B]/15 shadow-sm"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#2E9B7C]" />
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>

              <div className="pt-4 border-t border-[#064E3B]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs font-medium text-[#4A5D56]">
                  Schedule evaluation for {activeRegion.regionLabel}?
                </span>
                <Button
                  onClick={() => onOpenBooking(`Evaluation for: ${activeRegion.title}`)}
                  className="w-full sm:w-auto bg-[#064E3B] hover:bg-[#032D22] text-white font-bold gap-2 text-sm h-12 px-6 rounded-full shadow-md"
                >
                  Book Evaluation for {activeRegion.regionLabel}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
