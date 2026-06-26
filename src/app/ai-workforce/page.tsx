import Link from "next/link";
import {
  Brain,
  ShieldCheck,
  Sparkles,
  GitBranch,
  Code2,
  Database,
  Users,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Target,
  FileCheck,
  Cpu,
  Layers,
  GraduationCap,
  Globe2,
  Briefcase,
  Workflow
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "AI Workforce Solutions",
  description:
    "Hire specialized AI training workforces, RLHF experts, prompt engineers, and evaluators. Scale your machine learning data operations with elite, vetted human loops.",
  canonical: "https://krissdevhub.dev/ai-workforce",
});

const talentCategories = [
  {
    title: "AI Trainers",
    description: "Domain experts who author high-quality instruction datasets for SFT and model alignments.",
    href: "/services/ai-trainers",
    icon: Brain,
  },
  {
    title: "AI Evaluators",
    description: "Auditors who stress-test models, evaluate alignment, and execute red-teaming programs.",
    href: "/services/ai-evaluators",
    icon: ShieldCheck,
  },
  {
    title: "Prompt Engineers",
    description: "Architects who design context formats, system prompt boundaries, and few-shot templates.",
    href: "/services/prompt-engineers",
    icon: Sparkles,
  },
  {
    title: "RLHF Experts",
    description: "Specialists who rank model comparisons to feed DPO, KTO, and PPO training pipelines.",
    href: "/services/rlhf",
    icon: GitBranch,
  },
  {
    title: "AI Coding Specialists",
    description: "Software developers authoring compiler-verified code solutions and programmatic explanations.",
    href: "/services/ai-coding",
    icon: Code2,
  },
  {
    title: "AI Data Annotators",
    description: "Precise annotators tagging entities, segmentation, and metadata across text and media assets.",
    href: "/services/data-annotation",
    icon: Database,
  },
  {
    title: "Human Feedback Teams",
    description: "Calibrated cohorts providing subjective feedback, preference data, and tone evaluations.",
    href: "/services/ai-workforce",
    icon: Users,
  },
  {
    title: "AI Researchers",
    description: "Quantitative associates who preprocess training text, run benchmarks, and support ML testing.",
    href: "/services/ai-research",
    icon: BookOpen,
  },
];

const values = [
  {
    title: "Elite Vetting Standards",
    description: "We filter contributors based on rigorous logic exams, domain challenges, and writing rubrics. Less than 4% of applicants pass.",
    icon: GraduationCap,
  },
  {
    title: "Global Sourcing Scale",
    description: "Deploy multidisciplinary experts spanning various languages and technical fields, ready to match your project demands.",
    icon: Globe2,
  },
  {
    title: "Secure Virtual Workspaces",
    description: "All labeling and interaction runs on sandboxed workspaces with strict download, copy-paste, and screenshots disabled.",
    icon: Cpu,
  },
];

const industries = [
  { name: "Legal Tech", detail: "Review of contract logic and legal summaries by verified lawyers." },
  { name: "HealthTech & Med", detail: "Annotation of medical imaging, radiology files, and clinical reports." },
  { name: "Financial Services", detail: "Parsing financial statements, balance sheets, and audit reports." },
  { name: "Software Development", detail: "Generating compilable algorithm code and detailed API definitions." },
  { name: "E-Commerce", detail: "Multilingual product descriptions, intent classification, and search queries." },
  { name: "Logistics & Fleet", detail: "Labeling maps, route charts, and operational delivery tables." },
];

