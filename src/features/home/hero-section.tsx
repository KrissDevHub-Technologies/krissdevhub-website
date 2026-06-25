"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden pt-24 pb-16 bg-[#090909]">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center py-12">
          {/* Left: Headline & Text */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Headline */}
            <motion.h1
              className="text-white mb-6 font-bold tracking-tight text-left leading-[1.05]"
              style={{ fontSize: "clamp(42px, 5vw, 72px)", fontFamily: "Space Grotesk, sans-serif" }}
              {...fadeUp(0)}
            >
              Building AI-native software for the next generation.
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-white/60 text-lg sm:text-xl font-light leading-relaxed max-w-xl mb-10 text-left"
              {...fadeUp(0.1)}
            >
              We partner with select startups and enterprises to design, build, and deploy production-grade SaaS products, custom software, and intelligent AI systems. High craft, zero compromise.
            </motion.p>

            {/* Actions */}
            <motion.div
              className="flex flex-row items-center gap-4 justify-start"
              {...fadeUp(0.2)}
            >
              <Link href="/contact" className="btn-primary">
                Discuss your project
              </Link>
              <Link href="/services" className="btn-secondary">
                Our services
              </Link>
            </motion.div>
          </div>

          {/* Right: Premium Abstract Vector Visual */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="w-full max-w-[420px] aspect-square relative flex items-center justify-center"
            >
              {/* Outer Slow Rotating Rings */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 200 200" className="w-full h-full text-white opacity-15">
                  <circle
                    cx="100"
                    cy="100"
                    r="84"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="4 6"
                    fill="none"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="60"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    fill="none"
                  />
                  {/* Small geometric ticks */}
                  <line x1="100" y1="10" x2="100" y2="16" stroke="currentColor" strokeWidth="1" />
                  <line x1="100" y1="184" x2="100" y2="190" stroke="currentColor" strokeWidth="1" />
                  <line x1="10" y1="100" x2="16" y2="100" stroke="currentColor" strokeWidth="1" />
                  <line x1="184" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Middle Faster Counter-Rotating System */}
              <motion.div
                className="absolute w-[70%] h-[70%]"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 140 140" className="w-full h-full text-white opacity-30">
                  <circle
                    cx="70"
                    cy="70"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    strokeDasharray="8 4"
                    fill="none"
                  />
                  <path
                    d="M 70 22 A 48 48 0 0 1 118 70"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Intersecting node dots */}
                  <circle cx="70" cy="22" r="2.5" fill="currentColor" />
                  <circle cx="118" cy="70" r="2.5" fill="currentColor" />
                </svg>
              </motion.div>

              {/* Inner Orbit System */}
              <motion.div
                className="absolute w-[40%] h-[40%]"
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 80 80" className="w-full h-full text-white opacity-45">
                  <circle
                    cx="40"
                    cy="40"
                    r="24"
                    stroke="currentColor"
                    strokeWidth="0.75"
                    fill="none"
                  />
                  <circle cx="40" cy="16" r="3" fill="currentColor" />
                </svg>
              </motion.div>

              {/* Center solid core */}
              <div className="w-2 h-2 rounded-full bg-white z-10" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
