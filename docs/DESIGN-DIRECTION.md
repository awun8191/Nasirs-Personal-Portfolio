# Design Direction - Dauda Nasir Portfolio (Redesign v2)

Branch: `redesign-v2`
Status: Design phase, pending build
Last updated: 2026-08-14

## 1. Vision

A digital atelier and engineer's chronicle. Most developer portfolios feel like sterile SaaS templates: dark mode bento grids, neon terminal text, disconnected skill badges. This portfolio follows a different philosophy: an analog workshop that reflects both an Electrical and Electronics Engineering background and the work of building high-performance software and AI systems.

The visual metaphor: a warm physical environment with extremely modern engineering underneath.

- Surface: walnut desk, paper, notebooks, diagrams, technical drawings, warm tungsten lighting, subtle grain, brass and amber accents
- Underneath: precise typography, architectural diagrams, code, system specifications, interactive technical visualizations, smooth transitions, responsive layouts, excellent performance

The tools are modern. The craft is timeless.

## 2. The Quote

> "The beginning is the most important part of any work."

- Plato, Republic, Book II, 377a (Jowett translation)
- Displayed large in the hero, with a small mono attribution beneath: PLATO, REPUBLIC, BOOK II
- The quote is verified. No other quote replaces it.

## 3. Aesthetic Language

Approved aesthetics in play: Warm Retro Print (base), Editorial Storyteller (narrative spine), Slow Restraint (motion discipline), Monochrome + Accent logic with amber as the single accent.

Not retro for its own sake. The atelier metaphor must not drift into a vintage portfolio. Warm shell, modern core.

### Palette

- Espresso `#2A1C14` - primary canvas
- Roasted walnut `#4A3226` / `#5C4033` - surfaces and cards
- Warm cream `#F3E8D3` - primary text
- Amber glow `#E8A33D` - the single accent: quote, CTAs, cursor light
- Terracotta `#C96F4A` - secondary accent: tags, timeline markers
- Sepia `#A98B6F` - muted text and captions

Two modes, same tokens: espresso-dark "evening atelier" and cream-paper "daylight workshop". Final mode strategy pending confirmation (dark only, light only, or toggle).

### Typography (three-voice system)

- Display serif (the philosopher): Newsreader or Spectral. Used for the quote and section headlines at large sizes. Premium alternates if licensed later: Canela, GT Sectra
- Body sans (the engineer): General Sans or Outfit. Paragraphs and UI
- Mono (the ledger): JetBrains Mono. All technical data, timestamps, labels, coordinates, status lines
- Fonts self-hosted, font-display swap, no external font CDN calls

### Texture and light

- Grain: fixed, pointer-events-none, ~4% opacity film grain over the page
- Warm radial lighting: layered radial gradients in amber and terracotta, low opacity, slow breathing cycle (8-12s), like lamplight
- Ambient light cursor: soft amber halo that lerps behind the pointer. Barely noticeable while moving. Becomes perceptible on interaction, gently illuminating the hovered region (cards, diagrams). Not a conventional glow effect. Desktop only. Disabled under prefers-reduced-motion

## 4. The Two Design Systems

The single most important structural decision. The homepage and case studies are separate design systems.

### The Chronicle (homepage)

- Purpose: tell the story, create attraction
- Minimal information, large typography, imagery, metrics, dates, short descriptions, movement, atmosphere
- Goal of the visitor: "I want to see what this person built"
- The main page never explains projects. It makes you want to explore them

### The Case Study (project pages)

- Purpose: prove engineering ability, provide evidence
- Architecture, diagrams, videos, screenshots, technical explanations, decisions, trade-offs, performance, impact, lessons
- Goal of the visitor: "This person actually understands engineering"
- Can be as technically dense as necessary, someone deliberately clicked in

## 5. Narrative Architecture (Page Flow)

