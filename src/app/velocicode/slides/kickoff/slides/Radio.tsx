import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import { Eyebrow, QRImg } from "../slide-utils";
import type { QRSlideProps } from "../slide-utils";

const QR_ITEMS = [
  { key: "discord", label: "Discord", sub: "find your team ↗" },
  { key: "itch", label: "itch.io jam", sub: "submit your game ↗" },
  { key: "site", label: "acmsa.org", sub: "the whole route ↗" },
];

export function Radio({ cls, qrs }: QRSlideProps) {
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
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "96px 120px 130px",
        }}
      >
        <Eyebrow>Field channels · scan in</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "104px",
            lineHeight: ".9",
            color: "var(--vc-ink)",
            marginTop: "18px",
          }}
        >
          GET ON THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            RADIO.
          </span>
        </div>
        <div
          className={kf.kfStagger}
          style={{
            display: "flex",
            gap: "96px",
            justifyContent: "center",
            alignItems: "flex-start",
            marginTop: "auto",
            paddingTop: "30px",
          }}
        >
          {QR_ITEMS.map(({ key, label, sub }) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "24px",
              }}
            >
              <div
                className={slides.scan}
                style={{
                  padding: "24px",
                  background: "#fff",
                  border: "3px solid #20180c",
                }}
              >
                <QRImg src={qrs[key] ?? null} size={300} />
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "38px",
                  color: "var(--vc-ink)",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "23px",
                  color: "var(--vc-rust)",
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
