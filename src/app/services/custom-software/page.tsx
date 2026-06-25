import Link from "next/link";
import { Code2, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Custom Software Development",
  description: "Bespoke software engineered for complex business problems that off-the-shelf tools can't solve.",
  canonical: "https://krissdevhub.com/services/custom-software",
});

export default function CustomSoftwarePage() {
  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] top-0 left-1/2 -translate-x-1/2 opacity-30" color="indigo" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">Custom Software</span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="Built exactly for how your business works"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              When generic tools create workarounds instead of solutions, we engineer software from the ground up — precisely matched to your processes, team, and growth trajectory.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group">
              Discuss your requirements <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
