import Link from "next/link";
import { siteConfig, footerLinks } from "@/lib/constants";
import { Twitter, Github, Linkedin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#050505]">
      {/* Top gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Home">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <span className="font-semibold tracking-tight">KrissDevHub Technologies</span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              Building AI-native software for the next generation. We help startups and SMBs ship faster, scale smarter.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: siteConfig.links.twitter, icon: Twitter, label: "Twitter" },
                { href: siteConfig.links.github, icon: Github, label: "GitHub" },
                { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg glass flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">Stay updated</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 px-3 py-2 text-sm bg-white/[0.04] border border-white/[0.08] rounded-lg text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                  aria-label="Email for newsletter"
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white transition-all"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <div className="mt-8">
              <h3 className="text-xs font-medium uppercase tracking-wider text-white/30 mb-4">Contact</h3>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1 group"
              >
                {siteConfig.email}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © {currentYear} KrissDevHub Technologies. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
