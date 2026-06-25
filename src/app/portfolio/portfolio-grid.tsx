"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/data-fetcher";

interface PortfolioGridProps {
  initialProjects: Project[];
}

export function PortfolioGrid({ initialProjects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  // Compile list of unique categories
  const categories = ["All", ...Array.from(new Set(initialProjects.map((p) => p.category)))];

  // Filter projects based on choice
  const filteredProjects =
    activeCategory === "All"
      ? initialProjects
      : initialProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12">
      {/* Category filters bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/[0.04] pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-full border transition-all relative ${
              activeCategory === cat
                ? "border-white bg-white text-black font-semibold"
                : "border-white/[0.06] bg-white/[0.02] text-white/50 hover:text-white hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.slug}
              className="h-full"
            >
              <Link href={`/case-studies/${project.slug}`} className="block group h-full">
                <article className="h-full rounded-2xl border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover overflow-hidden bg-[#121212] flex flex-col justify-between">
                  {/* Visual Header Grid Pattern */}
                  <div className="h-32 bg-[#161616] border-b border-white/[0.06] relative overflow-hidden flex items-end p-4">
                    <div className="absolute inset-0 dot-grid opacity-20" />
                    <div className="absolute inset-0 line-grid opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/80 to-transparent" />
                    
                    <span className="text-[10px] font-mono text-white/40 bg-black/60 px-2.5 py-1 rounded-sm border border-white/[0.06] relative z-10">
                      {project.category}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h2 className="text-lg font-bold text-white group-hover:text-white/80 transition-colors font-space-grotesk">
                          {project.title}
                        </h2>
                        <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white/60 flex-shrink-0 mt-1 transition-colors" />
                      </div>

                      <p className="text-xs text-white/45 leading-relaxed mb-5 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div>
                      {/* Metric widgets */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div
                            key={m.label}
                            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-center"
                          >
                            <div className="text-base font-bold text-white font-space-grotesk">{m.value}</div>
                            <div className="text-[10px] text-white/30 mt-0.5 leading-tight">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-white/[0.02] text-white/35 border border-white/[0.04] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
