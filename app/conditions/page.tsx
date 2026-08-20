import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ConditionSiteShell } from "@/components/condition-site-shell";
import { conditionPages } from "@/lib/content/conditions";

export const metadata: Metadata = {
  title: "Conditions and Rehabilitation Information",
  description: "Patient-friendly rehabilitation information for common orthopedic, neurological, and pediatric conditions served by FlexTend in Lipa City.",
};

export default function ConditionsIndexPage() {
  return (
    <ConditionSiteShell>
      <main className="min-h-screen bg-[#FAF7F2]">
      <div className="container py-10 sm:py-14">
        <header className="max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Patient Education
          </Badge>
          <h1 className="font-heading text-4xl font-extrabold text-[#032D22] sm:text-5xl">
            Conditions and Rehabilitation Information
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[#4A5D56]">
            Learn how rehabilitation may support movement, independence, and participation. These pages are for general education and do not replace an individual clinical evaluation.
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conditionPages.map((condition) => (
            <Link
              key={condition.slug}
              href={`/conditions/${condition.slug}`}
              className="group rounded-2xl border border-[#064E3B]/10 bg-[#FCF8F2] p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#064E3B]/30 hover:shadow-lg"
            >
              <h2 className="font-heading text-xl font-extrabold text-[#032D22] group-hover:text-[#064E3B]">
                {condition.name}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#4A5D56]">{condition.intro}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#064E3B]">
                Read rehabilitation information <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-[#C9A24B]/40 bg-[#C9A24B]/10 p-5 text-sm leading-relaxed text-[#032D22]">
          Medical information varies by person. If symptoms are sudden, severe, or worsening, seek medical attention rather than waiting for an outpatient therapy appointment.
        </div>
      </div>
      </main>
    </ConditionSiteShell>
  );
}
