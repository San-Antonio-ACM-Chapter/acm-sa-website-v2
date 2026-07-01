import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import type { SlideProps } from "../slide-utils";

export function Giveaway({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-ink)" }}>
      <svg width="520" height="520" viewBox="0 0 200 200"
        style={{ position: "absolute", top: "-150px", right: "-120px", overflow: "visible", opacity: 0.5 }}
        aria-hidden="true">
        <circle className={slides.sun} cx="100" cy="100" r="74"
          fill="none" stroke="#f0a830" strokeWidth="30" strokeDasharray="5 27" />
        <circle cx="100" cy="100" r="46" fill="#f5c800" stroke="#20180c" strokeWidth="4" />
      </svg>
      <div className={kf.kfStagger} style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "30px", textAlign: "center", padding: "0 140px",
      }}>
        <div style={{
          fontFamily: "var(--vc-font-stamp)", fontSize: "25px", letterSpacing: ".3em",
          textTransform: "uppercase", color: "var(--vc-mustard)",
          border: "2.5px dashed var(--vc-mustard)", padding: "11px 26px", transform: "rotate(-.6deg)",
        }}>
          Intermission · see who wins
        </div>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "130px", lineHeight: ".84", color: "var(--vc-cream)", textShadow: "6px 6px 0 #8c3914" }}>
          LIVE{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-mustard)" }}>GIVEAWAY.</span>
        </div>
        <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "34px", lineHeight: "1.5", color: "var(--vc-paper)", maxWidth: "60%" }}>
          We&apos;re drawing a winner right now for our Instagram giveaway.
        </div>
        {/* <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "34px", color: "#f5e6c299", transform: "rotate(-1deg)" }}>
          (presenter: switch to the draw tool, then come back)
        </div> */}
      </div>
    </div>
  );
}
