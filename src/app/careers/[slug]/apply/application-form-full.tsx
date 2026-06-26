"use client";

import { useState, useRef } from "react";
import {
  Loader2,
  CheckCircle,
  ArrowRight,
  Upload,
  X,
  FileText,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { submitApplication } from "@/lib/ats/candidates";
import type { Job } from "@/types/ats";

interface Props {
  job: Job;
}

const inputBase =
  "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all font-sans";
const labelBase =
  "block text-[10px] font-semibold text-white/40 mb-1.5 uppercase tracking-wider font-mono";

const NOTICE_OPTIONS = [
  "Immediately",
  "1 week",
  "2 weeks",
  "1 month",
  "2 months",
  "3 months",
  "More than 3 months",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  [key: string]: string;
}

export function ApplicationFormFull({ job }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  // Form fields
  const [fields, setFields] = useState({
    full_name: "",
    email: "",
    phone: "",
    github_url: "",
    linkedin_url: "",
    portfolio_url: "",
    experience_years: "",
    current_company: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "1 month",
    location: "",
    cover_letter: "",
  });

  const set = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF or DOCX files are allowed." }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "File must be under 10 MB." }));
      return;
    }
    setResumeFile(file);
    setErrors((prev) => ({ ...prev, resume: "" }));
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!fields.full_name.trim() || fields.full_name.trim().length < 2)
      errs.full_name = "Name must be at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = "Valid email required.";
    if (!fields.cover_letter.trim() || fields.cover_letter.trim().length < 20)
      errs.cover_letter = "Cover letter must be at least 20 characters.";
    if (!resumeFile) errs.resume = "Please upload your resume (PDF or DOCX).";
    if (fields.github_url && !fields.github_url.startsWith("http"))
      errs.github_url = "GitHub URL must start with http.";
    if (fields.linkedin_url && !fields.linkedin_url.startsWith("http"))
      errs.linkedin_url = "LinkedIn URL must start with http.";
    if (fields.portfolio_url && !fields.portfolio_url.startsWith("http"))
      errs.portfolio_url = "Portfolio URL must start with http.";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setUploadProgress(0);

    try {
      let resumeStoragePath: string | null = null;

      // Upload resume
      if (resumeFile) {
        setUploadProgress(20);
        const supabase = createClient();
        const ext = resumeFile.type === "application/pdf" ? "pdf" : "docx";
        const safeName = fields.email.replace(/[^a-zA-Z0-9]/g, "_");
        const path = `${safeName}_${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(path, resumeFile, {
            contentType: resumeFile.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          setErrors({ resume: "Failed to upload resume. Please try again." });
          setStatus("error");
          return;
        }
        setUploadProgress(70);
        resumeStoragePath = path;
      }

      setUploadProgress(90);

      const result = await submitApplication({
        job_id: job.id,
        full_name: fields.full_name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim() || null,
        github_url: fields.github_url.trim() || null,
        linkedin_url: fields.linkedin_url.trim() || null,
        portfolio_url: fields.portfolio_url.trim() || null,
        resume_file: resumeStoragePath,
        cover_letter: fields.cover_letter.trim(),
        experience_years: fields.experience_years ? parseInt(fields.experience_years) : null,
        current_company: fields.current_company.trim() || null,
        current_ctc: fields.current_ctc.trim() || null,
        expected_ctc: fields.expected_ctc.trim() || null,
        notice_period: fields.notice_period || null,
        location: fields.location.trim() || null,
        skills,
        source: "Website",
      });

      setUploadProgress(100);

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrors({ form: result.error || "Submission failed. Please try again." });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
      setErrors({ form: "Something went wrong. Please try again." });
    }
  };

  if (status === "success") {
    return (
      <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-white font-space-grotesk mb-2">
          Application Received!
        </h2>
        <p className="text-sm text-white/50 max-w-sm mx-auto leading-relaxed mb-8">
          Thank you for applying for the <strong className="text-white/80">{job.title}</strong> position.
          We review every application personally and will get back to you within 2–3 business days.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/[0.10] text-white/60 hover:text-white hover:border-white/[0.20] text-sm transition-all"
        >
          Back to KrissDevHub
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 shadow-2xl space-y-8"
      noValidate
    >
      {/* Section 1: Personal */}
      <div>
        <h2 className="text-sm font-bold text-white font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
          Personal Information
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Full Name *</label>
              <input
                type="text"
                value={fields.full_name}
                onChange={(e) => set("full_name", e.target.value)}
                placeholder="Jane Doe"
                className={inputBase}
                autoComplete="name"
              />
              {errors.full_name && <p className="text-xs text-red-400 mt-1">{errors.full_name}</p>}
            </div>
            <div>
              <label className={labelBase}>Email *</label>
              <input
                type="email"
                value={fields.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="jane@example.com"
                className={inputBase}
                autoComplete="email"
              />
              {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Phone</label>
              <input
                type="tel"
                value={fields.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+1 555 000 0000"
                className={inputBase}
                autoComplete="tel"
              />
            </div>
            <div>
              <label className={labelBase}>Current Location</label>
              <input
                type="text"
                value={fields.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="City, Country"
                className={inputBase}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Links */}
      <div>
        <h2 className="text-sm font-bold text-white font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
          Online Profiles
        </h2>
        <div className="space-y-4">
          <div>
            <label className={labelBase}>GitHub URL</label>
            <input
              type="url"
              value={fields.github_url}
              onChange={(e) => set("github_url", e.target.value)}
              placeholder="https://github.com/username"
              className={inputBase}
            />
            {errors.github_url && <p className="text-xs text-red-400 mt-1">{errors.github_url}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>LinkedIn URL</label>
              <input
                type="url"
                value={fields.linkedin_url}
                onChange={(e) => set("linkedin_url", e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className={inputBase}
              />
              {errors.linkedin_url && <p className="text-xs text-red-400 mt-1">{errors.linkedin_url}</p>}
            </div>
            <div>
              <label className={labelBase}>Portfolio / Website</label>
              <input
                type="url"
                value={fields.portfolio_url}
                onChange={(e) => set("portfolio_url", e.target.value)}
                placeholder="https://yoursite.com"
                className={inputBase}
              />
              {errors.portfolio_url && <p className="text-xs text-red-400 mt-1">{errors.portfolio_url}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Resume Upload */}
      <div>
        <h2 className="text-sm font-bold text-white font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
          Resume *
        </h2>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files?.[0];
            if (file) {
              const fakeEvent = { target: { files: [file] } } as any;
              handleFileChange(fakeEvent);
            }
          }}
          className={`relative flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            resumeFile
              ? "border-emerald-500/30 bg-emerald-500/5"
              : errors.resume
              ? "border-red-500/30 bg-red-500/5"
              : "border-white/[0.10] bg-white/[0.02] hover:border-white/[0.20] hover:bg-white/[0.04]"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
            aria-label="Upload resume"
          />

          {resumeFile ? (
            <div className="flex items-center gap-3 text-sm">
              <FileText className="w-5 h-5 text-emerald-400" />
              <span className="text-white/80 font-medium">{resumeFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setResumeFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="p-1 rounded-lg hover:bg-white/10 text-white/40 hover:text-red-400 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-white/20 mb-3" />
              <p className="text-sm text-white/40 mb-1">
                Drag & drop or{" "}
                <span className="text-white/70 font-medium underline">Browse files</span>
              </p>
              <p className="text-[10px] text-white/25">PDF or DOCX · Max 10 MB</p>
            </>
          )}
        </div>
        {errors.resume && (
          <p className="text-xs text-red-400 mt-1.5">{errors.resume}</p>
        )}
      </div>

      {/* Section 4: Professional */}
      <div>
        <h2 className="text-sm font-bold text-white font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
          Professional Details
        </h2>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={labelBase}>Years of Experience</label>
              <input
                type="number"
                value={fields.experience_years}
                onChange={(e) => set("experience_years", e.target.value)}
                placeholder="e.g. 4"
                min="0"
                max="50"
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Current Company</label>
              <input
                type="text"
                value={fields.current_company}
                onChange={(e) => set("current_company", e.target.value)}
                placeholder="e.g. Acme Inc."
                className={inputBase}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelBase}>Current CTC (Annual)</label>
              <input
                type="text"
                value={fields.current_ctc}
                onChange={(e) => set("current_ctc", e.target.value)}
                placeholder="e.g. $80,000"
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Expected CTC (Annual)</label>
              <input
                type="text"
                value={fields.expected_ctc}
                onChange={(e) => set("expected_ctc", e.target.value)}
                placeholder="e.g. $100,000"
                className={inputBase}
              />
            </div>
            <div>
              <label className={labelBase}>Notice Period</label>
              <select
                value={fields.notice_period}
                onChange={(e) => set("notice_period", e.target.value)}
                className={inputBase}
              >
                {NOTICE_OPTIONS.map((o) => (
                  <option key={o} value={o} className="bg-[#1a1a1a]">
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className={labelBase}>Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === ",") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Type a skill and press Enter..."
                className={inputBase}
              />
              <button
                type="button"
                onClick={addSkill}
                className="shrink-0 px-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white/50 hover:text-white hover:border-white/[0.16] transition-all"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/60"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
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
      </div>

      {/* Section 5: Cover Letter */}
      <div>
        <h2 className="text-sm font-bold text-white font-space-grotesk mb-4 pb-3 border-b border-white/[0.06]">
          Cover Letter *
        </h2>
        <textarea
          value={fields.cover_letter}
          onChange={(e) => set("cover_letter", e.target.value)}
          rows={6}
          placeholder="Tell us about a complex project you built, your engineering philosophy, and why you're excited about KrissDevHub..."
          className={`${inputBase} resize-none`}
        />
        {errors.cover_letter && (
          <p className="text-xs text-red-400 mt-1">{errors.cover_letter}</p>
        )}
      </div>

      {/* Error */}
      {errors.form && (
        <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {errors.form}
        </div>
      )}

      {/* Upload progress */}
      {status === "submitting" && uploadProgress > 0 && (
        <div className="space-y-1.5">
          <div className="h-1 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full bg-white/40 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-[10px] text-white/30 text-right">
            {uploadProgress < 70 ? "Uploading resume..." : uploadProgress < 100 ? "Saving application..." : "Done"}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          <>
            Submit Application
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>

      <p className="text-[10px] text-white/25 text-center">
        We review every application personally. You&apos;ll hear back within 2–3 business days.
      </p>
    </form>
  );
}
