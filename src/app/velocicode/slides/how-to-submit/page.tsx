"use client";

import {
  Bowlby_One_SC,
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { COMMUNITY_PARTNERS, SPONSORS } from "../../allies";
import kf from "../kickoff/kickoff.module.css";
import { Eyebrow, makeQR, QRImg } from "../kickoff/slide-utils";
import slides from "../slides.module.css";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const elite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const FONT_TRIGGER_CLASS = [
  luckiestGuy.className,
  rubikDirt.className,
  bowlby.className,
  caveat.className,
  elite.className,
  dmMono.className,
].join(" ");

const TOTAL = 19;

function cardCls(
  i: number,
  current: number,
  swapping: boolean,
  outIdx: number,
  inIdx: number,
): string {
  if (swapping) {
    if (i === outIdx) return `${kf.kfCard} ${kf.kfIsOut}`;
    if (i === inIdx) return `${kf.kfCard} ${kf.kfIsIn}`;
    return kf.kfCard;
  }
  return `${kf.kfCard}${i === current ? ` ${kf.kfIsActive}` : ""}`;
}

// ── Shared: field card ────────────────────────────────────────────────

function FieldCard({
  label,
  hint,
  required,
  rotate,
}: {
  label: string;
  hint: string;
  required: boolean;
  rotate?: string;
}) {
  return (
    <div
      style={{
        background: "var(--vc-paper)",
        border: "3px solid var(--vc-ink)",
        boxShadow: "5px 5px 0 var(--vc-ink)",
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        transform: rotate ?? "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-display-3)",
            fontSize: "28px",
            lineHeight: "1",
            color: "var(--vc-ink)",
          }}
        >
          {label}
        </div>
        {required ? (
          <div
            style={{
              fontFamily: "var(--vc-font-stamp)",
              fontSize: "13px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              background: "var(--vc-mustard)",
              color: "var(--vc-ink)",
              padding: "4px 10px",
              border: "1.5px solid var(--vc-ink)",
              flex: "none",
            }}
          >
            Required
          </div>
        ) : (
          <div
            style={{
              fontFamily: "var(--vc-font-stamp)",
              fontSize: "13px",
              letterSpacing: ".14em",
              textTransform: "uppercase",
              color: "var(--vc-bark)",
              padding: "4px 10px",
              border: "1.5px dashed var(--vc-bark)",
              flex: "none",
            }}
          >
            Optional
          </div>
        )}
      </div>
      <div
        style={{
          fontFamily: "var(--vc-font-mono)",
          fontSize: "19px",
          lineHeight: "1.5",
          color: "var(--vc-rust)",
        }}
      >
        {hint}
      </div>
    </div>
  );
}

// ── Slide 0: Title ────────────────────────────────────────────────────

function TitleSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background:
          "linear-gradient(160deg, #0b1a0e 0%, #1c3420 55%, #0b1a0e 100%)",
      }}
    >
      <svg
        width="540"
        height="540"
        viewBox="0 0 200 200"
        style={{
          position: "absolute",
          top: "-160px",
          right: "-130px",
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <circle
          className={slides.sun}
          cx="100"
          cy="100"
          r="74"
          fill="none"
          stroke="rgba(245,198,0,.2)"
          strokeWidth="30"
          strokeDasharray="5 27"
        />
        <circle
          cx="100"
          cy="100"
          r="46"
          fill="rgba(245,198,0,.08)"
          stroke="rgba(245,198,0,.25)"
          strokeWidth="4"
        />
      </svg>
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode/fern.svg"
        alt=""
        style={{
          position: "absolute",
          left: "-50px",
          bottom: "-40px",
          width: "380px",
          opacity: 0.15,
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
          alignItems: "center",
          justifyContent: "center",
          gap: "22px",
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "21px",
            letterSpacing: ".3em",
            textTransform: "uppercase",
            color: "rgba(245,198,0,.7)",
            border: "1.5px dashed rgba(245,198,0,.3)",
            padding: "10px 24px",
            transform: "rotate(-.4deg)",
          }}
        >
          VelociCode · Expedition 02 &times; ACM San Antonio
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "185px",
            lineHeight: ".78",
            color: "#f5e6c2",
            textShadow: "6px 6px 0 #f5c800, 13px 13px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
          }}
        >
          HOW TO
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "115px",
            lineHeight: ".85",
            color: "#f5c800",
            transform: "rotate(-1deg)",
          }}
        >
          SUBMIT.
        </div>
        <div
          style={{
            display: "inline-flex",
            gap: "34px",
            alignItems: "center",
            background: "#f5c800",
            color: "#0b1a0e",
            padding: "18px 40px",
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "28px",
            letterSpacing: ".13em",
            textTransform: "uppercase",
            border: "2.5px solid rgba(0,0,0,.3)",
            boxShadow: "8px 8px 0 rgba(0,0,0,.4)",
            marginTop: "8px",
          }}
        >
          <span>Sun Jul 26, 2026 &middot; 12:00 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>Virtual</span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 1: Agenda ───────────────────────────────────────────────────

