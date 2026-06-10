"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

const GOLD = "#D4A237";
const CONTENT_MAX = 1280; // matches the max-w-7xl content container
const SEGMENT = 700;      // vertical px between lane changes

interface SidePath {
  d: string;
  vias: [number, number][];
  stubs: { d: string; pad: [number, number] }[];
}

interface Geometry {
  left: SidePath;
  right: SidePath;
  w: number;
  h: number;
}

/* One trace confined to a gutter: zig-zags between two lanes with 45°
   transitions, never entering the content column. */
function buildSide(
  laneOuter: number,
  laneInner: number,
  edgeX: number,
  h: number,
  firstSegment: number
): SidePath {
  const lanes = [laneOuter, laneInner];
  const vias: [number, number][] = [];
  const stubs: { d: string; pad: [number, number] }[] = [];
  const slope = Math.abs(laneInner - laneOuter);

  let i = 0;
  let y = 0;
  let seg = firstSegment;
  let d = `M ${lanes[0]} 0`;

  while (y + seg < h - 100) {
    const turnY = y + seg;
    const from = lanes[i % 2];
    const to = lanes[(i + 1) % 2];

    d += ` L ${from} ${turnY}`;
    d += ` L ${to} ${turnY + slope}`;
    vias.push([from, turnY]);
    vias.push([to, turnY + slope]);

    // small stub toward the page edge, away from content
    if (i % 2 === 0 && Math.abs(from - edgeX) > 22) {
      const sy = turnY - seg / 2;
      const sx = from + (edgeX > from ? 12 : -12);
      stubs.push({ d: `M ${from} ${sy} L ${sx} ${sy}`, pad: [sx, sy] });
    }

    y = turnY + slope;
    seg = SEGMENT;
    i++;
  }

  d += ` L ${lanes[i % 2]} ${h}`;
  return { d, vias, stubs };
}

function buildGeometry(w: number, h: number): Geometry {
  // container padding is px-5 below the sm breakpoint, sm:px-8 above
  const contentPad = w >= 640 ? 32 : 20;

  // left edge of the content column — the trace must stay left of this
  const containerLeft = Math.max((w - CONTENT_MAX) / 2, 0);
  const textStart = containerLeft + contentPad;

  // two lanes inside the gutter, clear of the text start
  const inner = Math.max(Math.min(textStart - 12, containerLeft + 14), 10);
  const outer = Math.max(inner - Math.max(containerLeft * 0.6, 18), 4);

  // very short pages (or very tall viewports) still get at least one bend
  const segment = Math.min(SEGMENT, Math.max(h / 4, 240));

  return {
    left: buildSide(outer, inner, 0, h, segment),
    right: buildSide(w - outer, w - inner, w, h, segment * 1.5),
    w,
    h,
  };
}

export default function CircuitBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);

  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  // Measure the full document wrapper (client-only, so no hydration mismatch)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { clientWidth, clientHeight } = el;
      if (clientWidth && clientHeight) setGeo(buildGeometry(clientWidth, clientHeight));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none z-[1]"
    >
      {geo && (
        <svg
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
          fill="none"
          className="absolute inset-0"
        >
          {[geo.left, geo.right].map((side, s) => (
            <g key={s}>
              {/* faint full route — the "unpowered" copper trace */}
              <path d={side.d} stroke={GOLD} strokeOpacity={0.15} strokeWidth={1} />

              {/* branch stubs + pads */}
              {side.stubs.map((stub, idx) => (
                <g key={idx} stroke={GOLD} strokeOpacity={0.15} strokeWidth={1}>
                  <path d={stub.d} />
                  <circle cx={stub.pad[0]} cy={stub.pad[1]} r={2.6} />
                </g>
              ))}

              {/* vias at every bend */}
              {side.vias.map(([cx, cy], idx) => (
                <g key={idx}>
                  <circle cx={cx} cy={cy} r={3} stroke={GOLD} strokeOpacity={0.18} strokeWidth={1} />
                  <circle cx={cx} cy={cy} r={1} fill={GOLD} fillOpacity={0.22} />
                </g>
              ))}

              {/* the live trace — draws in with scroll; static when the
                  device asks for reduced motion */}
              {prefersReducedMotion ? (
                <path
                  d={side.d}
                  stroke={GOLD}
                  strokeOpacity={0.32}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
              ) : (
                <motion.path
                  d={side.d}
                  stroke={GOLD}
                  strokeOpacity={0.32}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  style={{ pathLength: progress }}
                />
              )}
            </g>
          ))}
        </svg>
      )}
    </div>
  );
}
