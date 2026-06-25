"use client";

import { useActionState, useEffect, useRef } from "react";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { applyForJob } from "./apply-action";

interface ApplicationFormProps {
  roleSlug: string;
  roleTitle: string;
}

export function ApplicationForm({ roleSlug, roleTitle }: ApplicationFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(applyForJob, { success: false });

  // Reset form upon successful submission
  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state.success]);

  const inputBase =
    "w-full px-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all font-sans";
  const labelBase = "block text-[10px] font-medium text-white/40 mb-2 uppercase tracking-wider font-mono";

  return (
    <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 shadow-2xl">
      {state.success ? (
        <div className="py-8 text-center">
          <CheckCircle className="w-12 h-12 text-white mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white font-space-grotesk mb-2">Application Received!</h3>
          <p className="text-xs text-white/45 max-w-sm mx-auto leading-relaxed">
            Thank you for applying for the {roleTitle} position. Our engineering team will review your GitHub and details, and respond in 2 business days.
          </p>
        </div>
      ) : (
        <form action={formAction} ref={formRef} className="space-y-5">
          <input type="hidden" name="role_slug" value={roleSlug} />
          
          <h3 className="text-lg font-bold text-white font-space-grotesk mb-4">Apply for this position</h3>

          {/* Name & Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="app-name" className={labelBase}>Full Name *</label>
              <input
                id="app-name"
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="app-email" className={labelBase}>Email *</label>
              <input
                id="app-email"
                type="email"
                name="email"
                required
                placeholder="jane@example.com"
                className={inputBase}
              />
            </div>
          </div>

          {/* GitHub & LinkedIn */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="app-github" className={labelBase}>GitHub URL</label>
              <input
                id="app-github"
                type="url"
                name="github_url"
                placeholder="https://github.com/username"
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="app-linkedin" className={labelBase}>LinkedIn URL</label>
              <input
                id="app-linkedin"
                type="url"
                name="linkedin_url"
                placeholder="https://linkedin.com/in/username"
                className={inputBase}
              />
            </div>
          </div>

          {/* Resume link */}
          <div>
            <label htmlFor="app-resume" className={labelBase}>Resume Link (PDF / Notion) *</label>
            <input
              id="app-resume"
              type="text"
              name="resume_url"
              required
              placeholder="https://docs.google.com/... or dropbox link"
              className={inputBase}
            />
          </div>

          {/* Cover Letter */}
          <div>
            <label htmlFor="app-cover" className={labelBase}>Cover Letter & Tell us about a complex project you built *</label>
            <textarea
              id="app-cover"
              name="cover_letter"
              rows={5}
              required
              placeholder="Describe your role, systems architecture, and engineering choices in a project you delivered..."
              className={`${inputBase} resize-none`}
            />
          </div>

          {state.error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
              {state.error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-xs font-bold font-space-grotesk hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
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
        </form>
      )}
    </div>
  );
}
