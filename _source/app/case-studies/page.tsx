import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Case Studies",
  description:
    "Explore how KrissDevHub Technologies builds AI-native products, SaaS platforms, and custom software for startups and growing businesses.",
  canonical: "https://krissdevhub.com/case-studies",
});

const caseStudies = [
  {
    title: "NeuralOps Dashboard",
    category: "AI Platform",
    description:
      "A real-time AI operations platform for monitoring LLM pipelines, tracking token usage, and managing vector database performance at scale. Built for a Series A SaaS company handling 50M+ API calls per month.",
    tech: ["Next.js", "OpenAI", "Pinecone", "Supabase", "TypeScript"],
    metrics: [
      { label: "API cost reduction", value: "40%" },
      { label: "Response latency", value: "< 200ms" },
      { label: "Time to ship", value: "8 weeks" },
    ],
    slug: "neuralops-dashboard",
    gradient: "from-blue-600/30 to-purple-600/20",
  },
  {
    title: "FleetFlow SaaS",
    category: "Logistics Technology",
    description:
      "End-to-end fleet management SaaS with real-time GPS tracking, predictive maintenance alerts, and automated compliance workflows for logistics operators across 3 countries.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Redis"],
    metrics: [
      { label: "Route optimization", value: "3× faster" },
      { label: "Compliance cost", value: "−60%" },
      { label: "Active fleets", value: "250+" },
    ],
    slug: "fleetflow-saas",
    gradient: "from-emerald-600/25 to-blue-600/15",
  },
  {
    title: "MedScript AI",
    category: "HealthTech",
    description:
      "AI-powered clinical documentation assistant that reduces physician note-taking time by 60%. Built with fine-tuned medical LLMs, HIPAA-compliant storage, and EHR integrations.",
    tech: ["Python", "LangChain", "FastAPI", "Azure", "FHIR"],
    metrics: [
      { label: "Documentation time", value: "−60%" },
      { label: "Accuracy rate", value: "97.3%" },
      { label: "Physicians onboarded", value: "80+" },
    ],
    slug: "medscript-ai",
    gradient: "from-rose-600/20 to-purple-600/15",
  },
  {
    title: "PropVault",
    category: "PropTech",
    description:
      "A property management platform unifying lease management, maintenance requests, tenant communication, and financial reporting into one seamless product.",
    tech: ["Next.js", "Supabase", "Stripe", "Twilio", "Vercel"],
    metrics: [
      { label: "Admin time saved", value: "12h/week" },
      { label: "Late payments", value: "−45%" },
      { label: "Properties managed", value: "1,200+" },
    ],
    slug: "propvault",
    gradient: "from-amber-600/20 to-orange-600/15",
  },
  {
    title: "LegalEase AI",
    category: "LegalTech",
    description:
      "Contract analysis and clause extraction platform using GPT-4 to identify risk clauses, suggest standard language, and generate first-draft NDAs and MSAs in seconds.",
    tech: ["Python", "OpenAI", "FastAPI", "React", "PostgreSQL"],
    metrics: [
      { label: "Review time", value: "−75%" },
      { label: "Contracts processed", value: "10k+" },
      { label: "Legal team cost", value: "−30%" },
    ],
    slug: "legalease-ai",
    gradient: "from-indigo-600/25 to-blue-600/15",
  },
  {
    title: "EduPath Platform",
    category: "EdTech",
    description:
      "Adaptive learning SaaS that personalizes curriculum paths using learner performance data and LLM-powered content generation. Deployed across 6 partner institutions.",
    tech: ["Next.js", "Python", "OpenAI", "Supabase", "TypeScript"],
    metrics: [
      { label: "Completion rate", value: "+38%" },
      { label: "Learning outcomes", value: "+22%" },
      { label: "Active learners", value: "5,000+" },
    ],
    slug: "edupath-platform",
    gradient: "from-teal-600/25 to-emerald-600/15",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2 opacity-30" color="mixed" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              Our work
            </span>
          </ScrollReveal>
          <TextReveal
            text="Products we've built"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Real projects, real results. Explore how we&apos;ve helped startups and SMBs build software that makes a difference.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.slug} delay={i * 0.07}>
                <Link href={`/case-studies/${cs.slug}`} className="block group h-full">
                  <article className="h-full rounded-2xl border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover overflow-hidden bg-[#0a0a0a]">
                    {/* Gradient header */}
                    <div className={`h-32 bg-gradient-to-br ${cs.gradient} relative`}>
                      <div className="absolute inset-0 dot-grid opacity-20" />
                      <div className="absolute bottom-3 left-4">
                        <span className="text-xs font-medium text-white/50 bg-black/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                          {cs.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {cs.title}
                        </h2>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
                      </div>

                      <p className="text-sm text-white/50 leading-relaxed mb-5">
                        {cs.description}
                      </p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {cs.metrics.map((m) => (
                          <div
                            key={m.label}
                            className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05] text-center"
                          >
                            <div className="text-lg font-bold gradient-text-blue">{m.value}</div>
                            <div className="text-xs text-white/30 mt-0.5 leading-tight">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-1.5">
                        {cs.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-md bg-white/[0.04] text-white/30 border border-white/[0.06]"
                          >
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

      <CtaSection />
    </>
  );
}
