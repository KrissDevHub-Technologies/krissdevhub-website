import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Hire AI Coding Specialists",
  description:
    "Train code generation and programming LLMs. Hire expert developers to write verified code scripts, unit tests, and software explanations.",
  canonical: "https://krissdevhub.dev/services/ai-coding",
});

const problem = {
  title: "AI code assistants struggle with logic, security, and packages",
  description:
    "Standard code LLMs are trained on public git repositories, which are filled with deprecated syntax, security leaks, and incorrect algorithms. Models trained on noise write code that looks correct but fails to compile, introducing vulnerabilities into client programs.",
  items: [
    "AI models recommending insecure code functions or obsolete software APIs.",
    "Incorrect algorithm logic that fails boundary conditions or edge tests.",
    "Lack of clear step-by-step documentation explaining coding logic.",
  ],
};

const solution = {
  title: "Clean programming datasets authored by software engineers",
  description:
    "We provide experienced Software Developers who train code generation engines. Our developers write clean, verified code, author comprehensive test suites, write step-by-step logic explanations, and audit AI completions for security risks.",
  items: [
    "Verified code-solution pairs across Python, TypeScript, Rust, Go, and C++.",
    "Detailed chain-of-thought documentation explaining programmatic reasoning.",
    "Strict parsing validation running solutions through compilers and tests.",
  ],
};

const benefits = [
  {
    title: "100% Compiling Solutions",
    description:
      "All codebase data written by our coding trainers is verified through automated test suites and compiler checks.",
    icon: "shieldcheck",
  },
  {
    title: "Multi-Language Capability",
    description:
      "Our team covers a broad spectrum of languages, including Python, JS/TS, Rust, Go, C++, SQL, and Shell scripting.",
    icon: "code2",
  },
  {
    title: "Security Centric",
    description:
      "Our engineers audit training datasets for OWASP vulnerabilities, API leaks, and bad programming practices.",
    icon: "shield",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Requirement Mapping",
    description:
      "We define target programming languages, library frameworks, algorithmic complexity, and formats.",
  },
  {
    number: "02",
    title: "Developer Selection",
    description:
      "We assign software engineers with deep experience in your target tech stacks and systems.",
  },
  {
    number: "03",
    title: "Coding & Test Design",
    description:
      "Our developers write high-quality code, formulate edge cases, and design unit tests.",
  },
  {
    number: "04",
    title: "Compilation Verification",
    description:
      "We compile and run tests on all code solutions, delivering verified datasets ready for model ingestion.",
  },
];

const faqs = [
  {
    q: "How do you verify the code written by coding trainers?",
    a: "We implement an automated sandbox pipeline. Every code solution must pass syntax checks, compilation, and a full suite of unit tests before it is added to the delivery dataset.",
  },
  {
    q: "Can you train models on proprietary frameworks?",
    a: "Yes. Our developers can study your internal APIs, SDKs, or tools and author high-quality training examples to teach models how to build applications on your stack.",
  },
  {
    q: "What types of coding tasks do you support?",
    a: "We support algorithm writing, API design, debugging tasks, refactoring, SQL optimization, code translation, and unit test generation.",
  },
];

export default function AiCodingPage() {
  return (
    <ServicePageTemplate
      title="Hire AI Coding Specialists"
      tagline="AI Workforce Solutions"
      heroDescription="Train programming models with verified code datasets. Deploy software developers to author compiler-clean examples and code explanations."
      icon="code2"
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
