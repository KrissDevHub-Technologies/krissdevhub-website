import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

  // Pick dynamic colors for visual flair matching V1
  const colorMap = slug.includes("neural")
    ? {
        gradient: "from-blue-600/20 via-purple-600/10 to-transparent",
        accent: "text-blue-400",
        border: "hover:border-blue-500/20",
        glow: "bg-blue-500/5",
      }
    : slug.includes("fleet")
    ? {
        gradient: "from-emerald-600/15 via-blue-600/10 to-transparent",
        accent: "text-emerald-400",
        border: "hover:border-emerald-500/20",
        glow: "bg-emerald-500/5",
      }
    : slug.includes("med")
    ? {
        gradient: "from-rose-600/15 via-purple-600/10 to-transparent",
        accent: "text-rose-400",
        border: "hover:border-rose-500/20",
        glow: "bg-rose-500/5",
      }
    : {
        gradient: "from-zinc-800/35 via-zinc-900/20 to-transparent",
        accent: "text-white",
        border: "hover:border-white/10",
        glow: "bg-white/5",
      };

  return (
    <>
      <article className="pt-24 pb-20 bg-[#090909] text-white">
        {/* Hero Banner */}
        <div className={`h-80 bg-gradient-to-b ${colorMap.gradient} relative overflow-hidden flex items-end pb-12`}>
          <div className="absolute inset-0 dot-grid opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] to-transparent" />
          <div className="mx-auto max-w-4xl w-full px-6 sm:px-10 relative z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 font-mono mb-3 block">
              {project.category} · {project.year}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2 font-space-grotesk">
              {project.title}
            </h1>
            <p className="text-white/60 text-sm sm:text-base font-light max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 sm:px-10 mt-6 relative z-10">
          {/* Back link */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to case studies
          </Link>

          {/* Quick Stats Panel */}
          <div className="glass rounded-2xl border border-white/[0.06] p-6 mb-10 bg-[#121212]/50">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Timeline</span>
                <span className="text-sm font-bold text-white font-space-grotesk">{project.timeline || "8 weeks"}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Sector</span>
                <span className="text-sm font-bold text-white font-space-grotesk">{project.category}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Core Tech</span>
                <span className="text-sm font-bold text-white font-space-grotesk">{project.tech[0]}</span>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[10px] text-white/30 uppercase block mb-1">Primary Outcome</span>
                <span className="text-sm font-bold text-white font-space-grotesk">{project.metric}</span>
              </div>
            </div>
          </div>

          {/* Overview, Challenge, Solution, Results */}
          <div className="space-y-6 mb-12">
            {[
              { title: "Project Overview", content: project.longDescription || project.description },
              { title: "The Client Challenge", content: project.challenge },
              { title: "Our Solution", content: project.solution },
              { title: "The Business Results", content: project.results },
            ].map(({ title, content }) => (
              content && (
                <section key={title} className="p-8 rounded-2xl bg-[#111111]/80 border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-200">
                  <h2 className="text-lg font-bold text-white font-space-grotesk mb-4">{title}</h2>
                  <p className="text-white/50 text-sm leading-relaxed font-light whitespace-pre-line">{content}</p>
                </section>
              )
            ))}
          </div>

          {/* Systems Architecture Diagram (SVG-based Network Graphic) */}
          {project.architecture_nodes && project.architecture_nodes.length > 0 && (
            <section className="p-8 rounded-2xl bg-[#111111]/80 border border-white/[0.06] mb-12 overflow-hidden">
              <h2 className="text-lg font-bold text-white font-space-grotesk mb-2">Systems Architecture Overview</h2>
              <p className="text-xs text-white/45 mb-8 font-light">{project.architecture_description}</p>
              
              <div className="w-full overflow-x-auto border border-white/[0.04] bg-[#0c0c0c] rounded-xl p-6 flex justify-center">
                <div className="w-[600px] h-[300px] relative flex-shrink-0">
                  <svg className="w-full h-full" viewBox="0 0 650 300">
                    <defs>
                      <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 1 L 10 5 L 0 9 z" fill="rgba(255,255,255,0.25)" />
                      </marker>
                    </defs>
                    
                    {/* Render connection lines */}
                    {project.architecture_edges?.map((edge, idx) => {
                      const fromNode = project.architecture_nodes?.find(n => n.id === edge.from);
                      const toNode = project.architecture_nodes?.find(n => n.id === edge.to);
                      if (!fromNode || !toNode) return null;
                      return (
                        <g key={idx}>
                          <line
                            x1={fromNode.x + 60}
                            y1={fromNode.y + 20}
                            x2={toNode.x + 60}
                            y2={toNode.y + 20}
                            stroke="rgba(255,255,255,0.08)"
                            strokeWidth="1.5"
                            markerEnd="url(#arrow)"
                            strokeDasharray="4 4"
                          />
                          <text
                            x={(fromNode.x + toNode.x) / 2 + 60}
                            y={(fromNode.y + toNode.y) / 2 + 15}
                            fill="rgba(255,255,255,0.3)"
                            fontSize="8"
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {edge.label}
                          </text>
                        </g>
                      );
                    })}
                    
                    {/* Render node boxes */}
                    {project.architecture_nodes?.map((node) => (
                      <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                        <rect
                          width="120"
                          height="40"
                          rx="8"
                          fill="#161616"
                          stroke="rgba(255,255,255,0.08)"
                          strokeWidth="1"
                        />
                        <text
                          x="60"
                          y="24"
                          fill="rgba(255,255,255,0.85)"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor="middle"
                          fontFamily="Space Grotesk"
                        >
                          {node.label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </section>
          )}

          {/* Key Features Showcase */}
          {project.key_features && project.key_features.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-bold text-white font-space-grotesk mb-6">Key Engineering Features</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {project.key_features.map((feature, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#111111]/80 border border-white/[0.06] flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2 font-space-grotesk">{feature.title}</h3>
                      <p className="text-xs text-white/45 leading-relaxed font-light">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tech Stack List */}
          <section className="p-6 rounded-2xl bg-[#111111]/80 border border-white/[0.06] mb-12">
            <h2 className="text-lg font-bold text-white font-space-grotesk mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.03] text-white/60 border border-white/[0.06] font-mono"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {/* Gallery Mockups */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="mb-12">
              <h2 className="text-lg font-bold text-white font-space-grotesk mb-6">Product Gallery & UI States</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {project.key_features?.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="aspect-video rounded-xl bg-[#0c0c0c] border border-white/[0.06] relative overflow-hidden flex flex-col justify-between p-4 group hover:border-white/[0.12] transition-colors">
                    <div className="absolute inset-0 dot-grid opacity-10" />
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                      </div>
                      <span className="text-[8px] font-mono text-white/30 uppercase">ui_state_{idx + 1}.json</span>
                    </div>
                    
                    <div className="my-auto text-center py-2">
                      <span className="text-[10px] font-mono text-white/40 block mb-1">{feat.title}</span>
                      <span className="text-[18px] font-bold font-space-grotesk text-white">
                        {idx === 0 ? "99.98% OK" : idx === 1 ? "245ms LATENCY" : "ACTIVE ROUTE"}
                      </span>
                    </div>

                    <div className="bg-white/[0.02] border border-white/[0.04] p-1.5 rounded-md text-[8px] font-mono text-white/20 text-left">
                      // system log active verification
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Case Study Call to Action */}
          <section className={`p-8 rounded-2xl bg-gradient-to-r ${colorMap.gradient} border border-white/[0.08] text-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-[#121212]/90 mix-blend-multiply" />
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-white font-space-grotesk mb-2">
                Need a similar platform built?
              </h2>
              <p className="text-xs text-white/40 mb-6 font-light">
                Let&apos;s build a custom AI platform, SaaS dashboard, or secure automation system for your organization.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
              >
                Discuss {project.category} Requirements
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </section>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
