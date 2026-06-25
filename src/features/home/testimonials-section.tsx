import { stats } from "@/lib/constants";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { getTestimonials } from "@/lib/data-fetcher";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        
        {/* Stats Grid (clean, borderless, just whitespace) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8 mb-32 border-b border-white/[0.08] pb-24">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.06}>
              <div className="text-left">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 font-space-grotesk tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest font-mono">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="max-w-2xl mb-20">
          <ScrollReveal>
            <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
              Testimonials
            </span>
          </ScrollReveal>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight font-space-grotesk">
            Trusted by founders.
          </h2>
        </div>

        {/* Large Editorial Quotations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.author} delay={i * 0.1}>
              <div className="flex flex-col justify-between h-full border-l border-white/[0.08] pl-8 py-2">
                <blockquote className="text-lg sm:text-xl text-white/65 leading-relaxed font-light mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </blockquote>
                <figcaption className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    {t.author}
                  </span>
                  <span className="text-xs text-white/30 font-light">
                    {t.role}
                  </span>
                </figcaption>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
