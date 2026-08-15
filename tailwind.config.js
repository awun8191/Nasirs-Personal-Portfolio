/** @type {import('tailwindcss').Config} */
// Swiss International + brutalism accents - token map.
// Single source of truth: CSS custom properties in src/index.css (section 1 of DESIGN-SYSTEM.md).
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-tint": "var(--color-surface-tint)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        "accent-bright": "var(--color-accent-bright)",
        "accent-deep": "var(--color-accent-deep)",
        hairline: "var(--color-hairline)",
        "tag-bg": "var(--color-tag-bg)",
        "tag-border": "var(--color-tag-border)",
      },
      borderRadius: {
        sharp: "0px",
        sm: "var(--radius-sm)",
        lg: "var(--radius-lg)",
      },
      boxShadow: {
        "hard-sm": "var(--shadow-hard-sm)",
        hard: "var(--shadow-hard)",
        "hard-lg": "var(--shadow-hard-lg)",
        "hard-accent": "var(--shadow-hard-accent)",
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
