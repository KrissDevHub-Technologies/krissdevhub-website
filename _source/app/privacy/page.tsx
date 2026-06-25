import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Privacy Policy",
  canonical: "https://krissdevhub.com/privacy",
});

export default function PrivacyPage() {
  const sections = [
    {
      title: "Information we collect",
      content:
        "We collect information you provide directly to us, such as when you fill out our contact form (name, email, company, and message). We also collect standard analytics data (page views, referrers, browser type) through privacy-respecting analytics tools. We do not sell or share your personal information with third parties for marketing purposes.",
    },
    {
      title: "How we use your information",
      content:
        "We use the information we collect to respond to your inquiries, send you relevant updates if you've subscribed to our newsletter, improve our website, and comply with legal obligations. Contact form submissions are stored securely and used solely to respond to your request.",
    },
    {
      title: "Data storage",
      content:
        "Your data is stored securely using Supabase (PostgreSQL), hosted in the EU. We retain contact form data for 24 months, after which it is deleted. Newsletter subscribers can unsubscribe at any time using the link in every email.",
    },
    {
      title: "Cookies",
      content:
        "We use minimal, functional cookies required for the website to operate. We do not use third-party advertising cookies. If we introduce analytics cookies, they will be opt-in only.",
    },
    {
      title: "Your rights",
      content:
        "You have the right to access, correct, or delete your personal data at any time. To exercise any of these rights, email us at hello@krissdevhub.com and we will respond within 30 days.",
    },
    {
      title: "Contact",
      content:
        "If you have questions about this privacy policy, please contact us at hello@krissdevhub.com. This policy was last updated in June 2025.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-white/50">
            KrissDevHub Technologies is committed to protecting your personal information and being transparent about what we do with it.
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
