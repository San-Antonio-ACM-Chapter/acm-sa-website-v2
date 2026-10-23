import { COMMUNITY_PARTNERS, SPONSORS } from "../allies";
import kf from "./kickoff/kickoff.module.css";
import { Eyebrow, QRImg } from "./kickoff/slide-utils";
import slides from "./slides.module.css";

export function VelociCodeSlide({ cls }: { cls: string }) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.08 }} />
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode-logo.png"
        alt=""
        style={{
          position: "absolute",
          right: "120px",
          bottom: "100px",
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>By the way</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "112px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          WHAT IS{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            VELOCICODE?
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "54%",
          }}
        >
          {
            "San Antonio's month-long game jam. July 1–30. Make a game, compete for prizes, and connect with the local dev community."
          }
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "58px",
            color: "var(--vc-clay)",
            transform: "rotate(-1.5deg)",
          }}
        >
          One month. One game. No excuses.
        </div>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            background: "var(--vc-ink)",
            color: "var(--vc-mustard)",
            padding: "14px 26px",
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "24px",
            letterSpacing: ".14em",
            textTransform: "uppercase",
            border: "2px solid var(--vc-ink)",
            alignSelf: "flex-start",
          }}
        >
          acmsa.org/velocicode
        </div>
      </div>
    </div>
  );
}

export function SponsorsSlide({ cls }: { cls: string }) {
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
          alignItems: "center",
          gap: "18px",
          padding: "40px 120px 100px",
          textAlign: "center",
        }}
      >
        <Eyebrow>Outfitted by</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "104px",
            lineHeight: ".9",
            color: "var(--vc-ink)",
          }}
        >
          THANK YOU,{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-rust)",
            }}
          >
            SPONSORS.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "48px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {SPONSORS.map((s, i) => (
            <div
              key={s.name}
              className={slides.float}
              style={{
                background: "var(--vc-paper)",
                border: "4px solid #20180c",
                borderRadius: "22px",
                padding: "46px 56px",
                boxShadow: "7px 7px 0 #20180c",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "320px",
                height: "200px",
                transform:
                  i % 3 === 0
                    ? "rotate(-2deg)"
                    : i % 3 === 1
                      ? "rotate(1.4deg)"
                      : "rotate(-1deg)",
                animationDelay: `${i * 0.55}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "12px",
                  border: "2px dashed rgba(32,24,12,.5)",
                  borderRadius: "14px",
                }}
              />
              {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
              <img
                src={s.src}
                alt={s.name}
                style={{
                  maxWidth: "220px",
                  maxHeight: "100px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CommunityPartnersSlide({ cls }: { cls: string }) {
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
          alignItems: "center",
          gap: "18px",
          padding: "40px 120px 100px",
          textAlign: "center",
        }}
      >
        <Eyebrow>Made possible by</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "80px",
            lineHeight: ".9",
            color: "var(--vc-ink)",
          }}
        >
          THANK YOU,{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            COMMUNITY PARTNERS.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "36px",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: "28px",
          }}
        >
          {COMMUNITY_PARTNERS.map((p, i) => (
            <div
              key={p.name}
              className={slides.float}
              style={{
                background: "var(--vc-paper)",
                border: "3.5px solid #20180c",
                borderRadius: "18px",
                padding: "36px 44px",
                boxShadow: "6px 6px 0 #20180c",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "14px",
                minWidth: "230px",
                height: "180px",
                transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1.2deg)",
                animationDelay: `${i * 0.4}s`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  border: "1.5px dashed rgba(32,24,12,.4)",
                  borderRadius: "11px",
                }}
              />
              {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
              <img
                src={p.src}
                alt={p.name}
                style={{
                  maxWidth: "160px",
                  maxHeight: "72px",
                  objectFit: "contain",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClosingSlide({
  cls,
  qrs,
}: {
  cls: string;
  qrs: Record<string, string | null>;
}) {
  return (
    <div
      className={cls}
      style={{
        background:
          "linear-gradient(180deg,#f7d289 0%,#f5e6c2 48%,#5ab348 100%)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode/fern.svg"
        alt=""
        style={{
          position: "absolute",
          left: "-50px",
          bottom: "-40px",
          width: "340px",
          opacity: 0.85,
          transform: "rotate(6deg)",
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
          gap: "24px",
          padding: "0 130px 80px",
        }}
      >
        <Eyebrow>Go build &middot; keep coding</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "148px",
            lineHeight: ".82",
            color: "var(--vc-leaf-deep)",
            textShadow: "5px 5px 0 #f5c800, 11px 11px 0 #20180c",
            transform: "rotate(-1.5deg)",
          }}
        >
          THANKS FOR COMING.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "29px",
            lineHeight: "1.55",
            color: "var(--vc-ink)",
            maxWidth: "820px",
          }}
        >
          Join our Discord to find teammates, get feedback, and stay in the loop
          for every event this month.
        </div>
        <div
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "10px",
          }}
        >
          {[
            { key: "discord", label: "Discord", sub: "find your team ↗" },
            {
              key: "site",
              label: "acmsa.org/velocicode",
              sub: "full calendar ↗",
            },
          ].map(({ key, label, sub }) => (
            <div
              key={key}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                className={slides.scan}
                style={{
                  padding: "18px",
                  background: "#fff",
                  border: "3px solid #20180c",
                }}
              >
                <QRImg src={qrs[key] ?? null} size={210} />
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "20px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  color: "var(--vc-ink)",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "17px",
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
