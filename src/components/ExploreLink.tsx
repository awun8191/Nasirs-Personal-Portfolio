// The invitation (3.5): Swiss button or link, arrow nudges on hover, active press feedback.
export default function ExploreLink({
  href,
  label = "Explore Project",
  ariaLabel,
  variant = "primary",
  tone = "default",
}: {
  href: string;
  label?: string;
  ariaLabel?: string;
  variant?: "primary" | "secondary" | "link";
  tone?: "default" | "tint" | "light";
}) {
  if (variant === "primary") {
    const bgClass =
      tone === "light"
        ? "bg-white text-ink hover:bg-accent-bright hover:text-white"
        : "bg-ink text-white hover:bg-accent";
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={`group/btn relative inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] transition-all duration-160 ease-ui active:scale-[0.97] ${bgClass}`}
      >
        <span>{label}</span>
        <span
          aria-hidden
          className="transition-transform duration-200 ease-ui group-hover/btn:translate-x-0.5"
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

  if (variant === "secondary") {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="group/btn relative inline-flex items-center justify-center gap-2 rounded-sm border border-card-border bg-surface px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ink transition-all duration-160 ease-ui hover:border-ink hover:bg-ink/[0.03] active:scale-[0.97]"
      >
        <span>{label}</span>
        <span
          aria-hidden
          className="transition-transform duration-200 ease-ui group-hover/btn:translate-x-0.5"
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

  const color =
    tone === "light" ? "text-white" : tone === "tint" ? "text-accent-deep" : "text-accent";
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={`group relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] link-underline after:absolute after:inset-x-0 after:-inset-y-[6px] after:content-[''] ${color}`}
    >
      <span>{label}</span>
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
