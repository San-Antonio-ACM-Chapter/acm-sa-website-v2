"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import kf from "../kickoff/kickoff.module.css";
import {
  cardCls,
  Eyebrow,
  makeQR,
  QRImg,
  useSlideNav,
} from "../kickoff/slide-utils";
import { SlideFrame } from "../SlideFrame";
import { SLIDE_FONT_CLASSES } from "../slide-fonts";
import slides from "../slides.module.css";

const TOTAL = 8;

// ── Slide 0: Title ────────────────────────────────────────────────────

function TitleSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-ink)",
        backgroundImage:
          "radial-gradient(ellipse 1100px 600px at 0% 100%,#1e601640,transparent 70%),radial-gradient(ellipse 800px 500px at 100% 0%,#5a3a1833,transparent 70%)",
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
          gap: "18px",
          textAlign: "center",
          padding: "0 140px 78px",
        }}
      >
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "20px",
            letterSpacing: ".3em",
            textTransform: "uppercase" as const,
            color: "rgba(245,200,0,.65)",
            border: "1.5px dashed rgba(245,200,0,.28)",
            padding: "10px 28px",
            transform: "rotate(-.3deg)",
          }}
        >
          VelociCode &middot; Expedition 02 &times; Judge Briefing
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "180px",
            lineHeight: ".78",
            color: "#f5e6c2",
            textShadow: "6px 6px 0 #f5c800, 13px 13px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
          }}
        >
          THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "#f5c800",
            }}
          >
            JUDGE.
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-mono)",
            fontSize: "26px",
            color: "rgba(245,230,194,.55)",
            marginTop: "16px",
          }}
        >
          Everything you need before the clock starts.
        </div>
      </div>
    </div>
  );
}

// ── Slide 1: Your Role ────────────────────────────────────────────────

function RoleSlide({ cls }: { cls: string }) {
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
          padding: "0 110px 78px",
        }}
      >
        <Eyebrow>What you&apos;re deciding</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          TWO{" "}
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
            display: "flex",
            gap: "32px",
            alignItems: "stretch",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "var(--vc-ink)",
              border: "2.5px solid var(--vc-ink)",
              boxShadow: "7px 7px 0 var(--vc-leaf-deep)",
              padding: "32px 30px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "52px",
                lineHeight: "1",
                color: "var(--vc-mustard)",
              }}
            >
              01
            </span>
            <div
              style={{
                fontFamily: "var(--vc-font-display-3)",
                fontSize: "34px",
                lineHeight: "1.05",
                color: "var(--vc-mustard)",
              }}
            >
              Overall Winner
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "16px",
                letterSpacing: ".14em",
                textTransform: "uppercase" as const,
                color: "rgba(245,200,0,.5)",
                borderBottom: "2px dashed rgba(245,200,0,.2)",
                paddingBottom: "14px",
              }}
            >
              Ranked choice &middot; aggregated by Jury
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-mono)",
                fontSize: "22px",
                lineHeight: "1.55",
                color: "var(--vc-paper)",
              }}
            >
              You rank every project you see by preference. All judge rankings
              are combined — the project that consistently ranks highest wins.
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "var(--vc-cream)",
              border: "2.5px solid var(--vc-ink)",
              boxShadow: "7px 7px 0 var(--vc-clay)",
              padding: "32px 30px 36px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "52px",
                lineHeight: "1",
                color: "var(--vc-leaf-deep)",
              }}
            >
              02
            </span>
            <div
              style={{
                fontFamily: "var(--vc-font-display-3)",
                fontSize: "34px",
                lineHeight: "1.05",
                color: "var(--vc-ink)",
              }}
            >
              Best Use of Theme
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "16px",
                letterSpacing: ".14em",
                textTransform: "uppercase" as const,
                color: "var(--vc-rust)",
                borderBottom: "2px dashed var(--vc-clay)",
                paddingBottom: "14px",
              }}
            >
              Star advocacy &middot; decided by the judges
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-mono)",
                fontSize: "22px",
                lineHeight: "1.55",
                color: "var(--vc-ink)",
              }}
            >
              After visiting a project, star it in Jury if you feel it
              especially nailed the theme. Stars are your vote of advocacy — the
              most-starred project wins.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 2: The Criteria ─────────────────────────────────────────────

