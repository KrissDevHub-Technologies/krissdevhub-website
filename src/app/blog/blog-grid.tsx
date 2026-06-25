"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/data-fetcher";

interface BlogGridProps {
  initialPosts: BlogPost[];
}

export function BlogGrid({ initialPosts }: BlogGridProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  // Compile list of unique tags for the filter bar
  const tags = ["All", ...Array.from(new Set(initialPosts.flatMap((post) => post.tags)))];

  const filteredPosts =
    selectedTag === "All"
      ? initialPosts
      : initialPosts.filter((post) => post.tags.includes(selectedTag));

  return (
    <div className="space-y-10">
      {/* Tags Filter Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.04] pb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
              selectedTag === tag
                ? "border-white bg-white text-black font-semibold"
                : "border-white/[0.06] bg-white/[0.02] text-white/40 hover:text-white hover:border-white/10"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts list */}
      <motion.div layout className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              key={post.slug}
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap gap-1.5">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] px-2 py-0.5 rounded-md bg-white/[0.02] text-white/35 border border-white/[0.04] font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg font-bold text-white group-hover:text-white/80 transition-colors font-space-grotesk">
                      {post.title}
                    </h2>
                    <p className="text-xs text-white/45 leading-relaxed font-light">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] text-white/30 pt-1">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-white/20 group-hover:text-white/60 transition-colors hidden sm:block">
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
