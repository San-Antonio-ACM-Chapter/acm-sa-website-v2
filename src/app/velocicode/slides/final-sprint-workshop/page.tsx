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
import { STOPS } from "../../events";
import kf from "../kickoff/kickoff.module.css";
import {
  deriveSlideEvents,
  Eyebrow,
  makeQR,
  QRImg,
} from "../kickoff/slide-utils";
import slides from "../slides.module.css";

const REMAINING = deriveSlideEvents(
  STOPS.filter((s) => s.date > "2026-07-22T18:00"),
  ["kickoff"],
);

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

const SPEAKER_JONATHAN = {
  name: "Jonathan Perry",
  org: "Ractive",
  role: "Community Organizer",
  img: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-epic/avatars/jonathan_perry.jpeg",
};

const SPEAKER_RICK = {
  name: "Rick Canfield",
  org: "Native Creation",
  role: "Project Manager",
  img: "https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-epic/avatars/richard_canfield.jpg",
};

const TOTAL = 10;
const SLIDE_DURATION = 15;

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
          VelociCode · Expedition 02 &times; Unreal Engine SA
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
          FINAL SPRINT
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
          WORKSHOP.
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
          <span>Wed Jul 22, 2026 &middot; 6:00 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>Geekdom 3rd Floor</span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 1: Hosts ────────────────────────────────────────────────────

function HostsSlide({ cls }: { cls: string }) {
  const hosts = [SPEAKER_JONATHAN, SPEAKER_RICK];
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
          alignItems: "center",
          gap: "36px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>Your hosts tonight</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "104px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
            textAlign: "center",
          }}
        >
          {"MEET YOUR "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            HOSTS.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "80px",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          {hosts.map((s, i) => (
            <div
              key={s.name}
              className={slides.float}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "22px",
                background: "var(--vc-paper)",
                border: "4px solid var(--vc-ink)",
                borderRadius: "20px",
                padding: "44px 70px",
                boxShadow: "8px 8px 0 var(--vc-ink)",
                transform: i === 0 ? "rotate(-1.5deg)" : "rotate(1.2deg)",
                animationDelay: `${i * 0.5}s`,
              }}
            >
              {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "50%",
                  border: "4px solid var(--vc-ink)",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "38px",
                    lineHeight: "1",
                    color: "var(--vc-ink)",
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "22px",
                    color: "var(--vc-rust)",
                    marginTop: "7px",
                  }}
                >
                  {s.role}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-stamp)",
                    fontSize: "18px",
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    color: "var(--vc-bark)",
                    marginTop: "5px",
                  }}
                >
                  {s.org}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: Tonight ─────────────────────────────────────────────────

function TonightSlide({ cls }: { cls: string }) {
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
          gap: "32px",
          padding: "0 140px 78px",
        }}
      >
        <Eyebrow>{"Tonight's session"}</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "106px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          {"HERE TO "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            HELP.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "32px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "820px",
          }}
        >
          Your hosts are here to share tips, work through your project with you,
          and help you get across the finish line.
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "52px",
            color: "var(--vc-rust)",
            transform: "rotate(-1.2deg)",
          }}
        >
          Bring your questions. Bring your builds.
        </div>
      </div>
    </div>
  );
}

// ── Slide 3: VelociCode ───────────────────────────────────────────────

