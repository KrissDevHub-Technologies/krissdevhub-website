import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About",
  description:
    "We are KrissDevHub Technologies — an AI-native software engineering studio helping startups and SMBs build technology that scales.",
  canonical: "https://krissdevhub.com/about",
});

const values = [
  {
    title: "Craft over convenience",
    description:
      "We refuse to ship code we're embarrassed by. Every architecture decision, every function, every interaction is considered.",
  },
  {
    title: "Radical transparency",
    description:
      "We tell you what we think, even when it's uncomfortable. No bloated timelines, no surprises, no hidden complexity.",
  },
  {
    title: "Outcomes over output",
    description:
      "Lines of code mean nothing. Business results do. We stay aligned on what you're trying to achieve and optimize for that.",
  },
  {
    title: "AI as a tool, not a buzzword",
    description:
      "We apply AI where it genuinely makes the product better. We'll tell you when it's the wrong solution.",
  },
];

import { StructuredData } from "@/components/shared/structured-data";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "KrissDevHub Technologies",
  "url": "https://krissdevhub.com",
  "logo": "https://krissdevhub.com/icon.png",
  "description": "AI-native software engineering studio helping startups and enterprise clients build scalable Next.js systems.",
  "sameAs": [
    "https://github.com/krissdevhub",
    "https://twitter.com/krissdevhub",
    "https://linkedin.com/company/krissdevhub"
  ]
};

export default function AboutPage() {
  return (
    <>
      <StructuredData schema={aboutSchema} />
      {/* Hero */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-40 -right-40 opacity-30" color="purple" />
        <GradientBlob className="w-[400px] h-[400px] bottom-0 -left-40 opacity-15" color="blue" />
        
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-6 block">
              About us
            </span>
          </ScrollReveal>
          <TextReveal
            text="We build software that matters."
            className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8 font-space-grotesk leading-tight"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-8 font-light">
              KrissDevHub Technologies is an AI-native software engineering studio. We partner with
              startups and growing businesses to design, build, and ship production-grade software that creates
              genuine business outcomes.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-[#0d0d0d] border-y border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-[#121212]/40">
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-semibold font-mono block mb-4">
                  Our Mission
                </span>
                <h2 className="text-xl font-bold text-white font-space-grotesk mb-4">
                  Help great companies build great software
                </h2>
                <p className="text-sm text-white/45 leading-relaxed font-light mb-6">
                  We started KrissDevHub because we were frustrated with the standard software consulting pipeline — bloated timelines, poor documentation, and architectures that need to be completely rewritten in 18 months.
                </p>
                <p className="text-sm text-white/45 leading-relaxed font-light">
                  Today, we work in close alignment with our client partners to ship modular Next.js platforms, AI pipelines, and custom software systems in weeks, not quarters.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-[#121212]/40">
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-semibold font-mono block mb-4">
                  Our Vision
                </span>
                <h2 className="text-xl font-bold text-white font-space-grotesk mb-4">
                  Accelerate global software engineering craft
                </h2>
                <p className="text-sm text-white/45 leading-relaxed font-light mb-6">
                  To become the premier software partner for technically demanding teams. We bridge the gap between fast-moving generative AI research and rigid, secure enterprise systems.
                </p>
                <p className="text-sm text-white/45 leading-relaxed font-light">
                  We are building a distributed team of high-craft engineers who prioritize code readability, long-term system scaling, and honest, direct developer interfaces.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Values
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                What we stand for
              </h2>
            </ScrollReveal>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="p-8 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  <h3 className="text-base font-bold text-white mb-3 font-space-grotesk">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-white/45 leading-relaxed font-light">{value.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Philosophy (Monospace Block Visualizer) */}
      <section className="py-24 bg-[#0d0d0d]/40 border-b border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                  Philosophy
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk mb-6">
                  Our Engineering Philosophy
                </h2>
                <p className="text-sm text-white/45 leading-relaxed font-light mb-4">
                  We write code that is clean, descriptive, and highly typed. We believe developer cognitive overhead is the greatest bottleneck in software maintenance.
                </p>
                <p className="text-sm text-white/45 leading-relaxed font-light">
                  By treating prompts as production code, databases as strict transactional validation borders, and systems as modular networks, we construct scalable foundations.
                </p>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.15} direction="left">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c0c] p-6 shadow-2xl relative">
                <div className="flex gap-1.5 border-b border-white/[0.06] pb-3 mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                
                <pre className="text-[10px] sm:text-xs font-mono text-white/60 leading-relaxed overflow-x-auto">
                  <code>
{`// KrissDevHub Core Engineering Rules
const studioPhilosophy = {
  craftOverSpeed: true,
  typeSafety: "Strict",
  lintWarnings: 0,
  rlsSecurity: "Mandatory",
  
  optimizeLatency: (responseMs) => {
    return responseMs < 200 ? "Excellent" : "Optimize";
  },
  
  cleanCodeRule: () => {
    return "Readable code over clever abstractions";
  }
};`}
                  </code>
                </pre>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Development Standards */}
      <section className="py-24 border-b border-white/[0.04]">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                Our Development Standards
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                title: "Strict Type Verification",
                desc: "We enforce strict TypeScript configurations. All APIs, database records, and component properties are typed, preventing runtime failures and clarifying contract expectations.",
              },
              {
                title: "CI/CD Deployment Pipelines",
                desc: "Every pull request triggers automated syntax validation, unit checks, and builds. We deploy staging environments to verify UI states before manual production releases.",
              },
              {
                title: "Postgres RLS Guardrails",
                desc: "We mandate PostgreSQL Row Level Security (RLS) on all user data tables. Tenant separation rules are tested dynamically to prevent cross-tenant disclosures.",
              },
              {
                title: "Comprehensive Code Reviews",
                desc: "No developer ships directly to main. We perform line-by-line review processes on all pull requests, checking schema setups and performance impacts.",
              },
            ].map((std, i) => (
              <ScrollReveal key={std.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk">{std.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed font-light">{std.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why KrissDevHub Technologies */}
      <section className="py-24 bg-[#0d0d0d]/30">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-16 text-center">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Why Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-space-grotesk">
                Why work with KrissDevHub Technologies
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Product Mindset",
                desc: "We are product builders, not ticket executors. We push back against feature bloat and collaborate on user onboarding journeys to save capital.",
              },
              {
                title: "Zero Vendor Lock-in",
                desc: "You own the database and repository keys completely. All designs, codebases, and configurations belong to your company from sprint one.",
              },
              {
                title: "Transparent Sprints",
                desc: "We communicate asynchronously using clear logs and Loom videos. You have 100% visibility into current issues and ongoing pipeline scopes.",
              },
            ].map((reason, i) => (
              <ScrollReveal key={reason.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.06] text-center">
                  <div className="text-2xl mb-4 font-mono font-bold text-white/20">0{i + 1}</div>
                  <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk">{reason.title}</h3>
                  <p className="text-xs text-white/45 leading-relaxed font-light">{reason.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
