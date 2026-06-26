import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire AI Trainers",
  description:
    "Scale your LLM training and alignment with elite human trainers. We write gold-standard datasets, instruct conversational models, and refine response logic.",
  canonical: "https://krissdevhub.dev/services/ai-trainers",
});

const problem = {
  title: "AI models trained on raw internet data learn bad habits",
  description:
    "Scraping the public web provides models with scale, but results in hallucinated facts, toxic biases, and logical inconsistencies. To excel at specific business tasks, models require supervised instruction data built by trained experts who understand factual accuracy.",
  items: [
    "Unstructured data pipelines that inject duplicate, low-value information.",
    "Conversational models failing to follow complex multi-step user guidelines.",
    "Lack of domain-specific validation leading to incorrect professional advice.",
  ],
};

const solution = {
  title: "High-density instruction datasets written by professionals",
  description:
    "We supply specialized cohorts of AI Trainers who author high-quality prompt-response pairs, draft instructions, and correct model reasoning. Our trainers undergo rigorous domain testing to guarantee that your training datasets are accurate, diverse, and representative.",
  items: [
    "Expert-written gold-standard responses for Supervised Fine-Tuning (SFT).",
    "Rigorous screening matching trainers to complex domains like finance, law, and medicine.",
    "Verified data ownership with secure ingestion processes.",
  ],
};

const benefits = [
  {
    title: "Domain Experts Only",
    description:
      "All trainers are vetted professionals in fields like linguistics, technical writing, and science, ensuring high-quality reasoning.",
    icon: "brain",
  },
  {
    title: "SFT Fine-Tuning Scale",
    description:
      "Generate thousands of diverse prompt-response pairs matching exact system prompts, syntax structures, and templates.",
    icon: "database",
  },
  {
    title: "Secure Ingestion",
    description:
      "Work is conducted inside isolated virtual environments matching enterprise security, compliance, and NDA controls.",
    icon: "shield",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Requirement Scoping",
    description:
      "We define the target taxonomy, system instructions, dataset format, and domain expertise required for your AI project.",
  },
  {
    number: "02",
    title: "Cohort Matching",
    description:
      "We source and align dedicated specialists from our talent pool, verifying their background against your specific domain.",
  },
  {
    number: "03",
    title: "Guideline Calibration",
    description:
      "We run brief pilot runs to align the annotation team on edge cases, grading standards, and specific writing guidelines.",
  },
  {
    number: "04",
    title: "Continuous Delivery",
    description:
      "Our team delivers validated datasets in your format (JSONL, Parquet) with comprehensive quality check audits.",
  },
];

const faqs = [
  {
    q: "How do you screen your AI Trainers?",
    a: "Every candidate undergoes strict logic tests, writing checks, and background verification. Those working on technical domains (like law or medicine) hold advanced degrees or certifications in their respective fields.",
  },
  {
    q: "What datasets formats do you support?",
    a: "We support standard Hugging Face dataset schemas, JSONLines (JSONL), CSV, Parquet, and direct database replication. We can customize the structural layout to match your training script specifications.",
  },
  {
    q: "Do you sign NDAs and intellectual property agreements?",
    a: "Yes. All training data generated is 100% owned by you. Our workforce operates under strict corporate NDAs, and we do not reuse your data or prompts to train external models.",
  },
];

export default function AiTrainersPage() {
  return (
    <ServicePageTemplate
      title="Hire Elite AI Trainers"
      tagline="AI Workforce Solutions"
      heroDescription="Train your models with clean, human-authored instruction datasets. Scale your Supervised Fine-Tuning pipelines with verified domain specialists."
      icon="brain"
      blobColor="purple"
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
