"use client";

import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import {
  evalQuadBezier,
  tangentAngleDeg,
  svgToPercent,
  type ComputedStop,
  type RouteSegment,
} from "./routeLayout";

type Props = {
  stops: ComputedStop[];
  pathD: string;
  segments: RouteSegment[];
  wrapMinHeight: number;
  pathTopFrac: number;
  pathBottomFrac: number;
};

export function RouteSection({ stops, pathD, segments, wrapMinHeight, pathTopFrac, pathBottomFrac }: Props) {
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
      cards.forEach((card) => io!.observe(card));
    } else {
      cards.forEach((card) => { card.dataset.visible = "true"; });
    }

    // Plane follows the bezier path as user scrolls through the route section
    const rotGroup = rotGroupRef.current;
    if (plane && rotGroup) {
      const onScroll = () => {
        const rect = wrap.getBoundingClientRect();
        const wrapH = wrap.offsetHeight;
        const viewH = window.innerHeight;
        // progress 0 = first pin at viewport center; 1 = last pin at viewport center
        const startRectTop = viewH / 2 - pathTopFrac * wrapH;
        const endRectTop   = viewH / 2 - pathBottomFrac * wrapH;
        const progress = Math.max(0, Math.min(1, (startRectTop - rect.top) / (startRectTop - endRectTop)));

        // Map progress → which bezier segment + local t within that segment
        const total = segments.length;
        const scaled = progress * total;
        const segIdx = Math.min(Math.floor(scaled), total - 1);
        const localT = scaled - segIdx;

        const [svgX, svgY] = evalQuadBezier(localT, segments[segIdx]);
        const [left, top] = svgToPercent(svgX, svgY);
        const angle = tangentAngleDeg(localT, segments[segIdx]);

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
  }, [stops, segments]);

  return (
    <div className={styles["route-wrap"]} ref={wrapRef} style={{ minHeight: wrapMinHeight }}>
      {/* Winding route SVG path */}
      <svg
        className={styles["route-svg"]}
        viewBox="0 0 1000 1280"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={pathD}
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
              <div className={styles["stop-date"]}>{s.dateFormatted}</div>
              <div className={styles["stop-title"]}>{s.title}</div>
            </div>
          </div>
          <div className={styles["stop-meta"]}>{s.meta}</div>
          <div className={styles["stop-arrow"]}>{s.cta} {s.external ? "↗" : "→"}</div>
        </a>
      ))}
    </div>
  );
}
