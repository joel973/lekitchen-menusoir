import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Interface principale
        surface: {
          DEFAULT: "#FAFAF8",
          secondary: "#F0EFEA",
          tertiary: "#E6E4DD",
        },
        // Texte
        content: {
          DEFAULT: "#141413",
          secondary: "#3A3935",
          tertiary: "#605F5B",
        },
        // Accents
        accent: {
          DEFAULT: "#1f1f1f",
          secondary: "#61AAF2",
          success: "#7EBF8E",
          warning: "#D4A27F",
          error: "#D2886F",
        },
        // Bordures et séparateurs
        divider: "#C4C3BB",
        // États
        hover: "#F6F1EB",
        // Composants de base
        primary: {
          DEFAULT: "#1f1f1f",
          foreground: "#ffffff", // Texte blanc sur fond foncé
        },
        secondary: {
          DEFAULT: "#F0EFEA",
          foreground: "#141413",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#141413",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#141413",
        },
        muted: {
          DEFAULT: "#F0EFEA",
          foreground: "#605F5B",
        },
        destructive: {
          DEFAULT: "#D2886F",
          foreground: "#ffffff",
        },
        border: "#E6E4DD",
        input: "#E6E4DD",
        background: "#FAFAF8",
        foreground: "#141413",
      },
      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      backdropBlur: {
        'glass': 'blur(4px)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "slide-out": "slide-out 0.3s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;