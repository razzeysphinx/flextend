import React from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { faqItems } from "@/lib/content/faqs";

export function FAQ() {
  return (
    <section id="faq" className="py-20 bg-[#FAF7F2] border-y border-[#064E3B]/10">
      <div className="container max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            Frequently Asked Questions
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#032D22]">
            Questions Before Your First Visit?
          </h2>
          <p className="text-[#4A5D56] text-base mt-3">
            Find practical information about requesting an appointment, preparing for an evaluation, and contacting the clinic.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={item.question} value={`item-${index}`}>
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
