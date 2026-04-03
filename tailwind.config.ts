import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Void Century Palette ── */
      colors: {
        abyss:        "#030303",
        "abyss-mid":  "#0a0a0a",
        crimson:      "#dc2626",
        "crimson-deep": "#990000",
        "crimson-void": "#330000",
        gold:         "#b8860b",
        "gold-faint": "#8a6914",
        ash:          "#d1d5db",
        "ash-dim":    "#9ca3af",
      },

      /* ── Fonts (CSS variable → Tailwind class) ── */
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },

      /* ── Keyframes ── */
      keyframes: {
        "crimson-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 18px 4px rgba(153, 0, 0, 0.35)",
          },
          "50%": {
            boxShadow: "0 0 42px 12px rgba(220, 38, 38, 0.65)",
          },
        },
        "eye-awaken": {
          "0%":   { opacity: "0", transform: "scale(0.6)" },
          "60%":  { opacity: "1", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.7" },
          "75%":      { opacity: "0.95" },
        },
      },
      animation: {
        "crimson-pulse": "crimson-pulse 2.8s ease-in-out infinite",
        "eye-awaken":    "eye-awaken 0.6s ease-out forwards",
        flicker:         "flicker 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
