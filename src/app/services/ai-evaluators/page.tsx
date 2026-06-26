import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire AI Evaluators",
  description:
    "Evaluate, stress-test, and benchmark your machine learning systems. Our expert evaluation teams run red-teaming campaigns and quantitative safety audits.",
  canonical: "https://krissdevhub.dev/services/ai-evaluators",
});

const problem = {
  title: "Models that pass automated benchmarks fail in real usage",
  description:
    "Relying solely on standard academic datasets (like MMLU or GSM8K) doesn't guarantee your app will run safely. Models face complex user edge cases, bias escapes, prompt injection attempts, and drift that standard validation scripts cannot detect.",
  items: [
    "Unnoticed drift in model alignment following minor updates or weight shifts.",
    "System vulnerabilities exposed by malicious user prompts (prompt injection).",
    "Qualitative criteria like tone, style, and brand voice that code-only tests can't evaluate.",
  ],
};

const solution = {
  title: "Comprehensive human benchmarking and red-teaming",
  description:
    "We provide expert AI Evaluators to systematically audit LLM responses, grade quality metrics, and run adversarial red-teaming campaigns. Our teams check compliance against style guides, detect factual drift, and identify safety flaws before deployment.",
  items: [
    "Adversarial red-teaming to uncover vulnerabilities, toxicity, and hallucinations.",
    "Bespoke validation rubrics designed specifically for your product's requirements.",
    "Rigorous double-blind human grading with high inter-annotator agreement metrics.",
  ],
};

const benefits = [
  {
    title: "Adversarial Stress Testing",
    description:
      "Our evaluators simulate creative hacking and edge cases to find security escapes and jailbreaks in your system.",
    icon: "shieldalert",
  },
  {
    title: "Custom Scoring Rubrics",
    description:
      "We design evaluation frameworks tailored to your brand, ensuring alignment with tone of voice and technical constraints.",
    icon: "shieldcheck",
  },
  {
    title: "Factual Drift Analysis",
    description:
      "Run routine regression testing to guarantee model quality doesn't decay after pipeline updates.",
    icon: "activity",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Threat Modeling & Goals",
    description:
      "We outline evaluation boundaries, identify target hazards, and specify safety/alignment goals for the model auditing.",
  },
  {
    number: "02",
    title: "Rubric Construction",
    description:
      "We build quantitative and qualitative scoring criteria mapping to your product's safety standards and user expectations.",
  },
  {
    number: "03",
    title: "Auditing & Stress Testing",
    description:
      "Our team executes manual evaluations, red-teaming attacks, and detailed multi-turn conversations with the target system.",
  },
  {
    number: "04",
    title: "Vulnerability Report",
    description:
      "We deliver a detailed vulnerability audit outlining alignment escapes, regression data, and prompt improvement suggestions.",
  },
];

const faqs = [
  {
    q: "What is red-teaming and why is it needed?",
    a: "Red-teaming is adversarial testing where our experts act as malicious actors trying to bypass model safety filters, extract system prompts, or trigger toxic outputs. It is critical for enterprise security.",
  },
  {
    q: "How do you ensure consistent scoring between evaluators?",
    a: "We measure Inter-Annotator Agreement (IAA) using statistical metrics like Fleiss' Kappa. If agreement drops, we run calibration workshops and update guidelines to eliminate subjective ambiguity.",
  },
  {
    q: "Can you run continuous evaluations?",
    a: "Yes. We offer recurring monitoring where our evaluators run daily or weekly audits on production endpoints to track factual decay, latency spikes, and user-facing regressions.",
  },
];

export default function AiEvaluatorsPage() {
  return (
    <ServicePageTemplate
      title="Hire AI Evaluators"
      tagline="AI Workforce Solutions"
      heroDescription="Stress-test, benchmark, and secure your systems with professional human evaluations. Identify security leaks, hallucinations, and alignment drift."
      icon="shieldcheck"
      blobColor="indigo"
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
