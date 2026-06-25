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
