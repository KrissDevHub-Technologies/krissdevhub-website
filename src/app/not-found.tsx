"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { GradientBlob } from "@/components/shared/gradient-blob";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBlob className="w-[600px] h-[600px] -top-40 left-1/2 -translate-x-1/2 opacity-30" color="mixed" />

      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* 404 number */}
          <div className="text-[10rem] sm:text-[14rem] font-bold leading-none text-white/10 select-none mb-4 font-mono">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 -mt-8">
            Page not found
          </h1>
          <p className="text-white/50 max-w-md mx-auto mb-8">
            This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all"
            >
              <Home className="w-4 h-4" />
              Go home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#121212] border border-white/[0.06] text-sm font-medium text-white/70 hover:text-white transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Go back
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
