// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Bayesian Knowledge Tracing (BKT) State Machine
// Aspect Ratio: 1:1 (viewBox="0 0 640 640")
// Style: Circular/quadrant state machine, hairline geometry, study violet accent.
// ---------------------------------------------------------------------------

export default function EngineeringHubBktDiagram() {
  return (
    <div className="w-full max-w-[640px] mx-auto overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 640 640"
        className="h-auto w-full select-none font-sans"
        aria-label="Student Knowledge State Machine Diagram"
      >
        <defs>
          <marker
            id="bkt-arrow"
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
            id="bkt-arrow-dark"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3F3F46" />
          </marker>
          <marker
            id="bkt-arrow-green"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
          </marker>

          <pattern
            id="bkt-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="640" height="640" fill="#ffffff" />
        <rect width="640" height="640" fill="url(#bkt-dots)" />

        {/* Header */}
        <text
          x="32"
          y="34"
          className="font-mono"
          fontSize="9.5"
          letterSpacing="0.18em"
          fill="#6D28D9"
          fontWeight="600"
        >
          STATE.MACHINE / 03
        </text>
        <text
          x="180"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          STUDENT SKILL PROGRESSION & RETENTION CYCLE
        </text>

        {/* Center Target Indicator */}
        <circle cx="320" cy="340" r="88" fill="none" stroke="rgba(109, 40, 217, 0.12)" strokeWidth="1" strokeDasharray="4 4" />
        <text x="320" y="334" textAnchor="middle" className="font-mono" fontSize="8" letterSpacing="0.12em" fill="#6B7280" fontWeight="600">
          MASTERY THRESHOLD
        </text>
        <text x="320" y="352" textAnchor="middle" className="font-mono" fontSize="13" fill="#6D28D9" fontWeight="700">
          P(L) ≥ 0.75
        </text>

        {/* ===================================================================
            STATE 1: NEW / UNSEEN (Top Left)
           =================================================================== */}
        <g transform="translate(40, 64)">
          <rect
            width="240"
            height="180"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="240"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="11" fontWeight="700" fill="#111111">
            01 / Unseen Concept
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            STATE: P(L) = 0.15 (PRIOR)
          </text>
          <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
            • Topic in syllabus, not yet attempted
          </text>
          <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
            • Baseline guess probability: 25%
          </text>
          <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
            • Queued in recommended starter quiz
          </text>

          <rect x="12" y="132" width="216" height="34" rx="2" fill="rgba(17, 17, 17, 0.03)" />
          <text x="18" y="148" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
            ENTRY: FIRST ATTEMPT
          </text>
          <text x="18" y="160" fontSize="8" fill="#3F3F46">
            Student answers initial question
          </text>
        </g>

        {/* ===================================================================
            STATE 2: PRACTICING / LEARNING (Top Right)
           =================================================================== */}
        <g transform="translate(360, 64)">
          <rect
            width="240"
            height="180"
            rx="2"
            fill="rgba(109, 40, 217, 0.02)"
            stroke="#6D28D9"
            strokeWidth="1.25"
          />
          <rect
            width="240"
            height="28"
            rx="2"
            fill="rgba(109, 40, 217, 0.08)"
            stroke="rgba(109, 40, 217, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="11" fontWeight="700" fill="#6D28D9">
            02 / Actively Learning
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#111111"
            fontWeight="600"
          >
            STATE: 0.15 &lt; P(L) &lt; 0.75
          </text>
          <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
            • Active reinforcement loop
          </text>
          <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
            • High review frequency (daily)
          </text>
          <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
            • Wrong answers create flashcards
          </text>

          <rect x="12" y="132" width="216" height="34" rx="2" fill="#ffffff" stroke="rgba(109, 40, 217, 0.3)" strokeWidth="1" />
          <text x="18" y="148" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
            THRESHOLD GOAL
          </text>
          <text x="18" y="160" fontSize="8" fill="#3F3F46">
            Consecutive correct answers reach 0.75
          </text>
        </g>

        {/* Transition 1 -> 2: First attempt */}
        <path
          d="M 280 154 L 352 154"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#bkt-arrow-dark)"
        />
        <rect x="286" y="138" width="60" height="14" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="0.8" />
        <text x="290" y="148" className="font-mono" fontSize="6.5" letterSpacing="0.06em" fill="#3F3F46" fontWeight="600">
          FIRST QUIZ
        </text>

        {/* ===================================================================
            STATE 3: MASTERED / RETAINED (Bottom Right)
           =================================================================== */}
        <g transform="translate(360, 420)">
          <rect
            width="240"
            height="180"
            rx="2"
            fill="#ffffff"
            stroke="#059669"
            strokeWidth="1.25"
          />
          <rect
            width="240"
            height="28"
            rx="2"
            fill="rgba(5, 150, 105, 0.08)"
            stroke="rgba(5, 150, 105, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="11" fontWeight="700" fill="#059669">
            03 / Mastered Concept
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#059669"
            fontWeight="600"
          >
            STATE: P(L) ≥ 0.75 (EXAM READY)
          </text>
          <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
            • High stability (S ≥ 2.0 days)
          </text>
          <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
            • Spaced interval expands exponentially
          </text>
          <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
            • Minimal study time required
          </text>

          <rect x="12" y="132" width="216" height="34" rx="2" fill="rgba(5,150,105,0.06)" />
          <text x="18" y="148" className="font-mono" fontSize="7.5" fill="#059669" fontWeight="600">
            STABILITY MULTIPLIER
          </text>
          <text x="18" y="160" fontSize="8" fill="#3F3F46">
            Interval grows: 2d → 5d → 14d → 30d
          </text>
        </g>

        {/* Transition 2 -> 3: Crosses 0.75 */}
        <path
          d="M 480 244 L 480 412"
          stroke="#059669"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#bkt-arrow-green)"
        />
        <rect x="420" y="318" width="120" height="16" rx="2" fill="#ffffff" stroke="rgba(5,150,105,0.3)" strokeWidth="0.8" />
        <text x="428" y="330" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#059669" fontWeight="600">
          PROVES MASTERY (≥ 0.75)
        </text>

        {/* ===================================================================
            STATE 4: DUE FOR REVIEW (Bottom Left)
           =================================================================== */}
        <g transform="translate(40, 420)">
          <rect
            width="240"
            height="180"
            rx="2"
            fill="#ffffff"
            stroke="#D97706"
            strokeWidth="1.25"
          />
          <rect
            width="240"
            height="28"
            rx="2"
            fill="rgba(217, 119, 6, 0.08)"
            stroke="rgba(217, 119, 6, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="18" fontSize="11" fontWeight="700" fill="#D97706">
            04 / Queued for Review
          </text>
          <text
            x="12"
            y="44"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.1em"
            fill="#D97706"
            fontWeight="600"
          >
            STATE: RETENTION DROPS TO 80%
          </text>
          <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
            • Scheduled right before memory fades
          </text>
          <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
            • Appears in daily review deck
          </text>
          <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
            • Push reminder sent if streak active
          </text>

          <rect x="12" y="132" width="216" height="34" rx="2" fill="rgba(217, 119, 6, 0.06)" />
          <text x="18" y="148" className="font-mono" fontSize="7.5" fill="#D97706" fontWeight="600">
            PREVENT FORGETTING
          </text>
          <text x="18" y="160" fontSize="8" fill="#3F3F46">
            1-question check restores memory
          </text>
        </g>

        {/* Transition 3 -> 4: Time decay */}
        <path
          d="M 360 510 L 288 510"
          stroke="#D97706"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#bkt-arrow-dark)"
        />
        <rect x="296" y="494" width="60" height="14" rx="2" fill="#ffffff" stroke="rgba(217,119,6,0.3)" strokeWidth="0.8" />
        <text x="299" y="504" className="font-mono" fontSize="6.5" letterSpacing="0.06em" fill="#D97706" fontWeight="600">
          TIME DECAY
        </text>

        {/* Transition 4 -> 3: Passed review */}
        <path
          d="M 160 420 L 160 380 Q 160 360 180 360 L 320 360 Q 340 360 340 380 L 340 430 Q 340 450 360 450 L 360 450"
          stroke="#059669"
          strokeWidth="1.25"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Transition 4 -> 2: Failed review */}
        <path
          d="M 160 420 L 160 244"
          stroke="#DC2626"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#bkt-arrow)"
        />
        <rect x="100" y="318" width="120" height="16" rx="2" fill="#ffffff" stroke="rgba(220,38,38,0.3)" strokeWidth="0.8" />
        <text x="107" y="330" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#DC2626" fontWeight="600">
          FORGOTTEN (RE-PRACTICE)
        </text>
      </svg>
    </div>
  );
}
