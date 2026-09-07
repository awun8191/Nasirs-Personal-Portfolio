// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Automated Content & Question Generation Pipeline
// Aspect Ratio: 16:9 (viewBox="0 0 960 540")
// Style: Crisp hairline geometry, plain-English flow, study violet accents.
// ---------------------------------------------------------------------------

export default function EngineeringHubPipelineDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 960 540"
        className="h-auto w-full select-none font-sans"
        aria-label="Automated Content Ingestion Pipeline Diagram"
      >
        <defs>
          <marker
            id="pipe-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#6D28D9" />
          </marker>
          <marker
            id="pipe-arrow-dark"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3F3F46" />
          </marker>

          <pattern
            id="pipe-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="960" height="540" fill="#ffffff" />
        <rect width="960" height="540" fill="url(#pipe-dots)" />

        {/* Header Bar */}
        <text
          x="36"
          y="34"
          className="font-mono"
          fontSize="9.5"
          letterSpacing="0.18em"
          fill="#6D28D9"
          fontWeight="600"
        >
          PIPELINE / 05
        </text>
        <text
          x="146"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          CURRICULUM INGESTION: TURNING RAW TEXTBOOKS & EXAMS INTO 140,000+ VERIFIED QUESTIONS
        </text>

        {/* ===================================================================
            COLUMN 1: RAW INGESTION
           =================================================================== */}
        <g transform="translate(36, 56)">
          <rect
            width="200"
            height="440"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="200"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#111111">
            01 / Raw Materials
          </text>
          <text
            x="14"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            DEPARTMENT SYLLABI
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Official course outlines
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Engineering textbooks
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Past exam paper archives
          </text>

          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="rgba(17, 17, 17, 0.02)" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              DOCUMENT EXTRACTION
            </text>
            <text x="10" y="38" fontSize="8.5" fill="#3F3F46">
              1. Digital PDF Parsing
            </text>
            <text x="10" y="52" fontSize="7.5" fill="#71717A">
              Extracts native text & diagrams
            </text>
            <text x="10" y="74" fontSize="8.5" fill="#3F3F46">
              2. OCR Scanned Ingestion
            </text>
            <text x="10" y="88" fontSize="7.5" fill="#71717A">
              Fallback for legacy paper exams
            </text>
            <rect x="10" y="108" width="152" height="34" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <text x="16" y="123" fontSize="8" fill="#3F3F46">
              Output: Clean structured
            </text>
            <text x="16" y="135" fontSize="8" fill="#3F3F46">
              text across 426 courses
            </text>
          </g>

          <text
            x="14"
            y="424"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            SOURCE: 9 DEPARTMENTS
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path
          d="M 236 220 L 274 220"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#pipe-arrow-dark)"
        />

        {/* ===================================================================
            COLUMN 2: CHUNKING & DEDUPLICATION
           =================================================================== */}
        <g transform="translate(274, 56)">
          <rect
            width="200"
            height="440"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="200"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#111111">
            02 / Chunking & Dedup
          </text>
          <text
            x="14"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            SEMANTIC SEGMENTATION
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Splits text by concept units
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Preserves topic boundaries
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Removes duplicate entries
          </text>

          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="rgba(17, 17, 17, 0.02)" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              CHUNK SPECIFICATIONS
            </text>
            <text x="10" y="38" fontSize="8.5" fill="#3F3F46">
              • 2-paragraph windowing
            </text>
            <text x="10" y="56" fontSize="8.5" fill="#3F3F46">
              • Overlapping context sentences
            </text>
            <text x="10" y="74" fontSize="8.5" fill="#3F3F46">
              • SHA-1 content hashing
            </text>
            <rect x="10" y="96" width="152" height="46" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <text x="16" y="112" className="font-mono" fontSize="7.5" fill="#111111" fontWeight="600">
              DEDUP FILTER
            </text>
            <text x="16" y="125" fontSize="7.5" fill="#3F3F46">
              Prevents duplicate questions
            </text>
            <text x="16" y="136" fontSize="7.5" fill="#3F3F46">
              across shared course units
            </text>
          </g>

          <text
            x="14"
            y="424"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            PYTHON PRE-PROCESSING
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <path
          d="M 474 220 L 512 220"
          stroke="#6D28D9"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#pipe-arrow)"
        />

        {/* ===================================================================
            COLUMN 3: AI QUESTION SYNTHESIS
           =================================================================== */}
        <g transform="translate(512, 56)">
          <rect
            width="200"
            height="440"
            rx="2"
            fill="rgba(109, 40, 217, 0.02)"
            stroke="#6D28D9"
            strokeWidth="1.25"
          />
          <rect
            width="200"
            height="28"
            rx="2"
            fill="rgba(109, 40, 217, 0.08)"
            stroke="rgba(109, 40, 217, 0.2)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#6D28D9">
            03 / AI Synthesis
          </text>
          <text
            x="14"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#111111"
            fontWeight="600"
          >
            GEMINI QUESTION ENGINE
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Generates 4-option MCQs
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Creates diagnostic distractors
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Writes step-by-step solution
          </text>

          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="#ffffff" stroke="rgba(109, 40, 217, 0.25)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
              QUALITY VALIDATION
            </text>
            <text x="10" y="38" fontSize="8.5" fill="#3F3F46">
              1. KaTeX Equation Check
            </text>
            <text x="10" y="52" fontSize="7.5" fill="#71717A">
              Ensures formulas render cleanly
            </text>
            <text x="10" y="74" fontSize="8.5" fill="#3F3F46">
              2. Distractor Logic
            </text>
            <text x="10" y="88" fontSize="7.5" fill="#71717A">
              Wrong options test real errors
            </text>
            <text x="10" y="110" fontSize="8.5" fill="#3F3F46">
              3. Topic Tagging
            </text>
            <text x="10" y="124" fontSize="7.5" fill="#71717A">
              Mapped to syllabus outcome
            </text>
          </g>

          <text
            x="14"
            y="424"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.08em"
            fill="#6D28D9"
            fontWeight="600"
          >
            GOOGLE GEMINI AI
          </text>
        </g>

        {/* Arrow 3 -> 4 */}
        <path
          d="M 712 220 L 748 220"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#pipe-arrow-dark)"
        />

        {/* ===================================================================
            COLUMN 4: DATABASE INGESTION
           =================================================================== */}
        <g transform="translate(748, 56)">
          <rect
            width="176"
            height="440"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="176"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#111111">
            04 / Edge Ingestion
          </text>
          <text
            x="14"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            STORED & INDEXED
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Schema verification
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Indexed by course code
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Live on edge in seconds
          </text>

          <g transform="translate(14, 138)">
            <rect width="148" height="154" rx="2" fill="rgba(16, 185, 129, 0.05)" stroke="rgba(16, 185, 129, 0.25)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#059669" fontWeight="600">
              PRODUCTION BANK
            </text>
            <text x="10" y="40" className="font-mono" fontSize="11" fontWeight="700" fill="#111111">
              142,000+
            </text>
            <text x="10" y="56" fontSize="7.5" fill="#71717A">
              Verified Questions
            </text>
            <path d="M 10 68 L 138 68" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="10" y="86" className="font-mono" fontSize="11" fontWeight="700" fill="#111111">
              426 Courses
            </text>
            <text x="10" y="102" fontSize="7.5" fill="#71717A">
              Across 9 Departments
            </text>
            <path d="M 10 114 L 138 114" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="10" y="132" className="font-mono" fontSize="8" fill="#059669" fontWeight="700">
              READY FOR QUIZZING
            </text>
          </g>

          <text
            x="14"
            y="424"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            CLOUDFLARE D1 SQLITE
          </text>
        </g>
      </svg>
    </div>
  );
}
