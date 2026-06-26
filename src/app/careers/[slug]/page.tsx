import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import { constructMetadata } from "@/lib/metadata";
import { getJobBySlug, getRelatedJobs } from "@/lib/ats/jobs";
import { JobCard } from "@/components/ats/job-card";
import { StructuredData } from "@/components/shared/structured-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) return constructMetadata({ title: "Job Not Found" });
  return constructMetadata({
    title: job.title,
    description: job.description?.slice(0, 160) || "",
    canonical: `https://krissdevhub.dev/careers/${slug}`,
  });
}

function formatSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)} / year`;
  if (min) return `From ${fmt(min)} / year`;
  if (max) return `Up to ${fmt(max)} / year`;
  return null;
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const relatedJobs = await getRelatedJobs(job.id, job.department, 3);
  const salary = formatSalary(job.salary_min, job.salary_max);

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.created_at,
    employmentType: job.employment_type === "Full-time" ? "FULL_TIME" : "CONTRACT",
    jobLocationType: "TELECOMMUTE",
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "KrissDevHub Technologies",
      sameAs: "https://krissdevhub.dev",
    },
    ...(job.salary_min && {
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          minValue: job.salary_min,
          maxValue: job.salary_max ?? job.salary_min,
          unitText: "YEAR",
        },
      },
    }),
  };

  return (
    <>
      <StructuredData schema={jobSchema} />
      <div className="min-h-screen pt-24 pb-32 bg-[#090909]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All positions
          </Link>

          {/* Header */}
          <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
            {job.featured && (
              <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-3 py-1 mb-4">
                <Star className="w-3 h-3" />
                Featured Role
              </div>
            )}
            <h1 className="text-3xl font-bold text-white mb-3 font-space-grotesk tracking-tight">
              {job.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 mb-6 font-mono">
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> {job.department}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {job.employment_type}
              </span>
              {salary && (
                <span className="flex items-center gap-1.5 text-emerald-400/80">
                  <DollarSign className="w-3.5 h-3.5" /> {salary}
                </span>
              )}
            </div>
            <p className="text-white/60 leading-relaxed font-light text-sm whitespace-pre-line">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 font-space-grotesk">
                What you&apos;ll do
              </h2>
              <ul className="space-y-2.5">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 font-space-grotesk">
                What we&apos;re looking for
              </h2>
              <ul className="space-y-2.5">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-white/20 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 font-space-grotesk">
                Benefits &amp; Perks
              </h2>
              <ul className="space-y-2.5">
                {job.benefits.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 text-emerald-500/50 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Apply CTA */}
          <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-8 text-center">
            <h2 className="text-2xl font-bold text-white font-space-grotesk mb-2">
              Ready to apply?
            </h2>
            <p className="text-sm text-white/45 mb-6">
              Takes about 5 minutes. We review every application personally.
            </p>
            <Link
              href={`/careers/${job.slug}/apply`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              Apply for this position
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Jobs */}
          {relatedJobs.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-white font-space-grotesk mb-4">
                Similar roles
              </h2>
              <div className="space-y-2.5">
                {relatedJobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
