/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/lib/supabase/server";

// ==========================================
// Mock Fallback Data (Matching exactly what was in the UI)
// ==========================================

export interface Project {
  title: string;
  category: string;
  year?: string;
  description: string;
  longDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  timeline?: string;
  slug: string;
  cover_image?: string;
  metric: string;
  architecture_description?: string;
  architecture_nodes?: { id: string; label: string; x: number; y: number }[];
  architecture_edges?: { from: string; to: string; label?: string }[];
  key_features?: { title: string; description: string }[];
  gallery?: string[];
}

export const mockProjects: Project[] = [
  {
    title: "KrissDevHub Technologies Website",
    category: "Custom Web App",
    year: "2026",
    description: "An enterprise-grade, highly performant showcase website for KrissDevHub Technologies built with Next.js 16 App Router, TypeScript, and Supabase.",
    longDescription: "This case study documents the design and development of our own company digital hub. The website is built to demonstrate premium Silicon Valley aesthetics (glassmorphism, interactive SVG charts, clean micro-animations) while ensuring perfect responsive readability and automated SEO structure.",
    challenge: "The primary challenge was building a website that reflects our design system standards and technical depth without relying on bloated dependencies, heavy templates, or generic animations. The site needed to serve pages instantly with sub-250ms load times, maintain 100% Core Web Vitals, and offer dynamically generated sitemaps.",
    solution: "We built the site using the latest Next.js 16 version with React Server Components, TypeScript, and Tailwind CSS. The interface uses Tailwind's utility class system for responsive grid layouts, custom SVG canvas animations for interactive diagrams, and a Server Action-based application queue linking straight to Supabase PostgreSQL.",
    results: "The website achieves a 100/100 performance score on Google Lighthouse. Type checking is fully verified at build time, and contact requests/job applications are safely processed via encrypted database schemas.",
    tech: ["Next.js 16", "TypeScript", "React 19", "Supabase", "Tailwind CSS", "Framer Motion", "Lucide Icons"],
    metrics: [
      { label: "Lighthouse Performance", value: "100/100" },
      { label: "Page Load Time", value: "< 250ms" },
      { label: "Core Web Vitals Pass", value: "100%" },
    ],
    timeline: "6 weeks",
    slug: "krissdevhub-technologies-website",
    metric: "100/100 Lighthouse Score",
    architecture_description: "Next.js server-rendered application communicating with Supabase for data fetch, utilizing Resend for automated client notifications and hosted on Vercel's global edge network.",
    architecture_nodes: [
      { id: "client", label: "Client Browser", x: 100, y: 150 },
      { id: "nextjs", label: "Next.js Server", x: 250, y: 150 },
      { id: "supabase", label: "Supabase DB", x: 400, y: 70 },
      { id: "resend", label: "Resend Email API", x: 400, y: 230 },
      { id: "vercel", label: "Vercel Cache", x: 550, y: 150 },
    ],
    architecture_edges: [
      { from: "client", to: "nextjs", label: "HTTP Requests" },
      { from: "nextjs", to: "supabase", label: "Query Data" },
      { from: "nextjs", to: "resend", label: "Trigger Emails" },
      { from: "nextjs", to: "vercel", label: "Edge Deploy" },
    ],
    key_features: [
      { title: "React 19 Server Actions", description: "Server-side form processing validating with Zod and executing direct Supabase SQL insertions safely." },
      { title: "Type-Safe Database", description: "Granular TypeScript interface definitions matching Postgres tables to avoid compile-time data mismatch." },
      { title: "Dynamic XML Sitemap", description: "Asynchronous generation mapping all service pages, case study items, and blog routes dynamically." },
    ],
    gallery: ["/globe.svg", "/file.svg", "/window.svg"],
  },
  {
    title: "Signal Hire – AI-Powered Interview Platform",
    category: "AI Platform",
    year: "2025",
    description: "An AI-powered virtual screening and interview platform that transcribes live voice consultations and generates structured evaluation cards.",
    longDescription: "Signal Hire is an advanced AI recruiting assistant designed to streamline candidate screening. The application conducts automated technical conversations, parses verbal answers in real time, and leverages medical/technical language classifiers to evaluate coding and operations questions.",
    challenge: "Legacy technical screening relies on static online multiple-choice tests that are easily bypassed by external tools or chat interfaces. The client needed a platform that could evaluate dynamic conversational responses, handle custom speech-to-text processing for accent variance, and run evaluations without storing sensitive personal audio long-term.",
    solution: "We built a secure audio streaming backend that processes conversational audio using Whisper models, executing real-time transcript matching. We then implemented a LLM evaluation engine using fine-tuned Claude 3.5 models to structure candidate responses, evaluating logical consistency and code terminology against test parameters.",
    results: "Candidates are screened in under 15 minutes, with audio processing taking less than 3 seconds per reply. Technical evaluation accuracy matched human interviewer ratings with a 95% correlation during initial pilot runs.",
    tech: ["Python", "FastAPI", "Whisper API", "Claude 3.5 Sonnet", "React", "Tailwind CSS", "Supabase", "WebRTC"],
    metrics: [
      { label: "Evaluation Correlation", value: "95%" },
      { label: "Response Delay", value: "< 3.0s" },
      { label: "Avg Screening Time", value: "< 15 min" },
    ],
    timeline: "10 weeks",
    slug: "signal-hire-ai-interview-platform",
    metric: "95% evaluation accuracy",
    architecture_description: "WebRTC audio pipeline communicating with a FastAPI microservice, orchestrating transcribing Whisper threads and Claude evaluation logic with Postgres logging.",
    architecture_nodes: [
      { id: "client", label: "React WebRTC client", x: 100, y: 150 },
      { id: "fastapi", label: "FastAPI Gateway", x: 250, y: 150 },
      { id: "whisper", label: "Whisper Audio", x: 400, y: 70 },
      { id: "claude", label: "Claude SOAP", x: 400, y: 230 },
      { id: "database", label: "Supabase DB", x: 550, y: 150 },
    ],
    architecture_edges: [
      { from: "client", to: "fastapi", label: "Stream Audio" },
      { from: "fastapi", to: "whisper", label: "Extract Text" },
      { from: "fastapi", to: "claude", label: "Structure SOAP" },
      { from: "fastapi", to: "database", label: "Store Keys" },
    ],
    key_features: [
      { title: "Real-time WebRTC stream", description: "Zero-latency audio collection and sync processing directly via raw binary websocket connections." },
      { title: "Context-guided LLM evaluation", description: "Restricting prompt guidelines to target question rubrics to prevent evaluator hallucination." },
      { title: "HIPAA-grade privacy", description: "Automated deletion of audio assets immediately following transcription processing and score saving." },
    ],
    gallery: ["/globe.svg", "/file.svg", "/window.svg"],
  },
  {
    title: "Branovation – Marketing SaaS Admin Platform",
    category: "Marketing SaaS",
    year: "2025",
    description: "A multi-tenant SaaS dashboard managing high-volume social campaigns, cohort allocations, influencer tracking, and payouts.",
    longDescription: "Branovation is an enterprise-grade administration hub for marketing departments and agencies. It enables campaign managers to design cohort strategies, monitor real-time referral links, and distribute automated payouts via Stripe Connect.",
    challenge: "The team was managing hundreds of active influencers across multiple regions using Excel spreadsheets and manual wires. Payout calculations were prone to errors, campaign attribution was laggy, and scaling user accounts created performance bottlenecks on their database queries.",
    solution: "We engineered a robust multi-tenant dashboard utilizing Postgres Row Level Security (RLS) to keep company data partitioned. We integrated Stripe Connect for automated split payouts and designed an analytics pipeline that tracks active referrers using a high-throughput event aggregator.",
    results: "Campaign managers can distribute accurate payments to 500+ users with one click. Dashboard load times dropped under 300ms, and administrative payment tracking errors were reduced to absolute zero.",
    tech: ["Next.js", "PostgreSQL", "Stripe Connect", "Redis", "Framer Motion", "Tailwind CSS", "Zustand"],
    metrics: [
      { label: "Dashboard load", value: "< 300ms" },
      { label: "Influencer Payouts", value: "500+/click" },
      { label: "Payment Errors", value: "0%" },
    ],
    timeline: "12 weeks",
    slug: "branovation-marketing-saas-admin",
    metric: "Zero payment sync errors",
    architecture_description: "Next.js dashboard querying a PostgreSQL instance with RLS policies, scheduling bulk payment arrays via a Redis queue to the Stripe API.",
    architecture_nodes: [
      { id: "dashboard", label: "Next.js frontend", x: 100, y: 150 },
      { id: "server", label: "Next.js server", x: 250, y: 150 },
      { id: "db", label: "PostgreSQL RLS", x: 400, y: 70 },
      { id: "queue", label: "Redis queue", x: 400, y: 230 },
      { id: "stripe", label: "Stripe Connect", x: 550, y: 150 },
    ],
    architecture_edges: [
      { from: "dashboard", to: "server", label: "API Requests" },
      { from: "server", to: "db", label: "Query Cohorts" },
      { from: "server", to: "queue", label: "Schedule Payouts" },
      { from: "queue", to: "stripe", label: "Execute Payouts" },
    ],
    key_features: [
      { title: "Stripe Connect Payouts", description: "Automatic distribution of campaign rewards to influencer bank accounts based on custom milestones." },
      { title: "RLS isolation policies", description: "Granular Postgres Row Level Security keeping individual tenant data strictly separated at the database level." },
      { title: "High-throughput tracking", description: "Optimized redirect routes serving pixel trackers with Redis memory cache counters under 50ms." },
    ],
    gallery: ["/globe.svg", "/file.svg", "/window.svg"],
  }
];

