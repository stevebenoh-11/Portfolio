"use client";
import { useEffect, useRef, useState } from "react";

// Trace colour & via colour (dimmed teal)
const TC = "rgba(0, 108, 140, 0.38)";
const VC = "rgba(0, 148, 185, 0.80)";

// [path_d, startAt, endAt]  — scroll progress thresholds 0→1
const TRACES: [string, number, number][] = [
  // ── TOP POWER BUS ──────────────────────────────────────────
  ["M 55,62 H 360",   0.00, 0.06],
  ["M 360,62 H 720",  0.04, 0.10],
  ["M 720,62 H 1080", 0.08, 0.14],
  ["M 1080,62 H 1385",0.12, 0.18],

  // ── LEFT RAIL (x=55) ───────────────────────────────────────
  ["M 55,62 V 300",   0.06, 0.17],
  ["M 55,300 V 550",  0.22, 0.34],
  ["M 55,550 V 838",  0.48, 0.62],

  // ── INNER-LEFT COLUMN (x=360) ──────────────────────────────
  ["M 360,62 V 183",  0.07, 0.13],
  ["M 360,228 V 300", 0.26, 0.32],
  ["M 360,300 V 428", 0.28, 0.39],
  ["M 360,478 V 550", 0.46, 0.54],
  ["M 360,550 V 838", 0.57, 0.71],

  // ── CENTRE COLUMN (x=720, split for MCU chip) ──────────────
  ["M 720,62 V 183",  0.09, 0.15],
  ["M 720,248 V 300", 0.32, 0.37],
  ["M 720,300 V 550", 0.37, 0.52],
  ["M 720,550 V 838", 0.60, 0.74],

  // ── INNER-RIGHT COLUMN (x=1080) ────────────────────────────
  ["M 1080,62 V 183",  0.11, 0.17],
  ["M 1080,228 V 300", 0.27, 0.33],
  ["M 1080,300 V 428", 0.30, 0.41],
  ["M 1080,478 V 550", 0.48, 0.56],
  ["M 1080,550 V 838", 0.59, 0.73],

  // ── RIGHT RAIL (x=1385) ────────────────────────────────────
  ["M 1385,62 V 300",  0.13, 0.24],
  ["M 1385,300 V 550", 0.32, 0.45],
  ["M 1385,550 V 838", 0.62, 0.76],

  // ── HORIZONTAL CONNECTOR AT y=300 ──────────────────────────
  ["M 55,300 H 360",   0.18, 0.24],
  ["M 360,300 H 720",  0.22, 0.28],
  ["M 720,300 H 1080", 0.26, 0.32],
  ["M 1080,300 H 1385",0.30, 0.36],

  // ── HORIZONTAL CONNECTOR AT y=550 ──────────────────────────
  ["M 55,550 H 360",   0.42, 0.50],
  ["M 360,550 H 720",  0.48, 0.56],
  ["M 720,550 H 1080", 0.54, 0.62],
  ["M 1080,550 H 1385",0.60, 0.68],

  // ── BOTTOM GROUND BUS ──────────────────────────────────────
  ["M 55,838 H 360",   0.72, 0.79],
  ["M 360,838 H 720",  0.77, 0.84],
  ["M 720,838 H 1080", 0.82, 0.89],
  ["M 1080,838 H 1385",0.88, 0.97],

  // ── BRANCH TRACES (organic feel) ───────────────────────────
  ["M 55,185 H 165 V 300",          0.09, 0.20],
  ["M 1385,420 H 1275 V 550",       0.36, 0.46],
  ["M 1200,62 V 145 H 1080 V 183",  0.10, 0.19],
  ["M 560,62 V 128 H 720 V 183",    0.08, 0.16],
  ["M 55,720 H 200 V 838",          0.65, 0.74],
  ["M 1385,720 H 1240 V 838",       0.66, 0.75],
  ["M 560,838 V 758 H 720",         0.77, 0.84],
  ["M 880,838 V 758 H 1080",        0.79, 0.86],
];

