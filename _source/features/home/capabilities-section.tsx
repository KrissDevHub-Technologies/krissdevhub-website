import { Brain, Layers, Zap, Code2, GitBranch, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

const capabilities = [
  {
    icon: Brain,
    title: "AI & LLM Integration",
    description:
      "We embed intelligence into your product. From custom GPT agents to RAG systems and vector search — we build AI that's actually useful, not just impressive.",
    tags: ["OpenAI", "LangChain", "Pinecone", "RAG"],
    color: "blue",
  },
  {
    icon: Layers,
    title: "SaaS Product Engineering",
    description:
      "Full-stack SaaS platforms with multi-tenancy, billing, auth, and analytics baked in from day one. We don't just ship MVP — we build for scale.",
    tags: ["Next.js", "Supabase", "Stripe", "tRPC"],
    color: "purple",
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description:
      "Replace manual processes with intelligent workflows. We connect your tools, automate the repetitive, and surface insights that matter.",
    tags: ["n8n", "Zapier", "APIs", "Webhooks"],
    color: "indigo",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "When off-the-shelf doesn't fit, we build exactly what you need. Complex business logic, industry-specific requirements, pixel-perfect execution.",
    tags: ["TypeScript", "Python", "Go", "PostgreSQL"],
    color: "blue",
  },
  {
    icon: GitBranch,
    title: "API Development",
    description:
      "We design, build, and document production-grade APIs. RESTful, GraphQL, or real-time — architected for reliability and developer experience.",
    tags: ["REST", "GraphQL", "WebSockets", "OpenAPI"],
    color: "purple",
  },
  {
    icon: Shield,
    title: "Cloud Architecture",
    description:
      "Scalable, secure, cost-optimized cloud infrastructure. We design systems that handle growth without surprises in your AWS or GCP bill.",
    tags: ["AWS", "GCP", "Vercel", "Docker"],
    color: "indigo",
  },
];

const colorMap = {
  blue: {
    icon: "text-blue-400",
    bg: "bg-blue-500/10",
    tag: "bg-blue-500/10 text-blue-400/70 border-blue-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]",
  },
  purple: {
    icon: "text-purple-400",
    bg: "bg-purple-500/10",
    tag: "bg-purple-500/10 text-purple-400/70 border-purple-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
  },
  indigo: {
    icon: "text-indigo-400",
    bg: "bg-indigo-500/10",
    tag: "bg-indigo-500/10 text-indigo-400/70 border-indigo-500/20",
    glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]",
  },
};

export function CapabilitiesSection() {
  return (
    <section className="relative py-24 sm:py-32" id="capabilities">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              What we do
            </span>
          </ScrollReveal>
          <TextReveal
            text="Our core capabilities"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-white/50 text-lg leading-relaxed">
              We bring together expertise across AI, full-stack engineering, and product design
              to build software that solves real business problems.
            </p>
          </ScrollReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, i) => {
            const colors = colorMap[cap.color as keyof typeof colorMap];
            const Icon = cap.icon;
            return (
              <ScrollReveal key={cap.title} delay={i * 0.08}>
                <article
                  className={`group relative p-6 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 card-hover ${colors.glow}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{cap.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{cap.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cap.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs px-2 py-0.5 rounded-md border ${colors.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