function VelociCodeSlide({ cls }: { cls: string }) {
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

// ── Slide 4: Handoff ──────────────────────────────────────────────────

function HandoffSlide({ cls }: { cls: string }) {
  const hosts = [SPEAKER_JONATHAN, SPEAKER_RICK];
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
      {/* Sticky note: submissions deadline */}
      <div
        style={{
          position: "absolute",
          bottom: "72px",
          left: "80px",
          background: "#f5c800",
          padding: "22px 28px",
          transform: "rotate(-2.5deg)",
          boxShadow: "5px 7px 0 rgba(0,0,0,.45)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-hand)",
            fontSize: "28px",
            lineHeight: 1.4,
            color: "#20180c",
            whiteSpace: "nowrap",
          }}
        >
          Submissions due
          <br />
          Jul 30 · 11:59 PM
        </div>
      </div>

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
          gap: "20px",
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
            color: "rgba(245,198,0,.6)",
          }}
        >
          Alright, over to your hosts
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
          TAKE IT
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "125px",
            lineHeight: ".85",
            color: "#f5c800",
            transform: "rotate(-1deg)",
          }}
        >
          AWAY.
        </div>
        <div
          style={{
            display: "flex",
            gap: "32px",
            marginTop: "16px",
          }}
        >
          {hosts.map((s) => (
            <div
              key={s.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                background: "rgba(245,198,0,.1)",
                border: "1.5px solid rgba(245,198,0,.28)",
                padding: "12px 24px",
              }}
            >
              {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
              <img
                src={s.img}
                alt={s.name}
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "50%",
                  border: "2px solid #f5c800",
                  objectFit: "cover",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "22px",
                  letterSpacing: ".1em",
                  color: "#f5e6c2",
                }}
              >
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 5: Upcoming Events ──────────────────────────────────────────

function ScheduleSlide({ cls }: { cls: string }) {
  return (
    <div className={cls} style={{ background: "var(--vc-sand)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.08 }} />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "54px 120px 92px",
        }}
      >
        <Eyebrow>Field itinerary</Eyebrow>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "40px",
            margin: "12px 0 16px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--vc-font-display-1)",
              fontSize: "72px",
              lineHeight: ".9",
              color: "var(--vc-ink)",
              whiteSpace: "nowrap",
            }}
          >
            EVERYTHING{" "}
            <span
              style={{
                fontFamily: "var(--vc-font-display-2)",
                color: "var(--vc-clay)",
              }}
            >
              STILL AHEAD.
            </span>
          </div>
          <div
            style={{
              fontFamily: "var(--vc-font-hand)",
              fontSize: "24px",
              lineHeight: "1.1",
              color: "var(--vc-rust)",
              transform: "rotate(-1.5deg)",
              maxWidth: "280px",
              textAlign: "right",
              flex: "none",
            }}
          >
            eight days left, make them count.
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {REMAINING.map((ev) => (
            <div
              key={ev.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                padding: "9px 0",
                borderBottom: "2px dashed rgba(140,57,20,.32)",
              }}
            >
              <div
                style={{
                  flex: "none",
                  width: "114px",
                  textAlign: "center",
                  background: "var(--vc-paper)",
                  border: "2.5px solid var(--vc-ink)",
                  boxShadow: "4px 4px 0 var(--vc-ink)",
                  padding: "6px 5px",
                  transform: "rotate(-1.5deg)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--vc-font-stamp)",
                    fontSize: "16px",
                    letterSpacing: ".12em",
                    color: "var(--vc-rust)",
                  }}
                >
                  {ev.dow}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-display-1)",
                    fontSize: "32px",
                    lineHeight: ".9",
                    color: "var(--vc-leaf-deep)",
                  }}
                >
                  {ev.day}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-stamp)",
                    fontSize: "15px",
                    letterSpacing: ".14em",
                    color: "var(--vc-ink)",
                  }}
                >
                  {ev.mon}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "30px",
                    lineHeight: "1.04",
                    color: "var(--vc-ink)",
                  }}
                >
                  {ev.title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "19px",
                    color: "var(--vc-rust)",
                    marginTop: "2px",
                  }}
                >
                  {ev.sub}
                </div>
              </div>
              <div
                style={{
                  flex: "none",
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "16px",
                  letterSpacing: ".12em",
                  textTransform: "uppercase",
                  border: "2px solid var(--vc-ink)",
                  padding: "6px 12px",
                  background: ev.tagStyle.background,
                  color: ev.tagStyle.color,
                }}
              >
                {ev.medium}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: Submissions Due ──────────────────────────────────────────