// [cx, cy, activationThreshold]
const VIAS: [number, number, number][] = [
  // Top bus
  [55, 62, 0.00], [360, 62, 0.06], [720, 62, 0.10], [1080, 62, 0.14], [1385, 62, 0.18],
  // y=300 row
  [55, 300, 0.18], [360, 300, 0.24], [720, 300, 0.28], [1080, 300, 0.32], [1385, 300, 0.36],
  // y=550 row
  [55, 550, 0.44], [360, 550, 0.52], [720, 550, 0.58], [1080, 550, 0.64], [1385, 550, 0.70],
  // Bottom bus (final connection!)
  [55, 838, 0.74], [360, 838, 0.81], [720, 838, 0.87], [1080, 838, 0.93], [1385, 838, 0.98],
  // IC chip connections
  [360, 183, 0.13], [360, 228, 0.27],
  [1080, 183, 0.17], [1080, 228, 0.28],
  [720, 183, 0.15], [720, 248, 0.33],
  // Branch junctions
  [55, 185, 0.10],  [165, 185, 0.16],  [165, 300, 0.21],
  [1385, 420, 0.37],[1275, 420, 0.40], [1275, 550, 0.47],
  [1200, 62, 0.11], [1200, 145, 0.14], [1080, 145, 0.16],
  [560, 62, 0.09],  [560, 128, 0.12],  [720, 128, 0.14],
  [55, 720, 0.67],  [200, 720, 0.69],  [200, 838, 0.73],
  [1385, 720, 0.68],[1240, 720, 0.70], [1240, 838, 0.74],
  [560, 838, 0.79], [560, 758, 0.81],  [720, 758, 0.83],
  [880, 838, 0.81], [880, 758, 0.83],  [1080, 758, 0.85],
  [360, 428, 0.40], [360, 478, 0.47],
  [1080, 428, 0.42],[1080, 478, 0.49],
];

