# RAG Data Pipeline - Technical Case-Study Dossier

> **Purpose:** Technical brief for the portfolio designer. Every claim below is sourced from the v1 portfolio case-study page at `/tmp/case-src/rag-old.tsx` (old-site commit `adc7126`, 299 lines, read in full) and cross-checked against `docs/DESIGN-SYSTEM.md` in this repository. There is no RAG source repository on this machine, so the old-site page is the ONLY source of project facts. Where a metric could not be found, the line reads **METRIC NOT FOUND - ASK OWNER**.
>
> **Source map (files backing this dossier):**
> - `/tmp/case-src/rag-old.tsx` - every project fact: positioning, design goals, Phase A/B, failure-mode table, Mass Ingestion tier, stats band, Pipeline Ecosystem stack grid, System Integrity sidebar, page badge ("AI Infrastructure Manifest", "v1.4.2-Stable")
> - `/home/admin/PROJECTS/Nasirs-Personal-Portfolio/docs/DESIGN-SYSTEM.md` - portfolio card treatment (3.5: RAG is the ink field, `md:col-span-4`, big `1M+` metric in white), metrics display rule (3.6), Workbench note (7: "RAG pipeline 2,000+ PDFs to 1M+ chunks, Python end to end"), project entry (7: RAG Data Pipeline, 2025, 2,000+ PDFs; 1M+ semantic chunks; hybrid OCR, CONFIRMED)
> - Owner context (task brief): institutional document ingestion, PDFs to semantic chunks with hybrid OCR
>
> **Screenshots:** none. The old page is purely typographic (cards, tables, stat bands); it references no images. DESIGN-SYSTEM.md 7 confirms case-study screenshots are deferred and "diagrams will be sourced from repo docs when built". No RAG screenshots are known to exist.

---

## 1. What the System Does

**Official title:** RAG Data Pipeline ("Project Specification", part of the "AI Infrastructure Manifest"; page badge reads `v1.4.2-Stable`). Year per DESIGN-SYSTEM.md: **2025**.

One-liner from the old page: "A high-throughput, semantically aware ingestion engine designed for deterministic RAG at scale."

Plain language: an institutional-scale document ingestion and retrieval system. It ingests **2,000+ PDF documents**, runs **hybrid OCR** (EasyOCR with a Gemma 3:27b fallback) over orientation-corrected pages (OpenCV), embeds the extracted text with **BGE-M3** into **1M+ semantic chunks**, stores them in a vector database with Firestore metadata, and answers queries with retrieval deliberately scoped to known domains (uploaded academic materials only) rather than unrestricted semantic search.

Three design goals, verbatim from the old page:
- **Accuracy over breadth:** "Strictly reflects only uploaded academic materials."
- **Cost Awareness:** "Minimizes repeated embedding and token usage via caching."
- **Deterministic:** "Ensures reproducible AI outputs for consistency."

Positioning line from the old page: "A professional knowledge-aware engine that treats AI as stable infrastructure rather than an unpredictable chatbot." Footer theme tags: Determinism, Scale, Efficiency.

**Headline sourced results (old page, not independently verifiable without a repo):**
- **2,000+** PDFs processed (stats band; DESIGN-SYSTEM.md marks this CONFIRMED)
- **1M+** semantic chunks (stats band; DESIGN-SYSTEM.md marks this CONFIRMED)
- **<2s** search latency (stats band)
- **Up to 70%** pipeline cost reduction for multi-versioned docs via chunk-level hash caching (System Integrity)
- Deterministic generation: temperature locked at **0.0** with specialized seeding; identical chunk IDs across shards for the same source material (System Integrity)

---

## 2. Features

### Two-phase pipeline (old page, verbatim structure)

**Phase A: Ingestion**
1. Cloudflare R2 Storage & Firestore Metadata Indexing
2. EasyOCR core with Gemma 3:27b fallback for low-confidence text
3. BGE-M3 (bg3) Embedding Generation with local caching

**Phase B: Retrieval**
1. Metadata-Filtered Scoped Search (RAG-lite)
2. Deduplicated Context Assembly & Token Budget Trimming
3. Controlled Generation via JSON Schema System Templates

### Mass Ingestion Tier
- Automated ingestion of **2,000+ PDF documents**; a specialized transcription layer converts raw, multi-format sources into clean, semantically structured context "shippable to AI agents"
- **Text Normalization:** OpenCV automatically detects and corrects PDF page orientation before processing, eliminating noise from skewed or rotated source material
- **High-Conf Transcription:** bi-stage OCR strategy, lightweight EasyOCR for speed with Gemma 3:27b fallback for complex tables, math notations, and low-resolution scans

### Failure modes and mitigations (old page table, verbatim)

