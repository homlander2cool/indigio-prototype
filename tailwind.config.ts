import type { Config } from "tailwindcss";

/**
 * Single source of truth for the design system.
 *
 * Every colour used in the UI lives here as a token so a palette change is one
 * edit rather than a find-and-replace across every component. Prefer the token
 * (`bg-navy`, `text-gold`) over an arbitrary value (`bg-[#0b2340]`).
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core brand
        navy: {
          DEFAULT: "#0b2340",
          deep: "#071a2b",
          mid: "#112d4d",
          light: "#183c66",
        },
        gold: {
          DEFAULT: "#d2a94f",
          light: "#f2d686",
          soft: "#f4dd9a",
          deep: "#c6952c",
        },
        // Warm neutral canvas the marketing pages sit on
        canvas: {
          DEFAULT: "#f4efe8",
          deep: "#ebe3d7",
          ivory: "#f9f5ef",
          panel: "#f7f3ec",
        },
        ink: {
          DEFAULT: "#102033",
          muted: "#596a7d",
        },
        line: "#d9d2c3",
        // Legacy aliases kept so older markup keeps rendering.
        rbc: {
          blue: "#0b2340",
          dark: "#071a2b",
          gold: "#d2a94f",
          goldlight: "#f2d686",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        panel: "30px",
        card: "26px",
        field: "16px",
      },
      boxShadow: {
        panel: "0 22px 60px rgba(16, 32, 51, 0.06)",
        lifted: "0 30px 80px rgba(11, 35, 64, 0.08)",
        gold: "0 18px 42px rgba(210, 169, 79, 0.35)",
      },
      // Keyframes and the .animate-* classes live in app/globals.css instead —
      // see the note there on why they must not be tree-shaken.
    },
  },
  plugins: [],
};

export default config;
