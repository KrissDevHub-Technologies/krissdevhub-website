import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";
import { getJobBySlug } from "@/lib/ats/jobs";
import { ApplicationFormFull } from "./application-form-full";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return constructMetadata({ title: "Apply — Job Not Found" });
  return constructMetadata({
    title: `Apply — ${job.title}`,
    description: `Apply for the ${job.title} position at KrissDevHub Technologies.`,
    canonical: `https://krissdevhub.com/careers/${slug}/apply`,
  });
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  return (
    <div className="min-h-screen pt-24 pb-32 bg-[#090909]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/careers/${slug}`}
          className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to job details
        </Link>

        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-widest text-white/30 font-mono mb-2 block">
            Application
          </span>
          <h1 className="text-3xl font-bold text-white font-space-grotesk">
            {job.title}
          </h1>
          <p className="text-sm text-white/40 mt-1">
            {job.department} · {job.location} · {job.employment_type}
          </p>
        </div>

        <ApplicationFormFull job={job} />
      </div>
    </div>
  );
}