function AgendaSlide({ cls }: { cls: string }) {
  const parts = [
    {
      num: "01",
      title: "Theme, prizes + judging",
      detail: "What you're building toward",
    },
    {
      num: "02",
      title: "How to submit on itch.io",
      detail: "Step-by-step form walkthrough",
    },
    {
      num: "03",
      title: "The Showcase",
      detail: "RSVP, presenting tips + stickers",
    },
  ];
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
          gap: "28px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Today&apos;s session</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "100px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          {"WHAT WE'RE "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            COVERING.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "8px",
          }}
        >
          {parts.map((p) => (
            <div
              key={p.num}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "28px",
                padding: "18px 24px",
                background: "var(--vc-cream)",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: "4px 4px 0 var(--vc-ink)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "42px",
                  lineHeight: "1",
                  color: "var(--vc-mustard)",
                  flex: "none",
                  width: "60px",
                  textAlign: "center",
                }}
              >
                {p.num}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "30px",
                    lineHeight: "1",
                    color: "var(--vc-ink)",
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "20px",
                    color: "var(--vc-rust)",
                    marginTop: "5px",
                  }}
                >
                  {p.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: Theme ───────────────────────────────────────────────────

function ThemeSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-leaf-deep)",
        backgroundImage:
          "repeating-linear-gradient(45deg,#0d3a08 0 2px,transparent 2px 30px)",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode/theme-fossil.png"
        alt="ammonite fossil"
        style={{
          position: "absolute",
          right: "100px",
          top: "50%",
          transform: "translateY(-50%)",
          height: "660px",
          opacity: 0.9,
          pointerEvents: "none",
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
          gap: "22px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">The theme · Expedition 02</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "26px",
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "rgba(245,230,194,.5)",
          }}
        >
          This year&apos;s theme is
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "220px",
            lineHeight: ".78",
            color: "#f5e6c2",
            textShadow: "6px 6px 0 #f5c800, 14px 14px 0 rgba(0,0,0,.5)",
            transform: "rotate(-1deg)",
          }}
        >
          FOSSIL.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "26px",
            lineHeight: "1.6",
            color: "var(--vc-mustard)",
            maxWidth: "680px",
            marginTop: "8px",
          }}
        >
          You've interpreted it broadly from literal fossils, ancient systems,
          things buried and rediscovered. The best takes will surprise us.
        </div>
      </div>
    </div>
  );
}

// ── Slide 3: Prizes ───────────────────────────────────────────────────

