// Scrolling tech logos
const logos = [
  "Next.js", "React", "TypeScript", "OpenAI", "LangChain",
  "Supabase", "PostgreSQL", "Python", "Vercel", "AWS",
  "Stripe", "Pinecone", "Docker", "Node.js", "Tailwind",
  "Next.js", "React", "TypeScript", "OpenAI", "LangChain",
  "Supabase", "PostgreSQL", "Python", "Vercel", "AWS",
  "Stripe", "Pinecone", "Docker", "Node.js", "Tailwind",
];

export function LogosSection() {
  return (
    <section className="py-12 border-y border-white/[0.06] overflow-hidden bg-[#090909]">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 mb-6">
        <p className="text-[10px] tracking-[0.15em] uppercase text-white/30 text-center font-medium font-space-grotesk">
          Compatible with modern infrastructure
        </p>
      </div>

      <div className="relative">
        {/* Left/right fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#090909] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#090909] to-transparent pointer-events-none" />

        <div className="flex items-center gap-16 animate-marquee whitespace-nowrap">
          {logos.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex-shrink-0 text-sm font-semibold text-white/20 hover:text-white/40 transition-colors cursor-default tracking-tight font-space-grotesk"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