const CRITERIA = [
  {
    n: "01",
    cat: "Gameplay & Fun",
    text: "Is the game enjoyable to actually play? Look for mechanics that feel good and a loop that makes you want to keep going.",
    rotate: "-1deg",
  },
  {
    n: "02",
    cat: "Creativity & Originality",
    text: "Does the game bring a fresh idea, twist, or combination we haven't seen before? Reward surprise over safe, familiar execution.",
    rotate: ".6deg",
  },
  {
    n: "03",
    cat: "Execution & Polish",
    text: "Does the game run smoothly and feel complete, not held together with tape? Consider whether art, audio, and UI work together as a cohesive whole.",
    rotate: "-1.2deg",
  },
  {
    n: "04",
    cat: "Theme Integration",
    text: "How well does the game bring the theme to life? Look for it woven into mechanics or story, not just slapped on as a reskin.",
    rotate: ".9deg",
  },
];

function CriteriaSlide({ cls }: { cls: string }) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-ink)",
        backgroundImage:
          "radial-gradient(ellipse 1100px 600px at 0% 100%,#1e601640,transparent 70%),radial-gradient(ellipse 800px 500px at 100% 0%,#5a3a1833,transparent 70%)",
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
          padding: "52px 110px 96px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">Lenses, not a checklist</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "88px",
            lineHeight: ".86",
            color: "var(--vc-paper)",
          }}
        >
          THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            CRITERIA.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "22px",
            alignItems: "stretch",
          }}
        >
          {CRITERIA.map(({ n, cat, text, rotate }) => (
            <div
              key={n}
              style={{
                flex: 1,
                background: "var(--vc-cream)",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: "6px 6px 0 var(--vc-clay)",
                padding: "22px 20px 26px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                transform: `rotate(${rotate})`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "42px",
                  lineHeight: "1",
                  color: "var(--vc-leaf-deep)",
                }}
              >
                {n}
              </span>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "24px",
                  lineHeight: "1.1",
                  color: "var(--vc-ink)",
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  color: "var(--vc-ink)",
                  marginTop: "4px",
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            fontFamily: "var(--vc-font-stamp)",
            fontSize: "18px",
            letterSpacing: ".1em",
            textTransform: "uppercase" as const,
            color: "rgba(245,230,194,.38)",
          }}
        >
          Use these to inform your thinking &mdash; you are not scoring each
          category
        </div>
      </div>
    </div>
  );
}

// ── Slide 3: The Clock ────────────────────────────────────────────────

