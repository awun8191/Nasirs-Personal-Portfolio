# Design System: Swiss International (Pure)

Portfolio redesign v2. Buildable spec derived from `docs/DESIGN-DIRECTION.md` (branch `redesign-v2`, updated 2026-08-15).

- Source of truth: `docs/DESIGN-DIRECTION.md`
- Stack: React 19 + Vite + Tailwind + Framer Motion, GitHub Pages deploy
- Audience: recruiters, hiring managers, collaborators, clients
- Concept: pure Swiss International Style (strict grid, massive type, discipline, sharp edges, flat surfaces, hairline rules). NO brutalist accents: no hard shadows, no thick borders. NOT neo-brutalism, NOT the old dark atelier.

## 0. How to read this document

Every token below is a CSS custom property. The Tailwind config maps them via `extend.colors` / `extend.borderRadius` / `extend.boxShadow` / `extend.fontFamily` so components use Tailwind utilities against one source of truth. No hardcoded hex values in components.

Build order: tokens -> typography -> motion primitives -> components -> pages.

## 1. Design tokens

### 1.1 Color

One light theme. White dominant, ink text, one blue accent family. No dark mode in v1 (locked 2026-08-15).

| Token | Value | Role |
|---|---|---|
| `--color-canvas` | `#FFFFFF` | White canvas. Page base |
| `--color-surface` | `#FFFFFF` | White card field (paper cards: TRAKS, Engineering Hub, NUESA) |
| `--color-ink` | `#111111` | Near-black primary text (never pure black); also the black card field |
| `--color-ink-soft` | `#3F3F46` | Secondary text, long body copy |
| `--color-muted` | `#6B7280` | Captions, mono labels, index numbers |
| `--color-accent` | `#2563EB` | THE accent. Name, index numbers, links, CTAs, AWUN band |
| `--color-accent-bright` | `#3B82F6` | Hover / large fills; ink-card index numbers |
| `--color-accent-deep` | `#1D4ED8` | Small blue text (tags) that must pass AA |
| `--color-hairline` | `rgba(17, 17, 17, 0.14)` | 1px dividers |
| `--color-card-border` | `rgba(17, 17, 17, 0.18)` | 1px card outline |
| `--color-card-border-hover` | `rgba(17, 17, 17, 0.5)` | Card outline on hover (border deepens, no shadow) |
| `--color-tag-bg` | `rgba(37, 99, 235, 0.06)` | Tag pill background |
| `--color-tag-border` | `rgba(37, 99, 235, 0.25)` | Tag pill border |

Rules:

- One accent family only: blue. No amber, no warm browns, no second color.
- Text-level accent is `#2563EB` (AA on white for normal text). `#3B82F6` is for large text and fills only (fails AA at small sizes). `#1D4ED8` is the AA-safe small-text blue.
- Ink is `#111111`, never `#000000` (a11y discipline).
- Card variety rule (3.5): card fields alternate WHITE and BLACK only, arranged in a diagonal rhythm (Soiling and RAG are ink, TRAKS / Engineering Hub / NUESA are paper). No tinted fields, no accent strips, no gray shading, no shadows. Blue appears on cards only in index numbers, text accents, and links; the one filled blue surface is the AWUN chapter band (frozen).

Contrast (WCAG AA):

| Pair | Ratio | Verdict |
|---|---|---|
| ink `#111111` on white `#FFFFFF` | ~18.3:1 | Pass |
| ink-soft `#3F3F46` on white | ~10.2:1 | Pass |
| muted `#6B7280` on white | ~4.8:1 | Pass AA normal |
| accent `#2563EB` on white | ~5.2:1 | Pass AA normal |
| white on accent `#2563EB` (chapter band) | ~5.2:1 | Pass AA normal |
| white/90 on accent `#2563EB` (band body) | ~4.5:1 | Pass AA normal |
| white on ink `#111111` (ink card) | ~18.9:1 | Pass |
| white/85 on ink `#111111` (ink card body) | ~15.8:1 | Pass |
| accent-bright `#3B82F6` on ink `#111111` (ink index) | ~5.1:1 | Pass AA normal |

