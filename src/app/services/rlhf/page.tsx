import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire RLHF Specialists",
  description:
    "Align your AI models with human intent. Our RLHF specialists provide comparison and preference data for DPO, KTO, and PPO training pipelines.",
  canonical: "https://krissdevhub.dev/services/rlhf",
});

const problem = {
  title: "Raw base models struggle to follow conversational guidelines",
  description:
    "Pre-trained base models are simple text predictors. Even after supervised fine-tuning, they can behave helpfully but dangerously, output biased statements, or produce verbose, unhelpful essays. To reach consumer-grade safety, models require preference feedback.",
  items: [
    "Models being overly sycophantic, agreeing with incorrect statements just to please users.",
    "Repetitive, robotic output structures that feel artificial and stiff.",
    "Bypassing safety protocols when faced with subtle, multi-turn conversational tricks.",
  ],
};

const solution = {
  title: "High-quality human preference alignment datasets",
  description:
    "We supply trained RLHF (Reinforcement Learning from Human Feedback) Specialists who rank outputs, flag toxic replies, and provide detailed textual feedback. Our data directly feeds your preference learning algorithms, like DPO, KTO, or PPO, ensuring your model aligns with target standards.",
  items: [
    "Comparative preference dataset creation matching custom quality guidelines.",
    "Safety label classification for content moderation and guardrail calibration.",
    "Highly detailed rationales describing why one model generation beats another.",
  ],
};

const benefits = [
  {
    title: "Preference Tuning Scale",
    description:
      "Accelerate training cycles with high-volume preference data formatted for Direct Preference Optimization (DPO).",
    icon: "database",
  },
  {
    title: "Toxicity Minimization",
    description:
      "Train model weights to reject dangerous content generation, hate speech, and security exploits naturally.",
    icon: "shield",
  },
  {
    title: "Optimized Persona Alignment",
    description:
      "Guide LLMs to match custom company writing styles, tone boundaries, formatting preferences, and length restrictions.",
    icon: "sparkles",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Alignment Goal Setup",
    description:
      "We define alignment values, design the grading taxonomy, and set guidelines for safe and helpful model behavior.",
  },
  {
    number: "02",
    title: "Preference Annotation",
    description:
      "Our specialists evaluate pairs of model outputs, select the superior generation, and document the reasoning.",
  },
  {
    number: "03",
    title: "Quality Verification",
    description:
      "We run validation scripts to check for grading consistency and ensure preference choices match the guidelines.",
  },
  {
    number: "04",
    title: "Model Training Ingestion",
    description:
      "We hand over formatted alignment datasets ready to be fed into your training pipelines (DPO/PPO).",
  },
];

const faqs = [
  {
    q: "What training frameworks do your preference datasets support?",
    a: "Our preference datasets are formatted to work seamlessly with PyTorch, Hugging Face Alignment Handbook, and TRL. They support PPO, DPO, IPO, and KTO optimization pipelines.",
  },
  {
    q: "How do you guarantee annotation accuracy?",
    a: "We deploy strict double-pass annotations. A percentage of all completed comparisons is reviewed by QA Leads. We only export data that satisfies our high inter-annotator agreement thresholds.",
  },
  {
    q: "Can you provide domain-specific preference data?",
    a: "Yes. We calibrate teams based on domain requirements. If your model operates in legal or financial services, we use specialists with corresponding professional experience.",
  },
];

export default function RlhfPage() {
  return (
    <ServicePageTemplate
      title="Hire RLHF Specialists"
      tagline="AI Workforce Solutions"
      heroDescription="Align your LLMs with human expectations. Scale your DPO and PPO training runs with high-quality preference and comparison datasets."
      icon="gitbranch"
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
