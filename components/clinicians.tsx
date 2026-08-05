import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle, Users } from "lucide-react";

export function Clinicians() {
  const team = [
    {
      name: "Licensed Physical Therapists (PTRP)",
      role: "Board-Certified Physical Therapists",
      license: "PRC Licensed Clinical Staff",
      bio: "Extensive clinical training in orthopedic assessment, spine manual therapy, post-surgical recovery, and sports biomechanics.",
      specialties: ["Orthopedic Rehab", "Spine Manual Therapy", "Dry Needling", "Sports Injury Recovery"],
      image: "https://images.unsplash.com/photo-1594824813570-78a33595eb61?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Licensed Occupational Therapists (OTRP)",
      role: "Board-Certified Occupational Therapists",
      license: "PRC Licensed Clinical Staff",
      bio: "Specializing in upper extremity rehabilitation, stroke recovery, activities of daily living (ADL) retraining, and ergonomic modification.",
      specialties: ["Hand & Wrist Therapy", "Neurological ADL Training", "Stroke Rehab", "Ergonomic Assessment"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    },
    {
      name: "Pediatric Rehabilitation Specialists",
      role: "Pediatric PT & OT Clinicians",
      license: "PRC Licensed Clinical Staff",
      bio: "Compassionate, play-based therapy for children experiencing developmental motor delays, cerebral palsy, or sensory processing challenges.",
      specialties: ["Developmental Milestones", "Pediatric Motor Planning", "Sensory Integration", "Gait Retraining"],
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section id="team" className="py-20 bg-[#FAF7F2] border-y border-[#064E3B]/10">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <Users className="h-3.5 w-3.5" />
            Licensed Clinical Team
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#032D22]">
            Meet Your Rehabilitation Professionals
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Our clinic is staffed by Philippine regulation-licensed Physical and Occupational Therapists dedicated to evidence-based, patient-centered healing.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <Card
              key={idx}
              className="bg-[#FCF8F2] border-2 border-[#064E3B]/10 overflow-hidden hover:border-[#064E3B]/30 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#032D22]/85 via-transparent to-transparent" />
                <Badge variant="gold" className="absolute top-4 left-4 font-bold">
                  <Award className="h-3.5 w-3.5" />
                  {member.license}
                </Badge>
              </div>

              <CardHeader className="p-6 pb-2">
                <CardTitle className="text-xl font-extrabold text-[#032D22] group-hover:text-[#064E3B] transition-colors">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-xs font-bold text-[#2E9B7C] uppercase tracking-wider mt-1">
                  {member.role}
                </CardDescription>
                <p className="text-xs sm:text-sm text-[#4A5D56] mt-3 leading-relaxed">
                  {member.bio}
                </p>
              </CardHeader>

              <CardContent className="p-6 pt-2">
                <div className="border-t border-[#064E3B]/10 pt-4 mt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#064E3B] mb-2 block">
                    Clinical Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold bg-[#FAF7F2] text-[#032D22] px-2.5 py-1 rounded-full border border-[#064E3B]/15"
                      >
                        <CheckCircle className="h-3 w-3 text-[#2E9B7C]" />
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
