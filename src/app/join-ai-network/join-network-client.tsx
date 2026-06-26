"use client";

import { useState, useRef } from "react";
import {
  Loader2,
  CheckCircle,
  Upload,
  X,
  Plus,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { submitApplication } from "@/lib/ats/candidates";
import type { Job } from "@/types/ats";

interface Props {
  jobs: Job[];
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

const AVAILABILITY_OPTIONS = [
  "Immediate Full-time (40h/week)",
  "Immediate Part-time (20h/week)",
  "Flexible / Contract basis",
  "Less than 20 hours/week",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormErrors {
  [key: string]: string;
}

export function JoinNetworkClient({ jobs }: Props) {
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
    country: "",
    linkedin_url: "",
    github_url: "",
    portfolio_url: "",
    experience_years: "",
    preferred_role: "",
    availability: "Immediate Full-time (40h/week)",
    languages: "",
    expected_pay: "",
    notice_period: "Immediately",
    cover_letter: "",
  });

  const set = (key: string, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
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
    if (!fields.country.trim())
      errs.country = "Country is required.";
    if (!fields.experience_years || isNaN(parseInt(fields.experience_years)))
      errs.experience_years = "Enter years of experience.";
    if (!fields.preferred_role)
      errs.preferred_role = "Please select your preferred role.";
    if (!fields.languages.trim())
      errs.languages = "Please specify languages spoken.";
    if (!fields.expected_pay.trim())
      errs.expected_pay = "Please enter expected compensation.";
    if (skills.length === 0)
      errs.skills = "Add at least one technical or professional skill.";
    if (!resumeFile) errs.resume = "Please upload your resume (PDF or DOCX).";

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

      // Serialize Availability and Languages into internal notes
      const notesSerialized = [
        `Availability: ${fields.availability}`,
        `Languages: ${fields.languages.trim()}`,
      ].join("\n");

      // Find target job ID from selected job
      const selectedJob = jobs.find((j) => j.id === fields.preferred_role);

      const result = await submitApplication({
        job_id: selectedJob?.id || null,
        full_name: fields.full_name.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim() || null,
        github_url: fields.github_url.trim() || null,
        linkedin_url: fields.linkedin_url.trim() || null,
        portfolio_url: fields.portfolio_url.trim() || null,
        resume_file: resumeStoragePath,
        cover_letter: fields.cover_letter.trim() || null,
        experience_years: fields.experience_years ? parseInt(fields.experience_years) : null,
        current_company: null,
        current_ctc: null,
        expected_ctc: fields.expected_pay.trim(),
        notice_period: fields.notice_period,
        location: fields.country.trim(),
        skills,
        source: "AI Talent Network",
        notes: notesSerialized,
      } as any);

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
          Application Received
        </h2>
        <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed mb-6 font-light">
          Thank you for applying to the AI Talent Network. We have stored your professional profile 
          in our database. Our talent acquisition team will review your skills and contact you if there 
          is a match with our active client cohorts.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.form && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
          {errors.form}
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="full_name" className={labelBase}>Full Name *</label>
          <input
            id="full_name"
            type="text"
            className={inputBase}
            value={fields.full_name}
            onChange={(e) => set("full_name", e.target.value)}
            placeholder="John Doe"
            disabled={status === "submitting"}
          />
          {errors.full_name && <span className="text-[10px] text-red-400 mt-1 block">{errors.full_name}</span>}
        </div>

        <div>
          <label htmlFor="email" className={labelBase}>Email Address *</label>
          <input
            id="email"
            type="email"
            className={inputBase}
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="john@example.com"
            disabled={status === "submitting"}
          />
          {errors.email && <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>}
        </div>
      </div>

      {/* Grid: Phone & Country */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelBase}>Phone Number</label>
          <input
            id="phone"
            type="tel"
            className={inputBase}
            value={fields.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="country" className={labelBase}>Country *</label>
          <input
            id="country"
            type="text"
            className={inputBase}
            value={fields.country}
            onChange={(e) => set("country", e.target.value)}
            placeholder="United States"
            disabled={status === "submitting"}
          />
          {errors.country && <span className="text-[10px] text-red-400 mt-1 block">{errors.country}</span>}
        </div>
      </div>

      {/* Grid: LinkedIn, GitHub, Portfolio */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="linkedin_url" className={labelBase}>LinkedIn Profile</label>
          <input
            id="linkedin_url"
            type="url"
            className={inputBase}
            value={fields.linkedin_url}
            onChange={(e) => set("linkedin_url", e.target.value)}
            placeholder="https://linkedin.com/in/username"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="github_url" className={labelBase}>GitHub Profile</label>
          <input
            id="github_url"
            type="url"
            className={inputBase}
            value={fields.github_url}
            onChange={(e) => set("github_url", e.target.value)}
            placeholder="https://github.com/username"
            disabled={status === "submitting"}
          />
        </div>

        <div>
          <label htmlFor="portfolio_url" className={labelBase}>Portfolio / Website</label>
          <input
            id="portfolio_url"
            type="url"
            className={inputBase}
            value={fields.portfolio_url}
            onChange={(e) => set("portfolio_url", e.target.value)}
            placeholder="https://username.dev"
            disabled={status === "submitting"}
          />
        </div>
      </div>

      {/* Grid: Preferred Role & Years of Exp */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferred_role" className={labelBase}>Preferred Role *</label>
          <select
            id="preferred_role"
            value={fields.preferred_role}
            onChange={(e) => set("preferred_role", e.target.value)}
            className="w-full px-4 py-3 bg-[#0d0d0d] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all font-sans appearance-none"
            disabled={status === "submitting"}
          >
            <option value="">Select a role...</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
          {errors.preferred_role && <span className="text-[10px] text-red-400 mt-1 block">{errors.preferred_role}</span>}
        </div>

        <div>
          <label htmlFor="experience_years" className={labelBase}>Years of Experience *</label>
          <input
            id="experience_years"
            type="number"
            min="0"
            className={inputBase}
            value={fields.experience_years}
            onChange={(e) => set("experience_years", e.target.value)}
            placeholder="e.g. 3"
            disabled={status === "submitting"}
          />
          {errors.experience_years && <span className="text-[10px] text-red-400 mt-1 block">{errors.experience_years}</span>}
        </div>
      </div>

      {/* Grid: Availability & Expected Pay */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="availability" className={labelBase}>Availability *</label>
          <select
            id="availability"
            value={fields.availability}
            onChange={(e) => set("availability", e.target.value)}
            className="w-full px-4 py-3 bg-[#0d0d0d] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all font-sans appearance-none"
            disabled={status === "submitting"}
          >
            {AVAILABILITY_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expected_pay" className={labelBase}>Expected Compensation *</label>
          <input
            id="expected_pay"
            type="text"
            className={inputBase}
            value={fields.expected_pay}
            onChange={(e) => set("expected_pay", e.target.value)}
            placeholder="e.g. $45/hour or $90,000/yr"
            disabled={status === "submitting"}
          />
          {errors.expected_pay && <span className="text-[10px] text-red-400 mt-1 block">{errors.expected_pay}</span>}
        </div>
      </div>

      {/* Grid: Languages & Notice Period */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="languages" className={labelBase}>Languages Spoken *</label>
          <input
            id="languages"
            type="text"
            className={inputBase}
            value={fields.languages}
            onChange={(e) => set("languages", e.target.value)}
            placeholder="e.g. English (Fluent), Spanish (Conversational)"
            disabled={status === "submitting"}
          />
          {errors.languages && <span className="text-[10px] text-red-400 mt-1 block">{errors.languages}</span>}
        </div>

        <div>
          <label htmlFor="notice_period" className={labelBase}>Notice Period *</label>
          <select
            id="notice_period"
            value={fields.notice_period}
            onChange={(e) => set("notice_period", e.target.value)}
            className="w-full px-4 py-3 bg-[#0d0d0d] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all font-sans appearance-none"
            disabled={status === "submitting"}
          >
            {NOTICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Skills Tag Input */}
      <div>
        <label className={labelBase}>Skills & Technologies *</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            className={inputBase}
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Add a skill (e.g. Python, RLHF, Prompt Tuning) and press Enter or Click Add"
            disabled={status === "submitting"}
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 bg-white text-black hover:bg-white/90 text-xs font-bold rounded-xl transition-all flex items-center gap-1 font-space-grotesk shrink-0"
            disabled={status === "submitting"}
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/[0.05] border border-white/[0.08] rounded-lg text-xs font-light text-white"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="w-3 h-3 rounded-full hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white"
                  disabled={status === "submitting"}
                >
                  <X className="w-2 h-2" />
                </button>
              </span>
            ))}
          </div>
        )}
        {errors.skills && <span className="text-[10px] text-red-400 mt-1 block">{errors.skills}</span>}
      </div>

      {/* Resume Upload */}
      <div>
        <label className={labelBase}>Resume (PDF or DOCX, max 10MB) *</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx"
          className="hidden"
          disabled={status === "submitting"}
        />
        {resumeFile ? (
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-white">{resumeFile.name}</p>
                <p className="text-[10px] text-white/30">
                  {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setResumeFile(null)}
              className="p-1 hover:bg-white/10 rounded-lg text-white/40 hover:text-white"
              disabled={status === "submitting"}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-8 border border-dashed border-white/[0.08] hover:border-white/[0.16] bg-white/[0.01] hover:bg-white/[0.02] rounded-xl flex flex-col items-center justify-center gap-2 transition-all group cursor-pointer text-center"
            disabled={status === "submitting"}
          >
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
              <Upload className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-white">Upload your resume</div>
            <div className="text-[10px] text-white/30">Drag & drop or browse (PDF, DOCX)</div>
          </button>
        )}
        {errors.resume && <span className="text-[10px] text-red-400 mt-1 block">{errors.resume}</span>}
      </div>

      {/* Cover Letter */}
      <div>
        <label htmlFor="cover_letter" className={labelBase}>Cover Letter / Introduce Yourself</label>
        <textarea
          id="cover_letter"
          rows={5}
          className={`${inputBase} resize-none`}
          value={fields.cover_letter}
          onChange={(e) => set("cover_letter", e.target.value)}
          placeholder="Tell us about your background, experience with LLMs, and why you want to join the AI Talent Network..."
          disabled={status === "submitting"}
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full py-4 bg-white hover:bg-white/90 text-black font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2 font-space-grotesk cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed shadow-md"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting Application ({uploadProgress}%)</span>
            </>
          ) : (
            <span>Submit Application to AI Network</span>
          )}
        </button>
      </div>
    </form>
  );
}
