"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { GradientBlob } from "@/components/shared/gradient-blob";
import { GridPattern } from "@/components/shared/grid-pattern";
import { MagneticButton } from "@/components/shared/magnetic-button";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background elements */}
      <GridPattern type="dot" className="opacity-30" />
      <GradientBlob className="w-[600px] h-[600px] -top-40 -left-40 opacity-60" color="blue" />
      <GradientBlob
        className="w-[500px] h-[500px] top-1/4 -right-40 opacity-40"
        color="purple"
        style={{ animationDelay: "2s" } as React.CSSProperties}
      />
      <GradientBlob
        className="w-[400px] h-[400px] bottom-0 left-1/3 opacity-30"
        color="indigo"
        style={{ animationDelay: "4s" } as React.CSSProperties}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full glass border border-white/[0.08] text-xs font-medium"
        >
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-white/60">AI-Native Development Studio</span>
          <span className="text-white/20">·</span>
          <span className="gradient-text-blue font-semibold">Now accepting projects</span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="text-white">Build software</span>
          <br />
          <span className="gradient-text">that thinks.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed text-balance"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          We design and engineer AI-native products, SaaS platforms, and custom software
          for startups and growing businesses. From idea to production in weeks.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton>
            <Link
              href="/contact"
              id="hero-cta-primary"
              className="group flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/95 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
            >
              Start a project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link
              href="/case-studies"
              id="hero-cta-secondary"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl glass border border-white/[0.1] text-sm font-medium text-white/80 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              View our work
            </Link>
          </MagneticButton>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {[
            { icon: Zap, text: "Ship in weeks, not months" },
            { icon: Shield, text: "Production-grade from day one" },
            { icon: Sparkles, text: "AI-first architecture" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-white/30">
              <Icon className="w-3.5 h-3.5 text-blue-400/60" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Code preview */}
        <motion.div
          className="mt-16 mx-auto max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="glass-strong rounded-2xl border border-white/[0.08] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="mx-auto text-xs text-white/20 font-mono">ai-agent.ts</span>
            </div>
            {/* Code */}
            <div className="p-6 text-left font-mono text-xs sm:text-sm leading-relaxed">
              <div className="text-white/20">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-white/70">agent</span>{" "}
                <span className="text-white/20">=</span>{" "}
                <span className="text-purple-400">createAgent</span>
                <span className="text-white/20">{"({"}</span>
              </div>
              <div className="ml-4 text-white/20">
                <span className="text-white/50">model</span>
                <span className="text-white/20">: </span>
                <span className="text-green-400">&apos;gpt-4o&apos;</span>
                <span className="text-white/20">,</span>
              </div>
              <div className="ml-4 text-white/20">
                <span className="text-white/50">tools</span>
                <span className="text-white/20">: [</span>
                <span className="text-yellow-400">searchKnowledgeBase</span>
                <span className="text-white/20">, </span>
                <span className="text-yellow-400">generateReport</span>
                <span className="text-white/20">],</span>
              </div>
              <div className="ml-4 text-white/20">
                <span className="text-white/50">memory</span>
                <span className="text-white/20">: </span>
                <span className="text-blue-400">new</span>{" "}
                <span className="text-purple-400">VectorMemory</span>
                <span className="text-white/20">{"({ db: supabase })"}</span>
              </div>
              <div className="text-white/20">{"});"}</div>
              <div className="mt-3 text-white/20">
                <span className="text-blue-400">const</span>{" "}
                <span className="text-white/70">result</span>{" "}
                <span className="text-white/20">=</span>{" "}
                <span className="text-purple-400">await</span>{" "}
                <span className="text-white/70">agent</span>
                <span className="text-white/20">.</span>
                <span className="text-yellow-400">run</span>
                <span className="text-white/20">(</span>
                <span className="text-green-400">&apos;Analyze Q4 performance&apos;</span>
                <span className="text-white/20">);</span>
              </div>
              {/* Cursor blink */}
              <motion.span
                className="inline-block w-2 h-4 bg-blue-400/80 rounded-sm ml-1 -mb-1"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
