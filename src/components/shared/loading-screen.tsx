"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { KLogo } from "@/components/shared/k-logo";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 2.5;
      });
    }, 40);
    const timer = setTimeout(() => setVisible(false), 1900);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0d0d]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-10 flex items-center gap-3"
          >
            <KLogo size={32} />
            <div>
              <div className="text-white font-semibold text-sm leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                KrissDevHub
              </div>
              <div className="text-white/30 text-xs mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Technologies
              </div>
            </div>
          </motion.div>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <motion.span
            className="mt-3 text-[10px] text-white/20 font-mono tabular-nums"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
