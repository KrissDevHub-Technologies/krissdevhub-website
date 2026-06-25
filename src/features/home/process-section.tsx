import { processSteps } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

export function ProcessSection() {
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="process">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-24 items-start">
          <div>
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk">
                Process
              </span>
            </ScrollReveal>
          </div>

          <div>
            <TextReveal
              text="Built for speed and quality."
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                We remove administrative bloat, prioritize direct developer-to-client communication, and ship software iteratively.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Spacious, single-column numbered list */}
        <div className="border-t border-white/[0.08] mt-16">
          {processSteps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.06}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-white/[0.08] items-start">
                {/* Large Number */}
                <div className="md:col-span-3">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white/10 font-space-grotesk leading-none select-none block">
                    {step.number}
                  </span>
                </div>

                {/* Title and Description */}
                <div className="md:col-span-9 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <h3 className="text-lg sm:text-xl font-bold text-white md:w-1/3 pt-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-white/45 leading-relaxed font-light md:w-2/3 max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
