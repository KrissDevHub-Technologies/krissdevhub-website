import { getProjects } from "@/lib/data-fetcher";
import { constructMetadata } from "@/lib/metadata";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { CtaSection } from "@/features/home/cta-section";
import { PortfolioGrid } from "./portfolio-grid";

export const metadata = constructMetadata({
  title: "Portfolio",
  description:
    "Explore KrissDevHub's custom software engineering portfolio. View our featured AI platforms, SaaS applications, custom solutions, and enterprise integrations.",
  canonical: "https://krissdevhub.com/portfolio",
});

export default async function PortfolioPage() {
  const projects = await getProjects();
  
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 left-1/2 -translate-x-1/2 opacity-30" color="mixed" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-10 text-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
              Portfolio
            </span>
          </ScrollReveal>
          <TextReveal
            text="Selected Engineering Work"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-space-grotesk"
            as="h1"
          />
          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
              Explore how we design, build, and deploy production-grade software applications for enterprise clients and startups globally.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Grid with client-side category filters */}
      <section className="py-8 pb-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <PortfolioGrid initialProjects={projects} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
