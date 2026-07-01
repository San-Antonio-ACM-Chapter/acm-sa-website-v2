import type { ReactNode } from "react";
import type { InputStop } from "../../routeLayout";

export type SlideProps = { cls: string };
export type QRSlideProps = { cls: string; qrs: Record<string, string | null> };
export type ThemeRevealSlideProps = { cls: string; themeStep: number };
export type SlideEvent = {
  dow: string; day: string; mon: string;
  title: string; sub: string; medium: string;
  tagStyle: { background: string; color: string };
};

const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dowIndex(year: number, month: number, day: number): number {
  // Tomohiko Sakamoto — works for any Gregorian date, no Date() needed
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  const y = month < 3 ? year - 1 : year;
  return (y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) + t[month - 1] + day) % 7;
}

function fmtTime(hour: number, min: number): string {
  const h = hour % 12 || 12;
  const m = min ? `:${String(min).padStart(2, "0")}` : ":00";
  return `${h}${m} ${hour >= 12 ? "pm" : "am"}`;
}

const MEDIUM_TAG: Record<string, { label: string; tagStyle: { background: string; color: string } }> = {
  "in-person": { label: "In-Person", tagStyle: { background: "#1e6016", color: "#f5e6c2" } },
  "virtual":   { label: "Virtual",   tagStyle: { background: "#f8edcc", color: "#20180c" } },
  "hybrid":    { label: "Hybrid",    tagStyle: { background: "#5a3a18", color: "#f5e6c2" } },
};
const DEADLINE_TAG = { label: "Deadline", tagStyle: { background: "#f5c800", color: "#20180c" } };

export function deriveSlideEvents(stops: InputStop[]): SlideEvent[] {
  return stops
    .filter(s =>
      !s.title.toLowerCase().includes("kickoff") &&
      !s.title.toLowerCase().includes("showcase"),
    )
    .map(s => {
      const [datePart, timePart = "00:00"] = s.date.split("T");
      const [year, month, day] = datePart.split("-").map(Number);
      const [hour, min] = timePart.split(":").map(Number);

      const isDeadline = s.title.toLowerCase().includes("submission");
      const { label: medium, tagStyle } = isDeadline
        ? DEADLINE_TAG
        : (MEDIUM_TAG[s.medium ?? "in-person"] ?? MEDIUM_TAG["in-person"]);

      const sub = [s.location, fmtTime(hour, min)].filter(Boolean).join(" · ");

      return {
        dow:   DOW[dowIndex(year, month, day)],
        day:   String(day),
        mon:   MON[month - 1],
        title: s.title,
        sub,
        medium,
        tagStyle,
      };
    });
}

export async function makeQR(data: string, size: number): Promise<string | null> {
  try {
    const mod = await import("qrcode-generator");
    const qrcode = mod.default as (t: number, ec: string) => {
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
  if (!src) return <div style={{ width: size, height: size, background: "#eee" }} />;
  return <img src={src} width={size} height={size} alt="" style={{ display: "block", imageRendering: "pixelated" }} />;
}

export function Eyebrow({ children, color = "var(--vc-rust)" }: { children: ReactNode; color?: string }) {
  return (
    <div style={{
      fontFamily: "var(--vc-font-stamp)", fontSize: "25px",
      letterSpacing: ".28em", textTransform: "uppercase" as const, color,
      display: "inline-flex", alignItems: "center", gap: "16px",
    }}>
      <span style={{ width: "46px", height: "2px", background: color }} />
      {children}
    </div>
  );
}
