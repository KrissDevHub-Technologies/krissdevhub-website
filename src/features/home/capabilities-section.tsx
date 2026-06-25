import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const capabilities = [
  {
    title: "AI Engineering",
    desc: "Custom large language model integration, retrieval-augmented generation (RAG) pipelines, and autonomous agent systems engineered for high accuracy and scalability.",
    href: "/services/ai-development",
  },
  {
    title: "SaaS Product Development",
    desc: "End-to-end design and engineering of multi-tenant web applications, incorporating usage-based billing, enterprise-grade authentication, and real-time analytics.",
    href: "/services/saas-development",
  },
  {
    title: "Bespoke Custom Software",
    desc: "Tailored software systems engineered to solve complex operational problems where off-the-shelf software or standard templates fail.",
    href: "/services/custom-software",
  },
  {
    title: "Intelligent Workflows",
    desc: "Automating repetitive organizational processes with event-driven architectures and API integrations to maximize team leverage.",
    href: "/services/automation",
  },
  {
    title: "System Integrations",
    desc: "Robust, secure API integrations connecting disparate services and custom backends with high-throughput data sync capabilities.",
    href: "/services/api-integrations",
  },
  {
    title: "Data Pipelines & RAG",
    desc: "Scalable data ingestion pipelines, vector embeddings management, and search systems optimized for contextual information retrieval.",
    href: "/services/ai-development",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="capabilities">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-24 items-start">
          <div>
            <ScrollReveal>
              <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk">
                Capabilities
              </p>
            </ScrollReveal>
          </div>

          <div>
            <ScrollReveal delay={0.05}>
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.08]">
                AI-powered solutions.
                <br />
                Built for impact.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                We engineer scalable digital products with a focus on clean architecture, technical excellence, and measurable results.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Flat Grid (Massive whitespace, clean text blocks, thin horizontal dividers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12 border-t border-white/[0.08] pt-16">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.05}>
              <Link href={c.href} className="group block h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white/80 transition-colors flex items-center gap-1">
                    {c.title}
                    <ArrowUpRight className="w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-white/60 transition-all duration-200" />
                  </h3>
                  <p className="text-[13.5px] text-white/45 leading-relaxed font-light">
                    {c.desc}
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
