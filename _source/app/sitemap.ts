import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: siteConfig.url, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/saas-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/custom-software`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/api-integrations`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/automation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/case-studies`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/careers`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteConfig.url}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  return staticPages.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
