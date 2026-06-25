import { processSteps } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

export function ProcessSection() {
  return (
    <section className="relative py-24 sm:py-32" id="process">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              How we work
            </span>
          </ScrollReveal>
          <TextReveal
            text="A process built for speed and quality"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-white/50 text-lg leading-relaxed">
              We follow a proven framework that removes ambiguity and delivers results predictably.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/20 to-transparent hidden lg:block" />

          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content card */}
                  <div className={`w-full lg:w-5/12 ${i % 2 === 0 ? "lg:text-right" : ""}`}>
                    <div className="glass rounded-2xl border border-white/[0.08] p-6 hover:border-white/[0.14] transition-all duration-300 card-hover">
                      <div className="flex items-center gap-3 mb-3 flex-row-reverse lg:flex-row">
                        <span className="font-mono text-xs text-blue-400/60 font-bold">{step.number}</span>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ring-4 ring-background z-10" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