1. Hero (The Provocation): full viewport warm interior scene, grain, amber glow, the Plato quote in literary serif, mono attribution. Nothing else. No nav clutter, no badges
2. Introduction (The Engineer's Ledger): who I am. Electrical and Electronics Engineer and full-stack software developer, ABUAD. Bridging low-level hardware and telemetry with scalable backends and modern AI systems. Framed as a ledger entry: mono metadata left, serif statement right, ruled lines, entry numbers
3. The Workbench (Systems I Build): literally feels like an engineer's workbench. Not a dashboard, not a bento grid. Tools on a workbench with technical notes attached:
  - Python - Backend / AI / Data
  - Flutter - Cross-platform applications
  - FastAPI - High-performance APIs
  - Cloudflare / GCP - Infrastructure
  - AI Systems - Agents / embeddings / intelligent workflows
4. The Chronicle (Journey): interactive chronological timeline of projects, scaled by sophistication (see section 6)
5. Capstone (AWUN): the grand finale, full visual weight, technical documentary treatment
6. Closing: warm sign-off, contact row, mono status line. No version footers, no decoration strips

## 6. The Chronicle Structure

Project entries feel like pages of an engineer's journal, not cards. Each entry carries five things:

1. What is it
2. When was it built
3. Why care (one line)
4. Evidence it exists (metrics, large numbers)
5. An invitation: EXPLORE PROJECT

Example entry shape:

```
2024
ENGINEERING HUB
A learning platform built for engineering students.
500+ downloads | 130K+ questions | 27% conversion
Flutter | Python | FastAPI
[large visual / screenshot]
EXPLORE PROJECT ->
```

Everything else lives behind EXPLORE PROJECT.

### Scaled composition (momentum through the chronicle)

The layout changes as projects grow in sophistication. Never the same image-title-description-metrics-button card twice.

- EARLY WORK: Soiling Detection System, TRAKS - small editorial entries
- ENGINEERING HUB: medium-sized project
- NUESA ACADEMIA: larger institutional system
- OTHER SYSTEMS: RAG Data Pipeline - smaller entries arranged around the larger ones
- AWUN: massive visual treatment, nearly an entire chapter

### Project lineup (confirmed scope)

Focus on these six. ERL (Elegant Radiance Luxe) noted as a potential future addition, not in current scope.

1. Engineering Hub - platform development
2. NUESA Academia - edtech platform
3. RAG Data Pipeline - AI infrastructure
4. Soiling Detection System - embedded AI
5. AWUN - AI social commerce (capstone)
6. TRAKS - community safety platform

### Metrics (verified from repo docs, mark any to confirm before publish)

- NUESA Academia: 800-1,200 engineering students monthly, 9 departments, 2,000+ PDFs processed, 461-line Cloudflare Worker, 40% backend load reduction, up to 60% pipeline cost reduction via SHA-256 dedup, 20 questions per subtopic (10 theory, 10 calculation)
- RAG Pipeline: 2,000+ PDFs, 1M+ semantic chunks, OpenCV orientation correction, hybrid EasyOCR / Gemma 3:27b transcription
- Soiling Detection: 3mW continuous monitoring (Pi Pico), 99.98% XGBoost accuracy on triggered events, two-layer CUSUM + classifier design
- TRAKS: vector search under 500ms, real-time alerts, geolocation with reverse geocoding
- Engineering Hub: 250 downloads (BuildVerse context). Downloads, questions, and conversion figures from the earlier example (500+, 130K+, 27%) are NOT confirmed, do not publish until Nasir confirms real numbers
- AWUN: live platform, AI storefront creation, payment verification, inventory management. No published user or transaction numbers yet, do not invent

Metrics are the compressed evidence. Large numbers are part of the visual composition, not metadata. Every number on the site must be real.

## 7. Case Study Template (The Engineering Notebook)

Each project page follows the same spine:

- 01 Overview: what the product is and why it exists
- 02 The Problem: what problem it solves
- 03 Product: screenshots, videos, interaction demonstrations
- 04 Architecture: actual architecture diagram, not decoration
- 05 Engineering: interesting technical decisions, why specific technologies, how specific problems were solved
- 06 Scale / Impact: genuine metrics
- 07 Lessons: what was learned, what would be done differently
- 08 Links: live application, GitHub, store links where applicable

Diagrams, videos, screenshots, animations, code snippets, and architectural visualizations live here. This is where the technical density goes.

## 8. AWUN Capstone (Technical Documentary)

The AWUN case study is a progressive reveal:

1. The system: Client to API to Worker to D1/R2 to external services
2. The marketplace: Buyer, Product, Cart, Checkout, Payment, Order, Vendor
3. The intelligence layer: the AI components
4. The infrastructure: why Cloud Run, Cloudflare, R2, D1
5. The difficult parts: engineering decisions that prove real understanding

## 9. Motion Rules

- Reveals: gentle rise + blur fade, 700-900ms, custom expo curve, one beat at a time
- Timeline: warm progress line that draws on scroll, milestones click into place
- Hover: quiet lift, amber underline on links
- No bouncing, no marquee spam, no showcase effects
- Everything honors prefers-reduced-motion
- Ambient light cursor is the only cursor treatment

## 10. Performance

- WebP everywhere, lazy loading below the fold, hero preloaded
- No audio, no heavy libraries
- Self-hosted fonts with swap
- Targets: LCP under 2.5s, CLS under 0.1
- The site must feel expensive to touch and instant to load

## 11. Open Decisions (before build)

- [ ] Mode strategy: espresso-dark only, cream-light only, or toggle
- [ ] Hero visual: real photo of a warm interior or generated image
- [ ] Confirm Engineering Hub real metrics (downloads, questions, conversion)
- [ ] Confirm AWUN real metrics if any
- [ ] Chronicle order and scale assignment final pass
