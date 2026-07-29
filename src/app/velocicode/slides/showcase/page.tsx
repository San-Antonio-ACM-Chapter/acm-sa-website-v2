"use client";

import {
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
import sc from "./showcase.module.css";
import { SHOWCASE_MUSIC } from "./showcase-music";
import { SHOWCASE_PHOTOS } from "./showcase-photos";

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
  caveat.className,
  elite.className,
  dmMono.className,
].join(" ");

// Crowd Favorite announced first (lowest stakes), Best Overall last (top billing)
const CATEGORIES = [
  { id: "crowd", label: "Crowd Favorite" },
  { id: "theme", label: "Best Use of Theme" },
  { id: "overall", label: "Best Overall" },
] as const;

type CatId = (typeof CATEGORIES)[number]["id"];
type Game = { title: string; team: string; url: string };
type Organizer = { name: string; role: string };
type Winner = { name: string; game: string };

type SlideSpec =
  | { kind: "title" }
  | { kind: "thank-you" }
  | { kind: "sponsors" }
  | { kind: "partners" }
  | { kind: "who-made-it" }
  | { kind: "gallery" }
  | { kind: "photos" }
  | { kind: "venue-thanks" }
  | { kind: "awards-intro" }
  | { kind: "award-title"; catLabel: string }
  | {
      kind: "award-winner";
      catLabel: string;
      placeLabel: string;
      winner: Winner | null;
    }
  | { kind: "closing" };

function getPlaceLabel(total: number, rank: number, catLabel: string): string {
  // rank is 1-indexed. rank=1 is the top winner.
  if (total <= 1) return catLabel;
  if (total === 2) return rank === 1 ? catLabel : "Runner-Up";
  // 3+: rank=1 gets catLabel, others get ordinal
  if (rank === 1) return catLabel;
  if (rank === 2) return "2nd Place";
  if (rank === 3) return "3rd Place";
  return `${rank}th Place`;
}

function buildSpecs(
  games: Game[],
  _organizers: Organizer[],
  categoryWinners: Record<CatId, Winner[]>,
): SlideSpec[] {
  const specs: SlideSpec[] = [
    { kind: "title" },
    { kind: "sponsors" },
    { kind: "partners" },
    { kind: "who-made-it" },
    ...(games.length > 0 ? [{ kind: "gallery" as const }] : []),
    ...(SHOWCASE_PHOTOS.length > 0 ? [{ kind: "photos" as const }] : []),
    { kind: "venue-thanks" },
    { kind: "thank-you" },
  ];

  const anyWinners = CATEGORIES.some(
    (cat) => (categoryWinners[cat.id] ?? []).length > 0,
  );
  if (anyWinners) specs.push({ kind: "awards-intro" });

  for (const cat of CATEGORIES) {
    const ws = categoryWinners[cat.id] ?? [];
    specs.push({ kind: "award-title", catLabel: cat.label });

    if (ws.length === 0) {
      // No winners configured — show placeholder
      specs.push({
        kind: "award-winner",
        catLabel: cat.label,
        placeLabel: cat.label,
        winner: null,
      });
    } else if (ws.length === 1) {
      specs.push({
        kind: "award-winner",
        catLabel: cat.label,
        placeLabel: cat.label,
        winner: ws[0],
      });
    } else {
      // Announce from last place to first (runner-up → winner)
      for (let i = ws.length - 1; i >= 0; i--) {
        specs.push({
          kind: "award-winner",
          catLabel: cat.label,
          placeLabel: getPlaceLabel(ws.length, i + 1, cat.label),
          winner: ws[i],
        });
      }
    }
  }

  specs.push({ kind: "closing" });
  return specs;
}

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

// ── Slides ────────────────────────────────────────────────────────

function TitleSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 160px",
        }}
      >
        <div className={kf.kfStagger} style={{ textAlign: "center" }}>
          <div>
            {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
            <img
              src="/velocicode-logo.png"
              alt="VelociCode"
              style={{ width: 130, marginBottom: 36 }}
            />
          </div>
          <div>
            <Eyebrow color="var(--vc-mustard)">VelociCode 2026</Eyebrow>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 170,
              color: "var(--vc-cream)",
              lineHeight: 0.86,
              textShadow: "7px 7px 0 var(--vc-rust)",
              margin: "18px 0 28px",
            }}
          >
            SHOWCASE
          </div>
          <div
            style={{
              fontFamily: elite.style.fontFamily,
              fontSize: 30,
              color: "var(--vc-sand)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            August 1, 2026
          </div>
          <div style={{ marginTop: 24, opacity: 0.75 }}>
            {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
            <img
              src="/velocicode/StMU-logo-white.png"
              alt="St. Mary's University"
              style={{ width: 200 }}
            />
          </div>
          <div
            style={{
              fontFamily: elite.style.fontFamily,
              fontSize: 22,
              color: "var(--vc-sand)",
              opacity: 0.45,
              letterSpacing: "0.14em",
              marginTop: 16,
            }}
          >
            Moody Life Sciences
          </div>
        </div>
      </div>
    </div>
  );
}

function ThankYouIntroSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-clay)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 160px",
          textAlign: "center",
        }}
      >
        <div className={kf.kfStagger}>
          <div>
            <Eyebrow color="var(--vc-cream)">Community</Eyebrow>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 150,
              color: "var(--vc-cream)",
              lineHeight: 0.86,
              textShadow: "6px 6px 0 var(--vc-rust)",
              margin: "16px 0 28px",
            }}
          >
            THANK YOU
          </div>
          <div
            style={{
              fontFamily: elite.style.fontFamily,
              fontSize: 36,
              color: "var(--vc-sand)",
              letterSpacing: "0.12em",
              lineHeight: 1.5,
              maxWidth: 860,
            }}
          >
            None of this happens without our incredible sponsors and community
            partners.
          </div>
        </div>
      </div>
    </div>
  );
}

function VenueThanksSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-clay)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 160px",
          textAlign: "center",
        }}
      >
        <div className={kf.kfStagger}>
          <div>
            <Eyebrow color="var(--vc-cream)">Our Venue</Eyebrow>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 150,
              color: "var(--vc-cream)",
              lineHeight: 0.86,
              textShadow: "6px 6px 0 var(--vc-rust)",
              margin: "16px 0 32px",
            }}
          >
            THANK YOU
          </div>
          <div style={{ marginBottom: 16, opacity: 0.88 }}>
            {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
            <img
              src="/velocicode/StMU-logo-white.png"
              alt="St. Mary's University"
              style={{ width: 220 }}
            />
          </div>
          <div
            style={{
              fontFamily: elite.style.fontFamily,
              fontSize: 28,
              color: "var(--vc-sand)",
              letterSpacing: "0.14em",
              opacity: 0.6,
            }}
          >
            Moody Life Sciences
          </div>
        </div>
      </div>
    </div>
  );
}

function SponsorsSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 120px 100px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(245,200,0,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className={kf.kfStagger}
          style={{ width: "100%", position: "relative", zIndex: 1 }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                fontFamily: elite.style.fontFamily,
                fontSize: 17,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "var(--vc-mustard)",
                opacity: 0.65,
                marginBottom: 14,
              }}
            >
              None of this would be possible without
            </div>
            <div
              style={{
                fontFamily: luckiestGuy.style.fontFamily,
                fontSize: 90,
                color: "var(--vc-cream)",
                lineHeight: 0.88,
                textShadow: "5px 5px 0 var(--vc-rust)",
              }}
            >
              OUR SPONSORS
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {SPONSORS.map((s, i) => (
              <div
                key={s.name}
                className={sc.sponsorCard}
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
                <img
                  src={s.src}
                  alt={s.name}
                  style={{
                    width: 220,
                    height: 110,
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PartnersSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(160deg, var(--vc-leaf-shadow) 0%, #0a1a0d 60%, var(--vc-ink) 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 120px 100px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(90,179,72,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className={kf.kfStagger}
          style={{ width: "100%", position: "relative", zIndex: 1 }}
        >
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div
              style={{
                fontFamily: elite.style.fontFamily,
                fontSize: 17,
                letterSpacing: "0.36em",
                textTransform: "uppercase",
                color: "var(--vc-leaf-far)",
                opacity: 0.65,
                marginBottom: 14,
              }}
            >
              Shoutout to our
            </div>
            <div
              style={{
                fontFamily: luckiestGuy.style.fontFamily,
                fontSize: 90,
                color: "var(--vc-cream)",
                lineHeight: 0.88,
                textShadow: "5px 5px 0 var(--vc-leaf-shadow)",
              }}
            >
              COMMUNITY PARTNERS
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 28,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {COMMUNITY_PARTNERS.map((p, i) => (
              <div
                key={p.name}
                className={sc.partnerCard}
                style={{
                  animationDelay: `${i * 0.6}s`,
                  background: "var(--vc-cream)",
                  border: "2.5px solid rgba(32,24,12,0.15)",
                  boxShadow: "4px 4px 0 rgba(0,0,0,0.25)",
                }}
              >
                {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
                <img
                  src={p.src}
                  alt={p.name}
                  style={{
                    width: 160,
                    height: 72,
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhoMadeItHappenSlide({
  cls,
  organizers,
}: {
  cls: string;
  organizers: Organizer[];
}) {
  const display =
    organizers.length > 0
      ? organizers
      : [{ name: "The VelociCode Team", role: "" }];

  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-bark)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 160px",
          textAlign: "center",
        }}
      >
        <div
          className={kf.kfStagger}
          style={{ width: "100%", position: "relative", zIndex: 1 }}
        >
          <div>
            <Eyebrow color="var(--vc-mustard)">Behind the scenes</Eyebrow>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 90,
              color: "var(--vc-cream)",
              lineHeight: 0.88,
              margin: "14px 0 12px",
              textShadow: "4px 4px 0 rgba(0,0,0,0.3)",
            }}
          >
            WHO MADE IT HAPPEN
          </div>
          <div
            style={{
              fontFamily: caveat.style.fontFamily,
              fontSize: 40,
              color: "var(--vc-mustard)",
              transform: "rotate(-1deg)",
              marginBottom: 44,
              opacity: 0.8,
            }}
          >
            thank you for making VelociCode 2026 possible
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 24,
              justifyContent: "center",
            }}
          >
            {display.map((o, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: stable list
                key={i}
                style={{
                  background: "rgba(248,237,204,0.08)",
                  border: "2px solid rgba(248,237,204,0.18)",
                  padding: "20px 38px",
                }}
              >
                <div
                  style={{
                    fontFamily: luckiestGuy.style.fontFamily,
                    fontSize: 38,
                    color: "var(--vc-cream)",
                    marginBottom: o.role ? 6 : 0,
                  }}
                >
                  {o.name}
                </div>
                {o.role && (
                  <div
                    style={{
                      fontFamily: elite.style.fontFamily,
                      fontSize: 16,
                      color: "var(--vc-mustard)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {o.role}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GallerySlide({
  cls,
  games,
  qrs,
}: {
  cls: string;
  games: Game[];
  qrs: Map<string, string | null>;
}) {
  const CARD_W = 500;
  const GAP = 28;
  const duped = games.length > 0 ? [...games, ...games] : [];
  const singleSetWidth = games.length * (CARD_W + GAP);
  const duration = Math.max(24, games.length * 5);

  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-cream)",
          display: "flex",
          flexDirection: "column",
          padding: "60px 0 100px",
          overflow: "hidden",
        }}
      >
        {/* Centered header — clear of the brand logo at top-left */}
        <div
          className={kf.kfStagger}
          style={{ textAlign: "center", padding: "0 80px", marginBottom: 40 }}
        >
          <div>
            <div
              style={{
                fontFamily: elite.style.fontFamily,
                fontSize: 18,
                color: "var(--vc-rust)",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Game Submissions
            </div>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 74,
              color: "var(--vc-ink)",
              lineHeight: 0.88,
            }}
          >
            ALL GAMES
          </div>
        </div>

        {/* Stamp — sits below the slide counter (top:30px right:40px) */}
        <div
          style={{
            position: "absolute",
            top: 88,
            right: 80,
            transform: "rotate(9deg)",
            textAlign: "center",
            border: "3px solid var(--vc-rust)",
            boxShadow: "inset 0 0 0 3px var(--vc-rust)",
            padding: "10px 18px",
            opacity: 0.82,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: rubikDirt.style.fontFamily,
              fontSize: 96,
              color: "var(--vc-rust)",
              lineHeight: 1,
            }}
          >
            {String(games.length).padStart(2, "0")}
          </div>
          <div
            style={{
              fontFamily: elite.style.fontFamily,
              fontSize: 14,
              color: "var(--vc-rust)",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginTop: -4,
            }}
          >
            GAMES
          </div>
        </div>

        {games.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: elite.style.fontFamily,
              fontSize: 28,
              color: "var(--vc-rust)",
              letterSpacing: "0.14em",
              opacity: 0.5,
            }}
          >
            No submissions configured.
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background:
                  "linear-gradient(to right, var(--vc-cream), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 100,
                background:
                  "linear-gradient(to left, var(--vc-cream), transparent)",
                zIndex: 2,
                pointerEvents: "none",
              }}
            />
            <div
              className={sc.galleryTrack}
              style={
                {
                  "--gallery-duration": `${duration}s`,
                  paddingLeft: `${GAP}px`,
                  alignItems: "stretch",
                  width: `${singleSetWidth * 2 + GAP}px`,
                } as React.CSSProperties
              }
            >
              {duped.map((g, i) => {
                const qr = g.url ? (qrs.get(g.url) ?? null) : null;
                return (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: duplicated carousel
                    key={i}
                    style={{
                      width: CARD_W,
                      flexShrink: 0,
                      background: "var(--vc-paper)",
                      border: "3px solid var(--vc-ink)",
                      boxShadow: "7px 7px 0 var(--vc-ink)",
                      padding: "36px 40px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: luckiestGuy.style.fontFamily,
                        fontSize: 38,
                        color: "var(--vc-ink)",
                        lineHeight: 1.1,
                        textAlign: "center",
                      }}
                    >
                      {g.title}
                    </div>
                    <div
                      style={{
                        fontFamily: elite.style.fontFamily,
                        fontSize: 18,
                        color: "var(--vc-rust)",
                        letterSpacing: "0.14em",
                        textAlign: "center",
                      }}
                    >
                      {g.team}
                    </div>
                    {/* Fixed-height QR area — same size regardless of QR presence */}
                    <div
                      style={{
                        marginTop: 10,
                        height: 150,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 10,
                      }}
                    >
                      {qr && (
                        <>
                          <div
                            className={slides.scan}
                            style={{
                              border: "2px solid var(--vc-ink)",
                              padding: 4,
                              background: "#fff",
                            }}
                          >
                            <QRImg src={qr} size={100} />
                          </div>
                          <div
                            style={{
                              fontFamily: dmMono.style.fontFamily,
                              fontSize: 13,
                              color: "var(--vc-rust)",
                              opacity: 0.6,
                            }}
                          >
                            scan to play
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const POLAROID_ROTATIONS = [
  -7, 5, -3, 11, -8, 4, -12, 6, -2, 9, -5, 13, 3, -10, 7, -4,
];
const POLAROID_Y_OFFSETS = [
  0, -28, 20, -14, 32, -20, 10, -36, 24, -8, 36, -30, 14, -22, 18, -6,
];
const POLAROID_IMG_W = 280;
const POLAROID_IMG_H = 210;
const POLAROID_W = POLAROID_IMG_W + 24; // 12px padding each side
const POLAROID_GAP = 20;

function PolaroidCarouselSlide({ cls }: { cls: string }) {
  const photos = SHOWCASE_PHOTOS;
  const duped = [...photos, ...photos];
  const singleSetW = photos.length * (POLAROID_W + POLAROID_GAP);
  const duration = Math.max(20, photos.length * 5);

  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-ink)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 100,
            background: "linear-gradient(to right, var(--vc-ink), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: 100,
            background: "linear-gradient(to left, var(--vc-ink), transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          className={sc.photoCarouselTrack}
          style={
            {
              "--photo-duration": `${duration}s`,
              paddingLeft: `${POLAROID_GAP}px`,
              width: `${singleSetW * 2 + POLAROID_GAP}px`,
            } as React.CSSProperties
          }
        >
          {duped.map((filename, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: duplicated carousel
              key={i}
              style={{
                flexShrink: 0,
                width: POLAROID_W,
                background: "#fff",
                padding: `12px 12px 52px`,
                boxShadow:
                  "3px 6px 20px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.3)",
                transform: `rotate(${POLAROID_ROTATIONS[i % POLAROID_ROTATIONS.length]}deg) translateY(${POLAROID_Y_OFFSETS[i % POLAROID_Y_OFFSETS.length]}px)`,
              }}
            >
              {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
              <img
                src={`/showcase-photos/${filename}`}
                alt=""
                style={{
                  width: POLAROID_IMG_W,
                  height: POLAROID_IMG_H,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Award slides (playtest-night style) ───────────────────────────

function AwardsIntroSlide({ cls }: { cls: string }) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--vc-ink)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(245,200,0,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          className={kf.kfStagger}
          style={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          <div>
            {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
            <img
              src="/velocicode-logo.png"
              alt="VelociCode"
              style={{
                width: 120,
                marginBottom: 28,
                filter: "drop-shadow(0 4px 16px rgba(245,200,0,0.3))",
              }}
            />
          </div>
          <div>
            <div
              style={{
                fontFamily: elite.style.fontFamily,
                fontSize: 22,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--vc-mustard)",
                opacity: 0.75,
                marginBottom: 12,
              }}
            >
              Now time for
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: luckiestGuy.style.fontFamily,
                fontSize: 160,
                color: "var(--vc-cream)",
                lineHeight: 0.88,
                textShadow: "7px 7px 0 var(--vc-rust)",
              }}
            >
              THE AWARDS!
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                gap: 20,
                justifyContent: "center",
                marginTop: 52,
              }}
            >
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    border: "2px solid rgba(245,230,194,0.35)",
                    padding: "12px 32px",
                    fontFamily: elite.style.fontFamily,
                    fontSize: 17,
                    color: "var(--vc-cream)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    opacity: 0.65,
                  }}
                >
                  {cat.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AwardTitleSlide({ cls, label }: { cls: string; label: string }) {
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
          gap: "16px",
          textAlign: "center",
          padding: "0 140px",
        }}
      >
        <div
          style={{
            fontFamily: elite.style.fontFamily,
            fontSize: "22px",
            letterSpacing: ".32em",
            textTransform: "uppercase",
            color: "rgba(245,198,0,.5)",
          }}
        >
          Award
        </div>
        <div
          style={{
            fontFamily: luckiestGuy.style.fontFamily,
            fontSize: label.length > 14 ? "120px" : "160px",
            lineHeight: ".82",
            color: "#f5e6c2",
            textShadow: "5px 5px 0 #f5c800, 10px 10px 0 rgba(0,0,0,.45)",
            transform: "rotate(-1deg)",
          }}
        >
          {label.toUpperCase()}
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

function AwardWinnerSlide({
  cls,
  catLabel,
  placeLabel,
  winner,
  revealed,
}: {
  cls: string;
  catLabel: string;
  placeLabel: string;
  winner: Winner | null;
  revealed: boolean;
}) {
  // placeLabel differs from catLabel when announcing runner-up / ordinal positions
  const isTopWinner = placeLabel === catLabel;

  return (
    <div className={cls} style={{ background: "#f5c800" }}>
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
            fontFamily: elite.style.fontFamily,
            fontSize: "24px",
            letterSpacing: ".28em",
            textTransform: "uppercase",
            color: "rgba(32,24,12,.55)",
          }}
        >
          {catLabel}
        </div>
        <div
          style={{
            fontFamily: luckiestGuy.style.fontFamily,
            fontSize: "36px",
            letterSpacing: ".1em",
            color: "rgba(32,24,12,.5)",
            textTransform: "uppercase",
          }}
        >
          {isTopWinner ? "and the winner is…" : placeLabel.toLowerCase()}
        </div>
        <div>
          <div
            className={revealed ? kf.winnerRevealed : kf.winnerHidden}
            style={{
              fontFamily: rubikDirt.style.fontFamily,
              fontSize: "148px",
              lineHeight: ".85",
              color: "var(--vc-leaf-deep)",
              textShadow: "5px 5px 0 rgba(0,0,0,.15)",
            }}
          >
            {winner?.name || "???"}
          </div>
          {winner?.game && revealed && (
            <div
              style={{
                fontFamily: caveat.style.fontFamily,
                fontSize: "42px",
                color: "rgba(32,24,12,.6)",
                marginTop: 8,
              }}
            >
              {winner.game}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const PRIMARY_QRS = [
  {
    key: "site",
    url: "https://acmsa.org",
    label: "acmsa.org",
    sub: "Events & Info",
  },
  {
    key: "jam",
    url: "https://itch.io/jam/velocicode-2",
    label: "itch.io/jam/velocicode-2",
    sub: "Submissions",
  },
  {
    key: "feedback",
    url: "https://forms.gle/geCT5WJSKxsttsXD9",
    label: "Feedback Form",
    sub: "Feedback",
  },
] as const;

const SECONDARY_QRS = [
  {
    key: "insta",
    url: "https://www.instagram.com/acmsanantonio/",
    label: "@acmsanantonio",
    sub: "Follow ACM SA",
  },
  {
    key: "ggs",
    url: "https://www.instagram.com/greatergamingsociety/",
    label: "@greatergamingsociety",
    sub: "Follow GGS",
  },
  {
    key: "join",
    url: "https://buy.stripe.com/eVadUebiM1ejbFS000",
    label: "Join ACM SA",
    sub: "Membership",
  },
] as const;

export type ClosingQrKey =
  | (typeof PRIMARY_QRS)[number]["key"]
  | (typeof SECONDARY_QRS)[number]["key"];

function ClosingSlide({
  cls,
  qrs,
}: {
  cls: string;
  qrs: Record<string, string | null>;
}) {
  return (
    <div className={cls}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg, var(--vc-leaf-deep) 0%, var(--vc-ink) 60%)",
          display: "flex",
          alignItems: "center",
          padding: "80px 100px 100px 120px",
          gap: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 35% 50%, rgba(90,179,72,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Left: heading + 3 primary QRs */}
        <div
          className={kf.kfStagger}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <Eyebrow color="var(--vc-mustard)">See you next time</Eyebrow>
          </div>
          <div
            style={{
              fontFamily: luckiestGuy.style.fontFamily,
              fontSize: 110,
              color: "var(--vc-cream)",
              lineHeight: 0.88,
              textShadow: "5px 5px 0 var(--vc-leaf-shadow)",
              margin: "12px 0 10px",
            }}
          >
            THANKS FOR PLAYING
          </div>
          <div
            style={{
              fontFamily: caveat.style.fontFamily,
              fontSize: 42,
              color: "var(--vc-mustard)",
              transform: "rotate(-1.5deg)",
              marginBottom: 40,
            }}
          >
            VelociCode 2026 · Expedition 02
          </div>
          <div
            style={{
              width: 320,
              height: 2,
              background: "rgba(245,198,0,0.22)",
              marginBottom: 36,
            }}
          />
          <div style={{ display: "flex", gap: 40 }}>
            {PRIMARY_QRS.map(({ key, label, sub }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  className={slides.scan}
                  style={{
                    padding: 13,
                    background: "#fff",
                    border: "3px solid #20180c",
                  }}
                >
                  <QRImg src={qrs[key] ?? null} size={160} />
                </div>
                <div
                  style={{
                    fontFamily: dmMono.style.fontFamily,
                    fontSize: 13,
                    color: "var(--vc-cream)",
                    opacity: 0.7,
                    letterSpacing: "0.03em",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: elite.style.fontFamily,
                    fontSize: 13,
                    color: "var(--vc-mustard)",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    opacity: 0.85,
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 2,
            alignSelf: "stretch",
            background: "rgba(245,198,0,0.16)",
            margin: "60px 70px",
            flexShrink: 0,
          }}
        />

        {/* Right rail: 3 secondary QRs stacked */}
        <div
          className={kf.kfStagger}
          style={{
            width: 190,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            gap: 32,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {SECONDARY_QRS.map(({ key, label, sub }) => {
            if (key === "join") {
              return (
                <div
                  key={key}
                  style={{
                    transform: "rotate(2.5deg)",
                    background: "var(--vc-mustard)",
                    border: "3px solid var(--vc-ink)",
                    boxShadow: "5px 5px 0 var(--vc-ink)",
                    padding: "14px 16px 16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    width: 168,
                  }}
                >
                  <div
                    style={{
                      fontFamily: luckiestGuy.style.fontFamily,
                      fontSize: 21,
                      color: "var(--vc-ink)",
                      lineHeight: 1.05,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Join ACM SA
                  </div>
                  <div
                    style={{
                      fontFamily: elite.style.fontFamily,
                      fontSize: 12,
                      color: "var(--vc-ink)",
                      opacity: 0.65,
                      letterSpacing: "0.1em",
                      marginBottom: 8,
                    }}
                  >
                    scan to join
                  </div>
                  <div
                    style={{
                      padding: 6,
                      background: "#fff",
                      border: "2px solid var(--vc-ink)",
                    }}
                  >
                    <QRImg src={qrs[key] ?? null} size={118} />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                }}
              >
                <div
                  style={{
                    padding: 9,
                    background: "#fff",
                    border: "2px solid rgba(245,230,194,0.4)",
                    boxShadow: "4px 4px 0 rgba(0,0,0,0.4)",
                  }}
                >
                  <QRImg src={qrs[key] ?? null} size={112} />
                </div>
                <div
                  style={{
                    fontFamily: dmMono.style.fontFamily,
                    fontSize: 12,
                    color: "var(--vc-cream)",
                    opacity: 0.75,
                    letterSpacing: "0.03em",
                    textAlign: "center",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: elite.style.fontFamily,
                    fontSize: 11,
                    color: "var(--vc-mustard)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    opacity: 0.75,
                    textAlign: "center",
                  }}
                >
                  {sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Runtime ───────────────────────────────────────────────────────

function ShowcaseRuntime() {
  const params = useSearchParams();

  const games: Game[] = [];
  for (let i = 1; i <= 60; i++) {
    const t = params.get(`g${i}t`);
    if (!t) break;
    games.push({
      title: t,
      team: params.get(`g${i}a`) ?? "",
      url: params.get(`g${i}u`) ?? "",
    });
  }

  const organizers: Organizer[] = [];
  for (let i = 1; i <= 30; i++) {
    const n = params.get(`o${i}n`);
    if (!n) break;
    organizers.push({ name: n, role: params.get(`o${i}r`) ?? "" });
  }

  const categoryWinners: Record<CatId, Winner[]> = {
    theme: [],
    overall: [],
    crowd: [],
  };
  for (const cat of CATEGORIES) {
    for (let i = 1; i <= 5; i++) {
      const name = params.get(`${cat.id}w${i}`);
      if (!name) break;
      categoryWinners[cat.id].push({
        name,
        game: params.get(`${cat.id}g${i}`) ?? "",
      });
    }
  }

  const musicEnabled = params.get("music") !== "0";
  const fadeDuration = Math.max(
    0.5,
    Math.min(10, Number(params.get("mfade") ?? 4)),
  );
  const shuffleTracks = params.get("mshuffle") === "1";
  const monParam = params.get("mon");
  const enabledIndices = monParam
    ? new Set(monParam.split(",").map(Number))
    : new Set(SHOWCASE_MUSIC.map((_, i) => i));
  const activeTracks = SHOWCASE_MUSIC.filter((_, i) =>
    enabledIndices.has(i),
  ).map((t) => `/velocicode/music/${t.file}.${t.type ?? "mp3"}`);
  const hasTracks = musicEnabled && activeTracks.length > 0;

  const specs = buildSpecs(games, organizers, categoryWinners);
  const TOTAL = specs.length;

  const [idx, setIdx] = useState(0);
  const [outIdx, setOutIdx] = useState(-1);
  const [inIdx, setInIdx] = useState(-1);
  const [swapping, setSwapping] = useState(false);
  const [scale, setScale] = useState(1);
  const [qrs, setQrs] = useState<Map<string, string | null>>(new Map());
  const [closingQrs, setClosingQrs] = useState<Record<string, string | null>>({
    site: null,
    jam: null,
    feedback: null,
    insta: null,
    ggs: null,
    join: null,
  });
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);

  const swappingRef = useRef(false);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef = useRef(0);
  const revealedRef = useRef<Set<number>>(new Set());
  const specsRef = useRef(specs);
  const totalRef = useRef(TOTAL);
  const reducedRef = useRef(false);
  const audioARef = useRef<HTMLAudioElement>(null);
  const audioBRef = useRef<HTMLAudioElement>(null);
  const activeSlotRef = useRef<0 | 1>(0);
  const trackIdxRef = useRef(0);
  const fadingRef = useRef(false);
  const fadeIntRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const volumeRef = useRef(0.15);
  const playingRef = useRef(false);

  specsRef.current = specs;
  totalRef.current = TOTAL;

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);
  useEffect(() => {
    revealedRef.current = revealed;
  }, [revealed]);
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    const update = () =>
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const urls = games.filter((g) => g.url).map((g) => g.url);
    if (!urls.length) return;
    Promise.all(
      urls.map(async (url) => {
        const src = await makeQR(url, 6);
        return [url, src] as [string, string | null];
      }),
    ).then((pairs) => setQrs(new Map(pairs)));
  }, []);

  useEffect(() => {
    const all = [...PRIMARY_QRS, ...SECONDARY_QRS];
    Promise.all(
      all.map(async ({ key, url }) => {
        const src = await makeQR(url, 200);
        return [key, src] as [string, string | null];
      }),
    ).then((pairs) => setClosingQrs(Object.fromEntries(pairs)));
  }, []);

  useEffect(() => {
    volumeRef.current = volume;
    if (!fadingRef.current) {
      const audio =
        activeSlotRef.current === 0 ? audioARef.current : audioBRef.current;
      if (audio) audio.volume = volume;
    }
  }, [volume]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: activeTracks/fadeDuration/shuffleTracks are stable from URL params
  useEffect(() => {
    if (!hasTracks) return;
    const audioA = audioARef.current;
    const audioB = audioBRef.current;
    if (!audioA || !audioB) return;

    audioA.src = activeTracks[0];
    audioA.volume = volumeRef.current;
    activeSlotRef.current = 0;
    trackIdxRef.current = 0;

    const startCrossfade = () => {
      if (fadingRef.current) return;
      fadingRef.current = true;
      const curSlot = activeSlotRef.current;
      const nxtSlot: 0 | 1 = curSlot === 0 ? 1 : 0;
      const curAudio = curSlot === 0 ? audioA : audioB;
      const nxtAudio = nxtSlot === 0 ? audioA : audioB;
      const nextIdx = shuffleTracks
        ? Math.floor(Math.random() * activeTracks.length)
        : (trackIdxRef.current + 1) % activeTracks.length;
      nxtAudio.src = activeTracks[nextIdx];
      nxtAudio.volume = 0;
      if (playingRef.current) nxtAudio.play().catch(() => {});
      const STEP_MS = 50;
      const totalSteps = Math.max(1, (fadeDuration * 1000) / STEP_MS);
      let step = 0;
      if (fadeIntRef.current) clearInterval(fadeIntRef.current);
      fadeIntRef.current = setInterval(() => {
        step++;
        const t = Math.min(1, step / totalSteps);
        curAudio.volume = (1 - t) * volumeRef.current;
        nxtAudio.volume = t * volumeRef.current;
        if (t >= 1) {
          if (fadeIntRef.current) clearInterval(fadeIntRef.current);
          curAudio.pause();
          curAudio.src = "";
          activeSlotRef.current = nxtSlot;
          trackIdxRef.current = nextIdx;
          fadingRef.current = false;
        }
      }, STEP_MS);
    };

    const checkTime = () => {
      const cur = activeSlotRef.current === 0 ? audioA : audioB;
      if (fadingRef.current || !cur.duration) return;
      if (cur.currentTime >= cur.duration - fadeDuration) startCrossfade();
    };

    audioA.addEventListener("timeupdate", checkTime);
    audioB.addEventListener("timeupdate", checkTime);

    return () => {
      audioA.removeEventListener("timeupdate", checkTime);
      audioB.removeEventListener("timeupdate", checkTime);
      audioA.pause();
      audioB.pause();
      if (fadeIntRef.current) clearInterval(fadeIntRef.current);
    };
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const cur = idxRef.current;
    const spec = specsRef.current[cur];

    if (
      dir === 1 &&
      spec?.kind === "award-winner" &&
      !revealedRef.current.has(cur)
    ) {
      setRevealed((prev) => new Set(prev).add(cur));
      return;
    }

    const total = totalRef.current;
    const next = Math.max(0, Math.min(total - 1, cur + dir));
    if (next === cur) return;

    swappingRef.current = true;
    setSwapping(true);
    setOutIdx(cur);
    setInIdx(next);
    setIdx(next);

    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    const dur = reducedRef.current ? 60 : 500;
    swapTimerRef.current = setTimeout(() => {
      swappingRef.current = false;
      setSwapping(false);
      setOutIdx(-1);
      setInIdx(-1);
    }, dur);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") advance(1);
      else if (e.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const onPrev = useCallback(() => advance(-1), [advance]);
  const onNext = useCallback(() => advance(1), [advance]);

  const toggleAudio = useCallback(async () => {
    const audio =
      activeSlotRef.current === 0 ? audioARef.current : audioBRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      playingRef.current = false;
      setPlaying(false);
    } else {
      try {
        await audio.play();
        playingRef.current = true;
        setPlaying(true);
      } catch {
        /* autoplay blocked */
      }
    }
  }, [playing]);

  const cc = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <div className={slides.viewport}>
      {hasTracks && (
        <>
          {/* biome-ignore lint/a11y/useMediaCaption: background ambient music */}
          <audio ref={audioARef} preload="auto" />
          {/* biome-ignore lint/a11y/useMediaCaption: background ambient music */}
          <audio ref={audioBRef} preload="auto" />
        </>
      )}

      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>
          {specs.map((spec, i) => {
            const cls = cc(i);
            switch (spec.kind) {
              case "title":
                return <TitleSlide key="title" cls={cls} />;
              case "thank-you":
                return <ThankYouIntroSlide key="thank-you" cls={cls} />;
              case "sponsors":
                return <SponsorsSlide key="sponsors" cls={cls} />;
              case "partners":
                return <PartnersSlide key="partners" cls={cls} />;
              case "who-made-it":
                return (
                  <WhoMadeItHappenSlide
                    key="who-made-it"
                    cls={cls}
                    organizers={organizers}
                  />
                );
              case "gallery":
                return (
                  <GallerySlide
                    key="gallery"
                    cls={cls}
                    games={games}
                    qrs={qrs}
                  />
                );
              case "photos":
                return <PolaroidCarouselSlide key="photos" cls={cls} />;
              case "venue-thanks":
                return <VenueThanksSlide key="venue-thanks" cls={cls} />;
              case "awards-intro":
                return <AwardsIntroSlide key="awards-intro" cls={cls} />;
              case "award-title":
                return (
                  <AwardTitleSlide
                    // biome-ignore lint/suspicious/noArrayIndexKey: spec index is stable (from URL params)
                    key={`at-${i}`}
                    cls={cls}
                    label={spec.catLabel}
                  />
                );
              case "award-winner":
                return (
                  <AwardWinnerSlide
                    // biome-ignore lint/suspicious/noArrayIndexKey: spec index is stable (from URL params)
                    key={`aw-${i}`}
                    cls={cls}
                    catLabel={spec.catLabel}
                    placeLabel={spec.placeLabel}
                    winner={spec.winner}
                    revealed={revealed.has(i)}
                  />
                );
              case "closing":
                return (
                  <ClosingSlide key="closing" cls={cls} qrs={closingQrs} />
                );
              default:
                return null;
            }
          })}
        </div>

        <div className={slides.brand}>
          {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
          <img
            src="/velocicode-logo.png"
            className={slides.brandImg}
            alt="VelociCode"
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
            Showcase &middot; Aug 1 &middot; St. Mary&apos;s University
          </span>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk */}
        <div className={slides.zoneLeft} onClick={onPrev} />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk */}
        <div className={slides.zoneRight} onClick={onNext} />

        {hasTracks && (
          <>
            <input
              type="range"
              min={0}
              max={0.3}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
              aria-label="Music volume"
              style={{
                position: "absolute",
                right: 44,
                bottom: 184,
                width: 70,
                accentColor: "var(--vc-mustard)",
                cursor: "pointer",
                zIndex: 9,
              }}
            />
            <button
              type="button"
              className={slides.pause}
              onClick={toggleAudio}
              aria-label={playing ? "Pause music" : "Play music"}
            >
              {playing ? "❙❙" : "►"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  return (
    <>
      <span
        className={FONT_TRIGGER_CLASS}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <ShowcaseRuntime />
      </Suspense>
    </>
  );
}
