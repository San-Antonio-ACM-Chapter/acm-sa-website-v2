import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import type { QRSlideProps } from "../slide-utils";
import { Eyebrow, QRImg } from "../slide-utils";

export function Month({ cls, qrs }: QRSlideProps) {
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
        src="/velocicode/fern.svg"
        alt=""
        style={{
          position: "absolute",
          right: "-60px",
          bottom: "-50px",
          width: "380px",
          opacity: 0.5,
          transform: "scaleX(-1) rotate(-8deg)",
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
        <Eyebrow>All month long</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "104px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          IT DOESN&apos;T STOP{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            {" "}
            TONIGHT.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "34px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "66%",
          }}
        >
          Workshops, co-working nights, and drop-ins run all the way through
          July. Hit them all or just the ones you can.
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            marginTop: "14px",
          }}
        >
          <div
            className={slides.scan}
            style={{
              padding: "20px",
              background: "#fff",
              border: "3px solid #20180c",
            }}
          >
            <QRImg src={qrs.site ?? null} size={220} />
          </div>
          <div
            style={{
              fontFamily: "var(--vc-font-hand)",
              fontSize: "46px",
              color: "var(--vc-clay)",
              transform: "rotate(-1.5deg)",
            }}
          >
            full calendar&apos;s on the site →
          </div>
        </div>
      </div>
    </div>
  );
}
