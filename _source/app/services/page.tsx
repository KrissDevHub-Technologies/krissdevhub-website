import Link from "next/link";
import { ArrowUpRight, Brain, Zap, Code2, GitBranch, Layers, Bot } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
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
    color: "blue",
  },
  {
    icon: Layers,
    title: "SaaS Development",
    href: "/services/saas-development",
    description:
      "Full-stack SaaS platforms built for scale. Multi-tenancy, usage-based billing, team management, and analytics — everything your product needs from day one.",
    features: ["Multi-tenancy", "Stripe Billing", "Auth & Teams", "Analytics", "Admin Panel", "API"],
    color: "purple",
  },
  {
    icon: Code2,
    title: "Custom Software",
    href: "/services/custom-software",
    description:
      "Complex business logic that off-the-shelf can't handle. We design and engineer bespoke systems that fit exactly how your business operates.",
    features: ["Business Logic", "Complex Workflows", "Data Pipelines", "Integrations", "Legacy Modernization"],
    color: "indigo",
  },
  {
    icon: GitBranch,
    title: "API Integrations",
    href: "/services/api-integrations",
    description:
      "Connect any systems, at any scale. REST, GraphQL, and real-time integrations with third-party services, payment providers, and data platforms.",
    features: ["REST & GraphQL", "Webhooks", "OAuth Flows", "Data Sync", "Rate Limiting", "Documentation"],
    color: "blue",
  },
  {
    icon: Zap,
    title: "Automation",
    href: "/services/automation",
    description:
      "Replace manual processes with intelligent workflows. We automate the repetitive so your team focuses on what moves the business forward.",
    features: ["Workflow Design", "Scheduled Jobs", "Event Triggers", "Data Processing", "Notifications"],
    color: "purple",
  },
  {
    icon: Bot,
    title: "AI Agents",
    href: "/services/ai-development",
    description:
      "Autonomous AI agents that reason, plan, and act. From customer service bots to internal knowledge workers — agents that actually get things done.",
    features: ["Tool Use", "Memory", "Multi-agent", "Function Calling", "Monitoring"],
    color: "indigo",
  },
];

const colorMap = {
  blue: { icon: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  purple: { icon: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  indigo: { icon: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2 opacity-40" color="mixed" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              What we offer
            </span>
          </ScrollReveal>
          <TextReveal
            text="Everything you need to build and scale"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto text-balance">
              End-to-end software services, from initial concept to production deployment and ongoing iteration.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => {
              const colors = colorMap[service.color as keyof typeof colorMap];
              const Icon = service.icon;
              return (
                <ScrollReveal key={service.title} delay={i * 0.08}>
                  <Link href={service.href} className="block group h-full">
                    <article className="h-full p-6 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover">
                      <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                      </div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h2 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {service.title}
                        </h2>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-0.5 transition-colors" />
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed mb-5">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className={`text-xs px-2 py-0.5 rounded-md border ${colors.border} ${colors.icon} opacity-70`}
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
