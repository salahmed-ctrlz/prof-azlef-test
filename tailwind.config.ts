import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        cookie: ["Cookie", "cursive"],
        baloo: ["Baloo 2", "cursive"],
        balooBhaijaan: ["Baloo Bhaijaan 2", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        brown: {
          DEFAULT: "#4E342E",
          dark: "#362421",
          light: "#65463D",
        },
        beige: {
          DEFAULT: "#F5E1C8",
          light: "#F9EFE2",
          dark: "#E6CCB0",
        },
        gold: {
          DEFAULT: "#D4A373",
          light: "#E6C69A",
          dark: "#B88A5D",
        },
        black: "#1B1B1B",
        white: "#FFFFFF",
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
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(10px, -15px)" },
          "50%": { transform: "translate(15px, 10px)" },
          "75%": { transform: "translate(-10px, 15px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-15px, -10px)" },
          "50%": { transform: "translate(-5px, 15px)" },
          "75%": { transform: "translate(15px, -5px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "33%": { transform: "translate(8px, -12px)" },
          "66%": { transform: "translate(-12px, 8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-slow": "float-slow 20s ease-in-out infinite",
        "float-medium": "float-medium 15s ease-in-out infinite",
        "float-fast": "float-fast 10s ease-in-out infinite",
      },
      boxShadow: {
        'gold': '0 8px 25px rgba(212, 163, 115, 0.3)',
        'gold-light': '0 8px 25px rgba(230, 198, 154, 0.3)',
        'gold-xl': '0 15px 35px rgba(212, 163, 115, 0.4)',
        'brown': '0 8px 25px rgba(78, 52, 46, 0.25)',
        'brown-xl': '0 15px 35px rgba(78, 52, 46, 0.35)',
        'beige': '0 8px 25px rgba(245, 225, 200, 0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;