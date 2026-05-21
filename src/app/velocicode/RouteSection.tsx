"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";

type Stop = {
  num: string;
  date: string;
  title: string;
  meta: string;
  cta: string;
  href: string;
  external: boolean;
  side: "L" | "R";
  cardTop: string;
  pinLeft: string;
  pinTop: string;
};

// The route SVG path in viewBox coords (0 0 1000 1280) — 4 quadratic bezier segments
// matching: M 520 77 Q 820 260 480 486 Q 180 620 520 717 Q 820 820 480 934 Q 180 1030 520 1101
const PATH_SEGMENTS: [number, number, number, number, number, number][] = [
  [520, 77,  820, 260, 480, 486],
  [480, 486, 180, 620, 520, 717],
  [520, 717, 820, 820, 480, 934],
  [480, 934, 180, 1030, 520, 1101],
];

function evalQuadBezier(
  t: number,
  [x0, y0, cx, cy, x1, y1]: [number, number, number, number, number, number]
): [number, number] {
  const mt = 1 - t;
  return [
    mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  ];
}

// Tangent angle in degrees; plane nose is at -Y so we add 90 to align with travel direction
function tangentAngleDeg(
  t: number,
  [x0, y0, cx, cy, x1, y1]: [number, number, number, number, number, number]
): number {
  const dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx);
  const dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy);
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
}

// Convert SVG coordinates to % of route-wrap (viewBox 1000×1280)
function svgToPercent(x: number, y: number): [number, number] {
  return [x / 10, y / 12.8];
}

export function RouteSection({ stops }: { stops: Stop[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<SVGSVGElement>(null);
  const rotGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const plane = planeRef.current;
    if (!wrap) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Mark the wrap so CSS can target cards with opacity: 0 safely
    wrap.dataset.animated = "true";

    // Card reveals via IntersectionObserver
    const cards = Array.from(
      wrap.querySelectorAll<HTMLElement>(`.${styles["route-stop"]}`)
    );
    let io: IntersectionObserver | null = null;

    if (!prefersReduced) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.visible = "true";
              io!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      cards.forEach((card) => io.observe(card));
    } else {
      cards.forEach((card) => { card.dataset.visible = "true"; });
    }

    // Plane follows the bezier path as user scrolls through the route section
    const rotGroup = rotGroupRef.current;
    if (plane && rotGroup) {
      const onScroll = () => {
        const rect = wrap.getBoundingClientRect();
        const viewH = window.innerHeight;
        // 0 = route-wrap top at viewport bottom, 1 = route-wrap bottom at viewport top
        const progress = Math.max(
          0,
          Math.min(1, (viewH - rect.top) / (rect.height + viewH))
        );

        // Map progress → which bezier segment + local t within that segment
        const total = PATH_SEGMENTS.length;
        const scaled = progress * total;
        const segIdx = Math.min(Math.floor(scaled), total - 1);
        const localT = scaled - segIdx;

        const [svgX, svgY] = evalQuadBezier(localT, PATH_SEGMENTS[segIdx]);
        const [left, top] = svgToPercent(svgX, svgY);
        const angle = tangentAngleDeg(localT, PATH_SEGMENTS[segIdx]);

        plane.style.left = `${left}%`;
        plane.style.top = `${top}%`;
        // Rotate around center of the 60×60 viewBox — SVG attribute bypasses CSS cascade
        rotGroup.setAttribute("transform", `rotate(${angle} 30 30)`);
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();

      return () => {
        io?.disconnect();
        window.removeEventListener("scroll", onScroll);
      };
    }

    return () => io?.disconnect();
  }, [stops]);

  return (
    <div className={styles["route-wrap"]} ref={wrapRef}>
      {/* Winding route SVG path */}
      <svg
        className={styles["route-svg"]}
        viewBox="0 0 1000 1280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M 520 77
             Q 820 260 480 486
             Q 180 620 520 717
             Q 820 820 480 934
             Q 180 1030 520 1101"
          stroke="#5a3a18"
          strokeWidth="6"
          strokeDasharray="6 14"
          opacity="0.85"
        />
      </svg>

      {/* Plane — position driven by scroll listener */}
      <svg
        ref={planeRef}
        className={styles["route-plane"]}
        style={{ left: stops[0].pinLeft, top: stops[0].pinTop }}
        viewBox="0 0 60 60"
      >
        <g ref={rotGroupRef} transform="rotate(45 30 30)">
          <use href="#vc-plane" />
        </g>
      </svg>

      {/* Pin dots */}
      {stops.map((s) => (
        <span
          key={s.num}
          className={styles["route-pin"]}
          style={{ left: s.pinLeft, top: s.pinTop }}
        />
      ))}

      {/* Stop cards */}
      {stops.map((s) => (
        <a
          key={s.num}
          className={styles["route-stop"]}
          data-side={s.side}
          style={{ top: s.cardTop }}
          href={s.href}
          {...(s.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          <div className={styles["stop-head"]}>
            <div className={styles["stop-num"]}>{s.num}</div>
            <div>
              <div className={styles["stop-date"]}>{s.date}</div>
              <div className={styles["stop-title"]}>{s.title}</div>
            </div>
          </div>
          <div className={styles["stop-meta"]}>{s.meta}</div>
          <div className={styles["stop-arrow"]}>{s.cta}</div>
        </a>
      ))}
    </div>
  );
}
