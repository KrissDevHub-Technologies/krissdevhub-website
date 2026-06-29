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
  "krissdevhub-technologies-website": {
    title: "KrissDevHub Technologies Website",
    category: "Custom Web App",
    gradient: "from-cyan-600/30 to-blue-600/20",
    description: "An enterprise-grade, highly performant showcase website for KrissDevHub Technologies built with Next.js 16 App Router, TypeScript, and Supabase.",
    longDescription: "This case study documents the design and development of our own company digital hub. The website is built to demonstrate premium Silicon Valley aesthetics (glassmorphism, interactive SVG charts, clean micro-animations) while ensuring perfect responsive readability and automated SEO structure.",
    challenge: "The primary challenge was building a website that reflects our design system standards and technical depth without relying on bloated dependencies, heavy templates, or generic animations. The site needed to serve pages instantly with sub-250ms load times, maintain 100% Core Web Vitals, and offer dynamically generated sitemaps.",
    solution: "We built the site using the latest Next.js 16 version with React Server Components, TypeScript, and Tailwind CSS. The interface uses Tailwind's utility class system for responsive grid layouts, custom SVG canvas animations for interactive diagrams, and a Server Action-based application queue linking straight to Supabase PostgreSQL.",
    results: "The website achieves a 100/100 performance score on Google Lighthouse. Type checking is fully verified at build time, and contact requests/job applications are safely processed via encrypted database schemas.",
    tech: ["Next.js 16", "TypeScript", "React 19", "Supabase", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Page Load Time", value: "< 250ms" },
      { label: "Core Web Vitals Pass", value: "100%" },
    ],
    timeline: "6 weeks",
  },
  "signal-hire-ai-interview-platform": {
    title: "Signal Hire – AI-Powered Interview Platform",
    category: "AI Platform",
    gradient: "from-emerald-600/30 to-teal-600/20",
    description: "An AI-powered virtual screening and interview platform that transcribes live voice consultations and generates structured evaluation cards.",
    longDescription: "Signal Hire is an advanced AI recruiting assistant designed to streamline candidate screening. The application conducts automated technical conversations, parses verbal answers in real time, and leverages medical/technical language classifiers to evaluate coding and operations questions.",
    challenge: "Legacy technical screening relies on static online multiple-choice tests that are easily bypassed by external tools or chat interfaces. The client needed a platform that could evaluate dynamic conversational responses, handle custom speech-to-text processing for accent variance, and run evaluations without storing sensitive personal audio long-term.",
    solution: "We built a secure audio streaming backend that processes conversational audio using Whisper models, executing real-time transcript matching. We then implemented a LLM evaluation engine using fine-tuned Claude 3.5 models to structure candidate responses, evaluating logical consistency and code terminology against test parameters.",
    results: "Candidates are screened in under 15 minutes, with audio processing taking less than 3 seconds per reply. Technical evaluation accuracy matched human interviewer ratings with a 95% correlation during initial pilot runs.",
    tech: ["Python", "FastAPI", "Whisper API", "Claude 3.5 Sonnet", "React", "Tailwind CSS", "Supabase", "WebRTC"],
    metrics: [
      { label: "Evaluation Correlation", value: "95%" },
      { label: "Response Delay", value: "< 3.0s" },
      { label: "Avg Screening Time", value: "< 15 min" },
    ],
    timeline: "10 weeks",
  },
  "branovation-marketing-saas-admin": {
    title: "Branovation – Marketing SaaS Admin Platform",
    category: "Marketing SaaS",
    gradient: "from-amber-600/30 to-orange-600/20",
    description: "A multi-tenant SaaS dashboard managing high-volume social campaigns, cohort allocations, influencer tracking, and payouts.",
    longDescription: "Branovation is an enterprise-grade administration hub for marketing departments and agencies. It enables campaign managers to design cohort strategies, monitor real-time referral links, and distribute automated payouts via Stripe Connect.",
    challenge: "The team was managing hundreds of active influencers across multiple regions using Excel spreadsheets and manual wires. Payout calculations were prone to errors, campaign attribution was laggy, and scaling user accounts created performance bottlenecks on their database queries.",
    solution: "We engineered a robust multi-tenant dashboard utilizing Postgres Row Level Security (RLS) to keep company data partitioned. We integrated Stripe Connect for automated split payouts and designed an analytics pipeline that tracks active referrers using a high-throughput event aggregator.",
    results: "Campaign managers can distribute accurate payments to 500+ users with one click. Dashboard load times dropped under 300ms, and administrative payment tracking errors were reduced to absolute zero.",
    tech: ["Next.js", "PostgreSQL", "Stripe Connect", "Redis", "Framer Motion", "Tailwind CSS", "Zustand"],
    metrics: [
      { label: "Dashboard load", value: "< 300ms" },
      { label: "Influencer Payouts", value: "500+/click" },
      { label: "Payment Errors", value: "0%" },
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
