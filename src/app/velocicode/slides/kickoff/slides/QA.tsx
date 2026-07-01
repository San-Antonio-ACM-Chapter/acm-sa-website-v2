import kf from "../kickoff.module.css";
import type { SlideProps } from "../slide-utils";
import { Eyebrow } from "../slide-utils";

export function QA({ cls }: SlideProps) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-cream)",
        backgroundImage:
          "repeating-linear-gradient(180deg,transparent 0 47px,rgba(90,58,24,.06) 47px 48px)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode-logo.png"
        alt=""
        style={{
          position: "absolute",
          right: "120px",
          bottom: "96px",
          width: "300px",
          transform: "rotate(-4deg)",
          filter: "drop-shadow(8px 10px 0 rgba(32,24,12,.18))",
        }}
      />
      <div
        className={kf.kfStagger}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "28px",
          padding: "0 140px 80px",
        }}
      >
        <Eyebrow>Open floor</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "150px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          QUESTIONS
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            ?
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "34px",
            lineHeight: "1.55",
            color: "var(--vc-ink)",
            maxWidth: "58%",
          }}
        >
          Ask us anything from rules, teams, the theme, snacks. Still have
          quesetions? Join the ACM SA Discord.
        </div>
      </div>
    </div>
  );
}
