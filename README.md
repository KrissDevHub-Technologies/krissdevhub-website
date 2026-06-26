# KrissDevHub Technologies — Website

> Production-ready website for KrissDevHub Technologies, built with Next.js 15 App Router, TypeScript, TailwindCSS, Supabase, and Framer Motion.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/krissdevhub/website)

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Email | Resend |
| Deployment | Vercel |
| Fonts | Geist (Sans + Mono) |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (marketing)/            # Public marketing pages
│   ├── api/                    # API routes
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── sitemap.ts              # Dynamic sitemap
│   └── robots.ts               # Robots.txt
├── components/
│   ├── layout/                 # Navbar, Footer
│   └── shared/                 # Reusable animation components
├── features/
│   └── home/                   # Home page sections
├── hooks/                      # Custom React hooks
├── lib/
│   ├── constants.ts            # Site-wide constants
│   ├── metadata.ts             # SEO metadata builder
│   ├── utils.ts                # Utilities
│   ├── supabase/               # Supabase clients
│   └── resend/                 # Email client
└── types/
    └── database.types.ts       # Supabase type definitions
```

---

## Setup

### 1. Clone and install

```bash
git clone https://github.com/krissdevhub/website.git
cd website
npm install
```

### 2. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_api_key
NEXT_PUBLIC_SITE_URL=https://krissdevhub.dev
```

### 3. Set up Supabase database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Open the SQL Editor
3. Copy and run the contents of `supabase/schema.sql`

This creates all 7 tables with RLS policies, indexes, and triggers.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

### One-click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual

1. Push to GitHub
2. Import to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy

---

## Pages

| Route | Description |
|---|---|
| `/` | Home (12 sections) |
| `/services` | Services overview |
| `/services/ai-development` | AI development service |
| `/services/saas-development` | SaaS development service |
| `/services/custom-software` | Custom software service |
| `/services/api-integrations` | API integrations service |
| `/services/automation` | Automation service |
| `/case-studies` | Case studies grid |
| `/case-studies/[slug]` | Individual case study |
| `/about` | About page |
| `/careers` | Careers + job listings |
| `/blog` | Blog listing |
| `/contact` | Contact form |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## Features

- **Dark theme** — `#050505` background, premium dark design
- **Glassmorphism** — cards, navbar on scroll
- **Framer Motion** — page transitions, scroll reveals, text animations, magnetic buttons
- **Loading screen** — premium initial experience
- **Custom cursor** — subtle desktop enhancement
- **Responsive** — 375px to 1920px+
- **SEO** — dynamic metadata, sitemap, OG images, structured data
- **WCAG AA** — keyboard navigation, ARIA labels, focus states
- **Server Components** — by default; client only where needed

---

## Development

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

---

## License

Private — All rights reserved. KrissDevHub Technologies.
