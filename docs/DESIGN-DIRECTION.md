# Design Direction - Dauda Nasir Portfolio (Redesign v2)

Branch: `redesign-v2`
Status: Design phase, pending build
Last updated: 2026-08-15

## 1. Vision

A Swiss International Style portfolio with brutalist accents. Clean grid, massive typography, discipline, sharp edges. Most developer portfolios hide behind dark bento templates and decorative gradients; this one states the facts in huge type on a white field and lets the work carry the page.

The composition is Swiss first: strict grid, index numbers, one accent color, enormous type. Brutalist details make it stand out: hard offset shadows, thick borders, raw bold type moments. This is NOT neo-brutalism (no clashing color blocks everywhere), and NOT the previous dark atelier direction (abandoned 2026-08-15).

- Surface: white canvas, near-black ink, one confident blue accent
- Underneath: real verified metrics, real systems, exact copy, disciplined type

The page looks expensive because it is quiet and precise, not because it glows.

## 2. No Quote

There is no quote on the homepage. The Plato quote and its attribution were removed entirely (2026-08-15). No other quote replaces it. The hero carries exactly two things: the role subtitle and the name.

## 3. Aesthetic Language

Approved aesthetics in play: Swiss / International Style (base), classic Brutalism (accents only). NOT neo-brutalism: no clashing color blocks everywhere, no playful chunky borders on every element. Swiss discipline owns the layout; the brutalist details are the punctuation.

### Palette

- White `#FFFFFF` - dominant canvas
- Ink `#111111` - primary text (near-black, never pure black, a11y discipline)
- Ink soft `#3F3F46` - secondary text, long body copy
- Muted `#6B7280` - captions, mono labels, index numbers
- Accent blue `#2563EB` - THE accent. The name, index numbers, links, CTAs. Bright, confident, not navy, not pastel-washed
- Accent bright `#3B82F6` - hover and large-fill moments
- Accent deep `#1D4ED8` - small blue text that must pass AA (tags)
- Hairline `rgba(17,17,17,0.14)` - 1px dividers

No amber, no warm browns, no dark palette. The accent family is blue, full stop.

### Geometry (sharp, not squircle)

All corners are sharp or near-sharp. The previous 26/14/999 squircle system is replaced (2026-08-15).

- Large surfaces (cards, project entries, chapter band): 4px radius
- Small elements (tags, buttons): 2px radius
- Default: 0px (nav, hairlines, list rows)
- Brutalist accent: thick 2px ink borders on cards and buttons, hard offset shadows (3-6px solid ink) instead of soft drop shadows or glow

### Typography (two voices)

- Display/body sans (the engineer): General Sans (400, 500, 600, 700). The name, headlines, body. No serif anywhere. Spectral is dropped (2026-08-15)
- Mono (the index): JetBrains Mono (400, 500, 700). Labels, index numbers, years, metrics, status lines
- Fonts self-hosted in `/public/fonts/`, font-display swap, no external CDN calls. General Sans Bold (700) was added for the giant name

### Texture and light

- No grain overlay (Swiss is clean; removed 2026-08-15)
- No radial gradients, no lamp glow, no breathing light
- No ambient cursor glow (removed 2026-08-15). The cursor is the system cursor
- The page is flat white with ink rules and hard shadows. That is the texture

## 4. The Two Design Systems

### The Homepage

- Purpose: state who Nasir is and what he built, fast
- Massive type, index numbers, verified metrics, sharp grid, discipline
- Goal of the visitor: "I can see exactly what this person built"
- The main page never explains projects deeply. It makes you want to explore them (case studies still deferred)

### The Case Study (project pages)

- Purpose: prove engineering ability, provide evidence
- Architecture, diagrams, screenshots, technical explanations, decisions, trade-offs, performance, impact, lessons
- Not yet built. EXPLORE PROJECT links point at `/projects/<slug>` routes that are still deferred

## 5. Narrative Architecture (Page Flow)

1. Hero (The Poster): full viewport white field, content anchored toward the bottom. Subtitle ABOVE the name in mono: `FULL STACK SOFTWARE DEVELOPER`. The name `DAUDA NASIR` in giant bold blue, two lines, tight leading. Nothing else. No quote, no image, no buttons
2. About: index `01 / ABOUT`, the direct statement (his words): "My name is Dauda Nasir. I'm an Electrical and Electronics Engineering graduate and a software developer." / "I build products. I'm a product-minded developer."
3. The Workbench (Systems I Build): index `02 / WORKBENCH`. Ruled list of tools (Python, Flutter, FastAPI, Cloudflare / GCP, AI Systems) with real notes and status lines. Not cards, not bento
4. Projects (The Work): index `03 / PROJECTS`. Six verified projects in a sharp grid with index numbers 01-06, large type, hard shadow on hover. AWUN closes the section as a full-width blue chapter band
5. Closing: index `04 / CONTACT`. Sign-off, EMAIL / GITHUB / LINKEDIN / CV links, mono status line

