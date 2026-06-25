import { constructMetadata } from "@/lib/metadata";
import { CtaSection } from "@/features/home/cta-section";
import { getBlogs } from "@/lib/data-fetcher";
import { BlogGrid } from "./blog-grid";

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
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 font-space-grotesk tracking-tight">Insights</h1>
          <p className="text-white/50 text-base sm:text-lg font-light leading-relaxed max-w-xl">
            Engineering insights, AI developments, and product thinking from the KrissDevHub team.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto max-w-4xl px-6 sm:px-10">
          <BlogGrid initialPosts={posts} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
