"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { bodyRegions } from "@/lib/content/body-map";

interface BodyMapProps {
  onOpenBooking: (serviceName?: string) => void;
}

export function BodyMap({ onOpenBooking }: BodyMapProps) {
  const regions = bodyRegions;
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <section id="bodymap" className="relative overflow-hidden border-y border-[#064E3B]/10 bg-[#FAF7F2] py-20">
      <div className="container">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge variant="terracotta" className="mb-3">
            <Activity className="h-3.5 w-3.5" />
            Anatomical Symptom Explorer
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold text-[#032D22] sm:text-4xl lg:text-5xl">
            Interactive Human Muscular Model
          </h2>
          <p className="mt-3 text-base text-[#4A5D56]">
            Select an area to explore common movement concerns and rehabilitation topics. This tool is educational and does not diagnose conditions.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="flex flex-col items-center lg:col-span-6">
            <div className="relative w-full rounded-3xl border-2 border-[#064E3B]/15 bg-white p-4 shadow-2xl sm:p-6">
              <div className="relative mx-auto w-full max-w-[520px] aspect-[1292/1218] overflow-hidden rounded-2xl">
                <Image
                  src="/images/human-muscle-model.png"
                  alt="Front and back views of the human muscular system"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-contain"
                />

                {regions.map((region) => {
                  const isActive = activeRegion.id === region.id;

                  return (
                    <button
                      key={region.id}
                      type="button"
                      onClick={() => setActiveRegion(region)}
                      aria-label={`Explore ${region.title}`}
                      aria-pressed={isActive}
                      title={region.title}
                      style={{ top: region.coords.top, left: region.coords.left }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2E9B7C]/50 ${
                        isActive
                          ? "z-20 h-8 w-8 scale-110 bg-[#064E3B]"
                          : "z-10 h-7 w-7 bg-white hover:scale-110"
                      }`}
                    >
                      <span
                        className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                          isActive ? "bg-[#C9A24B]" : "bg-[#064E3B]"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="flex w-full items-center justify-center gap-2 border-t border-[#064E3B]/10 pt-3 text-center text-xs font-semibold text-[#4A5D56]">
                <ShieldAlert className="h-4 w-4 shrink-0 text-[#064E3B]" />
                Choose a marker to explore a body area
              </div>
            </div>

            <div className="mt-4 w-full lg:hidden">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#064E3B]">Browse body areas</p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {regions.map((region) => (
                  <button
                    key={`mobile-${region.id}`}
                    type="button"
                    onClick={() => setActiveRegion(region)}
                    aria-pressed={activeRegion.id === region.id}
                    className={`rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors ${
                      activeRegion.id === region.id
                        ? "border-[#064E3B] bg-[#064E3B] text-white"
                        : "border-[#064E3B]/15 bg-white text-[#032D22] hover:border-[#064E3B]/40"
                    }`}
                  >
                    {region.regionLabel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Card className="border-2 border-[#064E3B]/20 bg-[#FCF8F2] p-8 shadow-xl" aria-live="polite">
              <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-[#064E3B]/10 p-0 pb-6">
                <div>
                  <div className="mb-2 flex items-center gap-3">
                    <span className="font-heading text-2xl font-extrabold text-[#C9A24B]">{activeRegion.num}</span>
                    <span className="rounded-full border border-[#2E9B7C] bg-[#2E9B7C]/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#064E3B]">
                      {activeRegion.regionLabel}
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-extrabold text-[#032D22] sm:text-3xl">{activeRegion.title}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-0 py-6">
                <div>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#064E3B]">Rehabilitation Overview</h3>
                  <p className="text-sm leading-relaxed text-[#4A5D56] sm:text-base">{activeRegion.desc}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#064E3B]">Common Concerns to Discuss</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.conditions.map((condition) => (
                      <span key={condition} className="inline-flex items-center gap-1.5 rounded-full border border-[#064E3B]/15 bg-[#FAF7F2] px-3 py-1.5 text-xs font-semibold text-[#032D22] shadow-sm">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#2E9B7C]" />
                        {condition}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#064E3B]">Related Condition Pages</h3>
                  <div className="flex flex-wrap gap-2">
                    {activeRegion.conditionLinks.map((condition) => (
                      <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        className="rounded-full border border-[#2E9B7C]/40 bg-white px-3 py-1.5 text-xs font-semibold text-[#064E3B] transition-colors hover:border-[#064E3B] hover:bg-[#064E3B] hover:text-white"
                      >
                        {condition.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-[#064E3B]/10 pt-4 sm:flex-row">
                <span className="text-xs font-medium text-[#4A5D56]">Discuss {activeRegion.regionLabel.toLowerCase()} with a clinician?</span>
                <Button
                  onClick={() => onOpenBooking(`Evaluation for: ${activeRegion.title}`)}
                  className="h-12 w-full gap-2 rounded-full bg-[#064E3B] px-6 text-sm font-bold text-white shadow-md hover:bg-[#032D22] sm:w-auto"
                >
                  Book an Evaluation
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