### 1.2 Radius (sharp geometry)

| Token | Value | Used on |
|---|---|---|
| `--radius-lg` | `4px` | Cards, project entries, chapter band, buttons |
| `--radius-sm` | `2px` | Tags, small chips |
| default (no class) | `0px` | Nav, hairlines, list rows, mobile overlay |

The old 26/14/999 squircle system is gone (2026-08-15). No element uses a pill or large radius.

### 1.3 Border system (hairline rules, no shadows)

There are NO shadows in this system. Brutalist hard offset shadows were removed 2026-08-15. Surfaces separate from the canvas with 1px hairlines; hover deepens the border, never adds elevation.

| Token | Value | Use |
|---|---|---|
| `--color-hairline` | `rgba(17,17,17,0.14)` | Section dividers, Workbench rules, flow strip rules |
| `--color-card-border` | `rgba(17,17,17,0.18)` | Resting card outline (1px) |
| `--color-card-border-hover` | `rgba(17,17,17,0.5)` | Hovered card outline (1px, deepened) |

Borders: cards use `1px solid var(--color-card-border)`. Buttons use `1px solid var(--color-card-border)`. Tags use 1px tag-border. Section dividers are 1px hairlines. Nothing is 2px.

Hover behavior: `.swiss-card` translates up 2px (`translateY(-2px)`) and swaps the border to `--color-card-border-hover` (200ms `--ease-ui`). This is the quiet hover that replaced the hard shadow lift.

### 1.4 Spacing

4px base scale:

`--space-1: 4px`, `--space-2: 8px`, `--space-3: 12px`, `--space-4: 16px`, `--space-5: 20px`, `--space-6: 24px`, `--space-8: 32px`, `--space-10: 40px`, `--space-12: 48px`, `--space-16: 64px`, `--space-20: 80px`, `--space-24: 96px`, `--space-32: 128px`

Rhythm:

- Section vertical padding: `clamp(96px, 12vw, 160px)`
- Content max width: `1200px`
- Text measure: `62-68ch` max
- Card padding: `24px` (sm), `32px` (lg), `40px` (chapter)
- Hairline dividers between sections: full-bleed 1px

### 1.5 Texture

None. No grain, no radial gradients, no glow layers, no ambient cursor, no shadows. Flat white canvas, ink hairlines, the grid. The discipline IS the texture.

## 2. Typography

### 2.1 Font decisions

Two voices, locked:

- Display/body sans: **General Sans** (weights 400, 500, 600, 700). The name, headlines, body. Bold (700) was added 2026-08-15 for the giant hero name.
- Mono (the index): **JetBrains Mono** (weights 400, 500, 700). Labels, index numbers, years, metrics, status lines.

Spectral serif is DROPPED (2026-08-15). No serif anywhere. Fontshare license permits free commercial use and self-hosting.

### 2.2 Type roles

| Role | Family / weight | Size | Line-height | Tracking | Notes |
|---|---|---|---|---|---|
| Hero name | General Sans 700 | `clamp(3.5rem, 12vw, 11rem)` | `0.88` | `-0.03em` | Uppercase, blue, two lines, bottom-anchored |
| Hero subtitle | JetBrains Mono 400 | `0.75rem` (sm) / `0.875rem` (md) | `1.4` | `0.3em` | Uppercase, ink-soft, ABOVE the name |
| Section index | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.2em` | `01 / ABOUT` style, muted, left column |
| Section kicker | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.18em` | Uppercase, accent blue |
| Section headline | General Sans 700 | `clamp(2rem, 4.5vw, 3.5rem)` | `1.02` | `-0.02em` | Bold, ink |
| About statement | General Sans 500 | `clamp(2rem, 4.5vw, 3.75rem)` | `1.1` | `-0.01em` | Ink, max 30ch |
| Body | General Sans 400 | `1.0625rem` | `1.6` | `0` | Ink-soft, max 62-68ch |
| Metric number | General Sans 700 | `clamp(2.75rem, 6vw, 4.5rem)` (big) / `1.5-2.5rem` (band) | `0.95` | `-0.02em` | `font-variant-numeric: lining-nums tabular-nums` |
| Metric label | JetBrains Mono 400 | `0.75rem` / `0.6875rem` | `1.4` | `0.12-0.14em` | Uppercase, muted |
| Tag | JetBrains Mono 400 | `0.6875rem` | `1.3` | `0.1em` | Uppercase, accent-deep on tag-bg |
| Button label | JetBrains Mono 400 | `0.75rem` | `1.4` | `0.18em` | Uppercase |
| Mono data | JetBrains Mono 400 | `0.875rem` | `1.5` | `0` | Dates, status lines |

