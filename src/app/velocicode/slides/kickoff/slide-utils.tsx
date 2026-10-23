import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { InputStop } from "../../routeLayout";
import kf from "./kickoff.module.css";

export type SlideProps = { cls: string };
export type QRSlideProps = { cls: string; qrs: Record<string, string | null> };
export type ThemeRevealSlideProps = { cls: string; themeStep: number };
export type SlideEvent = {
  dow: string;
  day: string;
  mon: string;
  title: string;
  sub: string;
  medium: string;
  tagStyle: { background: string; color: string };
};

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function dowIndex(year: number, month: number, day: number): number {
  // Tomohiko Sakamoto — works for any Gregorian date, no Date() needed
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = month < 3 ? year - 1 : year;
  return (
    (y +
      Math.floor(y / 4) -
      Math.floor(y / 100) +
      Math.floor(y / 400) +
      t[month - 1] +
      day) %
    7
  );
}

function fmtTime(hour: number, min: number): string {
  const h = hour % 12 || 12;
  const m = min ? `:${String(min).padStart(2, "0")}` : ":00";
  return `${h}${m} ${hour >= 12 ? "pm" : "am"}`;
}

const MEDIUM_TAG: Record<
  string,
  { label: string; tagStyle: { background: string; color: string } }
> = {
  "in-person": {
    label: "In-Person",
    tagStyle: { background: "#1e6016", color: "#f5e6c2" },
  },
  virtual: {
    label: "Virtual",
    tagStyle: { background: "#f8edcc", color: "#20180c" },
  },
  hybrid: {
    label: "Hybrid",
    tagStyle: { background: "#5a3a18", color: "#f5e6c2" },
  },
};
const DEADLINE_TAG = {
  label: "Deadline",
  tagStyle: { background: "#f5c800", color: "#20180c" },
};

export function deriveSlideEvents(
  stops: InputStop[],
  exclude = ["kickoff", "showcase"],
): SlideEvent[] {
  return stops
    .filter(
      (s) => !exclude.some((term) => s.title.toLowerCase().includes(term)),
    )
    .map((s) => {
      const [datePart, timePart = "00:00"] = s.date.split("T");
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, min] = timePart.split(":").map(Number);

      const isDeadline = s.title.toLowerCase().includes("submission");
      const { label: medium, tagStyle } = isDeadline
        ? DEADLINE_TAG
        : (MEDIUM_TAG[s.medium ?? "in-person"] ?? MEDIUM_TAG["in-person"]);

      const sub = [s.location, fmtTime(hour, min)].filter(Boolean).join(" · ");

      return {
        dow: DOW[dowIndex(year, month, day)],
        day: String(day),
        mon: MON[month - 1],
        title: s.title,
        sub,
        medium,
        tagStyle,
      };
    });
}

export async function makeQR(
  data: string,
  size: number,
): Promise<string | null> {
  try {
    const mod = await import("qrcode-generator");
    const qrcode = mod.default as (
      t: number,
      ec: string,
    ) => {
      addData(s: string): void;
      make(): void;
      createDataURL(cellSize: number, margin: number): string;
    };
    const qr = qrcode(0, "M");
    qr.addData(data);
    qr.make();
    const cellSize = Math.max(3, Math.round(size / 33));
    return qr.createDataURL(cellSize, 1);
  } catch {
    return null;
  }
}

