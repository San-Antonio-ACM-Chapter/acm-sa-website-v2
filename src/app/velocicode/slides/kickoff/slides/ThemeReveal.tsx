import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import type { ThemeRevealSlideProps } from "../slide-utils";

export function ThemeReveal({ cls, themeStep }: ThemeRevealSlideProps) {
  const stepCls = [
    kf.trStage,
    [kf.trStep0, kf.trStep1, kf.trStep2, kf.trStep3][themeStep],
  ].join(" ");

  return (
    <div className={cls} style={{
      background: "var(--vc-leaf-deep)",
      backgroundImage: "repeating-linear-gradient(45deg,#0d3a08 0 2px,transparent 2px 30px)",
    }}>
      <svg width="640" height="640" viewBox="0 0 200 200"
        style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", overflow: "visible", opacity: 0.9 }}
        aria-hidden="true">
        <circle className={slides.sun} cx="100" cy="100" r="74"
          fill="none" stroke="#f0a830" strokeWidth="30" strokeDasharray="5 27" />
        <circle cx="100" cy="100" r="46" fill="#f5c800" stroke="#20180c" strokeWidth="4" />
      </svg>

      <div className={stepCls}>
        <div className={kf.trMeter}>
          Excavation
          <i /><i /><i />
        </div>

        <div className={kf.trIntro}>
          <div style={{
            fontFamily: "var(--vc-font-stamp)", fontSize: "30px", letterSpacing: ".34em",
            textTransform: "uppercase", color: "var(--vc-mustard)", background: "#0d3a08bf",
            border: "2.5px dashed var(--vc-mustard)", padding: "13px 30px", transform: "rotate(-.6deg)",
          }}>
            ★&nbsp;&nbsp;X marks the spot&nbsp;&nbsp;★
          </div>
          <div style={{ fontFamily: "var(--vc-font-display-2)", fontSize: "64px", color: "var(--vc-cream)", transform: "rotate(-1deg)" }}>
            The theme is buried out here.
          </div>
        </div>

        <div className={kf.trMid}>
          <svg className={kf.trBurst} viewBox="0 0 200 200" aria-hidden="true">
            <g fill="#c44d24">
              <polygon points="100,0 112,100 88,100" />
              <polygon points="100,200 112,100 88,100" />
              <polygon points="0,100 100,112 100,88" />
              <polygon points="200,100 100,112 100,88" />
              <polygon points="29,29 100,100 50,108" />
              <polygon points="171,29 100,100 150,108" />
              <polygon points="29,171 100,100 108,150" />
              <polygon points="171,171 100,100 92,150" />
            </g>
          </svg>

          <div className={kf.trDig}>
            <div className={kf.trMound}>
              <div className={kf.trQmark}>?</div>
            </div>
          </div>

          <div className={kf.trReveal}>
            <div className={kf.trSlab}>
              <img src="/velocicode/theme-fossil.png" alt="ammonite fossil" />
            </div>
            <div className={kf.trWord}>FOSSIL</div>
          </div>

          <div className={kf.trDust}>
            <i style={{ position: "absolute", left: "20%", top: "55%", width: "14px", height: "14px", borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "34%", top: "42%", width: "9px",  height: "9px",  borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "48%", top: "60%", width: "18px", height: "18px", borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "60%", top: "46%", width: "11px", height: "11px", borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "72%", top: "58%", width: "15px", height: "15px", borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "42%", top: "50%", width: "8px",  height: "8px",  borderRadius: "50%", background: "#caa15f" }} />
            <i style={{ position: "absolute", left: "80%", top: "50%", width: "10px", height: "10px", borderRadius: "50%", background: "#caa15f" }} />
          </div>
        </div>

        <div className={kf.trFinal}>now go make something weird with it.</div>

        <div className={kf.trPrompts}>
          {themeStep === 0 && <div className={kf.trPrompt}>▸ click to start the dig</div>}
          {themeStep === 1 && <div className={kf.trPrompt}>▸ keep brushing…</div>}
          {themeStep === 2 && <div className={kf.trPrompt}>▸ almost there — one more</div>}
        </div>
      </div>
    </div>
  );
}