function PrizesSlide({ cls }: { cls: string }) {
  const prizes = [
    {
      cat: "Best Overall",
      amount: "$200 value",
      note: "Split across the whole team.",
      decided: "Decided by judges",
      dark: false,
      rotate: "-1deg",
    },
    {
      cat: "Best Use of Theme",
      amount: "$100 value",
      note: "Split across the whole team.",
      decided: "Decided by judges",
      dark: false,
      rotate: ".8deg",
    },
    {
      cat: "Crowd Favorite",
      amount: "$10–20",
      note: "Per team member.",
      decided: "Attendee vote",
      dark: true,
      rotate: "-1.4deg",
    },
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-mustard)",
        backgroundImage:
          "radial-gradient(ellipse 1100px 460px at 0% 0%,#f0a830a6,transparent 70%),radial-gradient(ellipse 900px 420px at 100% 100%,#c44d244d,transparent 70%)",
      }}
    >
      <div
        className={kf.kfStagger}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "22px",
          padding: "60px 110px 80px",
        }}
      >
        <Eyebrow color="var(--vc-rust)">What you&apos;re playing for</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-rust)",
            }}
          >
            PRIZES.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {prizes.map(({ cat, amount, note, decided, dark, rotate }) => (
            <div
              key={cat}
              style={{
                flex: 1,
                background: dark ? "var(--vc-ink)" : "var(--vc-paper)",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: `7px 7px 0 ${dark ? "var(--vc-clay)" : "var(--vc-ink)"}`,
                padding: "30px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                transform: `rotate(${rotate})`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "30px",
                  color: dark ? "var(--vc-mustard)" : "var(--vc-ink)",
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "56px",
                  lineHeight: ".9",
                  color: dark ? "var(--vc-cream)" : "var(--vc-leaf-deep)",
                }}
              >
                {amount}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "21px",
                  lineHeight: "1.4",
                  color: dark ? "var(--vc-paper)" : "var(--vc-ink)",
                }}
              >
                {note}
              </div>
              <div
                style={{
                  marginTop: "auto",
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "17px",
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  color: dark ? "var(--vc-mustard)" : "var(--vc-rust)",
                  borderTop: `2px dashed ${dark ? "var(--vc-mustard)" : "var(--vc-rust)"}`,
                  paddingTop: "12px",
                }}
              >
                {decided}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 5: Step 1 — Join the jam ────────────────────────────────────

function JoinJamSlide({ cls }: { cls: string }) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.08 }} />
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
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Step 1</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "112px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          JOIN THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            JAM.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            marginTop: "4px",
          }}
        >
          {[
            "Go to itch.io/jam/velocicode-2",
            "Log in or register for a free itch.io account",
            'Click "Join jam". You only need to do this once.',
            'After joining, click "Submit your project" to begin',
          ].map((step, i) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "27px",
                lineHeight: "1.4",
                color: "var(--vc-ink)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: "36px",
                  height: "36px",
                  background: "var(--vc-leaf-deep)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "20px",
                  color: "var(--vc-cream)",
                  marginTop: "3px",
                }}
              >
                {i + 1}
              </span>
              {step}
            </div>
          ))}
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
            alignSelf: "flex-start",
            marginTop: "4px",
          }}
        >
          itch.io/jam/velocicode-2
        </div>
      </div>
    </div>
  );
}

// ── Slide 3: Step 2 — Upload your build ──────────────────────────────

function UploadSlide({ cls }: { cls: string }) {
  const formats = [
    { label: "Web", note: "HTML5. Playable in browser, easiest for judges." },
    { label: "Windows", note: ".zip your build folder" },
    { label: "Mac", note: ".zip the .app bundle" },
    { label: "Linux", note: ".zip or .tar.gz" },
    { label: "Android", note: ".apk file" },
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-cream)",
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Step 2</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "112px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          UPLOAD YOUR{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            BUILD.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginTop: "4px",
          }}
        >
          {formats.map((f) => (
            <div
              key={f.label}
              style={{
                background: "var(--vc-paper)",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: "4px 4px 0 var(--vc-ink)",
                padding: "16px 22px",
                minWidth: "260px",
                flex: "1",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "26px",
                  color: "var(--vc-ink)",
                  marginBottom: "6px",
                }}
              >
                {f.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "18px",
                  color: "var(--vc-rust)",
                }}
              >
                {f.note}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "40px",
            color: "var(--vc-clay)",
            transform: "rotate(-1deg)",
          }}
        >
          Web builds are the most accessible. When in doubt, export to HTML5.
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Game page setup ──────────────────────────────────────────

