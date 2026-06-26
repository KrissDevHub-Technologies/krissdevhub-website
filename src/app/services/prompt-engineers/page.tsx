import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire Prompt Engineers",
  description:
    "Deploy optimized prompt architectures for your SaaS products. Our Prompt Engineers build few-shot libraries, guardrails, and templates to cut token costs.",
  canonical: "https://krissdevhub.dev/services/prompt-engineers",
});

const problem = {
  title: "Inefficient prompts lead to high latency and runaway bills",
  description:
    "Many software systems treat prompts as raw string variables, resulting in wasted tokens, unstructured text returns, and high response latency. Without systematic versioning, editing a prompt to fix one issue often breaks several other downstream functionalities.",
  items: [
    "Over-bloated context windows driving up OpenAI/Anthropic API usage bills.",
    "Conversational models failing to return structured JSON format, breaking system APIs.",
    "Regression problems where fixing a prompt issue causes new failures elsewhere.",
  ],
};

const solution = {
  title: "Prompt architecture engineered as software source code",
  description:
    "We provide experienced Prompt Engineers who design, benchmark, and deploy prompt templates. We implement few-shot dynamic examples, optimize context formatting, and enforce JSON schemas using strict tool-calling configurations, lowering your costs and latency.",
  items: [
    "Systematic template design and few-shot semantic retrieval integration.",
    "Rigorous testing against predefined evaluation test-suites.",
    "Model fallback configurations to route requests based on task complexity.",
  ],
};

const benefits = [
  {
    title: "Token Optimization",
    description:
      "Compress contexts, remove redundant instructions, and write brief directives to slash monthly API bills by 30% to 50%.",
    icon: "cpu",
  },
  {
    title: "Guaranteed JSON Output",
    description:
      "Design schemas that compel models to return structured database-ready data blocks, preventing parser exceptions.",
    icon: "database",
  },
  {
    title: "Versioned Prompt Control",
    description:
      "Manage system prompts with version control, letting your team roll back changes if output quality drops.",
    icon: "gitbranch",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Audit & Benchmarking",
    description:
      "We audit your current prompt templates, check latency profiles, analyze token expenses, and isolate failures.",
  },
  {
    number: "02",
    title: "Few-Shot Engineering",
    description:
      "We construct structured few-shot examples and configure semantic dynamic loading based on input queries.",
  },
  {
    number: "03",
    title: "Schema Verification",
    description:
      "We wrap completions in Zod parsing libraries and configure fallback models for when the primary provider times out.",
  },
  {
    number: "04",
    title: "Performance Hand-Off",
    description:
      "We integrate the optimized system templates into your codebase and set up automated tests to ensure lasting quality.",
  },
];

const faqs = [
  {
    q: "Do you build prompts for specific LLM models?",
    a: "Yes. Prompt behaviors differ significantly between models. We optimize prompts specifically for OpenAI's GPT-4, Anthropic's Claude 3.5, Google's Gemini, and open-source models like Llama 3.",
  },
  {
    q: "How do you control prompt security?",
    a: "We deploy defensive guardrails, input sanitization routines, and validation prompts to detect and neutralize adversarial jailbreak attempts before they reach the main LLM.",
  },
  {
    q: "Can you help optimize context window budgets?",
    a: "Yes. We configure RAG indexing to retrieve only relevant document chunks and implement custom semantic summarizers to keep context size to a minimum.",
  },
];

export default function PromptEngineersPage() {
  return (
    <ServicePageTemplate
      title="Hire Prompt Engineers"
      tagline="AI Workforce Solutions"
      heroDescription="Architect reliable prompts for production workflows. Lower latency, control token budgets, and secure completions against jailbreak inputs."
      icon="sparkles"
      blobColor="blue"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Request AI Workforce"
      ctaHref="/contact"
    />
  );
}
