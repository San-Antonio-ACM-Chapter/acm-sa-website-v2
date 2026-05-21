// SVG viewBox dimensions for the route section
const VB_W = 1000;
const VB_H = 1280;

// Pin x positions (right / left sides)
const PIN_R = 520;
const PIN_L = 480;

// Bezier control point x positions — pulling opposite to direction of travel creates the S-curve
const CTRL_R = 820;
const CTRL_L = 180;

// Vertical extent of the path within the viewBox
const PATH_TOP = 77;
const PATH_BOTTOM = 1101;

// ─── Types ────────────────────────────────────────────────────

export type RouteSegment = [number, number, number, number, number, number]; // x0 y0 cx cy x1 y1

/** What a caller writes — no layout, no formatting, no arrows */
export type InputStop = {
  date: string;      // ISO local datetime: "2026-07-01T18:00"
  title: string;
  meta: string;
  cta: string;       // label only — arrow is auto-appended from external flag
  href: string;
  external: boolean;
};

/** Fully computed stop passed to RouteSection */
export type ComputedStop = {
  num: string;
  dateFormatted: string;
  dateIso: string;
  title: string;
  meta: string;
  cta: string;
  href: string;
  external: boolean;
  side: "R" | "L";
  cardTop: string;
  pinLeft: string;
  pinTop: string;
};

// ─── Date formatter ───────────────────────────────────────────

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatStopDate(iso: string): string {
  const [datePart, timePart = "00:00"] = iso.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const weekday = DAYS[new Date(year, month - 1, day).getDay()];
  const h12 = hour % 12 || 12;
  const period = hour >= 12 ? "pm" : "am";
  const timeStr =
    minute > 0
      ? `${h12}:${String(minute).padStart(2, "0")} ${period}`
      : `${h12} ${period}`;

  return `${weekday} · ${MONTHS[month - 1]} ${String(day).padStart(2, "0")} · ${timeStr}`;
}

// ─── Bezier math (also used by scroll animation) ──────────────

export function evalQuadBezier(t: number, [x0, y0, cx, cy, x1, y1]: RouteSegment): [number, number] {
  const mt = 1 - t;
  return [
    mt * mt * x0 + 2 * mt * t * cx + t * t * x1,
    mt * mt * y0 + 2 * mt * t * cy + t * t * y1,
  ];
}

/** Tangent angle in degrees; +90 because plane nose is at -Y by default */
export function tangentAngleDeg(t: number, [x0, y0, cx, cy, x1, y1]: RouteSegment): number {
  const dx = 2 * (1 - t) * (cx - x0) + 2 * t * (x1 - cx);
  const dy = 2 * (1 - t) * (cy - y0) + 2 * t * (y1 - cy);
  return Math.atan2(dy, dx) * (180 / Math.PI) + 90;
}

export function svgToPercent(x: number, y: number): [number, number] {
  return [(x / VB_W) * 100, (y / VB_H) * 100];
}

// ─── Layout builder ───────────────────────────────────────────

// 320px per gap keeps pin spacing consistent as stop count grows
const MIN_WRAP_HEIGHT = 1280;
const PX_PER_GAP = 320;

export function buildRouteLayout(inputs: InputStop[]): {
  stops: ComputedStop[];
  pathD: string;
  segments: RouteSegment[];
  wrapMinHeight: number;
  pathTopFrac: number;
  pathBottomFrac: number;
} {
  const n = inputs.length;

  // Evenly distribute pins vertically
  const pinYs = inputs.map((_, i) =>
    n === 1
      ? (PATH_TOP + PATH_BOTTOM) / 2
      : PATH_TOP + (i * (PATH_BOTTOM - PATH_TOP)) / (n - 1)
  );
  const pinXs = inputs.map((_, i) => (i % 2 === 0 ? PIN_R : PIN_L));

  // Build SVG path string and bezier segments simultaneously
  let pathD = `M ${pinXs[0]} ${Math.round(pinYs[0])}`;
  const segments: RouteSegment[] = [];

  for (let i = 0; i < n - 1; i++) {
    const ctrlX = pinXs[i] === PIN_R ? CTRL_R : CTRL_L;
    const midY = (pinYs[i] + pinYs[i + 1]) / 2;
    segments.push([pinXs[i], pinYs[i], ctrlX, midY, pinXs[i + 1], pinYs[i + 1]]);
    pathD += ` Q ${ctrlX} ${Math.round(midY)} ${pinXs[i + 1]} ${Math.round(pinYs[i + 1])}`;
  }

  // Build computed stops
  const stops: ComputedStop[] = inputs.map((input, i) => {
    const [pinLeftPct, pinTopPct] = svgToPercent(pinXs[i], pinYs[i]);
    // Subtract a fixed 40px so the pin always lands at the center of the stop-head
    // (badge + date row), regardless of container height.
    const cardTop = `calc(${pinTopPct.toFixed(1)}% - 40px)`;

    return {
      num: String(i + 1).padStart(2, "0"),
      dateFormatted: formatStopDate(input.date),
      dateIso: input.date,
      title: input.title,
      meta: input.meta,
      cta: input.cta,
      href: input.href,
      external: input.external,
      side: (i % 2 === 0 ? "R" : "L") as "R" | "L",
      pinLeft: `${pinLeftPct.toFixed(1)}%`,
      pinTop: `${pinTopPct.toFixed(1)}%`,
      cardTop,
    };
  });

  const wrapMinHeight = Math.max(MIN_WRAP_HEIGHT, (n - 1) * PX_PER_GAP);

  // Fractional vertical position of first and last pin within the wrap (used
  // by RouteSection to anchor the scroll-progress mapping to the actual path)
  const pathTopFrac = PATH_TOP / VB_H;
  const pathBottomFrac = PATH_BOTTOM / VB_H;

  return { stops, pathD, segments, wrapMinHeight, pathTopFrac, pathBottomFrac };
}
