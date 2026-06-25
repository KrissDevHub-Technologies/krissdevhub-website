import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";

const comparisons = [
  { label: "AI-native engineering from day one", us: "Yes", others: "No" },
  { label: "Dedicated engineering team per project", us: "Yes", others: "No" },
  { label: "Full ownership of source code & infrastructure", us: "Yes", others: "No" },
  { label: "Ship MVPs in 6–10 weeks", us: "Yes", others: "No" },
  { label: "Production-grade quality standards", us: "Yes", others: "Yes" },
  { label: "Post-launch support & iteration retainers", us: "Yes", others: "No" },
  { label: "Transparent scope, no hidden fee models", us: "Yes", others: "No" },
];

export function WhyUsSection() {
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="why-us">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-start">
          {/* Left info column */}
          <div>
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Why KrissDevHub
              </span>
            </ScrollReveal>
            <TextReveal
              text="Partners, not contractors."
              className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-white/50 text-base leading-relaxed font-light mb-8 max-w-md">
                We work differently from typical outsource shops. We embed ourselves in your product roadmap, ask why before how, and ship code we are proud to scale.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-3 font-light text-sm text-white/45 max-w-md">
                <p>— We think in systems, not single features.</p>
                <p>— We build foundations that scale with your users.</p>
                <p>— We prioritize clarity and direct developer communication.</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right flat table list column */}
          <ScrollReveal delay={0.15} direction="left">
            <div className="w-full">
              {/* Header */}
              <div className="grid grid-cols-12 pb-4 border-b border-white/[0.08] text-[10px] font-mono tracking-widest text-white/30 uppercase">
                <div className="col-span-6">Approach & Quality</div>
                <div className="col-span-3 text-right">KrissDevHub</div>
                <div className="col-span-3 text-right">Others</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/[0.04]">
                {comparisons.map((item) => (
                  <div key={item.label} className="grid grid-cols-12 py-5 items-center">
                    <span className="col-span-6 text-sm text-white/60 font-light pr-4">
                      {item.label}
                    </span>
                    <span className="col-span-3 text-right text-sm font-semibold text-white font-space-grotesk">
                      {item.us}
                    </span>
                    <span className="col-span-3 text-right text-sm text-white/20 font-light font-space-grotesk">
                      {item.others}
                    </span>
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
