"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

const faqs = [
  {
    q: "What types of projects do you take on?",
    a: "We specialize in AI-native applications, SaaS platforms, custom software, API development, and intelligent automation. Our sweet spot is technically complex projects where thoughtful architecture makes the difference.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most MVP SaaS products ship in 6–10 weeks. AI integrations can be live in 2–4 weeks. Larger enterprise platforms vary by scope. We give you honest estimates after a discovery call — no padded timelines.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do. 100%. On project completion, all source code, assets, and infrastructure configurations are transferred to you with no strings attached.",
  },
  {
    q: "What does your engagement look like?",
    a: "We work in two models: fixed-scope projects for well-defined deliverables, and monthly retainers for ongoing product development. Both models include regular check-ins, async communication, and full visibility.",
  },
  {
    q: "What makes you different from a typical dev agency?",
    a: "We're a product-minded engineering team, not a staffing shop. We push back when we think a feature won't serve the business, we design systems not just code, and we're invested in your success beyond the invoice.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="faq">
      <div className="mx-auto max-w-4xl px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-24">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
              FAQ
            </span>
          </ScrollReveal>
          <TextReveal
            text="Questions we hear often"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight font-space-grotesk"
            as="h2"
          />
        </div>

        {/* Flat Accordion List */}
        <div className="border-t border-white/[0.08]">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="border-b border-white/[0.08]">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-white transition-colors"
                  aria-expanded={open === i}
                  id={`faq-trigger-${i}`}
                  aria-controls={`faq-content-${i}`}
                >
                  <span className="text-base font-semibold text-white/80 tracking-tight">{faq.q}</span>
                  <div className="flex-shrink-0 text-white/30 group-hover:text-white/60">
                    {open === i ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      id={`faq-content-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 text-[14px] text-white/45 leading-relaxed font-light">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
