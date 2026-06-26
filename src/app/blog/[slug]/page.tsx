import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { getBlogBySlug, getBlogs } from "@/lib/data-fetcher";
import { constructMetadata } from "@/lib/metadata";
import { CtaSection } from "@/features/home/cta-section";

import { StructuredData } from "@/components/shared/structured-data";

interface BlogSlugParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogSlugParams) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) return constructMetadata({ title: "Article Not Found" });

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `https://krissdevhub.dev/blog/${slug}`,
  });
}

export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: BlogSlugParams) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "KrissDevHub Technologies",
      "logo": {
        "@type": "ImageObject",
        "url": "https://krissdevhub.dev/icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://krissdevhub.dev/blog/${slug}`
    }
  };

  // Fetch all posts to determine Next / Prev
  const allPosts = await getBlogs();
  const currentIdx = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIdx > 0 ? allPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < allPosts.length - 1 ? allPosts[currentIdx + 1] : null;

  // Custom visual block renderer for markdown fallback text
  const renderContent = (text: string) => {
    return text.split("\n\n").map((block, idx) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 font-space-grotesk tracking-tight">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg font-bold text-white mt-8 mb-3 font-space-grotesk">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").map((item) => item.replace(/^[-*]\s+/, ""));
        return (
          <ul key={idx} className="list-disc list-inside space-y-2 my-6 pl-4 text-white/50 text-sm font-light">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ul>
        );
      }
      if (trimmed.match(/^\d+\.\s+/)) {
        const items = trimmed.split("\n").map((item) => item.replace(/^\d+\.\s+/, ""));
        return (
          <ol key={idx} className="list-decimal list-inside space-y-2 my-6 pl-4 text-white/50 text-sm font-light">
            {items.map((item, i) => (
              <li key={i} className="leading-relaxed">{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <p key={idx} className="text-white/50 font-light text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <StructuredData schema={articleSchema} />
      <article className="min-h-screen pt-32 pb-20 bg-[#090909] text-white">
        <div className="mx-auto max-w-3xl px-6 sm:px-10">
          
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-12"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to insights
          </Link>

          {/* Article Header */}
          <header className="mb-12 border-b border-white/[0.06] pb-10">
            <div className="flex flex-wrap gap-1.5 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] px-2.5 py-0.5 rounded-md bg-white/[0.02] text-white/35 border border-white/[0.04] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 font-space-grotesk leading-[1.15]">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-xs text-white/40 font-mono">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-white/20" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-white/20" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-white/20" /> {post.readTime}
              </span>
            </div>
          </header>

          {/* Reading Column */}
          <div className="prose prose-invert max-w-none">
            {post.content ? renderContent(post.content) : (
              <p className="text-white/40 italic font-light">This article is currently a stub or draft.</p>
            )}
          </div>

          {/* Next & Previous Navigation links */}
          <div className="grid sm:grid-cols-2 gap-4 mt-20 pt-8 border-t border-white/[0.06]">
            {prevPost ? (
              <Link href={`/blog/${prevPost.slug}`} className="p-5 rounded-2xl bg-[#121212]/40 border border-white/[0.06] hover:border-white/[0.12] transition-all group flex flex-col justify-between text-left">
                <span className="text-[10px] uppercase font-mono text-white/30 mb-2 block">Previous Article</span>
                <span className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors font-space-grotesk leading-snug line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}

            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="p-5 rounded-2xl bg-[#121212]/40 border border-white/[0.06] hover:border-white/[0.12] transition-all group flex flex-col justify-between text-right">
                <span className="text-[10px] uppercase font-mono text-white/30 mb-2 block">Next Article</span>
                <span className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors font-space-grotesk leading-snug line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        </div>
      </article>

      <CtaSection />
    </>
  );
}
