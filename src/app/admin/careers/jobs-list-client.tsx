"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Users,
  Globe,
  EyeOff,
  X,
  Loader2,
  Briefcase,
} from "lucide-react";
import { JobStatusBadge } from "@/components/ats/status-badge";
import { EmptyState } from "@/components/ats/empty-state";
import { deleteJob, duplicateJob, updateJob } from "@/lib/ats/jobs";
import type { Job } from "@/types/ats";

interface Props {
  initialJobs: (Job & { candidate_count: number })[];
}

export function JobsListClient({ initialJobs }: Props) {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "draft" | "closed">("all");
  const [isPending, startTransition] = useTransition();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  const filtered = jobs.filter((j) => {
    const matchesSearch =
      !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    if (!confirm("Delete this job? This cannot be undone.")) return;
    setDeletingId(id);
    startTransition(async () => {
      const result = await deleteJob(id);
      if (result.success) {
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        alert(result.error || "Failed to delete job.");
      }
      setDeletingId(null);
    });
  };

  const handleDuplicate = (id: string) => {
    startTransition(async () => {
      const result = await duplicateJob(id);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.error || "Failed to duplicate job.");
      }
    });
  };

  const handleStatusChange = (
    id: string,
    status: "open" | "draft" | "closed"
  ) => {
    startTransition(async () => {
      const result = await updateJob(id, { status });
      if (result.success) {
        setJobs((prev) =>
          prev.map((j) => (j.id === id ? { ...j, status } : j))
        );
      }
    });
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white font-space-grotesk">
            Job Postings
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            {jobs.filter((j) => j.status === "open").length} open ·{" "}
            {jobs.length} total
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          New Job
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "open", "draft", "closed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-[11px] font-medium capitalize transition-all ${
                statusFilter === s
                  ? "bg-white/[0.10] text-white border border-white/[0.15]"
                  : "text-white/40 hover:text-white/70 border border-transparent hover:border-white/[0.08]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs found"
          description={
            search
              ? "No jobs match your search."
              : "Post your first job to start receiving applications."
          }
          action={
            !search ? (
              <Link
                href="/admin/careers/new"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/60 text-xs hover:bg-white/[0.10] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Post a job
              </Link>
            ) : (
              <button
                onClick={() => setSearch("")}
                className="text-xs text-white/40 hover:text-white/70"
              >
                Clear search
              </button>
            )
          }
        />
      ) : (
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  {["Title", "Department", "Location", "Type", "Applications", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-[10px] font-semibold text-white/25 uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                <AnimatePresence mode="popLayout">
                  {filtered.map((job) => (
                    <motion.tr
                      key={job.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/admin/careers/${job.id}`}
                          className="font-medium text-white/80 hover:text-white transition-colors"
                        >
                          {job.title}
                        </Link>
                        {job.featured && (
                          <span className="ml-2 text-[9px] text-amber-400/70 bg-amber-400/10 border border-amber-400/20 rounded-full px-1.5 py-0.5">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3.5 text-white/45">
                        {job.department}
                      </td>
                      <td className="px-4 py-3.5 text-white/45">
                        {job.location}
                      </td>
                      <td className="px-4 py-3.5 text-white/45">
                        {job.employment_type}
                      </td>
                      <td className="px-4 py-3.5">
                        <Link
                          href={`/admin/applications?job=${job.id}`}
                          className="inline-flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors"
                        >
                          <Users className="w-3 h-3" />
                          <span className="font-mono">{job.candidate_count}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5">
                        <JobStatusBadge status={job.status} />
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            href={`/admin/careers/${job.id}`}
                            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white/80 transition-all"
                            title="Edit"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </Link>

                          {job.status === "draft" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "open")}
                              disabled={isPending}
                              className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-white/40 hover:text-emerald-400 transition-all"
                              title="Publish"
                            >
                              <Globe className="w-3.5 h-3.5" />
                            </button>
                          ) : job.status === "open" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "closed")}
                              disabled={isPending}
                              className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                              title="Close"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleStatusChange(job.id, "draft")}
                              disabled={isPending}
                              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white/80 transition-all"
                              title="Reopen as draft"
                            >
                              <EyeOff className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <button
                            onClick={() => handleDuplicate(job.id)}
                            disabled={isPending}
                            className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/40 hover:text-white/80 transition-all"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(job.id)}
                            disabled={isPending || deletingId === job.id}
                            className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                            title="Delete"
                          >
                            {deletingId === job.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
