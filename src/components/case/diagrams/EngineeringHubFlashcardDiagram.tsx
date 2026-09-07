// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Flashcard Spaced-Repetition Lifecycle
// Aspect Ratio: 21:9 (viewBox="0 0 1050 450")
// Style: Crisp hairline geometry, plain-English flow, study violet accents.
// ---------------------------------------------------------------------------

export default function EngineeringHubFlashcardDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 1050 450"
        className="h-auto w-full select-none font-sans"
        aria-label="Flashcard Spaced Repetition Lifecycle Diagram"
      >
        <defs>
          <marker
            id="fc-arrow"
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
            id="fc-arrow-dark"
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
            id="fc-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="1050" height="450" fill="#ffffff" />
        <rect width="1050" height="450" fill="url(#fc-dots)" />

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
          LIFECYCLE / 01
        </text>
        <text
          x="160"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          HOW QUIZ MISTAKES ARE AUTOMATICALLY CONVERTED INTO LONG-TERM MASTERY
        </text>

        {/* ===================================================================
            5-STEP HORIZONTAL PIPELINE
           =================================================================== */}

        {/* Stage 1: The Trigger */}
        <g transform="translate(36, 56)">
          <rect
            width="180"
            height="320"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="180"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="10.5" fontWeight="700" fill="#111111">
            1. Trigger Event
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            QUIZ INTERACTION
          </text>
          <text x="12" y="68" fontSize="9" fill="#3F3F46">
            • Student takes practice quiz
          </text>
          <text x="12" y="88" fontSize="9" fill="#3F3F46">
            • Submits incorrect answer, or
          </text>
          <text x="12" y="108" fontSize="9" fill="#3F3F46">
            • Flags card for later review
          </text>

          <rect
            x="12"
            y="130"
            width="156"
            height="100"
            rx="2"
            fill="rgba(239, 68, 68, 0.05)"
            stroke="rgba(239, 68, 68, 0.3)"
            strokeWidth="1"
          />
          <text x="18" y="150" className="font-mono" fontSize="7.5" fill="#DC2626" fontWeight="600">
            DETECTED MISCONCEPTION
          </text>
          <text x="18" y="172" fontSize="8.5" fill="#3F3F46">
            Incorrect concept isolated
          </text>
          <text x="18" y="190" fontSize="8.5" fill="#3F3F46">
            and marked for reinforcement
          </text>

          <text
            x="12"
            y="300"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            SOURCE: LIVE QUIZ ENGINE
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path
          d="M 216 216 L 244 216"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#fc-arrow-dark)"
        />

        {/* Stage 2: Card Creation */}
        <g transform="translate(244, 56)">
          <rect
            width="180"
            height="320"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="180"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="10.5" fontWeight="700" fill="#111111">
            2. Auto-Generation
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6D28D9"
            fontWeight="600"
          >
            SMART FLASHCARD CREATED
          </text>
          <text x="12" y="68" fontSize="9" fill="#3F3F46">
            • Extracts exact question stem
          </text>
          <text x="12" y="88" fontSize="9" fill="#3F3F46">
            • Pairs with correct solution
          </text>
          <text x="12" y="108" fontSize="9" fill="#3F3F46">
            • Formats LaTeX equations
          </text>

          <rect
            x="12"
            y="130"
            width="156"
            height="100"
            rx="2"
            fill="rgba(109, 40, 217, 0.04)"
            stroke="rgba(109, 40, 217, 0.25)"
            strokeWidth="1"
          />
          <text x="18" y="150" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
            WRONG-ANSWER CARD
          </text>
          <text x="18" y="172" fontSize="8.5" fill="#3F3F46">
            Front: Question & formula
          </text>
          <text x="18" y="190" fontSize="8.5" fill="#3F3F46">
            Back: Detailed explanation
          </text>

          <text
            x="12"
            y="300"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            STORED: SQLITE D1
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <path
          d="M 424 216 L 452 216"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#fc-arrow-dark)"
        />

        {/* Stage 3: Student Review */}
        <g transform="translate(452, 56)">
          <rect
            width="180"
            height="320"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="180"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="10.5" fontWeight="700" fill="#111111">
            3. Active Review
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            RECALL SELF-RATING
          </text>
          <text x="12" y="68" fontSize="9" fill="#3F3F46">
            • Card appears in daily deck
          </text>
          <text x="12" y="88" fontSize="9" fill="#3F3F46">
            • Student tests own recall
          </text>
          <text x="12" y="108" fontSize="9" fill="#3F3F46">
            • Flips card to verify answer
          </text>

          {/* 4 Rating Buttons */}
          <g transform="translate(12, 130)">
            <rect width="156" height="22" rx="2" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
            <text x="8" y="15" className="font-mono" fontSize="7.5" fill="#EF4444" fontWeight="600">
              AGAIN
            </text>
            <text x="54" y="15" className="font-mono" fontSize="7.5" fill="#71717A">
              Failed recall (0.25d)
            </text>

            <rect y="26" width="156" height="22" rx="2" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
            <text x="8" y="41" className="font-mono" fontSize="7.5" fill="#F59E0B" fontWeight="600">
              HARD
            </text>
            <text x="54" y="41" className="font-mono" fontSize="7.5" fill="#71717A">
              Struggled (+1.2x)
            </text>

            <rect y="52" width="156" height="22" rx="2" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
            <text x="8" y="67" className="font-mono" fontSize="7.5" fill="#10B981" fontWeight="600">
              GOOD
            </text>
            <text x="54" y="67" className="font-mono" fontSize="7.5" fill="#71717A">
              Smooth recall (+2.0x)
            </text>

            <rect y="78" width="156" height="22" rx="2" fill="rgba(109, 40, 217, 0.08)" stroke="#6D28D9" strokeWidth="1" />
            <text x="8" y="93" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
              EASY
            </text>
            <text x="54" y="93" className="font-mono" fontSize="7.5" fill="#6D28D9">
              Effortless (+3.0x)
            </text>
          </g>

          <text
            x="12"
            y="300"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            CLIENT: WEB & FLUTTER
          </text>
        </g>

        {/* Arrow 3 -> 4 */}
        <path
          d="M 632 216 L 660 216"
          stroke="#6D28D9"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#fc-arrow)"
        />

        {/* Stage 4: Spaced Scheduling */}
        <g transform="translate(660, 56)">
          <rect
            width="180"
            height="320"
            rx="2"
            fill="rgba(109, 40, 217, 0.02)"
            stroke="#6D28D9"
            strokeWidth="1.25"
          />
          <rect
            width="180"
            height="28"
            rx="2"
            fill="rgba(109, 40, 217, 0.08)"
            stroke="rgba(109, 40, 217, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="10.5" fontWeight="700" fill="#6D28D9">
            4. Spaced Interval
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#111111"
            fontWeight="600"
          >
            SMART SPACING ENGINE
          </text>
          <text x="12" y="68" fontSize="9" fill="#3F3F46">
            • Updates memory stability
          </text>
          <text x="12" y="88" fontSize="9" fill="#3F3F46">
            • Extends interval as skill grows
          </text>
          <text x="12" y="108" fontSize="9" fill="#3F3F46">
            • Resets immediately if forgotten
          </text>

          {/* Interval Progression */}
          <g transform="translate(12, 130)">
            <rect width="156" height="100" rx="2" fill="#ffffff" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="12" y="20" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              EXPONENTIAL INTERVALS
            </text>
            <text x="12" y="42" fontSize="8.5" fill="#3F3F46">
              Review 1: <tspan fontWeight="700">6 Hours</tspan>
            </text>
            <text x="12" y="60" fontSize="8.5" fill="#3F3F46">
              Review 2: <tspan fontWeight="700">2 Days</tspan>
            </text>
            <text x="12" y="78" fontSize="8.5" fill="#3F3F46">
              Review 3: <tspan fontWeight="700">6 Days</tspan>
            </text>
            <text x="12" y="94" fontSize="8.5" fill="#6D28D9" fontWeight="700">
              Review 4+: 2+ Weeks (Mastered)
            </text>
          </g>

          <text
            x="12"
            y="300"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.08em"
            fill="#6D28D9"
            fontWeight="600"
          >
            TARGET: 80% RETENTION
          </text>
        </g>

        {/* Arrow 4 -> 5 */}
        <path
          d="M 840 216 L 868 216"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#fc-arrow-dark)"
        />

        {/* Stage 5: Long-Term Retention */}
        <g transform="translate(868, 56)">
          <rect
            width="146"
            height="320"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="146"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="10.5" fontWeight="700" fill="#111111">
            5. Mastered
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            EXAM READINESS
          </text>
          <text x="12" y="68" fontSize="9" fill="#3F3F46">
            • Concept consolidated
          </text>
          <text x="12" y="88" fontSize="9" fill="#3F3F46">
            • High recall confidence
          </text>
          <text x="12" y="108" fontSize="9" fill="#3F3F46">
            • Ready for exams
          </text>

          <rect
            x="12"
            y="130"
            width="122"
            height="100"
            rx="2"
            fill="rgba(16, 185, 129, 0.05)"
            stroke="rgba(16, 185, 129, 0.3)"
            strokeWidth="1"
          />
          <text x="16" y="152" className="font-mono" fontSize="7.5" fill="#059669" fontWeight="600">
            PERMANENT SKILL
          </text>
          <text x="16" y="174" fontSize="8.5" fill="#3F3F46">
            No cramming needed
          </text>
          <text x="16" y="192" fontSize="8.5" fill="#3F3F46">
            Zero study waste
          </text>

          <text
            x="12"
            y="300"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.08em"
            fill="#9CA3AF"
          >
            END-STATE
          </text>
        </g>

        {/* Return loop from Stage 4 back to Stage 3 when review due */}
        <path
          d="M 750 376 L 750 404 L 542 404 L 542 378"
          stroke="#6D28D9"
          strokeWidth="1.25"
          strokeDasharray="3 3"
          fill="none"
          markerEnd="url(#fc-arrow)"
        />
        <rect x="586" y="396" width="120" height="16" rx="2" fill="#ffffff" stroke="rgba(109,40,217,0.3)" strokeWidth="0.8" />
        <text x="592" y="407" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#6D28D9" fontWeight="600">
          RE-ENQUEUE ON DUE DATE
        </text>
      </svg>
    </div>
  );
}
