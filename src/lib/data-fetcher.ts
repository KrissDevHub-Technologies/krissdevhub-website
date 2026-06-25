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
}

export const mockProjects: Project[] = [
  {
    title: "NeuralOps Dashboard",
    category: "AI Platform",
    year: "2025",
    description: "A real-time AI operations platform for monitoring LLM pipelines, tracking token usage, and managing vector database performance at scale.",
    longDescription: "NeuralOps is a monitoring and observability platform built for companies running LLM workloads in production. It provides real-time visibility into API costs, latency distributions, model performance, and vector database health — all from a single dashboard.",
    challenge: "The client was running 50M+ LLM API calls per month across 12 models with no unified observability layer. They were flying blind on costs and had no way to detect prompt regression before it reached users.",
    solution: "We designed a streaming pipeline that captures every LLM call, evaluates output quality in near-real-time using a judge model, and surfaces anomalies on a unified React dashboard. All data is stored in Supabase with Pinecone for semantic similarity search across past responses.",
    results: "Within 30 days of launch, the team identified 3 regressions before they reached production. Monthly AI costs dropped by 40% through intelligent caching of semantically similar queries. The dashboard processes 2M events per day with sub-200ms query latency.",
    tech: ["Next.js 15", "TypeScript", "OpenAI", "Pinecone", "Supabase", "Framer Motion", "Recharts", "Vercel"],
    metrics: [
      { label: "Monthly cost reduction", value: "40%" },
      { label: "Query latency (p95)", value: "< 200ms" },
      { label: "Events processed/day", value: "2M+" },
      { label: "Time to ship MVP", value: "8 weeks" },
    ],
    timeline: "8 weeks",
    slug: "neuralops-dashboard",
    metric: "40% reduction in API costs",
  },
  {
    title: "FleetFlow SaaS",
    category: "Logistics Tech",
    year: "2025",
    description: "End-to-end fleet management SaaS with real-time GPS tracking, predictive maintenance alerts, and automated driver compliance workflows.",
    longDescription: "FleetFlow is a full-stack fleet management platform serving logistics operators across the UK, Germany, and Poland. It unifies GPS tracking, maintenance scheduling, driver compliance, and financial reporting into a single product.",
    challenge: "The client was managing 250+ vehicles across 3 countries using spreadsheets, WhatsApp groups, and 4 disconnected tools. Compliance documentation was manual, late payment rates were high, and they had no visibility into fleet health.",
    solution: "We built a multi-tenant SaaS with real-time WebSocket GPS feeds, predictive maintenance ML models (trained on historical service records), automated tachograph compliance generation, and an operator mobile app for drivers.",
    results: "Route optimization is now 3× faster using our AI-powered routing engine. Late payments dropped 45% after implementing automated invoice reminders. The compliance team went from 20 hours per week of manual document processing to under 2.",
    tech: ["React", "Node.js", "PostgreSQL", "AWS", "Redis", "Mapbox", "Stripe", "Twilio"],
    metrics: [
      { label: "Route optimization", value: "3× faster" },
      { label: "Late payments", value: "−45%" },
      { label: "Compliance hours saved/week", value: "18h" },
      { label: "Active fleets", value: "250+" },
    ],
    timeline: "12 weeks",
    slug: "fleetflow-saas",
    metric: "3× route optimization",
  },
  {
    title: "MedScript AI",
    category: "HealthTech",
    year: "2024",
    description: "AI-powered clinical documentation assistant that reduces physician note-taking time by 60%, using fine-tuned medical LLMs and HIPAA-compliant storage.",
    longDescription: "MedScript AI is a clinical documentation assistant that automatically listens to doctor-patient consultations and compiles HIPAA-compliant, structured medical notes. It integrates directly with major EHR platforms to streamline workflows.",
    challenge: "Physicians spent up to 3 hours daily on administrative paperwork, leading to burnout. Previous speech-to-text tools struggled with specialized medical jargon, pharmacology, and natural conversational cadence.",
    solution: "We engineered a secure Whisper-based transcription pipeline with clinical entity recognition. The backend uses fine-tuned Claude models to structure the transcript into SOAP notes, with end-to-end encryption of all patient data.",
    results: "Administrative paperwork time dropped by 60% across pilot clinics. Note accuracy hit 97.3%, significantly beating standard transcription services. 80+ active physicians onboarded in under 4 weeks.",
    tech: ["Python", "LangChain", "Claude 3.5 Sonnet", "FastAPI", "Azure", "FHIR", "Next.js"],
    metrics: [
      { label: "Documentation time", value: "−60%" },
      { label: "Accuracy rate", value: "97.3%" },
      { label: "Physicians onboarded", value: "80+" },
      { label: "Audit compliance", value: "100%" },
    ],
    timeline: "10 weeks",
    slug: "medscript-ai",
    metric: "60% faster documentation",
  },
  {
    title: "PropVault",
    category: "PropTech",
    year: "2024",
    description: "A property management platform unifying lease management, maintenance requests, tenant communication, and financial reporting into one seamless product.",
    longDescription: "PropVault streamlines real estate operations for property management companies. By centralizing communication, maintenance, and payments, it eliminates overhead and provides tenants with a premium modern dashboard.",
    challenge: "Property managers were handling maintenance orders, lease documents, and monthly rent payments across 3 separate portals and hundreds of physical papers, causing delays and errors.",
    solution: "We engineered a unified property management platform integrating Stripe Connect for split rent payments, automated lease document signing via HelloSign API, and an SMS-based maintenance dispatch queue.",
    results: "Maintenance dispatch turnaround times dropped by 50%. Over 98% of rent collections are now automated, reducing delays from days to hours. The client scaled portfolio by 2.5x with zero additional hires.",
    tech: ["Next.js", "Ruby on Rails", "PostgreSQL", "Stripe", "Twilio", "AWS S3"],
    metrics: [
      { label: "Dispatch turnaround", value: "−50%" },
      { label: "Automated collections", value: "98%+" },
      { label: "Portfolio scaling", value: "2.5×" },
    ],
    timeline: "14 weeks",
    slug: "propvault",
    metric: "2.5× portfolio scaling",
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
        metric: metricVal
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
      metric: metricVal
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
      .from("careers")
      .select("*")
      .eq("published", true);

    if (error) throw error;
    if (!data || data.length === 0) return mockCareers;

    return data.map((item: any) => ({
      title: item.title,
      department: item.department,
      location: item.location,
      type: item.type,
      slug: item.slug,
      tags: item.requirements?.slice(0, 3) || [],
      description: item.description,
      requirements: item.requirements || [],
      salary_range: item.salary_range
    }));
  } catch (err) {
    console.warn("Supabase careers fetch failed, using fallback:", err);
    return mockCareers;
  }
}

export async function getCareerBySlug(slug: string): Promise<CareerRole | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("careers")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    if (!data) return mockCareers.find((c) => c.slug === slug) || null;

    const careerData = data as any;

    return {
      title: careerData.title,
      department: careerData.department,
      location: careerData.location,
      type: careerData.type,
      slug: careerData.slug,
      tags: careerData.requirements?.slice(0, 3) || [],
      description: careerData.description,
      requirements: careerData.requirements || [],
      salary_range: careerData.salary_range
    };
  } catch (err) {
    console.warn(`Supabase career slug fetch failed for ${slug}, using fallback:`, err);
    return mockCareers.find((c) => c.slug === slug) || null;
  }
}
