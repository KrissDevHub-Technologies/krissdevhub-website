import Link from "next/link";
import { ArrowUpRight, Brain, Zap, Code2, GitBranch, Layers, Bot } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Services",
  description:
    "AI development, SaaS engineering, custom software, API integrations, and automation. End-to-end software services for startups and SMBs.",
  canonical: "https://krissdevhub.com/services",
});

const services = [
  {
    icon: Brain,
    title: "AI Development",
    href: "/services/ai-development",
    description:
      "From LLM integrations and RAG systems to custom AI agents and vector databases. We build AI that's production-ready and actually solves your problem.",
    features: ["LLM Integration", "RAG Systems", "AI Agents", "Vector Databases", "Fine-tuning", "Embeddings"],
  },
  {
    icon: Layers,
    title: "SaaS Development",
    href: "/services/saas-development",
    description:
      "Full-stack SaaS platforms built for scale. Multi-tenancy, usage-based billing, team management, and analytics — everything your product needs from day one.",
    features: ["Multi-tenancy", "Stripe Billing", "Auth & Teams", "Analytics", "Admin Panel", "API"],
  },
  {
    icon: Code2,
    title: "Custom Software",
    href: "/services/custom-software",
    description:
      "Complex business logic that off-the-shelf can't handle. We design and engineer bespoke systems that fit exactly how your business operates.",
    features: ["Business Logic", "Complex Workflows", "Data Pipelines", "Integrations", "Legacy Modernization"],
  },
  {
    icon: GitBranch,
    title: "API Integrations",
    href: "/services/api-integrations",
    description:
      "Connect any systems, at any scale. REST, GraphQL, and real-time integrations with third-party services, payment providers, and data platforms.",
    features: ["REST & GraphQL", "Webhooks", "OAuth Flows", "Data Sync", "Rate Limiting", "Documentation"],
  },
  {
    icon: Zap,
    title: "Automation",
    href: "/services/automation",
    description:
      "Replace manual processes with intelligent workflows. We automate the repetitive so your team focuses on what moves the business forward.",
    features: ["Workflow Design", "Scheduled Jobs", "Event Triggers", "Data Processing", "Notifications"],
  },
  {
    icon: Bot,
    title: "AI Agents",
    href: "/services/ai-development",
    description:
      "Autonomous AI agents that reason, plan, and act. From customer service bots to internal knowledge workers — agents that actually get things done.",
    features: ["Tool Use", "Memory", "Multi-agent", "Function Calling", "Monitoring"],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-[#090909]">
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 text-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
              Services
            </span>
          </ScrollReveal>
          <TextReveal
            text="Everything you need to build and scale"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-space-grotesk"
            as="h1"
          />
          <ScrollReveal delay={0.1}>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mx-auto font-light leading-relaxed">
              End-to-end software services, from initial concept to production deployment and ongoing iteration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 pb-32 bg-[#090909]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.title} delay={i * 0.08}>
                  <Link href={service.href} className="block group h-full">
                    <article className="h-full p-8 rounded-2xl bg-[#111111] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 card-hover flex flex-col justify-between">
                      <div>
                        {/* Icon */}
                        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-6 text-white/80 group-hover:text-white transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        
                        {/* Title & Desc */}
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h2 className="text-lg font-bold text-white group-hover:text-white/80 transition-colors font-space-grotesk">
                            {service.title}
                          </h2>
                          <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-0.5 transition-colors" />
                        </div>
                        <p className="text-[13px] text-white/45 leading-relaxed mb-6 font-light">
                          {service.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className="text-[10px] px-2.5 py-0.5 rounded-md border border-white/[0.04] bg-white/[0.02] text-white/35 font-mono"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
