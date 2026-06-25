"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { GradientBlob } from "@/components/shared/gradient-blob";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormData) => {
    startTransition(async () => {
      setErrorMsg(null);
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) {
          throw new Error(error.message || "Invalid credentials");
        }

        // Force a page refresh to clear middleware checks and redirect to /admin
        window.location.href = "/admin";
      } catch (err: any) {
        setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      }
    });
  };

  const inputBase =
    "w-full pl-10 pr-4 py-3 bg-white/[0.04] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/25 focus:border-white/10 transition-all";
  const labelBase = "block text-xs font-medium text-white/40 mb-2 uppercase tracking-wider";

  return (
    <div className="min-h-screen bg-[#090909] text-white flex items-center justify-center relative overflow-hidden px-4">
      <GradientBlob className="w-[500px] h-[500px] -top-40 -left-40 opacity-30" color="blue" />
      <GradientBlob className="w-[450px] h-[450px] -bottom-40 -right-40 opacity-20" color="purple" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-4 text-white/80 shadow-inner">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold font-space-grotesk tracking-tight">KrissDevHub Console</h1>
          <p className="text-xs text-white/40 mt-1.5 font-light">Internal Admin Portal & Lead Manager</p>
        </div>

        <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className={labelBase}>Admin Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/20">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="admin@krissdevhub.com"
                  className={inputBase}
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400 font-light">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className={labelBase}>Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-white/20">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className={inputBase}
                  {...register("password")}
                  aria-invalid={!!errors.password}
                />
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400 font-light">{errors.password.message}</p>
              )}
            </div>

            {errorMsg && (
              <div className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 font-light leading-relaxed">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-space-grotesk shadow-md"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <p className="text-[10px] text-center text-white/25 mt-6 font-mono font-light">
          Authorized personnel only. Sessions are audited and logged.
        </p>
      </div>
    </div>
  );
}
