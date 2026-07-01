import kf from "../kickoff.module.css";
import { Eyebrow, QRImg } from "../slide-utils";
import type { QRSlideProps } from "../slide-utils";

export function CoC({ cls, qrs }: QRSlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-rust)" }}>
      <div className={kf.kfStagger} style={{
        height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "28px", padding: "0 140px 80px",
      }}>
        <Eyebrow color="var(--vc-mustard)">Field rules · be excellent</Eyebrow>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "118px", lineHeight: ".86", color: "var(--vc-paper)" }}>
          BE KIND.{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-mustard)" }}>BUILD BOLD.</span>
        </div>
        <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "33px", lineHeight: "1.6", color: "var(--vc-paper)", maxWidth: "64%" }}>
          Respect every explorer from beginners, artists, audio folks, all of us.
          No overworking yourself, no jerks. The full code of conduct lives here.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "14px" }}>
          <div style={{
            fontFamily: "var(--vc-font-stamp)", fontSize: "29px", letterSpacing: ".06em",
            textTransform: "uppercase", color: "var(--vc-paper)",
            border: "2.5px solid var(--vc-paper)", boxShadow: "6px 6px 0 #20180c", padding: "18px 28px",
          }}>
            acmsa.org/code-of-conduct ↗
          </div>
          <div style={{ padding: "18px", background: "#fff", border: "3px solid #20180c", boxShadow: "5px 5px 0 #20180c" }}>
            <QRImg src={qrs.coc ?? null} size={180} />
          </div>
        </div>
      </div>
    </div>
  );
}