### 2.3 Self-host strategy

- All fonts self-hosted in `/public/fonts/`. Zero external font CDN calls at runtime.
- Formats: woff2 only.
- `font-display: swap` on every face.
- Preload the hero face (`general-sans-700.woff2`) because it is LCP-critical.
- Files: `general-sans-{400,500,600,700}.woff2`, `jetbrains-mono-{400,500,700}.woff2`. Spectral files removed.

## 3. Component specs

### 3.1 Nav

Swiss bar, not a floating pill:

- Container: `max-width 1200px` centered inside a `position: fixed` full-width bar at top, `height 64px`, sharp corners (0), `border-bottom: 1px hairline`, background `rgba(255,255,255,0.9)` with `backdrop-blur`
- Content: wordmark left (JetBrains Mono 500, `DAUDA NASIR.` with blue period), links right
- Links (mono, uppercase, `0.75rem`, ink-soft): `ABOUT`, `WORKBENCH`, `PROJECTS`, `CONTACT`. Anchor to sections, `scroll-margin-top: 88px`
- Active/hover: accent blue text + 2px growing underline (`link-underline`)
- Mobile: wordmark + a MENU button (1px hairline border, 44px min target). Tapping opens a full-screen white overlay with bold sans links at `clamp(2.5rem, 10vw, 4rem)`, staggered entrance, close button top right
- Nav is the ONLY fixed element on the homepage

### 3.2 Hero

- `min-height: 100dvh` with `100svh` fallback, content anchored toward the BOTTOM (not centered, not top)
- Content: subtitle ABOVE the name: `FULL STACK SOFTWARE DEVELOPER` (mono, uppercase, letter-spaced, ink-soft). Then the name `DAUDA NASIR` on two lines, General Sans 700, `clamp(3.5rem, 12vw, 11rem)`, `leading 0.88`, `tracking -0.03em`, uppercase, accent blue
- Nothing else. No quote, no image, no buttons, no scroll cue
- Entrance: subtitle rises first, name follows 80ms later (see motion spec)

### 3.3 About (who I am)

Swiss grid: index column left, statement right.

- Section grid: `md:grid-cols-[10rem_1fr]`, index `01 / ABOUT` (mono, muted)
- Statement 1 (his words): "My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer." General Sans 500, `clamp(2rem, 4.5vw, 3.75rem)`, max 30ch
- Statement 2: "I build products. I'm a product-minded developer." General Sans 500, smaller (`clamp(1.125rem, 2vw, 1.5rem)`), ink-soft
- No metadata table, no cards, no ruled rows

### 3.4 Workbench (SYSTEMS I BUILD)

NOT a bento grid. NOT cards. A ruled index list.

- Section grid: index `02 / WORKBENCH` left, kicker `SYSTEMS I BUILD` + headline right
- Each tool is a row: `border-top: 1px hairline`, grid `[10rem | 1fr | auto]`: index number (mono), name (General Sans bold, 2xl-2rem) + domain tags + real note (ink-soft), status line right (mono, muted)
- Name goes accent blue on hover (200ms)
- The five tools (locked): Python, Flutter, FastAPI, Cloudflare / GCP, AI Systems
- List closes with a 1px hairline bottom rule

### 3.5 Project entries (The Work)

