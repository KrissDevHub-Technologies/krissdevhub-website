import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "SaaS Development",
  description:
    "We design and build multi-tenant SaaS products with robust database architectures, secure auth, complex billing setups, and lightning-fast frontends.",
  canonical: "https://krissdevhub.com/services/saas-development",
});

const problem = {
  title: "Spending months building boilerplate instead of features",
  description:
    "Most SaaS startups waste their first 8 to 12 weeks of engineering budgets building non-differentiating code. Setting up organization structures, invite flows, Stripe webhook handlers, and database permission limits delays your time-to-market and drains capital.",
  items: [
    "Stripe webhooks falling out of sync with customer accounts, causing billing leaks.",
    "Brittle auth rules that allow tenants to read or edit another tenant's data.",
    "Unscalable database structures that slow down queries as customer counts grow.",
  ],
};

const solution = {
  title: "An enterprise-grade SaaS foundation from day one",
  description:
    "We deploy a robust, modern SaaS architecture using Next.js, Postgres (with Row Level Security), and Stripe. All organization logic, invitation flows, and subscription statuses are pre-configured, letting you focus entirely on your core product value.",
  items: [
    "Row Level Security (RLS) guaranteeing strict boundary lines for tenant data separation.",
    "Secure Stripe Billing sync support for tiers, add-ons, coupons, and seat metrics.",
    "Clean React dashboard components for organization management and member invites.",
  ],
};

const benefits = [
  {
    title: "Flexible Subscriptions",
    description:
      "Configure flat-rate, tiered, usage-based, or seat-based billing with Stripe Customer Portals built right in.",
    icon: "creditcard",
  },
  {
    title: "RLS Multi-Tenancy",
    description:
      "Sleep easily knowing cross-tenant data leaks are mathematically blocked at the Postgres query layer, not just code.",
    icon: "shieldalert",
  },
  {
    title: "High Performance",
    description:
      "Static generation, server component rendering, and smart cache invalidation keep dashboard loads sub-500ms.",
    icon: "zap",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Data Modeling & Scoping",
    description:
      "We design the workspace relationship schemas and formulate PostgreSQL permission rules for absolute isolation.",
  },
  {
    number: "02",
    title: "Auth & Team Workspaces",
    description:
      "We set up secure signups, Magic Links, password resets, and invitation links to invite teammates with role scopes.",
  },
  {
    number: "03",
    title: "Stripe Billing Engine",
    description:
      "We build products in Stripe, configure webhooks to process events, and integrate checkout portals for customers.",
  },
  {
    number: "04",
    title: "Application Buildout & Audit",
    description:
      "We construct your unique SaaS features, conduct penetration testing on database policies, and ship to production.",
  },
];

const faqs = [
  {
    q: "How does Postgres Row Level Security (RLS) protect our data?",
    a: "RLS attaches safety filters directly to SQL tables. When a query is run, Postgres verifies the tenant ID of the requesting user. Even if an engineer writes a select query missing a WHERE clause, the database itself filters out other tenants' data.",
  },
  {
    q: "Can we migrate users to our own database later?",
    a: "Yes. We use standard Supabase PostgreSQL setups, giving you full ownership. You can export your schemas, data, and user hashes at any time with no vendor lock-in.",
  },
  {
    q: "Do you support Stripe Connect for marketplaces?",
    a: "Yes. We have built platforms using Stripe Connect to handle custom payouts, seller onboarding, split payments, and subscription distributions.",
  },
];

export default function SaasDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="SaaS Development"
      tagline="SaaS & Full-Stack"
      heroDescription="Ship custom multi-tenant SaaS platforms with Stripe billing, Supabase auth, and Postgres security policies built-in."
      icon="layers"
      blobColor="purple"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Launch your SaaS platform"
    />
  );
}