export default function CircuitBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [preserveRatio, setPreserveRatio] = useState("xMidYMid slice");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPreserveRatio("xMidYMid meet");
      } else {
        setPreserveRatio("xMidYMid slice");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const traces = Array.from(svg.querySelectorAll<SVGPathElement>(".circuit-trace"));
    const vias   = Array.from(svg.querySelectorAll<SVGCircleElement>(".circuit-via"));

    // Pre-measure all path lengths and hide them
    const lengths = traces.map((el) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray  = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      return len;
    });

    let raf = 0;
    let prev = -1;

    const tick = () => {
      const sy  = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const p   = Math.min(sy / max, 1);

      if (Math.abs(p - prev) < 0.0008) return;
      prev = p;

      // Animate trace drawing
      traces.forEach((el, i) => {
        const s   = +(el.dataset.startAt ?? 0);
        const e   = +(el.dataset.endAt   ?? 1);
        const seg = p >= e ? 1 : p > s ? (p - s) / (e - s) : 0;
        el.style.strokeDashoffset = `${lengths[i] * (1 - seg)}`;
      });

      // Activate junction vias
      vias.forEach((el) => {
        const t = +(el.dataset.threshold ?? 1);
        el.style.opacity = p >= t ? "1" : "0";
      });

      // Circuit-complete glow at the very bottom
      svg.classList.toggle("circuit-complete", p >= 0.97);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="fixed inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 2 }}
      viewBox="0 0 1440 900"
      preserveAspectRatio={preserveRatio}
      aria-hidden="true"
    >
      <defs>
        {/* Subtle PCB via-hole dot grid */}
        <pattern id="pcb-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="0.55" fill="rgba(0,100,135,0.12)" />
        </pattern>
        {/* Glow filter used on complete state */}
        <filter id="trace-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* PCB substrate dot grid */}
      <rect width="1440" height="900" fill="url(#pcb-grid)" />

      {/* ── BASE CHANNEL ETCHINGS (always visible physical track lanes) ── */}
      {TRACES.map(([d], i) => (
        <path
          key={`bg-t${i}`}
          d={d}
          stroke="rgba(0, 100, 135, 0.08)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* ── ACTIVE SCROLL-DRIVEN TRACES (drawn on scroll with subtle glow) ── */}
      {TRACES.map(([d, startAt, endAt], i) => (
        <path
          key={`t${i}`}
          className="circuit-trace"
          d={d}
          data-start-at={startAt}
          data-end-at={endAt}
          stroke="rgba(0, 168, 208, 0.52)"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 1px rgba(0, 168, 208, 0.25))",
          }}
        />
      ))}

      {/* ── IC CHIP: MAIN MCU (center, 665-775 × 183-248) ─────── */}
      <g className="circuit-ic" opacity="0.52">
        <rect x="665" y="183" width="110" height="65" rx="5"
          stroke="rgba(0,128,162,0.55)" fill="rgba(0,85,115,0.05)" strokeWidth="1.5" />
        {/* Top pins */}
        <line x1="695" y1="183" x2="695" y2="172" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="720" y1="183" x2="720" y2="172" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="745" y1="183" x2="745" y2="172" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        {/* Bottom pins */}
        <line x1="695" y1="248" x2="695" y2="259" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="720" y1="248" x2="720" y2="259" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="745" y1="248" x2="745" y2="259" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        {/* Left pins */}
        <line x1="665" y1="200" x2="654" y2="200" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="665" y1="216" x2="654" y2="216" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="665" y1="232" x2="654" y2="232" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        {/* Right pins */}
        <line x1="775" y1="200" x2="786" y2="200" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="775" y1="216" x2="786" y2="216" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        <line x1="775" y1="232" x2="786" y2="232" stroke="rgba(0,118,152,0.45)" strokeWidth="1.2" />
        {/* Polarity notch */}
        <circle cx="678" cy="196" r="3.5" stroke="rgba(0,118,152,0.38)" fill="none" strokeWidth="1" />
        {/* Labels */}
        <text x="720" y="221" textAnchor="middle" fill="rgba(0,168,208,0.48)" fontSize="8" fontFamily="monospace" fontWeight="bold">MCU</text>
        <text x="720" y="233" textAnchor="middle" fill="rgba(0,138,168,0.32)" fontSize="5.5" fontFamily="monospace">ATmega328P</text>
      </g>

      {/* ── IC CHIP: REG (left-top, 332-388 × 183-228) ─────────── */}
      <g className="circuit-ic" opacity="0.48">
        <rect x="332" y="183" width="56" height="45" rx="3"
          stroke="rgba(0,125,158,0.45)" fill="rgba(0,80,108,0.04)" strokeWidth="1.2" />
        <line x1="352" y1="183" x2="352" y2="174" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="368" y1="183" x2="368" y2="174" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="352" y1="228" x2="352" y2="237" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="368" y1="228" x2="368" y2="237" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <text x="360" y="210" textAnchor="middle" fill="rgba(0,165,205,0.44)" fontSize="7" fontFamily="monospace">REG</text>
      </g>

      {/* ── IC CHIP: SEN (right-top, 1052-1108 × 183-228) ─────── */}
      <g className="circuit-ic" opacity="0.48">
        <rect x="1052" y="183" width="56" height="45" rx="3"
          stroke="rgba(0,125,158,0.45)" fill="rgba(0,80,108,0.04)" strokeWidth="1.2" />
        <line x1="1072" y1="183" x2="1072" y2="174" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1088" y1="183" x2="1088" y2="174" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1072" y1="228" x2="1072" y2="237" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1088" y1="228" x2="1088" y2="237" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <text x="1080" y="210" textAnchor="middle" fill="rgba(0,165,205,0.44)" fontSize="7" fontFamily="monospace">SEN</text>
      </g>

      {/* ── IC CHIP: DRV (left-mid, 332-388 × 428-478) ─────────── */}
      <g className="circuit-ic" opacity="0.48">
        <rect x="332" y="428" width="56" height="50" rx="3"
          stroke="rgba(0,125,158,0.45)" fill="rgba(0,80,108,0.04)" strokeWidth="1.2" />
        <line x1="352" y1="428" x2="352" y2="419" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="368" y1="428" x2="368" y2="419" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="352" y1="478" x2="352" y2="487" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="368" y1="478" x2="368" y2="487" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <text x="360" y="457" textAnchor="middle" fill="rgba(0,165,205,0.44)" fontSize="7" fontFamily="monospace">DRV</text>
      </g>

      {/* ── IC CHIP: AMP (right-mid, 1052-1108 × 428-478) ─────── */}
      <g className="circuit-ic" opacity="0.48">
        <rect x="1052" y="428" width="56" height="50" rx="3"
          stroke="rgba(0,125,158,0.45)" fill="rgba(0,80,108,0.04)" strokeWidth="1.2" />
        <line x1="1072" y1="428" x2="1072" y2="419" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1088" y1="428" x2="1088" y2="419" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1072" y1="478" x2="1072" y2="487" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <line x1="1088" y1="478" x2="1088" y2="487" stroke="rgba(0,115,148,0.38)" strokeWidth="1" />
        <text x="1080" y="457" textAnchor="middle" fill="rgba(0,165,205,0.44)" fontSize="7" fontFamily="monospace">AMP</text>
      </g>

      {/* ── SMD RESISTORS (small rect along traces) ─────────────── */}
      {/* y=300 between x=55-360 */}
      <rect className="circuit-smd" x="184" y="295" width="22" height="10" rx="1"
        stroke="rgba(0,125,160,0.48)" fill="rgba(0,90,118,0.06)" strokeWidth="1" opacity="0.55" />
      {/* y=300 between x=720-1080 */}
      <rect className="circuit-smd" x="884" y="295" width="22" height="10" rx="1"
        stroke="rgba(0,125,160,0.48)" fill="rgba(0,90,118,0.06)" strokeWidth="1" opacity="0.55" />
      {/* y=550 between x=360-720 */}
      <rect className="circuit-smd" x="524" y="545" width="22" height="10" rx="1"
        stroke="rgba(0,125,160,0.48)" fill="rgba(0,90,118,0.06)" strokeWidth="1" opacity="0.55" />
      {/* y=550 between x=1080-1385 */}
      <rect className="circuit-smd" x="1207" y="545" width="22" height="10" rx="1"
        stroke="rgba(0,125,160,0.48)" fill="rgba(0,90,118,0.06)" strokeWidth="1" opacity="0.55" />

      {/* ── CAPACITOR SYMBOLS (two parallel lines ⊣) ─────────── */}
      {/* Left rail near y=430 */}
      <g className="circuit-smd" opacity="0.52">
        <line x1="46" y1="427" x2="64" y2="427" stroke="rgba(0,125,160,0.52)" strokeWidth="1.8" />
        <line x1="46" y1="432" x2="64" y2="432" stroke="rgba(0,125,160,0.42)" strokeWidth="1" />
      </g>
      {/* Right rail near y=430 */}
      <g className="circuit-smd" opacity="0.52">
        <line x1="1376" y1="427" x2="1394" y2="427" stroke="rgba(0,125,160,0.52)" strokeWidth="1.8" />
        <line x1="1376" y1="432" x2="1394" y2="432" stroke="rgba(0,125,160,0.42)" strokeWidth="1" />
      </g>

      {/* ── VCC POWER SYMBOL (top-left) ──────────────────────── */}
      <g className="circuit-smd" opacity="0.42">
        <line x1="55" y1="26" x2="55" y2="62" stroke="rgba(0,125,160,0.48)" strokeWidth="1.5" />
        <line x1="44" y1="27" x2="66" y2="27" stroke="rgba(0,125,160,0.58)" strokeWidth="2" />
        <line x1="49" y1="21" x2="61" y2="21" stroke="rgba(0,125,160,0.48)" strokeWidth="1.2" />
        <text x="55" y="13" textAnchor="middle" fill="rgba(0,162,200,0.38)" fontSize="7" fontFamily="monospace">VCC</text>
      </g>

      {/* ── GND SYMBOL (bottom-left) ─────────────────────────── */}
      <g className="circuit-smd" opacity="0.42">
        <line x1="55" y1="838" x2="55" y2="862" stroke="rgba(0,125,160,0.48)" strokeWidth="1.5" />
        <line x1="44" y1="862" x2="66" y2="862" stroke="rgba(0,125,160,0.58)" strokeWidth="2" />
        <line x1="49" y1="867" x2="61" y2="867" stroke="rgba(0,125,160,0.45)" strokeWidth="1.2" />
        <line x1="53" y1="872" x2="57" y2="872" stroke="rgba(0,125,160,0.35)" strokeWidth="1" />
      </g>

      {/* ── GND SYMBOL (bottom-right — final connection point) ── */}
      <g className="circuit-smd" opacity="0.42">
        <line x1="1385" y1="838" x2="1385" y2="862" stroke="rgba(0,125,160,0.48)" strokeWidth="1.5" />
        <line x1="1374" y1="862" x2="1396" y2="862" stroke="rgba(0,125,160,0.58)" strokeWidth="2" />
        <line x1="1379" y1="867" x2="1391" y2="867" stroke="rgba(0,125,160,0.45)" strokeWidth="1.2" />
        <line x1="1383" y1="872" x2="1387" y2="872" stroke="rgba(0,125,160,0.35)" strokeWidth="1" />
      </g>

      {/* ── VIA / JUNCTION DOTS ───────────────────────────────── */}
      {VIAS.map(([cx, cy, threshold], i) => (
        <circle
          key={`v${i}`}
          className="circuit-via"
          cx={cx}
          cy={cy}
          r="3"
          fill={VC}
          data-threshold={threshold}
          style={{ opacity: 0 }}
        />
      ))}
    </svg>
  );
}
