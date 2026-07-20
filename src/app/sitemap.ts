import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { getProjects, getBlogs, getCareers } from "@/lib/data-fetcher";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: siteConfig.url, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/services`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/saas-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/workflow-automation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/custom-software`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/api-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/mvp-development`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-trainers`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-evaluators`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/prompt-engineers`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/rlhf`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-research`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/data-annotation`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-coding`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/services/ai-workforce`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/ai-workforce`, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/join-ai-network`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/portfolio`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/case-studies`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/careers`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${siteConfig.url}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/partners`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${siteConfig.url}/privacy`, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${siteConfig.url}/terms`, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  // Fetch dynamic slugs
  const [projects, blogs, careers] = await Promise.all([
    getProjects(),
    getBlogs(),
    getCareers(),
  ]);

  const dynamicProjects = projects.map((p) => ({
    url: `${siteConfig.url}/case-studies/${p.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
  }));

  const dynamicBlogs = blogs.map((b) => ({
    url: `${siteConfig.url}/blog/${b.slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
  }));

  const dynamicCareers = careers.map((c) => ({
    url: `${siteConfig.url}/careers/${c.slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
  }));

  const staticMapped = staticPages.map(({ url, priority, changeFrequency }) => ({
    url,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));

  return [...staticMapped, ...dynamicProjects, ...dynamicBlogs, ...dynamicCareers];
}
