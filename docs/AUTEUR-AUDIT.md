# Auteur audit, 2026-10-31

An outside audit of the homepage and the case study routes, run with the
auteur verify pipeline (slopscan, screenshot journey at 390 / 768 / 1440,
numeric rubric, keyboard pass). The project has no `design/DESIGN.md`, so
this was an audit, not an auteur build.

Base commit: `796621b`.

## Gate results

| Gate | Before | After |
|---|---|---|
| slopscan | 0 fails, 0 warns | 0 fails, 0 warns, 0 suppressed |
| Body contrast | 4.83:1 floor, 0 below 4.5 | 4.83:1 floor, 0 below 4.5 |
| Header over the ink band | 1.06:1 (transparent) | 18.3:1 (solid white) |
| LCP, Fast 3G, CPU 4x, production | 3756 ms | 1680 ms |
| FCP, same run | 2808 ms | 1680 ms |
| CLS | 0.00 | 0.00 |
| First JS chunk | 501.30 kB (145.85 gzip) | 358.67 kB (112.98 gzip) |
| Keyboard | ESC dead, no trap, no skip link | ESC closes, trap holds, focus returns, skip link first |
| Console | React warning on every case route | clean on engineering-hub and awun |
| Reduced motion | pass | pass, 0 hidden text |
| No-JS | readable | readable |
| Horizontal overflow at 390 / 768 | none | none |

## What was fixed

1. **Header fill (contrast).** `bg-canvas/90` never compiled: Tailwind drops
   an opacity modifier on a bare `var()` color. The fixed bar had only
   `backdrop-blur`, so over the ink band the wordmark measured 1.06:1 and the
   nav 1.92:1. Color tokens now carry channels (`--color-ink-rgb`), the bar is
   solid white, and every alpha utility in the source compiles again
   (`hover:bg-ink/[0.03]`, `hover:border-ink/30`, `bg-ink/[0.02]`,
   `bg-canvas/30`).
2. **Hero LCP.** The H1 sat inside a `Reveal` that starts at `opacity: 0`, so
   the largest text waited for React and framer-motion. The hero now renders
   visible. Case study routes load with `React.lazy` and `Suspense`.
3. **Two peaks.** Projects now comes before the Workbench, and the ink band is
   tighter (`72-120px` padding) with no kicker. It reads as a coda. The work
   holds the body of the page.
4. **One entrance for everything (ban 11).** `Reveal` gained `rise`, `scale`
   and `fade`. Project text rises, project media settles from 0.98, section
   headers fade. The hero has no reveal.
5. **Kickers (bans 6 and 7).** `01 / About`, `02 / Workbench`, `03 / Projects`
   and `04 / Contact` are gone. About opens with a hairline rule, Workbench
   with a change of field, Projects with the one kicker `THE WORK`, Contact
   with air. Project rows keep their index numbers, which are a real sequence.
6. **Mobile menu keyboard.** ESC closes the overlay, focus enters on open,
   Tab stays inside, and focus returns to the trigger on close.
7. **Console error.** `leading-normal` was passed as a bare attribute on an
   SVG `<text>`. Removed.
8. **Content mismatch.** Engineering Hub listed `GEMINI` in its pipeline and
   `FIREBASE` in its chips. The chips now carry both, because the case study
   uses both.
9. **Copy.** "I help businesses, organizations, and startups build high-impact
   digital products" became "I build production backends, web platforms, and
   mobile apps for startups and institutions." The adjective was not checkable.
10. **Wrap defects found after the first pass.** The About measure was set in
    `ch` on a 16px wrapper, which collapsed the display statement into
    one-word lines. The measure now sits on the paragraph in `rem`. The
    Projects heading uses `text-wrap: balance`, so `deployed` no longer dangles.

## Deliberate allows

- **The sign-off stays.** "Every system begins with a single line." is a
  sign-off, not a product claim. It is the page's voice and it costs one line.
- **Mono service type stays.** JetBrains Mono carries nav, index numbers, tags
  and status. It is the Swiss system of the site, and it is paired with a
  grotesque on a real contrast axis. This is house tell 2, kept with a reason.
- **The giant name stays.** It is the wordmark-as-hero, house tell 6, and the
  portfolio first-order reflex. It is also the whole idea of the page: a Swiss
  poster with one name on it. The audit did not replace it. A rebuild would.

## Known, not fixed

- `docs/DESIGN-SYSTEM.md` still carries stale text outside the sections this
  audit touched: the tool count (says five, there are eleven) and the project
  grid description (describes spans, the code uses alternating rows).
- The case study pages keep seven accent hues. That is the documented
  case-study system, not drift.
- The footer has no rule; by design.
