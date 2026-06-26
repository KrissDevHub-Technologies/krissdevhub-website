import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "API Development",
  description:
    "We design, build, and document secure, high-throughput REST and GraphQL APIs with robust authentication, rate limiting, and Redis caching.",
  canonical: "https://krissdevhub.dev/services/api-development",
});

const problem = {
  title: "Fragile integrations that slow down development cycles",
  description:
    "Poorly structured APIs lead to slow client-side loading times, database bottlenecks, and data leaks. Without strict input validation, rate limiting, and up-to-date documentation, your system is vulnerable to performance degradation and integration pain.",
  items: [
    "Slow database responses that make client-side web or mobile pages laggy.",
    "Lack of request validation, exposing database tables to SQL injections or invalid data entries.",
    "Outdated API documents that force front-end engineers to guess endpoints, wasting hours.",
  ],
};

const solution = {
  title: "High-performance, secure API architectures",
  description:
    "We engineer production-grade API systems using TypeScript (Node.js) or Python (FastAPI). All endpoints are protected by token authentication, cached with Redis, validated with strict Zod/Pydantic schemas, and documented automatically using OpenAPI standards.",
  items: [
    "Sub-100ms response targets utilizing Redis memory caching and query indexing.",
    "Clean token authentication (JWT, OAuth2) with granular read/write permission scopes.",
    "Auto-generated OpenAPI (Swagger) documentation for developer self-onboarding.",
  ],
};

const benefits = [
  {
    title: "Sub-100ms Performance",
    description:
      "Serve high-volume endpoints efficiently using memory caching and optimized relational database queries.",
    icon: "activity",
  },
  {
    title: "Secure Authentication",
    description:
      "Deploy secure API Key authorization with rate-limiting rules to prevent DDoS attacks and spam actions.",
    icon: "key",
  },
  {
    title: "Interactive Docs",
    description:
      "Generate live Swagger playgrounds automatically, letting external developers test endpoints with zero friction.",
    icon: "bookopen",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Endpoint & Schema Scoping",
    description:
      "We design the API routing paths, request payload structures, and choose between REST, GraphQL, or gRPC.",
  },
  {
    number: "02",
    title: "Database Indexing",
    description:
      "We inspect table indices, write optimized queries, and configure connection pools to avoid timeouts.",
  },
  {
    number: "03",
    title: "Route Coding & Rate Limits",
    description:
      "We write type-safe endpoint logic, establish CORS headers, configure JWT auth, and set API rate limits.",
  },
  {
    number: "04",
    title: "Load Testing & Playground",
    description:
      "We simulate concurrent request loads, verify error code behaviors, and deploy the developer documentation portal.",
  },
];

const faqs = [
  {
    q: "Do you build APIs using REST or GraphQL?",
    a: "We support both. We recommend REST for standardized, simple endpoints that require high caching efficiency, and GraphQL for complex dashboard frontends where clients need to request custom properties dynamically.",
  },
  {
    q: "How do you protect APIs from spikes in traffic?",
    a: "We deploy rate-limiting middle-ware using Redis token bucket algorithms. This lets you configure exact request thresholds per IP address or authorization token, blocking spam actors instantly.",
  },
  {
    q: "Can you build integrations with payment providers or ERPs?",
    a: "Yes. We regularly connect custom APIs with third-party software including Stripe, Salesforce, HubSpot, SAP, shipping APIs, and banking systems.",
  },
];

export default function ApiDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="API Development"
      tagline="Integrations & APIs"
      heroDescription="Engineer fast, secure, and fully documented APIs that scale with your application demand."
      icon="gitbranch"
      blobColor="blue"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Build your API network"
    />
  );
}
