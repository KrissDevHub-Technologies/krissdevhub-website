"use client";

import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { cn } from "@/lib/utils";

// --- CUSTOM HIGH-FIDELITY SVG LOGOS ---

// Google Cloud
const GoogleCloudLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z"
      className="fill-current text-white/30 group-hover:text-[#4285F4] transition-colors duration-500"
    />
  </svg>
);

// Razorpay
const RazorpayLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.5 4H10.2L2.5 13.5H10.8L8 20L22.5 4Z"
      className="fill-current text-white/30 group-hover:text-[#3399FF] transition-colors duration-500"
    />
  </svg>
);

// Databricks
const DatabricksLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2.69L3.5 7.6v9.82L12 22.31l8.5-4.89V7.6L12 2.69zm-1.12 16.57L5.75 16.3V10.7l5.13 2.96v5.6zm0-6.73L5.75 9.57L12 5.96l6.25 3.61l-6.25 3.6v.01l-1.12-.65zm6.25 3.77l-5.13 2.96v-5.6l5.13-2.96v5.6z"
      className="fill-current text-white/30 group-hover:text-[#FF3624] transition-colors duration-500"
    />
  </svg>
);

// SAP
const SapLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 2h90l-10 36H15L5 2z"
      className="fill-current text-white/20 group-hover:text-[#008FD3]/80 transition-colors duration-500"
    />
    <path
      d="M28 15.5c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5 1 2.5 2.5v1c0 1.5-1 2-2.5 2h-4c-2.5 0-4.5 1.5-4.5 4.5v1.5c0 2.5 2 4.5 4.5 4.5h4c2.5 0 4.5-2 4.5-4.5v-1h-3v1c0 1-.5 1.5-1.5 1.5h-4c-1 0-1.5-.5-1.5-1.5v-1.5c0-1 1-1.5 1.5-1.5h4c2.5 0 4.5-1.5 4.5-4.5v-1c0-2.5-2-4.5-4.5-4.5h-4c-2.5 0-4.5 2-4.5 4.5v1h3v-1z"
      className="fill-current text-white/40 group-hover:fill-white transition-colors duration-500"
    />
    <path
      d="M49 11h3l7 18h-3.5l-1.5-4h-7l-1.5 4H42.5l7.5-18zm2.5 11l-2-6-2 6h4z"
      className="fill-current text-white/40 group-hover:fill-white transition-colors duration-500"
    />
    <path
      d="M64 11h7c3 0 5 2 5 5s-2 5-5 5h-4v8h-3V11zm3 7h4c1.5 0 2-1 2-2s-.5-2-2-2h-4v4z"
      className="fill-current text-white/40 group-hover:fill-white transition-colors duration-500"
    />
  </svg>
);

// EY
const EyLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 10h18v4H20v7h11v4H20v8h13v4H15V10z"
      className="fill-current text-white/30 group-hover:text-white/80 transition-colors duration-500"
    />
    <path
      d="M48 10l6 10v10h4V20l6-10h-4.5l-3.5 7-3.5-7H48z"
      className="fill-current text-white/30 group-hover:text-white/80 transition-colors duration-500"
    />
    <path
      d="M72 10l10 12-10 10V10z"
      className="fill-current text-white/20 group-hover:text-[#FFE600]/90 transition-colors duration-500"
    />
  </svg>
);

// Accenture
const AccentureLogo = ({ className }: { className?: string }) => (
  <div className="flex items-center gap-1">
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 5l9 7-9 7v-4.5l3.5-2.5-3.5-2.5V5z"
        className="fill-current text-white/30 group-hover:text-[#A100FF]/90 transition-colors duration-500"
      />
    </svg>
    <span className="text-sm font-bold tracking-tight text-white/30 group-hover:text-white/80 transition-colors duration-500">
      accenture
    </span>
  </div>
);