function GamePageSlide({ cls }: { cls: string }) {
  const items = [
    {
      label: "Cover image",
      note: "315×250px recommended. This is the thumbnail shown in the jam browser.",
    },
    {
      label: "Add screenshots",
      note: "At least one. Judges will use these to remember your game during the deliberation process",
    },
    {
      label: "Make your page public",
      note: "Draft pages are invisible to everyone. Double-check before submitting.",
    },
    {
      label: "One team member submits",
      note: "Coordinate beforehand. Duplicate entries create confusion.",
    },
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-cream)",
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
          gap: "22px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Before you fill the form</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "100px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          SET UP YOUR{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            GAME PAGE.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "8px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                background: "var(--vc-paper)",
                border: "2px solid var(--vc-ink)",
                boxShadow: "4px 4px 0 var(--vc-ink)",
                padding: "16px 22px",
              }}
            >
              <span
                style={{
                  flex: "none",
                  marginTop: "5px",
                  width: "10px",
                  height: "10px",
                  background: "var(--vc-leaf-deep)",
                  transform: "rotate(45deg)",
                }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "24px",
                    color: "var(--vc-ink)",
                  }}
                >
                  {item.label}
                  {": "}
                </span>
                <span
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "22px",
                    color: "var(--vc-rust)",
                  }}
                >
                  {item.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 8: Form pt.1 — The basics ──────────────────────────────────

function FormSlide1({ cls }: { cls: string }) {
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
          gap: "22px",
          padding: "0 120px 78px",
        }}
      >
        <Eyebrow>The form · 1 of 3</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "90px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            BASICS.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginTop: "8px",
          }}
        >
          <FieldCard
            label="Game Title"
            hint="What is the name of your game?"
            required
            rotate="rotate(-0.5deg)"
          />
          <FieldCard
            label="Team Name"
            hint="What is your team called?"
            required
            rotate="rotate(0.4deg)"
          />
          <FieldCard
            label="Team Members"
            hint="List the names of all team members including yourself."
            required
            rotate="rotate(0.6deg)"
          />
          <FieldCard
            label="Short Description"
            hint="Give a short overview of your game."
            required
            rotate="rotate(-0.3deg)"
          />
        </div>
      </div>
    </div>
  );
}

// ── Slide 5: Form pt.2 — Your game ───────────────────────────────────

function FormSlide2({ cls }: { cls: string }) {
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
          gap: "22px",
          padding: "0 120px 78px",
        }}
      >
        <Eyebrow>The form · 2 of 3</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "90px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          YOUR{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            GAME.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginTop: "8px",
          }}
        >
          <FieldCard
            label="Theme Connection"
            hint="How does your game connect to the announced theme?"
            required
            rotate="rotate(-0.4deg)"
          />
          <FieldCard
            label="Platform"
            hint="What platform does your game run on? (Web, Windows, Mac, Linux, Android)"
            required
            rotate="rotate(0.5deg)"
          />
          <FieldCard
            label="Controls / How to Play"
            hint="Explain the controls and anything players should know before starting."
            required
            rotate="rotate(0.3deg)"
          />
          <FieldCard
            label="Tools Used"
            hint="What engine, framework, or tools did you use?"
            required
            rotate="rotate(-0.6deg)"
          />
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: Form pt.3 — Disclosures ─────────────────────────────────

function FormSlide3({ cls }: { cls: string }) {
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
          gap: "22px",
          padding: "0 120px 78px",
        }}
      >
        <Eyebrow>The form · 3 of 3</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "90px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          DISCLOSURES{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            {"& EXTRAS."}
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "18px",
            marginTop: "8px",
          }}
        >
          <FieldCard
            label="Premade Asset Disclosure"
            hint="List any premade assets, plugins, libraries, fonts, music, or other third-party resources."
            required
            rotate="rotate(-0.5deg)"
          />
          <FieldCard
            label="AI Usage Disclosure"
            hint="Describe whether you used AI tools and, if so, how."
            required
            rotate="rotate(0.4deg)"
          />
          <FieldCard
            label="Gameplay Video or Trailer"
            hint="A link to a video of your game. Optional, but encouraged."
            required={false}
            rotate="rotate(0.5deg)"
          />
          <FieldCard
            label="Lessons Learned"
            hint="What went well, what was challenging, or what are you most proud of?"
            required={false}
            rotate="rotate(-0.4deg)"
          />
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Judging criteria ─────────────────────────────────────────

