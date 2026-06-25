import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/shared/magnetic-button";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CtaSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-[#070707]">
      {/* Background blobs */}
      <GradientBlob className="w-[600px] h-[400px] -left-40 top-0 opacity-40" color="blue" />
      <GradientBlob className="w-[500px] h-[400px] -right-40 bottom-0 opacity-30" color="purple" />

      {/* Grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full glass border border-white/[0.08] text-xs font-medium text-white/50">
            Ready when you are
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 text-balance">
            Let&apos;s build something{" "}
            <span className="gradient-text">remarkable.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10 text-balance">
            Tell us about your project. We&apos;ll respond within 24 hours with an honest assessment and clear next steps.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                id="cta-section-button"
                className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all duration-200 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
              >
                Start your project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
            <Link
              href="/about"
              className="text-sm text-white/40 hover:text-white/70 transition-colors"
            >
              Learn more about us →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