// Cognizant
const CognizantLogo = ({ className }: { className?: string }) => (
  <div className="flex items-center gap-1.5">
    <svg viewBox="0 0 24 24" className={cn("w-5 h-5", className)} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6c0-1.1.9-2 2-2h4v3H8v4h4v3H8c-1.1 0-2-.9-2-2V6z"
        className="fill-current text-white/20 group-hover:text-[#00B0F0]/85 transition-colors duration-500"
      />
      <path
        d="M12 17c0 1.1.9 2 2 2h4v-3h-4v-4h-4v-3h4c1.1 0 2 .9 2 2v4z"
        className="fill-current text-white/20 group-hover:text-[#00B080]/85 transition-colors duration-500"
        opacity="0.8"
      />
    </svg>
    <span className="text-sm font-semibold tracking-tight text-white/30 group-hover:text-white/80 transition-colors duration-500">
      Cognizant
    </span>
  </div>
);

// OpenAI
const OpenaiLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21.3 11.2c.4-.7.6-1.5.5-2.3-.2-.8-.7-1.5-1.3-2-.3-.2-.6-.4-1-.5.1-.9-.1-1.7-.5-2.4-.4-.7-1.1-1.2-1.8-1.5-.4-.1-.7-.2-1.1-.2-.4-.8-1.1-1.4-1.9-1.7S12.5.5 11.7.7c-.3 0-.7.2-1 .3C10 1 9.4 1.5 9 2.2S8.3 3.6 8.3 4.5c-.3 0-.6.1-.9.2-.8.3-1.4.8-1.8 1.5s-.5 1.6-.4 2.4c-.3.2-.6.4-.8.7-.6.6-1 1.3-1 2.1s.1 1.6.6 2.3c-.4.7-.6 1.5-.5 2.3.2.8.7 1.5 1.3 2 .3.2.6.4 1 .5-.1.9.1 1.7.5 2.4.4.7 1.1 1.2 1.8 1.5.4.1.7.2 1.1.2.4.8 1.1 1.4 1.9 1.7s1.7.1 2.5-.1c.3-.1.7-.2 1-.3.7.3 1.4.4 2.2.3.8-.2 1.5-.7 1.9-1.3.4-.7.6-1.5.5-2.3.3-.2.6-.4.8-.7.6-.6 1-1.3 1-2.1s0-1.7-.5-2.4zm-1.9-3.7c.3.1.5.3.7.6.2.3.3.6.3.9 0 .5-.2 1-.5 1.3l-5.6 3.2V8.9l3.9-2.2c.2-.1.5-.2.7-.2.2 0 .4.1.5.2zM8.3 5.4c0-.3.1-.6.3-.9.2-.3.5-.5.8-.6.5-.2 1.1-.1 1.5.2l3.9 2.2v4.5l-3.9-2.2L6.3 6.3c-.1-.2-.2-.5-.2-.7 0-.1 0-.2.1-.2h2.1zm-3 8.3c-.3-.1-.5-.3-.7-.6-.2-.3-.3-.6-.3-.9 0-.5.2-1 .5-1.3l5.6-3.2v4.6l-3.9 2.2c-.2.1-.5.2-.7.2-.2 0-.4-.1-.5-.2zm4.4 4.9c0 .3-.1.6-.3.9-.2.3-.5.5-.8.6-.5.2-1.1.1-1.5-.2l-3.9-2.2V12.7l3.9 2.2 4.6 2.7c.1.2.2.5.2.7v.1zm6.9.1c-.5.2-1 .2-1.5-.1l-3.9-2.2v-4.5l3.9 2.2 4.6 2.7c.2.1.3.3.4.5.1.2.1.4.1.6 0 .3-.1.6-.3.9-.2.3-.5.5-.8.6s-.5.1-.5.1zm4.9-4.4c.3.1.5.3.7.6.2.3.3.6.3.9 0 .5-.2 1-.5 1.3l-5.6 3.2v-4.6l3.9-2.2c.2-.1.5-.2.7-.2.2 0 .4.1.5.2zm-9.3-1.6l-2-1.1L12 9.9l2 1.1v2.3l-2 1.1-2-1.1v-2.3z"
      className="fill-current text-white/35 group-hover:text-white transition-colors duration-500"
    />
  </svg>
);

