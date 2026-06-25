import { HeroSection } from "@/features/home/hero-section";
import { LogosSection } from "@/features/home/logos-section";
import { CapabilitiesSection } from "@/features/home/capabilities-section";
import { WhyUsSection } from "@/features/home/why-us-section";
import { ProcessSection } from "@/features/home/process-section";
import { ProjectsSection } from "@/features/home/projects-section";
import { IndustriesSection } from "@/features/home/industries-section";
import { TestimonialsSection } from "@/features/home/testimonials-section";
import { FaqSection } from "@/features/home/faq-section";
import { CtaSection } from "@/features/home/cta-section";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata();

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogosSection />
      <CapabilitiesSection />
      <WhyUsSection />
      <ProcessSection />
      <ProjectsSection />
      <IndustriesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
