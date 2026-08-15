# Design System: Digital Atelier / Engineer's Chronicle

Portfolio redesign v2. Buildable spec derived from `docs/DESIGN-DIRECTION.md` (commit cc30cae, branch `redesign-v2`).

- Source of truth: `docs/DESIGN-DIRECTION.md`
- Stack: React 19 + Vite + Tailwind + Framer Motion, GitHub Pages deploy
- Audience: recruiters, hiring managers, collaborators, clients
- Concept: warm physical shell (walnut, paper, tungsten light, grain, brass/amber) with a modern engineering core (precise type, real diagrams, smooth motion). NOT vintage cosplay, NOT bento, NOT terminal.

## 0. How to read this document

Every token below is a CSS custom property. The Tailwind config should map them via `extend.colors` / `extend.borderRadius` / `extend.boxShadow` / `extend.fontFamily` so components use Tailwind utilities against one source of truth. No hardcoded hex values in components.

Two design systems live in one token set:

- Chronicle: the homepage. Attraction, journal entries, big metrics, dates, EXPLORE PROJECT arrows.
- Case Study: project pages. Evidence, 01-08 spine, technical density.

Build order: tokens -> typography -> motion primitives -> components -> pages.

## 1. Design tokens

### 1.1 Color

One semantic token set shared by both modes. Values differ per mode; names never do. Dark mode is "evening atelier", light mode is "daylight workshop". DECIDED 2026-08-15: build DARK FIRST (evening atelier is the flagship). Light mode tokens are documented below and deferred; ship dark-only for v1, revisit light after launch.

Dark mode values (evening atelier):

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#000000` | PURE black. Page base, the room at night (decided 2026-08-15) |
| `--color-surface` | `#0B0A08` | Barely-warm near-black. Cards sit one quiet step off the canvas |
| `--color-surface-raised` | `#12100C` | Hover / elevated states, one more quiet step |
| `--color-walnut` | `#4A3226` | Warm wood tones for large surfaces and borders |
| `--color-walnut-light` | `#5C4033` | Lighter wood, dividers between cards |
| `--color-text-primary` | `#F3E8D3` | Warm cream, primary text |
| `--color-text-secondary` | `#C9B79E` | Secondary text (use for long body copy) |
| `--color-text-muted` | `#A98B6F` | Sepia, captions and metadata |
| `--color-accent` | `#E8A33D` | Amber glow. THE accent. Quotes, CTAs, cursor light |
| `--color-accent-hot` | `#FFD9A0` | Hot amber. Glow cores, emphasized text, hover states |
| `--color-accent-edge` | `#C96F4A` | Terracotta. Tags, timeline markers, saturated edge of light |
| `--color-hairline` | `rgba(243, 232, 211, 0.10)` | 1px section dividers, always sharp |
| `--color-bloom` | `rgba(255, 217, 160, 0.35)` | Shadow bloom base used by the glow system |

Light mode values (daylight workshop), same token names:

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#F4EBD8` | Warm cream paper |
| `--color-surface` | `#FBF3E2` | Paper cards |
| `--color-surface-raised` | `#FFF9EC` | Hover / elevated states |
| `--color-walnut` | `#5C4033` | Walnut ink for borders and accents |
| `--color-walnut-light` | `#7A5C44` | Lighter walnut |
| `--color-text-primary` | `#241812` | Espresso ink, primary text |
| `--color-text-secondary` | `#4A3A2A` | Secondary text |
| `--color-text-muted` | `#8A6B4F` | Sepia, captions |
| `--color-accent` | `#A8651C` | Deep amber. Text-level accent (AA on cream for large text) |
| `--color-accent-hot` | `#E8A33D` | Amber for fills and glows behind dark text |
| `--color-accent-edge` | `#C96F4A` | Terracotta, same family |
| `--color-hairline` | `rgba(36, 24, 18, 0.12)` | 1px dividers |
| `--color-bloom` | `rgba(232, 163, 61, 0.30)` | Glow base |

Rules:

- One accent family only: amber. Hot amber is the core, amber is the body, terracotta is the edge. Nothing else gets color.
- Dark canvas is pure black `#000000` by decision. Derived surfaces stay in the barely-warm near-black range (`#0B0A08` / `#12100C`) so the amber and lamp light own the warmth. Never use pure white.
- Text-level accent in light mode is the deep amber `#A8651C`, NOT `#E8A33D` (that fails contrast on cream). `#E8A33D` in light mode is a fill color only, always behind dark text.