function ClockSlide({ cls }: { cls: string }) {
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
          padding: "60px 110px 96px",
        }}
      >
        <Eyebrow color="var(--vc-rust)">Judging window</Eyebrow>
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
            CLOCK.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "stretch",
            marginTop: "4px",
          }}
        >
          {(
            [
              { label: "Judging opens", value: "11:15", sub: "AM" },
              { label: "Per table", value: "7", sub: "minutes" },
              { label: "Hard cutoff", value: "1:00", sub: "PM sharp" },
            ] as const
          ).map(({ label, value, sub }) => (
            <div
              key={label}
              style={{
                flex: 1,
                background: "var(--vc-paper)",
                border: "2.5px solid var(--vc-ink)",
                boxShadow: "7px 7px 0 var(--vc-ink)",
                padding: "24px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "16px",
                  letterSpacing: ".18em",
                  textTransform: "uppercase" as const,
                  color: "var(--vc-rust)",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "100px",
                  lineHeight: ".88",
                  color: "var(--vc-leaf-deep)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "28px",
                  color: "var(--vc-ink)",
                  marginTop: "4px",
                }}
              >
                {sub}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
            marginTop: "4px",
          }}
        >
          <div
            style={{
              fontFamily: "var(--vc-font-mono)",
              fontSize: "22px",
              lineHeight: "1.5",
              color: "var(--vc-ink)",
              flex: 1,
            }}
          >
            Every team should be seen by at least 3 of the 5 judges. Jury
            handles distribution automatically — just keep hitting Next Project
            and the system does the rest.
          </div>
          <div
            style={{
              flex: "none",
              background: "var(--vc-ink)",
              color: "var(--vc-mustard)",
              fontFamily: "var(--vc-font-stamp)",
              fontSize: "18px",
              letterSpacing: ".1em",
              textTransform: "uppercase" as const,
              padding: "18px 26px",
              boxShadow: "5px 5px 0 var(--vc-rust)",
              maxWidth: "460px",
              lineHeight: "1.65",
            }}
          >
            Jury auto-shuts at 1:00 PM &mdash; no extensions, no exceptions
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 4: The Flow ─────────────────────────────────────────────────

function FlowSlide({ cls }: { cls: string }) {
  const steps = [
    {
      n: "01",
      text: "Open jury.acmsa.org and log in with the code from your email",
    },
    {
      n: "02",
      text: 'Tap "Next Project" — note the project name and table number',
    },
    {
      n: "03",
      text: 'Walk to the table · tap "Start Judging" when ready · 7-min timer starts',
    },
    {
      n: "04",
      text: "Let them present — engage, ask questions, play the game",
    },
    {
      n: "05",
      text: 'Tap "Done" &rarr; add notes &rarr; ★ star if they especially nailed the theme',
    },
    {
      n: "06",
      text: "Drag the project into your ranked list on the dashboard, then repeat",
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
          gap: "18px",
          padding: "0 110px 78px",
        }}
      >
        <Eyebrow>Step by step</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          HOW IT{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            RUNS.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          {steps.map(({ n, text }) => (
            <div
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                padding: "14px 20px",
                background: "var(--vc-paper)",
                border: "2px solid var(--vc-ink)",
                boxShadow: "3px 3px 0 var(--vc-ink)",
              }}
            >
              <span
                style={{
                  flex: "none",
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "36px",
                  lineHeight: "1",
                  color: "var(--vc-mustard)",
                  width: "52px",
                  textAlign: "center" as const,
                }}
              >
                {n}
              </span>
              <div
                style={{
                  width: "2px",
                  height: "28px",
                  background: "rgba(32,24,12,.12)",
                  flex: "none",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "22px",
                  lineHeight: "1.4",
                  color: "var(--vc-ink)",
                }}
                // biome-ignore lint/security/noDangerouslySetInnerHtml: static string with known HTML entities
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Slide 5: Ranking = Overall ────────────────────────────────────────

function RankingSlide({ cls }: { cls: string }) {
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
          gap: "24px",
          padding: "0 110px 78px",
        }}
      >
        <Eyebrow color="var(--vc-leaf-deep)">Overall Winner</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "88px",
            lineHeight: ".86",
            color: "var(--vc-ink)",
          }}
        >
          RANK WHAT{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-leaf-deep)",
            }}
          >
            YOU SEE.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "36px",
            alignItems: "start",
            marginTop: "8px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "18px" }}
          >
            {[
              "After each visit, drag the project into your ranked list on the dashboard — best at the top.",
              "You don't have to rank everything at once. Update your list as you see more projects and your thinking evolves.",
              "At the end, all judge rankings are combined. The project that consistently ranks highest wins Overall.",
            ].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "22px",
                  lineHeight: "1.5",
                  color: "var(--vc-ink)",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    marginTop: "9px",
                    width: "10px",
                    height: "10px",
                    background: "var(--vc-leaf-deep)",
                    transform: "rotate(45deg)",
                  }}
                />
                {text}
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--vc-paper)",
              border: "2.5px solid var(--vc-ink)",
              boxShadow: "7px 7px 0 var(--vc-ink)",
              padding: "20px 22px",
              display: "flex",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <div
              style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "14px",
                letterSpacing: ".18em",
                textTransform: "uppercase" as const,
                color: "var(--vc-rust)",
                marginBottom: "12px",
              }}
            >
              Your Ranked Projects
            </div>
            {[
              { pos: "1", name: "Project Alpha" },
              { pos: "2", name: "Project Beta" },
              { pos: "3", name: "Project Gamma" },
            ].map(({ pos, name }) => (
              <div
                key={pos}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px 14px",
                  borderBottom: "1.5px solid rgba(32,24,12,.1)",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    width: "32px",
                    height: "32px",
                    background:
                      pos === "1"
                        ? "var(--vc-leaf-deep)"
                        : pos === "2"
                          ? "var(--vc-bark)"
                          : "rgba(32,24,12,.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--vc-font-display-1)",
                    fontSize: "18px",
                    color: pos === "3" ? "var(--vc-ink)" : "var(--vc-cream)",
                  }}
                >
                  {pos}
                </span>
                <span
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "22px",
                    color: "var(--vc-ink)",
                    flex: 1,
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    flex: "none",
                    color: "rgba(32,24,12,.3)",
                    fontSize: "20px",
                    fontFamily: "var(--vc-font-mono)",
                    lineHeight: "1",
                  }}
                >
                  &#x283F;
                </span>
              </div>
            ))}
            <div
              style={{
                padding: "12px 14px",
                fontFamily: "var(--vc-font-mono)",
                fontSize: "17px",
                color: "rgba(32,24,12,.38)",
                borderTop: "2px dashed rgba(32,24,12,.12)",
                marginTop: "2px",
              }}
            >
              + unranked projects
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 6: Stars = Best Use of Theme ───────────────────────────────

