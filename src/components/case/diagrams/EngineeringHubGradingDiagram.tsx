// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Adaptive Grading Flow
// Aspect Ratio: 16:9 (viewBox="0 0 960 540")
// Style: Crisp hairline geometry, plain-English flow, study violet accents.
// ---------------------------------------------------------------------------

export default function EngineeringHubGradingDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 960 540"
        className="h-auto w-full select-none font-sans"
        aria-label="Adaptive Grading Flow Diagram"
      >
        <defs>
          <marker
            id="grad-arrow"
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
            id="grad-arrow-dark"
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
            id="grad-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="960" height="540" fill="#ffffff" />
        <rect width="960" height="540" fill="url(#grad-dots)" />

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
          FLOW / 02
        </text>
        <text
          x="120"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          ADAPTIVE GRADING SEQUENCE: FROM QUESTION ATTEMPT TO REAL-TIME MASTERY UPDATE
        </text>

        {/* ===================================================================
            COLUMN 1: ATTEMPT SUBMISSION
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
            01 / Answer Submit
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
            STUDENT ACTION
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Student reviews question
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Selects option (A, B, C, D)
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Taps &quot;Submit Answer&quot;
          </text>

          {/* Interactive Mock Card */}
          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="rgba(17, 17, 17, 0.02)" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              PAYLOAD GENERATION
            </text>
            <text x="10" y="38" className="font-mono" fontSize="8" fill="#111111">
              questionId: &quot;q_0142&quot;
            </text>
            <text x="10" y="56" className="font-mono" fontSize="8" fill="#111111">
              selectedOption: &quot;B&quot;
            </text>
            <text x="10" y="74" className="font-mono" fontSize="8" fill="#111111">
              timeSpentMs: 14200
            </text>
            <text x="10" y="92" className="font-mono" fontSize="8" fill="#6D28D9" fontWeight="600">
              attemptId: &quot;att_9f81a&quot;
            </text>
            <rect x="10" y="108" width="152" height="34" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="1" />
            <text x="16" y="123" fontSize="8" fill="#3F3F46">
              Unique ID generated to
            </text>
            <text x="16" y="135" fontSize="8" fill="#3F3F46">
              prevent duplicate writes
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
            CLIENT: WEB OR ANDROID
          </text>
        </g>

        {/* Arrow 1 -> 2 */}
        <path
          d="M 236 220 L 274 220"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#grad-arrow-dark)"
        />

        {/* ===================================================================
            COLUMN 2: EDGE VERIFICATION & DEDUP
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
            02 / Edge Validation
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
            SERVER-SIDE CHECKS
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Authenticates student session
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Checks duplicate submission
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Fetches correct answer key
          </text>

          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="rgba(109, 40, 217, 0.03)" stroke="rgba(109, 40, 217, 0.25)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
              ANTI-TAMPER GUARANTEE
            </text>
            <text x="10" y="38" fontSize="8.5" fill="#3F3F46">
              Answer evaluation is
            </text>
            <text x="10" y="52" fontSize="8.5" fontWeight="700" fill="#111111">
              server-authoritative:
            </text>
            <text x="10" y="72" fontSize="8.5" fill="#3F3F46">
              • Clients never receive
            </text>
            <text x="10" y="86" fontSize="8.5" fill="#3F3F46">
              the answer key in advance
            </text>
            <text x="10" y="106" fontSize="8.5" fill="#3F3F46">
              • Spotty mobile network
            </text>
            <text x="10" y="120" fontSize="8.5" fill="#3F3F46">
              retries cause zero duplicates
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
            CLOUDFLARE WORKER GATEWAY
          </text>
        </g>

        {/* Arrow 2 -> 3 */}
        <path
          d="M 474 220 L 512 220"
          stroke="#6D28D9"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#grad-arrow)"
        />

        {/* ===================================================================
            COLUMN 3: KNOWLEDGE TRACING ENGINE
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
            03 / Knowledge Update
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
            ADAPTIVE COMPUTATION
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Compares student vs key
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Updates skill probability
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Forecasts memory decay
          </text>

          <g transform="translate(14, 138)">
            <rect width="172" height="154" rx="2" fill="#ffffff" stroke="rgba(17, 17, 17, 0.15)" strokeWidth="1" />
            <text x="10" y="18" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              STATE FORMULA METRICS
            </text>
            <text x="10" y="38" fontSize="8.5" fill="#3F3F46">
              Prior Mastery: <tspan fontWeight="700">0.45</tspan>
            </text>
            <text x="10" y="56" fontSize="8.5" fill="#3F3F46">
              Correct Answer: <tspan fontWeight="700" fill="#059669">+0.22</tspan>
            </text>
            <text x="10" y="74" fontSize="8.5" fill="#3F3F46">
              Incorrect Answer: <tspan fontWeight="700" fill="#DC2626">-0.18</tspan>
            </text>
            <path d="M 10 86 L 162 86" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="10" y="104" fontSize="8.5" fill="#3F3F46">
              Next Review Calculated:
            </text>
            <text x="10" y="122" className="font-mono" fontSize="8.5" fill="#6D28D9" fontWeight="700">
              I = 2.5 days (S=1.8)
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
            DURABLE OBJECT KERNEL
          </text>
        </g>

        {/* Branching Arrows to Outcomes */}
        {/* Upper branch -> Correct */}
        <path
          d="M 712 160 L 748 160"
          stroke="#059669"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#grad-arrow-dark)"
        />
        {/* Lower branch -> Incorrect */}
        <path
          d="M 712 370 L 748 370"
          stroke="#DC2626"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#grad-arrow)"
        />

        {/* ===================================================================
            COLUMN 4: OUTCOME BRANCHES
           =================================================================== */}
        {/* Outcome A: Correct Answer */}
        <g transform="translate(748, 56)">
          <rect
            width="176"
            height="200"
            rx="2"
            fill="#ffffff"
            stroke="#059669"
            strokeWidth="1.2"
          />
          <rect
            width="176"
            height="26"
            rx="2"
            fill="rgba(5, 150, 105, 0.08)"
            stroke="rgba(5, 150, 105, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="17" fontSize="10.5" fontWeight="700" fill="#059669">
            Outcome: Correct
          </text>
          <text
            x="12"
            y="42"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            CONFIRMED MASTERY
          </text>
          <text x="12" y="64" fontSize="9" fill="#3F3F46">
            • Mastery score increases
          </text>
          <text x="12" y="84" fontSize="9" fill="#3F3F46">
            • Practice interval doubles
          </text>
          <text x="12" y="104" fontSize="9" fill="#3F3F46">
            • Increases student streak
          </text>
          <text x="12" y="124" fontSize="9" fill="#3F3F46">
            • Unlocks next difficulty level
          </text>
          <rect x="12" y="148" width="152" height="36" rx="2" fill="rgba(5,150,105,0.06)" />
          <text x="18" y="164" className="font-mono" fontSize="7.5" fill="#059669" fontWeight="600">
            RESULT: ADVANCED
          </text>
          <text x="18" y="176" fontSize="7.5" fill="#3F3F46">
            Next review in 3 to 7 days
          </text>
        </g>

        {/* Outcome B: Incorrect Answer */}
        <g transform="translate(748, 280)">
          <rect
            width="176"
            height="216"
            rx="2"
            fill="#ffffff"
            stroke="#DC2626"
            strokeWidth="1.2"
          />
          <rect
            width="176"
            height="26"
            rx="2"
            fill="rgba(220, 38, 38, 0.08)"
            stroke="rgba(220, 38, 38, 0.2)"
            strokeWidth="1"
          />
          <text x="12" y="17" fontSize="10.5" fontWeight="700" fill="#DC2626">
            Outcome: Incorrect
          </text>
          <text
            x="12"
            y="42"
            className="font-mono"
            fontSize="7.5"
            letterSpacing="0.1em"
            fill="#6B7280"
            fontWeight="600"
          >
            ACTIVE INTERVENTION
          </text>
          <text x="12" y="64" fontSize="9" fill="#3F3F46">
            • Automatically creates flashcard
          </text>
          <text x="12" y="84" fontSize="9" fill="#3F3F46">
            • Schedules quick review (6 hrs)
          </text>
          <text x="12" y="104" fontSize="9" fill="#3F3F46">
            • Shows highlighted mistake
          </text>
          <text x="12" y="124" fontSize="9" fill="#3F3F46">
            • Enables AI explanation tutor
          </text>
          <rect x="12" y="148" width="152" height="52" rx="2" fill="rgba(109,40,217,0.06)" stroke="rgba(109,40,217,0.2)" strokeWidth="1" />
          <text x="18" y="164" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
            AI TUTOR AVAILABLE
          </text>
          <text x="18" y="178" fontSize="7.5" fill="#3F3F46">
            Student can tap for step-by-step
          </text>
          <text x="18" y="190" fontSize="7.5" fill="#3F3F46">
            equation derivation
          </text>
        </g>
      </svg>
    </div>
  );
}