Contrast (WCAG AA):

| Pair | Ratio | Verdict |
|---|---|---|
| cream `#F3E8D3` on pure black `#000000` | ~17.3:1 | Pass |
| cream `#F3E8D3` on surface `#0B0A08` | ~16.3:1 | Pass |
| amber `#E8A33D` on pure black `#000000` (dark, large display) | ~9.7:1 | Pass |
| deep amber `#A8651C` on cream `#F4EBD8` (light, large display) | ~3.9:1 | Pass AA large text, do not use for body text |
| espresso `#1A120C` text on amber `#E8A33D` button fill | ~8.6:1 | Pass |
| sepia `#A98B6F` on pure black (dark captions) | ~6.6:1 | Pass AA normal |
| hot amber `#FFD9A0` on pure black (dark tags) | ~15.7:1 | Pass |
| `#C96F4A` on cream (light tags) | ~3.05:1 | Large text only. For small mono tags use `#8A3A20` text on a `#C96F4A`/12 tint |

Tag color spec (AA-safe):

- Dark mode: text `#FFD9A0`, pill bg `rgba(232, 163, 61, 0.12)`, border 1px `rgba(232, 163, 61, 0.35)`
- Light mode: text `#8A3A20`, pill bg `rgba(201, 111, 74, 0.12)`, border 1px `rgba(201, 111, 74, 0.35)`

### 1.2 Radius (squircle geometry)

| Token | Value | Used on |
|---|---|---|
| `--radius-lg` | `26px` | Nav bar, workbench tool cards, chronicle large/chapter entries, contact buttons, large surfaces |
| `--radius-sm` | `14px` | Tags, small cards, input fields, small chronicle entries |
| `--radius-pill` | `999px` | Buttons, pills, nav links |
| `--radius-hairline` | `0` | Hairline section dividers stay SHARP. The exception is structural rules only, never card/container edges |

Shape consistency rule: every container, card, button, and nav element uses one of the three values above. No hard rectangular borders on surfaces anywhere.

### 1.3 Shadow and bloom system

Interactive elements glow via box-shadow bloom on hover/focus. Never a flat color swap.

| Token | Value | Use |
|---|---|---|
| `--shadow-card` | `0 1px 2px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.35)` | Resting cards |
| `--shadow-lift` | `0 2px 4px rgba(0,0,0,0.30), 0 12px 32px rgba(0,0,0,0.40)` | Hovered cards |
| `--shadow-bloom-sm` | `0 0 12px var(--color-bloom), 0 0 32px rgba(232, 163, 61, 0.10)` | Small interactive elements (links, tags) |
| `--shadow-bloom-md` | `0 0 20px var(--color-bloom), 0 0 48px rgba(232, 163, 61, 0.14)` | Buttons, workbench tools |
| `--shadow-bloom-lg` | `0 0 28px var(--color-bloom), 0 0 64px rgba(232, 163, 61, 0.18)` | Large surfaces, featured chronicle entries |
| `--focus-ring` | `2px solid var(--color-accent)` + `var(--shadow-bloom-sm)` | Keyboard focus |

Bloom transition: `box-shadow 300ms cubic-bezier(0.23, 1, 0.32, 1)`. Bloom replaces color-swap hover. Opacity of bloom stays under 0.35 so the page never washes out.

### 1.4 Spacing

4px base scale:

`--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-5: 20px`, `--space-6: 24px`, `--space-8: 32px`, `--space-10: 40px`, `--space-12: 48px`, `--space-16: 64px`, `--space-20: 80px`, `--space-24: 96px`, `--space-32: 128px`

Rhythm:

- Section vertical padding: `clamp(96px, 12vw, 160px)`
- Content max width: `1200px`
- Text measure: `68ch` max
- Card padding: `24px` (sm), `32px` (lg)
- Hairline dividers between sections: full-bleed 1px

### 1.5 Grain and lighting

Grain (fixed overlay, pure CSS, no image file):

- SVG `feTurbulence` data URI, fractalNoise, baseFrequency 0.9, 2 octaves
- Opacity `0.04`, `pointer-events: none`, `position: fixed`, `inset: 0`, `z-index: 50`, `mix-blend-mode: overlay`
- Does not move on scroll. Reduced-motion safe (static, no animation).

