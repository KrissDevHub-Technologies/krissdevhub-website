import Link from "next/link";
import {
  ArrowUpRight,
  MapPin,
  Clock,
  Briefcase,
  Globe,
  Clock3,
  BookOpen,
  Laptop,
  Umbrella,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";
import { getCareers } from "@/lib/data-fetcher";

export const metadata = constructMetadata({
  title: "Careers",
  description:
    "Join KrissDevHub Technologies. We're building AI-native software for the next generation and looking for exceptional people to do it with.",
  canonical: "https://krissdevhub.com/careers",
});

const perks = [
  { icon: Globe, title: "Fully remote", desc: "Work from anywhere in the world." },
  { icon: Clock3, title: "Async-first", desc: "No pointless meetings. Deep work is sacred." },
  { icon: BookOpen, title: "Learning budget", desc: "$1,500/year for courses, conferences, and books." },
  { icon: Laptop, title: "Top-tier equipment", desc: "MacBook Pro and peripherals of your choice." },
  { icon: Umbrella, title: "Unlimited PTO", desc: "We trust you to take the time you need." },
  { icon: TrendingUp, title: "High impact", desc: "Small team, big problems, huge ownership." },
];

export default async function CareersPage() {
  const openRoles = await getCareers();
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 -right-40 opacity-25" color="indigo" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 block">
              Join us
            </span>
          </ScrollReveal>
          <TextReveal
            text="Build the future of software"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6"
            as="h1"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-xl text-white/50 max-w-2xl leading-relaxed">
              We&apos;re a small, high-craft engineering team. We hire slowly, work deeply, and care
              enormously about the quality of what we ship.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-20">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <ScrollReveal key={perk.title} delay={i * 0.06}>
                  <div className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] flex flex-col items-start">
                    <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 text-white/60">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">{perk.title}</h3>
                    <p className="text-xs text-white/40">{perk.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Culture Section */}
          <div className="mb-24">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Culture
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk mb-10">How we work</h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Deep Focus Over Meetings", desc: "We protect developer time. We have zero daily stands, no status calls, and run our sprint scoping asynchronously." },
                { title: "Craft Over Speed", desc: "We prioritize clean structures, strict TypeScript interfaces, and SQL policies. We write code we are proud to transfer." },
                { title: "Extreme Ownership", desc: "Engineers own their code from strategy to deployment. You work in direct contact with clients and ship features weekly." }
              ].map((c, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-[#121212]/50 border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                    <h3 className="text-sm font-bold text-white font-space-grotesk mb-2">{c.title}</h3>
                    <p className="text-xs text-white/45 leading-relaxed font-light">{c.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Hiring Process */}
          <div className="mb-24">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Process
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk mb-10">Hiring Process</h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4 relative">
              {[
                { step: "01", name: "Form Screening", desc: "We review your GitHub, portfolio, and past project structures." },
                { step: "02", name: "Intro Chat", desc: "A 15-minute video call to align on goals and role expectations." },
                { step: "03", name: "Technical sync", desc: "A deep dive into system design patterns you have implemented." },
                { step: "04", name: "Paid project trial", desc: "A 1-week paid contract sprint building a custom feature." },
                { step: "05", name: "Final Offer", desc: "IP sign-off and permanent onboarding." }
              ].map((p, i) => (
                <ScrollReveal key={i} delay={i * 0.06}>
                  <div className="p-5 rounded-2xl bg-[#111111] border border-white/[0.06] flex flex-col justify-between h-full relative">
                    <span className="text-xl font-bold font-mono text-white/20 mb-3 block">{p.step}</span>
                    <div>
                      <h4 className="text-xs font-bold text-white font-space-grotesk mb-1">{p.name}</h4>
                      <p className="text-[10px] text-white/40 leading-relaxed font-light">{p.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Open roles */}
          <div className="max-w-3xl">
            <TextReveal
              text="Open positions"
              className="text-3xl font-bold text-white mb-8"
              as="h2"
            />

            <div className="space-y-3">
              {openRoles.map((role, i) => (
                <ScrollReveal key={role.slug} delay={i * 0.07}>
                  <Link
                    href={`/careers/${role.slug}`}
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-200 group"
                  >
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors mb-1">
                        {role.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-white/30">
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3" /> {role.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {role.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {role.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:flex gap-1.5">
                        {role.tags.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06] font-mono">
                            {t}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.3}>
              <p className="mt-8 text-sm text-white/30">
                Don&apos;t see your role?{" "}
                <a href="mailto:careers@krissdevhub.com" className="text-white hover:text-white/80 transition-colors underline underline-offset-4">
                  Send us your CV anyway
                </a>{" "}
                — we&apos;re always open to exceptional people.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
