/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          950: "#050810",
          900: "#0a0f1c",
          800: "#0f1526",
          700: "#161d33",
        },
        accent: {
          cyan: "#39e6c8",
          violet: "#8b7bff",
          amber: "#f5b544",
        },
        // Semantic tokens driven by CSS variables (see index.css) so the
        // light/dark theme toggle can swap real colors, not just filters.
        surface: {
          app: "var(--bg-app)",
          panel: "var(--bg-panel)",
          border: "var(--border-subtle)",
        },
        ink: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(57,230,200,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(57,230,200,0.06) 1px, transparent 1px)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        glow: {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
