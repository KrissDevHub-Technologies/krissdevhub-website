"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Mail, MessageSquare, Building2, Loader2, CheckCircle } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { siteConfig } from "@/lib/constants";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(20, "Please provide at least 20 characters"),
});

type FormData = z.infer<typeof schema>;

const services = [
  "AI Development",
  "SaaS Development",
  "Custom Software",
  "API Integrations",
  "Automation",
  "Not sure yet",
];

const budgets = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
];

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      setServerError(null);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          const resBody = await response.json().catch(() => ({}));
          throw new Error(resBody.error || "Failed to send message");
        }
        setIsSuccess(true);
        reset();
      } catch (err: any) {
        setServerError(err.message || "Something went wrong. Please email us directly at hello@krissdevhub.com");
      }
    });
  };

  const inputBase =
    "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all";
  const labelBase = "block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider";

  return (
    <>
      <section className="relative pt-32 pb-24 overflow-hidden">
        <GradientBlob className="w-[500px] h-[500px] -top-40 -left-40 opacity-30" color="blue" />
        <GradientBlob className="w-[400px] h-[400px] top-1/2 -right-40 opacity-20" color="purple" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div className="lg:sticky lg:top-32">
              <ScrollReveal>
                <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4 block">
                  Get in touch
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                  Let&apos;s discuss your project
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-white/50 text-lg leading-relaxed mb-10">
                  Fill in the form and we&apos;ll respond within 1 business day. No commitment required — just an honest conversation about what you&apos;re building.
                </p>
              </ScrollReveal>

              {/* Contact info */}
              <ScrollReveal delay={0.3}>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                    { icon: MessageSquare, label: "Response time", value: "Within 1 business day", href: null },
                    { icon: Building2, label: "Timezone", value: "Available globally, async-first", href: null },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white/40" />
                      </div>
                      <div>
                        <p className="text-xs text-white/30">{label}</p>
                        {href ? (
                          <a href={href} className="text-sm text-white/70 hover:text-white transition-colors">
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-white/70">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Form */}
            <ScrollReveal delay={0.15} direction="left">
              <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8">
                {isSuccess ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">Message received!</h3>
                    <p className="text-sm text-white/50">
                      We&apos;ll get back to you within 1 business day.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-name" className={labelBase}>Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          autoComplete="name"
                          placeholder="Alex Johnson"
                          className={inputBase}
                          {...register("name")}
                          aria-invalid={!!errors.name}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-email" className={labelBase}>Email *</label>
                        <input
                          id="contact-email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@company.com"
                          className={inputBase}
                          {...register("email")}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Company */}
                    <div>
                      <label htmlFor="contact-company" className={labelBase}>Company</label>
                      <input
                        id="contact-company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Corp"
                        className={inputBase}
                        {...register("company")}
                      />
                    </div>

                    {/* Service + Budget */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="contact-service" className={labelBase}>Service</label>
                        <select
                          id="contact-service"
                          className={`${inputBase} bg-[#121212]`}
                          {...register("service")}
                        >
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="contact-budget" className={labelBase}>Budget</label>
                        <select
                          id="contact-budget"
                          className={`${inputBase} bg-[#121212]`}
                          {...register("budget")}
                        >
                          <option value="">Select range</option>
                          {budgets.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className={labelBase}>Message *</label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        placeholder="Tell us about your project, what you're building, and what success looks like..."
                        className={`${inputBase} resize-none`}
                        {...register("message")}
                        aria-invalid={!!errors.message}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
                      )}
                    </div>

                    {serverError && (
                      <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                        {serverError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isPending}
                      id="contact-submit-btn"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-center text-white/20">
                      By submitting, you agree to our{" "}
                      <a href="/privacy" className="underline hover:text-white/40 transition-colors">
                        Privacy Policy
                      </a>
                    </p>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Business Hours & Map Section */}
          <div className="grid lg:grid-cols-2 gap-8 mt-24 items-stretch">
            <ScrollReveal className="h-full">
              <div className="p-8 rounded-2xl border border-white/[0.06] bg-[#121212]/40 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-xl font-bold text-white font-space-grotesk mb-4">Availability & Hours</h2>
                  <p className="text-xs text-white/40 leading-relaxed mb-6 font-light">
                    We work asynchronously to collaborate with clients across the Americas, Europe, and Asia. Support pipelines are monitored 24/7 for urgent SLA requests.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/[0.04]">
                  <div>
                    <span className="text-[10px] text-white/30 uppercase block mb-1">Standard Workweek</span>
                    <span className="text-xs font-semibold text-white">Mon – Fri · 9am – 6pm EST</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/30 uppercase block mb-1">Response Guarantee</span>
                    <span className="text-xs font-semibold text-white">Under 24 Business Hours</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/30 uppercase block mb-1">Critical SLA Uptime</span>
                    <span className="text-xs font-semibold text-white">24/7 Monitoring Alerting</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-white/30 uppercase block mb-1">Direct Communication</span>
                    <span className="text-xs font-semibold text-white">Dedicated Slack Channel</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Glowing World Map SVG Placeholder */}
            <ScrollReveal delay={0.1} className="h-full">
              <div className="rounded-2xl border border-white/[0.06] bg-[#0c0c0c] overflow-hidden relative flex flex-col justify-center items-center p-6 h-full min-h-[250px]">
                <div className="absolute inset-0 dot-grid opacity-10" />
                <svg viewBox="0 0 400 200" className="w-full h-full max-w-sm text-white/[0.04]">
                  <g fill="currentColor">
                    {/* Abstract cluster points mapping global presence */}
                    <circle cx="100" cy="80" r="1.5" />
                    <circle cx="110" cy="75" r="1.5" />
                    <circle cx="120" cy="85" r="1.5" />
                    <circle cx="140" cy="90" r="2" />
                    <circle cx="150" cy="95" r="1" />
                    <circle cx="220" cy="70" r="1.5" />
                    <circle cx="230" cy="65" r="2.5" />
                    <circle cx="240" cy="75" r="1.5" />
                    <circle cx="310" cy="110" r="2" />
                    <circle cx="325" cy="100" r="1.5" />
                  </g>
                  {/* Signal node indicator SF */}
                  <g className="animate-pulse">
                    <circle cx="100" cy="80" r="4" fill="rgba(255,255,255,0.15)" />
                    <circle cx="100" cy="80" r="2" fill="#fff" />
                  </g>
                  {/* Signal node London */}
                  <g className="animate-pulse">
                    <circle cx="230" cy="65" r="4" fill="rgba(255,255,255,0.15)" />
                    <circle cx="230" cy="65" r="2" fill="#fff" />
                  </g>
                </svg>
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/[0.06] text-[8px] font-mono text-white/50">
                  Global Hub Operations: SF · NYC · LDN
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Contact FAQ Section */}
          <div className="max-w-3xl mx-auto mt-24">
            <h2 className="text-2xl font-bold text-center text-white font-space-grotesk mb-10">Onboarding FAQ</h2>
            <div className="border-t border-white/[0.08]">
              {[
                {
                  q: "What happens after I submit this form?",
                  a: "We will review your requirements, confirm feasibility, and contact you via email to schedule a 15-minute video call. During that call, we align on goals, budgets, and sketch out initial options.",
                },
                {
                  q: "Do you sign Non-Disclosure Agreements (NDAs)?",
                  a: "Yes. For established businesses and financed startups, we sign standard NDAs before scoping conversations to protect proprietary systems details.",
                },
                {
                  q: "What are your budget requirements?",
                  a: "Our software development contracts start at $10k. For ongoing iteration and features expansion, we offer monthly retainer packages tailored to scale operations.",
                },
              ].map((faq, i) => (
                <div key={i} className="border-b border-white/[0.08] py-4">
                  <h3 className="text-sm font-semibold text-white mb-2 font-space-grotesk">{faq.q}</h3>
                  <p className="text-xs text-white/45 leading-relaxed font-light">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