## 6. The Projects Grid

Six projects, sharp Swiss grid, index numbers 01-06, all metrics verified (section 7):

1. Soiling Detection System (2024) - small card
2. TRAKS (2024) - small card
3. Engineering Hub (2024) - medium card with real flow strip
4. NUESA Academia (2024/2025) - large full-width spread with the dashboard image
5. RAG Data Pipeline (2025) - compact card
6. AWUN (2025/2026) - full-width blue chapter band, capstone

Each card: index number, year, title, one line, verified metrics, stack tags, EXPLORE PROJECT link. Cards are sharp (4px), bordered 2px ink, hard offset shadow that lifts on hover (the hard shadow replaces the old amber bloom).

### Project lineup (confirmed scope)

Focus on these six. ERL (Elegant Radiance Luxe) noted as a potential future addition, not in current scope.

1. Engineering Hub - platform development
2. NUESA Academia - edtech platform
3. RAG Data Pipeline - AI infrastructure
4. Soiling Detection System - embedded AI
5. AWUN - AI social commerce (capstone)
6. TRAKS - community safety platform

### Metrics (verified, do not change)

- NUESA Academia: 800-1,200 engineering students monthly, 9 departments, 2,000+ PDFs processed, 461-line Cloudflare Worker
- RAG Pipeline: 2,000+ PDFs, 1M+ semantic chunks, OpenCV orientation correction, hybrid EasyOCR / Gemma 3:27b transcription
- Soiling Detection: 3mW continuous monitoring (Pi Pico), 99.98% XGBoost accuracy on triggered events
- TRAKS: vector search under 500ms, real-time alerts, geolocation with reverse geocoding
- Engineering Hub: 250 downloads (real number, BuildVerse context). The 500+/130K+/27% example figures are NOT confirmed and are NOT used
- AWUN: live platform, AI storefront creation, payment verification, inventory management. NO user or transaction metrics published. Do not invent any

Metrics are the compressed evidence. Every number on the site must be real. Never add a figure that is not in `src/data/site.ts`.

## 7. Case Study Template (The Engineering Notebook)

Deferred. When built, each project page follows the same spine:

- 01 Overview: what the product is and why it exists
- 02 The Problem: what problem it solves
- 03 Product: screenshots, videos, interaction demonstrations
- 04 Architecture: actual architecture diagram, not decoration
- 05 Engineering: interesting technical decisions, why specific technologies
- 06 Scale / Impact: genuine metrics
- 07 Lessons: what was learned, what would be done differently
- 08 Links: live application, GitHub, store links where applicable

## 8. AWUN Capstone (Technical Documentary)

The AWUN case study is a progressive reveal (deferred page). The homepage band is the doorway: full-width blue band, system facts (AI storefront creation, payment verification, inventory management), chapter index CH. 01-05, EXPLORE THE DOCUMENTARY link. No user metrics.

## 9. Motion Rules

- Reveals: short rise + fade, 500-700ms, custom expo curve, once per element, one beat at a time
- Hover: hard shadow lifts (translate -2px + shadow grows to 6px), links grow a 2px ink/blue underline
- No timeline drawing, no milestone dots, no breathing, no marquee
- No window scroll listeners. Framer Motion `whileInView` / `useReducedMotion` only
- Everything honors prefers-reduced-motion (opacity-only reveals, 300ms max, no transforms)

## 10. Performance

- Self-hosted woff2 fonts with swap, hero face (General Sans Bold) preloaded
- No audio, no heavy libraries, no grain image, no scroll listeners
- Targets: LCP under 2.5s, CLS under 0.1
- The site must feel instant and precise

## 11. Decisions (locked)

- [x] Direction: Swiss International + brutalist accents, white/blue. Atelier/chronicle abandoned (2026-08-15)
- [x] Quote: removed entirely. No replacement
- [x] Palette: white canvas, ink text, blue accent family only
- [x] Geometry: sharp (0-4px). Squircle system removed
- [x] Typography: General Sans + JetBrains Mono only. Spectral dropped
- [x] Texture: no grain, no glow, no ambient cursor
- [x] Hero: subtitle above name, giant blue name, bottom-anchored, nothing else
- [x] Section flow: Hero -> About -> Workbench -> Projects -> Closing
- [x] Projects: six verified entries, index numbers, hard shadow hover
- [x] Engineering Hub metrics: 250 downloads (real number)
- [x] AWUN metrics: none exist, none shown
- [ ] Case studies: still deferred (EXPLORE links point to future routes)
