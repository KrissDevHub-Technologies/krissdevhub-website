import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

export function CtaSection() {
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="cta">
      <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
        <ScrollReveal>
          <span className="text-[10px] tracking-[0.15em] uppercase text-white/35 font-medium font-space-grotesk mb-6 block">
            Get Started
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.08] font-space-grotesk">
            Let&apos;s build something remarkable.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-10 leading-relaxed font-light font-sans">
            Tell us about your product vision. We&apos;ll respond within 24 hours with an honest assessment and clear engineering plan.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary"
              id="cta-section-button"
            >
              Start your project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about"
              className="btn-secondary"
            >
              About our team
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
