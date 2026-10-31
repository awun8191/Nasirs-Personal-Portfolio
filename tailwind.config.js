/** @type {import('tailwindcss').Config} */
// Swiss International (pure) - token map.
// Single source of truth: CSS custom properties in src/index.css (section 1 of DESIGN-SYSTEM.md).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Channel-form tokens so opacity modifiers work: bg-canvas/90,
        // hover:bg-ink/[0.03], hover:border-ink/30.
        canvas: "rgb(var(--color-canvas-rgb) / <alpha-value>)",
        surface: "rgb(var(--color-surface-rgb) / <alpha-value>)",
        ink: "rgb(var(--color-ink-rgb) / <alpha-value>)",
        "ink-soft": "rgb(var(--color-ink-soft-rgb) / <alpha-value>)",
        muted: "rgb(var(--color-muted-rgb) / <alpha-value>)",
        accent: "rgb(var(--color-accent-rgb) / <alpha-value>)",
        "accent-bright": "rgb(var(--color-accent-bright-rgb) / <alpha-value>)",
        "accent-deep": "rgb(var(--color-accent-deep-rgb) / <alpha-value>)",
        hairline: "var(--color-hairline)",
        "card-border": "var(--color-card-border)",
        "card-border-hover": "var(--color-card-border-hover)",
        "tag-bg": "var(--color-tag-bg)",
        "tag-border": "var(--color-tag-border)",
        // Case study accent system (CASE-STUDY-SYSTEM.md section 2.2).
        // Values are swapped per page via .case-<slug> wrapper classes.
        "case-accent": "var(--case-accent)",
        "case-accent-deep": "var(--case-accent-deep)",
        "case-accent-bright": "var(--case-accent-bright)",
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
