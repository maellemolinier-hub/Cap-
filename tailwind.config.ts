import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Bleu CTA — repris du design system delos-clone (voir DESIGN_SYSTEM.md)
        brand: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a4bbfc",
          400: "#7c96f8",
          500: "#5b6ef2",
          600: "#4449e7",
          700: "#3835cc",
          800: "#302da5",
          900: "#2c2c83",
          950: "#1c1b4f",
        },
        // Neutres quasi-noirs
        ink: {
          50: "#f7f7f8",
          100: "#ececee",
          200: "#d9d9dc",
          300: "#b8b8bd",
          400: "#94949a",
          500: "#6b6b70",
          600: "#4a4a4e",
          700: "#333336",
          800: "#232326",
          900: "#161618",
          950: "#0d0d0e",
        },
        // Fond chaud du hero / de la nav
        cream: {
          50: "#fdfcfa",
          100: "#f8f5ef",
          200: "#f1ece1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