| Failure Mode | Mitigation Strategy |
|---|---|
| Hallucinated Content | Strict Context Scoping & Domain-Bounded Search |
| Truncated Outputs | Detection Logic & Recursive Prompt Reduction |
| Invalid JSON Schema | Multi-Stage Sanitization & Repair Pipeline |
| Token Overflow | Metadata-Weighted Priority Context Trimming |

### System Integrity features (old page sidebar)
- **Deterministic Generation:** temperature locked at 0.0 with specialized seeding; the same source material produces identical chunk IDs across shards
- **Efficient Token Reuse:** chunk-level hashes prevent redundant embedding calls to Gemini/Cloudflare APIs, reducing pipeline costs by up to 70% for multi-versioned docs

---

## 3. Architecture and Stack

### Pipeline shape (derived from Phase A/B)
PDF → OpenCV orientation correction → bi-stage OCR (EasyOCR, Gemma 3:27b fallback) → text normalization → chunking → BGE-M3 embeddings (with local caching) → vector DB + Cloudflare R2 storage + Firestore metadata → metadata-filtered scoped retrieval → deduplicated context assembly with token trimming → JSON-schema-controlled generation.

### Stack ("Pipeline Ecosystem" grid, all 8 entries verbatim from the old page)

| Layer | Value |
|---|---|
| Core Logic | Python 3.12 |
| AI Model | Google Gemini |
| Vector DB | Chroma / Vectorize |
| Embeddings | BGE-M3 (bg3) |
| Ingestion | EasyOCR / Gemma 3 |
| Metadata | Firestore |
| Deployment | Docker (EC2) |
| Cloud | AWS / Cloudflare |

### Stack notes and open questions
- DESIGN-SYSTEM.md Workbench: "RAG pipeline 2,000+ PDFs to 1M+ chunks, Python end to end" (Python across the whole pipeline)
- ChromaDB is confirmed by DESIGN-SYSTEM context; the old page lists "Chroma / Vectorize", so "Vectorize" most likely means Cloudflare Vectorize, but the old page never says where each component runs
- Gemma 3:27b is the OCR fallback model; where it is hosted (local, Ollama, API) is not stated
- "Google Gemini" is the generation model, but the specific Gemini model is not named
- No ASCII diagram or architecture drawing exists in the source material

---

## 4. Performance Metrics Found

All of the following are REAL in the sense of "claimed on the old page" (and DESIGN-SYSTEM where noted). They could not be independently verified because no RAG repository exists on this machine. The `[FABRICATED-PENDING]` appendix at the bottom is the ONLY fabricated content in this dossier; nothing below is invented.

| Metric | Value | Source |
|---|---|---|
| PDFs processed | 2,000+ | rag-old.tsx stats band; DESIGN-SYSTEM.md 7 CONFIRMED |
| Semantic chunks | 1M+ | rag-old.tsx stats band; DESIGN-SYSTEM.md 7 CONFIRMED |
| Search latency | <2s (aggregate, no percentiles) | rag-old.tsx stats band |
| Cost reduction from chunk-hash caching | up to 70% for multi-versioned docs | rag-old.tsx System Integrity |
| Generation temperature | 0.0 (locked) | rag-old.tsx System Integrity |
| Determinism guarantee | identical chunk IDs across shards for same source | rag-old.tsx System Integrity |
| Pipeline version badge | v1.4.2-Stable | rag-old.tsx nav |
| Year | 2025 | DESIGN-SYSTEM.md 7 project entries |

