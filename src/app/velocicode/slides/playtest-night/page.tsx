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
import {
  Eyebrow,
  makeQR,
  QRImg,
} from "../kickoff/slide-utils";
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

type Superlative = { title: string; winner: string };

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
          VelociCode · Expedition 02 &times; Alamo Tech Collective
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "205px",
            lineHeight: ".78",
            color: "#f5e6c2",
            textShadow: "6px 6px 0 #f5c800, 13px 13px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
          }}
        >
          PLAYTEST
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "130px",
            lineHeight: ".85",
            color: "#f5c800",
            transform: "rotate(-1deg)",
          }}
        >
          NIGHT.
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
          <span>Thu Jul 17, 2026 &middot; 6:00 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>Zelifcam</span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 1: Halfway There ────────────────────────────────────────────

function HalfwaySlide({ cls }: { cls: string }) {
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Day 17 of 30 &middot; VelociCode</Eyebrow>
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
          YOU&apos;RE
        </div>
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
          HALFWAY
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "100px",
            lineHeight: ".9",
            color: "var(--vc-ink)",
            transform: "rotate(-1.5deg)",
          }}
        >
          THERE.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "var(--vc-clay)",
            transform: "rotate(-1deg)",
            marginTop: "4px",
          }}
        >
          13 days left. Keep building.
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: What is Playtest Night? ──────────────────────────────────

function WhatIsPlaytestSlide({ cls }: { cls: string }) {
  const points = [
    "Try games that are still in progress be a real player",
    "Give devs honest, constructive feedback to help them ship",
    "The room decides the vibe and who gets awarded what",
    "Win prizes for showing up and demoing",
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>How tonight works</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "88px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          WHAT IS{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            PLAYTEST NIGHT?
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
          {points.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "22px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "26px",
                lineHeight: "1.4",
                color: "var(--vc-ink)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  width: "38px",
                  height: "38px",
                  background: "var(--vc-mustard)",
                  border: "2px solid var(--vc-ink)",
                  boxShadow: "3px 3px 0 var(--vc-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "22px",
                  color: "var(--vc-ink)",
                  marginTop: "2px",
                }}
              >
                {i + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 3: Tonight's Demos ──────────────────────────────────────────

function DemosSlide({ cls, demos }: { cls: string; demos: number }) {
  const countLabel =
    demos > 0 ? String(demos) : "?";
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>On the floor tonight</Eyebrow>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "28px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--vc-font-display-1)",
              fontSize: "220px",
              lineHeight: ".78",
              color: "var(--vc-ink)",
              textShadow: "6px 6px 0 var(--vc-mustard)",
              transform: "rotate(-2deg)",
            }}
          >
            {countLabel}
          </div>
          <div
            style={{
              fontFamily: "var(--vc-font-display-2)",
              fontSize: "96px",
              lineHeight: ".9",
              color: "var(--vc-clay)",
              transform: "rotate(-1deg)",
              paddingBottom: "22px",
            }}
          >
            {demos === 1 ? "DEMO." : "DEMOS."}
          </div>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "28px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "900px",
          }}
        >
          Walk the floor, play each build, and give the dev real feedback.
          Prize giveaways happening too — stay close.
        </div>
      </div>
    </div>
  );
}

// ── Slide 4: Superlatives Teaser ──────────────────────────────────────

function SuperlativesTeaserSlide({ cls }: { cls: string }) {
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
        <Eyebrow>Coming up later</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "120px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          PLUS:{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            SUPERLATIVES.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "820px",
          }}
        >
          We&apos;ll be awarding some well-deserved recognition tonight.
          Play the demos — we&apos;ll share the awards when it&apos;s time.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "var(--vc-rust)",
            transform: "rotate(-1.2deg)",
          }}
        >
          No spoilers just yet.
        </div>
      </div>
    </div>
  );
}

// ── Slides 5 & 7: Loop Title Card ─────────────────────────────────────

function LoopTitleSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background:
          "linear-gradient(160deg, #0b1a0e 0%, #1c3420 55%, #0b1a0e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
      <img
        src="/velocicode-logo.png"
        alt="VelociCode"
        style={{
          width: "360px",
          filter: "drop-shadow(0 8px 32px rgba(0,0,0,.6))",
          opacity: 0.9,
        }}
      />
    </div>
  );
}

// ── Slide 6: Dino Costume Contest ─────────────────────────────────────

function DinoCostumeSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "#f5c800",
      }}
    >
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.06 }} />
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
          gap: "24px",
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "22px",
            letterSpacing: ".32em",
            textTransform: "uppercase",
            color: "rgba(32,24,12,.55)",
            border: "1.5px dashed rgba(32,24,12,.3)",
            padding: "10px 28px",
            transform: "rotate(-.4deg)",
          }}
        >
          Special event
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "175px",
            lineHeight: ".78",
            color: "#20180c",
            textShadow: "5px 5px 0 rgba(255,255,255,.4)",
            transform: "rotate(-1.2deg)",
          }}
        >
          DINO
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "175px",
            lineHeight: ".78",
            color: "#20180c",
            textShadow: "5px 5px 0 rgba(255,255,255,.4)",
            transform: "rotate(-1.2deg)",
          }}
        >
          COSTUME
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "120px",
            lineHeight: ".85",
            color: "var(--vc-leaf-deep)",
            transform: "rotate(-1.2deg)",
          }}
        >
          CONTEST.
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Dino Instructions ────────────────────────────────────────

function DinoInstructionsSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "#f5c800",
        backgroundImage:
          "repeating-linear-gradient(180deg,transparent 0 47px,rgba(32,24,12,.04) 47px 48px)",
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
        <Eyebrow color="rgba(32,24,12,.5)">Your vote counts</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "130px",
            lineHeight: ".84",
            color: "#20180c",
          }}
        >
          SHOW YOUR{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            ENERGY.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "#20180c",
            maxWidth: "820px",
          }}
        >
          The host will spotlight each contender. Cheer for your favorite 
          and the crowd decides who takes home the win.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "rgba(32,24,12,.6)",
            transform: "rotate(-1.2deg)",
          }}
        >
          May the best dino win.
        </div>
      </div>
    </div>
  );
}

// ── Slide 8: Dino Congratulations ────────────────────────────────────
function DinoCongratulationsSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "#f5c800",
        backgroundImage:
          "repeating-linear-gradient(180deg,transparent 0 47px,rgba(32,24,12,.04) 47px 48px)",
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
        <Eyebrow color="rgba(32,24,12,.5)">Dino Costume Contest</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "130px",
            lineHeight: ".84",
            color: "#20180c",
          }}
        >
          CONGRATS,{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            DINO!
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "rgba(32,24,12,.6)",
            transform: "rotate(-1.2deg)",
          }}
        >
          The crowd has spoken.
        </div>
      </div>
    </div>
  );
}

// ── Slide 9: All Superlatives ─────────────────────────────────────────

function AllSuperlativesSlide({
  cls,
  count,
}: {
  cls: string;
  count: number;
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
          gap: "26px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>{"Tonight's recognition"}</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "106px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          {"TONIGHT'S "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            AWARDS.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "780px",
            opacity: 0.7,
          }}
        >
          {count > 0
            ? `We've got ${count} well-deserved award${count === 1 ? "" : "s"} to hand out tonight.`
            : "We've got a few well-deserved recognitions to hand out tonight."}
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "rgba(32,24,12,.5)",
            transform: "rotate(-1deg)",
          }}
        >
          The envelopes are sealed.
        </div>
      </div>
    </div>
  );
}

// ── Dynamic: Superlative Title Card ───────────────────────────────────

