import Link from "next/link";
import {
  Brain,
  Sparkles,
  GitBranch,
  ShieldCheck,
  Code2,
  BookOpen,
  ArrowRight
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const roles = [
  {
    title: "AI Trainers",
    desc: "Domain experts who author high-quality instruction datasets for Supervised Fine-Tuning.",
    href: "/services/ai-trainers",
    icon: Brain,
  },
  {
    title: "Prompt Engineers",
    desc: "Architects designing templates, context retrieval, and safety validation boundaries.",
    href: "/services/prompt-engineers",
    icon: Sparkles,
  },
  {
    title: "RLHF Experts",
    desc: "Specialists providing comparative alignment data to feed preference training runs.",
    href: "/services/rlhf",
    icon: GitBranch,
  },
  {
    title: "AI Evaluators",
    desc: "Auditors stress-testing models, checking factual drift, and executing red-teaming attacks.",
    href: "/services/ai-evaluators",
    icon: ShieldCheck,
  },
  {
    title: "Coding Experts",
    desc: "Developers writing verified, compiling script examples and step-by-step logic rationales.",
    href: "/services/ai-coding",
    icon: Code2,
  },
  {
    title: "Researchers",
    desc: "ML associates supporting literature review, pre-processing corpus data, and tracking runs.",
    href: "/services/ai-research",
    icon: BookOpen,
  },
];

export function WorkforceSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#090909] border-t border-white/[0.04]" id="ai-workforce">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-20 items-start">
          <div>
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk">
                AI Workforce Solutions
              </p>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.05}>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.08] font-space-grotesk">
                Deploy Managed
                <br />
                Human Loops.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                Supercharge model training, alignment, and evaluation with our vetted, domain-expert on-demand workforce.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {roles.map((r, i) => {
            const Icon = r.icon;
            return (
              <ScrollReveal key={r.title} delay={i * 0.05}>
                <Link
                  href={r.href}
                  className="group block p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.01] transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-5 text-white/50 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk flex items-center gap-1.5">
                      {r.title}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/60" />
                    </h3>
                    <p className="text-xs text-white/40 leading-relaxed font-light">
                      {r.desc}
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <ScrollReveal delay={0.15}>
            <Link
              href="/ai-workforce"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all group font-space-grotesk shadow-md"
            >
              Explore Workforce
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
