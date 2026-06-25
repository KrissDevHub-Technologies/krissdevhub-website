import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0d0d0d",
          1: "#111111",
          2: "#1a1a1a",
          3: "#252525",
          4: "#2e2e2e",
        },
        border: {
          DEFAULT: "#2a2a2a",
          1: "#333333",
          2: "#3d3d3d",
        },
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(56px,8vw,108px)", { lineHeight: "0.98", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(40px,6vw,80px)", { lineHeight: "1.0", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(30px,4vw,56px)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        "display-sm": ["clamp(24px,3vw,40px)", { lineHeight: "1.12", letterSpacing: "-0.025em" }],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.08)",
        glow: "0 0 60px rgba(255,255,255,0.05)",
        "inset-glow": "inset 0 1px 0 rgba(255,255,255,0.06)",
        overlay: "0 24px 80px rgba(0,0,0,0.8)",
      },
      borderColor: {
        DEFAULT: "#2a2a2a",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-up": "fadeUp 0.7s cubic-bezier(0.25,0.1,0.25,1) forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
} satisfies Config;
