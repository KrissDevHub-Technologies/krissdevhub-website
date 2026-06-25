import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { TextReveal } from "@/components/shared/text-reveal";
import { getProjects } from "@/lib/data-fetcher";

export async function ProjectsSection() {
  const featuredProjects = await getProjects();
  return (
    <section className="py-32 sm:py-48 bg-[#090909]" id="projects">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.15em] uppercase text-white/30 font-medium font-space-grotesk mb-4 block">
                Featured work
              </span>
            </ScrollReveal>
            <TextReveal
              text="Projects we're proud of"
              className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight"
              as="h2"
            />
          </div>
          <ScrollReveal delay={0.1}>
            <Link
              href="/case-studies"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase text-white/50 hover:text-white transition-colors group tracking-wider font-space-grotesk"
            >
              All case studies
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </ScrollReveal>
        </div>

        {/* Typographic Projects List */}
        <div className="border-t border-white/[0.08]">
          {featuredProjects.map((project, i) => (
            <ScrollReveal key={project.slug} delay={i * 0.08}>
              <Link
                href={`/case-studies/${project.slug}`}
                className="group block border-b border-white/[0.08] py-12 transition-all duration-300 hover:bg-white/[0.01] px-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Category & Year */}
                  <div className="md:col-span-3 flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/20">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="md:col-span-6 flex flex-col gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-white/80 transition-colors flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-white/60 transition-all duration-300" />
                    </h3>
                    <p className="text-[13.5px] text-white/40 leading-relaxed font-light max-w-lg">
                      {project.description}
                    </p>
                  </div>

                  {/* Metric Result */}
                  <div className="md:col-span-3 text-left md:text-right">
                    <span className="text-xs text-white/20 block font-mono mb-1">Key Outcome</span>
                    <span className="text-base font-semibold text-white/85 font-space-grotesk">
                      {project.metric}
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
