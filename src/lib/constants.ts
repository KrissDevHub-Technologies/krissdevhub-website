export const siteConfig = {
  name: "KrissDevHub Technologies",
  shortName: "KrissDevHub",
  description:
    "We build AI-native software, SaaS products, and custom digital solutions that help startups and growing businesses scale faster.",
  tagline: "Building AI-Native Software for the Next Generation.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://krissdevhub.dev",
  ogImage: "/og-image.png",
  email: "hello@krissdevhub.dev",
  phone: "+1 (555) 000-0000",
  links: {
    twitter: "https://twitter.com/krissdevhub",
    github: "https://github.com/krissdevhub",
    linkedin: "https://linkedin.com/company/krissdevhub",
  },
};

export const navLinks = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "AI Application Development", href: "/services/ai-development", description: "LLM integrations, RAG systems, AI agents" },
      { label: "SaaS Development", href: "/services/saas-development", description: "End-to-end SaaS platforms built to scale" },
      { label: "Workflow Automation", href: "/services/workflow-automation", description: "Intelligent workflow and background task automation" },
      { label: "Custom Software", href: "/services/custom-software", description: "Bespoke systems engineered for complex logic" },
      { label: "API Development", href: "/services/api-development", description: "High-performance, secure backend API integrations" },
      { label: "MVP Development", href: "/services/mvp-development", description: "Validate ideas and ship working software in 4-8 weeks" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export const footerLinks = {
  services: [
    { label: "AI Application Development", href: "/services/ai-development" },
    { label: "SaaS Development", href: "/services/saas-development" },
    { label: "Workflow Automation", href: "/services/workflow-automation" },
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "API Development", href: "/services/api-development" },
    { label: "MVP Development", href: "/services/mvp-development" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export const techStack = [
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "OpenAI", "LangChain", "Supabase", "PostgreSQL", "Redis",
  "Vercel", "AWS", "Docker", "Kubernetes", "Stripe",
  "Tailwind CSS", "Framer Motion", "tRPC", "Prisma", "GraphQL",
];

export const industries = [
  { name: "FinTech", icon: "💳", description: "Payment systems, trading platforms, financial analytics" },
  { name: "HealthTech", icon: "🏥", description: "Patient management, telemedicine, health analytics" },
  { name: "EdTech", icon: "🎓", description: "Learning platforms, assessments, adaptive education" },
  { name: "E-Commerce", icon: "🛍️", description: "Storefronts, inventory, logistics, personalization" },
  { name: "PropTech", icon: "🏢", description: "Property management, virtual tours, market analytics" },
  { name: "LegalTech", icon: "⚖️", description: "Contract automation, compliance, case management" },
  { name: "MarTech", icon: "📊", description: "Campaign automation, analytics, CRM integrations" },
  { name: "CleanTech", icon: "♻️", description: "Energy monitoring, sustainability platforms" },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description: "We align on goals, constraints, and success metrics through structured discovery workshops. No guesswork — only clarity.",
  },
  {
    number: "02",
    title: "Architecture & Design",
    description: "We design scalable systems and premium interfaces before writing a single line of production code.",
  },
  {
    number: "03",
    title: "Iterative Development",
    description: "Short sprints. Continuous delivery. You see working software within weeks, not months.",
  },
  {
    number: "04",
    title: "Quality & Launch",
    description: "Rigorous testing, performance optimization, and a production deployment you can be proud of.",
  },
  {
    number: "05",
    title: "Growth & Scale",
    description: "We stay engaged. As your business grows, we evolve the product with you.",
  },
];

export const stats = [
  { value: "50+", label: "Products Shipped" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "4×", label: "Faster Time to Market" },
  { value: "24/7", label: "Engineering Support" },
];
