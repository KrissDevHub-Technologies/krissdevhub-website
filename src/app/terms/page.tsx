import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Terms of Service",
  canonical: "https://krissdevhub.dev/terms",
});

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of terms",
      content:
        "By accessing or using the KrissDevHub Technologies website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, please do not use our services.",
    },
    {
      title: "Services",
      content:
        "KrissDevHub Technologies provides software development, AI integration, SaaS engineering, and related consulting services. The specific scope, timeline, and deliverables for each engagement are defined in a separate Statement of Work (SOW) or project agreement signed by both parties.",
    },
    {
      title: "Intellectual property",
      content:
        "Upon full payment of all invoices, all custom code, designs, and deliverables created specifically for you become your property. We retain the right to use general methodologies, frameworks, and non-client-specific tools developed during the engagement. We may reference your project in our portfolio unless you request otherwise in writing.",
    },
    {
      title: "Confidentiality",
      content:
        "We treat all client information as confidential. We do not share your project details, business logic, or data with third parties without your consent. We are happy to sign a mutual NDA before discussing sensitive projects.",
    },
    {
      title: "Payment terms",
      content:
        "Payment terms are specified in individual project agreements. Generally, we require a deposit before work begins and milestone payments throughout the project. Late payments may incur interest charges as specified in your project agreement.",
    },
    {
      title: "Limitation of liability",
      content:
        "KrissDevHub Technologies shall not be liable for any indirect, incidental, or consequential damages arising from our services. Our total liability shall not exceed the total fees paid by you in the 3 months preceding the claim.",
    },
    {
      title: "Governing law",
      content:
        "These terms are governed by applicable law. Any disputes shall first be attempted to be resolved through good-faith negotiation. These terms were last updated in June 2025.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-white/50">
            Please read these terms carefully before engaging our services or using our website.
          </p>
        </div>
        <div className="space-y-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-lg font-semibold text-white mb-3">{s.title}</h2>
              <p className="text-white/60 leading-relaxed">{s.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
