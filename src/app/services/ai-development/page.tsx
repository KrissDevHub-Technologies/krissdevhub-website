import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "AI Application Development",
  description:
    "We build production-ready AI agents, Retrieval-Augmented Generation (RAG) systems, and custom LLM integrations that solve business problems with strict guardrails.",
  canonical: "https://krissdevhub.com/services/ai-development",
});

const problem = {
  title: "AI that works in a demo, but fails in production",
  description:
    "Most AI features look magic in a Figma mockup or command-line script, but crumble when exposed to real-world edge cases. Latency spikes, prompt regressions, and runaway token bills often kill AI initiatives before they can deliver return on investment.",
  items: [
    "Unoptimized contexts that run up massive OpenAI, Anthropic, or Gemini API bills.",
    "Hallucinations that break system schemas or surface incorrect calculations to users.",
    "RAG pipelines that retrieve irrelevant document chunks, producing poor quality outputs.",
  ],
};

const solution = {
  title: "AI engineered with verification guardrails",
  description:
    "We don't build toys. We build reliable, self-correcting AI systems that use semantic caching to lower cost, and structured output schemas to prevent failures. Our engineering process treats prompts as code, running evaluations against target test sets.",
  items: [
    "Rigid evaluation pipelines to measure prompt output quality quantitatively.",
    "Semantic query caching reducing recurring API costs by 30% to 50%.",
    "Advanced hybrid-search indexing (pgvector, Pinecone, or Qdrant) for high-precision RAG.",
  ],
};

const benefits = [
  {
    title: "Sub-200ms Caching",
    description:
      "Serve frequent user queries instantly from local vector databases, avoiding the latency of third-party API roundtrips.",
    icon: "zap",
  },
  {
    title: "Cost Management",
    description:
      "Compress prompts, optimize context windows, and dynamically route tasks to cost-efficient open-source or mini models.",
    icon: "cpu",
  },
  {
    title: "Rigid Guardrails",
    description:
      "Wrap completions in strict parser schemas to guarantee that returned responses conform 100% to your database types.",
    icon: "shield",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Feasibility & Cost Estimation",
    description:
      "We analyze your proprietary data sources, identify target models, and calculate expected API costs before writing code.",
  },
  {
    number: "02",
    title: "Prompt Engineering & RAG Design",
    description:
      "We write system prompts, set up secure data parsing pipelines (PDFs, DBs), and configure semantic search vector indexers.",
  },
  {
    number: "03",
    title: "Integration & Caching Setup",
    description:
      "We integrate the AI pathways into your App Router server actions, deploy caching layers, and implement model fallback logic.",
  },
  {
    number: "04",
    title: "Continuous Evaluation",
    description:
      "We run bulk tests to verify prompt performance and latency benchmarks under high concurrent user simulations.",
  },
];

const faqs = [
  {
    q: "How do you prevent AI models from hallucinating?",
    a: "We use structured output formats (like JSON Mode or tool calling) paired with Zod schema verification. Furthermore, we scope the context window strictly to verified documents fetched via Retrieval-Augmented Generation (RAG). If the document doesn't contain the answer, we instruct the model to say so rather than guess.",
  },
  {
    q: "What vector databases do you recommend?",
    a: "For Next.js and Supabase projects, pgvector is our default choice since it allows query joins directly with core business data. For heavy enterprise workloads or multi-tenant setups with millions of vectors, we deploy dedicated clusters on Pinecone or Qdrant.",
  },
  {
    q: "Can you help us fine-tune models?",
    a: "Yes. While RAG solves 90% of data access problems, fine-tuning is useful for teaching a model a specific voice, custom syntax, or formatting. We fine-tune models like Llama 3 or GPT-4o-mini using curated instruction datasets.",
  },
];

export default function AiDevelopmentPage() {
  return (
    <ServicePageTemplate
      title="AI Application Development"
      tagline="AI & Machine Learning"
      heroDescription="Build production-grade AI agents, RAG systems, and semantic tools that integrate safely with your data infrastructure."
      icon="brain"
      blobColor="blue"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Build your AI product"
    />
  );
}
