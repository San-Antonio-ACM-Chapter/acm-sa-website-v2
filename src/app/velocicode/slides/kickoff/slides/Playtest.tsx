import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

export function Playtest({ cls }: SlideProps) {
  return (
    <div className={cls} style={{ background: "var(--vc-ink)" }}>
      <div
        className={kf.kfStagger}
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "80px",
          padding: "0 130px 70px",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "26px",
          }}
        >
          <Eyebrow color="var(--vc-mustard)">Route stop · Thu Jul 17</Eyebrow>
          <div
            style={{
              fontFamily: "var(--vc-font-display-1)",
              fontSize: "104px",
              lineHeight: ".86",
              color: "var(--vc-cream)",
            }}
          >
            PLAYTEST{" "}
            <span
              style={{
                fontFamily: "var(--vc-font-display-2)",
                color: "var(--vc-mustard)",
              }}
            >
              NIGHT.
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--vc-font-mono)",
              fontSize: "32px",
              lineHeight: "1.6",
              color: "var(--vc-paper)",
            }}
          >
            Halfway-point hang with the{" "}
            <strong style={{ color: "var(--vc-mustard)" }}>
              Alamo Tech Collective
            </strong>
            . Bring a build, break someone else&apos;s, explore good ideas, win
            some prizes.
          </div>
          <div
            style={{
              fontFamily: "var(--vc-font-hand)",
              fontSize: "42px",
              color: "var(--vc-mustard)",
              transform: "rotate(-1.5deg)",
            }}
          >
            no working build? come anyway.
          </div>
        </div>
        <div
          style={{
            flex: "0 0 auto",
            background: "var(--vc-paper)",
            border: "2.5px solid var(--vc-ink)",
            boxShadow: "9px 9px 0 #000",
            padding: "18px 18px 26px",
            transform: "rotate(-2.5deg)",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-14px",
              left: "50%",
              transform: "translateX(-50%) rotate(3deg)",
              width: "130px",
              height: "30px",
              background: "rgba(245,200,0,.75)",
              border: "1px solid rgba(32,24,12,.3)",
            }}
          />
          {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
          <img
            src="/velocicode/social-25-01.jpeg"
            alt="Playtest night"
            style={{
              width: "430px",
              height: "320px",
              objectFit: "cover",
              display: "block",
            }}
          />
          <div
            style={{
              fontFamily: "var(--vc-font-hand)",
              fontSize: "30px",
              color: "var(--vc-ink)",
              textAlign: "center",
              marginTop: "12px",
            }}
          >
            playtest night ✶
          </div>
        </div>
      </div>
    </div>
  );
}
