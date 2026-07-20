"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowRight, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { cn } from "@/lib/utils";

const whyPartnerFeatures = [
  {
    title: "AI Development Projects",
    description: "Collaborate on cutting-edge LLM integrations, custom RAG systems, multi-agent orchestrations, and autonomous AI workforce implementations.",
  },
  {
    title: "Enterprise Software Projects",
    description: "Jointly deliver robust, scalable, high-throughput software architectures designed to modernize complex business infrastructure.",
  },
  {
    title: "Cloud Consulting",
    description: "Partner on cloud-native migrations, serverless infrastructure, Kubernetes cluster management, and multi-cloud resilience.",
  },
  {
    title: "Digital Transformation",
    description: "Guide enterprise clients through full-stack digital evolution, process automation, and high-impact technology modernization.",
  },
  {
    title: "Co-Selling Opportunities",
    description: "Co-sell with KrissDevHub to win larger enterprise contracts, leverage shared technical expertise, and close deals faster.",
  },
  {
    title: "Long-Term Collaboration",
    description: "Build a lasting strategic relationship with transparent revenue sharing, dedicated partner support, and ongoing growth initiatives.",
  },
];

const partnerTypes = [
  {
    title: "Referral Partner",
    badge: "Commission Based",
    description: "Refer business opportunities to KrissDevHub and earn competitive recurring commissions on successfully closed projects.",
  },
  {
    title: "Technology Partner",
    badge: "Integration & Tools",
    description: "Integrate your SaaS platforms, AI models, APIs, or software tools with KrissDevHub solutions for joint enterprise reach.",
  },
  {
    title: "Implementation Partner",
    badge: "Delivery & Execution",
    description: "Co-deliver complex technical deployments and leverage our specialized AI/engineering team as an extended workforce.",
  },
  {
    title: "Sales Partner",
    badge: "Reselling & Advisory",
    description: "Expand your service catalog by reselling KrissDevHub software development and AI engineering services directly to your clients.",
  },
  {
    title: "Recruitment Partner",
    badge: "Talent & Sourcing",
    description: "Collaborate with our talent acquisition ecosystem to supply top-tier engineering talent and specialized AI practitioners.",
  },
  {
    title: "Strategic Partner",
    badge: "Executive Alliance",
    description: "Form an executive-level alliance for joint venture initiatives, joint marketing, enterprise co-pitching, and market expansion.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Apply",
    description: "Complete the partner application form below with your company details and partnership focus.",
  },
  {
    number: "02",
    title: "Application Review",
    description: "Our partnership committee evaluates your submission within 2–3 business days.",
  },
  {
    number: "03",
    title: "Discovery Call",
    description: "We schedule an exploratory conversation to align on mutual capabilities, goals, and co-selling structures.",
  },
  {
    number: "04",
    title: "Approval",
    description: "Formalize the partnership agreement and gain access to partner resources, collateral, and points of contact.",
  },
  {
    number: "05",
    title: "Start Partnership",
    description: "Kick off joint initiatives, co-sell services, execute projects, and scale combined growth.",
  },
];

const faqs = [
  {
    q: "Who is eligible to join the KrissDevHub Partner Program?",
    a: "We welcome IT consultancies, software agencies, SaaS platforms, technology vendors, cloud providers, independent sales consultants, and enterprise advisors with a commitment to excellence.",
  },
  {
    q: "How does the commission and revenue sharing structure work?",
    a: "Commission structures vary based on your partner tier (Referral, Sales, Strategic). Referral partners earn competitive percentage payouts on closed deals, while Co-Selling and Implementation partners benefit from customized revenue sharing and margin models.",
  },
  {
    q: "How long does the review process take after I apply?",
    a: "Our partnership team reviews applications continuously. You will receive an initial response and next steps within 2–3 business days after submitting your application.",
  },
  {
    q: "Will we receive dedicated technical and sales support?",
    a: "Yes. Approved partners receive access to pre-sales engineering assistance, solution design support, marketing collateral, co-branding assets, and dedicated partner manager guidance.",
  },
  {
    q: "Can we combine multiple partnership types?",
    a: "Absolutely. Many of our partners operate as both Referral and Implementation partners depending on client geography and project scope.",
  },
];

