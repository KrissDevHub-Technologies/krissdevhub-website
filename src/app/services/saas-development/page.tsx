import Link from "next/link";
import { Layers, ArrowRight, Check } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "SaaS Development",
  description:
    "Full-stack SaaS product engineering with multi-tenancy, billing, auth, and analytics built in from day one.",
  canonical: "https://krissdevhub.com/services/saas-development",
});

const features = [
  "Multi-tenant architecture",
  "Stripe subscription billing",
  "Supabase Auth (SSO, magic link, OAuth)",
  "Team management & permissions",
  "Usage metering & analytics",
  "Admin dashboard",
  "Onboarding flows",
  "In-app notifications",
  "API access & webhooks",
  "Audit logging",
  "GDPR compliance",
  "99.9% uptime architecture",
];

export default function SaasDevPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-40 -right-40 opacity-35" color="purple" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
                <Layers className="w-4 h-4 text-white/80" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/40">
                SaaS Development
              </span>
            </div>
          </ScrollReveal>
          <TextReveal
            text="SaaS products built to scale from the start"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed mb-8">
              We build full-stack SaaS platforms with everything you need baked in — not bolted on later. Multi-tenancy, billing, auth, and analytics from day one.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all group">
              Start your SaaS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
      <section className="py-16 pb-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-white mb-8">Everything your SaaS needs</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <ScrollReveal key={f} delay={i * 0.04}>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#121212] border border-white/[0.06]">
                  <Check className="w-4 h-4 text-white/60 flex-shrink-0" />
                  <span className="text-sm text-white/70">{f}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