export function QRImg({ src, size }: { src: string | null; size: number }) {
  if (!src)
    return <div style={{ width: size, height: size, background: "#eee" }} />;
  return (
    // biome-ignore lint/performance/noImgElement: QR code requires pixelated rendering, Next.js Image overrides that
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}

export function Eyebrow({
  children,
  color = "var(--vc-rust)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--vc-font-stamp)",
        fontSize: "25px",
        letterSpacing: ".28em",
        textTransform: "uppercase" as const,
        color,
        display: "inline-flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <span style={{ width: "46px", height: "2px", background: color }} />
      {children}
    </div>
  );
}

// ── Shared slide navigation ───────────────────────────────────────

export function cardCls(
  i: number,
  current: number,
  swapping: boolean,
  outIdx: number,
  inIdx: number,
): string {
  if (swapping) {
    if (i === outIdx) return `${kf.kfCard} ${kf.kfIsOut}`;
    if (i === inIdx) return `${kf.kfCard} ${kf.kfIsIn}`;
    return kf.kfCard;
  }
  return `${kf.kfCard}${i === current ? ` ${kf.kfIsActive}` : ""}`;
}

/**
 * Manages scale-to-viewport, swap state, keyboard navigation, and the advance
 * function for a kiosk slide deck.
 *
 * @param total - total number of slides (can change across renders)
 * @param wrap  - whether advancing past the last slide wraps to the first
 * @param initialIdx - starting slide index (default 0)
 * @param onIntercept - called before each advance; return true to cancel it
 *   (e.g. to reveal a winner name instead of moving to the next slide)
 * @param extraKeys - handler for any keys beyond ArrowLeft / ArrowRight / Space
 * @param onStep - called with the destination index whenever a slide change starts
 * @param autoplaySec - when set, enables a paused-by-default autoplay timer that
 *   advances every N seconds (bypassing onIntercept)
 */
export function useSlideNav({
  total,
  wrap = false,
  initialIdx = 0,
  onIntercept,
  extraKeys,
  onStep,
  autoplaySec,
}: {
  total: number;
  wrap?: boolean;
  initialIdx?: number;
  onIntercept?: (dir: 1 | -1, cur: number) => boolean;
  extraKeys?: (e: KeyboardEvent) => void;
  onStep?: (next: number) => void;
  autoplaySec?: number;
}) {
  const [idx, setIdx] = useState(initialIdx);
  const [outIdx, setOutIdx] = useState(-1);
  const [inIdx, setInIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);
  const [scale, setScale] = useState(1);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);

  const swappingRef = useRef(false);
  const idxRef = useRef(initialIdx);
  const totalRef = useRef(total);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const reducedRef = useRef(false);
  const pausedRef = useRef(true);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const onInterceptRef = useRef(onIntercept);
  const extraKeysRef = useRef(extraKeys);
  const onStepRef = useRef(onStep);

  totalRef.current = total;
  pausedRef.current = paused;
  onInterceptRef.current = onIntercept;
  extraKeysRef.current = extraKeys;
  onStepRef.current = onStep;

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (swappingRef.current) return;
      const cur = idxRef.current;
      const total = totalRef.current;
      const next = wrap
        ? (((cur + dir) % total) + total) % total
        : Math.max(0, Math.min(total - 1, cur + dir));
      if (next === cur) return;

      elapsedRef.current = 0;
      lastRef.current = performance.now();

      swappingRef.current = true;
      setSwapping(true);
      setOutIdx(cur);
      setInIdx(next);
      setIdx(next);
      setProgress(0);
      onStepRef.current?.(next);

      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      const dur = reducedRef.current ? 60 : 500;
      swapTimerRef.current = setTimeout(() => {
        swappingRef.current = false;
        setSwapping(false);
        setOutIdx(-1);
        setInIdx(-1);
        lastRef.current = performance.now();
      }, dur);
    },
    [wrap],
  );

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (swappingRef.current) return;
      if (onInterceptRef.current?.(dir, idxRef.current)) {
        elapsedRef.current = 0;
        return;
      }
      step(dir);
    },
    [step],
  );

  useEffect(() => {
    if (!autoplaySec) return;
    lastRef.current = performance.now();
    const tick = setInterval(() => {
      if (pausedRef.current || swappingRef.current) {
        lastRef.current = performance.now();
        return;
      }
      const now = performance.now();
      elapsedRef.current += now - lastRef.current;
      lastRef.current = now;
      const dur = autoplaySec * 1000;
      if (elapsedRef.current >= dur) step(1);
      else setProgress(Math.min(1, elapsedRef.current / dur));
    }, 80);
    return () => clearInterval(tick);
  }, [autoplaySec, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") advance(1);
      else if (e.key === "ArrowLeft") advance(-1);
      else extraKeysRef.current?.(e);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const onPrev = useCallback(() => advance(-1), [advance]);
  const onNext = useCallback(() => advance(1), [advance]);
  const onTogglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPaused((p) => !p);
  }, []);

  return {
    idx,
    outIdx,
    inIdx,
    swapping,
    scale,
    advance,
    onPrev,
    onNext,
    paused,
    progress,
    onTogglePause,
  };
}
