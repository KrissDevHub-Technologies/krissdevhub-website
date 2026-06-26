import { cn } from "@/lib/utils";
import type { CandidateStatus, JobStatus } from "@/types/ats";

// ─── Candidate Status ─────────────────────────────────────────────────────────

const CANDIDATE_STATUS_CONFIG: Record<
  CandidateStatus,
  { label: string; className: string }
> = {
  Applied: {
    label: "Applied",
    className: "bg-slate-500/15 text-slate-300 border-slate-500/25",
  },
  Screening: {
    label: "Screening",
    className: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  },
  Interview: {
    label: "Interview",
    className: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  },
  Shortlisted: {
    label: "Shortlisted",
    className: "bg-blue-500/15 text-blue-300 border-blue-500/25",
  },
  "Talent Pool": {
    label: "Talent Pool",
    className: "bg-amber-500/15 text-amber-300 border-amber-500/25",
  },
  Offer: {
    label: "Offer",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  },
  Hired: {
    label: "Hired",
    className: "bg-green-500/15 text-green-300 border-green-500/25",
  },
  Rejected: {
    label: "Rejected",
    className: "bg-red-500/15 text-red-300 border-red-500/25",
  },
  "On Hold": {
    label: "On Hold",
    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
  },
};

const JOB_STATUS_CONFIG: Record<
  JobStatus,
  { label: string; className: string; dot: string }
> = {
  open: {
    label: "Open",
    className: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    dot: "bg-emerald-400",
  },
  draft: {
    label: "Draft",
    className: "bg-zinc-500/15 text-zinc-400 border-zinc-500/25",
    dot: "bg-zinc-400",
  },
  closed: {
    label: "Closed",
    className: "bg-red-500/15 text-red-300 border-red-500/25",
    dot: "bg-red-400",
  },
};

interface CandidateStatusBadgeProps {
  status: CandidateStatus;
  className?: string;
  size?: "sm" | "md";
}

export function CandidateStatusBadge({
  status,
  className,
  size = "sm",
}: CandidateStatusBadgeProps) {
  const config = CANDIDATE_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}

interface JobStatusBadgeProps {
  status: JobStatus;
  className?: string;
  showDot?: boolean;
}

export function JobStatusBadge({
  status,
  className,
  showDot = true,
}: JobStatusBadgeProps) {
  const config = JOB_STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
        config.className,
        className
      )}
    >
      {showDot && (
        <span
          className={cn(
            "inline-block h-1.5 w-1.5 rounded-full",
            config.dot,
            status === "open" && "animate-pulse"
          )}
        />
      )}
      {config.label}
    </span>
  );
}
