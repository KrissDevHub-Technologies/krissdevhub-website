"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";
import { KLogo } from "@/components/shared/k-logo";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      if (mobileOpen) {
        setMobileOpen(false);
      }
      if (activeDropdown !== null) {
        setActiveDropdown(null);
      }
    });
    return () => cancelAnimationFrame(handle);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
          scrolled
            ? "bg-[#090909]/95 backdrop-blur-xl border-b border-white/[0.08]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav
          className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" aria-label="KrissDevHub Technologies home" className="flex-shrink-0">
            <KLogo size={24} variant="full" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 text-[13px] tracking-tight transition-colors font-medium",
                    pathname === link.href || pathname.startsWith(link.href + "/")
                      ? "text-white"
                      : "text-white/45 hover:text-white"
                  )}
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 opacity-50 transition-transform duration-200",
                        activeDropdown === link.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.12 }}
                      className="absolute top-full left-0 mt-1 w-64 bg-[#111111] border border-white/[0.08] rounded-xl p-2 shadow-2xl"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex flex-col gap-0.5 px-3.5 py-2.5 rounded-lg hover:bg-white/[0.04] transition-colors group"
                        >
                          <span className="text-[12.5px] font-medium text-white/80 group-hover:text-white transition-colors">
                            {child.label}
                          </span>
                          {child.description && (
                            <span className="text-[11px] text-white/40 leading-relaxed font-light">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#090909] flex flex-col pt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <nav className="flex flex-col p-6 gap-2 mt-4 max-w-xl mx-auto w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    href={link.href}
                    className="block py-4 text-xl font-bold text-white/80 hover:text-white border-b border-white/[0.04] transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pt-2 pb-2 pl-4 space-y-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-sm text-white/40 hover:text-white/75 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-white text-black font-semibold text-base hover:bg-white/90 transition-colors"
                >
                  Get in touch <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
