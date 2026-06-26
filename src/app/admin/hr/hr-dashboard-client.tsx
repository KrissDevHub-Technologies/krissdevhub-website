"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Star,
  TrendingUp,
  UserCheck,
  Award,
  PlusCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import type {
  ATSStats,
  DailyApplicationCount,
  FunnelStage,
  Candidate,
} from "@/types/ats";
import type { Job } from "@/types/ats";
import { CandidateStatusBadge, JobStatusBadge } from "@/components/ats/status-badge";
import { formatDate } from "@/lib/utils";

interface Props {
  stats: ATSStats;
  appsPerDay: DailyApplicationCount[];
  funnel: FunnelStage[];
  topJobs: { job_title: string; count: number }[];
  recentCandidates: Candidate[];
  recentJobs: (Job & { candidate_count: number })[];
}

const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

export function HRDashboardClient({
  stats,
  appsPerDay,
  funnel,
  topJobs,
  recentCandidates,
  recentJobs,
}: Props) {
  const statCards = [
    {
      label: "Total Jobs",
      value: stats.total_jobs,
      icon: Briefcase,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      label: "Open Jobs",
      value: stats.open_jobs,
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      label: "Applications",
      value: stats.total_applications,
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
    },
    {
      label: "Today",
      value: stats.applications_today,
      icon: PlusCircle,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      label: "Shortlisted",
      value: stats.shortlisted,
      icon: Star,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Talent Pool",
      value: stats.talent_pool,
      icon: UserCheck,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      label: "Offers",
      value: stats.offers,
      icon: Award,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
      border: "border-pink-500/20",
    },
    {
      label: "Hired",
      value: stats.hired,
      icon: CheckCircle,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
  ];

  // Calculate max for chart
  const maxApps = Math.max(...appsPerDay.map((d) => d.count), 1);
  const maxFunnel = Math.max(...funnel.map((f) => f.count), 1);

  return (
    <div className="p-6 lg:p-8 space-y-8 min-h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white font-space-grotesk">
            HR Dashboard
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            Applicant tracking overview
          </p>
        </div>
        <Link
          href="/admin/careers/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          Post a Job
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={CARD_VARIANTS}
              className="rounded-2xl border border-white/[0.06] bg-[#111] p-4 hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-medium">
                  {card.label}
                </span>
                <div
                  className={`w-7 h-7 rounded-lg ${card.bg} border ${card.border} flex items-center justify-center`}
                >
                  <Icon className={`w-3.5 h-3.5 ${card.color}`} />
                </div>
              </div>
              <span className="text-2xl font-bold text-white font-space-grotesk">
                {card.value}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Applications per day */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Applications — Last 7 Days
          </h2>
          <div className="flex items-end gap-1.5 h-32">
            {appsPerDay.map((day) => {
              const pct = maxApps > 0 ? (day.count / maxApps) * 100 : 0;
              const label = new Date(day.date).toLocaleDateString("en-US", {
                weekday: "short",
              });
              return (
                <div
                  key={day.date}
                  className="flex-1 flex flex-col items-center gap-1.5"
                  title={`${day.count} application${day.count !== 1 ? "s" : ""}`}
                >
                  <div
                    className="w-full rounded-t-md bg-violet-500/50 hover:bg-violet-500/80 transition-all"
                    style={{ height: `${Math.max(pct, 4)}%` }}
                  />
                  <span className="text-[9px] text-white/25">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hiring Funnel */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Hiring Funnel
          </h2>
          <div className="space-y-2.5">
            {funnel.map((stage) => {
              const pct = maxFunnel > 0 ? (stage.count / maxFunnel) * 100 : 0;
              return (
                <div key={stage.stage} className="flex items-center gap-3">
                  <span className="text-[10px] text-white/40 w-20 shrink-0 text-right">
                    {stage.stage}
                  </span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: stage.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                    />
                  </div>
                  <span className="text-[10px] text-white/50 w-6 text-right font-mono">
                    {stage.count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Top Applied Jobs */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
          <h2 className="text-sm font-semibold text-white mb-4">
            Top Applied Roles
          </h2>
          {topJobs.length === 0 ? (
            <p className="text-xs text-white/25 text-center py-6">No data yet</p>
          ) : (
            <div className="space-y-2.5">
              {topJobs.map((job, i) => (
                <div key={job.job_title} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-white/20 w-4">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-xs text-white/60 truncate">
                    {job.job_title}
                  </span>
                  <span className="text-xs font-semibold text-white/80">
                    {job.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Candidates */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">
              Recent Applications
            </h2>
            <Link
              href="/admin/applications"
              className="text-[10px] text-white/30 hover:text-white/70 flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentCandidates.length === 0 ? (
            <p className="text-xs text-white/25 text-center py-6">
              No applications yet
            </p>
          ) : (
            <div className="space-y-2">
              {recentCandidates.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/applications/${c.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-white/60">
                      {c.full_name[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-white truncate">
                      {c.full_name}
                    </p>
                    <p className="text-[10px] text-white/35 truncate">
                      {c.job?.title ?? "—"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <CandidateStatusBadge status={c.status} />
                    <span className="text-[9px] text-white/20 hidden sm:block">
                      {formatDate(c.applied_at)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Recent Job Postings</h2>
          <Link
            href="/admin/careers"
            className="text-[10px] text-white/30 hover:text-white/70 flex items-center gap-1 transition-colors"
          >
            Manage jobs <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {recentJobs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xs text-white/25 mb-3">No jobs posted yet</p>
            <Link
              href="/admin/careers/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] text-white/60 text-xs hover:bg-white/[0.10] transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post your first job
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Title", "Department", "Location", "Status", "Applications"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-left text-[10px] font-medium text-white/25 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {recentJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/admin/careers/${job.id}`}
                        className="text-white/70 hover:text-white transition-colors font-medium"
                      >
                        {job.title}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-white/40">{job.department}</td>
                    <td className="py-3 pr-4 text-white/40">{job.location}</td>
                    <td className="py-3 pr-4">
                      <JobStatusBadge status={job.status} />
                    </td>
                    <td className="py-3 text-white/60 font-mono">
                      {job.candidate_count}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
