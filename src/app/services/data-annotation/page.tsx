import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire AI Data Annotators",
  description:
    "Scale your training data pipelines. Hire professional data annotators to label text, images, video, and audio assets with extreme precision.",
  canonical: "https://krissdevhub.dev/services/data-annotation",
});

const problem = {
  title: "Low-quality labels destroy machine learning performance",
  description:
    "Automated labeling tools are fast but inaccurate, and cheap crowdsourced labeling services lack consistency and context. Bad labels create noise in your training datasets, degrading model accuracy and driving up engineering costs.",
  items: [
    "Crowdsourced labeling with high error rates and lack of policy adherence.",
    "Inconsistent bounding boxes or text spans causing model training failure.",
    "Lack of domain understanding leading to mislabeled metadata records.",
  ],
};

const solution = {
  title: "High-precision manual annotation by dedicated teams",
  description:
    "We provide dedicated AI Data Annotators who label text, images, video, and audio assets. Our teams use professional annotation platforms and adhere to custom taxonomy guidelines, delivering clean datasets with high quality control.",
  items: [
    "Text annotation (entity recognition, sentiment tracking, intent mapping).",
    "Computer vision labeling (bounding boxes, polygons, image classification).",
    "Rigorous QA reviews and high-agreement validation runs.",
  ],
};

const benefits = [
  {
    title: "Extreme Accuracy",
    description:
      "All labeled assets pass multiple QA reviews, maintaining dataset quality above 99% accuracy.",
    icon: "shieldcheck",
  },
  {
    title: "Secure Labeling Environment",
    description:
      "Operational security compliance, keeping your private assets isolated inside secure workspaces.",
    icon: "shield",
  },
  {
    title: "Flexible Scaling",
    description:
      "Scale the size of your annotation team up or down based on current dataset volumes and timelines.",
    icon: "layers",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Guideline Design",
    description:
      "We design annotation rubrics, set labeling taxonomies, and build verification benchmarks.",
  },
  {
    number: "02",
    title: "Tool Integration",
    description:
      "We connect with your chosen annotation platform (Labelbox, CVAT, or custom internal interfaces).",
  },
  {
    number: "03",
    title: "Labeling & QA",
    description:
      "Our team labels assets, while QA leads perform spot checks and statistical validation.",
  },
  {
    number: "04",
    title: "Dataset Export",
    description:
      "We deliver high-fidelity datasets in your preferred formats, ready for immediate training runs.",
  },
];

const faqs = [
  {
    q: "What labeling platforms do you support?",
    a: "We work with all major annotation tools, including Labelbox, CVAT, Label Studio, Roboflow, and custom proprietary clients. We can adapt to your internal tooling workflows.",
  },
  {
    q: "How do you check label quality?",
    a: "We implement consensus routing where multiple annotators grade the same asset. We calculate agreement statistics and have senior leads resolve discrepancies.",
  },
  {
    q: "Can you handle complex technical domains?",
    a: "Yes. For medical imaging, legal documents, or financial statements, we source annotators with relevant professional credentials to ensure tag accuracy.",
  },
];

export default function DataAnnotationPage() {
  return (
    <ServicePageTemplate
      title="Hire AI Data Annotators"
      tagline="AI Workforce Solutions"
      heroDescription="Label your data with human precision. Scale your text, image, and video annotation pipelines with verified operational quality."
      icon="database"
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
