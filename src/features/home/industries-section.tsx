import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import {
  CreditCard,
  Activity,
  GraduationCap,
  ShoppingBag,
  Building2,
  Scale,
  BarChart3,
  Leaf,
} from "lucide-react";

const industriesList = [
  { name: "FinTech", icon: CreditCard, description: "Payment systems, trading platforms, financial analytics" },
  { name: "HealthTech", icon: Activity, description: "Patient management, telemedicine, health analytics" },
  { name: "EdTech", icon: GraduationCap, description: "Learning platforms, assessments, adaptive education" },
  { name: "E-Commerce", icon: ShoppingBag, description: "Storefronts, inventory, logistics, personalization" },
  { name: "PropTech", icon: Building2, description: "Property management, virtual tours, market analytics" },
  { name: "LegalTech", icon: Scale, description: "Contract automation, compliance, case management" },
  { name: "MarTech", icon: BarChart3, description: "Campaign automation, analytics, CRM integrations" },
  { name: "CleanTech", icon: Leaf, description: "Energy monitoring, sustainability platforms" },
];

export function IndustriesSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0d0d0d]" id="industries">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-16 mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 block">
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
          {industriesList.map((industry, i) => {
            const Icon = industry.icon;
            return (
              <ScrollReveal key={industry.name} delay={i * 0.06}>
                <div className="group p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover text-center flex flex-col items-center justify-center">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 text-white/60 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">{industry.name}</h3>
                  <p className="text-xs text-white/30 leading-relaxed hidden sm:block">
                    {industry.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
