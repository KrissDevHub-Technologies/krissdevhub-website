import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Custom Software",
  description:
    "We design and build bespoke software applications modeled specifically around your organization's unique logic, database structures, and daily workflows.",
  canonical: "https://krissdevhub.com/services/custom-software",
});

const problem = {
  title: "Adapting your business to rigid off-the-shelf templates",
  description:
    "Generic SaaS software forces you to change how your company operates. Teams end up using fragmented workarounds, spreadsheets, and manual emails to patch holes in rigid products, leading to administrative overhead and operational inefficiency.",
  items: [
    "Rigid interfaces that cannot be adapted to your unique organization processes.",
    "High monthly subscription fees for features you do not need or use.",
    "Inability to integrate with existing proprietary databases or legacy systems.",
  ],
};

const solution = {
  title: "Bespoke software built for your operational model",
  description:
    "We design and build custom software architectures tailored directly to your team's workflows. You get complete control of the layout, full codebase ownership, and unlimited customizability to adapt as your business needs scale.",
  items: [
    "Modular codebases designed to grow and pivot alongside your organizational changes.",
    "Clean, typographic UI layouts optimized for maximum speed and daily ease-of-use.",
    "Direct database access allowing you to perform custom analytics queries and syncs.",
  ],
};

const benefits = [
  {
    title: "100% Tailored Logic",
    description:
      "Every database schema, workflow process, and layout view is modeled exactly around your business structure.",
    icon: "code2",
  },
  {
    title: "Full Code Ownership",
    description:
      "No recurring licensing fees. The complete source code, IP, and hosting configurations are transferred to you.",
    icon: "key",
  },
  {
    title: "Infinite Scalability",
    description:
      "Easily add custom dashboards, connect external APIs, and build new user modules without software constraints.",
    icon: "sparkles",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Domain Scoping & Modeling",
    description:
      "We inspect your current workflows, outline key system entities, and design the relational database schema.",
  },
  {
    number: "02",
    title: "UI Design & Architecture",
    description:
      "We design typographic mockups and structure secure cloud pathways to support high-performance operations.",
  },
  {
    number: "03",
    title: "Iterative Development",
    description:
      "We write clean TypeScript code in weekly sprint intervals, delivering working features for your feedback.",
  },
  {
    number: "04",
    title: "Deploy & Support",
    description:
      "We run automated validation tests, deploy to your cloud hosting, and offer monthly retainers for ongoing improvements.",
  },
];

const faqs = [
  {
    q: "What tech stack do you use for custom software?",
    a: "We default to Next.js, React, and TypeScript for frontends, paired with PostgreSQL (Supabase) or Node.js for backend servers. This provides excellent rendering speed, robust type safety, and is highly supported by modern developers.",
  },
  {
    q: "Will we own the intellectual property?",
    a: "Yes. Once the project invoice is cleared, all intellectual property, design templates, and source code belong 100% to you. We transfer everything to your GitHub organization.",
  },
  {
    q: "Can you modernize old legacy software?",
    a: "Yes. We specialize in legacy modernization, replacing slow, outdated desktop or web software with modern, fast web applications while safely migrating your existing database records.",
  },
];

export default function CustomSoftwarePage() {
  return (
    <ServicePageTemplate
      title="Custom Software"
      tagline="Bespoke Engineering"
      heroDescription="Design and engineer tailored software applications modeled directly around your business processes."
      icon="code2"
      blobColor="mixed"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Build custom software"
    />
  );
}