function SubmissionsDueSlide({
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
        background: "#f5c800",
      }}
    >
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
    </div>
  );
}

// ── Slide 7: Sponsors ─────────────────────────────────────────────────

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

// ── Slide 6: Community Partners ───────────────────────────────────────

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

// ── Slide 7: Closing ──────────────────────────────────────────────────

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

// ── Runtime ───────────────────────────────────────────────────────────

function FinalSprintRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [idx, setIdx] = useState(initialIdx);
  const [outIdx, setOutIdx] = useState(-1);
  const [inIdx, setInIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [scale, setScale] = useState(1);
  const [qrs, setQrs] = useState<Record<string, string | null>>({});

  const pausedRef = useRef(true);
  const swappingRef = useRef(false);
  const idxRef = useRef(initialIdx);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const reducedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
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
      const [discord, site, rsvp] = await Promise.all([
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://acmsa.org/velocicode", 300),
        makeQR("https://forms.gle/6nJLf6T4ab9bYokQ9", 300),
      ]);
      setQrs({ discord, site, rsvp });
    })();
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const next = (((idxRef.current + dir) % TOTAL) + TOTAL) % TOTAL;
    elapsedRef.current = 0;
    lastRef.current = performance.now();
    setSwapping(true);
    setOutIdx(idxRef.current);
    setInIdx(next);
    setIdx(next);
    setProgress(0);
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    const dur = reducedRef.current ? 60 : 500;
    swapTimerRef.current = setTimeout(() => {
      setSwapping(false);
      setOutIdx(-1);
      setInIdx(-1);
      lastRef.current = performance.now();
    }, dur);
  }, []);

  useEffect(() => {
    lastRef.current = performance.now();
    const tick = setInterval(() => {
      if (pausedRef.current || swappingRef.current) {
        lastRef.current = performance.now();
        return;
      }
      const now = performance.now();
      const dt = now - lastRef.current;
      lastRef.current = now;
      elapsedRef.current += dt;
      const dur = SLIDE_DURATION * 1000;
      if (elapsedRef.current >= dur) {
        advance(1);
      } else {
        setProgress(Math.min(1, elapsedRef.current / dur));
      }
    }, 80);
    return () => clearInterval(tick);
  }, [advance]);

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

  const onTogglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPaused((p) => !p);
  }, []);

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <div className={slides.viewport}>
      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>
          <TitleSlide cls={cc(0)} />
          <HostsSlide cls={cc(1)} />
          <TonightSlide cls={cc(2)} />
          <VelociCodeSlide cls={cc(3)} />
          <HandoffSlide cls={cc(4)} />
          <ScheduleSlide cls={cc(5)} />
          <SubmissionsDueSlide cls={cc(6)} qrs={qrs} />
          <SponsorsSlide cls={cc(7)} />
          <CommunityPartnersSlide cls={cc(8)} />
          <ClosingSlide cls={cc(9)} qrs={qrs} />
        </div>

        <div className={slides.progressTrack}>
          <div
            className={slides.progressFill}
            style={{ width: `${progress * 100}%` }}
          />
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
            Final Sprint Workshop &middot; 6:00 PM &middot; Geekdom 3rd Floor
          </span>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk — keyboard handled by window listener */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk — keyboard handled by window listener */}
        <div className={slides.zoneLeft} onClick={onPrev} />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk — keyboard handled by window listener */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk — keyboard handled by window listener */}
        <div className={slides.zoneRight} onClick={onNext} />

        <button
          type="button"
          className={slides.pause}
          onClick={onTogglePause}
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? "►" : "❙❙"}
        </button>
      </div>
    </div>
  );
}

export default function FinalSprintPage() {
  return (
    <>
      <span
        className={FONT_TRIGGER_CLASS}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <FinalSprintRuntime />
      </Suspense>
    </>
  );
}
