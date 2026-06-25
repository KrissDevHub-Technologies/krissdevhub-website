import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";
import { getCareerBySlug, getCareers } from "@/lib/data-fetcher";

import { ApplicationForm } from "../application-form";

// Generate metadata for each position dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getCareerBySlug(slug);
  if (!role) return constructMetadata({ title: "Job Not Found" });
  return constructMetadata({
    title: role.title,
    description: role.description?.slice(0, 160) || "",
    canonical: `https://krissdevhub.com/careers/${slug}`,
  });
}

export async function generateStaticParams() {
  const roles = await getCareers();
  return roles.map((r) => ({ slug: r.slug }));
}

import { StructuredData } from "@/components/shared/structured-data";

export default async function CareerDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = await getCareerBySlug(slug);
  if (!role) notFound();

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": role.title,
    "description": role.description,
    "datePosted": new Date().toISOString(),
    "employmentType": role.type === "Full-time" ? "FULL_TIME" : "CONTRACT",
    "jobLocationType": "TELECOMMUTE",
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      }
    },
    "hiringOrganization": {
      "@type": "Organization",
      "name": "KrissDevHub Technologies",
      "sameAs": "https://krissdevhub.com"
    },
    "baseSalary": role.salary_range ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": role.salary_range,
        "unitText": "YEAR"
      }
    } : undefined
  };

  // If there are responsibilities/nice lists in the role (e.g. from fallbacks), use them.
  // Otherwise, default to requirements.
  const responsibilities = "responsibilities" in role ? (role as { responsibilities: string[] }).responsibilities : [];
  const requirements = role.requirements || [];
  const nice = "nice" in role ? (role as { nice: string[] }).nice : [];

  return (
    <>
      <StructuredData schema={jobSchema} />
      <div className="min-h-screen pt-24 pb-32 bg-[#090909]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/careers" className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors mb-8">
          <ArrowLeft className="w-3.5 h-3.5" /> All positions
        </Link>

        <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
          <h1 className="text-3xl font-bold text-white mb-3 font-space-grotesk tracking-tight">{role.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-white/40 mb-6 font-mono">
            <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {role.department}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {role.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {role.type}</span>
            {role.salary_range && <span className="text-white/30">| {role.salary_range}</span>}
          </div>
          <p className="text-white/60 leading-relaxed font-light text-sm">{role.description}</p>
        </div>

        {[
          { title: "What you'll do", items: responsibilities },
          { title: "What we're looking for", items: requirements },
          { title: "Nice to have", items: nice },
        ].map(({ title, items }) => (
          items && items.length > 0 && (
            <div key={title} className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 font-space-grotesk">{title}</h2>
              <ul className="list-disc list-inside space-y-2 text-white/60 font-light text-sm">
                {items.map((item: string) => (
                  <li key={item} className="leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>
          )
        ))}

        <ApplicationForm roleSlug={role.slug} roleTitle={role.title} />
        </div>
      </div>
    </>
  );
}
