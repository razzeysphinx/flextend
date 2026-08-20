"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, CheckCircle2, ExternalLink, Sparkles } from "lucide-react";
import { services, type ServiceCategory } from "@/lib/content/services";

interface ServicesProps {
  onOpenBooking: (serviceName?: string) => void;
}

const categories: Array<{ value: "all" | ServiceCategory; label: string }> = [
  { value: "all", label: "All Services" },
  { value: "pt", label: "Physical Therapy" },
  { value: "ot", label: "Occupational" },
  { value: "peds", label: "Pediatric" },
  { value: "neuro", label: "Neurological" },
  { value: "specialized", label: "Specialized" },
];

export function Services({ onOpenBooking }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<"all" | ServiceCategory>("all");

  const filteredServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <section id="services" className="py-20 bg-[#FCF8F2]">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <Sparkles className="h-3.5 w-3.5" />
            Our Clinical Services
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
            Rehabilitation Built Around Your Goals
          </h2>
          <p className="text-[#4A5D56] text-base mt-4">
            Explore the ways FlexTend may support movement, independence, recovery, and participation. Your clinician will tailor care after an evaluation.
          </p>

          <div className="flex justify-center mt-8">
            <Tabs
              value={activeCategory}
              onValueChange={(value) => setActiveCategory(value as "all" | ServiceCategory)}
              className="w-full max-w-5xl"
            >
              <TabsList className="flex h-auto w-full justify-start gap-1.5 overflow-x-auto rounded-2xl bg-[#064E3B]/10 p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="min-w-max shrink-0 whitespace-nowrap px-3 py-2 text-xs sm:text-sm"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="bg-[#FAF7F2] border border-[#064E3B]/10 overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} at FlexTend`}
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
                      What this may include:
                    </span>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#032D22]">
                          <CheckCircle2 className="h-4 w-4 text-[#2E9B7C] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="p-6 pt-0 flex flex-col gap-3">
                <Button
                  onClick={() => onOpenBooking(service.title)}
                  className="w-full bg-[#064E3B] hover:bg-[#032D22] text-white font-bold gap-2 text-xs py-3 rounded-full"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Request an Evaluation
                </Button>
                <div className="w-full border-t border-[#064E3B]/10 pt-3">
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#064E3B]">
                    Related condition pages
                  </span>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {service.relatedConditions.map((condition) => (
                      <Link
                        key={condition.slug}
                        href={`/conditions/${condition.slug}`}
                        className="inline-flex items-center gap-1 rounded-full border border-[#2E9B7C]/35 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#064E3B] transition-colors hover:border-[#064E3B] hover:bg-[#064E3B] hover:text-white"
                      >
                        {condition.label}
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