function StarsSlide({ cls }: { cls: string }) {
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
          gap: "26px",
          padding: "0 110px 78px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">Best Use of Theme</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
            lineHeight: ".86",
            color: "var(--vc-cream)",
          }}
        >
          STAR THE{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            BEST.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            gap: "52px",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              fontSize: "200px",
              lineHeight: "1",
              color: "var(--vc-mustard)",
              textShadow: "6px 6px 0 rgba(0,0,0,.4)",
              flex: "none",
              userSelect: "none",
            }}
          >
            ★
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {[
              'After finishing a project, you can star it in the "Done" popup or from your dashboard.',
              "A star is not about who's winning overall — it's specific advocacy for the theme. Star the games that genuinely lived inside it.",
              "The projects with the most stars across all judges win Best Use of Theme.",
            ].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "23px",
                  lineHeight: "1.5",
                  color: "rgba(245,230,194,.9)",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    marginTop: "9px",
                    width: "10px",
                    height: "10px",
                    background: "var(--vc-mustard)",
                    transform: "rotate(45deg)",
                  }}
                />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Slide 7: Log In ───────────────────────────────────────────────────

function LoginSlide({
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
        background: "var(--vc-ink)",
        backgroundImage:
          "radial-gradient(ellipse 1100px 600px at 0% 100%,#1e601640,transparent 70%),radial-gradient(ellipse 800px 500px at 100% 0%,#5a3a1833,transparent 70%)",
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
          padding: "0 110px 78px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">You&apos;re ready</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
            lineHeight: ".86",
            color: "var(--vc-paper)",
          }}
        >
          LOG{" "}
          <span
            style={{
              fontFamily: "var(--vc-font-display-2)",
              color: "var(--vc-mustard)",
            }}
          >
            IN.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "52px",
            alignItems: "center",
            marginTop: "8px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "22px" }}
          >
            <div
              style={{
                background: "var(--vc-mustard)",
                border: "2.5px solid rgba(245,200,0,.5)",
                boxShadow: "7px 7px 0 rgba(0,0,0,.4)",
                padding: "22px 28px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "34px",
                  color: "var(--vc-ink)",
                }}
              >
                jury.acmsa.org
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "16px",
                  letterSpacing: ".14em",
                  textTransform: "uppercase" as const,
                  color: "rgba(32,24,12,.55)",
                }}
              >
                Open on your phone now
              </div>
            </div>
            {[
              "Check your email — your login link and code are already there.",
              "The link in the email fills in your code automatically. Just tap login.",
              "If the link doesn't work, go to jury.acmsa.org and enter your code manually.",
            ].map((text) => (
              <div
                key={text}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "22px",
                  lineHeight: "1.5",
                  color: "rgba(245,230,194,.8)",
                }}
              >
                <span
                  style={{
                    flex: "none",
                    marginTop: "9px",
                    width: "9px",
                    height: "9px",
                    background: "var(--vc-mustard)",
                    transform: "rotate(45deg)",
                  }}
                />
                {text}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              className={slides.scan}
              style={{
                padding: "18px",
                background: "#fff",
                border: "3px solid var(--vc-mustard)",
              }}
            >
              <QRImg src={qrs.jury ?? null} size={220} />
            </div>
            <div
              style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "18px",
                letterSpacing: ".14em",
                textTransform: "uppercase" as const,
                color: "rgba(245,200,0,.65)",
              }}
            >
              jury.acmsa.org
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Runtime ───────────────────────────────────────────────────────────

function JudgesRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [qrs, setQrs] = useState<Record<string, string | null>>({});

  useEffect(() => {
    (async () => {
      const [jury] = await Promise.all([makeQR("https://jury.acmsa.org", 300)]);
      setQrs({ jury });
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
      footerRight="Judge Briefing · Aug 1, 2026"
      onPrev={onPrev}
      onNext={onNext}
    >
      <TitleSlide cls={cc(0)} />
      <RoleSlide cls={cc(1)} />
      <CriteriaSlide cls={cc(2)} />
      <ClockSlide cls={cc(3)} />
      <FlowSlide cls={cc(4)} />
      <RankingSlide cls={cc(5)} />
      <StarsSlide cls={cc(6)} />
      <LoginSlide cls={cc(7)} qrs={qrs} />
    </SlideFrame>
  );
}

export default function JudgesPage() {
  return (
    <>
      <span
        className={SLIDE_FONT_CLASSES}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <JudgesRuntime />
      </Suspense>
    </>
  );
}
