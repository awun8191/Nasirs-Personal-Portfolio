// The invitation (3.5): mono link, underline grows, arrow nudges on hover.
// tone: default = accent on white; tint = accent-deep on tinted fields;
// light = white on the filled blue band / ink card. 44px hit area via the after pseudo.
export default function ExploreLink({
  href,
  label = "Explore Project",
  ariaLabel,
  tone = "default",
}: {
  href: string;
  label?: string;
  ariaLabel?: string;
  tone?: "default" | "tint" | "light";
}) {
  const color =
    tone === "light" ? "text-white" : tone === "tint" ? "text-accent-deep" : "text-accent";
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] link-underline after:absolute after:inset-x-0 after:-inset-y-[6px] after:content-[''] ${color}`}
    >
      {label}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-ui group-hover:translate-x-1"
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}
