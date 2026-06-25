"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  Plus,
  Minus,
  HelpCircle,
  Brain,
  Cpu,
  Shield,
  Zap,
  Layers,
  CreditCard,
  ShieldAlert,
  RotateCcw,
  Database,
  Code2,
  Key,
  Sparkles,
  GitBranch,
  Activity,
  BookOpen,
  Hourglass,
  ShieldCheck,
  LucideIcon
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";

const ICON_MAP: Record<string, LucideIcon> = {
  brain: Brain,
  cpu: Cpu,
  shield: Shield,
  zap: Zap,
  layers: Layers,
  creditcard: CreditCard,
  shieldalert: ShieldAlert,
  rotateccw: RotateCcw,
  database: Database,
  code2: Code2,
  key: Key,
  sparkles: Sparkles,
  gitbranch: GitBranch,
  activity: Activity,
  bookopen: BookOpen,
  hourglass: Hourglass,
  shieldcheck: ShieldCheck,
};

interface ServiceSection {
  title: string;
  description: string;
  items?: string[];
}

export interface ServicePageTemplateProps {
  title: string;
  tagline: string;
  heroDescription: string;
  icon: string;
  blobColor?: "blue" | "purple" | "indigo" | "mixed";
  problem: ServiceSection;
  solution: ServiceSection;
  benefits: {
    title: string;
    description: string;
    icon?: string;
  }[];
  process: {
    number: string;
    title: string;
    description: string;
  }[];
  faqs: {
    q: string;
    a: string;
  }[];
  ctaText?: string;
  ctaHref?: string;
}

