import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ShieldCheck } from "lucide-react";
import { publishedReviews } from "@/lib/content/reviews";

export function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-[#FCF8F2]">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <MessageSquare className="h-3.5 w-3.5" />
            Patient Experiences
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#032D22]">
            Patient Feedback, Shared With Permission
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            We publish patient feedback only after it has been verified and approved for public use.
          </p>
        </div>

        {publishedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {publishedReviews.map((review) => (
              <Card key={review.id} className="bg-[#FAF7F2] border border-[#064E3B]/10 p-6">
                <p className="text-sm text-[#032D22] italic leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <div className="pt-4 mt-6 border-t border-[#064E3B]/10">
                  <div className="font-bold text-sm text-[#032D22]">{review.name}</div>
                  {review.location && <div className="text-xs text-[#4A5D56]">{review.location}</div>}
                  {review.source && <div className="text-xs text-[#4A5D56] mt-1">Source: {review.source}</div>}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="mx-auto max-w-3xl bg-[#FAF7F2] border-2 border-[#064E3B]/15 p-8 text-center shadow-sm">
            <ShieldCheck className="mx-auto h-10 w-10 text-[#2E9B7C]" />
            <h3 className="mt-4 text-xl font-extrabold text-[#032D22]">Verified feedback is being prepared</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4A5D56]">
              Our patient stories section will be updated with current, consented feedback. Until then, learn about our services or contact the clinic to discuss your goals.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#064E3B] px-6 py-3 text-sm font-bold text-white hover:bg-[#032D22]"
            >
              Contact the Clinic
            </Link>
          </Card>
        )}
      </div>
    </section>
  );
}
