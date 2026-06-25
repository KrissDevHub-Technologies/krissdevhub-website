import { siteConfig } from "@/lib/constants";
import type { Metadata } from "next";

export function constructMetadata({
  title,
  description,
  image = siteConfig.ogImage,
  noIndex = false,
  canonical,
}: {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  canonical?: string;
} = {}): Metadata {
  return {
    title: title ? `${title} — ${siteConfig.shortName}` : `${siteConfig.name} | ${siteConfig.tagline}`,
    description: description || siteConfig.description,
    keywords: [
      "AI development",
      "SaaS development",
      "custom software",
      "LLM integration",
      "RAG systems",
      "AI agents",
      "Next.js",
      "TypeScript",
      "software company",
      "KrissDevHub",
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonical || siteConfig.url,
      title: title ? `${title} — ${siteConfig.shortName}` : siteConfig.name,
      description: description || siteConfig.description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} — ${siteConfig.shortName}` : siteConfig.name,
      description: description || siteConfig.description,
      images: [image],
      creator: "@krissdevhub",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: canonical ? { canonical } : undefined,
  };
}
