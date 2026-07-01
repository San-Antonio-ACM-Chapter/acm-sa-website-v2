import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import type { SlideProps } from "../slide-utils";

export function Title({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "linear-gradient(180deg,#f7d289 0%,#f5e6c2 54%,#ecd197 100%)" }}>
      <svg width="540" height="540" viewBox="0 0 200 200"
        style={{ position: "absolute", top: "-160px", right: "-130px", overflow: "visible" }} aria-hidden="true">
        <circle className={slides.sun} cx="100" cy="100" r="74"
          fill="none" stroke="#f0a830" strokeWidth="30" strokeDasharray="5 27" />
        <circle cx="100" cy="100" r="46" fill="#f5c800" stroke="#20180c" strokeWidth="4" />
      </svg>
      <img src="/velocicode/fern.svg" alt=""
        style={{ position: "absolute", left: "-50px", bottom: "-40px", width: "380px", opacity: 0.92, transform: "rotate(6deg)" }} />
      <img src="/velocicode/palm-tree.svg" alt=""
        style={{ position: "absolute", right: "-40px", bottom: "60px", width: "300px", opacity: 0.85, transform: "scaleX(-1) rotate(8deg)" }} />
      <img src="/velocicode-logo.png" alt=""
        style={{ position: "absolute", right: "150px", bottom: "118px", width: "280px", transform: "rotate(-3deg)", filter: "drop-shadow(8px 10px 0 rgba(32,24,12,.18))" }} />
      <svg width="150" height="150" viewBox="0 0 150 150"
        style={{ position: "absolute", left: "96px", bottom: "148px" }} aria-hidden="true">
        <circle cx="75" cy="75" r="66" fill="#f8edcceb" stroke="#20180c" strokeWidth="4" />
        <circle cx="75" cy="75" r="58" fill="none" stroke="#20180c" strokeWidth="1" strokeDasharray="2 10" />
        <text x="75" y="27" textAnchor="middle" fontFamily="Special Elite" fontSize="17" fill="#8c3914">N</text>
        <g className={slides.needle}>
          <polygon points="75,30 84,75 75,82 66,75" fill="#c44d24" stroke="#20180c" strokeWidth="2" />
          <polygon points="75,120 84,75 75,68 66,75" fill="#1e6016" stroke="#20180c" strokeWidth="2" />
        </g>
        <circle cx="75" cy="75" r="6" fill="#20180c" />
      </svg>
      <div className={kf.kfStagger} style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", gap: "30px", textAlign: "center", padding: "0 120px",
      }}>
        <div style={{
          fontFamily: "var(--vc-font-stamp)", fontSize: "27px", letterSpacing: ".3em",
          textTransform: "uppercase", color: "var(--vc-rust)", background: "#f8edccbf",
          border: "2.5px dashed var(--vc-rust)", padding: "11px 26px", transform: "rotate(-.6deg)",
        }}>
          ★&nbsp;&nbsp;Velocicode · Expedition 02&nbsp;&nbsp;★
        </div>
        <div style={{
          fontFamily: "var(--vc-font-display-1)", fontSize: "228px", lineHeight: ".78",
          color: "var(--vc-leaf-deep)", textShadow: "6px 6px 0 #f5c800,13px 13px 0 #20180c",
          transform: "rotate(-1.5deg)",
        }}>
          KICKOFF
        </div>
        <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "58px", color: "var(--vc-clay)", transform: "rotate(-1.5deg)" }}>
          + the theme reveal.
        </div>
        <div style={{
          display: "inline-flex", gap: "34px", alignItems: "center",
          background: "var(--vc-ink)", color: "var(--vc-cream)",
          padding: "20px 44px", fontFamily: "var(--vc-font-stamp)",
          fontSize: "33px", letterSpacing: ".13em", textTransform: "uppercase",
          border: "2.5px solid #000", boxShadow: "8px 8px 0 #5a3a18",
        }}>
          <span><span style={{ color: "var(--vc-mustard)" }}>Wed Jul 1, 2026</span> · 7:00 pm</span>
          <span style={{ color: "#f5e6c24d" }}>✦</span>
          <span>📍 Geekdom 3rd Floor</span>
        </div>
      </div>
    </div>
  );
}
