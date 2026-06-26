import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "MVP Development",
  description:
    "Launch your product vision in 4-8 weeks with a high-craft, production-ready Minimum Viable Product built to validate demand and attract investment.",
  canonical: "https://krissdevhub.dev/services/mvp-development",
});

const problem = {
  title: "Spending too much time and money before validation",
  description:
    "Many startups spend their entire funding runway and 6 to 12 months building features users don't actually want, based on untested assumptions. Delaying your launch allows competitors to capture the market and burns your capital on over-engineered systems.",
  items: [
    "Over-engineering systems for scaling before securing a single active client.",
    "Scope creep that continuously pushes back launch dates by months, stalling momentum.",
    "Developing fragile prototypes that must be completely thrown away and rewritten later.",
  ],
};

const solution = {
  title: "A lean, production-grade MVP shipped in weeks",
  description:
    "We build highly focused, premium MVPs that solve your target user's primary pain point. By using our established Next.js and Supabase design systems, we launch real working software in 4 to 8 weeks on a solid foundation that can scale without rewrites.",
  items: [
    "Strict scope prioritization to identify the single most critical user journey.",
    "High-speed coding cycles utilizing pre-configured auth, database, and billing engines.",
    "Clean, premium UI interfaces built to look like VC-backed products from day one.",
  ],
};

const benefits = [
  {
    title: "Launch in 4-8 Weeks",
    description:
      "Get real software in front of users and investors to gather authentic feedback and validate product-market fit.",
    icon: "hourglass",
  },
  {
    title: "Production Foundation",
    description:
      "Built with type-safe TypeScript, clean Next.js architecture, and Supabase database schemas you can expand forever.",
    icon: "shieldcheck",
  },
  {
    title: "Capital Efficiency",
    description:
      "Focus your resources exclusively on the core hook of your platform, avoiding waste on secondary details.",
    icon: "zap",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Scope Prioritization",
    description:
      "We strip out non-essential elements to outline the leanest possible version that still delivers your core value.",
  },
  {
    number: "02",
    title: "UI Mapping & DB Schema",
    description:
      "We design typography-centric layout wireframes and configure clean Postgres table relations.",
  },
  {
    number: "03",
    title: "High-Speed Coding",
    description:
      "We implement the primary application logic, connect payment flows (Stripe), and build member dashboards.",
  },
  {
    number: "04",
    title: "Launch & Analytics",
    description:
      "We deploy to Vercel, integrate analytics tracking tools, and launch your product to early beta users.",
  },
];

const faqs = [
  {
    q: "Will we need to rebuild the MVP once we grow?",
    a: "No. Unlike other agencies that write throw-away code, we build MVPs using the exact same robust standards, Clean Architecture guidelines, and TypeScript type-safety rules we use for enterprise systems. When you are ready to expand, you build directly on top of this codebase.",
  },
  {
    q: "How do you help us stay focused on MVP scope?",
    a: "We run scoping exercises to separate features into Must-Haves, Nice-to-Haves, and Future Sprints. We advise you to defer complex settings panels, dark mode, or secondary integrations to post-launch updates so we can ship the core value quickly.",
  },
  {
    q: "Is the MVP ready for investor presentations?",
    a: "Absolutely. Our MVPs look and feel like premium tools developed by top-tier tech companies. They are fully interactive, handle live authentication, and process actual payments, making them perfect for VC pitches.",
  },
];

export default function MvpDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="MVP Development"
      tagline="Startups & Validation"
      heroDescription="Ship your product hook in 4-8 weeks with a premium, high-craft codebase that validates market demand."
      icon="sparkles"
      blobColor="mixed"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Ship your MVP product"
    />
  );
}