Structured 12-column Swiss grid, index numbers 01-06, uniform gutters, hairline cards. Entries never feel like a journal timeline; they are a disciplined index of shipped systems.

Common anatomy (all variants):

- Index number: JetBrains Mono, `01`-`06` (top-left). Color follows the field: accent on white, accent-bright on ink
- Year: JetBrains Mono, muted (top-right)
- Title: General Sans 700 headline
- One-line why-care: General Sans body, ink-soft
- Metrics row: verified figures as large bold sans numbers + mono labels
- Stack tags: mono pills, accent-deep on tag-bg
- EXPLORE PROJECT: mono link, accent blue (white on the chapter band), underline grows, arrow nudges. 44px hit area

Grid (12 fixed columns, ONE gap value `gap-6` = 24px everywhere, no orphan columns):

1. Soiling Detection System: `md:col-span-7` small card, ink field
2. TRAKS: `md:col-span-5` small card, paper field (5+7 = 12, paired row)
3. Engineering Hub: `md:col-span-8` medium card, paper field + real flow strip (Flutter Client -> FastAPI API -> PostgreSQL -> Gemini)
4. RAG Data Pipeline: `md:col-span-4` compact card, ink field with big `1M+` metric in white (8+4 = 12, paired row)
5. NUESA Academia: `md:col-span-12` full-width spread, paper field, dashboard image on the right in a hairline frame
6. AWUN: `md:col-span-12` full-width blue band, capstone treatment (FROZEN, do not change)

The section header shares the same 12-column grid and closes with a hairline rule, so index, headline, and cards align.

Card style: every card carries the same 1px hairline border, 4px radius, flat (no shadow), and the same `.swiss-card` hover (2px rise + border deepen). Field colors alternate WHITE and BLACK in a diagonal rhythm (white/black alternation rule, set 2026-08-15 after Nasir's "it overdid the styling" critique):

- ink `#111111`: inverted field, white text + accent-bright index (Soiling, RAG)
- paper `#FFFFFF`: white field, ink text + accent index (TRAKS, Engineering Hub, NUESA)

The black cards sit on the diagonal of the paired rows (Soiling top-left, RAG bottom-right); the white cards hold the middle. Blue appears on cards only as index numbers, text accents, tag text, and links. The one filled blue surface is the AWUN chapter band, kept exactly as-is. No tinted fields, no accent strips, no shadows, no thick borders, no new hue families.

### 3.6 Metrics display (large numbers as composition)

- Numbers are the dominant visual: General Sans 700, `clamp(2.75rem, 6vw, 4.5rem)`, `font-variant-numeric: lining-nums tabular-nums`
- Unit / label in mono below, uppercase, muted
- NUESA band: 3 metrics in a 3-col grid (800-1,200 students / 9 departments / 2,000+ PDFs)
- Never decorate numbers with fake precision. Every figure on the site is real and verified (section 7)

### 3.7 Case study page spine (01-08)

Deferred. When built: sticky left rail (mono items `01 OVERVIEW` through `08 LINKS`), content column right (68ch), each section opens with a mono label + sans headline.

### 3.8 AWUN chapter band

AWUN closes the Projects section as a full-width blue band.

- Background `#2563EB`, white text. The one saturated accent moment on the page
- Kicker `THE CAPSTONE`, giant white title, one-line description (white/90)
- System flow row (CLIENT -> API -> WORKER -> D1 / R2), white
- Three system facts (AI STOREFRONT CREATION / PAYMENT VERIFICATION / INVENTORY MANAGEMENT) on white top rules
- Chapter index chips CH. 01-05 (white borders)
- EXPLORE THE DOCUMENTARY link in white
- NO user metrics. AWUN has none published; system facts only

### 3.9 Closing / contact

- Sign-off: "Every system begins with a single line." General Sans 700, `clamp(2rem, 4.5vw, 3.5rem)`, max 24ch
- Contact row: EMAIL / GITHUB / LINKEDIN / CV as mono uppercase links, ink, accent blue on hover with growing underline, arranged in a row (vertical stack on mobile, 44px targets)
- Mono status line beneath: `STATUS / OPEN TO COLLABORATION`
- No version footers, no decoration strips

## 4. Motion spec

One discipline: Swiss minimal. Nothing bounces, nothing glows, nothing draws itself.

### 4.1 Reveals

- Rise + fade: `opacity: 0 -> 1`, `translateY(16px -> 0)`
- Duration: 500-700ms, ease: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out)
- Stagger: 40-80ms between sibling items. One beat at a time
- Trigger: `whileInView` with `once: true` (framer-motion IntersectionObserver; no window scroll listeners)
- UI micro-transitions (hover, press): under 300ms, `cubic-bezier(0.23, 1, 0.32, 1)`
- Press feedback: `scale(0.97)` on `:active` for pressable elements, 120ms