Note: NUESA Academia also carries a "2,000+ PDFs" figure in DESIGN-SYSTEM.md (that project's Cloudflare Worker writes PDFs to R2). The RAG pipeline's 2,000+ is its own stat from the old page; do not conflate the two.

---

## 5. What Is NOT Known

Each missing item uses the literal marker. These are the handoff items for the owner.

1. Ingestion throughput (PDFs/hour, pages/hour, chunks/minute, OCR rate) - **METRIC NOT FOUND - ASK OWNER**
2. Query latency breakdown: p50/p95/p99, and per-phase latency (search vs generation vs OCR) - only the aggregate "<2s search latency" exists - **METRIC NOT FOUND - ASK OWNER**
3. Chunk retrieval accuracy (recall@k, hit rate, precision, retrieval eval methodology) - **METRIC NOT FOUND - ASK OWNER**
4. RAG answer quality (hallucination rate, answer accuracy, human evaluation results) - **METRIC NOT FOUND - ASK OWNER**
5. OCR performance (EasyOCR vs Gemma 3:27b accuracy comparison, the "low-confidence text" threshold value, confidence distributions) - **METRIC NOT FOUND - ASK OWNER**
6. Vector DB scale (Chroma collection sizes, shard count and sharding scheme, index size on disk) - **METRIC NOT FOUND - ASK OWNER**
7. Caching effectiveness (cache hit rate; whether "up to 70%" is measured or a design ceiling) - **METRIC NOT FOUND - ASK OWNER**
8. Deployment spec (EC2 instance type, GPU presence, Docker image details, concurrency) - **METRIC NOT FOUND - ASK OWNER**
9. Monthly API spend (Gemini embeddings + generation, Cloudflare, storage costs) - **METRIC NOT FOUND - ASK OWNER**
10. Production status and users (deployed at an institution? number of institutions, users, or documents beyond 2,000+) - **METRIC NOT FOUND - ASK OWNER**
11. Source code location: the old page's "Source Code" pill has no URL target - **METRIC NOT FOUND - ASK OWNER**
12. Which Gemini model is used for generation; where Gemma 3:27b is hosted - **METRIC NOT FOUND - ASK OWNER**
13. Exact meaning of "Vectorize" in "Chroma / Vectorize" (Cloudflare Vectorize is presumed, not proven) - **METRIC NOT FOUND - ASK OWNER**
14. Screenshots or real diagrams of the system: none exist; DESIGN-SYSTEM.md says diagrams will be sourced from repo docs when built - **METRIC NOT FOUND - ASK OWNER**

---

## 6. Suggested Diagram List

All diagrams must be derived from this dossier; no repo assets exist. DESIGN-SYSTEM.md 7: "Diagrams must be real representations of the systems, derived from repo docs." Blue accent only, hairline borders, per design system.

1. **Hero architecture diagram:** full single-view pipeline, R2 → Firestore → OCR (EasyOCR / Gemma 3:27b) → BGE-M3 embeddings → vector DB → scoped retrieval → Gemini generation
2. **Phase A ingestion flow:** PDF → OpenCV orientation correction → bi-stage OCR → text normalization → chunking → BGE-M3 embedding with local cache → vector DB + Firestore metadata
3. **Phase B retrieval flow:** query → metadata-filtered scoped search (RAG-lite) → deduplicated context assembly → token budget trimming → JSON-schema-controlled generation
4. **Bi-stage OCR decision diagram:** EasyOCR fast path → confidence check → low confidence (tables, math, low-res scans) → Gemma 3:27b fallback
5. **Domain-bounded search scope visual:** query vs known domains (uploaded academic materials only), showing why retrieval is scoped (hallucination mitigation)
6. **Failure-mode mitigation map:** the 4 failure modes mapped to their 4 mitigation strategies (from the old page table)
7. **Determinism mechanism:** temperature 0.0 + specialized seeding + chunk-level hashing → identical chunk IDs across shards
8. **Cost-efficiency flow:** chunk hash cache blocking redundant embedding calls, up to 70% saving for multi-versioned docs
9. **Scale strip:** 2,000+ PDFs / 1M+ chunks / <2s latency stat band, matching the ink card treatment with the big `1M+` metric in white (DESIGN-SYSTEM.md 3.5, 3.6)
10. **Stack grid:** the 8-layer Pipeline Ecosystem grid (Python 3.12, Gemini, Chroma/Vectorize, BGE-M3, EasyOCR/Gemma 3, Firestore, Docker on EC2, AWS/Cloudflare)

---

## PLACEHOLDER METRICS - FABRICATED, PENDING CORRECTION

> **WARNING:** every number in this section is FABRICATED and tagged `[FABRICATED-PENDING]`. These are plausible placeholders the owner approved for layout and design purposes only. They are NOT real measurements, they appear in NO source, and they MUST be swapped for real values (or deleted) before this dossier feeds any published page. The sections above contain only sourced facts; this appendix is self-contained and should be removed entirely once corrected.

| Metric | Fabricated placeholder | Correction: real value (owner to fill) |
|---|---|---|
| Ingestion throughput | 12,000 PDFs/day `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Chunk generation rate | 4,500 chunks/min `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Query latency p50 | 850 ms `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Query latency p95 | 1,900 ms `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| End-to-end answer time | 3.2 s `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Chunk retrieval accuracy (recall@5) | 91% `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Chunk retrieval precision | 87% `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| OCR fallback confidence threshold | 0.80 `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Embedding cache hit rate | 34% `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Vector index size | 1.2 GB `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Monthly API cost | $45 USD/mo `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |
| Documents indexed to date | 2,150 PDFs `[FABRICATED-PENDING]` | <REAL VALUE FROM OWNER> |

**Correction workflow:** for each row, replace the fabricated placeholder with the owner-supplied real value, remove the `[FABRICATED-PENDING]` tag, move the row into Section 4 with a source note ("confirmed by owner"), then delete this appendix. Never publish any row still tagged `[FABRICATED-PENDING]` as a real metric.