export function ServicePageTemplate({
  title,
  tagline,
  heroDescription,
  icon,
  blobColor = "blue",
  problem,
  solution,
  benefits,
  process,
  faqs,
  ctaText = "Discuss your project",
  ctaHref = "/contact",
}: ServicePageTemplateProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const Icon = ICON_MAP[icon.toLowerCase()] || HelpCircle;

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-hidden pb-12">
      {/* 1. Hero Section */}
      <section className="relative pt-36 pb-24 border-b border-white/[0.04] overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-40 -left-40 opacity-30" color={blobColor} />
        <GradientBlob className="w-[400px] h-[400px] top-40 right-0 opacity-15" color="mixed" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/80">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40 font-space-grotesk">
                {tagline}
              </span>
            </div>
          </ScrollReveal>
          
          <TextReveal
            text={title}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-space-grotesk max-w-3xl"
            as="h1"
          />
          
          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed mb-8 font-light">
              {heroDescription}
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.25}>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all group font-space-grotesk shadow-md"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Problem & Solution Section */}
      <section className="py-24 border-b border-white/[0.04] relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* The Pain (Problem) */}
            <ScrollReveal direction="right" className="h-full">
              <div className="p-8 rounded-2xl border border-white/[0.04] bg-[#0d0d0d] flex flex-col justify-between h-full group hover:border-red-950/40 transition-colors duration-300">
                <div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-red-400/50 font-semibold font-mono block mb-4">
                    The Challenge
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-4 font-space-grotesk">
                    {problem.title}
                  </h2>
                  <p className="text-white/45 text-sm leading-relaxed mb-6 font-light">
                    {problem.description}
                  </p>
                </div>
                {problem.items && (
                  <ul className="space-y-3 mt-auto pt-4 border-t border-white/[0.04]">
                    {problem.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-white/35 font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/30 mt-1.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>

            {/* The Cure (Solution) */}
            <ScrollReveal direction="left" delay={0.1} className="h-full">
              <div className="p-8 rounded-2xl border border-white/[0.08] bg-[#121212] flex flex-col justify-between h-full group hover:border-white/[0.16] transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl" />
                <div>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-white/50 font-semibold font-mono block mb-4">
                    Our Solution
                  </span>
                  <h2 className="text-2xl font-bold text-white mb-4 font-space-grotesk">
                    {solution.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 font-light">
                    {solution.description}
                  </p>
                </div>
                {solution.items && (
                  <ul className="space-y-3 mt-auto pt-4 border-t border-white/[0.06]">
                    {solution.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                        <Check className="w-4 h-4 text-white/60 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Benefits Section */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                Designed for direct business impact
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, i) => {
              const BenefitIcon = benefit.icon ? (ICON_MAP[benefit.icon.toLowerCase()] || Check) : Check;
              return (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 card-hover h-full flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 text-white/60">
                        <BenefitIcon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-semibold text-white mb-2 font-space-grotesk">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-white/45 leading-relaxed font-light">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-24 border-b border-white/[0.04] bg-[#0d0d0d]/40">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-20 text-center">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                The Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                How we ship your software
              </h2>
            </ScrollReveal>
          </div>

          <div className="relative">
            {/* Center line for larger screens */}
            <div className="absolute left-[17px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/[0.06] -translate-x-1/2" />

            <div className="space-y-12">
              {process.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className={`flex flex-col md:flex-row items-stretch gap-6 md:gap-12 relative ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                    {/* Circle timeline indicator */}
                    <div className="absolute left-[17px] md:left-1/2 top-2 w-[11px] h-[11px] rounded-full bg-white border-4 border-[#090909] -translate-x-1/2 z-10 hidden sm:block" />

                    {/* Left Column (Empty on md if item is even for layout) */}
                    <div className="w-full md:w-1/2 flex justify-end md:pr-12 text-left md:text-right hidden md:flex">
                      {i % 2 === 0 ? (
                        <div className="max-w-md">
                          <span className="text-4xl font-bold font-space-grotesk text-white/10 block mb-2">{step.number}</span>
                          <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{step.title}</h3>
                          <p className="text-sm text-white/45 font-light leading-relaxed">{step.description}</p>
                        </div>
                      ) : null}
                    </div>

                    {/* Right Column (Empty on md if item is odd for layout) */}
                    <div className="w-full md:w-1/2 flex justify-start md:pl-12 text-left">
                      {i % 2 === 1 ? (
                        <div className="max-w-md">
                          <span className="text-4xl font-bold font-space-grotesk text-white/10 block mb-2">{step.number}</span>
                          <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{step.title}</h3>
                          <p className="text-sm text-white/45 font-light leading-relaxed">{step.description}</p>
                        </div>
                      ) : (
                        /* Fallback visible on Mobile */
                        <div className="max-w-md md:hidden pl-10 relative">
                          <div className="absolute left-[17px] top-2 w-[11px] h-[11px] rounded-full bg-white border-4 border-[#090909] -translate-x-1/2 z-10 sm:hidden block" />
                          <span className="text-4xl font-bold font-space-grotesk text-white/10 block mb-2">{step.number}</span>
                          <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{step.title}</h3>
                          <p className="text-sm text-white/45 font-light leading-relaxed">{step.description}</p>
                        </div>
                      )}
                      
                      {/* For odd index mobile layout */}
                      {i % 2 === 1 && (
                        <div className="max-w-md md:hidden pl-10 relative">
                          <div className="absolute left-[17px] top-2 w-[11px] h-[11px] rounded-full bg-white border-4 border-[#090909] -translate-x-1/2 z-10 sm:hidden block" />
                          <span className="text-4xl font-bold font-space-grotesk text-white/10 block mb-2">{step.number}</span>
                          <h3 className="text-lg font-bold text-white font-space-grotesk mb-2">{step.title}</h3>
                          <p className="text-sm text-white/45 font-light leading-relaxed">{step.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                Frequently Asked Questions
              </h2>
            </ScrollReveal>
          </div>

          <div className="border-t border-white/[0.08]">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="border-b border-white/[0.08]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-white transition-colors"
                    aria-expanded={openFaq === i}
                    id={`faq-trigger-${i}`}
                    aria-controls={`faq-content-${i}`}
                  >
                    <span className="text-base font-semibold text-white/80 tracking-tight">{faq.q}</span>
                    <div className="flex-shrink-0 text-white/30">
                      {openFaq === i ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
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
                        <div className="pb-6 text-sm text-white/45 leading-relaxed font-light">
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

      {/* 6. CTA Section */}
      <section className="py-24 text-center relative overflow-hidden">
        <GradientBlob className="w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" color={blobColor} />
        
        <div className="relative z-10 mx-auto max-w-3xl px-6 sm:px-10">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 font-space-grotesk leading-tight">
              Ready to construct your vision?
            </h2>
            <p className="text-sm sm:text-base text-white/50 max-w-xl mx-auto leading-relaxed mb-8 font-light">
              Get in touch for an honest consultation about your systems architecture, timelines, and budgets.
            </p>
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group font-space-grotesk shadow-lg"
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
