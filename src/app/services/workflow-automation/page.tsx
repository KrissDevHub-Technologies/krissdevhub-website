import { ServicePageTemplate } from "@/features/services/service-page-template";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Workflow Automation",
  description:
    "Eliminate manual data syncing, automate repetitive steps, and run event-driven background queues securely within your cloud infrastructure.",
  canonical: "https://krissdevhub.dev/services/workflow-automation",
});

const problem = {
  title: "Hours of manual labor lost to data syncing and errors",
  description:
    "As operations grow, team members spend valuable time copy-pasting data between CRMs, billing systems, spreadsheets, and internal databases. Brittle, no-code integrations like Zapier often break without warnings, leaving you with missing orders or incorrect records.",
  items: [
    "Fragmented business data scattered across separate tools without a single source of truth.",
    "Manual onboarding or report generation bottlenecks that delay delivery to clients.",
    "No-code sync integrations that fail silently, requiring manual reconciliations.",
  ],
};

const solution = {
  title: "Handcrafted, code-level automation networks",
  description:
    "We build custom, event-driven background workers and webhook architectures that run securely on your serverless cloud. With built-in retry mechanisms, transaction logging, and Slack/Discord alerts, your operations flow seamlessly without human intervention.",
  items: [
    "Resilient background queues (Redis/BullMQ) that handle millions of events without timing out.",
    "Custom endpoints connecting legacy software and modern APIs with complex logic loops.",
    "Unified dashboard interfaces to inspect workflow statuses, run logs, and click retries.",
  ],
};

const benefits = [
  {
    title: "15+ Hours Saved Weekly",
    description:
      "Delegate document classification, customer messaging, database syncing, and reports to background scripts.",
    icon: "zap",
  },
  {
    title: "Zero Sync Errors",
    description:
      "Achieve 100% data consistency across CRM, Slack, billing dashboards, and main database tables automatically.",
    icon: "rotateccw",
  },
  {
    title: "Resilient Queues",
    description:
      "If a partner service goes offline, our workers queue failed jobs and retry with exponential backoff until successful.",
    icon: "database",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Process Mapping & Audit",
    description:
      "We audit your team's day-to-day workflow, identify tasks fit for automation, and design the data flow architecture.",
  },
  {
    number: "02",
    title: "API & Authentication Setup",
    description:
      "We securely connect target software APIs using OAuth credentials, tokens, or custom webhook hooks.",
  },
  {
    number: "03",
    title: "Worker Construction",
    description:
      "We write serverless trigger handlers, data parsers, retry queues, and log records integrations.",
  },
  {
    number: "04",
    title: "Observability Alerts",
    description:
      "We configure error logging, connect Slack notifications for sync failures, and deploy to serverless hosting.",
  },
];

const faqs = [
  {
    q: "Why choose custom code automations over Zapier or Make?",
    a: "Zapier and Make are easy to start with, but they quickly become expensive as transaction volumes grow, charging per run step. Custom code automations run in your own cloud, have no per-run markup costs, offer infinite retry customizability, and keep sensitive company data securely within your database borders.",
  },
  {
    q: "How do you handle API down-times from external tools?",
    a: "We structure automations using robust message queues like Redis or BullMQ. If an external service goes offline or rate-limits our call, our worker holds the task in queue, waits, and retries automatically without losing data or halting other workflows.",
  },
  {
    q: "Can you automate legacy systems that don't have an API?",
    a: "Yes. We can construct automated file-drop scripts (via SFTP/S3) or design head-less browser scrapers using Playwright to extract data, download reports, or enter records securely.",
  },
];

export default function WorkflowAutomationPage() {
  return (
    <ServicePageTemplate
      title="Workflow Automation"
      tagline="Automation & Integration"
      heroDescription="Connect your applications, automate manual workflows, and build background execution queues with absolute code reliability."
      icon="zap"
      blobColor="indigo"
      problem={problem}
      solution={solution}
      benefits={benefits}
      process={processSteps}
      faqs={faqs}
      ctaText="Automate your workflow"
    />
  );
}