### 4.2 Hover

- Cards: border deepens (hairline -> `--color-card-border-hover`) + `translateY(-2px)`, 200ms
- Links: 2px underline grows (background-size 0 -> 100%), color to accent
- Buttons: border deepens to `--color-card-border-hover`, press `scale(0.97)`
- Workbench rows: name to accent blue

### 4.3 Ambient cursor

None. Removed 2026-08-15. The system cursor is the cursor.

### 4.4 Reduced-motion fallbacks

Global `prefers-reduced-motion: reduce`:

- All reveals become opacity-only, 300ms max, no translate
- Hover (border deepens, underlines) still allowed but no transforms
- CSS: a media query short-circuits durations; Framer Motion uses `useReducedMotion()` for JS-driven values

## 5. Mobile behavior (under 768px)

| Section | Behavior under 768px |
|---|---|
| Nav | Wordmark + MENU button. Full-screen white overlay with bold sans links, staggered entrance, close button |
| Hero | `min-height: 100svh`. Subtitle + name, bottom-anchored, name clamps to `3.5rem` floor |
| About | Index goes above the statement (single column) |
| Workbench | Single column. Index, name+tags, note, status stacked; 2px top rules per row |
| Projects | Single column. All cards full width; large/chapter bands reduce padding to 24-32px |
| AWUN | Stacked. Flow row hidden, facts in a 1-col stack, chips wrap |
| Closing | Contact links stack vertically, full-width tap targets |
| All | Touch targets min 44x44px. No hover-dependent interactions; active state = border deepen + scale 0.97 |

## 6. Page-by-page layout

### 6.1 Homepage

Section order (locked): Hero -> About -> Workbench -> Projects (AWUN chapter inside) -> Closing.

1. Hero: 100dvh, subtitle above name, giant blue name, bottom-anchored, white field
2. Hairline divider
3. About: `01 / ABOUT`, direct statement
4. Hairline divider
5. Workbench: `02 / WORKBENCH`, ruled tool list
6. Hairline divider
7. Projects: `03 / PROJECTS`, kicker THE WORK, grid of six on a 12-col Swiss grid (uniform gap-6, no orphan columns):
   - Soiling Detection System (01) span 7 + TRAKS (02) span 5 - paired row
   - Engineering Hub (03) span 8 with flow strip + RAG Data Pipeline (04) span 4 - paired row
   - NUESA Academia (05) span 12 full-width with dashboard image
   - AWUN (06) span 12 full-width blue band
8. Hairline divider
9. Closing: `04 / CONTACT`, sign-off, contact row, status line

### 6.2 Case study template (one template, 8 sections)

Deferred (see 3.7).

### 6.3 AWUN special treatment

Deferred page. The homepage band is the doorway (see 3.8).

## 7. Content slots

Copy and imagery per slot. All metrics below are VERIFIED; do not invent others.

### Hero

| Slot | Content | Status |
|---|---|---|
| Subtitle | FULL STACK SOFTWARE DEVELOPER | LOCKED |
| Name | DAUDA NASIR | LOCKED |

### About

| Slot | Content | Status |
|---|---|---|
| Statement 1 | My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer. | LOCKED (his words, polished) |
| Statement 2 | I build products. I'm a product-minded developer. | LOCKED (his words, polished) |