// Anthropic Claude
const AnthropicLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3.5l1.8 4.2h4.5l-3.6 2.8 1.4 4.5-4.1-2.9-4.1 2.9 1.4-4.5-3.6-2.8h4.5z"
      className="fill-current text-white/35 group-hover:text-[#E0B897] transition-colors duration-500"
    />
  </svg>
);

// Supabase
const SupabaseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L3 13.5H11L9 22L18 10.5H10L12 2Z"
      className="fill-current text-white/35 group-hover:text-[#3ECF8E] transition-colors duration-500"
    />
  </svg>
);

// PostgreSQL
const PostgresqlLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2C8 2 4 4.5 4 9c0 3.5 2 6 3 7.5-.5.5-1 1-2 1.5v1c2 0 4-1.5 5-2.5h4c1 1 3 2.5 5 2.5v-1c-1-.5-1.5-1-2-1.5 1-1.5 3-4 3-7.5 0-4.5-4-7-8-7z"
      className="stroke-current stroke-[1.5] text-white/35 group-hover:text-[#336791] transition-colors duration-500"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Next.js
const NextjsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle
      cx="12"
      cy="12"
      r="10"
      className="stroke-current text-white/35 group-hover:text-white transition-colors duration-500"
      strokeWidth="1.5"
    />
    <path
      d="M7 16V8h1.5l6.5 8H15v-6"
      className="stroke-current text-white/35 group-hover:text-white transition-colors duration-500"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// React
const ReactLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse
      rx="10"
      ry="4.5"
      cx="12"
      cy="12"
      transform="rotate(0 12 12)"
      className="stroke-current text-white/35 group-hover:text-[#00D8FF] transition-colors duration-500"
      strokeWidth="1.5"
    />
    <ellipse
      rx="10"
      ry="4.5"
      cx="12"
      cy="12"
      transform="rotate(60 12 12)"
      className="stroke-current text-white/35 group-hover:text-[#00D8FF] transition-colors duration-500"
      strokeWidth="1.5"
    />
    <ellipse
      rx="10"
      ry="4.5"
      cx="12"
      cy="12"
      transform="rotate(120 12 12)"
      className="stroke-current text-white/35 group-hover:text-[#00D8FF] transition-colors duration-500"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="1.5" className="fill-current text-white/35 group-hover:text-[#00D8FF] transition-colors duration-500" />
  </svg>
);

// Node.js
const NodejsLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm-1 14.5l-3-1.7V11.2l3 1.7v3.6zm1-5.3l-3-1.7l3-1.7l3 1.7l-3 1.7zm1 5.3v-3.6l3-1.7v3.6l-3 1.7z"
      className="fill-current text-white/35 group-hover:text-[#339933] transition-colors duration-500"
    />
  </svg>
);

// TypeScript
const TypescriptLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="2"
      className="fill-current text-white/5 group-hover:text-[#3178C6]/20 transition-all duration-500"
    />
    <path
      d="M7 9h4M9 9v7M13 14c0 1 1 1.5 2 1.5s1.5-.5 1.5-1c0-1-1-1-2-1.5s-2-1-2-2.5c0-1 .8-1.5 1.8-1.5s1.7.5 1.7 1.5"
      className="stroke-current text-white/35 group-hover:text-[#3178C6] transition-colors duration-500"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Firebase
const FirebaseLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.89 15.75L9.9 2.2a.5.5 0 01.92 0l1.83 4.12 7.46 9.43a.5.5 0 01-.6.76L12 12.33l-7.51 4.18a.5.5 0 01-.6-.76z"
      className="fill-current text-white/35 group-hover:text-[#FFCA28] transition-colors duration-500"
    />
  </svg>
);

