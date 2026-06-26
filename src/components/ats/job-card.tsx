import Link from "next/link";
import { ArrowUpRight, MapPin, Briefcase, Clock, DollarSign, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Job } from "@/types/ats";

interface JobCardProps {
  job: Job;
  variant?: "default" | "featured";
}

function formatSalary(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}/yr`;
  if (min) return `From ${fmt(min)}/yr`;
  if (max) return `Up to ${fmt(max)}/yr`;
  return null;
}

export function JobCard({ job, variant = "default" }: JobCardProps) {
  const salary = formatSalary(job.salary_min, job.salary_max);
  const isFeatured = variant === "featured" || job.featured;

  return (
    <Link
      href={`/careers/${job.slug}`}
      className={cn(
        "group flex items-start justify-between gap-4 rounded-2xl border p-5 transition-all duration-200",
        isFeatured
          ? "bg-white/[0.03] border-white/[0.10] hover:border-white/[0.20] hover:bg-white/[0.05]"
          : "bg-[#121212] border-white/[0.06] hover:border-white/[0.14] hover:bg-[#161616]"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          {isFeatured && (
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-widest text-amber-400/80 bg-amber-400/10 border border-amber-400/20 rounded-full px-2 py-0.5">
              <Star className="w-2.5 h-2.5" />
              Featured
            </span>
          )}
        </div>
        <h3 className="text-sm font-semibold text-white group-hover:text-white/80 transition-colors mb-2 leading-snug">
          {job.title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/35">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {job.department}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {job.employment_type}
          </span>
          {salary && (
            <span className="flex items-center gap-1 text-emerald-400/70">
              <DollarSign className="w-3 h-3" />
              {salary}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center shrink-0 mt-0.5">
        <div className="w-8 h-8 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center group-hover:border-white/[0.20] group-hover:bg-white/[0.07] transition-all duration-200">
          <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white/70 transition-colors" />
        </div>
      </div>
    </Link>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/[0.06] bg-[#121212] p-5 animate-pulse">
      <div className="flex-1 space-y-2.5">
        <div className="h-3.5 w-48 rounded bg-white/[0.06]" />
        <div className="flex gap-3">
          <div className="h-2.5 w-20 rounded bg-white/[0.04]" />
          <div className="h-2.5 w-16 rounded bg-white/[0.04]" />
          <div className="h-2.5 w-18 rounded bg-white/[0.04]" />
        </div>
      </div>
      <div className="w-8 h-8 rounded-xl bg-white/[0.04]" />
    </div>
  );
}