export default function AiWorkforceLandingPage() {
  return (
    <div className="min-h-screen bg-[#090909] text-white pb-24 pt-32 overflow-hidden">
      {/* Hero */}
      <section className="relative pb-16 overflow-hidden">
        <GradientBlob className="w-[600px] h-[500px] -top-30 -left-40 opacity-20" color="purple" />
        <GradientBlob className="w-[500px] h-[500px] top-40 -right-40 opacity-15" color="indigo" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-10">
          <ScrollReveal>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4 block font-space-grotesk">
              New Vertical
            </span>
          </ScrollReveal>
          
          <TextReveal
            text="Scale Your LLMs with Vetted Human Intelligence"
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1] font-space-grotesk max-w-4xl"
            as="h1"
          />

          <ScrollReveal delay={0.15}>
            <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed mb-8 font-light">
              Accelerate your training pipelines. We supply and manage specialized cohorts of AI Trainers, 
              RLHF Experts, and Prompt Engineers to align, benchmark, and evaluate your machine learning applications.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact?subject=Hire+AI+Workforce"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all font-space-grotesk shadow-md"
              >
                Request AI Workforce
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/join-ai-network"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-white text-sm font-semibold transition-all font-space-grotesk"
              >
                Join AI Talent Network
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Modern Cards Section */}
      <section className="py-16 border-t border-white/[0.04] relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-12">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                Our Talents
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk">
                Specialized AI Talents Ready to Deploy
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {talentCategories.map((category, i) => {
              const Icon = category.icon;
              return (
                <ScrollReveal key={category.title} delay={i * 0.05}>
                  <Link
                    href={category.href}
                    className="group block p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5 text-white/60 group-hover:text-white transition-colors">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk flex items-center justify-between">
                        {category.title}
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-white/60" />
                      </h3>
                      <p className="text-[11px] text-white/40 leading-relaxed font-light">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why KrissDevHub */}
      <section className="py-16 border-t border-white/[0.04] bg-[#0d0d0d]/30 relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-12">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                Value proposition
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk">
                Why KrissDevHub AI Workforce
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={i * 0.08}>
                  <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.06] flex flex-col h-full justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-4 text-white/60">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk">{v.title}</h3>
                      <p className="text-xs text-white/45 leading-relaxed font-light">{v.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16 border-t border-white/[0.04] relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                Quality Assurance
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk mb-6">
                Rigorous Quantitative Standards
              </h2>
              <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                We believe that training AI shouldn&apos;t rely on guesswork. We measure and trace workforce quality 
                scientifically using verified mathematical metrics. Our pipelines feature:
              </p>
              <ul className="space-y-4">
                {[
                  { title: "Inter-Annotator Agreement (IAA)", desc: "We track Fleiss' Kappa indices to guarantee labeling convergence." },
                  { title: "Blind Cross-Verification", desc: "Multiple annotators review identical outputs independently." },
                  { title: "Lead Spot Auditing", desc: "Senior quality leads execute random checks daily on delivered datasets." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-white/80 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white font-space-grotesk mb-0.5">{item.title}</h4>
                      <p className="text-[11px] text-white/40 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-[#0d0d0d]/80 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl" />
                <h3 className="text-sm font-bold text-white mb-6 font-space-grotesk flex items-center gap-2">
                  <Target className="w-4 h-4 text-white/60" />
                  Model Calibration Output
                </h3>
                <div className="space-y-4 font-mono text-[10px] text-white/40">
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span>Task Accuracy Target</span>
                    <span className="text-white">&gt; 99.2%</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span>Inter-Annotator Kappa</span>
                    <span className="text-emerald-400">0.82 (High Consensus)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span>Compliance Audits</span>
                    <span className="text-white">100% Verified</span>
                  </div>
                  <div className="flex justify-between border-b border-white/[0.04] pb-2">
                    <span>Response Latency Check</span>
                    <span className="text-white">Sub-100ms Ingestion</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Security Class</span>
                    <span className="text-white">SOC-2 Sandbox</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-16 border-t border-white/[0.04] bg-[#0d0d0d]/30 relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-12">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                Hiring Process
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk">
                How We Align Your Workforce
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { step: "01", name: "Inquiry & Alignment", desc: "Submit your task criteria and secure environment constraints." },
              { step: "02", name: "Custom Screening", desc: "We deploy coding and knowledge tests to source the perfect cohort." },
              { step: "03", name: "Pilot Phase", desc: "A brief pilot run of 100 samples to verify instructions and data schema." },
              { step: "04", name: "Full-Scale Launch", desc: "Onboard the full team with managed PM tracking and delivery logs." },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-6 rounded-2xl bg-[#111111] border border-white/[0.06] flex flex-col justify-between h-full relative">
                  <span className="text-2xl font-bold font-mono text-white/10 mb-4 block">{p.step}</span>
                  <div>
                    <h3 className="text-xs font-bold text-white font-space-grotesk mb-1.5">{p.name}</h3>
                    <p className="text-[11px] text-white/40 leading-relaxed font-light">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 border-t border-white/[0.04] relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="mb-12">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                Verticals
              </span>
              <h2 className="text-3xl font-bold text-white font-space-grotesk">
                Industry-Specific Workforces
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
                  <h3 className="text-xs font-bold text-white font-space-grotesk mb-2">{ind.name}</h3>
                  <p className="text-[11px] text-white/45 leading-relaxed font-light">{ind.detail}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Support */}
      <section className="py-16 border-t border-white/[0.04] bg-[#0d0d0d]/30 relative">
        <div className="mx-auto max-w-5xl px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#0d0d0d] to-[#121212] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-3xl" />
            
            <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
              <div>
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-3 block">
                  Enterprise Support
                </span>
                <h2 className="text-3xl font-bold text-white font-space-grotesk mb-4">
                  Full SLA-backed Managed Operations
                </h2>
                <p className="text-xs text-white/50 leading-relaxed font-light mb-6">
                  We don&apos;t just throw workers over the wall. KrissDevHub provides high-touch program managers, 
                  strict NDAs, dedicated security nodes, and direct Slack integration.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-white/60" />
                    <span className="text-[11px] text-white/70 font-space-grotesk">Dedicated PMs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-white/60" />
                    <span className="text-[11px] text-white/70 font-space-grotesk">Custom SLAs</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <Link
                  href="/contact?subject=Hire+AI+Workforce"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 transition-all font-space-grotesk shadow-md"
                >
                  Contact Enterprise Sales
                  <ArrowRight className="w-4.5 h-4.5" />
                </Link>
                <Link
                  href="/join-ai-network"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] text-white text-xs font-bold transition-all font-space-grotesk"
                >
                  Apply as Professional
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
