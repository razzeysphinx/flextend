import React from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "Do I need a doctor's referral to schedule an appointment?",
      answer:
        "While a referral from your physician, orthopedist, or neurologist is welcomed, it is not strictly required to schedule an initial physical or occupational therapy evaluation at FlexTend Clinic.",
    },
    {
      question: "How quickly can I be scheduled for an evaluation?",
      answer:
        "We prioritize rapid access to clinical care. New patients are typically seen and scheduled within 24 to 48 hours of contacting us.",
    },
    {
      question: "What should I bring to my first appointment?",
      answer:
        "Please bring a valid ID, any medical imaging reports (X-Rays, MRI scans, CT scans) or doctor prescriptions if you have them, and wear loose, comfortable attire that allows easy movement of the treatment area.",
    },
    {
      question: "How long does each therapy session take?",
      answer:
        "An initial evaluation lasts approximately 45 to 60 minutes. Subsequent treatment sessions typically take 45 to 60 minutes depending on your prescribed interventions and hands-on therapy requirements.",
    },
    {
      question: "What are your operating hours and clinic address?",
      answer:
        "FlexTend is open Monday through Saturday from 8:00 AM to 4:00 PM. We are located at 299 San Jose Subdivision, Balagbag, Brgy. San Sebastian, Lipa City, Batangas 4217.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#FAF7F2] border-y border-[#064E3B]/10">
      <div className="container max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#032D22]">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Learn more about scheduling, what to expect during your first evaluation, and clinic policies.
          </p>
        </div>

        {/* Accordion List */}
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="text-base sm:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#4A5D56] leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