Layered lighting (lamplight against pure black, never a page-wide warm wash):

- Body background: pure black base plus two fixed radial gradients:
  - `radial-gradient(1200px 800px at 70% -10%, rgba(255, 217, 160, 0.05), transparent 60%)` (hot core, top right)
  - `radial-gradient(900px 600px at 10% 100%, rgba(201, 111, 74, 0.035), transparent 60%)` (terracotta edge, bottom left)
  - Opacities are tuned for the black base (2026-08-15): same perceived glow, quieter fill. The amber and lamp light pop MORE on pure black.
- Breathing glow: one dedicated layer behind the hero, `opacity` animates `0.05 -> 0.10` over `8s-12s` ease-in-out alternate, `transform-origin: top`, `pointer-events: none`. This is the ONLY breathing animation on the site. Disabled under reduced motion.

## 2. Typography

### 2.1 Font decisions

Three voices, locked:

- Display serif (the philosopher): **Spectral** (weights 400, 500, 600 + italic). Quote and section headlines at large sizes. Chosen over Newsreader: Spectral is the stronger editorial voice for this direction and clears the taste gate. Do not swap.
- Body sans (the engineer): **General Sans** (weights 400, 500, 600). Paragraphs and UI. Chosen over Outfit for the same reason. Fontshare license permits free commercial use and self-hosting.
- Mono (the ledger): **JetBrains Mono** (weights 400, 500, 700). All technical data, timestamps, labels, coordinates, status lines.

No other families on the site. No system font fallbacks visible in practice; declare `serif` / `sans-serif` / `monospace` as last-resort stacks only.

### 2.2 Type roles

| Role | Family / weight | Size | Line-height | Tracking | Notes |
|---|---|---|---|---|---|
| Hero quote | Spectral 500 | `clamp(2.75rem, 7vw, 6.5rem)` | `1.02` | `-0.015em` | The emotional peak. Center-left aligned |
| Hero attribution | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.22em` | Uppercase. `PLATO, REPUBLIC, BOOK II` |
| Section kicker | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.18em` | Uppercase, accent color |
| Section headline | Spectral 500 | `clamp(2rem, 4.5vw, 3.75rem)` | `1.05` | `-0.01em` | Chronicle voice |
| Ledger statement | Spectral 400 | `clamp(2rem, 4.5vw, 3.75rem)` | `1.15` | `-0.01em` | About section: one direct statement, serif display, max ~34ch |
| Body | General Sans 400 | `1.0625rem` | `1.65` | `0` | Paragraphs, max 68ch |
| Metric number | Spectral 500 | `clamp(3rem, 8vw, 6rem)` | `0.95` | `-0.02em` | `font-variant-numeric: lining-nums tabular-nums` |
| Metric label | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.14em` | Uppercase, muted |
| Tag | JetBrains Mono 400 | `0.6875rem` | `1.3` | `0.1em` | Uppercase, tag colors per section 1.1 |
| Button label | General Sans 500 | `0.9375rem` | `1` | `0.01em` | |
| Mono data | JetBrains Mono 400 | `0.875rem` | `1.5` | `0` | Dates, coordinates, status lines |

### 2.3 Self-host strategy

- All fonts self-hosted in `/public/fonts/`. Zero external font CDN calls at runtime.
- Formats: woff2 only (modern browsers only; this is a 2026 site).
- `font-display: swap` on every face.
- Preload the hero serif face (`<link rel="preload" as="font">`) because it is LCP-critical.
- Subset to latin. Keep weights lean: Spectral 400/500/600 + italic 400, General Sans 400/500/600, JetBrains Mono 400/500/700.
- Font file names: `spectral-500.woff2`, `general-sans-400.woff2`, `jetbrains-mono-400.woff2`, and so on.

## 3. Component specs

### 3.1 Nav

Floating pill bar, not a full-width header:

- Container: `max-width 1200px`, centered, `position: fixed`, top `16px`, left/right `16px`, `border-radius: 26px` (large squircle)
- Surface: frosted glass. `backdrop-filter: blur(24px) saturate(1.5)`, bg `rgba(0, 0, 0, 0.50)` over the pure black base, 1px hairline border, plus a 1px inner top highlight `inset 0 1px 0 rgba(255,255,255,0.08)` for the glass edge. Light mode (deferred): `rgba(244, 235, 216, 0.78)`
- Content: wordmark left (JetBrains Mono 500, `DAUDA NASIR` or `DN` monogram), links right
- Links (mono, uppercase, `0.75rem`): `ABOUT`, `WORKBENCH`, `CHRONICLE`, `CONTACT`. Anchor to sections, `scroll-margin-top: 96px` so the floating bar never covers targets
- Active/hover: hot amber text + `--shadow-bloom-sm` + hairline amber underline
- Mobile: wordmark + a `MENU` pill button (44px min target). Tapping opens a full-screen overlay (canvas color, grain, serif links at `clamp(2rem, 8vw, 3rem)`, staggered entrance). Close button top right
- Nav is the ONLY fixed element on the homepage

### 3.2 Hero

- `min-height: 100dvh` with `100svh` fallback, `display: grid`, place-items center-left
- Content: the Plato quote only, plus the mono attribution beneath. No kicker, no badges, no scroll cue
- DECIDED 2026-08-15: hero background stays BLANK for v1 (breathing glow layer + grain + radial gradients only). Nasir will supply the warm interior image later; the layout must reserve the image zone so it drops in without layout change. Implement the background as a dedicated layer/slot (e.g. an absolutely-positioned `<div>` behind the quote) that can receive the image later
- Quote text: cream, with `--color-accent-hot` used for ONE word or phrase max (e.g. "beginning"), not sprinkled
- Attribution: `PLATO, REPUBLIC, BOOK II` in mono, muted color, letter-spaced
- Entrance: quote rises + unblurs over 800ms expo-out; attribution follows 120ms later (see motion spec)
- The quote is locked: "The beginning is the most important part of any work." Nothing replaces it

### 3.3 Ledger / About (who I am)

One direct statement, no cards, no ledger furniture. DECIDED 2026-08-15: straight to the point, minimal.

- Section: single serif display statement, `Spectral 400`, `clamp(2rem, 4.5vw, 3.75rem)`, `leading 1.15`, `tracking -0.01em`, max ~34ch
- Copy (his words, polished): "My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer." / "I build products. I'm a product-minded developer."
- No metadata table, no Entry 001, no ruled ledger rows, no section heading or kicker. Generous whitespace, `py clamp(96px, 12vw, 160px)`, same container as every section
- Section id stays `ledger` (nav link label is `ABOUT`; href `#ledger` keeps working)

