"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { JobCard, JobCardSkeleton } from "@/components/ats/job-card";
import type { Job } from "@/types/ats";

interface Props {
  allJobs: Job[];
  departments: string[];
  locations: string[];
}

const EMPLOYMENT_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];

export function CareersFiltersClient({ allJobs, departments, locations }: Props) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [loc, setLoc] = useState("all");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    return allJobs.filter((job) => {
      const matchesSearch =
        !search ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase());
      const matchesDept = dept === "all" || job.department === dept;
      const matchesLoc =
        loc === "all" || job.location.toLowerCase().includes(loc.toLowerCase());
      const matchesType = type === "all" || job.employment_type === type;
      return matchesSearch && matchesDept && matchesLoc && matchesType;
    });
  }, [allJobs, search, dept, loc, type]);

  const hasFilters = search || dept !== "all" || loc !== "all" || type !== "all";

  const clearFilters = () => {
    setSearch("");
    setDept("all");
    setLoc("all");
    setType("all");
  };

  const selectBase =
    "px-3 py-2 bg-white/[0.03] border border-white/[0.08] rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all appearance-none cursor-pointer";

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Search positions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
          />
        </div>

        {departments.length > 1 && (
          <select
            value={dept}
            onChange={(e) => setDept(e.target.value)}
            className={selectBase}
          >
            <option value="all" className="bg-[#1a1a1a]">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d} className="bg-[#1a1a1a]">
                {d}
              </option>
            ))}
          </select>
        )}

        {locations.length > 1 && (
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className={selectBase}
          >
            <option value="all" className="bg-[#1a1a1a]">All Locations</option>
            {locations.map((l) => (
              <option key={l} value={l} className="bg-[#1a1a1a]">
                {l}
              </option>
            ))}
          </select>
        )}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={selectBase}
        >
          <option value="all" className="bg-[#1a1a1a]">All Types</option>
          {EMPLOYMENT_TYPES.map((t) => (
            <option key={t} value={t} className="bg-[#1a1a1a]">
              {t}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/[0.08] text-white/40 hover:text-white/70 text-xs transition-all"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 border border-white/[0.06] rounded-2xl bg-[#121212]/50">
          <p className="text-sm text-white/30 mb-2">No positions match your search</p>
          <button
            onClick={clearFilters}
            className="text-xs text-white/50 hover:text-white/80 transition-colors underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
