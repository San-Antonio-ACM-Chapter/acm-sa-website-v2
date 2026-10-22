"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { STOPS } from "../../events";
import kf from "../kickoff/kickoff.module.css";
import {
  cardCls,
  deriveSlideEvents,
  Eyebrow,
  makeQR,
  useSlideNav,
} from "../kickoff/slide-utils";
import { SlideFrame } from "../SlideFrame";
import {
  ClosingSlide,
  CommunityPartnersSlide,
  SponsorsSlide,
} from "../shared-slides";
import { SLIDE_FONT_CLASSES } from "../slide-fonts";
import slides from "../slides.module.css";

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

const AGENDA = [
  "UE5 feature updates — what's new this season",
  "Streamlining your workflow with starter templates",
  "Free resources to power your VelociCode build",
  "Arduino controller integration demo",
  "FAB asset giveaways",
];

const REMAINING = deriveSlideEvents(STOPS).filter(
  (ev) => !ev.title.toLowerCase().includes("powering up"),
);

const TOTAL = 11;
const SLIDE_DURATION = 15;

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
          POWERING UP
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
          WITH UE5.
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
          <span>Tue Jul 8, 2026 &middot; 6:00 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>Online</span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 1: About ────────────────────────────────────────────────────

function AboutSlide({ cls }: { cls: string }) {
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
        <Eyebrow>{"Tonight's session"}</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "106px",
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
          {AGENDA.map((item, i) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "22px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "28px",
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

// ── Slide 2: Speakers ─────────────────────────────────────────────────

function SpeakersSlide({ cls }: { cls: string }) {
  const speakers = [SPEAKER_JONATHAN, SPEAKER_RICK];
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
          {"MEET THE "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            SPEAKERS.
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
          {speakers.map((s, i) => (
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
            "San Antonio's month-long game jam. July 1–30. Make a game, compete for prizes, and connect with the local dev community."
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
  const speakers = [SPEAKER_JONATHAN, SPEAKER_RICK];
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
          Alright &mdash; over to our speakers
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
          {speakers.map((s) => (
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

// ── Slide 5: Mayhem ───────────────────────────────────────────────────

function MayhemSlide({ cls }: { cls: string }) {
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
        <Eyebrow>Coming up &middot; Sat Jul 11</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "128px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          SAN ANTONIO{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            MAYHAM.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "var(--vc-ink)",
            maxWidth: "62%",
          }}
        >
          Join the GGS community for a fun evening of low-stakes gaming. No
          pressure &mdash; just good people and good games.
        </div>
        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {[
            ["WulfSpar", false],
            ["Doors · 6:00 PM", false],
            ["Tourney · 6:30 PM", false],
            ["In-Person", true],
          ].map(([label, accent]) => (
            <div
              key={String(label)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: accent
                  ? "var(--vc-leaf-deep)"
                  : "var(--vc-mustard)",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "14px",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
          <img
            src="/ggs-logo.png"
            alt="Greater Gaming Society"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "var(--vc-font-stamp)",
              fontSize: "20px",
              letterSpacing: ".14em",
              color: "var(--vc-rust)",
              textTransform: "uppercase",
            }}
          >
            Greater Gaming Society
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: GGS Social Hour ──────────────────────────────────────────

function GGSSocialSlide({ cls }: { cls: string }) {
  return (
    <div className={cls} style={{ background: "var(--vc-leaf-deep)" }}>
      <div className={slides.contour} style={{ zIndex: 0, opacity: 0.06 }} />
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
        <Eyebrow color="var(--vc-mustard)">
          Coming up &middot; Tue Jul 14
        </Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "128px",
            lineHeight: ".84",
            color: "var(--vc-cream)",
          }}
        >
          GGS{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            SOCIAL HOUR.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "30px",
            lineHeight: "1.6",
            color: "rgba(245,230,194,.85)",
            maxWidth: "62%",
          }}
        >
          The monthly Greater Gaming Society social hour &mdash; every 2nd
          Tuesday of the month. Meet people, swap handles, talk games.
        </div>
        <div
          style={{
            display: "flex",
            gap: "18px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {[
            ["Shenanigans Gaming LLC", false],
            ["7:00 PM", false],
            ["In-Person", true],
          ].map(([label, accent]) => (
            <div
              key={String(label)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: accent
                  ? "var(--vc-mustard)"
                  : "rgba(245,230,194,.12)",
                color: accent ? "var(--vc-leaf-deep)" : "var(--vc-cream)",
                padding: "12px 22px",
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "22px",
                letterSpacing: ".1em",
                border: accent
                  ? "2.5px solid var(--vc-mustard)"
                  : "2.5px solid rgba(245,230,194,.35)",
                boxShadow: accent ? "4px 4px 0 rgba(0,0,0,.35)" : "none",
              }}
            >
              {String(label)}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginTop: "14px",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
          <img
            src="/ggs-logo.png"
            alt="Greater Gaming Society"
            style={{
              height: "50px",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
          <span
            style={{
              fontFamily: "var(--vc-font-stamp)",
              fontSize: "20px",
              letterSpacing: ".14em",
              color: "var(--vc-mustard)",
              textTransform: "uppercase",
            }}
          >
            Greater Gaming Society
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Remaining Schedule ───────────────────────────────────────

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
              IN BETWEEN.
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
            the milestones get their own slides &mdash; here&apos;s the rest.
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

// ── Runtime ───────────────────────────────────────────────────────────

function UE5Runtime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [qrs, setQrs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    (async () => {
      const [discord, site] = await Promise.all([
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://acmsa.org/velocicode", 300),
      ]);
      setQrs({ discord, site });
    })();
  }, []);

  const {
    idx,
    outIdx,
    inIdx,
    swapping,
    scale,
    onPrev,
    onNext,
    paused,
    progress,
    onTogglePause,
  } = useSlideNav({
    total: TOTAL,
    wrap: true,
    initialIdx,
    autoplaySec: SLIDE_DURATION,
  });

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <SlideFrame
      scale={scale}
      idx={idx}
      total={TOTAL}
      footerRight="Powering Up with UE5 · 6:00 PM · Online"
      onPrev={onPrev}
      onNext={onNext}
      autoplay={{ progress, paused, onTogglePause }}
    >
      <TitleSlide cls={cc(0)} />
      <AboutSlide cls={cc(1)} />
      <SpeakersSlide cls={cc(2)} />
      <VelociCodeSlide cls={cc(3)} />
      <HandoffSlide cls={cc(4)} />
      <MayhemSlide cls={cc(5)} />
      <GGSSocialSlide cls={cc(6)} />
      <ScheduleSlide cls={cc(7)} />
      <SponsorsSlide cls={cc(8)} />
      <CommunityPartnersSlide cls={cc(9)} />
      <ClosingSlide cls={cc(10)} qrs={qrs} />
    </SlideFrame>
  );
}

export default function UE5Page() {
  return (
    <>
      <span
        className={SLIDE_FONT_CLASSES}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <UE5Runtime />
      </Suspense>
    </>
  );
}