### 3.4 Workbench (SYSTEMS I BUILD)

NOT a bento grid. NOT a dashboard. A workbench: tools laid on a surface with notes attached.

- Section header: kicker `THE WORKBENCH`, headline `SYSTEMS I BUILD`
- Layout: asymmetric staggered list, not equal cards. Each tool is a 26px squircle card sitting on the bench plane with `--shadow-card`, varying width (some 7/12, some 5/12, alternating), vertical stagger of 24-48px between rows
- Bench surface: the section has a subtle horizontal "table edge" shadow line under the header to ground the metaphor. One line, no over-decorating
- Each tool card carries:
  - Tool name: Spectral 500, `1.75rem-2.25rem`
  - Domain tags: mono pills (e.g. `BACKEND`, `AI`, `DATA`)
  - Technical note: body text, 1-2 sentences, real and specific
  - Status line: mono, e.g. `STATUS / PRODUCTION`, `STATUS / ACTIVE TOOL`
- The five tools (locked): Python, Flutter, FastAPI, Cloudflare / GCP, AI Systems
- Hover: `--shadow-lift` + `--shadow-bloom-md`, no color swap

### 3.5 Chronicle entry (journal style)

Entries feel like pages of an engineer's journal, never cards in a grid. Each entry carries five things: what it is, when it was built, why care (one line), evidence (metrics), and the invitation (EXPLORE PROJECT).

Common anatomy (all variants):

- Year: JetBrains Mono, large (the date is a first-class visual, not metadata)
- Title: Spectral 500 headline
- One-line why-care: General Sans body, muted-secondary
- Metrics row: metric numbers composed as large figures (see 3.6)
- Stack tags: mono pills
- EXPLORE PROJECT: link with right arrow, amber, underline grows on hover, arrow nudges +4px. Wraps to the case study route

