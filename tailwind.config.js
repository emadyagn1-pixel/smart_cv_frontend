/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],

  future: {
    disableColorFunctionSupport: true,  // ← يمنع oklch / lab / lch
  },

  corePlugins: {
    preflight: false, // ← يلغي CSS الافتراضي الذي يحوي oklch
  },

  experimental: {
    optimizeUniversalDefaults: true,
  },

  content: [
    './client/src/**/*.{ts,tsx,js,jsx}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        slate: { ... },
        gray: { ... },
        zinc: { ... },
        blue: { ... },
        indigo: { ... },
        green: { ... },
        red: { ... },
        yellow: { ... },

        border: "#dbe1ef",
        input: "#dbe1ef",
        ring: "#3b82f6",
        background: "#ffffff",
        foreground: "#0f172a",

        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#f8fafc"
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#111827"
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f8fafc"
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#6b7280"
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#111827"
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1f2937"
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#111827"
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      }
    },
  },

  plugins: [
    require("@tailwindcss/typography"),
  ],
}