function SuperlativeTitleSlide({
  cls,
  superlative,
}: {
  cls: string;
  superlative: string;
}) {
  return (
    <div
      className={cls}
      style={{
        background:
          "linear-gradient(160deg, #0b1a0e 0%, #1c3420 55%, #0b1a0e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className={kf.kfStagger}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          textAlign: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "22px",
            letterSpacing: ".32em",
            textTransform: "uppercase",
            color: "rgba(245,198,0,.5)",
          }}
        >
          Superlative
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "160px",
            lineHeight: ".82",
            color: "#f5e6c2",
            textShadow: "5px 5px 0 #f5c800, 10px 10px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
            textAlign: "center",
          }}
        >
          {superlative.toUpperCase()}
        </div>
        <div
          style={{
            width: "120px",
            height: "4px",
            background: "#f5c800",
            marginTop: "12px",
            opacity: 0.5,
          }}
        />
      </div>
    </div>
  );
}

// ── Dynamic: Superlative Winner Card ──────────────────────────────────

function SuperlativeWinnerSlide({
  cls,
  superlative,
  winner,
  revealed,
}: {
  cls: string;
  superlative: string;
  winner: string;
  revealed: boolean;
}) {
  return (
    <div
      className={cls}
      style={{
        background: "#f5c800",
      }}
    >
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.05 }} />
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
          gap: "18px",
          textAlign: "center",
          padding: "0 120px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "24px",
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: "rgba(32,24,12,.55)",
          }}
        >
          {superlative}
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "36px",
            letterSpacing: ".1em",
            color: "rgba(32,24,12,.5)",
            textTransform: "uppercase",
          }}
        >
          and the winner is&hellip;
        </div>
        {/* wrapper is the kfRise target; inner div controls reveal independently */}
        <div>
          <div
            className={revealed ? kf.winnerRevealed : kf.winnerHidden}
            style={{
              fontFamily: "var(--vc-font-display-2)",
              fontSize: "148px",
              lineHeight: ".85",
              color: "var(--vc-leaf-deep)",
              textShadow: "5px 5px 0 rgba(0,0,0,.15)",
            }}
          >
            {winner || "???"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Host: Alamo Tech Collective ───────────────────────────────────────

function HostSlide({ cls }: { cls: string }) {
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
          gap: "28px",
          padding: "40px 120px 100px",
          textAlign: "center",
        }}
      >
        <Eyebrow>{"Tonight's home base"}</Eyebrow>
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
              color: "var(--vc-clay)",
            }}
          >
            ALAMO TECH COLLECTIVE.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "28px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "700px",
          }}
        >
          For making tonight possible.
        </div>
        <div
          className={slides.float}
          style={{
            background: "var(--vc-paper)",
            border: "4px solid #20180c",
            borderRadius: "22px",
            padding: "46px 90px",
            boxShadow: "7px 7px 0 #20180c",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "400px",
            height: "260px",
            marginTop: "12px",
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
            src="/alamo-tech-collective.png"
            alt="Alamo Tech Collective"
            style={{
              maxWidth: "360px",
              maxHeight: "170px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Sponsors ──────────────────────────────────────────────────────────

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

// ── Community Partners ────────────────────────────────────────────────

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

// ── Closing ───────────────────────────────────────────────────────────

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
          Join our Discord to find teammates, get feedback, and stay in the
          loop for every event this month.
        </div>
        <div style={{ display: "flex", gap: "48px", marginTop: "10px" }}>
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

// ── Slide: Demoers Thank You ──────────────────────────────────────────
function DemoersThankYouSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "#1e6016",
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
          alignItems: "center",
          justifyContent: "center",
          gap: "28px",
          padding: "0 140px 78px",
          textAlign: "center",
        }}
      >
        <Eyebrow color="rgba(245,230,194,.5)">Playtest Night</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "110px",
            lineHeight: ".84",
            color: "#f5e6c2",
          }}
        >
          THANK YOU{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "#f5c800",
            }}
          >
            DEMOERS.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "52px",
            lineHeight: "1",
            color: "rgba(245,230,194,.7)",
            letterSpacing: ".04em",
          }}
        >
          CONGRATULATIONS TO TONIGHT&apos;S WINNERS.
        </div>
      </div>
    </div>
  );
}

// ── Runtime ───────────────────────────────────────────────────────────