Scaled variants (never the same card twice):

1. Small (early work: Soiling Detection System, TRAKS): single row, year left in mono `1.25rem`, title + one line right, minimal metrics inline. Card radius 14px or no card at all, hairline between rows. Reads like a journal index
2. Medium (Engineering Hub): two-column. Text left (year, title, one-liner, tags), visual right (screenshot / diagram in a 26px frame). One large metric emphasized
3. Large (NUESA Academia): full-width editorial spread. Big year `clamp(3rem, 6vw, 5rem)` in mono, headline, 2-4 metric figures in a composition band, visual below at 16:10
4. Smaller entries arranged around larger ones: RAG Data Pipeline sits as a compact entry beside or below the large NUESA spread, reinforcing scale contrast. Use a 5/12 width compact variant with a strong metric (`1M+ CHUNKS`)

Click handling: chronicle entries are clickable (the whole entry navigates on EXPLORE PROJECT and on the visual). Because entries use scroll-reveal transforms, attach click handlers via event delegation on a stable parent (the chronicle section) using `event.target.closest('[data-entry]')`, or ensure `pointer-events: all` on entry elements. This is a known pitfall with staggered reveal transitions.

### 3.6 Metrics display (large numbers as composition)

- Numbers are the dominant visual, not metadata: Spectral 500, `clamp(3rem, 8vw, 6rem)`, `font-variant-numeric: lining-nums tabular-nums`
- Unit / label in mono below, uppercase, muted
- Composition band: 2-4 metrics in a row separated by 1px hairlines (sharp, per the exception), asymmetric alignment (baseline aligned, not boxed)
- Never decorate numbers with fake precision. Every figure on the site is real and verified (section 7 marks the TODO-CONFIRM set)
- Example band: `2,000+ PDFS PROCESSED` | `1M+ SEMANTIC CHUNKS` | `40% BACKEND LOAD REDUCED`

### 3.7 Case study page spine (01-08)

- Desktop: sticky left rail (fixed under nav on scroll), width ~200px, JetBrains Mono uppercase items `01 OVERVIEW` through `08 LINKS`
- Rail behavior: hairline progress line that fills as the reader scrolls (framer-motion `useScroll` on the article ref); the active section label is hot amber with `--shadow-bloom-sm`; clicking scrolls to that section
- Content column right, max-width 68ch for prose, technical elements (diagrams, code, tables) full-bleed within the column
- Each section opens with a mono section label + serif headline
- Sections: 01 Overview, 02 The Problem, 03 Product, 04 Architecture, 05 Engineering, 06 Scale / Impact, 07 Lessons, 08 Links
- Mobile: the rail becomes a horizontal chip scroller pinned under the nav (mono pills, active = amber). No sticky left rail on small screens

### 3.8 AWUN documentary sections

AWUN is the capstone chapter, a progressive technical documentary. Five sections in order:

1. The system: client -> API -> Worker -> D1/R2 -> external services. Architecture diagram, real, not decoration
2. The marketplace: Buyer, Product, Cart, Checkout, Payment, Order, Vendor. Domain model diagram + flows
3. The intelligence layer: the AI components (storefront creation, product intelligence). Explain what the model actually does
4. The infrastructure: why Cloud Run, Cloudflare, R2, D1. Cost reasoning (repo docs verify ~$0-2/mo at phase 1)
5. The difficult parts: engineering decisions that prove real understanding. Code snippets + trade-off prose

Treatment: each section is a "chapter" with a huge mono index (`CH. 01`), serif headline, technical content. The chapter index doubles as scroll progress. Visual weight is the heaviest on the homepage: near-full-viewport opening band, `--shadow-bloom-lg`, full-bleed diagram. Progressive reveal on scroll, one chapter at a time.

### 3.9 Closing / contact

- Warm sign-off: serif line (Spectral, `clamp(1.5rem, 3vw, 2.25rem)`), e.g. "Every system begins with a single line. Every chronicle with a first entry."
- Contact row: EMAIL / GITHUB / LINKEDIN / CV as mono uppercase links with amber underline hover, arranged in a row (vertical stack on mobile)
- Mono status line beneath, e.g. `STATUS / OPEN TO COLLABORATION` or the CV callout
- No version footers, no decoration strips, no "built with" lines. End clean

