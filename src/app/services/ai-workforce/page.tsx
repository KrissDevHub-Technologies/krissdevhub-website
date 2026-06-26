import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "AI Workforce Solutions",
  description:
    "Scale your machine learning project with professional human loops. Hire specialized cohorts for annotation, alignment, training, and red-teaming.",
  canonical: "https://krissdevhub.dev/services/ai-workforce",
});

const problem = {
  title: "Building an internal data operations team is slow and expensive",
  description:
    "Assembling a custom workforce to tag datasets, evaluate prompts, and alignment-train models requires constant HR resources, recruiting overhead, and project management. Scaling these operations up or down quickly is nearly impossible.",
  items: [
    "HR overhead and administrative stress of managing hundreds of individual contractors.",
    "Data quality drop-offs when scaling annotation volume without rigorous QA roles.",
    "Security concerns when handling sensitive corporate information or private keys.",
  ],
};

const solution = {
  title: "On-demand, managed AI workforce tailored to your goals",
  description:
    "We provide fully managed AI Workforce Solutions, handling recruiting, onboarding, training, QA, and project management. We match specialized cohorts to your target requirements, delivering clean data, evaluated prompts, and secured models.",
  items: [
    "Fully managed operations with dedicated project managers and QA leads.",
    "Rapid scaling of team size to match sprint schedules and data loads.",
    "Enterprise-grade security controls with virtual workspaces and compliance monitoring.",
  ],
};

const benefits = [
  {
    title: "Zero Operational Overhead",
    description:
      "We handle HR, onboarding, payments, and team management, allowing your AI researchers to focus on model training.",
    icon: "layers",
  },
  {
    title: "Vetted Domain Specialists",
    description:
      "Access professional trainers, software engineers, and domain experts matching your specific industry requirements.",
    icon: "brain",
  },
  {
    title: "Consistent Quality Control",
    description:
      "Every deliverable passes through senior reviewers and statistical agreement checks to guarantee high dataset quality.",
    icon: "shieldcheck",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Project Mapping",
    description:
      "We analyze your AI goals, workforce requirements, data formats, security standards, and timelines.",
  },
  {
    number: "02",
    title: "Team Assembly",
    description:
      "We source, screen, and select the target cohort of trainers, annotators, or developers from our network.",
  },
  {
    number: "03",
    title: "Pilot Calibration",
    description:
      "We run brief test annotations to align the team, calibrate guidelines, and verify operational workflow.",
  },
  {
    number: "04",
    title: "Managed Scale",
    description:
      "We scale up operations, delivering verified datasets, prompt audits, and model evaluations on an ongoing basis.",
  },
];

const faqs = [
  {
    q: "How fast can you set up a dedicated workforce team?",
    a: "We can typically deploy a calibrated pilot team of 5 to 15 specialists within 5 to 7 business days, depending on domain complexity.",
  },
  {
    q: "What industries do you support?",
    a: "We support technology SaaS, financial services, healthcare, legal services, e-commerce, and logistics, matching team backgrounds to your sector.",
  },
  {
    q: "How do you protect data security?",
    a: "We enforce strict security measures, including virtual desktop infrastructure, disabled local copy-paste/downloads, background checks, and robust NDAs.",
  },
];

export default function AiWorkforcePage() {
  return (
    <ServicePageTemplate
      title="Managed AI Workforce Solutions"
      tagline="AI Workforce Solutions"
      heroDescription="Deploy highly trained human loops for annotation, prompt engineering, RLHF, and evaluation. Scale your AI initiatives with a fully managed, secured workforce."
      icon="layers"
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
