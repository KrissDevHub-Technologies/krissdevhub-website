import { Check, X } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

const comparisons = [
  { label: "AI-native architecture from day one", us: true, others: false },
  { label: "Dedicated engineering team per project", us: true, others: false },
  { label: "Full ownership of code & infrastructure", us: true, others: false },
  { label: "Ship in weeks, not months", us: true, others: false },
  { label: "Production-grade quality standards", us: true, others: true },
  { label: "Post-launch support & iteration", us: true, others: false },
  { label: "Transparent pricing, no hidden fees", us: true, others: false },
  { label: "Deep domain expertise across industries", us: true, others: true },
];

export function WhyUsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#070707]" id="why-us">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <div>
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400/70 mb-4 block">
                Why KrissDevHub
              </span>
            </ScrollReveal>
            <TextReveal
              text="Not just developers. Partners."
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6"
              as="h2"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-white/50 text-lg leading-relaxed mb-8">
                We work differently from typical agencies. We embed ourselves in your business,
                understand your goals, and build software that creates measurable outcomes —
                not just functional code.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-2">
                {[
                  "We ask why before we ask how.",
                  "We think in systems, not features.",
                  "We write code we're proud to maintain.",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-1 h-1 rounded-full bg-purple-400" />
                    <span className="text-sm text-white/60">{point}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right comparison table */}
          <ScrollReveal delay={0.2} direction="left">
            <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-3 px-6 py-4 border-b border-white/[0.06] bg-white/[0.02]">
                <span className="text-xs text-white/30 font-medium uppercase tracking-wider col-span-1">Feature</span>
                <span className="text-xs text-center font-semibold text-white col-span-1">KrissDevHub</span>
                <span className="text-xs text-center text-white/30 col-span-1">Others</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/[0.04]">
                {comparisons.map((item, i) => (
                  <div key={item.label} className="grid grid-cols-3 px-6 py-3.5 items-center">
                    <span className="text-sm text-white/60 col-span-1 pr-4">{item.label}</span>
                    <div className="flex justify-center col-span-1">
                      {item.us ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-400/60" />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center col-span-1">
                      {item.others ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-400/40" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-400/40" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
