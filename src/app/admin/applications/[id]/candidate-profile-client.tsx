"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Globe,
  Mail,
  Phone,
  MapPin,
  Download,
  Save,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { CandidateStatusBadge } from "@/components/ats/status-badge";
import { updateCandidateStatus, addCandidateNote } from "@/lib/ats/candidates";
import type { Candidate, CandidateStatus } from "@/types/ats";
import { formatDate } from "@/lib/utils";

const ALL_STATUSES: CandidateStatus[] = [
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
  candidate: Candidate;
  adminEmail: string;
}

export function CandidateProfileClient({ candidate: initial, adminEmail }: Props) {
  const [candidate, setCandidate] = useState(initial);
  const [notes, setNotes] = useState(initial.notes ?? "");
  const [notesSaved, setNotesSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (status: CandidateStatus) => {
    startTransition(async () => {
      const result = await updateCandidateStatus(candidate.id, status);
      if (result.success) {
        setCandidate((prev) => ({ ...prev, status }));
      }
    });
  };

  const handleSaveNotes = () => {
    startTransition(async () => {
      const result = await addCandidateNote(candidate.id, notes);
      if (result.success) {
        setNotesSaved(true);
        setTimeout(() => setNotesSaved(false), 2000);
      }
    });
  };

  const statusHistory = Array.isArray(candidate.status_history)
    ? candidate.status_history
    : [];

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-5xl">
      {/* Back */}
      <Link
        href="/admin/applications"
        className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to applications
      </Link>

      {/* Profile Header */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-white/50">
              {candidate.full_name[0]?.toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
              <div>
                <h1 className="text-xl font-bold text-white font-space-grotesk">
                  {candidate.full_name}
                </h1>
                {candidate.current_company && (
                  <p className="text-sm text-white/45 mt-0.5">
                    {candidate.current_company}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <CandidateStatusBadge status={candidate.status} size="md" />
                {candidate.resume_file && (
                  <a
                    href={`/api/ats/resume-download?path=${encodeURIComponent(candidate.resume_file)}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/[0.16] text-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Resume
                  </a>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/40">
              <a
                href={`mailto:${candidate.email}`}
                className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
              >
                <Mail className="w-3 h-3" />
                {candidate.email}
              </a>
              {candidate.phone && (
                <a
                  href={`tel:${candidate.phone}`}
                  className="flex items-center gap-1.5 hover:text-white/70 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  {candidate.phone}
                </a>
              )}
              {candidate.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  {candidate.location}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-2 mt-3">
              {candidate.github_url && (
                <a
                  href={candidate.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.16] text-[11px] transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  GitHub
                </a>
              )}
              {candidate.linkedin_url && (
                <a
                  href={candidate.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.16] text-[11px] transition-all"
                >
                  <ExternalLink className="w-3 h-3" />
                  LinkedIn
                </a>
              )}
              {candidate.portfolio_url && (
                <a
                  href={candidate.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/[0.16] text-[11px] transition-all"
                >
                  <Globe className="w-3 h-3" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Application Details */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-white/[0.06]">
              Application Details
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Applied For", value: candidate.job?.title ?? "—" },
                {
                  label: "Experience",
                  value:
                    candidate.experience_years != null
                      ? `${candidate.experience_years} years`
                      : "—",
                },
                { label: "Notice Period", value: candidate.notice_period ?? "—" },
                { label: "Current CTC", value: candidate.current_ctc ?? "—" },
                { label: "Expected CTC", value: candidate.expected_ctc ?? "—" },
                { label: "Source", value: candidate.source ?? "Website" },
                {
                  label: "Applied On",
                  value: formatDate(candidate.applied_at),
                },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[10px] uppercase tracking-wider text-white/25 mb-1">
                    {item.label}
                  </p>
                  <p className="text-xs text-white/70">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            {candidate.skills.length > 0 && (
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <p className="text-[10px] uppercase tracking-wider text-white/25 mb-2">
                  Skills
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/55"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Cover Letter */}
          {candidate.cover_letter && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
              <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-white/[0.06]">
                Cover Letter
              </h2>
              <p className="text-sm text-white/55 leading-relaxed whitespace-pre-wrap">
                {candidate.cover_letter}
              </p>
            </div>
          )}

          {/* Internal Notes */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-white/[0.06]">
              Internal Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Add private notes about this candidate..."
              className="w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all resize-none"
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-[10px] text-white/25">
                Notes are private to HR team
              </p>
              <button
                onClick={handleSaveNotes}
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white/70 hover:text-white text-xs transition-all disabled:opacity-50"
              >
                {notesSaved ? (
                  <><CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Saved</>
                ) : isPending ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</>
                ) : (
                  <><Save className="w-3.5 h-3.5" /> Save Notes</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Status & Timeline */}
        <div className="space-y-5">
          {/* Update Status */}
          <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
            <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-white/[0.06]">
              Update Status
            </h2>
            <div className="space-y-1.5">
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  disabled={isPending || candidate.status === s}
                  onClick={() => handleStatusChange(s)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                    candidate.status === s
                      ? "bg-white/[0.10] text-white font-semibold border border-white/[0.15]"
                      : "text-white/45 hover:text-white/75 hover:bg-white/[0.04] border border-transparent"
                  } disabled:cursor-not-allowed`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Status Timeline */}
          {statusHistory.length > 0 && (
            <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-5">
              <h2 className="text-sm font-semibold text-white mb-4 pb-3 border-b border-white/[0.06]">
                Status History
              </h2>
              <div className="space-y-3">
                {[...statusHistory].reverse().map((entry, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-white/30 shrink-0 mt-0.5" />
                      {i < statusHistory.length - 1 && (
                        <div className="w-px flex-1 bg-white/[0.08] mt-1" />
                      )}
                    </div>
                    <div className="pb-3">
                      <CandidateStatusBadge status={entry.status} />
                      <p className="text-[10px] text-white/30 mt-1">
                        {new Date(entry.changed_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      {entry.note && (
                        <p className="text-[10px] text-white/45 mt-0.5 italic">
                          {entry.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
