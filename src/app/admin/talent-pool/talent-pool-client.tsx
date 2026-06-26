"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Star,
  Mail,
  MapPin,
  ExternalLink,
  SlidersHorizontal,
} from "lucide-react";
import { EmptyState } from "@/components/ats/empty-state";
import type { Candidate } from "@/types/ats";
import { formatDate } from "@/lib/utils";

interface Props {
  initialCandidates: Candidate[];
}

export function TalentPoolClient({ initialCandidates }: Props) {
  const [search, setSearch] = useState("");
  const [minExp, setMinExp] = useState("");
  const [skillFilter, setSkillFilter] = useState("");

  const allSkills = [
    ...new Set(initialCandidates.flatMap((c) => c.skills)),
  ].sort();

  const filtered = initialCandidates.filter((c) => {
    const matchesSearch =
      !search ||
      c.full_name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.location ?? "").toLowerCase().includes(search.toLowerCase());

    const matchesExp =
      !minExp ||
      (c.experience_years != null && c.experience_years >= parseInt(minExp));

    const matchesSkill =
      !skillFilter || c.skills.some((s) => s.toLowerCase().includes(skillFilter.toLowerCase()));

    return matchesSearch && matchesExp && matchesSkill;
  });

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white font-space-grotesk flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400" />
            Talent Pool
          </h1>
          <p className="text-xs text-white/40 mt-0.5">
            {initialCandidates.length} candidates · Pre-qualified for future roles
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Search candidates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Filter by skill..."
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>
        <select
          value={minExp}
          onChange={(e) => setMinExp(e.target.value)}
          className="py-2 px-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none"
        >
          <option value="" className="bg-[#1a1a1a]">Any experience</option>
          <option value="1" className="bg-[#1a1a1a]">1+ years</option>
          <option value="3" className="bg-[#1a1a1a]">3+ years</option>
          <option value="5" className="bg-[#1a1a1a]">5+ years</option>
          <option value="8" className="bg-[#1a1a1a]">8+ years</option>
        </select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Star}
          title="No candidates in talent pool"
          description="Move candidates to 'Talent Pool' status from their application to add them here."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="rounded-2xl border border-white/[0.06] bg-[#111] p-5 hover:border-white/[0.12] transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-white/50">
                      {c.full_name[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-white/80">
                      {c.full_name}
                    </h3>
                    {c.current_company && (
                      <p className="text-[11px] text-white/35">
                        {c.current_company}
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href={`/admin/applications/${c.id}`}
                  className="p-1.5 rounded-lg text-white/25 hover:text-white/70 hover:bg-white/[0.06] transition-all opacity-0 group-hover:opacity-100"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Info */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center gap-1.5 text-[11px] text-white/35">
                  <Mail className="w-3 h-3 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
                {c.location && (
                  <div className="flex items-center gap-1.5 text-[11px] text-white/35">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {c.location}
                  </div>
                )}
                {c.experience_years != null && (
                  <div className="text-[11px] text-white/35">
                    {c.experience_years} years experience
                  </div>
                )}
              </div>

              {/* Skills */}
              {c.skills.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {c.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-white/45"
                    >
                      {skill}
                    </span>
                  ))}
                  {c.skills.length > 4 && (
                    <span className="text-[10px] text-white/25">
                      +{c.skills.length - 4}
                    </span>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                <span className="text-[10px] text-white/25">
                  Added {formatDate(c.applied_at)}
                </span>
                <a
                  href={`mailto:${c.email}?subject=Opportunity at KrissDevHub`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 text-[10px] font-medium transition-all"
                >
                  <Mail className="w-3 h-3" />
                  Quick Invite
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
