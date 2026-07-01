import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

export function Welcome({ cls }: SlideProps) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-paper)",
        backgroundImage:
          "repeating-linear-gradient(180deg,transparent 0 47px,rgba(90,58,24,.06) 47px 48px)",
      }}
    >
      <div
        className={kf.kfStagger}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "30px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Field journal · entry 01</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "128px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          HELLO,{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            FRIEND.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "34px",
            lineHeight: "1.55",
            color: "var(--vc-ink)",
            maxWidth: "74%",
          }}
        >
          {"You're at "}
          <strong style={{ color: "var(--vc-rust)" }}>VelociCode</strong>
          {"! San Antonio's month-long game jam, run by "}
          <strong style={{ color: "var(--vc-rust)" }}>ACM San Antonio</strong>
          {" & the "}
          <strong style={{ color: "var(--vc-rust)" }}>
            Greater Gaming Society
          </strong>
          {"."}
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "64px",
            color: "var(--vc-clay)",
            transform: "rotate(-1.5deg)",
          }}
        >
          One month. One game. No excuses.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "25px",
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "var(--vc-ink)",
            background: "var(--vc-mustard)",
            border: "2.5px solid var(--vc-ink)",
            boxShadow: "5px 5px 0 var(--vc-ink)",
            padding: "16px 26px",
            alignSelf: "flex-start",
            transform: "rotate(-.5deg)",
          }}
        >
          Beginners, artists, audio folks, designers — all welcome.
        </div>
      </div>
    </div>
  );
}
