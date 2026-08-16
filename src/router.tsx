import { useEffect, useState } from "react";

// Minimal dependency-free path router for the case study routes.
// The homepage is a single page with anchor sections; the six
// /projects/* routes render dedicated case study components.
//
// GitHub Pages deep links: public/404.html saves the requested path to
// sessionStorage and redirects to "/", then restorePendingRoute() reads
// it back and rewrites the URL before React mounts.

const ROUTE_EVENT = "ghp:route";

function currentPath(): string {
  return window.location.pathname;
}

export function navigate(path: string) {
  if (path === window.location.pathname) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

// Reads a route saved by public/404.html and makes it the real URL.
// Must run before React renders.
export function restorePendingRoute(): string | null {
  try {
    const saved = sessionStorage.getItem("ghp_route");
    if (saved && saved.indexOf("/projects/") === 0) {
      sessionStorage.removeItem("ghp_route");
      window.history.replaceState({}, "", saved);
      return saved;
    }
  } catch (e) {
    /* ignore */
  }
  return null;
}

export function initRouter() {
  // Client-side navigation for the project links. Plain anchors with
  // hash targets (#about) and external links are left untouched.
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented) return;
    if (event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as Element).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href");
    if (!href || href.indexOf("/projects/") !== 0) return;
    event.preventDefault();
    navigate(href);
  });
}

export function useRoute(): string {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const sync = () => setPath(currentPath());
    window.addEventListener("popstate", sync);
    window.addEventListener(ROUTE_EVENT, sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener(ROUTE_EVENT, sync);
    };
  }, []);

  return path;
}
