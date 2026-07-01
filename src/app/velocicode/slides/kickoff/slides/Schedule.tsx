import slides from "../../slides.module.css";
import { STOPS } from "../../../events";
import { Eyebrow, deriveSlideEvents } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

const SLIDE_EVENTS = deriveSlideEvents(STOPS);

export function Schedule({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.08 }} />
      <div style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", padding: "56px 120px 94px",
      }}>
        <Eyebrow>Field itinerary · all month</Eyebrow>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "40px", margin: "12px 0 16px" }}>
          <div style={{ flex: 1, minWidth: 0, fontFamily: "var(--vc-font-display-1)", fontSize: "74px", lineHeight: ".9", color: "var(--vc-ink)", whiteSpace: "nowrap" }}>
            EVERYTHING{" "}
            <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>IN BETWEEN.</span>
          </div>
          <div style={{ flex: "none", fontFamily: "var(--vc-font-hand)", fontSize: "26px", lineHeight: "1.05", color: "var(--vc-rust)", transform: "rotate(-1.5deg)", maxWidth: "300px", textAlign: "right" }}>
            the milestones get their own slides — here&apos;s the rest of july.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {SLIDE_EVENTS.map((ev) => (
            <div key={ev.title} style={{ display: "flex", alignItems: "center", gap: "26px", padding: "11px 0", borderBottom: "2px dashed rgba(140,57,20,.32)" }}>
              <div style={{
                flex: "none", width: "122px", textAlign: "center",
                background: "var(--vc-paper)", border: "2.5px solid var(--vc-ink)",
                boxShadow: "4px 4px 0 var(--vc-ink)", padding: "7px 6px", transform: "rotate(-1.5deg)",
              }}>
                <div style={{ fontFamily: "var(--vc-font-stamp)", fontSize: "17px", letterSpacing: ".12em", color: "var(--vc-rust)" }}>{ev.dow}</div>
                <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "34px", lineHeight: ".9", color: "var(--vc-leaf-deep)" }}>{ev.day}</div>
                <div style={{ fontFamily: "var(--vc-font-stamp)", fontSize: "16px", letterSpacing: ".14em", color: "var(--vc-ink)" }}>{ev.mon}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "var(--vc-font-display-3)", fontSize: "32px", lineHeight: "1.04", color: "var(--vc-ink)" }}>{ev.title}</div>
                <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "21px", color: "var(--vc-rust)", marginTop: "3px" }}>{ev.sub}</div>
              </div>
              <div style={{ flex: "none", fontFamily: "var(--vc-font-stamp)", fontSize: "17px", letterSpacing: ".12em", textTransform: "uppercase", border: "2px solid var(--vc-ink)", padding: "7px 13px", ...ev.tagStyle }}>
                {ev.medium}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