## 4. Motion spec

One discipline: slow restraint. Nothing bounces, nothing spams. Every animation has a job.

### 4.1 Reveals

- Rise + blur fade: `opacity: 0 -> 1`, `translateY(24px -> 0)`, `filter: blur(8px -> 0)`
- Duration: 700-900ms, ease: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- Stagger: 80ms between sibling items. One beat at a time, never the whole page at once
- Trigger: `whileInView` with `once: true` (framer-motion IntersectionObserver-based; no window scroll listeners)
- Never animate from `scale(0)`. If an element scales, start from `0.95` with opacity
- UI micro-transitions (hover, press, dropdown): under 300ms, `cubic-bezier(0.23, 1, 0.32, 1)`
- Press feedback: `scale(0.97)` on `:active` for all pressable elements, 100-160ms

### 4.2 Timeline scroll behavior

- The chronicle section has a vertical progress line (2px, hairline sharp at the ends, amber gradient fill)
- Fill driven by framer-motion `useScroll({ target: sectionRef, offset: ["start 0.75", "end 0.6"] })` mapped to `scaleY`. No `window.addEventListener('scroll')` anywhere
- Year milestones: dots on the line, terracotta ring + bloom when active; they "click into place" (scale 0.95 -> 1 + opacity) as the reader passes them
- Clicking a milestone scrolls to the entry via `scrollIntoView({ behavior: 'smooth', block: 'start' })` with `scroll-margin-top` set

### 4.3 Hover and bloom

- Cards: quiet lift `translateY(-2px)` + `--shadow-bloom-md`, 300ms ease-out
- Links: amber underline grows (background-size 0 -> 100% or scaleX), color to hot amber
- Buttons: `--shadow-bloom-sm`, slight lift, press `scale(0.97)`
- Bloom is box-shadow only. No background color swap on interactive hover. This is the lamp metaphor in motion

### 4.4 Ambient cursor (implementation notes)

- Desktop only: gate on `matchMedia('(pointer: fine)')`. Never on touch
- One fixed element: 480px circle, `background: radial-gradient(circle, rgba(232, 163, 61, 0.14), rgba(232, 163, 61, 0.04) 40%, transparent 70%)`, `mix-blend-mode: screen`, `pointer-events: none`, `z-index: 40`, `will-change: transform`
- Lerp: track target from `pointermove`, current position updates per `requestAnimationFrame` with a lerp factor 0.08-0.12. Use `transform: translate3d` only, no layout writes
- Idle: opacity 0, or nearly invisible while moving
- On interaction: when the pointer is over `[data-bloom]` regions (cards, diagrams, links), opacity ramps to 0.5-0.7, illuminating the region. Detect via `mouseover` event delegation on the document checking `closest('[data-bloom], a, button')`
- Never repaint the whole page: only the cursor element's transform and opacity change
- Disabled entirely under `prefers-reduced-motion` and on touch. The cursor light is the ONLY cursor treatment on the site

### 4.5 Reduced-motion fallbacks

Global `prefers-reduced-motion: reduce`:

- All reveals become opacity-only, 300ms max, no translate, no blur
- Timeline line renders static full-height, milestones static
- Breathing glow frozen (animation removed)
- Ambient cursor display none
- Hover blooms still allowed (color/shadow are fine) but no lift, no blur
- CSS: a media query short-circuits durations; Framer Motion uses `useReducedMotion()` for JS-driven values

## 5. Mobile behavior (under 768px)

Explicit collapse rules per section:

| Section | Behavior under 768px |
|---|---|
| Nav | Wordmark + MENU pill. Full-screen overlay menu with serif links, staggered entrance, close button |
| Hero | `min-height: 100svh`. Quote clamp to `2.75rem` floor, left-aligned, attribution below. Breathing glow stays |
| Ledger / About | Single column. One direct serif statement, generous whitespace, no metadata rows |
| Workbench | Single column stack, tools full-width, notes below name, stagger removed |
| Chronicle | Single column. Year inline above title (small variant pattern for ALL entries). Metrics band wraps to 2-col grid. Large/chapter entries keep full-bleed visual but reduce padding to 24px |
| Timeline | Progress line hidden or moved to a 2px left rail, milestones become small dots |
| Case study spine | Horizontal mono chip scroller pinned under nav, active = amber. No sticky rail |
| AWUN | Chapters stack. Diagrams full-width. Chapter index inline |
| Closing | Contact links stack vertically, full-width tap targets |
| All | Touch targets min 44x44px. No hover-dependent interactions; active state = bloom + scale 0.97. `overscroll-behavior` normal |

