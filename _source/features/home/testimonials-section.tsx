import { stats } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

const testimonials = [
  {
    content:
      "KrissDevHub delivered our AI analytics platform in 6 weeks. The code quality, architecture decisions, and UX exceeded everything we expected. They genuinely care about outcomes.",
    author: "Sarah M.",
    role: "CTO, Logistics Scale-up",
    initials: "SM",
    color: "from-blue-600 to-purple-600",
  },
  {
    content:
      "We came with a rough idea. They came back with a production-ready SaaS in a month. The LLM integration alone would have taken our internal team a quarter. Exceptional work.",
    author: "David K.",
    role: "Founder, HealthTech Startup",
    initials: "DK",
    color: "from-emerald-600 to-blue-600",
  },
  {
    content:
      "What sets them apart is their ability to understand the business problem, not just the technical spec. Our automation workflows now save 40 hours per week across the team.",
    author: "Priya R.",
    role: "Head of Operations, E-Commerce",
    initials: "PR",
    color: "from-rose-600 to-purple-600",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#070707]" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.08}>
              <div className="p-6 rounded-2xl glass border border-white/[0.06] text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs text-white/40">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="max-w-2xl mb-12 mx-auto text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-400/70 mb-4 block">
              What clients say
            </span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Built on trust
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.1}>
              <figure className="glass rounded-2xl border border-white/[0.08] p-6 h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="text-sm text-white/60 leading-relaxed flex-1 mb-6">
                  &ldquo;{t.content}&rdquo;
                </blockquote>

                <figcaption className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-xs font-bold text-white">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.author}</div>
                    <div className="text-xs text-white/30">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