const servicesList = [
  "AI Development",
  "Custom Software Development",
  "SaaS Development",
  "Mobile App Development",
  "Web Development",
  "Cloud Consulting",
  "DevOps",
  "Salesforce",
  "HubSpot",
  "AWS",
  "Google Cloud",
  "Microsoft",
  "UI/UX",
  "Recruitment",
  "Marketing",
  "Other",
];

const partnerTypeOptions = [
  "Referral Partner",
  "Technology Partner",
  "Implementation Partner",
  "Sales Partner",
  "Recruitment Partner",
  "Strategic Partner",
];

const companySizeOptions = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "500+ employees",
];

export function PartnerLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    website: "",
    company_size: "",
    country: "",
    linkedin_company: "",
    contact_name: "",
    designation: "",
    contact_email: "",
    phone: "",
    linkedin_profile: "",
    partner_type: "Referral Partner",
    services: [] as string[],
    years_in_business: "",
    team_size: "",
    portfolio: "",
    enterprise_clients: "",
    partnership_reason: "",
    additional_notes: "",
    agree_terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById("partner-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists
          ? prev.services.filter((s) => s !== service)
          : [...prev.services, service],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Client side validation
    if (!formData.company_name.trim()) {
      setFormError("Company Name is required.");
      return;
    }
    if (!formData.company_email.trim()) {
      setFormError("Company Email is required.");
      return;
    }
    if (!formData.country.trim()) {
      setFormError("Country is required.");
      return;
    }
    if (!formData.contact_name.trim()) {
      setFormError("Contact Person Full Name is required.");
      return;
    }
    if (!formData.contact_email.trim()) {
      setFormError("Contact Email is required.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Phone Number is required.");
      return;
    }
    if (!formData.partner_type) {
      setFormError("Please select a Partner Type.");
      return;
    }
    if (!formData.agree_terms) {
      setFormError("Please agree to be contacted by KrissDevHub Technologies.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to submit partner application.");
      }

      setSubmitted(true);
      scrollToForm();
    } catch (err: any) {
      setFormError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#090909] text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden pt-36 pb-20 bg-[#090909]">
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
          <div className="max-w-4xl">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-6 block">
                Partner Program
              </span>
            </ScrollReveal>

            <TextReveal
              text="Partner with KrissDevHub Technologies."
              className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-8 leading-[1.08] font-space-grotesk"
              as="h1"
            />

            <ScrollReveal delay={0.15}>
              <p className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed mb-10 font-light font-sans">
                Join our global partner ecosystem and collaborate with us on AI, Software Development, Cloud Solutions, Enterprise Applications, Automation and Digital Transformation projects.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <div className="flex flex-wrap items-center gap-4">
                <button onClick={scrollToForm} className="btn-primary">
                  Become a Partner
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link href="/contact" className="btn-secondary">
                  Book a Meeting
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY PARTNER WITH US */}
      <section className="py-24 sm:py-36 bg-[#090909] border-t border-white/[0.08]" id="why-partner">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="max-w-3xl mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Why Partner
              </span>
            </ScrollReveal>
            <TextReveal
              text="Why Partner With Us"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-space-grotesk mb-4"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-base text-white/50 font-light max-w-xl">
                Combine your domain expertise with our world-class AI & engineering execution.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPartnerFeatures.map((feature, idx) => (
              <ScrollReveal key={feature.title} delay={idx * 0.06}>
                <div className="p-8 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 font-space-grotesk">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/45 leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-24 sm:py-36 bg-[#0d0d0d] border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="max-w-3xl mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Partner Types
              </span>
            </ScrollReveal>
            <TextReveal
              text="Partner Engagement Models"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-space-grotesk mb-4"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-base text-white/50 font-light max-w-xl">
                Select the engagement model that best aligns with your business goals.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerTypes.map((pt, idx) => (
              <ScrollReveal key={pt.title} delay={idx * 0.06}>
                <div className="p-8 rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 border border-white/10 px-2.5 py-1 rounded-md">
                        {pt.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 font-space-grotesk">
                      {pt.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/45 leading-relaxed font-light">
                      {pt.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERSHIP PROCESS */}
      <section className="py-24 sm:py-36 bg-[#090909] border-t border-white/[0.08]" id="process">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid lg:grid-cols-[1fr_2.5fr] gap-12 mb-20 items-start">
            <div>
              <ScrollReveal>
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk block mb-2">
                  Process
                </span>
              </ScrollReveal>
            </div>
            <div>
              <TextReveal
                text="Partnership Process"
                className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 font-space-grotesk"
                as="h2"
              />
              <ScrollReveal delay={0.1}>
                <p className="text-base text-white/50 leading-relaxed max-w-xl font-light">
                  A transparent, streamlined journey from application to joint execution.
                </p>
              </ScrollReveal>
            </div>
          </div>

          <div className="border-t border-white/[0.08] mt-12">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.number} delay={i * 0.05}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-12 border-b border-white/[0.08] items-start">
                  <div className="md:col-span-3">
                    <span className="text-5xl sm:text-6xl font-bold text-white/15 font-space-grotesk leading-none select-none block">
                      {step.number}
                    </span>
                  </div>
                  <div className="md:col-span-9 flex flex-col md:flex-row gap-4 md:gap-12 items-start">
                    <h3 className="text-lg font-bold text-white font-space-grotesk md:w-1/3 pt-1">
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-white/45 leading-relaxed font-light md:w-2/3 max-w-xl">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 sm:py-36 bg-[#0d0d0d] border-t border-white/[0.08]" id="faq">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                FAQ
              </span>
            </ScrollReveal>
            <TextReveal
              text="Frequently asked questions"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-space-grotesk"
              as="h2"
            />
          </div>

          <div className="border-t border-white/[0.08]">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="border-b border-white/[0.08]">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left hover:text-white transition-colors"
                  >
                    <span className="text-base font-semibold text-white/80 tracking-tight font-space-grotesk">
                      {faq.q}
                    </span>
                    <div className="flex-shrink-0 text-white/30">
                      {openFaq === i ? <Minus className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 text-[14px] text-white/45 leading-relaxed font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 sm:py-36 bg-[#090909] border-t border-white/[0.08]" id="cta">
        <div className="mx-auto max-w-4xl px-6 sm:px-10 text-center">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-6 block">
              Get Started
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight font-space-grotesk">
              Ready to Partner with KrissDevHub?
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-white/45 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Take the first step towards expanding your services, co-selling enterprise solutions, and driving high-value transformation.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <button onClick={scrollToForm} className="btn-primary">
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* PARTNER APPLICATION FORM */}
      <section id="partner-form" className="py-24 sm:py-36 bg-[#0d0d0d] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Application
              </span>
            </ScrollReveal>
            <TextReveal
              text="Partner Application Form"
              className="text-3xl sm:text-5xl font-bold tracking-tight text-white font-space-grotesk mb-4"
              as="h2"
            />
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base text-white/45 max-w-md mx-auto font-light">
                Fill out the application below to initiate our partnership onboarding process.
              </p>
            </ScrollReveal>
          </div>

          {submitted ? (
            /* SUCCESS CARD */
            <ScrollReveal>
              <div className="p-8 sm:p-14 rounded-2xl bg-[#111111] border border-white/[0.12] text-center max-w-2xl mx-auto">
                <span className="text-[10px] tracking-[0.15em] uppercase text-white/40 font-mono mb-4 block">
                  Application Submitted
                </span>
                <h3 className="text-2xl font-bold text-white font-space-grotesk mb-4">
                  Thank you for applying to become a KrissDevHub Partner.
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">
                  Your application has been received successfully.
                </p>
                <p className="text-sm text-white/50 leading-relaxed max-w-lg mx-auto mb-8 font-light">
                  Our partnership team will review your application and contact you within{" "}
                  <strong className="text-white font-semibold">2–3 business days</strong> if your
                  profile matches our partnership requirements.
                </p>
                <div className="pt-6 border-t border-white/[0.08]">
                  <p className="text-xs text-white/35 font-light">
                    Thank you for your interest in working with KrissDevHub Technologies.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            /* APPLICATION FORM */
            <ScrollReveal>
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-12 rounded-2xl bg-[#111111] border border-white/[0.08] space-y-10"
              >
                {formError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
                    {formError}
                  </div>
                )}

                {/* 1. Company Information */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-6 pb-3 border-b border-white/[0.06]">
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Company Name <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Acme Corp"
                        value={formData.company_name}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Company Email <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="contact@company.com"
                        value={formData.company_email}
                        onChange={(e) => setFormData({ ...formData, company_email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Website</label>
                      <input
                        type="url"
                        placeholder="https://company.com"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Company Size</label>
                      <select
                        value={formData.company_size}
                        onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                      >
                        <option value="">Select size</option>
                        {companySizeOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111] text-white">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Country <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="United States, India, Germany, etc."
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">LinkedIn Company Page</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/company/acme"
                        value={formData.linkedin_company}
                        onChange={(e) => setFormData({ ...formData, linkedin_company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Contact Person */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-6 pb-3 border-b border-white/[0.06]">
                    Contact Person
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Full Name <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={formData.contact_name}
                        onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Designation</label>
                      <input
                        type="text"
                        placeholder="e.g. VP of Partnerships"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Email <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@company.com"
                        value={formData.contact_email}
                        onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Phone Number <span className="text-white/40">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">LinkedIn Profile</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/janedoe"
                        value={formData.linkedin_profile}
                        onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Partnership Type */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-6 pb-3 border-b border-white/[0.06]">
                    Partnership
                  </h3>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                      Partner Type <span className="text-white/40">*</span>
                    </label>
                    <select
                      value={formData.partner_type}
                      onChange={(e) => setFormData({ ...formData, partner_type: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                    >
                      {partnerTypeOptions.map((pt) => (
                        <option key={pt} value={pt} className="bg-[#111] text-white">
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 4. Services Offered */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
                    Services Offered
                  </h3>
                  <p className="text-xs text-white/40 mb-4 font-light">Select all that apply:</p>
                  <div className="flex flex-wrap gap-2.5">
                    {servicesList.map((srv) => {
                      const selected = formData.services.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={cn(
                            "px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 cursor-pointer",
                            selected
                              ? "bg-white text-black border-white"
                              : "bg-[#09090b] text-white/50 border-white/10 hover:border-white/20 hover:text-white"
                          )}
                        >
                          {selected && <Check className="w-3.5 h-3.5" />}
                          {srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 5. Company Details */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-6 pb-3 border-b border-white/[0.06]">
                    Company Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Years in Business</label>
                      <input
                        type="text"
                        placeholder="e.g. 5 Years"
                        value={formData.years_in_business}
                        onChange={(e) => setFormData({ ...formData, years_in_business: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Current Team Size</label>
                      <input
                        type="text"
                        placeholder="e.g. 25 Engineers"
                        value={formData.team_size}
                        onChange={(e) => setFormData({ ...formData, team_size: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Portfolio Website</label>
                      <input
                        type="url"
                        placeholder="https://portfolio.company.com"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Previous Enterprise Clients</label>
                      <textarea
                        rows={2}
                        placeholder="List notable clients or case study highlights..."
                        value={formData.enterprise_clients}
                        onChange={(e) => setFormData({ ...formData, enterprise_clients: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. About Partnership */}
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-space-grotesk mb-6 pb-3 border-b border-white/[0.06]">
                    About Partnership
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">
                        Why do you want to partner with KrissDevHub?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe your goals, client alignment, or project synergy..."
                        value={formData.partnership_reason}
                        onChange={(e) => setFormData({ ...formData, partnership_reason: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/70 mb-2 font-space-grotesk">Additional Notes</label>
                      <textarea
                        rows={2}
                        placeholder="Any additional details or questions..."
                        value={formData.additional_notes}
                        onChange={(e) => setFormData({ ...formData, additional_notes: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#09090b] border border-white/10 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-4 border-t border-white/[0.06]">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agree_terms}
                      onChange={(e) => setFormData({ ...formData, agree_terms: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded bg-[#09090b] border-white/20 text-white focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs text-white/60 group-hover:text-white transition-colors leading-relaxed font-light">
                      I agree to be contacted by KrissDevHub Technologies.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full sm:w-auto cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Apply for Partnership
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