// Vercel
const VercelLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 22.5H0L12 1.5L24 22.5Z" className="text-white/35 group-hover:text-white transition-colors duration-500" />
  </svg>
);


// --- CARDS COMPONENTS ---

interface PartnerCardProps {
  name: string;
  badge: string;
  description?: string;
  logo: React.ReactNode;
  glowClass: string;
  glowColor: string;
}

export function PartnerCard({ name, badge, description, logo, glowClass, glowColor }: PartnerCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-8 rounded-2xl bg-white/[0.01] border border-white/[0.06]",
        "hover:border-white/[0.15] hover:-translate-y-1 transition-all duration-500 cursor-default",
        glowClass
      )}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl overflow-hidden">
        <div className={cn("absolute -inset-px bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))]", glowColor, "to-transparent")} />
      </div>

      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="w-10 h-10 flex items-center justify-start">{logo}</div>
          <span className="text-[10px] tracking-wider uppercase font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-space-grotesk">
            {badge}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white mb-2 font-space-grotesk">{name}</h3>
          <p className="text-xs text-white/40 leading-relaxed font-light">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface NetworkCardProps {
  name: string;
  badge: string;
  logo: React.ReactNode;
}

export function NetworkCard({ name, badge, logo }: NetworkCardProps) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-6 rounded-xl bg-transparent border border-white/[0.04]",
        "hover:border-white/[0.1] hover:bg-white/[0.01] transition-all duration-500 cursor-default"
      )}
    >
      <div className="flex flex-col gap-5 relative z-10">
        <div className="flex items-center justify-between">
          <div className="h-8 flex items-center">{logo}</div>
          <span className="text-[9px] tracking-wider uppercase font-medium text-white/40 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full font-space-grotesk">
            {badge}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-white/60 group-hover:text-white/90 transition-colors font-space-grotesk">
          {name}
        </h4>
      </div>
    </div>
  );
}

interface TechItem {
  name: string;
  logo: React.ReactNode;
}

