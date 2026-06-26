import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire AI Researchers",
  description:
    "Accelerate your machine learning research. Hire experienced research associates to assist in model evaluation, training scripts, and paper replication.",
  canonical: "https://krissdevhub.dev/services/ai-research",
});

const problem = {
  title: "AI Research teams spend too much time on data preparation",
  description:
    "Highly paid machine learning scientists and researchers spend up to 70% of their working hours cleaning raw datasets, running repetitive evaluation loops, and compiling literature summaries, slowing down core modeling breakthroughs.",
  items: [
    "Slow deployment of evaluation scripts on new candidate checkpoints.",
    "Manual cleaning and deduplication of large corpus files wasting CPU/GPU time.",
    "Research bottlenecks where engineers cannot keep up with the volume of academic papers.",
  ],
};

const solution = {
  title: "Dedicated AI Research support and pipeline engineering",
  description:
    "We provide expert AI Research Associates who support your modeling goals. Our associates pre-process training data, run benchmarking suites, manage model checkpoints, and help write technical documentation, freeing up your core scientists.",
  items: [
    "Pre-processing and tokenization of training text corpus at scale.",
    "Automated and manual benchmarking runs with thorough tracking logs.",
    "Literature reviews and academic paper replication support.",
  ],
};

const benefits = [
  {
    title: "Clean Data Pipelines",
    description:
      "Automated extraction, OCR, de-duplication, and safety filtering of datasets prior to model pre-training.",
    icon: "database",
  },
  {
    title: "Rigorous Benchmarking",
    description:
      "Deploy custom evaluation suites to test accuracy, bias, and performance drop-offs on experimental weights.",
    icon: "activity",
  },
  {
    title: "Accelerated Discovery",
    description:
      "Free up senior researchers to focus on model architecture while our associates manage infrastructure tasks.",
    icon: "sparkles",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Objective Matching",
    description:
      "We identify your research constraints, codebase layout, infrastructure targets, and dataset challenges.",
  },
  {
    number: "02",
    title: "Associate Assignment",
    description:
      "We match your research team with technical associates skilled in Python, PyTorch, Hugging Face, and data engineering.",
  },
  {
    number: "03",
    title: "Pipeline Integration",
    description:
      "Our associates integrate into your research environment, setting up data prep scripts and managing experiment trackers.",
  },
  {
    number: "04",
    title: "Reliable Support",
    description:
      "We deliver consistent data operations, benchmark records, and research documentation on an ongoing basis.",
  },
];

const faqs = [
  {
    q: "What technical skills do your Research Associates have?",
    a: "Our research associates hold degrees in quantitative fields and are proficient in Python, PyTorch, Pandas, Hugging Face Libraries, data cleaning pipelines, and version control.",
  },
  {
    q: "How do you handle dataset privacy?",
    a: "We deploy all data cleaning and model evaluation scripts inside your own secure VPC or cloud environment. We never copy or store your proprietary training data.",
  },
  {
    q: "Can they assist in model pre-training tasks?",
    a: "Yes. They help write data loaders, configure tokenize scripts, manage weights checkpoints, and monitor training runs on platforms like WandB or TensorBoard.",
  },
];

export default function AiResearchPage() {
  return (
    <ServicePageTemplate
      title="Hire AI Researchers"
      tagline="AI Workforce Solutions"
      heroDescription="Deploy skilled support to your machine learning research teams. Accelerate data preparation, model benchmarking, and paper replication."
      icon="bookopen"
      blobColor="mixed"
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
