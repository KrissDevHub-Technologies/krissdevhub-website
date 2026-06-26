"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Download,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { CandidateStatusBadge } from "@/components/ats/status-badge";
import { EmptyState } from "@/components/ats/empty-state";
import { updateCandidateStatus } from "@/lib/ats/candidates";
import type { Candidate, CandidateStatus } from "@/types/ats";
import { formatDate } from "@/lib/utils";

const ALL_STATUSES: (CandidateStatus | "all")[] = [
  "all",
  "Applied",
  "Screening",
  "Interview",
  "Shortlisted",
  "Talent Pool",
  "Offer",
  "Hired",
  "Rejected",
  "On Hold",
];

interface Props {
  initialCandidates: Candidate[];
  total: number;
  page: number;
  jobs: { id: string; title: string }[];
}

export function ApplicationsClient({ initialCandidates, total, page, jobs }: Props) {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const currentStatus = sp.get("status") ?? "all";
  const currentJob = sp.get("job") ?? "";
  const pageSize = 12;
  const totalPages = Math.ceil(total / pageSize);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(sp.toString());
    if (value && value !== "all" && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleStatusChange = (candidateId: string, status: CandidateStatus) => {
    setUpdatingId(candidateId);
    startTransition(async () => {
      const result = await updateCandidateStatus(candidateId, status);
      if (result.success) {
        setCandidates((prev) =>
          prev.map((c) => (c.id === candidateId ? { ...c, status } : c))
        );
      }
      setUpdatingId(null);
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white font-space-grotesk">
            Applications
          </h1>
          <p className="text-xs text-white/40 mt-0.5">{total} total candidates</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <select
            value={currentJob}
            onChange={(e) => updateFilter("job", e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none"
          >
            <option value="" className="bg-[#1a1a1a]">
              All Jobs
            </option>
            {jobs.map((j) => (
              <option key={j.id} value={j.id} className="bg-[#1a1a1a]">
                {j.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_STATUSES.slice(0, 6).map((s) => (
            <button
              key={s}
              onClick={() => updateFilter("status", s)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium capitalize transition-all border ${
                currentStatus === s
                  ? "bg-white/[0.10] text-white border-white/[0.20]"
                  : "text-white/35 border-transparent hover:border-white/[0.08] hover:text-white/60"
              }`}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {candidates.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applications found"
          description="No candidates match the current filters."
        />
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {[
                    "Candidate",
                    "Job",
                    "Applied",
                    "Experience",
                    "Location",
                    "Expected CTC",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-semibold text-white/25 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {candidates.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Candidate */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-white/50">
                            {c.full_name[0]?.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <Link
                            href={`/admin/applications/${c.id}`}
                            className="font-medium text-white/80 hover:text-white transition-colors"
                          >
                            {c.full_name}
                          </Link>
                          <p className="text-[10px] text-white/30 truncate max-w-[140px]">
                            {c.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Job */}
                    <td className="px-4 py-3.5 text-white/45 max-w-[140px]">
                      <span className="truncate block">{c.job?.title ?? "—"}</span>
                    </td>

                    {/* Applied */}
                    <td className="px-4 py-3.5 text-white/40 whitespace-nowrap">
                      {formatDate(c.applied_at)}
                    </td>

                    {/* Experience */}
                    <td className="px-4 py-3.5 text-white/45">
                      {c.experience_years != null
                        ? `${c.experience_years}y`
                        : "—"}
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3.5 text-white/45 max-w-[120px]">
                      <span className="truncate block">{c.location ?? "—"}</span>
                    </td>

                    {/* Expected CTC */}
                    <td className="px-4 py-3.5 text-white/45">
                      {c.expected_ctc ?? "—"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          handleStatusChange(c.id, e.target.value as CandidateStatus)
                        }
                        disabled={updatingId === c.id || isPending}
                        className="text-[10px] bg-transparent border border-white/[0.08] rounded-lg px-2 py-1 text-white/70 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:opacity-50 cursor-pointer"
                      >
                        {ALL_STATUSES.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s} className="bg-[#1a1a1a] text-white">
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/admin/applications/${c.id}`}
                          className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/35 hover:text-white/80 transition-all"
                          title="View profile"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        {c.resume_file && (
                          <Link
                            href={`/api/ats/resume-download?path=${encodeURIComponent(c.resume_file)}`}
                            target="_blank"
                            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/35 hover:text-white/80 transition-all"
                            title="Download resume"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.06]">
              <span className="text-[10px] text-white/30">
                Page {page} of {totalPages} · {total} total
              </span>
              <div className="flex gap-1.5">
                <button
                  disabled={page <= 1}
                  onClick={() => updateFilter("page", String(page - 1))}
                  className="p-1.5 rounded-lg border border-white/[0.08] text-white/35 hover:text-white/70 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => updateFilter("page", String(page + 1))}
                  className="p-1.5 rounded-lg border border-white/[0.08] text-white/35 hover:text-white/70 disabled:opacity-30 transition-all"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