function JudgingSlide({ cls }: { cls: string }) {
  const criteria = [
    {
      name: "Gameplay & Fun",
      detail:
        "Is the game enjoyable to play? Do the mechanics feel good and make you want to keep going?",
    },
    {
      name: "Creativity & Originality",
      detail:
        "Does the game bring a fresh idea or twist? Reward surprise over safe, familiar execution.",
    },
    {
      name: "Execution & Polish",
      detail:
        "Does it run smoothly and feel complete? Art, audio, and UI working together as a whole.",
    },
    {
      name: "Theme Integration",
      detail:
        "Is the theme woven into mechanics or story, not just a reskin slapped on top?",
    },
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-sand)",
      }}
    >
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.08 }} />
      <div
        className={kf.kfStagger}
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "22px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>What matters</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "100px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          {"HOW YOU'LL BE "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            JUDGED.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "8px",
          }}
        >
          {criteria.map((c, i) => (
            <div
              key={c.name}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: "36px",
                  height: "36px",
                  background: "var(--vc-mustard)",
                  border: "2px solid var(--vc-ink)",
                  boxShadow: "2px 2px 0 var(--vc-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "20px",
                  color: "var(--vc-ink)",
                  marginTop: "3px",
                }}
              >
                {i + 1}
              </span>
              <div>
                <span
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "24px",
                    color: "var(--vc-ink)",
                  }}
                >
                  {c.name}
                  {": "}
                </span>
                <span
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "22px",
                    color: "var(--vc-rust)",
                    lineHeight: "1.5",
                  }}
                >
                  {c.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 8: Submission tips ──────────────────────────────────────────

function SubmissionTipsSlide({ cls }: { cls: string }) {
  const tips = [
    "Write a description that tells the story of the game, not just a feature list",
    "Make sure your game actually runs on the platform you list before submitting",
    "Include screenshots. Judges and voters judge with their eyes first.",
    "Be specific in your Theme Connection field. Show your thinking.",
    "Disclose your assets and AI use honestly. Hiding them can disqualify you.",
    "Add a gameplay video if you can. It sells the vibe immediately.",
    "You can update your submission any time before the deadline",
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-cream)",
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
          gap: "20px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Make it shine</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "100px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          SUBMISSION{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            TIPS.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "6px",
          }}
        >
          {tips.map((tip) => (
            <div
              key={tip}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "22px",
                lineHeight: "1.45",
                color: "var(--vc-ink)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  marginTop: "8px",
                  width: "8px",
                  height: "8px",
                  background: "var(--vc-clay)",
                  transform: "rotate(45deg)",
                }}
              />
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 9: The Showcase ─────────────────────────────────────────────

function ShowcaseSlide({
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
          right: "-60px",
          top: "-30px",
          width: "420px",
          opacity: 0.2,
          transform: "rotate(180deg) scaleX(-1)",
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
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>August 1, 2026</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "130px",
            lineHeight: ".82",
            color: "var(--vc-leaf-deep)",
            textShadow: "5px 5px 0 #f5c800, 11px 11px 0 #20180c",
            transform: "rotate(-1deg)",
          }}
        >
          THE SHOWCASE.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "28px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "820px",
          }}
        >
          Science fair-style. You set up your game at a table, judges and the
          community walk around and play each entry.
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {[
            ["In-Person Only", true],
            ["Venue TBA", false],
            ["Prize-Eligible Teams Must Attend", true],
          ].map(([label, accent]) => (
            <div
              key={String(label)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: accent ? "var(--vc-leaf-deep)" : "var(--vc-paper)",
                color: accent ? "var(--vc-cream)" : "var(--vc-ink)",
                padding: "12px 22px",
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "22px",
                letterSpacing: ".1em",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: "4px 4px 0 var(--vc-ink)",
              }}
            >
              {String(label)}
            </div>
          ))}
        </div>
      </div>

      {/* Persistent RSVP reference */}
      <div
        style={{
          position: "absolute",
          bottom: "96px",
          right: "80px",
          background: "#f5c800",
          border: "2.5px solid #20180c",
          boxShadow: "5px 6px 0 rgba(0,0,0,.4)",
          padding: "16px 20px",
          transform: "rotate(1.8deg)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "22px",
            color: "#20180c",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          RSVP by July 29
          <br />
          scan to register
        </div>
        <div
          style={{
            background: "#fff",
            padding: "8px",
            border: "1.5px solid #20180c",
          }}
        >
          <QRImg src={qrs.rsvp ?? null} size={100} />
        </div>
      </div>
    </div>
  );
}

