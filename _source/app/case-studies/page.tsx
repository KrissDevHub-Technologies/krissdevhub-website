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
    title: "KrissDevHub Technologies Website",
    category: "Custom Web App",
    description:
      "An enterprise-grade, highly performant showcase website for KrissDevHub Technologies built with Next.js 16 App Router, TypeScript, and Supabase.",
    tech: ["Next.js 16", "TypeScript", "React 19", "Supabase"],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Page Load Time", value: "< 250ms" },
      { label: "Core Web Vitals Pass", value: "100%" },
    ],
    slug: "krissdevhub-technologies-website",
    gradient: "from-cyan-600/15 to-blue-600/10",
  },
  {
    title: "Signal Hire – AI-Powered Interview Platform",
    category: "AI Platform",
    description:
      "An AI-powered virtual screening and interview platform that transcribes live voice consultations and generates structured evaluation cards.",
    tech: ["Python", "FastAPI", "Whisper API", "Claude 3.5 Sonnet"],
    metrics: [
      { label: "Evaluation Correlation", value: "95%" },
      { label: "Response Delay", value: "< 3.0s" },
      { label: "Avg Screening Time", value: "< 15 min" },
    ],
    slug: "signal-hire-ai-interview-platform",
    gradient: "from-emerald-600/15 to-teal-600/10",
  },
  {
    title: "Branovation – Marketing SaaS Admin Platform",
    category: "Marketing SaaS",
    description:
      "A multi-tenant SaaS dashboard managing high-volume social campaigns, cohort allocations, influencer tracking, and payouts.",
    tech: ["Next.js", "PostgreSQL", "Stripe Connect", "Redis"],
    metrics: [
      { label: "Dashboard load", value: "< 300ms" },
      { label: "Influencer Payouts", value: "500+/click" },
      { label: "Payment Errors", value: "0%" },
    ],
    slug: "branovation-marketing-saas-admin",
    gradient: "from-amber-600/15 to-orange-600/10",
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