function PlaytestRuntime() {
  const params = useSearchParams();

  const demos = Math.max(0, parseInt(params.get("demos") ?? "0", 10) || 0);

  const superlatives: Superlative[] = [];
  for (let i = 1; i <= 20; i++) {
    const title = params.get(`s${i}`);
    if (!title) break;
    superlatives.push({ title, winner: params.get(`w${i}`) ?? "" });
  }

  // 11 fixed slides + 2 per superlative + 5 tail slides
  const BASE = 11;
  const TAIL = 5;
  const TOTAL = BASE + superlatives.length * 2 + TAIL;
  const supStart = BASE;
  const tailStart = supStart + superlatives.length * 2;

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
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const swappingRef = useRef(false);
  const idxRef = useRef(initialIdx);
  const totalRef = useRef(TOTAL);
  const tailStartRef = useRef(tailStart);
  const revealedRef = useRef<Set<number>>(new Set());
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const reducedRef = useRef(false);

  totalRef.current = TOTAL;
  tailStartRef.current = tailStart;

  useEffect(() => {
    swappingRef.current = swapping;
  }, [swapping]);
  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);
  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);

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
      const [discord, site] = await Promise.all([
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://acmsa.org/velocicode", 300),
      ]);
      setQrs({ discord, site });
    })();
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const cur = idxRef.current;
    const ts = tailStartRef.current;
    // Intercept first forward press on a winner slide to reveal the name
    if (dir === 1 && cur >= BASE && cur < ts && (cur - BASE) % 2 === 1) {
      if (!revealedRef.current.has(cur)) {
        setRevealed((prev) => new Set(prev).add(cur));
        return;
      }
    }
    const total = totalRef.current;
    const next = (((cur + dir) % total) + total) % total;
    setSwapping(true);
    setOutIdx(cur);
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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") advance(1);
      if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const onPrev = useCallback(() => advance(-1), [advance]);
  const onNext = useCallback(() => advance(1), [advance]);

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <div className={slides.viewport}>
      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>
          {/* ── Fixed slides ─────────────────────────────────────── */}
          <TitleSlide cls={cc(0)} />
          <HalfwaySlide cls={cc(1)} />
          <WhatIsPlaytestSlide cls={cc(2)} />
          <DemosSlide cls={cc(3)} demos={demos} />
          <SuperlativesTeaserSlide cls={cc(4)} />
          <LoopTitleSlide cls={cc(5)} />
          <DinoCostumeSlide cls={cc(6)} />
          <DinoInstructionsSlide cls={cc(7)} />
          <DinoCongratulationsSlide cls={cc(8)} />
          <LoopTitleSlide cls={cc(9)} />
          <AllSuperlativesSlide cls={cc(10)} count={superlatives.length} />
          {/* ── Dynamic superlative pairs ────────────────────────── */}
          {superlatives.flatMap((s, i) => [
            <SuperlativeTitleSlide
              key={`st${i}`}
              cls={cc(supStart + i * 2)}
              superlative={s.title}
            />,
            <SuperlativeWinnerSlide
              key={`sw${i}`}
              cls={cc(supStart + i * 2 + 1)}
              superlative={s.title}
              winner={s.winner}
              revealed={revealed.has(supStart + i * 2 + 1)}
            />,
          ])}
          {/* ── Tail slides ───────────────────────────────────────── */}
          <DemoersThankYouSlide cls={cc(tailStart)} />
          <HostSlide cls={cc(tailStart + 1)} />
          <SponsorsSlide cls={cc(tailStart + 2)} />
          <CommunityPartnersSlide cls={cc(tailStart + 3)} />
          <ClosingSlide cls={cc(tailStart + 4)} qrs={qrs} />
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
          <span>
            Playtest Night &middot; 6:00 PM &middot; Zelifcam
          </span>
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

export default function PlaytestNightPage() {
  return (
    <>
      <span
        className={FONT_TRIGGER_CLASS}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <PlaytestRuntime />
      </Suspense>
    </>
  );
}