// ── Slide 10: RSVP ───────────────────────────────────────────────────

function RSVPSlide({
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
          gap: "24px",
          padding: "0 120px 78px",
        }}
      >
        <Eyebrow>Showcase · RSVP</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "110px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          COMING TO{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            THE SHOWCASE?
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "24px",
            marginTop: "8px",
          }}
        >
          {/* RSVP 1 — open now */}
          <div
            style={{
              background: "#f5c800",
              border: "3px solid var(--vc-ink)",
              boxShadow: "6px 6px 0 var(--vc-ink)",
              padding: "28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transform: "rotate(-0.5deg)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "14px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "rgba(32,24,12,.55)",
                  marginBottom: "6px",
                }}
              >
                Step 1 · Open now
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "28px",
                  color: "#20180c",
                  lineHeight: 1.1,
                }}
              >
                Register your intent
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "18px",
                  color: "#5a3a18",
                  marginTop: "8px",
                }}
              >
                Let us know you're planning to present.
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  background: "#fff",
                  padding: "10px",
                  border: "2px solid #20180c",
                  flex: "none",
                }}
              >
                <QRImg src={qrs.rsvp ?? null} size={120} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "15px",
                    color: "#20180c",
                    wordBreak: "break-all",
                    lineHeight: 1.5,
                  }}
                >
                  forms.gle/
                  <br />
                  6nJLf6T4ab9bYokQ9
                </div>
                <div
                  style={{
                    display: "inline-flex",
                    marginTop: "10px",
                    background: "#20180c",
                    color: "#f5c800",
                    padding: "6px 14px",
                    fontFamily: "var(--vc-font-stamp)",
                    fontSize: "16px",
                    letterSpacing: ".12em",
                  }}
                >
                  Due July 29
                </div>
              </div>
            </div>
          </div>

          {/* RSVP 2 — coming soon */}
          <div
            style={{
              background: "var(--vc-cream)",
              border: "3px dashed rgba(32,24,12,.25)",
              padding: "28px 32px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              transform: "rotate(0.4deg)",
              opacity: 0.7,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "14px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase",
                  color: "var(--vc-bark)",
                  marginBottom: "6px",
                }}
              >
                Step 2 · Available Jul 30–31
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "28px",
                  color: "var(--vc-ink)",
                  lineHeight: 1.1,
                }}
              >
                Final confirmation
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "18px",
                  color: "var(--vc-rust)",
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              >
                Opens when submissions close on July 30.
                <br />
                Watch Discord, Instagram, and all platforms.
              </div>
            </div>
            <div
              style={{
                display: "inline-flex",
                alignSelf: "flex-start",
                background: "var(--vc-ink)",
                color: "var(--vc-cream)",
                padding: "6px 14px",
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "16px",
                letterSpacing: ".12em",
              }}
            >
              Due Fri Jul 31 · 10 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 11: Presenting tips ─────────────────────────────────────────

