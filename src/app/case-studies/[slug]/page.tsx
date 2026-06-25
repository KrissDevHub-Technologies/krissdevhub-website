import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { CtaSection } from "@/features/home/cta-section";
import { getProjectBySlug, getProjects } from "@/lib/data-fetcher";

// Generate metadata for each case study dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return constructMetadata({ title: "Case Study Not Found" });
  return constructMetadata({
    title: project.title,
    description: project.description,
    canonical: `https://krissdevhub.com/case-studies/${slug}`,
  });
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Pick a subtle gradient color dynamically based on slug/index for clean styling
  const gradientClass = slug.includes("neural")
    ? "from-blue-600/30 to-purple-600/20"
    : slug.includes("fleet")
    ? "from-emerald-600/25 to-blue-600/15"
    : slug.includes("med")
    ? "from-rose-600/20 to-purple-600/15"
    : "from-zinc-800/40 to-zinc-900/30";

  return (
    <>
      <article className="pt-24">
        {/* Hero banner */}
        <div className={`h-64 sm:h-80 bg-gradient-to-br ${gradientClass} relative overflow-hidden`}>
          <div className="absolute inset-0 dot-grid opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
          {/* Back link */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All case studies
          </Link>

          {/* Header */}
          <div className="glass rounded-2xl border border-white/[0.08] p-8 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3 block">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-lg text-white/60 leading-relaxed mb-6">{project.longDescription || project.description}</p>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <div className="text-xl font-bold text-white mb-1 font-space-grotesk">{m.value}</div>
                  <div className="text-xs text-white/30">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Content sections */}
          <div className="space-y-6 mb-16">
            {[
              { label: "The Challenge", content: project.challenge },
              { label: "Our Solution", content: project.solution },
              { label: "The Results", content: project.results },
            ].map(({ label, content }) => (
              content && (
                <section key={label} className="glass rounded-2xl border border-white/[0.08] p-6">
                  <h2 className="text-lg font-semibold text-white mb-3">{label}</h2>
                  <p className="text-white/60 leading-relaxed font-light">{content}</p>
                </section>
              )
            ))}
          </div>

          {/* Tech stack */}
          <div className="glass rounded-2xl border border-white/[0.08] p-6 mb-16">
            <h2 className="text-lg font-semibold text-white mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.04] text-white/70 border border-white/[0.06]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
