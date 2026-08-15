// The invitation (3.5): amber mono link, underline grows, arrow nudges +4px on hover.
export default function ExploreLink({ href, label = "Explore Project" }: { href: string; label?: string }) {
  return (
    <a
      href={href}
      data-bloom
      className="group relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent link-underline after:absolute after:inset-x-0 after:-inset-y-[6px] after:content-['']"
    >
      {label}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-ui group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