function PresentingTipsSlide({
  cls,
  qrs,
}: {
  cls: string;
  qrs: Record<string, string | null>;
}) {
  const tips = [
    "Have your game running and playable before judges arrive at your table",
    "Prepare a 60-second pitch: what's the game, what's the theme connection",
    "Let judges play. Guide them, but don't play it for them.",
    "Talk about your process and what you'd do with more time",
    "Have a QR code to your itch.io page ready on your table",
    "Don't undersell. You shipped something in a month. Be proud of it.",
  ];
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-leaf-deep)",
        backgroundImage:
          "repeating-linear-gradient(180deg,transparent 0 47px,rgba(245,230,194,.04) 47px 48px)",
      }}
    >
      <div
        className={kf.kfStagger}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">Science fair mode</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "100px",
            lineHeight: ".84",
            color: "var(--vc-cream)",
          }}
        >
          PRESENTING AT{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            THE SHOWCASE.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "6px",
          }}
        >
          {tips.map((tip) => (
            <div
              key={tip}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "22px",
                lineHeight: "1.45",
                color: "rgba(245,230,194,.9)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  marginTop: "8px",
                  width: "8px",
                  height: "8px",
                  background: "var(--vc-mustard)",
                  transform: "rotate(45deg)",
                }}
              />
              {tip}
            </div>
          ))}
        </div>
      </div>

      {/* Persistent RSVP reference */}
      <div
        style={{
          position: "absolute",
          bottom: "96px",
          right: "80px",
          background: "#f5c800",
          border: "2.5px solid #20180c",
          boxShadow: "5px 6px 0 rgba(0,0,0,.4)",
          padding: "16px 20px",
          transform: "rotate(1.8deg)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "22px",
            color: "#20180c",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          RSVP by July 29
          <br />
          scan to register
        </div>
        <div
          style={{
            background: "#fff",
            padding: "8px",
            border: "1.5px solid #20180c",
          }}
        >
          <QRImg src={qrs.rsvp ?? null} size={100} />
        </div>
      </div>
    </div>
  );
}

// ── Slide 12: Submissions Due ─────────────────────────────────────────

function SubmissionsDueSlide({
  cls,
  qrs,
}: {
  cls: string;
  qrs: Record<string, string | null>;
}) {
  return (
    <div className={cls} style={{ background: "#f5c800" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.05 }} />
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode/fern.svg"
        alt=""
        style={{
          position: "absolute",
          right: "-60px",
          bottom: "-40px",
          width: "420px",
          opacity: 0.12,
          transform: "rotate(-10deg) scaleX(-1)",
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
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow color="rgba(32,24,12,.45)">Don&apos;t miss it</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "170px",
            lineHeight: ".78",
            color: "#20180c",
            textShadow: "5px 5px 0 rgba(255,255,255,.3)",
            transform: "rotate(-1deg)",
          }}
        >
          SUBMISSIONS
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "120px",
            lineHeight: ".85",
            color: "var(--vc-leaf-deep)",
            transform: "rotate(-1deg)",
          }}
        >
          DUE.
        </div>
        <div
          style={{
            display: "inline-flex",
            gap: "34px",
            alignItems: "center",
            background: "#20180c",
            color: "#f5c800",
            padding: "18px 40px",
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "32px",
            letterSpacing: ".13em",
            textTransform: "uppercase",
            border: "2.5px solid rgba(0,0,0,.3)",
            boxShadow: "8px 8px 0 rgba(0,0,0,.3)",
            alignSelf: "flex-start",
            marginTop: "8px",
          }}
        >
          <span>July 30 &middot; 11:59 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>itch.io</span>
        </div>
      </div>

      {/* Persistent RSVP reference — dark treatment for yellow bg */}
      <div
        style={{
          position: "absolute",
          bottom: "96px",
          right: "80px",
          background: "#20180c",
          border: "2.5px solid rgba(245,198,0,.4)",
          boxShadow: "5px 6px 0 rgba(0,0,0,.35)",
          padding: "16px 20px",
          transform: "rotate(1.8deg)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "22px",
            color: "#f5c800",
            lineHeight: 1.3,
            textAlign: "center",
          }}
        >
          RSVP by July 29
          <br />
          scan to register
        </div>
        <div
          style={{
            background: "#fff",
            padding: "8px",
            border: "1.5px solid rgba(245,198,0,.4)",
          }}
        >
          <QRImg src={qrs.rsvp ?? null} size={100} />
        </div>
      </div>
    </div>
  );
}

// ── Slide 13: Sponsors ────────────────────────────────────────────────

