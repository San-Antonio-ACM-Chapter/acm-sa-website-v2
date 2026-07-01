import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

export function Numbers({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={kf.kfStagger} style={{
        height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "30px", padding: "0 130px 80px",
      }}>
        <Eyebrow>Expedition 01 · field report</Eyebrow>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "104px", lineHeight: ".86", color: "var(--vc-ink)" }}>
          OUR{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-rust)" }}>1ST YEAR.</span>
        </div>
        <div style={{ display: "flex", gap: "48px", alignItems: "stretch", marginTop: "6px" }}>
          <div style={{ display: "flex", gap: "34px", flex: 1 }}>
            {[
              { n: "39", label: "Jammers",        rotate: "-1deg" },
              { n: "5",  label: "Games shipped",  rotate: "1deg" },
              { n: "24", label: "Showcase guests", rotate: "-.6deg" },
            ].map(({ n, label, rotate }) => (
              <div key={label} style={{
                flex: 1, background: "var(--vc-paper)", border: "2.5px solid var(--vc-ink)",
                boxShadow: "6px 6px 0 var(--vc-ink)", padding: "36px 30px",
                display: "flex", flexDirection: "column", gap: "12px", transform: `rotate(${rotate})`,
              }}>
                <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "108px", lineHeight: ".85", color: "var(--vc-leaf-deep)" }}>{n}</div>
                <div style={{ fontFamily: "var(--vc-font-stamp)", fontSize: "23px", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--vc-rust)" }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{
            flex: "0 0 auto", background: "var(--vc-paper)", border: "2.5px solid var(--vc-ink)",
            boxShadow: "8px 8px 0 #5a3a18", padding: "18px 18px 26px",
            transform: "rotate(2.5deg)", position: "relative",
          }}>
            <div style={{
              position: "absolute", top: "-14px", left: "50%",
              transform: "translateX(-50%) rotate(-4deg)",
              width: "120px", height: "30px", background: "rgba(245,200,0,.75)",
              border: "1px solid rgba(32,24,12,.3)",
            }} />
            <div style={{
              width: "330px", height: "248px", background: "var(--vc-sand)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--vc-font-stamp)", fontSize: "18px",
              letterSpacing: ".1em", color: "rgba(32,24,12,.4)", textTransform: "uppercase",
            }}>
              year 1 photo
            </div>
            <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "30px", color: "var(--vc-ink)", textAlign: "center", marginTop: "12px" }}>
              expedition 01 crew ✶
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
