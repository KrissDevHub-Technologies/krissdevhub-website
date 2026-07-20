import { Metadata } from "next";
import { siteConfig } from "@/lib/constants";
import { PartnerLanding } from "@/components/partners/partner-landing";

export const metadata: Metadata = {
  title: `Partner Program | ${siteConfig.name}`,
  description:
    "Join the KrissDevHub global partner ecosystem. Collaborate on AI development, enterprise software projects, cloud solutions, and digital transformation.",
  openGraph: {
    title: `Partner Program | ${siteConfig.name}`,
    description:
      "Join the KrissDevHub global partner ecosystem. Collaborate on AI development, enterprise software projects, cloud solutions, and digital transformation.",
    url: `${siteConfig.url}/partners`,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Partner Program | ${siteConfig.name}`,
    description:
      "Join the KrissDevHub global partner ecosystem. Collaborate on AI development, enterprise software projects, cloud solutions, and digital transformation.",
    images: [siteConfig.ogImage],
  },
};

export default function PartnersPage() {
  return <PartnerLanding />;
}
