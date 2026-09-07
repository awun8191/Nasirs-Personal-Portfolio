// ---------------------------------------------------------------------------
// Swiss Vector Diagram: Three-Layer Caching Architecture
// Aspect Ratio: 16:9 (viewBox="0 0 960 540")
// Style: Crisp hairline geometry, plain-English flow, study violet accents.
// ---------------------------------------------------------------------------

export default function EngineeringHubCachingDiagram() {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-card-border bg-surface transition-colors hover:border-card-border-hover">
      <svg
        viewBox="0 0 960 540"
        className="h-auto w-full select-none font-sans"
        aria-label="Three-Layer Caching Architecture Diagram"
      >
        <defs>
          <marker
            id="cache-arrow"
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
            id="cache-arrow-dark"
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
            id="cache-dots"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.65" fill="rgba(17, 17, 17, 0.07)" />
          </pattern>
        </defs>

        {/* Backdrop */}
        <rect width="960" height="540" fill="#ffffff" />
        <rect width="960" height="540" fill="url(#cache-dots)" />

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
          CACHE.HIERARCHY / 06
        </text>
        <text
          x="190"
          y="34"
          className="font-mono"
          fontSize="9"
          letterSpacing="0.12em"
          fill="#6B7280"
        >
          3-TIER LATENCY REDUCTION: ACCELERATING ACCESS ON LOW-BANDWIDTH CAMPUS NETWORKS
        </text>

        {/* ===================================================================
            TIER 1: CLIENT MEMORY CACHE
           =================================================================== */}
        <g transform="translate(36, 56)">
          <rect
            width="270"
            height="440"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="270"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#111111">
            Tier 01: Client Memory Cache
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
            IN-BROWSER & DEVICE MEMORY
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Instant navigation between questions
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Zero UI flicker or loading spinners
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Offline flashcard review on mobile
          </text>

          {/* Latency Hero Pill */}
          <g transform="translate(14, 138)">
            <rect width="242" height="60" rx="2" fill="rgba(16, 185, 129, 0.06)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" />
            <text x="14" y="24" className="font-mono" fontSize="8" fill="#059669" fontWeight="600">
              RESPONSE TIME
            </text>
            <text x="14" y="48" className="font-mono" fontSize="18" fontWeight="700" fill="#059669">
              0 to 2 ms
            </text>
            <text x="130" y="44" fontSize="8" fill="#3F3F46">
              Instant memory read
            </text>
          </g>

          <g transform="translate(14, 214)">
            <rect width="242" height="180" rx="2" fill="rgba(17, 17, 17, 0.02)" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="12" y="20" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              IMPLEMENTATION SPEC
            </text>
            <text x="12" y="42" fontSize="9" fontWeight="700" fill="#111111">
              React Query (Web) & BLoC (App)
            </text>
            <text x="12" y="62" fontSize="8.5" fill="#3F3F46">
              • staleTime: 5 min for catalogs
            </text>
            <text x="12" y="80" fontSize="8.5" fill="#3F3F46">
              • staleTime: 1 min for quiz decks
            </text>
            <text x="12" y="98" fontSize="8.5" fill="#3F3F46">
              • gcTime: 30 min in background
            </text>
            <path d="M 12 112 L 230 112" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="12" y="130" className="font-mono" fontSize="7.5" fill="#DC2626" fontWeight="600">
              CACHE INVALIDATION
            </text>
            <text x="12" y="148" fontSize="8" fill="#3F3F46">
              Submitting a quiz answer triggers
            </text>
            <text x="12" y="162" fontSize="8" fill="#3F3F46">
              surgical cache refresh for that topic
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
            CLIENT: REACT QUERY + HYDRATED STATE
          </text>
        </g>

        {/* Arrow 1 -> 2 (Cache Miss) */}
        <path
          d="M 306 240 L 344 240"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#cache-arrow-dark)"
        />
        <rect x="306" y="222" width="38" height="14" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="0.8" />
        <text x="310" y="232" className="font-mono" fontSize="6.5" fill="#3F3F46" fontWeight="600">
          MISS
        </text>

        {/* ===================================================================
            TIER 2: EDGE CDN CACHE
           =================================================================== */}
        <g transform="translate(344, 56)">
          <rect
            width="272"
            height="440"
            rx="2"
            fill="rgba(109, 40, 217, 0.02)"
            stroke="#6D28D9"
            strokeWidth="1.25"
          />
          <rect
            width="272"
            height="28"
            rx="2"
            fill="rgba(109, 40, 217, 0.08)"
            stroke="rgba(109, 40, 217, 0.2)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#6D28D9">
            Tier 02: Global Edge CDN
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
            CLOUDFLARE NETWORK (300+ CITIES)
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Terminated at nearest African edge PoP
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Absorbs 85%+ of read traffic
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Protects SQLite database from spikes
          </text>

          {/* Latency Hero Pill */}
          <g transform="translate(14, 138)">
            <rect width="244" height="60" rx="2" fill="rgba(109, 40, 217, 0.06)" stroke="rgba(109, 40, 217, 0.3)" strokeWidth="1" />
            <text x="14" y="24" className="font-mono" fontSize="8" fill="#6D28D9" fontWeight="600">
              RESPONSE TIME
            </text>
            <text x="14" y="48" className="font-mono" fontSize="18" fontWeight="700" fill="#6D28D9">
              15 to 45 ms
            </text>
            <text x="136" y="44" fontSize="8" fill="#3F3F46">
              Closest edge server
            </text>
          </g>

          <g transform="translate(14, 214)">
            <rect width="244" height="180" rx="2" fill="#ffffff" stroke="rgba(109, 40, 217, 0.2)" strokeWidth="1" />
            <text x="12" y="20" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              CACHE-CONTROL STRATEGY
            </text>
            <text x="12" y="42" fontSize="9" fontWeight="700" fill="#111111">
              Cloudflare Worker Cache API
            </text>
            <text x="12" y="62" fontSize="8.5" fill="#3F3F46">
              • Static Assets: 1 year immutable
            </text>
            <text x="12" y="80" fontSize="8.5" fill="#3F3F46">
              • Course Lists: s-maxage 86400 (24h)
            </text>
            <text x="12" y="98" fontSize="8.5" fill="#3F3F46">
              • Question Stems: s-maxage 3600 (1h)
            </text>
            <path d="M 12 112 L 232 112" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="12" y="130" className="font-mono" fontSize="7.5" fill="#6D28D9" fontWeight="600">
              PRIVATE EXCLUSIONS
            </text>
            <text x="12" y="148" fontSize="8" fill="#3F3F46">
              Student mastery & answers use
            </text>
            <text x="12" y="162" fontSize="8" fill="#3F3F46">
              &apos;Cache-Control: private, no-store&apos;
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
            EDGE: WORKER CLOUD CACHE
          </text>
        </g>

        {/* Arrow 2 -> 3 (Cache Miss / Write) */}
        <path
          d="M 616 240 L 654 240"
          stroke="#3F3F46"
          strokeWidth="1.5"
          fill="none"
          markerEnd="url(#cache-arrow-dark)"
        />
        <rect x="616" y="222" width="38" height="14" rx="2" fill="#ffffff" stroke="rgba(17,17,17,0.15)" strokeWidth="0.8" />
        <text x="620" y="232" className="font-mono" fontSize="6.5" fill="#3F3F46" fontWeight="600">
          MISS
        </text>

        {/* ===================================================================
            TIER 3: PERSISTENT DATABASE & DURABLE OBJECT
           =================================================================== */}
        <g transform="translate(654, 56)">
          <rect
            width="270"
            height="440"
            rx="2"
            fill="#ffffff"
            stroke="#111111"
            strokeWidth="1"
          />
          <rect
            width="270"
            height="28"
            rx="2"
            fill="rgba(17, 17, 17, 0.03)"
            stroke="rgba(17, 17, 17, 0.1)"
            strokeWidth="1"
          />
          <text x="14" y="18" fontSize="11" fontWeight="700" fill="#111111">
            Tier 03: Authoritative Database
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
            CLOUDFLARE D1 (SQLITE) &amp; DURABLE OBJECTS
          </text>
          <text x="14" y="70" fontSize="9.5" fill="#3F3F46">
            • Single source of truth for all data
          </text>
          <text x="14" y="92" fontSize="9.5" fill="#3F3F46">
            • Per-user state coordination
          </text>
          <text x="14" y="114" fontSize="9.5" fill="#3F3F46">
            • Atomic writes with zero race conditions
          </text>

          {/* Latency Hero Pill */}
          <g transform="translate(14, 138)">
            <rect width="242" height="60" rx="2" fill="rgba(17, 17, 17, 0.04)" stroke="rgba(17, 17, 17, 0.2)" strokeWidth="1" />
            <text x="14" y="24" className="font-mono" fontSize="8" fill="#111111" fontWeight="600">
              RESPONSE TIME
            </text>
            <text x="14" y="48" className="font-mono" fontSize="18" fontWeight="700" fill="#111111">
              40 to 80 ms
            </text>
            <text x="136" y="44" fontSize="8" fill="#3F3F46">
              Complete SQLite query
            </text>
          </g>

          <g transform="translate(14, 214)">
            <rect width="242" height="180" rx="2" fill="rgba(17, 17, 17, 0.02)" stroke="rgba(17, 17, 17, 0.12)" strokeWidth="1" />
            <text x="12" y="20" className="font-mono" fontSize="7.5" fill="#6B7280" fontWeight="600">
              QUERY OPTIMIZATION
            </text>
            <text x="12" y="42" fontSize="9" fontWeight="700" fill="#111111">
              Indexed SQLite Tables
            </text>
            <text x="12" y="62" fontSize="8.5" fill="#3F3F46">
              • Indexed by (course_id, topic_id)
            </text>
            <text x="12" y="80" fontSize="8.5" fill="#3F3F46">
              • Batch fetch queries (up to 25 items)
            </text>
            <text x="12" y="98" fontSize="8.5" fill="#3F3F46">
              • Durable Object per-user coordination
            </text>
            <path d="M 12 112 L 230 112" stroke="rgba(17,17,17,0.1)" strokeWidth="1" />
            <text x="12" y="130" className="font-mono" fontSize="7.5" fill="#059669" fontWeight="600">
              DATA GUARANTEES
            </text>
            <text x="12" y="148" fontSize="8" fill="#3F3F46">
              Transactional integrity for every
            </text>
            <text x="12" y="162" fontSize="8" fill="#3F3F46">
              submitted quiz answer and score
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
            PERSISTENCE: SERVERLESS SQLITE (D1)
          </text>
        </g>
      </svg>
    </div>
  );
}
