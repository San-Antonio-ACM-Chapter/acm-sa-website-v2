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
  QRImg,
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

const REMAINING = deriveSlideEvents(
  STOPS.filter((s) => s.date > "2026-07-22T18:00"),
  ["kickoff"],
);

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

// ── Runtime ───────────────────────────────────────────────────────────

function FinalSprintRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [qrs, setQrs] = useState<Record<string, string | null>>({});

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
      footerRight="Final Sprint Workshop · 6:00 PM · Geekdom 3rd Floor"
      onPrev={onPrev}
      onNext={onNext}
      autoplay={{ progress, paused, onTogglePause }}
    >
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
    </SlideFrame>
  );
}

export default function FinalSprintPage() {
  return (
    <>
      <span
        className={SLIDE_FONT_CLASSES}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <FinalSprintRuntime />
      </Suspense>
    </>
  );
}
