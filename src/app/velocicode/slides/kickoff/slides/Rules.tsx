import type { ReactNode } from "react";
import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

export function Rules({ cls }: SlideProps) {
  const items: { n: string; text: ReactNode }[] = [
    { n: "01", text: <>Solo, or teams of up to <strong style={{ color: "var(--vc-rust)" }}>4</strong>.</> },
    { n: "02", text: "Any medium — an engine, a tabletop game, whatever you want to build." },
    { n: "03", text: <>Build window: <strong style={{ color: "var(--vc-rust)" }}>July 1 → July 30</strong>.</> },
    { n: "04", text: <>AI assisted is <strong style={{ color: "var(--vc-rust)" }}>fine</strong>. AI developed is <strong style={{ color: "var(--vc-rust)" }}>not</strong>.</> },
    { n: "05", text: <>Show up to the <strong style={{ color: "var(--vc-rust)" }}>Aug 1 showcase</strong> to be prize-eligible.</> },
  ];

  return (
    <div className={cls} style={{
      background: "var(--vc-cream)",
      backgroundImage: "repeating-linear-gradient(180deg,transparent 0 47px,rgba(90,58,24,.06) 47px 48px)",
    }}>
      <div style={{ position: "absolute", top: 0, bottom: 0, left: "118px", width: "2px", background: "color-mix(in srgb, var(--vc-clay) 45%, transparent)" }} />
      <div className={kf.kfStagger} style={{
        height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "26px", padding: "0 130px 80px 160px",
      }}>
        <Eyebrow>How the jam works</Eyebrow>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "100px", lineHeight: ".86", color: "var(--vc-ink)" }}>
          THE{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>RULES.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", marginTop: "4px" }}>
          {items.map(({ n, text }, i) => (
            <div key={n} style={{ display: "flex", alignItems: "baseline", gap: "30px" }}>
              <span style={{
                fontFamily: "var(--vc-font-display-1)", fontSize: "64px",
                color: i === 4 ? "var(--vc-clay)" : "var(--vc-leaf-deep)",
                lineHeight: ".9", width: "96px", flex: "none",
              }}>{n}</span>
              <span style={{ fontFamily: "var(--vc-font-mono)", fontSize: "33px", lineHeight: "1.4", color: "var(--vc-ink)" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
