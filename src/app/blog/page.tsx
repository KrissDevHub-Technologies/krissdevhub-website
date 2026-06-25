import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";
import { CtaSection } from "@/features/home/cta-section";
import { getBlogs } from "@/lib/data-fetcher";

export const metadata = constructMetadata({
  title: "Blog",
  description:
    "Insights on AI development, SaaS engineering, and building software that scales — from the KrissDevHub Technologies team.",
  canonical: "https://krissdevhub.com/blog",
});

export default async function BlogPage() {
  const posts = await getBlogs();
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">Insights</h1>
          <p className="text-white/50 text-lg">
            Engineering insights, AI learnings, and product thinking from the KrissDevHub team.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <article className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 card-hover">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-0.5 rounded-md bg-white/[0.04] text-white/40 border border-white/[0.06] font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl font-semibold text-white group-hover:text-white/80 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-white/30">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
