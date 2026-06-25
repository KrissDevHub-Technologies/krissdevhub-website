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
    q: "Do you work with early-stage startups?",
    a: "Yes. We work with startups at the idea stage all the way to Series B companies. For early-stage clients, we help validate quickly and build a foundation that won't need to be rewritten when you scale.",
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
    q: "Do you offer post-launch support?",
    a: "Absolutely. We offer flexible retainer packages for ongoing maintenance, feature development, and monitoring. Many of our clients transition into long-term partnerships.",
  },
  {
    q: "What makes you different from a typical dev agency?",
    a: "We're a product-minded engineering team, not a staffing shop. We push back when we think a feature won't serve the business, we design systems not just code, and we're invested in your success beyond the invoice.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              FAQ
            </span>
          </ScrollReveal>
          <TextReveal
            text="Questions we hear often"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/[0.03] transition-colors"
                  aria-expanded={open === i}
                  id={`faq-trigger-${i}`}
                  aria-controls={`faq-content-${i}`}
                >
                  <span className="text-sm font-medium text-white/80">{faq.q}</span>
                  <div className="flex-shrink-0">
                    {open === i ? (
                      <Minus className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Plus className="w-4 h-4 text-white/30" />
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-sm text-white/50 leading-relaxed border-t border-white/[0.04] pt-3">
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
