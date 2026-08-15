/** @type {import('tailwindcss').Config} */
// Swiss International (pure) - token map.
// Single source of truth: CSS custom properties in src/index.css (section 1 of DESIGN-SYSTEM.md).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-bright": "var(--color-accent-bright)",
        "accent-deep": "var(--color-accent-deep)",
        hairline: "var(--color-hairline)",
        "card-border": "var(--color-card-border)",
        "card-border-hover": "var(--color-card-border-hover)",
        "tag-bg": "var(--color-tag-bg)",
        "tag-border": "var(--color-tag-border)",
      },
      borderRadius: {
        sharp: "0px",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
      },
      fontFamily: {
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
