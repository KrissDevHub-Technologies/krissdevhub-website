import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { CtaSection } from "@/features/home/cta-section";

const projects: Record<string, {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  challenge: string;
  solution: string;
  results: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  timeline: string;
  gradient: string;
}> = {
  "neuralops-dashboard": {
    title: "NeuralOps Dashboard",
    category: "AI Platform",
    gradient: "from-blue-600/30 to-purple-600/20",
    description: "Real-time AI operations platform for monitoring LLM pipelines at scale.",
    longDescription:
      "NeuralOps is a monitoring and observability platform built for companies running LLM workloads in production. It provides real-time visibility into API costs, latency distributions, model performance, and vector database health — all from a single dashboard.",
    challenge:
      "The client was running 50M+ LLM API calls per month across 12 models with no unified observability layer. They were flying blind on costs and had no way to detect prompt regression before it reached users.",
    solution:
      "We designed a streaming pipeline that captures every LLM call, evaluates output quality in near-real-time using a judge model, and surfaces anomalies on a unified React dashboard. All data is stored in Supabase with Pinecone for semantic similarity search across past responses.",
    results:
      "Within 30 days of launch, the team identified 3 regressions before they reached production. Monthly AI costs dropped by 40% through intelligent caching of semantically similar queries. The dashboard processes 2M events per day with sub-200ms query latency.",
    tech: ["Next.js 15", "TypeScript", "OpenAI", "Pinecone", "Supabase", "Framer Motion", "Recharts", "Vercel"],
    metrics: [
      { label: "Monthly cost reduction", value: "40%" },
      { label: "Query latency (p95)", value: "< 200ms" },
      { label: "Events processed/day", value: "2M+" },
      { label: "Time to ship MVP", value: "8 weeks" },
    ],
    timeline: "8 weeks",
  },
  "fleetflow-saas": {
    title: "FleetFlow SaaS",
    category: "Logistics Technology",
    gradient: "from-emerald-600/25 to-blue-600/15",
    description: "Fleet management SaaS with real-time GPS, maintenance alerts, and compliance automation.",
    longDescription:
      "FleetFlow is a full-stack fleet management platform serving logistics operators across the UK, Germany, and Poland. It unifies GPS tracking, maintenance scheduling, driver compliance, and financial reporting into a single product.",
    challenge:
      "The client was managing 250+ vehicles across 3 countries using spreadsheets, WhatsApp groups, and 4 disconnected tools. Compliance documentation was manual, late payment rates were high, and they had no visibility into fleet health.",
    solution:
      "We built a multi-tenant SaaS with real-time WebSocket GPS feeds, predictive maintenance ML models (trained on historical service records), automated tachograph compliance generation, and an operator mobile app for drivers.",
    results:
      "Route optimization is now 3× faster using our AI-powered routing engine. Late payments dropped 45% after implementing automated invoice reminders. The compliance team went from 20 hours per week of manual document processing to under 2.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Redis", "Mapbox", "Stripe", "Twilio"],
    metrics: [
      { label: "Route optimization", value: "3× faster" },
      { label: "Late payments", value: "−45%" },
      { label: "Compliance hours saved/week", value: "18h" },
      { label: "Active fleets", value: "250+" },
    ],
    timeline: "14 weeks",
  },
  "medscript-ai": {
    title: "MedScript AI",
    category: "HealthTech",
    gradient: "from-rose-600/20 to-purple-600/15",
    description: "AI clinical documentation assistant reducing physician note time by 60%.",
    longDescription:
      "MedScript AI transcribes patient-physician conversations in real time, extracts structured clinical data, and generates SOAP-format clinical notes pre-populated into the EHR system — all within the consultation window.",
    challenge:
      "Physicians at a mid-sized UK healthcare provider were spending 35% of their time on documentation rather than patient care. Burnout was high, appointment capacity was constrained, and note quality was inconsistent.",
    solution:
      "We built a HIPAA/GDPR-compliant audio pipeline using Azure Cognitive Services for transcription, fine-tuned a medical LLM for entity extraction, and integrated with the provider's Epic EHR via FHIR APIs. All data is processed and deleted within the session window.",
    results:
      "Average documentation time dropped from 12 minutes to under 5 minutes per patient. Physician satisfaction scores improved significantly, and the provider increased appointment capacity by 22% without hiring additional staff.",
    tech: ["Python", "LangChain", "Azure Cognitive Services", "FastAPI", "React", "FHIR", "PostgreSQL"],
    metrics: [
      { label: "Documentation time", value: "−60%" },
      { label: "Note accuracy", value: "97.3%" },
      { label: "Appointment capacity", value: "+22%" },
      { label: "Physicians onboarded", value: "80+" },
    ],
    timeline: "12 weeks",
  },
};

// Generate metadata for each case study
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return constructMetadata({ title: "Case Study Not Found" });
  return constructMetadata({
    title: project.title,
    description: project.description,
    canonical: `https://krissdevhub.com/case-studies/${slug}`,
  });
}

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <>
      <article className="pt-24">
        {/* Hero banner */}
        <div className={`h-64 sm:h-80 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          {/* Back link */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All case studies
          </Link>

          {/* Header */}
          <div className="glass rounded-2xl border border-white/[0.08] p-8 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-3 block">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-lg text-white/60 leading-relaxed mb-6">{project.longDescription}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="text-xl font-bold gradient-text-blue mb-1">{m.value}</div>
                  <div className="text-xs text-white/30">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-6 mb-16">
            {[
              { label: "The Challenge", content: project.challenge },
              { label: "Our Solution", content: project.solution },
              { label: "The Results", content: project.results },
            ].map(({ label, content }) => (
              <section key={label} className="glass rounded-2xl border border-white/[0.08] p-6">
                <h2 className="text-lg font-semibold text-white mb-3">{label}</h2>
                <p className="text-white/60 leading-relaxed">{content}</p>
              </section>
            ))}
          </div>

          {/* Tech stack */}
          <div className="glass rounded-2xl border border-white/[0.08] p-6 mb-16">
            <h2 className="text-lg font-semibold text-white mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-sm px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400/80 border border-blue-500/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
