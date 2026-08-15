/** @type {import('tailwindcss').Config} */
// Digital Atelier / Engineer's Chronicle - token map.
// Single source of truth: CSS custom properties in src/index.css (section 1 of DESIGN-SYSTEM.md).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        walnut: "var(--color-walnut)",
        "walnut-light": "var(--color-walnut-light)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        muted: "var(--color-text-muted)",
        accent: "var(--color-accent)",
        "accent-hot": "var(--color-accent-hot)",
        "accent-edge": "var(--color-accent-edge)",
        hairline: "var(--color-hairline)",
        "tag-bg": "rgba(232, 163, 61, 0.12)",
        "tag-border": "rgba(232, 163, 61, 0.35)",
      },
      borderRadius: {
        surface: "var(--radius-lg)",
        small: "var(--radius-sm)",
        pill: "var(--radius-pill)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        lift: "var(--shadow-lift)",
        "bloom-sm": "var(--shadow-bloom-sm)",
        "bloom-md": "var(--shadow-bloom-md)",
        "bloom-lg": "var(--shadow-bloom-lg)",
      },
      fontFamily: {
        serif: ["Spectral", "Georgia", "serif"],
        sans: ["General Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      transitionTimingFunction: {
        expo: "var(--ease-expo)",
        ui: "var(--ease-ui)",
      },
    },
  },
  plugins: [],
};