export interface Testimonial {
  content: string;
  author: string;
  role: string;
}

export const mockTestimonials: Testimonial[] = [
  {
    content: "KrissDevHub delivered our AI analytics platform in 6 weeks. The code quality, architecture decisions, and UX exceeded everything we expected. They genuinely care about outcomes.",
    author: "Sarah M.",
    role: "CTO, Logistics Scale-up",
  },
  {
    content: "We came with a rough idea. They came back with a production-ready SaaS in a month. The LLM integration alone would have taken our internal team a quarter. Exceptional work.",
    author: "David K.",
    role: "Founder, HealthTech Startup",
  },
];

export interface BlogPost {
  title: string;
  excerpt: string;
  tags: string[];
  author: string;
  readTime: string;
  date: string;
  slug: string;
  content?: string;
}

export const mockBlogs: BlogPost[] = [
  {
    title: "Why RAG is the most practical AI feature you can ship in 2025",
    excerpt: "Retrieval-Augmented Generation has moved from research paper to production staple. Here's how we implement it for clients, what pitfalls to avoid, and when it's the wrong tool.",
    tags: ["AI", "LLM", "RAG"],
    author: "KrissDevHub Team",
    readTime: "8 min read",
    date: "June 12, 2025",
    slug: "why-rag-is-practical-ai-feature-2025",
    content: `Retrieval-Augmented Generation (RAG) is the bridge between frozen foundation LLMs and your proprietary dynamic data.

While building fully autonomous agents makes for great social media demos, RAG is the workhorse of enterprise AI. It is practical, audit-able, and cost-effective.

## Why RAG Wins Over Fine-Tuning in 2025

1. **Real-time updates**: Fine-tuning cannot keep up with rapidly changing files or databases. RAG updates as fast as your index does.
2. **Access Control**: You can easily restrict search results based on user permissions, something nearly impossible with fine-tuned models.
3. **Traceability**: RAG outputs cite their sources, giving users a way to double-check AI answers.

## Our Recommended Stack

At KrissDevHub, we consistently see success with:
- **Next.js** for custom search UI.
- **pgvector** inside Supabase for vector storage.
- **Cohere / OpenAI** for embeddings and reranking.
`
  },
  {
    title: "The SaaS architecture decisions that matter most at early stage",
    excerpt: "Multi-tenancy, billing, auth, analytics. Before you write a single feature, these foundational decisions will define how painful your next 18 months are.",
    tags: ["SaaS", "Architecture", "Next.js"],
    author: "KrissDevHub Team",
    readTime: "12 min read",
    date: "May 28, 2025",
    slug: "saas-architecture-decisions-early-stage",
    content: `When building an early-stage SaaS product, speed is your primary metric. However, bad early choices can slow you down to a crawl.

Here are the four pillars of early-stage SaaS architecture that you must get right on day one.

## 1. Multi-Tenant Database Strategy

Should you use database-per-tenant, schema-per-tenant, or tenant-id columns with RLS?
For 95% of early SaaS, **tenant-id with Row Level Security (RLS)** is the right path. It is cheap to run, simple to query, and scales well enough for your first 10,000 customers.

## 2. Billing Integration

Do not write custom subscription logic. Use Stripe Billing or Paddle. Decouple your system auth status from Stripe events by relying on webhooks to keep sync.
`
  },
  {
    title: "How we cut LLM costs by 40% without touching accuracy",
    excerpt: "Semantic caching, prompt compression, model routing, and context window management. A practical guide to production LLM cost optimization.",
    tags: ["AI", "OpenAI", "Cost Optimization"],
    author: "KrissDevHub Team",
    readTime: "10 min read",
    date: "May 14, 2025",
    slug: "cut-llm-costs-without-touching-accuracy",
  },
  {
    title: "Supabase RLS patterns for multi-tenant SaaS",
    excerpt: "Row Level Security is powerful but cryptic. Here are the exact policy patterns we use to build secure, performant multi-tenant apps on Supabase.",
    tags: ["Supabase", "PostgreSQL", "SaaS"],
    author: "KrissDevHub Team",
    readTime: "9 min read",
    date: "April 30, 2025",
    slug: "supabase-rls-patterns-multi-tenant-saas",
  }
];

