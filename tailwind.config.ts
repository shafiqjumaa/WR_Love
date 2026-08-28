import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "var(--color-base)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      borderRadius: {
        soft: "1.75rem",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-14px) translateX(8px)" },
          "100%": { transform: "translateY(0px) translateX(0px)" },
        },
        popIn: {
          "0%": { opacity: "0", transform: "scale(0.92) translateY(8px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        drift: "drift 6s ease-in-out infinite",
        "drift-slow": "drift 9s ease-in-out infinite",
        popIn: "popIn 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
