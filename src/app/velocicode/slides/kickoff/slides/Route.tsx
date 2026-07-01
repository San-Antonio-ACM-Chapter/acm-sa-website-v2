import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

const STOPS = [
  { date: "Wed Jul 1",  label: "Kickoff",           dot: "var(--vc-clay)",    rotate: "-1.2deg", dark: false },
  { date: "Thu Jul 17", label: "Playtest Night",    dot: "#3d8c28",           rotate: "1deg",    dark: false },
  { date: "Wed Jul 30", label: "Submissions close", dot: "#3d8c28",           rotate: "-1deg",   dark: false },
  { date: "Fri Aug 1",  label: "The Showcase",      dot: "var(--vc-mustard)", rotate: "1.2deg",  dark: true  },
];

export function Route({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.1 }} />
      <div className={kf.kfStagger} style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "34px", padding: "0 120px 80px",
      }}>
        <Eyebrow>Expedition itinerary</Eyebrow>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "104px", lineHeight: ".86", color: "var(--vc-ink)" }}>
          THE{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>ROUTE.</span>
        </div>
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "30px", padding: "0 20px" }}>
          <svg viewBox="0 0 1600 60" preserveAspectRatio="none"
            style={{ position: "absolute", top: "34px", left: 0, width: "100%", height: "60px", zIndex: 0 }}>
            <path d="M40 30 Q 400 -10 800 30 T 1560 30" fill="none" stroke="#c44d24"
              strokeWidth="4" strokeDasharray="6 14" strokeLinecap="round" />
          </svg>
          {STOPS.map(({ date, label, dot, rotate, dark }) => (
            <div key={date} style={{
              position: "relative", zIndex: 1, flex: 1,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "18px",
            }}>
              <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: dot, border: "3px solid var(--vc-ink)" }} />
              <div style={{
                background: dark ? "var(--vc-ink)" : "var(--vc-paper)",
                border: "2.5px solid var(--vc-ink)", boxShadow: "7px 7px 0 #5a3a18",
                padding: "24px 22px", textAlign: "center", transform: `rotate(${rotate})`,
                minWidth: "230px", whiteSpace: "nowrap",
              }}>
                <div style={{ fontFamily: "var(--vc-font-stamp)", fontSize: "22px", letterSpacing: ".12em", textTransform: "uppercase", color: dark ? "var(--vc-mustard)" : "var(--vc-rust)" }}>{date}</div>
                <div style={{ fontFamily: "var(--vc-font-display-3)", fontSize: "34px", color: dark ? "var(--vc-paper)" : "var(--vc-ink)", marginTop: "6px" }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
