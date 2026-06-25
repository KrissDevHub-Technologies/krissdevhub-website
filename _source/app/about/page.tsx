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

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-40 -right-40 opacity-30" color="purple" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400/70 mb-6 block">
              About us
            </span>
          </ScrollReveal>
          <TextReveal
            text="We build software that matters."
            className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-8"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              KrissDevHub Technologies is an AI-native software engineering studio. We partner with
              startups and growing businesses to design, build, and ship software that creates
              real competitive advantage.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-white/40 max-w-2xl leading-relaxed">
              We believe the best software comes from engineering teams that care deeply about
              the problem, not just the solution. That&apos;s the culture we&apos;ve built.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#070707]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="aspect-square rounded-3xl glass border border-white/[0.06] flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">⚡</div>
                  <p className="text-sm text-white/40 font-mono">
                    AI-native · Production-ready · Partner-first
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Our mission is simple: help great companies build great software.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <p className="text-white/50 leading-relaxed mb-6">
                  We started KrissDevHub because we were frustrated with the state of software
                  consulting — bloated timelines, poor communication, code that needs to be rewritten
                  in 18 months. We set out to do it differently.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-white/50 leading-relaxed mb-8">
                  Today, we work with startups across FinTech, HealthTech, EdTech, and E-Commerce,
                  helping them ship AI-powered products faster than they thought possible. We&apos;re
                  small by design — every project gets our full attention.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  Work with us
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <TextReveal
              text="What we believe"
              className="text-3xl sm:text-4xl font-bold text-white"
              as="h2"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{value.description}</p>
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
