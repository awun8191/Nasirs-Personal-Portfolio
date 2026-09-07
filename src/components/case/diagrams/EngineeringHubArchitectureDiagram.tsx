// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Engineering Hub System Architecture
// High-clarity system topology: Client Apps -> Edge Core -> Data & AI Services.
// Aspect Ratio: 16:9 (viewBox="0 0 960 540")
// ---------------------------------------------------------------------------

export default function EngineeringHubArchitectureDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 960 540"
        className="h-auto w-full select-none font-sans"
        aria-label="Engineering Hub System Architecture Diagram"
      >
        <defs>
          {/* Arrow markers */}
          <marker
            id="arch-arrow"
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
            id="arch-arrow-dark"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3F3F46" />
          </marker>

          {/* Blueprint dot pattern */}
          <pattern
            id="arch-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="960" height="540" fill="#ffffff" />
        <rect width="960" height="540" fill="url(#arch-dots)" />

        {/* Top Header Bar */}
        <text
          x="36"
          y="34"
          className="font-mono"
          fontSize="9.5"
          letterSpacing="0.18em"
          fill="#6D28D9"
          fontWeight="600"
        >
          SYS.ARCH / 04
        </text>
        <text
          x="146"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          END-TO-END DATA FLOW: CLIENTS → EDGE PROCESSING → PERSISTENCE & AI
        </text>

        {/* ===================================================================
            COLUMN 1: CLIENT APPS
           =================================================================== */}
        <g transform="translate(36, 52)">
          {/* Column Container */}
          <rect
            width="240"
            height="456"
            rx="2"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="rgba(17, 17, 17, 0.16)"
            strokeWidth="1"
          />
          <text
            x="14"
            y="24"
            className="font-mono"
            fontSize="9"
            letterSpacing="0.16em"
            fill="#6B7280"
            fontWeight="600"
          >
            01 / CLIENT APPLICATIONS
          </text>

          {/* Node: Web SPA */}
          <g transform="translate(12, 40)">
            <rect
              width="216"
              height="182"
              rx="2"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1"
            />
            {/* Header pill */}
            <rect
              width="216"
              height="28"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
              stroke="rgba(17, 17, 17, 0.1)"
              strokeWidth="1"
            />
            <text x="12" y="18" fontSize="11" fontWeight="700" fill="#111111">
              Web Study Platform
            </text>
            <text
              x="12"
              y="44"
              className="font-mono"
              fontSize="8"
              letterSpacing="0.1em"
              fill="#6D28D9"
              fontWeight="600"
            >
              REACT 19 · VITE · KATEX
            </text>
            <text x="12" y="68" fontSize="9.5" fill="#3F3F46" leading-normal>
              • Interactive workbook for desktop study
            </text>
            <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
              • High-speed LaTeX formula rendering
            </text>
            <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
              • Instant search across 400+ syllabi
            </text>
            <text x="12" y="134" fontSize="9.5" fill="#3F3F46">
              • Integrated AI question assistant
            </text>

            <rect
              x="12"
              y="150"
              width="192"
              height="20"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
            />
            <text
              x="18"
              y="163"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.08em"
              fill="#6B7280"
            >
              DEPLOYED: CLOUDFLARE PAGES
            </text>
          </g>

          {/* Node: Mobile Flutter App */}
          <g transform="translate(12, 240)">
            <rect
              width="216"
              height="182"
              rx="2"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1"
            />
            <rect
              width="216"
              height="28"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
              stroke="rgba(17, 17, 17, 0.1)"
              strokeWidth="1"
            />
            <text x="12" y="18" fontSize="11" fontWeight="700" fill="#111111">
              Mobile Quiz & Flashcards
            </text>
            <text
              x="12"
              y="44"
              className="font-mono"
              fontSize="8"
              letterSpacing="0.1em"
              fill="#6D28D9"
              fontWeight="600"
            >
              FLUTTER (DART) · BLOC STATE
            </text>
            <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
              • Quick-fire mobile practice sessions
            </text>
            <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
              • Offline deck caching for commutes
            </text>
            <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
              • Push reminders for lecture schedules
            </text>
            <text x="12" y="134" fontSize="9.5" fill="#3F3F46">
              • Real-time streak tracking
            </text>

            <rect
              x="12"
              y="150"
              width="192"
              height="20"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
            />
            <text
              x="18"
              y="163"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.08em"
              fill="#6B7280"
            >
              DISTRIBUTED: GOOGLE PLAY STORE
            </text>
          </g>

          <text
            x="14"
            y="442"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.12em"
            fill="#9CA3AF"
          >
            REST & HTTPS PROTOCOL
          </text>
        </g>

        {/* ===================================================================
            COLUMN 2: EDGE PROCESSING & ENGINE
           =================================================================== */}
        <g transform="translate(340, 52)">
          {/* Column Container */}
          <rect
            width="270"
            height="456"
            rx="2"
            fill="rgba(255, 255, 255, 0.95)"
            stroke="#6D28D9"
            strokeWidth="1.25"
          />
          <text
            x="14"
            y="24"
            className="font-mono"
            fontSize="9"
            letterSpacing="0.16em"
            fill="#6D28D9"
            fontWeight="600"
          >
            02 / EDGE CORE (PROCESSING)
          </text>

          {/* Node: Edge API Gateway */}
          <g transform="translate(14, 40)">
            <rect
              width="242"
              height="182"
              rx="2"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1"
            />
            <rect
              width="242"
              height="28"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
              stroke="rgba(17, 17, 17, 0.1)"
              strokeWidth="1"
            />
            <text x="12" y="18" fontSize="11" fontWeight="700" fill="#111111">
              Cloudflare Edge Gateway
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
              SERVERLESS WORKER · RUNS AT 300+ CITIES
            </text>
            <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
              • Sub-50ms latency across African networks
            </text>
            <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
              • Verifies student identity on every call
            </text>
            <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
              • Protects APIs with token rate limits
            </text>
            <text x="12" y="134" fontSize="9.5" fill="#3F3F46">
              • Edge-caches frequent course catalogs
            </text>

            <rect
              x="12"
              y="150"
              width="218"
              height="20"
              rx="2"
              fill="rgba(109, 40, 217, 0.06)"
              stroke="rgba(109, 40, 217, 0.2)"
              strokeWidth="1"
            />
            <text
              x="18"
              y="163"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.08em"
              fill="#6D28D9"
            >
              ZERO COLD STARTS · V8 ISOLATES
            </text>
          </g>

          {/* Node: Adaptive Engine */}
          <g transform="translate(14, 240)">
            <rect
              width="242"
              height="182"
              rx="2"
              fill="rgba(109, 40, 217, 0.02)"
              stroke="#6D28D9"
              strokeWidth="1.2"
            />
            <rect
              width="242"
              height="28"
              rx="2"
              fill="rgba(109, 40, 217, 0.08)"
              stroke="rgba(109, 40, 217, 0.2)"
              strokeWidth="1"
            />
            <text x="12" y="18" fontSize="11" fontWeight="700" fill="#6D28D9">
              Adaptive Learning Engine
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
              DURABLE OBJECTS · BKT ALGORITHM
            </text>
            <text x="12" y="68" fontSize="9.5" fill="#3F3F46">
              • Tracks what each student actually knows
            </text>
            <text x="12" y="90" fontSize="9.5" fill="#3F3F46">
              • Updates mastery in real time after every quiz
            </text>
            <text x="12" y="112" fontSize="9.5" fill="#3F3F46">
              • Calculates when a concept will be forgotten
            </text>
            <text x="12" y="134" fontSize="9.5" fill="#3F3F46">
              • Schedules review before memory fades
            </text>

            <rect
              x="12"
              y="150"
              width="218"
              height="20"
              rx="2"
              fill="#ffffff"
              stroke="rgba(17, 17, 17, 0.15)"
              strokeWidth="1"
            />
            <text
              x="18"
              y="163"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.08em"
              fill="#3F3F46"
            >
              SERVER-AUTHORITATIVE GRADING
            </text>
          </g>

          <text
            x="14"
            y="442"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.12em"
            fill="#6D28D9"
            fontWeight="500"
          >
            STATEFUL EDGE COORDINATOR
          </text>
        </g>

        {/* ===================================================================
            COLUMN 3: DATA & AI SERVICES
           =================================================================== */}
        <g transform="translate(670, 52)">
          {/* Column Container */}
          <rect
            width="254"
            height="456"
            rx="2"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="rgba(17, 17, 17, 0.16)"
            strokeWidth="1"
          />
          <text
            x="14"
            y="24"
            className="font-mono"
            fontSize="9"
            letterSpacing="0.16em"
            fill="#6B7280"
            fontWeight="600"
          >
            03 / DATA & AI SERVICES
          </text>

          {/* Block 1: Question Bank (D1) */}
          <g transform="translate(12, 40)">
            <rect
              width="230"
              height="124"
              rx="2"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1"
            />
            <rect
              width="230"
              height="26"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
              stroke="rgba(17, 17, 17, 0.1)"
              strokeWidth="1"
            />
            <text x="12" y="17" fontSize="10.5" fontWeight="700" fill="#111111">
              Question Bank & Mastery Data
            </text>
            <text
              x="12"
              y="40"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.1em"
              fill="#6D28D9"
              fontWeight="600"
            >
              CLOUDFLARE D1 (SERVERLESS SQLITE)
            </text>
            <text x="12" y="60" fontSize="9" fill="#3F3F46">
              • Stores 140,000+ questions & answers
            </text>
            <text x="12" y="78" fontSize="9" fill="#3F3F46">
              • Records student scores & mastery history
            </text>
            <text x="12" y="96" fontSize="9" fill="#3F3F46">
              • Co-located with Edge Workers for fast queries
            </text>
            <text
              x="12"
              y="114"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.06em"
              fill="#6B7280"
            >
              ROLE: PRIMARY ACADEMIC CONTENT STORE
            </text>
          </g>

          {/* Block 2: User Profiles & Schedules (Firebase) */}
          <g transform="translate(12, 176)">
            <rect
              width="230"
              height="118"
              rx="2"
              fill="#ffffff"
              stroke="#111111"
              strokeWidth="1"
            />
            <rect
              width="230"
              height="26"
              rx="2"
              fill="rgba(17, 17, 17, 0.03)"
              stroke="rgba(17, 17, 17, 0.1)"
              strokeWidth="1"
            />
            <text x="12" y="17" fontSize="10.5" fontWeight="700" fill="#111111">
              Student Accounts & Timetables
            </text>
            <text
              x="12"
              y="40"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.1em"
              fill="#6B7280"
              fontWeight="600"
            >
              FIREBASE AUTH & FIRESTORE
            </text>
            <text x="12" y="60" fontSize="9" fill="#3F3F46">
              • Secure student sign-in (Google & email)
            </text>
            <text x="12" y="78" fontSize="9" fill="#3F3F46">
              • Department lecture timetables & calendar sync
            </text>
            <text x="12" y="96" fontSize="9" fill="#3F3F46">
              • Offline synchronization with mobile devices
            </text>
            <text
              x="12"
              y="112"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.06em"
              fill="#6B7280"
            >
              ROLE: USER IDENTITY & CALENDAR SYNC
            </text>
          </g>

          {/* Block 3: AI Explanation Engine (Gemini) */}
          <g transform="translate(12, 306)">
            <rect
              width="230"
              height="124"
              rx="2"
              fill="rgba(109, 40, 217, 0.03)"
              stroke="#6D28D9"
              strokeWidth="1.2"
            />
            <rect
              width="230"
              height="26"
              rx="2"
              fill="rgba(109, 40, 217, 0.08)"
              stroke="rgba(109, 40, 217, 0.2)"
              strokeWidth="1"
            />
            <text x="12" y="17" fontSize="10.5" fontWeight="700" fill="#6D28D9">
              AI Problem-Solving Tutor
            </text>
            <text
              x="12"
              y="40"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.1em"
              fill="#111111"
              fontWeight="600"
            >
              GOOGLE GEMINI AI API
            </text>
            <text x="12" y="60" fontSize="9" fill="#3F3F46">
              • Step-by-step guidance when students get stuck
            </text>
            <text x="12" y="78" fontSize="9" fill="#3F3F46">
              • Explains complex engineering formulas
            </text>
            <text x="12" y="96" fontSize="9" fill="#3F3F46">
              • Strictly scoped to current question context
            </text>
            <text
              x="12"
              y="114"
              className="font-mono"
              fontSize="7.5"
              letterSpacing="0.06em"
              fill="#6D28D9"
              fontWeight="600"
            >
              ROLE: ON-DEMAND EXPLANATION TUTOR
            </text>
          </g>

          <text
            x="14"
            y="442"
            className="font-mono"
            fontSize="8"
            letterSpacing="0.12em"
            fill="#9CA3AF"
          >
            PERSISTENCE & INTELLIGENCE
          </text>
        </g>

        {/* ===================================================================
            CONNECTORS & ARROWS (CLEAR, HUMAN LABELS)
           =================================================================== */}

        {/* Flow 1: Web App -> Edge Gateway */}
        <path
          d="M 276 150 L 334 150"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arch-arrow-dark)"
        />
        <rect x="274" y="132" width="60" height="15" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.12)" strokeWidth="0.8" />
        <text x="278" y="143" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#3F3F46" fontWeight="600">
          WEB TRAFFIC
        </text>

        {/* Flow 2: Mobile App -> Adaptive Engine */}
        <path
          d="M 276 360 L 334 360"
          stroke="#6D28D9"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arch-arrow)"
        />
        <rect x="272" y="342" width="64" height="15" rx="2" fill="#ffffff" stroke="rgba(109,40,217,0.3)" strokeWidth="0.8" />
        <text x="275" y="353" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#6D28D9" fontWeight="600">
          QUIZ ANSWERS
        </text>

        {/* Flow 3: Edge Gateway -> Question Bank (D1) */}
        <path
          d="M 610 140 L 664 140"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arch-arrow-dark)"
        />
        <rect x="610" y="123" width="56" height="15" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.12)" strokeWidth="0.8" />
        <text x="613" y="134" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#3F3F46" fontWeight="600">
          FETCH & SAVE
        </text>

        {/* Flow 4: Edge Gateway -> Firebase */}
        <path
          d="M 610 236 L 664 236"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arch-arrow-dark)"
        />
        <rect x="611" y="219" width="54" height="15" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.12)" strokeWidth="0.8" />
        <text x="614" y="230" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#3F3F46" fontWeight="600">
          AUTH & SYNC
        </text>

        {/* Flow 5: Adaptive Engine / Gateway -> Gemini AI */}
        <path
          d="M 610 368 L 664 368"
          stroke="#6D28D9"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#arch-arrow)"
        />
        <rect x="607" y="351" width="62" height="15" rx="2" fill="#ffffff" stroke="rgba(109,40,217,0.3)" strokeWidth="0.8" />
        <text x="611" y="362" className="font-mono" fontSize="7" letterSpacing="0.06em" fill="#6D28D9" fontWeight="600">
          EXPLAIN STEP
        </text>

        {/* Flow 6: Internal Edge loop between Gateway and Adaptive Engine */}
        <path
          d="M 475 222 L 475 234"
          stroke="#6D28D9"
          strokeWidth="1.5"
          strokeDasharray="3 2"
          fill="none"
          markerEnd="url(#arch-arrow)"
        />
      </svg>
    </div>
  );
}
