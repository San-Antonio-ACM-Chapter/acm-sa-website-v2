import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

export function Showcase({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-leaf-deep)" }}>
      <img src="/velocicode/palm-tree.svg" alt=""
        style={{ position: "absolute", right: "-50px", top: "30px", width: "400px", opacity: 0.16 }} />
      <div className={kf.kfStagger} style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", alignItems: "center", gap: "80px", padding: "0 130px 70px",
      }}>
        <div style={{
          flex: "0 0 auto", background: "var(--vc-paper)", border: "2.5px solid var(--vc-ink)",
          boxShadow: "9px 9px 0 #0d3a08", padding: "18px 18px 26px",
          transform: "rotate(2.5deg)", position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "-14px", left: "50%",
            transform: "translateX(-50%) rotate(-4deg)",
            width: "130px", height: "30px", background: "rgba(245,200,0,.75)",
            border: "1px solid rgba(32,24,12,.3)",
          }} />
          <img src="/velocicode/event-photo-25-02.jpeg" alt="The big show"
            style={{ width: "430px", height: "320px", objectFit: "cover", display: "block" }} />
          <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "30px", color: "var(--vc-ink)", textAlign: "center", marginTop: "12px" }}>
            the big show ✶
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "26px" }}>
          <Eyebrow color="var(--vc-mustard)">Route stop · Fri Aug 1</Eyebrow>
          <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "104px", lineHeight: ".86", color: "var(--vc-mustard)" }}>
            THE{" "}
            <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-leaf-far)" }}>SHOWCASE.</span>
          </div>
          <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "32px", lineHeight: "1.6", color: "var(--vc-paper)" }}>
            Science-fair style, open to the public. Find your table, show how it works, watch them play the thing you made.
          </div>
          <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "42px", color: "var(--vc-leaf-far)", transform: "rotate(-1.5deg)" }}>
            this is where prizes get handed out.
          </div>
        </div>
      </div>
    </div>
  );
}
