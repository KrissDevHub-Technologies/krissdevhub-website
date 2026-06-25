import Link from "next/link";
import { GitBranch, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "API Integrations",
  description: "Connect any systems at any scale. REST, GraphQL, webhooks, and real-time integrations.",
  canonical: "https://krissdevhub.com/services/api-integrations",
});

export default function ApiIntegrationsPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 -left-20 opacity-30" color="blue" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <GitBranch className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">API Integrations</span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="Connect any systems, at any scale"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              We design and build production-grade API integrations — RESTful, GraphQL, and real-time — with proper error handling, rate limiting, and documentation baked in.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group">
              Discuss your integration <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