export interface CareerRole {
  title: string;
  department: string;
  location: string;
  type: string;
  slug: string;
  tags: string[];
  description?: string;
  requirements?: string[];
  salary_range?: string;
}

export const mockCareers: CareerRole[] = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    slug: "senior-fullstack-engineer",
    tags: ["Next.js", "TypeScript", "Supabase"],
    description: "We're looking for a senior engineer who cares deeply about code quality, system design, and building things that work. You'll work across our client projects and internal tooling, making key architecture decisions and mentoring junior team members.",
    requirements: [
      "5+ years of production experience in React, Node.js, and TypeScript.",
      "Experience setting up databases, server environments, and caching layers.",
      "A strong product mind — you care about the user experience, not just the code.",
      "Comfort working asynchronously in a fully distributed team."
    ],
    salary_range: "$110k - $140k"
  },
  {
    title: "AI/ML Engineer",
    department: "AI",
    location: "Remote",
    type: "Full-time",
    slug: "ai-ml-engineer",
    tags: ["Python", "LangChain", "OpenAI"],
    description: "Help us integrate advanced AI capabilities into our clients' systems. You'll work on prompt engineering pipelines, agent routing setups, and vector indexing engines.",
    requirements: [
      "3+ years of experience working with Python and generative AI APIs.",
      "In-depth understanding of vector stores, semantic search, and RAG architectures.",
      "Experience optimizing LLM response latency and caching strategies.",
      "Degree in CS, Mathematics, or equivalent hands-on experience."
    ],
    salary_range: "$120k - $155k"
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    slug: "product-designer",
    tags: ["Figma", "Motion", "Systems"],
    description: "Lead UI and UX designs for complex software products. You will turn raw requirements into premium interfaces that are clean, typographic, and extremely fast.",
    requirements: [
      "4+ years designing production-grade digital tools, SaaS, or complex mobile apps.",
      "Strong portfolio showcasing clean typography, generous grid layouts, and micro-interactions.",
      "Expert knowledge of Figma component systems and auto-layouts.",
      "Ability to write basic Tailwind CSS / React code is a huge plus."
    ],
    salary_range: "$90k - $120k"
  }
];