### Workbench (tool notes, real and specific)

| Tool | Domain | Note | Status |
|---|---|---|---|
| Python | BACKEND / AI / DATA | RAG pipeline 2,000+ PDFs to 1M+ chunks, Python end to end | LOCKED |
| Flutter | CROSS-PLATFORM | Android-first clients for Engineering Hub, TRAKS, NUESA | LOCKED |
| FastAPI | HIGH-PERFORMANCE APIS | TRAKS vector search under 500ms | LOCKED |
| Cloudflare / GCP | INFRASTRUCTURE | NUESA worker 461 lines, PDFs to R2 | LOCKED |
| AI Systems | AGENTS / EMBEDDINGS | Hybrid OCR, 1M+ chunk search, AWUN intelligence | LOCKED |

### Project entries

| Entry | Year | Metrics | Metric status |
|---|---|---|---|
| Soiling Detection System | 2024 | 3mW continuous monitoring; 99.98% XGBoost accuracy | CONFIRMED |
| TRAKS | 2024 | Vector search under 500ms; real-time alerts; geo + reverse geocoding | CONFIRMED |
| Engineering Hub | 2024 | 250 downloads (real, BuildVerse context). 500+/130K+/27% NOT used | CONFIRMED |
| NUESA Academia | 2024/2025 | 800-1,200 students monthly; 9 departments; 2,000+ PDFs; 461-line Worker | CONFIRMED |
| RAG Data Pipeline | 2025 | 2,000+ PDFs; 1M+ semantic chunks; hybrid OCR | CONFIRMED |
| AWUN | 2025/2026 | None. AI storefront creation, payment verification, inventory (system facts) | CONFIRMED (no user metrics) |

### Case study pages

Deferred. Screenshots and diagrams will be sourced from repo docs when built.

### Imagery rules

- No stock photos. The homepage uses no imagery except the verified NUESA dashboard screenshot
- Diagrams must be real representations of the systems, derived from repo docs

## 8. Build checklist (quality gates)

- [ ] No em dashes anywhere in copy or code comments
- [ ] One accent family (blue) everywhere; no second accent color
- [ ] Radius values only from the scale: 0 / 2 / 4px. No squircles, no pills
- [ ] Hairline borders only (1px). No shadows anywhere, no 2px borders
- [ ] All interactive hover states use border deepen / underline, never elevation or shadows
- [ ] All text passes AA contrast (tokens in section 1.1)
- [ ] No scroll cues ("scroll down" affordances)
- [ ] No fake-precise numbers. Metrics come only from `src/data/site.ts`
- [ ] WCAG AA text contrast; focus rings visible (2px accent)
- [ ] Heroes use 100dvh with svh fallback
- [ ] No `window.addEventListener('scroll')` anywhere. Use framer-motion `whileInView` / `useReducedMotion`
- [ ] prefers-reduced-motion respected globally (section 4.4)
- [ ] All fonts self-hosted woff2, font-display swap, hero face preloaded
- [ ] LCP under 2.5s, CLS under 0.1
- [ ] Touch targets >= 44px on mobile

## 9. Open decisions and risks

1. Mode strategy: DECIDED 2026-08-15 - light only (white/blue). No dark mode in v1.
2. Hero visual: DECIDED 2026-08-15 - typographic poster only. No image.
3. Engineering Hub metrics: DECIDED 2026-08-15 - 250 downloads (real). The 500+/130K+/27% example figures are NOT used.
4. AWUN metrics: none published. Do not invent. The band leads with system facts.
5. Grid scale: Soiling/TRAKS small, Engineering Hub medium, NUESA large, RAG compact, AWUN chapter. Confirmed in this spec.
6. Fonts: General Sans (400-700) + JetBrains Mono (400/500/700) locked. Spectral removed.
7. Risk: the old atelier components (AmbientCursor, grain, glow layers, timeline) were deleted; no dead code remains. Verify with grep before any future card.
8. Risk: case study routes (`/projects/*`) do not exist yet. EXPLORE links are future routes; do not ship a 404 experience without planning.