## 6. Page-by-page layout

### 6.1 Homepage

Section order (locked): Hero -> Ledger -> Workbench -> Chronicle -> AWUN chapter -> Closing.

1. Hero: 100dvh, quote + attribution, breathing glow, grain
2. Hairline divider
3. Ledger / About: one direct serif statement, no metadata table, no Entry 001
4. Hairline divider
5. Workbench: kicker + headline, staggered tool cards
6. Hairline divider
7. Chronicle: kicker + headline, timeline line with milestones, entries in scale order:
   - Small: Soiling Detection System (2024)
   - Small: TRAKS
   - Medium: Engineering Hub
   - Large: NUESA Academia, with compact RAG Data Pipeline entry beside/below
   - Chapter: AWUN (massive band, links to the documentary)
8. AWUN chapter band: near-full-viewport opening, `CH. 01-05` teaser chips, EXPLORE PROJECT
9. Hairline divider
10. Closing: sign-off, contact row, mono status line

### 6.2 Case study template (one template, 8 sections)

- Top: mono breadcrumb back to Chronicle (`<- CHRONICLE`), project title (serif), year + stack tags, one-line what-it-is
- Body: sticky 01-08 spine left, content right (section 3.7)
- Content sections carry: prose (68ch), real architecture diagrams (SVG), screenshots/videos (WebP, lazy), code snippets (mono, walnut-tinted block), metrics bands
- 06 Scale / Impact: metrics band + honest context. No invented numbers
- 07 Lessons: "what I learned, what I would do differently" as a short list
- 08 Links: live app, GitHub, store links as mono rows
- Templates in scope: Engineering Hub, NUESA Academia, RAG Data Pipeline, Soiling Detection System, TRAKS. AWUN gets the documentary treatment instead (6.3)

### 6.3 AWUN special treatment

- Not the standard 01-08 spine. A progressive documentary: CH. 01 the system, CH. 02 the marketplace, CH. 03 the intelligence layer, CH. 04 the infrastructure, CH. 05 the difficult parts
- Homepage chapter band is the doorway: big AWUN title, 5 mono chapter chips, EXPLORE PROJECT
- The page itself: each chapter is a full section with huge mono index, serif headline, then the technical content (diagram / model / code / cost table)
- Progress: chapter index doubles as scroll progress on the right edge (desktop) or the horizontal chip scroller (mobile)
- The "difficult parts" chapter is visually distinct: dark walnut band, code-first layout, trade-off prose

## 7. Content slots

Copy and imagery needed per slot. Metrics marked TODO-CONFIRM must be verified with Nasir before publish; nothing ships with fake numbers.

### Hero

| Slot | Content | Status |
|---|---|---|
| Quote | "The beginning is the most important part of any work." | LOCKED |
| Attribution | PLATO, REPUBLIC, BOOK II | LOCKED |

### Ledger / About

| Slot | Content | Status |
|---|---|---|
| Statement 1 | My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer. | LOCKED (his words, polished) |
| Statement 2 | I build products. I'm a product-minded developer. | LOCKED (his words, polished) |

### Workbench (tool notes, real and specific)

| Tool | Domain | Note | Status |
|---|---|---|---|
| Python | BACKEND / AI / DATA | Note on scale or specific system | Needs copy |
| Flutter | CROSS-PLATFORM | Note on apps shipped | Needs copy |
| FastAPI | HIGH-PERFORMANCE APIS | Note on throughput / async | Needs copy |
| Cloudflare / GCP | INFRASTRUCTURE | Note on architecture | Needs copy |
| AI Systems | AGENTS / EMBEDDINGS | Note on RAG / agents | Needs copy |

### Chronicle entries

