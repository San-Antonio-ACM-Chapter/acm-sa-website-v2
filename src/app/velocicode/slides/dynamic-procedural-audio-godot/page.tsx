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
  VelociCodeSlide,
} from "../shared-slides";
import { SLIDE_FONT_CLASSES } from "../slide-fonts";
import slides from "../slides.module.css";

const SPEAKER_WERNER = {
  name: "Werner",
  role: "Audio & Game Developer",
  img: "/velocicode/werner.jpeg",
};

const TEASER = "What if Godot didn't just play audio...it made it?";

const REMAINING = [
  ...deriveSlideEvents(STOPS).filter((ev) => {
    const t = ev.title.toLowerCase();
    return (
      !t.includes("dynamic") &&
      !t.includes("playtest") &&
      !t.includes("final sprint") &&
      !t.includes("powering up") &&
      !t.includes("mayhem") &&
      !t.includes("ggs social")
    );
  }),
  {
    dow: "Sat",
    day: "1",
    mon: "Aug",
    title: "Showcase",
    sub: "St. Mary's University, Moody Life Sciences · 11:00 AM",
    medium: "In-Person",
    tagStyle: { background: "#1e6016", color: "#f5e6c2" },
  },
];

const TOTAL = 12;

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
          VelociCode · Expedition 02 &times; Black Potion
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
          DYNAMIC &amp;
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "155px",
            lineHeight: ".82",
            color: "#f5e6c2",
            textShadow: "6px 6px 0 #f5c800, 13px 13px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
          }}
        >
          PROCEDURAL
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-2)",
            fontSize: "88px",
            lineHeight: ".9",
            color: "#f5c800",
            transform: "rotate(-1deg)",
          }}
        >
          AUDIO IN GODOT.
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
          <span>Thu Jul 16, 2026 &middot; 6:00 PM</span>
          <span style={{ opacity: 0.35 }}>&#10022;</span>
          <span>Black Potion</span>
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
            fontFamily: "var(--vc-font-hand)",
            fontSize: "58px",
            color: "var(--vc-ink)",
            opacity: 0.75,
            transform: "rotate(-1deg)",
            marginTop: "8px",
          }}
        >
          {TEASER}
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: Speaker ──────────────────────────────────────────────────

function SpeakerSlide({ cls }: { cls: string }) {
  const s = SPEAKER_WERNER;
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
        <Eyebrow>Your host tonight</Eyebrow>
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
            SPEAKER.
          </span>
        </div>
        <div
          className={slides.float}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "22px",
            background: "var(--vc-paper)",
            border: "4px solid var(--vc-ink)",
            borderRadius: "20px",
            padding: "44px 100px",
            boxShadow: "8px 8px 0 var(--vc-ink)",
            transform: "rotate(-1deg)",
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: kiosk slide, fixed-size layout */}
          <img
            src={s.img}
            alt={s.name}
            style={{
              width: "200px",
              height: "200px",
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
                fontSize: "48px",
                lineHeight: "1",
                color: "var(--vc-ink)",
              }}
            >
              {s.name}
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-mono)",
                fontSize: "24px",
                color: "var(--vc-rust)",
                marginTop: "9px",
              }}
            >
              {s.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 4: Handoff ──────────────────────────────────────────────────

function HandoffSlide({ cls }: { cls: string }) {
  const s = SPEAKER_WERNER;
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
          Alright &mdash; over to our speaker
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
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              background: "rgba(245,198,0,.1)",
              border: "1.5px solid rgba(245,198,0,.28)",
              padding: "12px 32px",
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
                fontSize: "28px",
                letterSpacing: ".1em",
                color: "#f5e6c2",
              }}
            >
              {s.name}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 5: Playtest Night (Tomorrow) ────────────────────────────────

function PlaytestSlide({ cls }: { cls: string }) {
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
        <Eyebrow>Tomorrow &middot; Thu Jul 17</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "128px",
            lineHeight: ".84",
            color: "var(--vc-ink)",
          }}
        >
          PLAYTEST{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-clay)",
            }}
          >
            NIGHT.
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
          Bring your game, bring your pals, get some live feedback, win a prize.
          Don&apos;t have a game? Join the dinosaur contest!
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
            ["Zelifcam", false],
            ["6:00 PM", false],
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
            src="/alamo-tech-collective.png"
            alt="Alamo Tech Collective"
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
            Alamo Tech Collective
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: Final Sprint Workshop ────────────────────────────────────

function FinalSprintSlide({ cls }: { cls: string }) {
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
          Coming up &middot; Tue Jul 22
        </Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "105px",
            lineHeight: ".84",
            color: "var(--vc-cream)",
          }}
        >
          FINAL SPRINT{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            WORKSHOP.
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
          Get eyes on your project from seasoned developers. All games and tools
          are welcome — come get feedback and push your build forward.
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
            ["6:00 PM", false],
            ["Hybrid", true],
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
            src="/unreal-engine-sa.png"
            alt="Unreal Engine SA"
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
            Unreal Engine San Antonio
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

// ── Slide 8: Thank You, Host ──────────────────────────────────────────

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
            fontSize: "96px",
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
            BLACK POTION.
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
            src="/velocicode/black-potion-logo.png"
            alt="Black Potion"
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

// ── Runtime ───────────────────────────────────────────────────────────

function GodotAudioRuntime() {
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

  const { idx, outIdx, inIdx, swapping, scale, onPrev, onNext } = useSlideNav({
    total: TOTAL,
    wrap: true,
    initialIdx,
  });

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <SlideFrame
      scale={scale}
      idx={idx}
      total={TOTAL}
      footerRight="Dynamic & Procedural Audio in Godot · 6:00 PM · Black Potion"
      onPrev={onPrev}
      onNext={onNext}
    >
      <TitleSlide cls={cc(0)} />
      <AboutSlide cls={cc(1)} />
      <SpeakerSlide cls={cc(2)} />
      <VelociCodeSlide cls={cc(3)} />
      <HandoffSlide cls={cc(4)} />
      <PlaytestSlide cls={cc(5)} />
      <FinalSprintSlide cls={cc(6)} />
      <ScheduleSlide cls={cc(7)} />
      <HostSlide cls={cc(8)} />
      <SponsorsSlide cls={cc(9)} />
      <CommunityPartnersSlide cls={cc(10)} />
      <ClosingSlide cls={cc(11)} qrs={qrs} />
    </SlideFrame>
  );
}

export default function GodotAudioPage() {
  return (
    <>
      <span
        className={SLIDE_FONT_CLASSES}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <GodotAudioRuntime />
      </Suspense>
    </>
  );
}
