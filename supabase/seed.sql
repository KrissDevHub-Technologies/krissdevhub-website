-- ================================================
-- KrissDevHub Technologies — Supabase Seed Data
-- Run this in your Supabase SQL Editor to populate
-- your tables with the initial premium mock data.
-- ================================================

-- 1. SEED PROJECTS
INSERT INTO projects (title, slug, description, excerpt, cover_image, tech_stack, metrics, category, featured, published, published_at) VALUES
  (
    'NeuralOps Dashboard', 
    'neuralops-dashboard', 
    'A real-time AI operations platform for monitoring LLM pipelines, tracking token usage, and managing vector database performance at scale.', 
    'NeuralOps is a monitoring and observability platform built for companies running LLM workloads in production. It provides real-time visibility into API costs, latency distributions, model performance, and vector database health — all from a single dashboard.',
    NULL,
    ARRAY['Next.js 15', 'TypeScript', 'OpenAI', 'Pinecone', 'Supabase', 'Framer Motion', 'Recharts', 'Vercel'],
    '{"challenge": "The client was running 50M+ LLM API calls per month across 12 models with no unified observability layer. They were flying blind on costs and had no way to detect prompt regression before it reached users.", "solution": "We designed a streaming pipeline that captures every LLM call, evaluates output quality in near-real-time using a judge model, and surfaces anomalies on a unified React dashboard. All data is stored in Supabase with Pinecone for semantic similarity search across past responses.", "results": "Within 30 days of launch, the team identified 3 regressions before they reached production. Monthly AI costs dropped by 40% through intelligent caching of semantically similar queries. The dashboard processes 2M events per day with sub-200ms query latency.", "values": [{"label": "Monthly cost reduction", "value": "40%"}, {"label": "Query latency (p95)", "value": "< 200ms"}, {"label": "Events processed/day", "value": "2M+"}, {"label": "Time to ship MVP", "value": "8 weeks"}], "time_to_ship": "8 weeks"}',
    'AI Platform',
    true,
    true,
    NOW()
  ),
  (
    'FleetFlow SaaS', 
    'fleetflow-saas', 
    'End-to-end fleet management SaaS with real-time GPS tracking, predictive maintenance alerts, and automated driver compliance workflows.', 
    'FleetFlow is a full-stack fleet management platform serving logistics operators across the UK, Germany, and Poland. It unifies GPS tracking, maintenance scheduling, driver compliance, and financial reporting into a single product.',
    NULL,
    ARRAY['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis', 'Mapbox', 'Stripe', 'Twilio'],
    '{"challenge": "The client was managing 250+ vehicles across 3 countries using spreadsheets, WhatsApp groups, and 4 disconnected tools. Compliance documentation was manual, late payment rates were high, and they had no visibility into fleet health.", "solution": "We built a multi-tenant SaaS with real-time WebSocket GPS feeds, predictive maintenance ML models (trained on historical service records), automated tachograph compliance generation, and an operator mobile app for drivers.", "results": "Route optimization is now 3× faster using our AI-powered routing engine. Late payments dropped 45% after implementing automated invoice reminders. The compliance team went from 20 hours per week of manual document processing to under 2.", "values": [{"label": "Route optimization", "value": "3× faster"}, {"label": "Late payments", "value": "−45%"}, {"label": "Compliance hours saved/week", "value": "18h"}, {"label": "Active fleets", "value": "250+"}], "time_to_ship": "12 weeks"}',
    'Logistics Tech',
    true,
    true,
    NOW()
  ),
  (
    'MedScript AI', 
    'medscript-ai', 
    'AI-powered clinical documentation assistant that reduces physician note-taking time by 60%, using fine-tuned medical LLMs and HIPAA-compliant storage.', 
    'MedScript AI is a clinical documentation assistant that automatically listens to doctor-patient consultations and compiles HIPAA-compliant, structured medical notes. It integrates directly with major EHR platforms to streamline workflows.',
    NULL,
    ARRAY['Python', 'LangChain', 'Claude 3.5 Sonnet', 'FastAPI', 'Azure', 'FHIR', 'Next.js'],
    '{"challenge": "Physicians spent up to 3 hours daily on administrative paperwork, leading to burnout. Previous speech-to-text tools struggled with specialized medical jargon, pharmacology, and natural conversational cadence.", "solution": "We engineered a secure Whisper-based transcription pipeline with clinical entity recognition. The backend uses fine-tuned Claude models to structure the transcript into SOAP notes, with end-to-end encryption of all patient data.", "results": "Administrative paperwork time dropped by 60% across pilot clinics. Note accuracy hit 97.3%, significantly beating standard transcription services. 80+ active physicians onboarded in under 4 weeks.", "values": [{"label": "Documentation time", "value": "−60%"}, {"label": "Accuracy rate", "value": "97.3%"}, {"label": "Physicians onboarded", "value": "80+"}, {"label": "Audit compliance", "value": "100%"}], "time_to_ship": "10 weeks"}',
    'HealthTech',
    true,
    true,
    NOW()
  ),
  (
    'PropVault', 
    'propvault', 
    'A property management platform unifying lease management, maintenance requests, tenant communication, and financial reporting into one seamless product.', 
    'PropVault streamlines real estate operations for property management companies. By centralizing communication, maintenance, and payments, it eliminates overhead and provides tenants with a premium modern dashboard.',
    NULL,
    ARRAY['Next.js', 'Ruby on Rails', 'PostgreSQL', 'Stripe', 'Twilio', 'AWS S3'],
    '{"challenge": "Property managers were handling maintenance orders, lease documents, and monthly rent payments across 3 separate portals and hundreds of physical papers, causing delays and errors.", "solution": "We engineered a unified property management platform integrating Stripe Connect for split rent payments, automated lease document signing via HelloSign API, and an SMS-based maintenance dispatch queue.", "results": "Maintenance dispatch turnaround times dropped by 50%. Over 98% of rent collections are now automated, reducing delays from days to hours. The client scaled portfolio by 2.5x with zero additional hires.", "values": [{"label": "Dispatch turnaround", "value": "−50%"}, {"label": "Automated collections", "value": "98%+"}, {"label": "Portfolio scaling", "value": "2.5×"}], "time_to_ship": "14 weeks"}',
    'PropTech',
    false,
    true,
    NOW()
  ),
  (
    'KrissDevHub Technologies Website',
    'krissdevhub-technologies-website',
    'An enterprise-grade, highly performant showcase website for KrissDevHub Technologies built with Next.js 16 App Router, TypeScript, and Supabase.',
    'This case study documents the design and development of our own company digital hub. The website is built to demonstrate premium Silicon Valley aesthetics (glassmorphism, interactive SVG charts, clean micro-animations) while ensuring perfect responsive readability and automated SEO structure.',
    NULL,
    ARRAY['Next.js 16', 'TypeScript', 'React 19', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons'],
    '{"challenge": "The primary challenge was building a website that reflects our design system standards and technical depth without relying on bloated dependencies, heavy templates, or generic animations. The site needed to serve pages instantly with sub-250ms load times, maintain 100% Core Web Vitals, and offer dynamically generated sitemaps.", "solution": "We built the site using the latest Next.js 16 version with React Server Components, TypeScript, and Tailwind CSS. The interface uses Tailwind''s utility class system for responsive grid layouts, custom SVG canvas animations for interactive diagrams, and a Server Action-based application queue linking straight to Supabase PostgreSQL.", "results": "The website achieves a 100/100 performance score on Google Lighthouse. Type checking is fully verified at build time, and contact requests/job applications are safely processed via encrypted database schemas.", "values": [{"label": "Lighthouse Performance", "value": "100/100"}, {"label": "Page Load Time", "value": "< 250ms"}, {"label": "Core Web Vitals Pass", "value": "100%"}], "time_to_ship": "6 weeks", "architecture_description": "Next.js server-rendered application communicating with Supabase for data fetch, utilizing Resend for automated client notifications and hosted on Vercel''s global edge network.", "architecture_nodes": [{"id": "client", "label": "Client Browser", "x": 100, "y": 150}, {"id": "nextjs", "label": "Next.js Server", "x": 250, "y": 150}, {"id": "supabase", "label": "Supabase DB", "x": 400, "y": 70}, {"id": "resend", "label": "Resend Email API", "x": 400, "y": 230}, {"id": "vercel", "label": "Vercel Cache", "x": 550, "y": 150}], "architecture_edges": [{"from": "client", "to": "nextjs", "label": "HTTP Requests"}, {"from": "nextjs", "to": "supabase", "label": "Query Data"}, {"from": "nextjs", "to": "resend", "label": "Trigger Emails"}, {"from": "nextjs", "to": "vercel", "label": "Edge Deploy"}], "key_features": [{"title": "React 19 Server Actions", "description": "Server-side form processing validating with Zod and executing direct Supabase SQL insertions safely."}, {"title": "Type-Safe Database", "description": "Granular TypeScript interface definitions matching Postgres tables to avoid compile-time data mismatch."}, {"title": "Dynamic XML Sitemap", "description": "Asynchronous generation mapping all service pages, case study items, and blog routes dynamically."}], "gallery": ["/globe.svg", "/file.svg", "/window.svg"]}',
    'Custom Web App',
    true,
    true,
    NOW()
  ),
  (
    'Signal Hire – AI-Powered Interview Platform',
    'signal-hire-ai-interview-platform',
    'An AI-powered virtual screening and interview platform that transcribes live voice consultations and generates structured evaluation cards.',
    'Signal Hire is an advanced AI recruiting assistant designed to streamline candidate screening. The application conducts automated technical conversations, parses verbal answers in real time, and leverages medical/technical language classifiers to evaluate coding and operations questions.',
    NULL,
    ARRAY['Python', 'FastAPI', 'Whisper API', 'Claude 3.5 Sonnet', 'React', 'Tailwind CSS', 'Supabase', 'WebRTC'],
    '{"challenge": "Legacy technical screening relies on static online multiple-choice tests that are easily bypassed by external tools or chat interfaces. The client needed a platform that could evaluate dynamic conversational responses, handle custom speech-to-text processing for accent variance, and run evaluations without storing sensitive personal audio long-term.", "solution": "We built a secure audio streaming backend that processes conversational audio using Whisper models, executing real-time transcript matching. We then implemented a LLM evaluation engine using fine-tuned Claude 3.5 models to structure candidate responses, evaluating logical consistency and code terminology against test parameters.", "results": "Candidates are screened in under 15 minutes, with audio processing taking less than 3 seconds per reply. Technical evaluation accuracy matched human interviewer ratings with a 95% correlation during initial pilot runs.", "values": [{"label": "Evaluation Correlation", "value": "95%"}, {"label": "Response Delay", "value": "< 3.0s"}, {"label": "Avg Screening Time", "value": "< 15 min"}], "time_to_ship": "10 weeks", "architecture_description": "WebRTC audio pipeline communicating with a FastAPI microservice, orchestrating transcribing Whisper threads and Claude evaluation logic with Postgres logging.", "architecture_nodes": [{"id": "client", "label": "React WebRTC client", "x": 100, "y": 150}, {"id": "fastapi", "label": "FastAPI Gateway", "x": 250, "y": 150}, {"id": "whisper", "label": "Whisper Audio", "x": 400, "y": 70}, {"id": "claude", "label": "Claude SOAP", "x": 400, "y": 230}, {"id": "database", "label": "Supabase DB", "x": 550, "y": 150}], "architecture_edges": [{"from": "client", "to": "fastapi", "label": "Stream Audio"}, {"from": "fastapi", "to": "whisper", "label": "Extract Text"}, {"from": "fastapi", "to": "claude", "label": "Structure SOAP"}, {"from": "fastapi", "to": "database", "label": "Store Keys"}], "key_features": [{"title": "Real-time WebRTC stream", "description": "Zero-latency audio collection and sync processing directly via raw binary websocket connections."}, {"title": "Context-guided LLM evaluation", "description": "Restricting prompt guidelines to target question rubrics to prevent evaluator hallucination."}, {"title": "HIPAA-grade privacy", "description": "Automated deletion of audio assets immediately following transcription processing and score saving."}], "gallery": ["/globe.svg", "/file.svg", "/window.svg"]}',
    'AI Platform',
    true,
    true,
    NOW()
  ),
  (
    'Branovation – Marketing SaaS Admin Platform',
    'branovation-marketing-saas-admin',
    'A multi-tenant SaaS dashboard managing high-volume social campaigns, cohort allocations, influencer tracking, and payouts.',
    'Branovation is an enterprise-grade administration hub for marketing departments and agencies. It enables campaign managers to design cohort strategies, monitor real-time referral links, and distribute automated payouts via Stripe Connect.',
    NULL,
    ARRAY['Next.js', 'PostgreSQL', 'Stripe Connect', 'Redis', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
    '{"challenge": "The team was managing hundreds of active influencers across multiple regions using Excel spreadsheets and manual wires. Payout calculations were prone to errors, campaign attribution was laggy, and scaling user accounts created performance bottlenecks on their database queries.", "solution": "We engineered a robust multi-tenant dashboard utilizing Postgres Row Level Security (RLS) to keep company data partitioned. We integrated Stripe Connect for automated split payouts and designed an analytics pipeline that tracks active referrers using a high-throughput event aggregator.", "results": "Campaign managers can distribute accurate payments to 500+ users with one click. Dashboard load times dropped under 300ms, and administrative payment tracking errors were reduced to absolute zero.", "values": [{"label": "Dashboard load", "value": "< 300ms"}, {"label": "Influencer Payouts", "value": "500+/click"}, {"label": "Payment Errors", "value": "0%"}], "time_to_ship": "12 weeks", "architecture_description": "Next.js dashboard querying a PostgreSQL instance with RLS policies, scheduling bulk payment arrays via a Redis queue to the Stripe API.", "architecture_nodes": [{"id": "dashboard", "label": "Next.js frontend", "x": 100, "y": 150}, {"id": "server", "label": "Next.js server", "x": 250, "y": 150}, {"id": "db", "label": "PostgreSQL RLS", "x": 400, "y": 70}, {"id": "queue", "label": "Redis queue", "x": 400, "y": 230}, {"id": "stripe", "label": "Stripe Connect", "x": 550, "y": 150}], "architecture_edges": [{"from": "dashboard", "to": "server", "label": "API Requests"}, {"from": "server", "to": "db", "label": "Query Cohorts"}, {"from": "server", "to": "queue", "label": "Schedule Payouts"}, {"from": "queue", "to": "stripe", "label": "Execute Payouts"}], "key_features": [{"title": "Stripe Connect Payouts", "description": "Automatic distribution of campaign rewards to influencer bank accounts based on custom milestones."}, {"title": "RLS isolation policies", "description": "Granular Postgres Row Level Security keeping individual tenant data strictly separated at the database level."}, {"title": "High-throughput tracking", "description": "Optimized redirect routes serving pixel trackers with Redis memory cache counters under 50ms."}], "gallery": ["/globe.svg", "/file.svg", "/window.svg"]}',
    'Marketing SaaS',
    true,
    true,
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED TESTIMONIALS
INSERT INTO testimonials (author_name, author_role, company, avatar_url, content, rating, published) VALUES
  (
    'Sarah M.', 
    'CTO', 
    'Logistics Scale-up', 
    NULL, 
    'KrissDevHub delivered our AI analytics platform in 6 weeks. The code quality, architecture decisions, and UX exceeded everything we expected. They genuinely care about outcomes.', 
    5, 
    true
  ),
  (
    'David K.', 
    'Founder', 
    'HealthTech Startup', 
    NULL, 
    'We came with a rough idea. They came back with a production-ready SaaS in a month. The LLM integration alone would have taken our internal team a quarter. Exceptional work.', 
    5, 
    true
  )
ON CONFLICT DO NOTHING;

-- 3. SEED BLOGS
INSERT INTO blogs (title, slug, excerpt, content, cover_image, tags, author, published, published_at) VALUES
  (
    'Why RAG is the most practical AI feature you can ship in 2025',
    'why-rag-is-practical-ai-feature-2025',
    'Retrieval-Augmented Generation has moved from research paper to production staple. Here''s how we implement it for clients, what pitfalls to avoid, and when it''s the wrong tool.',
    'Retrieval-Augmented Generation (RAG) is the bridge between frozen foundation LLMs and your proprietary dynamic data.

While building fully autonomous agents makes for great social media demos, RAG is the workhorse of enterprise AI. It is practical, audit-able, and cost-effective.

## Why RAG Wins Over Fine-Tuning in 2025

1. **Real-time updates**: Fine-tuning cannot keep up with rapidly changing files or databases. RAG updates as fast as your index does.
2. **Access Control**: You can easily restrict search results based on user permissions, something nearly impossible with fine-tuned models.
3. **Traceability**: RAG outputs cite their sources, giving users a way to double-check AI answers.

## Our Recommended Stack

At KrissDevHub, we consistently see success with:
- **Next.js** for custom search UI.
- **pgvector** inside Supabase for vector storage.
- **Cohere / OpenAI** for embeddings and reranking.',
    NULL,
    ARRAY['AI', 'LLM', 'RAG'],
    'KrissDevHub Team',
    true,
    NOW()
  ),
  (
    'The SaaS architecture decisions that matter most at early stage',
    'saas-architecture-decisions-early-stage',
    'Multi-tenancy, billing, auth, analytics. Before you write a single feature, these foundational decisions will define how painful your next 18 months are.',
    'When building an early-stage SaaS product, speed is your primary metric. However, bad early choices can slow you down to a crawl.

Here are the four pillars of early-stage SaaS architecture that you must get right on day one.

## 1. Multi-Tenant Database Strategy

Should you use database-per-tenant, schema-per-tenant, or tenant-id columns with RLS?
For 95% of early SaaS, **tenant-id with Row Level Security (RLS)** is the right path. It is cheap to run, simple to query, and scales well enough for your first 10,000 customers.

## 2. Billing Integration

Do not write custom subscription logic. Use Stripe Billing or Paddle. Decouple your system auth status from Stripe events by relying on webhooks to keep sync.',
    NULL,
    ARRAY['SaaS', 'Architecture', 'Next.js'],
    'KrissDevHub Team',
    true,
    NOW()
  ),
  (
    'How we cut LLM costs by 40% without touching accuracy',
    'cut-llm-costs-without-touching-accuracy',
    'Semantic caching, prompt compression, model routing, and context window management. A practical guide to production LLM cost optimization.',
    'Detailed guide on optimizing LLM prompts, caching, and model routing to lower monthly bills by 40% without decreasing accuracy rates.',
    NULL,
    ARRAY['AI', 'OpenAI', 'Cost Optimization'],
    'KrissDevHub Team',
    true,
    NOW()
  ),
  (
    'Supabase RLS patterns for multi-tenant SaaS',
    'supabase-rls-patterns-multi-tenant-saas',
    'Row Level Security is powerful but cryptic. Here are the exact policy patterns we use to build secure, performant multi-tenant apps on Supabase.',
    'Complete setup guide and policy templates for PostgreSQL Row Level Security (RLS) within multi-tenant SaaS platforms.',
    NULL,
    ARRAY['Supabase', 'PostgreSQL', 'SaaS'],
    'KrissDevHub Team',
    true,
    NOW()
  )
ON CONFLICT (slug) DO NOTHING;

-- 4. SEED CAREERS
INSERT INTO careers (title, slug, department, location, type, description, requirements, salary_range, published) VALUES
  (
    'Senior Full-Stack Engineer',
    'senior-fullstack-engineer',
    'Engineering',
    'Remote',
    'Full-time',
    'We''re looking for a senior engineer who cares deeply about code quality, system design, and building things that work. You''ll work across our client projects and internal tooling, making key architecture decisions and mentoring junior team members.',
    ARRAY['5+ years of production experience in React, Node.js, and TypeScript.', 'Experience setting up databases, server environments, and caching layers.', 'A strong product mind — you care about the user experience, not just the code.', 'Comfort working asynchronously in a fully distributed team.'],
    '$110k - $140k',
    true
  ),
  (
    'AI/ML Engineer',
    'ai-ml-engineer',
    'AI',
    'Remote',
    'Full-time',
    'Help us integrate advanced AI capabilities into our clients'' systems. You''ll work on prompt engineering pipelines, agent routing setups, and vector indexing engines.',
    ARRAY['3+ years of experience working with Python and generative AI APIs.', 'In-depth understanding of vector stores, semantic search, and RAG architectures.', 'Experience optimizing LLM response latency and caching strategies.', 'Degree in CS, Mathematics, or equivalent hands-on experience.'],
    '$120k - $155k',
    true
  ),
  (
    'Product Designer',
    'product-designer',
    'Design',
    'Remote',
    'Full-time',
    'Lead UI and UX designs for complex software products. You will turn raw requirements into premium interfaces that are clean, typographic, and extremely fast.',
    ARRAY['4+ years designing production-grade digital tools, SaaS, or complex mobile apps.', 'Strong portfolio showcasing clean typography, generous grid layouts, and micro-interactions.', 'Expert knowledge of Figma component systems and auto-layouts.', 'Ability to write basic Tailwind CSS / React code is a huge plus.'],
    '$90k - $120k',
    true
  )
ON CONFLICT (slug) DO NOTHING;
