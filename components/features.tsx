import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UserCheck, Zap, Target, Activity } from "lucide-react";

export function Features() {
  const featureItems = [
    {
      icon: UserCheck,
      title: "Licensed Clinicians",
      description:
        "Care delivered exclusively by board-certified Physical and Occupational Therapists committed to evidence-based clinical protocols.",
      badge: "Expert Staff",
    },
    {
      icon: Zap,
      title: "Fast Appointment Access",
      description:
        "Get scheduled for an initial evaluation within 48 hours, eliminating long waiting times so recovery begins immediately.",
      badge: "Within 48h",
    },
    {
      icon: Target,
      title: "Personalized Therapy Plans",
      description:
        "One-on-one tailored treatment sessions built around your specific pain points, mobility limits, and functional goals.",
      badge: "Targeted Care",
    },
    {
      icon: Activity,
      title: "Comprehensive Rehab",
      description:
        "Full suite of interventions covering orthopedic post-op, stroke rehab, pediatric development, and athletic performance.",
      badge: "Full Spectrum",
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F2] border-y border-[#064E3B]/10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#C9A24B]">
            Why Choose FlexTend
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#032D22] mt-2">
            Clinical Excellence Built Around Your Recovery
          </h2>
          <p className="text-[#4A5D56] text-sm sm:text-base mt-3">
            We blend evidence-informed modalities with compassionate hands-on guidance to help you regain full movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="bg-[#FCF8F2] border-[#064E3B]/10 hover:border-[#2E9B7C]/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <CardHeader className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#064E3B]/10 text-[#064E3B] flex items-center justify-center group-hover:bg-[#064E3B] group-hover:text-white transition-colors duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A24B] bg-[#C9A24B]/10 px-2.5 py-1 rounded-full border border-[#C9A24B]/30">
                      {item.badge}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-[#032D22] mb-2 group-hover:text-[#064E3B] transition-colors">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-[#4A5D56] leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