function SponsorsSlide({ cls }: { cls: string }) {
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

// ── Slide 14: Community Partners ──────────────────────────────────────

function CommunityPartnersSlide({ cls }: { cls: string }) {
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

// ── Slide 15: Closing ─────────────────────────────────────────────────

function ClosingSlide({
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
          GO SUBMIT.
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
          Submissions close July 30 at 11:59 PM. Join our Discord if you need
          help or have questions before the deadline.
        </div>
        <div style={{ display: "flex", gap: "40px", marginTop: "10px" }}>
          {[
            {
              key: "submit",
              label: "Submit on itch.io",
              sub: "velocicode-2 ↗",
            },
            { key: "rsvp", label: "Showcase RSVP", sub: "due July 29 ↗" },
            { key: "discord", label: "Discord", sub: "get help ↗" },
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

// ── Runtime ───────────────────────────────────────────────────────────

function HowToSubmitRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [idx, setIdx] = useState(initialIdx);
  const [outIdx, setOutIdx] = useState(-1);
  const [inIdx, setInIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);
  const [scale, setScale] = useState(1);
  const [qrs, setQrs] = useState<Record<string, string | null>>({});

  const swappingRef = useRef(false);
  const idxRef = useRef(initialIdx);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const reducedRef = useRef(false);

  useEffect(() => {
    swappingRef.current = swapping;
  }, [swapping]);
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    const fit = () =>
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    (async () => {
      const [submit, discord, rsvp] = await Promise.all([
        makeQR("https://itch.io/jam/velocicode-2", 300),
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://forms.gle/6nJLf6T4ab9bYokQ9", 300),
      ]);
      setQrs({ submit, discord, rsvp });
    })();
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const next = (((idxRef.current + dir) % TOTAL) + TOTAL) % TOTAL;
    setSwapping(true);
    setOutIdx(idxRef.current);
    setInIdx(next);
    setIdx(next);
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    const dur = reducedRef.current ? 60 : 500;
    swapTimerRef.current = setTimeout(() => {
      setSwapping(false);
      setOutIdx(-1);
      setInIdx(-1);
    }, dur);
  }, []);

  const onPrev = useCallback(() => advance(-1), [advance]);
  const onNext = useCallback(() => advance(1), [advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <div className={slides.viewport}>
      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>
          <TitleSlide cls={cc(0)} />
          <AgendaSlide cls={cc(1)} />
          <ThemeSlide cls={cc(2)} />
          <PrizesSlide cls={cc(3)} />
          <JudgingSlide cls={cc(4)} />
          <JoinJamSlide cls={cc(5)} />
          <UploadSlide cls={cc(6)} />
          <GamePageSlide cls={cc(7)} />
          <FormSlide1 cls={cc(8)} />
          <FormSlide2 cls={cc(9)} />
          <FormSlide3 cls={cc(10)} />
          <SubmissionTipsSlide cls={cc(11)} />
          <ShowcaseSlide cls={cc(12)} qrs={qrs} />
          <RSVPSlide cls={cc(13)} qrs={qrs} />
          <PresentingTipsSlide cls={cc(14)} qrs={qrs} />
          <SubmissionsDueSlide cls={cc(15)} qrs={qrs} />
          <SponsorsSlide cls={cc(16)} />
          <CommunityPartnersSlide cls={cc(17)} />
          <ClosingSlide cls={cc(18)} qrs={qrs} />
        </div>

        <div className={slides.brand}>
          {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
          <img
            src="/velocicode-logo.png"
            alt="VelociCode"
            className={slides.brandImg}
          />
        </div>

        <div className={kf.kfCount}>
          {idx + 1} / {TOTAL}
        </div>

        <div className={slides.footer}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <span className={slides.footerDot} />
            VelociCode &middot; Expedition 02
          </span>
          <span>How to Submit &middot; 12:00 PM &middot; Virtual</span>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk — keyboard handled by window listener */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk — keyboard handled by window listener */}
        <div className={slides.zoneLeft} onClick={onPrev} />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk — keyboard handled by window listener */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk — keyboard handled by window listener */}
        <div className={slides.zoneRight} onClick={onNext} />
      </div>
    </div>
  );
}

export default function HowToSubmitPage() {
  return (
    <>
      <span
        className={FONT_TRIGGER_CLASS}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <HowToSubmitRuntime />
      </Suspense>
    </>
  );
}
