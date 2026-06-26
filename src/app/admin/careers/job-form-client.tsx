"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Loader2, ArrowLeft, Save, Globe } from "lucide-react";
import Link from "next/link";
import { createJob, updateJob } from "@/lib/ats/jobs";
import { slugify } from "@/lib/utils";
import type { Job } from "@/types/ats";

interface Props {
  mode: "create" | "edit";
  job?: Job;
}

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Data / AI",
  "DevOps",
  "Customer Success",
  "HR",
  "Finance",
];

const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

function TagListInput({
  label,
  items,
  onChange,
  placeholder,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
}) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !items.includes(trimmed)) {
      onChange([...items, trimmed]);
      setInput("");
    }
  };

  const remove = (i: number) => {
    onChange(items.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <label className={labelBase}>{label}</label>
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                add();
              }
            }}
            placeholder={placeholder}
            className={inputBase}
          />
          <button
            type="button"
            onClick={add}
            className="shrink-0 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:border-white/[0.16] transition-all"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {items.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {items.map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60"
              >
                {item}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-white/30 hover:text-red-400 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputBase =
  "w-full px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/15 transition-all";
const labelBase =
  "block text-[10px] font-semibold uppercase tracking-wider text-white/35 mb-1.5";

export function JobFormClient({ mode, job }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(job?.title ?? "");
  const [slug, setSlug] = useState(job?.slug ?? "");
  const [department, setDepartment] = useState(job?.department ?? "Engineering");
  const [location, setLocation] = useState(job?.location ?? "Remote (Worldwide)");
  const [employmentType, setEmploymentType] = useState(
    job?.employment_type ?? "Full-time"
  );
  const [salaryMin, setSalaryMin] = useState<string>(
    job?.salary_min?.toString() ?? ""
  );
  const [salaryMax, setSalaryMax] = useState<string>(
    job?.salary_max?.toString() ?? ""
  );
  const [description, setDescription] = useState(job?.description ?? "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    job?.responsibilities ?? []
  );
  const [requirements, setRequirements] = useState<string[]>(
    job?.requirements ?? []
  );
  const [benefits, setBenefits] = useState<string[]>(job?.benefits ?? []);
  const [status, setStatus] = useState<"draft" | "open" | "closed">(
    job?.status ?? "draft"
  );
  const [featured, setFeatured] = useState(job?.featured ?? false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === "create") {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    setError(null);

    const data = {
      title: title.trim(),
      slug: slug.trim() || slugify(title),
      department,
      location: location.trim(),
      employment_type: employmentType,
      salary_min: salaryMin ? parseInt(salaryMin) : null,
      salary_max: salaryMax ? parseInt(salaryMax) : null,
      description: description.trim(),
      responsibilities,
      requirements,
      benefits,
      status,
      featured,
    };

    startTransition(async () => {
      if (mode === "create") {
        const result = await createJob(data);
        if (result.success) {
          router.push("/admin/careers");
          router.refresh();
        } else {
          setError(result.error || "Failed to create job.");
        }
      } else if (job) {
        const result = await updateJob(job.id, data);
        if (result.success) {
          router.push("/admin/careers");
          router.refresh();
        } else {
          setError(result.error || "Failed to update job.");
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Back */}
      <Link
        href="/admin/careers"
        className="inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to jobs
      </Link>

      {/* Basic Info */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
          Basic Information
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Job Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Senior Full-Stack Engineer"
              required
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}>URL Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated from title"
              className={inputBase}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelBase}>Department *</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className={inputBase}
            >
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d} className="bg-[#1a1a1a]">
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelBase}>Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Remote (Worldwide)"
              required
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}>Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className={inputBase}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-[#1a1a1a]">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Salary Min (USD/yr)</label>
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="e.g. 80000"
              min="0"
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}>Salary Max (USD/yr)</label>
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="e.g. 120000"
              min="0"
              className={inputBase}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-5">
        <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
          Job Description
        </h2>
        <div>
          <label className={labelBase}>Description *</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Describe the role, team, and what this person will be working on..."
            required
            className={`${inputBase} resize-none`}
          />
        </div>

        <TagListInput
          label="Responsibilities"
          items={responsibilities}
          onChange={setResponsibilities}
          placeholder="Add a responsibility (press Enter)"
        />
        <TagListInput
          label="Requirements"
          items={requirements}
          onChange={setRequirements}
          placeholder="Add a requirement (press Enter)"
        />
        <TagListInput
          label="Benefits & Perks"
          items={benefits}
          onChange={setBenefits}
          placeholder="Add a benefit (press Enter)"
        />
      </div>

      {/* Publishing */}
      <div className="rounded-2xl border border-white/[0.06] bg-[#111] p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white border-b border-white/[0.06] pb-3">
          Publishing
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label className={labelBase}>Status</label>
            <div className="flex gap-2">
              {(["draft", "open", "closed"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatus(s)}
                  className={`px-3 py-2 rounded-xl text-xs capitalize transition-all border ${
                    status === s
                      ? "bg-white/[0.10] text-white border-white/[0.20]"
                      : "text-white/35 border-white/[0.06] hover:border-white/[0.12]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 sm:ml-6 pt-5">
            <button
              type="button"
              onClick={() => setFeatured(!featured)}
              className={`relative w-10 h-5 rounded-full transition-colors ${
                featured ? "bg-amber-500" : "bg-white/[0.10]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                  featured ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-xs text-white/50">
              Featured (shown first on careers page)
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : mode === "create" ? (
            <Save className="w-3.5 h-3.5" />
          ) : (
            <Globe className="w-3.5 h-3.5" />
          )}
          {isPending
            ? "Saving..."
            : mode === "create"
            ? "Create Job"
            : "Save Changes"}
        </button>
        <Link
          href="/admin/careers"
          className="text-xs text-white/35 hover:text-white/70 transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
