import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Automation Services",
  description: "Intelligent workflow automation that replaces manual processes and surfaces insights that matter.",
  canonical: "https://krissdevhub.com/services/automation",
});

export default function AutomationPage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] top-0 right-0 opacity-30" color="purple" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Zap className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Automation</span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="Automate the repetitive. Focus on what matters."
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              We map your manual workflows, identify what can be automated intelligently, and build reliable systems that run without babysitting.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group">
              Automate your workflow <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