| Entry | Year | Metrics | Metric status |
|---|---|---|---|
| Soiling Detection System | 2024 | 3mW continuous monitoring; 99.98% XGBoost accuracy; two-layer CUSUM + classifier (verified in repo README) | CONFIRMED |
| TRAKS | 2024 | Vector search under 500ms; real-time alerts; geolocation + reverse geocoding | CONFIRMED (from design direction; re-verify exact figures in repo) |
| Engineering Hub | 2024 | 250 downloads (BuildVerse context, REAL figure confirmed by Nasir 2026-08-15); 500+ / 130K+ / 27% example figures NOT used | CONFIRMED |
| NUESA Academia | 2024/2025 | 800-1,200 students monthly; 9 departments; 2,000+ PDFs; 461-line Cloudflare Worker; 40% backend load reduction; up to 60% pipeline cost reduction; 20 questions per subtopic | CONFIRMED (verify exact copy in repo docs) |
| RAG Data Pipeline | 2025 | 2,000+ PDFs; 1M+ semantic chunks; OpenCV orientation correction; EasyOCR / Gemma 3:27b transcription | CONFIRMED (verify exact copy in repo docs) |
| AWUN | 2025/2026 | Live platform; AI storefront creation; payment verification; inventory. No published user/transaction numbers | TODO-CONFIRM (do not invent) |

### Case study pages

- Screenshots: Engineering Hub app screens, NUESA app screens, RAG pipeline diagram, Soiling monitoring visual, TRAKS app screens. WebP, lazy, hero preload
- Architecture diagrams: real, SVG, one per case study. Source from repo docs, not decorative
- Video: none required. Screenshots + diagrams suffice at v2 launch

### Imagery rules

- WebP everywhere, lazy loading below the fold, hero preload
- No stock photos. Warm interior photo for hero is an OPEN decision in the design direction; the typographic hero (quote + glow + grain) is the default and requires no image
- Diagrams must be real representations of the systems, derived from repo docs

## 8. Build checklist (quality gates)

- [ ] No em dashes anywhere in copy or code comments
- [ ] One accent family (amber) everywhere; no second accent color
- [ ] Radius values only from the scale: 26 / 14 / 999, hairlines sharp
- [ ] All interactive hover states use bloom (box-shadow), never flat color swaps
- [ ] All buttons pass AA contrast (espresso text on amber fill)
- [ ] No scroll cues (no "scroll down" affordances)
- [ ] No fake-precise numbers. TODO-CONFIRM metrics resolved before publish
- [ ] WCAG AA text contrast in both modes; focus rings visible (2px amber + bloom)
- [ ] Heroes use 100dvh with svh fallback
- [ ] No `window.addEventListener('scroll')` anywhere. Use framer-motion `useScroll` / `whileInView` / IntersectionObserver
- [ ] prefers-reduced-motion respected globally (section 4.5)
- [ ] All fonts self-hosted woff2, font-display swap, hero face preloaded
- [ ] LCP under 2.5s, CLS under 0.1
- [ ] Touch targets >= 44px on mobile

## 9. Open decisions and risks

Carried from the design direction (section 11), resolved or flagged:

1. Mode strategy: DECIDED 2026-08-15 - dark only for v1 (evening atelier flagship). Light mode deferred, revisit after launch.
2. Hero visual: DECIDED 2026-08-15 - blank reserved background for v1. Nasir supplies the interior image later; hero has a dedicated background slot ready for it.
3. Engineering Hub metrics: DECIDED 2026-08-15 - use 250 downloads (real, BuildVerse context). The 500+ / 130K+ / 27% example figures are NOT used.
4. AWUN metrics: none published. Do not invent. The AWUN page can lead with system facts (5 chapters, infra cost model) instead of user counts.
5. Chronicle scale order: the design direction lists Soiling/TRAKS small, Engineering Hub medium, NUESA large, RAG smaller, AWUN chapter. Confirmed in this spec; final pass belongs to Nasir before content freeze.
6. Fonts: Spectral and General Sans chosen over Newsreader and Outfit on taste-gate grounds. Both are self-hostable and license-clean (Spectral OFL, General Sans Fontshare free commercial). If Nasir objects, the fallback pair is Spectral + Sora (Sora clears the same gate; Newsreader and Outfit do not).
7. Risk: the old v1 site (NetworkBackground, Terminal, TiltCard components) carries visual patterns this system explicitly rejects. The build must delete or fully re-skin those components, not layer the new tokens on top.
8. Risk: chronicle entry click handlers + scroll-reveal transforms conflict if implemented naively. Use event delegation on the section parent (section 3.5) to avoid dead clicks.
