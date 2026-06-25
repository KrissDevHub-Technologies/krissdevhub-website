import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

// Static featured projects (will be Supabase-fetched in real implementation)
const featuredProjects = [
  {
    title: "NeuralOps Dashboard",
    category: "AI Platform",
    description:
      "A real-time AI operations platform for monitoring LLM pipelines, tracking token usage, and managing vector database performance at scale.",
    tech: ["Next.js", "OpenAI", "Pinecone", "Supabase"],
    metric: "40% reduction in API costs",
    color: "from-blue-600/20 to-purple-600/10",
    slug: "neuralops-dashboard",
  },
  {
    title: "FleetFlow SaaS",
    category: "Logistics Technology",
    description:
      "End-to-end fleet management SaaS with real-time GPS tracking, predictive maintenance alerts, and automated driver compliance workflows.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS"],
    metric: "3× faster route optimization",
    color: "from-emerald-600/15 to-blue-600/10",
    slug: "fleetflow-saas",
  },
  {
    title: "MedScript AI",
    category: "HealthTech",
    description:
      "AI-powered clinical documentation assistant that reduces physician note-taking time by 60%, using fine-tuned medical LLMs and HIPAA-compliant storage.",
    tech: ["Python", "LangChain", "FastAPI", "Azure"],
    metric: "60% faster documentation",
    color: "from-rose-600/15 to-purple-600/10",
    slug: "medscript-ai",
  },
];

export function ProjectsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#070707]" id="projects">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
                Featured work
              </span>
            </ScrollReveal>
            <TextReveal
              text="Projects we're proud of"
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
              as="h2"
            />
          </div>
          <ScrollReveal delay={0.1}>
            <Link
              href="/case-studies"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors group"
            >
              All case studies
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.1}>
              <Link href={`/case-studies/${project.slug}`} className="block group">
                <article
                  className="relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover bg-[#0a0a0a] h-full"
                >
                  {/* Gradient header */}
                  <div className={`h-40 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 dot-grid opacity-30" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-medium text-white/50 bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-0.5 transition-colors" />
                    </div>
                    <p className="text-sm text-white/50 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Metric */}
                    <div className="mb-4 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      <span className="text-xs text-white/30 block mb-0.5">Key result</span>
                      <span className="text-sm font-semibold gradient-text-blue">{project.metric}</span>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30 border border-white/[0.06]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