// ==========================================
// Safe Fetching Helpers (Attempts Supabase, Falls back gracefully)
// ==========================================

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return mockProjects;

    return data.map((item: any) => {
      const metricVal = Array.isArray(item.metrics?.values) && item.metrics.values[0]
        ? `${item.metrics.values[0].value} ${item.metrics.values[0].label}`
        : (item.metrics?.value || item.metrics?.key_outcome || "Significant improvement");

      return {
        title: item.title,
        category: item.category,
        year: item.published_at ? new Date(item.published_at).getFullYear().toString() : "2025",
        description: item.description,
        longDescription: item.excerpt,
        challenge: item.metrics?.challenge || "",
        solution: item.metrics?.solution || "",
        results: item.metrics?.results || "",
        tech: item.tech_stack || [],
        metrics: Array.isArray(item.metrics?.values) ? item.metrics.values : [
          { label: "Time to ship", value: item.metrics?.time_to_ship || "8 weeks" }
        ],
        timeline: item.metrics?.time_to_ship || "8 weeks",
        slug: item.slug,
        cover_image: item.cover_image || undefined,
        metric: metricVal,
        architecture_description: item.metrics?.architecture_description || "",
        architecture_nodes: item.metrics?.architecture_nodes || undefined,
        architecture_edges: item.metrics?.architecture_edges || undefined,
        key_features: item.metrics?.key_features || undefined,
        gallery: item.metrics?.gallery || undefined,
      };
    });
  } catch (err) {
    console.warn("Supabase projects fetch failed, using fallback:", err);
    return mockProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) return mockProjects.find((p) => p.slug === slug) || null;

    const projectData = data as any;

    const metricVal = Array.isArray(projectData.metrics?.values) && projectData.metrics.values[0]
      ? `${projectData.metrics.values[0].value} ${projectData.metrics.values[0].label}`
      : (projectData.metrics?.value || projectData.metrics?.key_outcome || "Significant improvement");

    return {
      title: projectData.title,
      category: projectData.category,
      year: projectData.published_at ? new Date(projectData.published_at).getFullYear().toString() : "2025",
      description: projectData.description,
      longDescription: projectData.excerpt,
      challenge: projectData.metrics?.challenge || "",
      solution: projectData.metrics?.solution || "",
      results: projectData.metrics?.results || "",
      tech: projectData.tech_stack || [],
      metrics: Array.isArray(projectData.metrics?.values) ? projectData.metrics.values : [
        { label: "Time to ship", value: projectData.metrics?.time_to_ship || "8 weeks" }
      ],
      timeline: projectData.metrics?.time_to_ship || "8 weeks",
      slug: projectData.slug,
      cover_image: projectData.cover_image || undefined,
      metric: metricVal,
      architecture_description: projectData.metrics?.architecture_description || "",
      architecture_nodes: projectData.metrics?.architecture_nodes || undefined,
      architecture_edges: projectData.metrics?.architecture_edges || undefined,
      key_features: projectData.metrics?.key_features || undefined,
      gallery: projectData.metrics?.gallery || undefined,
    };
  } catch (err) {
    console.warn(`Supabase project slug fetch failed for ${slug}, using fallback:`, err);
    return mockProjects.find((p) => p.slug === slug) || null;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("published", true);

    if (error) throw error;
    if (!data || data.length === 0) return mockTestimonials;

    return data.map((item: any) => ({
      content: item.content,
      author: item.author_name,
      role: `${item.author_role}, ${item.company}`,
    }));
  } catch (err) {
    console.warn("Supabase testimonials fetch failed, using fallback:", err);
    return mockTestimonials;
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return mockBlogs;

    return data.map((item: any) => ({
      title: item.title,
      excerpt: item.excerpt,
      tags: item.tags || [],
      author: item.author,
      readTime: "8 min read", // estimated
      date: item.published_at ? new Date(item.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) : "2025",
      slug: item.slug,
      content: item.content
    }));
  } catch (err) {
    console.warn("Supabase blogs fetch failed, using fallback:", err);
    return mockBlogs;
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) return mockBlogs.find((b) => b.slug === slug) || null;

    const blogData = data as any;

    return {
      title: blogData.title,
      excerpt: blogData.excerpt,
      tags: blogData.tags || [],
      author: blogData.author,
      readTime: "8 min read",
      date: blogData.published_at ? new Date(blogData.published_at).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
      }) : "2025",
      slug: blogData.slug,
      content: blogData.content
    };
  } catch (err) {
    console.warn(`Supabase blog slug fetch failed for ${slug}, using fallback:`, err);
    return mockBlogs.find((b) => b.slug === slug) || null;
  }
}