export function TechnologyGrid() {
  const techs: TechItem[] = [
    { name: "OpenAI", logo: <OpenaiLogo className="w-7 h-7" /> },
    { name: "Anthropic Claude", logo: <AnthropicLogo className="w-7 h-7" /> },
    { name: "Supabase", logo: <SupabaseLogo className="w-7 h-7" /> },
    { name: "PostgreSQL", logo: <PostgresqlLogo className="w-7 h-7" /> },
    { name: "Next.js", logo: <NextjsLogo className="w-7 h-7" /> },
    { name: "React", logo: <ReactLogo className="w-7 h-7" /> },
    { name: "Node.js", logo: <NodejsLogo className="w-7 h-7" /> },
    { name: "TypeScript", logo: <TypescriptLogo className="w-7 h-7" /> },
    { name: "Google Cloud", logo: <GoogleCloudLogo className="w-7 h-7" /> },
    { name: "Firebase", logo: <FirebaseLogo className="w-7 h-7" /> },
    { name: "Vercel", logo: <VercelLogo className="w-7 h-7" /> },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {techs.map((tech) => (
        <div
          key={tech.name}
          className={cn(
            "group flex items-center gap-3 p-4 rounded-xl border border-white/[0.03] bg-white/[0.005]",
            "hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-300"
          )}
        >
          <div className="flex-shrink-0">{tech.logo}</div>
          <span className="text-xs font-medium text-white/40 group-hover:text-white/80 transition-colors font-space-grotesk truncate">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- MAIN SECTION ---

export function PartnerSection() {
  return (
    <section className="py-32 sm:py-48 bg-[#090909] border-t border-white/[0.04]" id="ecosystem">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Header */}
        <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-24 items-start">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk block">
              Ecosystem
            </span>
          </ScrollReveal>
          <div>
            <TextReveal
              text="Trusted Technology Ecosystem"
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-8 leading-[1.08] font-space-grotesk"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-base sm:text-lg text-white/50 leading-relaxed max-w-xl font-light">
                We team up with industry giants and construct modern web applications utilizing premier systems, developer platforms, and enterprise solutions.
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* Section 1: Official Technology Partners */}
        <div className="mb-20">
          <ScrollReveal>
            <h3 className="text-xs font-mono tracking-widest text-white/30 uppercase mb-8 border-b border-white/[0.04] pb-3">
              Official Technology Partners
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0.05}>
              <PartnerCard
                name="Google Cloud Partner"
                badge="Official Partner"
                description="We leverage enterprise-grade cloud compute, storage, and developer APIs to build ultra-scalable infrastructure."
                logo={<GoogleCloudLogo className="w-10 h-10" />}
                glowClass="hover:shadow-[0_0_50px_rgba(66,133,244,0.12)]"
                glowColor="from-[#4285F4]/[0.08]"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <PartnerCard
                name="Razorpay Partner"
                badge="Official Partner"
                description="Reseller and systems integrator facilitating high-volume payment processing, marketplace splits, and subscription billing setups."
                logo={<RazorpayLogo className="w-10 h-10" />}
                glowClass="hover:shadow-[0_0_50px_rgba(51,153,255,0.12)]"
                glowColor="from-[#3399FF]/[0.08]"
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <PartnerCard
                name="Databricks Partner"
                badge="Official Partner"
                description="Building premium lakehouse architectures, managing scalable data pipelines, and training custom LLM/ML systems."
                logo={<DatabricksLogo className="w-10 h-10" />}
                glowClass="hover:shadow-[0_0_50px_rgba(255,54,36,0.12)]"
                glowColor="from-[#FF3624]/[0.08]"
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Section 2: Enterprise Procurement & Supplier Networks */}
        <div className="mb-24">
          <ScrollReveal>
            <h3 className="text-xs font-mono tracking-widest text-white/30 uppercase mb-8 border-b border-white/[0.04] pb-3">
              Enterprise Procurement & Supplier Networks
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ScrollReveal delay={0.05}>
              <NetworkCard
                name="SAP Business Network"
                badge="Registered Supplier"
                logo={<SapLogo className="h-6 w-auto" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <NetworkCard
                name="EY Supplier"
                badge="Registered Supplier"
                logo={<EyLogo className="h-6 w-auto" />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <NetworkCard
                name="Accenture Supplier"
                badge="Registered Supplier"
                logo={<AccentureLogo />}
              />
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <NetworkCard
                name="Cognizant Supplier"
                badge="Registered Supplier"
                logo={<CognizantLogo />}
              />
            </ScrollReveal>
          </div>
        </div>

        {/* Section 3: Built With Leading Technologies */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-12 items-end border-t border-white/[0.04] pt-16">
            <ScrollReveal>
              <h4 className="text-xs font-mono tracking-widest text-white/30 uppercase font-medium">
                Core Stack
              </h4>
            </ScrollReveal>
            <div>
              <TextReveal
                text="Building with Industry-Leading Technologies"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3 font-space-grotesk"
                as="h3"
              />
              <ScrollReveal delay={0.05}>
                <p className="text-sm text-white/50 leading-relaxed max-w-xl font-light">
                  We build modern AI-powered software using trusted cloud platforms, developer tools, and enterprise technologies.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal delay={0.1}>
            <TechnologyGrid />
          </ScrollReveal>
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={0.2}>
          <div className="text-center mt-16 border-t border-white/[0.04] pt-8">
            <p className="text-[10px] text-white/30 max-w-2xl mx-auto font-light leading-relaxed">
              Official Partner badges represent approved partner relationships. Other technology logos represent platforms and technologies used in our engineering services.
            </p>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
