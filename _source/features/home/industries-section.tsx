import { industries } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

export function IndustriesSection() {
  return (
    <section className="relative py-24 sm:py-32" id="industries">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400/70 mb-4 block">
              Verticals
            </span>
          </ScrollReveal>
          <TextReveal
            text="Industries we serve"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="mt-4 text-white/50 text-lg">
              Deep domain expertise across the sectors where software has the most impact.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {industries.map((industry, i) => (
            <ScrollReveal key={industry.name} delay={i * 0.06}>
              <div className="group p-5 rounded-2xl glass border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover text-center">
                <span className="text-3xl mb-3 block" role="img" aria-label={industry.name}>
                  {industry.icon}
                </span>
                <h3 className="text-sm font-semibold text-white mb-1">{industry.name}</h3>
                <p className="text-xs text-white/30 leading-relaxed hidden sm:block">
                  {industry.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
