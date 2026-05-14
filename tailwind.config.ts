import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vss: {
          void: "#000000",
          obsidian: "#0A0A0A",
          graphite: "#141414",
          ash: "#1F1F1F",
          smoke: "#2A2A2A",
          fog: "#4A4A4A",
          mist: "#8C8C8C",
          bone: "#C7C5BD",
          paper: "#E8E6DE",
          glow: "#FFFFFF",
          accent: "#E8E6DE",
          lime: "#39FF14",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.05em",
        wider: "0.08em",
        widest: "0.2em",
        ultra: "0.4em",
      },
      animation: {
        "marquee": "marquee 40s linear infinite",
        "marquee-fast": "marquee 20s linear infinite",
        "marquee-reverse": "marqueeReverse 40s linear infinite",
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float-1": "float1 8s ease-in-out infinite",
        "float-2": "float2 10s ease-in-out infinite",
        "float-3": "float3 12s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "glitch": "glitch 0.4s ease-in-out",
        "scale-in": "scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float1: {
          "0%, 100%": { transform: "translate(0, 0) rotate(-8deg)" },
          "50%": { transform: "translate(20px, -30px) rotate(-4deg)" },
        },
        float2: {
          "0%, 100%": { transform: "translate(0, 0) rotate(6deg)" },
          "50%": { transform: "translate(-25px, 20px) rotate(10deg)" },
        },
        float3: {
          "0%, 100%": { transform: "translate(0, 0) rotate(-3deg)" },
          "50%": { transform: "translate(15px, -20px) rotate(2deg)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, transparent 70%)",
        "radial-glow-strong": "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
        "gradient-mesh": "radial-gradient(at 20% 30%, rgba(255,255,255,0.06) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(255,255,255,0.04) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;