export async function getCareers(): Promise<CareerRole[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("status", "open");

    if (error) throw error;
    if (!data || data.length === 0) return mockCareers;

    return data.map((item: any) => {
      const salaryRange = item.salary_min && item.salary_max
        ? `$${Math.round(item.salary_min / 1000)}k - $${Math.round(item.salary_max / 1000)}k`
        : item.salary_min
        ? `$${Math.round(item.salary_min / 1000)}k+`
        : undefined;

      return {
        title: item.title,
        department: item.department,
        location: item.location,
        type: item.employment_type,
        slug: item.slug,
        tags: item.requirements?.slice(0, 3) || [],
        description: item.description,
        requirements: item.requirements || [],
        salary_range: salaryRange
      };
    });
  } catch (err) {
    console.warn("Supabase careers fetch failed, using fallback:", err);
    return mockCareers;
  }
}

export async function getCareerBySlug(slug: string): Promise<CareerRole | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .eq("status", "open")
      .single();

    if (error) throw error;
    if (!data) return mockCareers.find((c) => c.slug === slug) || null;

    const careerData = data as any;
    const salaryRange = careerData.salary_min && careerData.salary_max
      ? `$${Math.round(careerData.salary_min / 1000)}k - $${Math.round(careerData.salary_max / 1000)}k`
      : careerData.salary_min
      ? `$${Math.round(careerData.salary_min / 1000)}k+`
      : undefined;

    return {
      title: careerData.title,
      department: careerData.department,
      location: careerData.location,
      type: careerData.employment_type,
      slug: careerData.slug,
      tags: careerData.requirements?.slice(0, 3) || [],
      description: careerData.description,
      requirements: careerData.requirements || [],
      salary_range: salaryRange
    };
  } catch (err) {
    console.warn(`Supabase career slug fetch failed for ${slug}, using fallback:`, err);
    return mockCareers.find((c) => c.slug === slug) || null;
  }
}
