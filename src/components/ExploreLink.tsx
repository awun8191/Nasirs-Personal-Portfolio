// The invitation (3.5): mono link, underline grows, arrow nudges on hover.
// light variant for the AWUN blue band. 44px hit area via the after pseudo.
export default function ExploreLink({
  href,
  label = "Explore Project",
  light = false,
}: {
  href: string;
  label?: string;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] link-underline after:absolute after:inset-x-0 after:-inset-y-[6px] after:content-[''] ${
        light ? "text-white" : "text-accent"
      }`}
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
