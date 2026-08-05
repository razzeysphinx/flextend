import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, Quote } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Maria Santos",
      location: "Lipa City, Batangas",
      condition: "Post-ACL Reconstruction Rehab",
      rating: 5,
      comment:
        "The PT team at FlexTend guided me step-by-step through my ACL recovery. Their hands-on approach and personalized exercise progression got me walking without pain in just weeks!",
    },
    {
      name: "Juan Dela Cruz",
      location: "Tanauan City, Batangas",
      condition: "Chronic Sciatica & Lower Back Stiffness",
      rating: 5,
      comment:
        "After suffering from severe lower back pain for months, their dry needling and manual therapy brought immediate relief. Highly professional clinicians!",
    },
    {
      name: "Elena Ramos",
      location: "Lipa City, Batangas",
      condition: "Pediatric OT for Developmental Delay",
      rating: 5,
      comment:
        "FlexTend's pediatric OT was wonderful with my 5-year-old son. The play-based activities made him look forward to every session while achieving huge motor milestones.",
    },
  ];

  return (
    <section className="py-20 bg-[#FCF8F2]">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            Patient Experiences
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#032D22]">
            What Our Patients Say About FlexTend
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Real stories of healing, restored mobility, and renewed independence from patients across Lipa City and Batangas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <Card
              key={idx}
              className="bg-[#FAF7F2] border border-[#064E3B]/10 p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group"
            >
              <Quote className="absolute top-4 right-4 h-10 w-10 text-[#064E3B]/10 group-hover:text-[#C9A24B]/30 transition-colors" />

              <div>
                <div className="flex items-center gap-1 text-[#C9A24B] mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#C9A24B]" />
                  ))}
                </div>

                <p className="text-sm text-[#032D22] italic leading-relaxed mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#064E3B]/10">
                <div className="font-bold text-sm text-[#032D22]">{rev.name}</div>
                <div className="text-xs text-[#4A5D56]">{rev.location}</div>
                <span className="inline-block text-[10px] font-bold text-[#064E3B] bg-[#064E3B]/10 px-2.5 py-0.5 rounded-full mt-2">
                  {rev.condition}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
