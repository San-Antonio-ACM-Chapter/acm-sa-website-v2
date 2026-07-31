"use client";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";
import type { Judge } from "./people";

export type { Judge };

export function JudgesCarousel({ judges }: { judges: Judge[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    offset: 0,
    paused: false,
    dragging: false,
    dragStartX: 0,
    dragStartOffset: 0,
    halfWidth: 0,
    speed: 0.55,
    raf: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track || judges.length === 0) return;
    const state = stateRef.current;
    state.halfWidth = track.scrollWidth / 2;
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    state.speed = reduce ? 0 : 0.55;

    const tick = () => {
      if (!state.dragging && !state.paused && state.halfWidth > 0) {
        state.offset += state.speed;
        if (state.offset >= state.halfWidth) state.offset -= state.halfWidth;
        track.style.transform = `translateX(${-state.offset}px)`;
      }
      state.raf = requestAnimationFrame(tick);
    };
    state.raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(state.raf);
  }, [judges.length]);

  if (judges.length === 0) {
    return (
      <p className={styles["judges-empty"]}>
        Judges will be announced as they confirm — check back closer to the
        showcase.
      </p>
    );
  }

  const doubled = [...judges, ...judges];
  const state = stateRef.current;

  return (
    <section
      className={styles["judges-carousel"]}
      aria-label="Judges"
      onMouseEnter={() => {
        state.paused = true;
      }}
      onMouseLeave={() => {
        state.paused = false;
        state.dragging = false;
      }}
    >
      <div
        ref={trackRef}
        className={styles["judges-track"]}
        onPointerDown={(e) => {
          state.dragging = true;
          state.dragStartX = e.clientX;
          state.dragStartOffset = state.offset;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!state.dragging || state.halfWidth <= 0) return;
          const dx = e.clientX - state.dragStartX;
          let next = state.dragStartOffset - dx;
          next = ((next % state.halfWidth) + state.halfWidth) % state.halfWidth;
          state.offset = next;
          if (trackRef.current) {
            trackRef.current.style.transform = `translateX(${-state.offset}px)`;
          }
        }}
        onPointerUp={() => {
          state.dragging = false;
        }}
        onPointerLeave={() => {
          state.dragging = false;
        }}
      >
        {doubled.map((judge, i) => {
          const isClone = i >= judges.length;
          const primaryLink = judge.links?.[0];
          return (
            <div
              key={`${judge.name}-${isClone ? "clone" : "orig"}`}
              className={styles["judge-card"]}
              aria-hidden={isClone || undefined}
            >
              {primaryLink && (
                <a
                  className={styles["judge-card-mobile-link"]}
                  href={primaryLink.href}
                  aria-label={`View ${judge.name} profile`}
                  tabIndex={isClone ? -1 : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {judge.name}
                </a>
              )}
              <div className={styles["judge-photo"]}>
                {judge.photo && (
                  // biome-ignore lint/performance/noImgElement: judge headshot, external URL
                  <img
                    src={`/velocicode/people/${judge.photo}`}
                    alt={judge.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
                {judge.orgBadge && (
                  <span className={styles["judge-org-badge"]}>
                    {/* biome-ignore lint/performance/noImgElement: org badge logo */}
                    <img src={judge.orgBadge.src} alt={judge.orgBadge.alt} />
                  </span>
                )}
              </div>
              <div className={styles["judge-name"]}>{judge.name}</div>
              <div className={styles["judge-title"]}>{judge.title}</div>
              {judge.links && judge.links.length > 0 && (
                <div className={styles["judge-links"]}>
                  {judge.links.map((link) => (
                    <a
                      key={link.ariaLabel}
                      className={styles["judge-link"]}
                      href={link.href}
                      aria-label={link.ariaLabel}
                      tabIndex={isClone ? -1 : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
