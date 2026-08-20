import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, Calendar, CheckCircle2, Clock3, ShieldAlert } from "lucide-react";
import type { ConditionPageContent } from "@/lib/content/conditions";
import { ConditionSiteShell } from "@/components/condition-site-shell";

function InformationSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <section className="rounded-2xl border border-[#064E3B]/10 bg-[#FCF8F2] p-6 shadow-sm sm:p-8">
      <h2 className="font-heading text-2xl font-extrabold text-[#032D22]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#4A5D56]">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9B7C]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ConditionPage({ condition }: { condition: ConditionPageContent }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: condition.title,
    description: condition.metaDescription,
    about: {
      "@type": "MedicalCondition",
      name: condition.name,
    },
    isPartOf: {
      "@type": "WebSite",
      name: "FlexTend Physical Therapy Clinic",
    },
  };

  return (
    <ConditionSiteShell>
      <main className="min-h-screen bg-[#FAF7F2]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-10 sm:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-[#4A5D56]">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link href="/" className="hover:text-[#064E3B]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/conditions" className="hover:text-[#064E3B]">Conditions</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[#032D22]">{condition.name}</li>
          </ol>
        </nav>

        <header className="max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            <BookOpen className="h-3.5 w-3.5" />
            Rehabilitation Information
          </Badge>
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-[#032D22] sm:text-5xl lg:text-6xl">
            {condition.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#4A5D56]">{condition.intro}</p>
        </header>

        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#C9A24B]/40 bg-[#C9A24B]/10 p-5 text-sm text-[#032D22] sm:flex-row sm:items-start">
          <ShieldAlert className="h-5 w-5 shrink-0 text-[#8B6817]" />
          <p>
            This page provides general education and is not a diagnosis or personal treatment plan. A qualified healthcare professional should assess your symptoms and advise you about appropriate care. Seek urgent medical attention for severe, sudden, or emergency symptoms.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <InformationSection title="Symptoms" items={condition.symptoms} />
          <InformationSection title="Causes and Contributing Factors" items={condition.causes} />
          <InformationSection title="Diagnosis and Evaluation" items={condition.diagnosis} />
          <InformationSection title="Treatment and Rehabilitation" items={condition.treatment} />
          <InformationSection title="Potential Benefits of Rehabilitation" items={condition.benefits} />

          <section className="rounded-2xl border border-[#064E3B]/10 bg-[#FCF8F2] p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-[#2E9B7C]" />
              <h2 className="font-heading text-2xl font-extrabold text-[#032D22]">Recovery Timeline</h2>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[#4A5D56]">{condition.recoveryTimeline}</p>
          </section>
        </div>

        <section className="mx-auto mt-10 max-w-4xl">
          <h2 className="font-heading text-2xl font-extrabold text-[#032D22]">Questions About {condition.name}?</h2>
          <Accordion type="single" collapsible className="mt-5">
            {condition.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`condition-faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <Card className="border-0 bg-[#032D22] text-white shadow-xl">
            <CardHeader>
              <CardTitle className="font-heading text-3xl font-extrabold">Ready to discuss your goals?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-white/80">
                Request an evaluation and the FlexTend team can help identify the appropriate next step for your situation.
              </p>
              <Link
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#C9A24B] px-6 py-3 text-sm font-bold text-[#032D22] hover:bg-[#E0BB63]"
              >
                <Calendar className="h-4 w-4" />
                Book an Appointment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          <Card className="border border-[#064E3B]/10 bg-[#FCF8F2] shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-xl font-extrabold text-[#032D22]">Related FlexTend services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {condition.relatedServices.map((service) => (
                  <li key={service} className="flex items-start gap-2 text-sm text-[#4A5D56]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2E9B7C]" />
                    {service}
                  </li>
                ))}
              </ul>
              <Link href="/#services" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#064E3B] hover:text-[#032D22]">
                View all services <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
      </main>
    </ConditionSiteShell>
  );
}
