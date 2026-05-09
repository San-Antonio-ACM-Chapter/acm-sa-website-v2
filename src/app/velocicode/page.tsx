import type { Metadata } from "next";
import {
  Luckiest_Guy,
  Rubik_Dirt,
  Bowlby_One_SC,
  Caveat_Brush,
  Special_Elite,
  DM_Mono,
} from "next/font/google";
import styles from "./page.module.css";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-luckiest-guy",
  display: "swap",
});
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-rubik-dirt",
  display: "swap",
});
const bowlbyOneSc = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-bowlby",
  display: "swap",
});
const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-caveat",
  display: "swap",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-special-elite",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--vc-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VelociCode — ACM San Antonio",
  description:
    "San Antonio's month-long game jam. One month. One game. No excuses. Hosted by ACM SA and the Greater Gaming Society.",
};

const RSVP_URL = "https://www.meetup.com/acm-sa/events/312892484";

export default function VelociCodePage() {
  const fontVars = [
    luckiestGuy.variable,
    rubikDirt.variable,
    bowlbyOneSc.variable,
    caveatBrush.variable,
    specialElite.variable,
    dmMono.variable,
  ].join(" ");

  return (
    <div className={`${styles.page} ${fontVars}`}>
      {/* ─── SVG SYMBOLS ──────────────────────────────────────────── */}
      <svg
        width="0"
        height="0"
        style={{ position: "absolute" }}
        aria-hidden="true"
      >
        <defs>
          <symbol id="vc-palm" viewBox="0 0 200 320">
            <path
              d="M100 310 C 100 220, 90 140, 60 60 C 50 40, 70 30, 90 50 C 130 110, 140 220, 100 310 Z"
              fill="currentColor"
            />
            <g
              stroke="rgba(0,0,0,0.35)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M98 308 C 95 240, 88 160, 72 60" />
              <path d="M95 240 L 75 220" />
              <path d="M95 240 L 115 230" />
              <path d="M90 200 L 70 175" />
              <path d="M88 200 L 110 188" />
              <path d="M85 160 L 68 138" />
              <path d="M84 160 L 105 148" />
              <path d="M80 120 L 65 102" />
              <path d="M80 120 L 100 110" />
            </g>
          </symbol>

          <symbol id="vc-plane" viewBox="0 0 60 60">
            <path
              d="M30 4 L 36 28 L 36 44 L 32 44 L 30 56 L 28 44 L 24 44 L 24 28 Z"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M4 30 L 24 26 L 24 36 L 4 40 Z"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M56 30 L 36 26 L 36 36 L 56 40 Z"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M22 46 L 30 44 L 38 46 L 38 50 L 22 50 Z"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <circle
              cx="30"
              cy="20"
              r="2.6"
              fill="#cfe6c8"
              stroke="#20180c"
              strokeWidth="1.2"
            />
          </symbol>

          <symbol id="vc-megaphone" viewBox="0 0 64 64">
            <path
              d="M8 26 L 8 38 L 22 38 L 46 50 L 46 14 L 22 26 Z"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M50 26 Q 56 32 50 38"
              fill="none"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect
              x="14"
              y="40"
              width="6"
              height="14"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="2"
            />
          </symbol>

          <symbol id="vc-mic" viewBox="0 0 64 64">
            <rect
              x="26"
              y="10"
              width="12"
              height="26"
              rx="6"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <path
              d="M18 30 Q 18 44 32 44 Q 46 44 46 30"
              fill="none"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="32"
              y1="44"
              x2="32"
              y2="54"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <line
              x1="22"
              y1="54"
              x2="42"
              y2="54"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </symbol>

          <symbol id="vc-compass" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="22"
              fill="#f8edcc"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <polygon
              points="32,14 36,32 32,30 28,32"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="1.5"
            />
            <polygon
              points="32,50 36,32 32,34 28,32"
              fill="#2d5a22"
              stroke="#20180c"
              strokeWidth="1.5"
            />
            <circle cx="32" cy="32" r="2.5" fill="#20180c" />
          </symbol>

          <symbol id="vc-tent" viewBox="0 0 64 64">
            <path
              d="M8 50 L 32 12 L 56 50 Z"
              fill="#f8edcc"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M32 12 L 32 50 L 24 50 L 32 36 L 40 50 L 32 50"
              fill="#20180c"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M2 50 L 62 50"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </symbol>

          <symbol id="vc-medal" viewBox="0 0 64 64">
            <path
              d="M20 8 L 28 30 L 36 30 L 44 8"
              fill="none"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <circle
              cx="32"
              cy="42"
              r="14"
              fill="#f3c637"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <polygon
              points="32,34 35,40 41,41 36,45 38,51 32,48 26,51 28,45 23,41 29,40"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </symbol>

          <symbol id="vc-binoc" viewBox="0 0 64 64">
            <rect
              x="6"
              y="20"
              width="20"
              height="32"
              rx="4"
              fill="#f8edcc"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <rect
              x="38"
              y="20"
              width="20"
              height="32"
              rx="4"
              fill="#f8edcc"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <path
              d="M16 20 L 20 12 L 26 12 L 26 20"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path
              d="M48 20 L 44 12 L 38 12 L 38 20"
              fill="#c44d24"
              stroke="#20180c"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <line
              x1="26"
              y1="34"
              x2="38"
              y2="34"
              stroke="#20180c"
              strokeWidth="2.5"
            />
            <circle cx="16" cy="36" r="3" fill="#20180c" />
            <circle cx="48" cy="36" r="3" fill="#20180c" />
          </symbol>
        </defs>
      </svg>

      {/* ─── NAV ────────────────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles["nav-inner"]}>
          <div className={styles["nav-brand"]}>
            <span className={styles.dot} />
            ACM SAN ANTONIO
          </div>
          <div className={styles["nav-spacer"]} />
          <div className={styles["nav-links"]}>
            <a href="#about">About</a>
            <a href="#schedule">Schedule</a>
            <a href="#involved">Get involved</a>
            <a href="#faq">FAQ</a>
          </div>
          <a
            className={styles["nav-cta"]}
            href={RSVP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP&nbsp;↗
          </a>
        </div>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles["hero-scene"]}>
          <svg
            className="scene"
            viewBox="0 0 1600 950"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          >
            {/* SUN with rays */}
            <g transform="translate(1240 220)">
              <g
                stroke="#f0a830"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              >
                <line x1="0" y1="-180" x2="0" y2="-130" />
                <line x1="120" y1="-130" x2="85" y2="-95" />
                <line x1="180" y1="0" x2="130" y2="0" />
                <line x1="120" y1="130" x2="85" y2="95" />
                <line x1="0" y1="180" x2="0" y2="130" />
                <line x1="-120" y1="130" x2="-85" y2="95" />
                <line x1="-180" y1="0" x2="-130" y2="0" />
                <line x1="-120" y1="-130" x2="-85" y2="-95" />
                <line x1="60" y1="-160" x2="42" y2="-115" />
                <line x1="160" y1="-60" x2="115" y2="-42" />
                <line x1="160" y1="60" x2="115" y2="42" />
                <line x1="60" y1="160" x2="42" y2="115" />
                <line x1="-60" y1="160" x2="-42" y2="115" />
                <line x1="-160" y1="60" x2="-115" y2="42" />
                <line x1="-160" y1="-60" x2="-115" y2="-42" />
                <line x1="-60" y1="-160" x2="-42" y2="-115" />
              </g>
              <circle r="105" fill="#f3c637" stroke="#20180c" strokeWidth="3" />
              <circle
                r="105"
                fill="none"
                stroke="#f0a830"
                strokeWidth="2"
                strokeDasharray="3 8"
                transform="scale(0.85)"
              />
            </g>

            {/* Birds */}
            <g
              stroke="#20180c"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            >
              <path d="M380 220 q 14 -16 28 0 q 14 -16 28 0" />
              <path d="M520 180 q 12 -14 24 0 q 12 -14 24 0" />
              <path d="M280 280 q 10 -12 20 0 q 10 -12 20 0" />
            </g>

            {/* Dotted plane route */}
            <path
              d="M -50 450 Q 250 380 500 460 T 980 380 T 1450 250"
              fill="none"
              stroke="#20180c"
              strokeWidth="3"
              strokeDasharray="4 12"
              opacity="0.55"
            />
            {/* Plane along route */}
            <g transform="translate(1180 290) rotate(-25)">
              <use href="#vc-plane" width="64" height="64" x="-32" y="-32" />
            </g>

            {/* Far hills */}
            <path
              d="M0 660 Q 200 580 400 620 T 800 600 T 1200 620 T 1600 590 L 1600 950 L 0 950 Z"
              fill="#a9c460"
            />
            {/* Mid hills */}
            <path
              d="M0 720 Q 220 660 460 700 T 920 680 T 1380 720 T 1600 690 L 1600 950 L 0 950 Z"
              fill="#6f9a3d"
            />
            {/* Near hills */}
            <path
              d="M0 800 Q 240 740 520 790 T 1020 770 T 1600 800 L 1600 950 L 0 950 Z"
              fill="#2d5a22"
            />
            {/* Foreground ground */}
            <path
              d="M0 880 Q 300 850 600 880 T 1200 880 T 1600 870 L 1600 950 L 0 950 Z"
              fill="#163a10"
            />

            {/* Far palm trees */}
            <g opacity="0.85">
              <g transform="translate(160 660)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-80"
                  stroke="#5a3a18"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <g fill="#2d5a22">
                  <ellipse
                    cx="-22"
                    cy="-82"
                    rx="28"
                    ry="8"
                    transform="rotate(-25 -22 -82)"
                  />
                  <ellipse
                    cx="22"
                    cy="-82"
                    rx="28"
                    ry="8"
                    transform="rotate(25 22 -82)"
                  />
                  <ellipse cx="0" cy="-96" rx="30" ry="8" />
                  <ellipse
                    cx="-26"
                    cy="-72"
                    rx="26"
                    ry="7"
                    transform="rotate(-50 -26 -72)"
                  />
                  <ellipse
                    cx="26"
                    cy="-72"
                    rx="26"
                    ry="7"
                    transform="rotate(50 26 -72)"
                  />
                </g>
              </g>
              <g transform="translate(1430 640)">
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-90"
                  stroke="#5a3a18"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <g fill="#2d5a22">
                  <ellipse
                    cx="-22"
                    cy="-92"
                    rx="28"
                    ry="8"
                    transform="rotate(-25 -22 -92)"
                  />
                  <ellipse
                    cx="22"
                    cy="-92"
                    rx="28"
                    ry="8"
                    transform="rotate(25 22 -92)"
                  />
                  <ellipse cx="0" cy="-108" rx="30" ry="8" />
                  <ellipse
                    cx="-26"
                    cy="-82"
                    rx="26"
                    ry="7"
                    transform="rotate(-50 -26 -82)"
                  />
                  <ellipse
                    cx="26"
                    cy="-82"
                    rx="26"
                    ry="7"
                    transform="rotate(50 26 -82)"
                  />
                </g>
              </g>
            </g>

            {/* Big foreground palm LEFT */}
            <g transform="translate(80 950)">
              <line
                x1="0"
                y1="0"
                x2="20"
                y2="-280"
                stroke="#5a3a18"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <g fill="#2d5a22">
                <ellipse
                  cx="-30"
                  cy="-280"
                  rx="80"
                  ry="22"
                  transform="rotate(-25 -30 -280)"
                />
                <ellipse
                  cx="60"
                  cy="-285"
                  rx="80"
                  ry="22"
                  transform="rotate(25 60 -285)"
                />
                <ellipse cx="20" cy="-310" rx="84" ry="22" />
                <ellipse
                  cx="-50"
                  cy="-260"
                  rx="74"
                  ry="20"
                  transform="rotate(-55 -50 -260)"
                />
                <ellipse
                  cx="80"
                  cy="-260"
                  rx="74"
                  ry="20"
                  transform="rotate(55 80 -260)"
                />
              </g>
              <g fill="#163a10" opacity="0.55">
                <ellipse
                  cx="-20"
                  cy="-282"
                  rx="60"
                  ry="9"
                  transform="rotate(-25 -20 -282)"
                />
                <ellipse
                  cx="55"
                  cy="-287"
                  rx="60"
                  ry="9"
                  transform="rotate(25 55 -287)"
                />
              </g>
            </g>

            {/* Big foreground palm RIGHT */}
            <g transform="translate(1530 950)">
              <line
                x1="0"
                y1="0"
                x2="-30"
                y2="-300"
                stroke="#5a3a18"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <g fill="#2d5a22">
                <ellipse
                  cx="-80"
                  cy="-302"
                  rx="86"
                  ry="22"
                  transform="rotate(-25 -80 -302)"
                />
                <ellipse
                  cx="20"
                  cy="-302"
                  rx="86"
                  ry="22"
                  transform="rotate(25 20 -302)"
                />
                <ellipse cx="-30" cy="-330" rx="90" ry="22" />
                <ellipse
                  cx="-110"
                  cy="-280"
                  rx="78"
                  ry="20"
                  transform="rotate(-55 -110 -280)"
                />
                <ellipse
                  cx="50"
                  cy="-280"
                  rx="78"
                  ry="20"
                  transform="rotate(55 50 -280)"
                />
              </g>
              <g fill="#163a10" opacity="0.55">
                <ellipse
                  cx="-70"
                  cy="-304"
                  rx="60"
                  ry="9"
                  transform="rotate(-25 -70 -304)"
                />
                <ellipse
                  cx="15"
                  cy="-304"
                  rx="60"
                  ry="9"
                  transform="rotate(25 15 -304)"
                />
              </g>
            </g>

            {/* Ferns along the bottom */}
            <g transform="translate(330 920)" fill="#163a10">
              <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
              <ellipse
                cx="20"
                cy="-2"
                rx="22"
                ry="7"
                transform="rotate(30)"
              />
              <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
            </g>
            <g transform="translate(1180 920)" fill="#163a10">
              <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
              <ellipse
                cx="20"
                cy="-2"
                rx="22"
                ry="7"
                transform="rotate(30)"
              />
              <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
            </g>

            {/* Origami Dino */}
            <g transform="translate(1020 800)">
              <ellipse
                cx="0"
                cy="60"
                rx="110"
                ry="11"
                fill="#000"
                opacity="0.25"
              />
              <g transform="translate(-160 -150) scale(0.78)">
                {/* tail */}
                <polygon
                  points="295,205 365,180 360,210 320,225"
                  fill="#6f9a3d"
                />
                <polygon
                  points="320,225 360,210 355,232 330,238"
                  fill="#4f7a2a"
                />
                {/* body */}
                <polygon
                  points="180,160 295,205 230,250 175,220"
                  fill="#4f7a2a"
                />
                <polygon
                  points="180,160 230,250 145,260 130,210"
                  fill="#8aae4f"
                />
                <polygon
                  points="145,260 230,250 200,285 165,285"
                  fill="#a3c265"
                />
                {/* legs */}
                <polygon
                  points="225,245 270,240 260,300 235,290"
                  fill="#4f7a2a"
                />
                <polygon
                  points="245,288 268,285 260,335 248,332"
                  fill="#3d6021"
                />
                <polygon
                  points="248,332 270,332 280,344 246,344"
                  fill="#2f4a18"
                />
                <polygon
                  points="170,260 215,255 205,310 178,302"
                  fill="#6f9a3d"
                />
                <polygon
                  points="188,300 213,298 205,338 192,335"
                  fill="#4f7a2a"
                />
                <polygon
                  points="192,335 215,335 226,346 188,346"
                  fill="#3d6021"
                />
                {/* neck/head */}
                <polygon
                  points="180,160 130,210 110,170 155,135"
                  fill="#6f9a3d"
                />
                <polygon
                  points="155,135 180,160 145,165 130,148"
                  fill="#8aae4f"
                />
                <polygon
                  points="155,135 110,170 70,140 105,108"
                  fill="#4f7a2a"
                />
                <polygon
                  points="105,108 155,135 130,90"
                  fill="#6f9a3d"
                />
                <polygon
                  points="70,140 110,170 35,165 25,142"
                  fill="#8aae4f"
                />
                <polygon
                  points="25,142 35,165 5,158 12,138"
                  fill="#6f9a3d"
                />
                <polygon
                  points="35,165 90,160 80,170 35,170"
                  fill="#3d6021"
                />
                <polygon points="58,168 64,168 62,176" fill="#f4ead0" />
                <polygon points="48,168 53,168 51,175" fill="#f4ead0" />
                <circle cx="80" cy="135" r="5" fill="#20180c" />
                <circle cx="82" cy="133" r="1.5" fill="#f4ead0" />
                {/* arm */}
                <polygon
                  points="160,210 195,220 188,255 168,250"
                  fill="#4f7a2a"
                />
                <polygon
                  points="170,250 192,252 178,272 168,265"
                  fill="#3d6021"
                />
                <polygon points="178,270 184,272 175,280" fill="#f4ead0" />
                {/* crease lines */}
                <g
                  stroke="#f4ead0"
                  strokeWidth="1.2"
                  opacity="0.7"
                  fill="none"
                  strokeLinecap="round"
                >
                  <line x1="180" y1="160" x2="230" y2="250" />
                  <line x1="155" y1="135" x2="180" y2="160" />
                  <line x1="180" y1="160" x2="130" y2="210" />
                  <line x1="225" y1="245" x2="270" y2="240" />
                  <line x1="170" y1="260" x2="215" y2="255" />
                  <line x1="295" y1="205" x2="365" y2="180" />
                  <line x1="105" y1="108" x2="155" y2="135" />
                  <line x1="35" y1="165" x2="70" y2="140" />
                </g>
              </g>
            </g>
          </svg>

          {/* Hero overlay: title + CTAs */}
          <div className={styles["hero-overlay"]}>
            <span className={styles.eyebrow}>
              ★ ACM SA × Greater Gaming Society ★ Expedition 02
            </span>
            <h1 className={styles.wordmark}>
              <span className={styles["wm-veloci"]}>VELOCI</span>
              <span className={styles["wm-code"]}>CODE</span>
              <span className={styles["wm-bang"]}>!</span>
            </h1>
            <div className={styles.tagline}>
              <span className={styles.strike}>a hackathon</span>a month-long
              game jam.
            </div>
            <div className={styles["hero-cta"]}>
              <a
                className={`${styles.btn} ${styles["btn-primary"]}`}
                href={RSVP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                RSVP on Meetup ↗
              </a>
              <a
                className={`${styles.btn} ${styles["btn-yellow"]}`}
                href="#schedule"
              >
                See the route
              </a>
              <a
                className={`${styles.btn} ${styles["btn-jungle"]}`}
                href="#involved"
              >
                Sponsor / mentor
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ─── META STRIP ─────────────────────────────────────────────── */}
      <div className={styles["meta-strip"]}>
        <div className={styles.item}>
          <span className={styles.lbl}>Window</span> Jul 1 → Aug 1
        </div>
        <div className={styles.sep}>✦</div>
        <div className={styles.item}>
          <span className={styles.lbl}>Kickoff</span> Wed Jul 1 · 6 pm
        </div>
        <div className={styles.sep}>✦</div>
        <div className={styles.item}>
          <span className={styles.lbl}>Cost</span> Free · all levels
        </div>
        <div className={styles.sep}>✦</div>
        <div className={styles.item}>
          <span className={styles.lbl}>Made for</span> the SA community
        </div>
      </div>

      {/* ─── MARQUEE ─────────────────────────────────────────────────── */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles["mq-track"]}>
          <span>
            <span>VelociCode 02</span>
            <span className={styles["mq-dot"]} />
            <span>1 month · 1 game · 0 excuses</span>
            <span className={styles["mq-dot"]} />
            <span>Made in San Antonio</span>
            <span className={styles["mq-dot"]} />
            <span>First-timers welcome</span>
            <span className={styles["mq-dot"]} />
          </span>
          <span>
            <span>VelociCode 02</span>
            <span className={styles["mq-dot"]} />
            <span>1 month · 1 game · 0 excuses</span>
            <span className={styles["mq-dot"]} />
            <span>Made in San Antonio</span>
            <span className={styles["mq-dot"]} />
            <span>First-timers welcome</span>
            <span className={styles["mq-dot"]} />
          </span>
        </div>
      </div>

      {/* ─── ABOUT ──────────────────────────────────────────────────── */}
      <section
        className={`${styles.block} ${styles.about}`}
        id="about"
      >
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Field Journal · Entry 01</div>
          <h2 className={styles["section-title"]}>
            One month,{" "}
            <span className={styles.accent}>one game.</span>
            <span className={styles.scribble}>— scrappy on purpose</span>
          </h2>

          <div className={styles["about-grid"]}>
            <div className={styles["about-body"]}>
              <p>
                <span className={styles.hand}>Hello, friend —</span>
                <strong>VelociCode</strong> is San Antonio&apos;s month-long
                game jam. Year one was small and scrappy and full of
                first-timers — so good we couldn&apos;t{" "}
                <em>not</em> do it again. Year two doubles down: a full month
                to build, a community kickoff, mid-jam playtest, and a
                science-fair-style showcase.
              </p>
              <p>
                Hosted by <strong>ACM San Antonio</strong> and the{" "}
                <strong>Greater Gaming Society</strong>, the jam is built for
                the <strong>San Antonio community</strong> — students,
                hobbyists, designers, artists, devs, first-timers. Show up
                solo, find a team, ship something you can hand a controller to.
              </p>
              <p>
                It&apos;s not a hackathon — there&apos;s no all-nighter, no
                exhaustion-as-flex. It&apos;s a month. Make a tiny thing. Make
                it weird. Make it yours.
              </p>
            </div>

            <div>
              <div className={styles.polaroid}>
                <div className={styles["polaroid-img"]}>
                  <svg
                    viewBox="0 0 200 150"
                    preserveAspectRatio="xMidYMid slice"
                  >
                    <rect width="200" height="150" fill="#6f9a3d" />
                    <circle cx="160" cy="35" r="20" fill="#f3c637" />
                    <path
                      d="M0 100 Q 50 80 100 95 T 200 90 L 200 150 L 0 150 Z"
                      fill="#2d5a22"
                    />
                    <path
                      d="M0 120 Q 60 105 120 118 T 200 115 L 200 150 L 0 150 Z"
                      fill="#163a10"
                    />
                    <line
                      x1="40"
                      y1="120"
                      x2="40"
                      y2="80"
                      stroke="#5a3a18"
                      strokeWidth="3"
                    />
                    <ellipse
                      cx="30"
                      cy="78"
                      rx="14"
                      ry="4"
                      transform="rotate(-25 30 78)"
                      fill="#163a10"
                    />
                    <ellipse
                      cx="50"
                      cy="78"
                      rx="14"
                      ry="4"
                      transform="rotate(25 50 78)"
                      fill="#163a10"
                    />
                    <ellipse cx="40" cy="72" rx="15" ry="4" fill="#163a10" />
                    <path
                      d="M120 30 l 12 -3 l 8 3 l -8 3 z"
                      fill="#c44d24"
                      stroke="#20180c"
                      strokeWidth="1"
                    />
                  </svg>
                </div>
                <div className={styles["polaroid-cap"]}>
                  Year 1 · best in show :)
                </div>
              </div>
            </div>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <div className={styles.n}>62</div>
              <div className={styles.l}>Jammers · Year 1</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.n}>17</div>
              <div className={styles.l}>Games shipped</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.n}>04</div>
              <div className={styles.l}>Partner orgs</div>
            </div>
            <div className={styles.stat}>
              <div className={styles.n}>01</div>
              <div className={styles.l}>Loud cardboard dino</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SCHEDULE ───────────────────────────────────────────────── */}
      <section
        className={`${styles.block} ${styles.schedule}`}
        id="schedule"
      >
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Expedition Itinerary</div>
          <h2 className={styles["section-title"]}>
            The <span className={styles.accent}>route.</span>
            <span className={styles.scribble}>five waypoints, one month</span>
          </h2>
          <p style={{ maxWidth: "60ch", marginTop: "8px" }}>
            Hit them all or just the ones you can — the whole jam runs on
            itch.io, so you&apos;re never out of bounds.
          </p>

          <div className={styles["route-wrap"]}>
            {/* Winding route SVG */}
            <svg
              className={styles["route-svg"]}
              viewBox="0 0 1000 1280"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M 750 80
                   Q 920 220 750 360
                   Q 580 500 250 480
                   Q -50 460 250 700
                   Q 580 920 750 1100"
                stroke="#5a3a18"
                strokeWidth="6"
                strokeDasharray="6 14"
                opacity="0.85"
              />
            </svg>

            {/* Plane at start */}
            <svg
              className={styles["route-plane"]}
              style={{ left: "75%", top: "6%" }}
              viewBox="0 0 60 60"
            >
              <use href="#vc-plane" />
            </svg>

            {/* Route pins */}
            <span
              className={styles["route-pin"]}
              style={{ left: "75%", top: "6%" }}
            />
            <span
              className={styles["route-pin"]}
              style={{ left: "25%", top: "38%" }}
            />
            <span
              className={styles["route-pin"]}
              style={{ left: "75%", top: "56%" }}
            />
            <span
              className={styles["route-pin"]}
              style={{ left: "25%", top: "73%" }}
            />
            <span
              className={styles["route-pin"]}
              style={{ left: "75%", top: "86%" }}
            />

            {/* Stop 1 */}
            <a
              className={styles["route-stop"]}
              data-side="L"
              style={{ top: "1%" }}
              href={RSVP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className={styles["stop-head"]}>
                <div className={styles["stop-num"]}>01</div>
                <div>
                  <div className={styles["stop-date"]}>Wed · Jul 01 · 6 pm</div>
                  <div className={styles["stop-title"]}>
                    Kickoff + Theme Reveal
                  </div>
                </div>
              </div>
              <div className={styles["stop-meta"]}>
                Geekdom Event Centre · in person + livestream. Doors at 6,
                theme drops at 7.
              </div>
              <div className={styles["stop-arrow"]}>RSVP →</div>
            </a>

            {/* Stop 2 */}
            <a
              className={styles["route-stop"]}
              data-side="R"
              style={{ top: "22%" }}
              href="#schedule"
            >
              <div className={styles["stop-head"]}>
                <div className={styles["stop-num"]}>02</div>
                <div>
                  <div className={styles["stop-date"]}>Thu · Jul 09 · 7 pm</div>
                  <div className={styles["stop-title"]}>
                    Mid-Jam Office Hours
                  </div>
                </div>
              </div>
              <div className={styles["stop-meta"]}>
                Online · drop in to a Discord voice channel. Mentors on
                shaders, art, audio, scope.
              </div>
              <div className={styles["stop-arrow"]}>Link soon →</div>
            </a>

            {/* Stop 3 */}
            <a
              className={styles["route-stop"]}
              data-side="L"
              style={{ top: "42%" }}
              href="#schedule"
            >
              <div className={styles["stop-head"]}>
                <div className={styles["stop-num"]}>03</div>
                <div>
                  <div className={styles["stop-date"]}>Fri · Jul 17 · 6 pm</div>
                  <div className={styles["stop-title"]}>Playtest Day</div>
                </div>
              </div>
              <div className={styles["stop-meta"]}>
                Geekdom Event Centre · pizza, controllers, real feedback. Bring
                whatever you&apos;ve got.
              </div>
              <div className={styles["stop-arrow"]}>Link soon →</div>
            </a>

            {/* Stop 4 */}
            <a
              className={styles["route-stop"]}
              data-side="R"
              style={{ top: "62%" }}
              href="#schedule"
            >
              <div className={styles["stop-head"]}>
                <div className={styles["stop-num"]}>04</div>
                <div>
                  <div className={styles["stop-date"]}>
                    Thu · Jul 30 · 11:59 pm
                  </div>
                  <div className={styles["stop-title"]}>Submission Due</div>
                </div>
              </div>
              <div className={styles["stop-meta"]}>
                itch.io · don&apos;t be late. Late builds can demo at the
                showcase but aren&apos;t eligible for prizes.
              </div>
              <div className={styles["stop-arrow"]}>Submit on itch.io</div>
            </a>

            {/* Stop 5 */}
            <a
              className={styles["route-stop"]}
              data-side="L"
              style={{ top: "82%" }}
              href="#schedule"
            >
              <div className={styles["stop-head"]}>
                <div className={styles["stop-num"]}>05</div>
                <div>
                  <div className={styles["stop-date"]}>Sat · Aug 08 · 5 pm</div>
                  <div className={styles["stop-title"]}>
                    Showcase — Science-Fair Style
                  </div>
                </div>
              </div>
              <div className={styles["stop-meta"]}>
                Venue TBA · family-friendly. Tables, laptops, controllers,
                awards.
              </div>
              <div className={styles["stop-arrow"]}>Date placeholder</div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── INVOLVED ───────────────────────────────────────────────── */}
      <section
        className={`${styles.block} ${styles.involved}`}
        id="involved"
      >
        <div className={styles.content}>
          <div
            className={styles["section-eye"]}
            style={{ color: "var(--ink)" }}
          >
            For partners + orgs
          </div>
          <h2 className={styles["section-title"]}>
            Earn a <span className={styles.accent}>patch.</span>
            <span
              className={styles.scribble}
              style={{ color: "var(--leaf-deep)" }}
            >
              no commitment too small
            </span>
          </h2>
          <p style={{ maxWidth: "60ch", marginTop: "8px" }}>
            Last year a handful of local groups turned the jam from a friendly
            gathering into a real community event. Pick a lane — or three.
          </p>

          <div className={styles.patches}>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-megaphone" />
              </svg>
              <div>
                <h3>Spread the word</h3>
                <p>
                  Repost on socials. Hand a flyer to that one student who keeps
                  talking about Godot.
                </p>
              </div>
            </div>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-mic" />
              </svg>
              <div>
                <h3>Run a workshop</h3>
                <p>
                  60-minute talk on shaders, pixel art, audio, design? We&apos;ll
                  book the room.
                </p>
              </div>
            </div>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-compass" />
              </svg>
              <div>
                <h3>Mentor or judge</h3>
                <p>
                  Two-hour office-hours shifts, async Discord, or
                  showcase-night judging.
                </p>
              </div>
            </div>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-tent" />
              </svg>
              <div>
                <h3>Host space</h3>
                <p>
                  Kickoff venue, build-night spots, science-fair-friendly
                  showcase floor.
                </p>
              </div>
            </div>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-medal" />
              </svg>
              <div>
                <h3>Sponsor prizes / food</h3>
                <p>
                  Cash, hardware, software, swag, snacks for build night, pizza
                  for playtest.
                </p>
              </div>
            </div>
            <div className={styles.patch}>
              <svg
                className={styles["patch-icon"]}
                viewBox="0 0 64 64"
              >
                <use href="#vc-binoc" />
              </svg>
              <div>
                <h3>Share resources</h3>
                <p>
                  Asset packs, license codes, internship leads, conference
                  passes.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.talk}>
            <div>
              <strong>Talk to us.</strong>
              <span>team@acmsa.org · or DM in the ACM SA / DEVSA Discord</span>
            </div>
            <a
              className={`${styles.btn} ${styles["btn-yellow"]}`}
              href="mailto:team@acmsa.org?subject=VelociCode%202%20%E2%80%94%20interested"
            >
              Email the org →
            </a>
          </div>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────── */}
      <section className={`${styles.block} ${styles.faq}`} id="faq">
        <svg
          className={styles["palm-bg"]}
          viewBox="0 0 200 320"
          aria-hidden="true"
          style={{ color: "var(--leaf-far)" }}
        >
          <use href="#vc-palm" />
        </svg>
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Field Guide · Q &amp; A</div>
          <h2 className={styles["section-title"]}>
            Stuff people <span className={styles.accent}>ask.</span>
          </h2>

          <div className={styles["faq-list"]}>
            <details className={styles["faq-row"]} open>
              <summary>Do I need to know how to code?</summary>
              <p>
                Nope. Artists, designers, writers, audio folks — there&apos;s a
                role for everyone. Show up at kickoff, find a team, contribute
                what you bring.
              </p>
            </details>
            <details className={styles["faq-row"]}>
              <summary>What engine should I use?</summary>
              <p>
                Whatever you want. Unity, Unreal, Godot, GameMaker, web
                (Phaser, p5.js), pen and paper. The only requirement is that
                the final build runs on something a stranger can play.
              </p>
            </details>
            <details className={styles["faq-row"]}>
              <summary>Is it really free?</summary>
              <p>
                Yes. RSVP on Meetup, register on itch.io. No fee. Food is
                provided at the in-person events.
              </p>
            </details>
            <details className={styles["faq-row"]}>
              <summary>I&apos;m not in San Antonio. Can I still join?</summary>
              <p>
                Yes — itch.io is online and Discord is online. You&apos;ll miss
                kickoff and the showcase in person, but mentorship and the jam
                itself are remote-friendly.
              </p>
            </details>
            <details className={styles["faq-row"]}>
              <summary>Can I work in a team?</summary>
              <p>
                Solo or teams up to 4. We&apos;ll run team-formation at kickoff
                if you show up alone.
              </p>
            </details>
            <details className={styles["faq-row"]}>
              <summary>What&apos;s with the dino?</summary>
              <p>
                VelociCode → velociraptor. Last year it was a cardboard cutout.
                This year it&apos;s origami. Next year? Who knows.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────── */}
      <footer className={styles.foot}>
        <div className={styles["foot-inner"]}>
          <div>
            <div className={styles["foot-mark"]}>
              <span className={styles.a}>VELOCI</span>
              <span className={styles.b}>CODE</span>
            </div>
            <p>
              A month-long game jam from ACM San Antonio and the Greater Gaming
              Society. Built for the San Antonio community — show up, build a
              game, hand someone a controller.
            </p>
            <p style={{ marginTop: "12px", opacity: 0.55 }}>
              A 501(c)(3) Non-Profit Organization · ACM San Antonio Professional
              Chapter
            </p>
          </div>
          <div>
            <h4>The jam</h4>
            <ul>
              <li>
                <a
                  href={RSVP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Meetup ↗
                </a>
              </li>
              <li>
                <a href="#schedule">Schedule</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="/code-of-conduct">Code of conduct</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>
                <a
                  href="https://discord.gg/t94zZC3Ktm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ACM SA Discord
                </a>
              </li>
              <li>
                <a
                  href="https://discord.gg/cvHHzThrEw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  DEVSA Discord
                </a>
              </li>
              <li>
                <a href="mailto:team@acmsa.org">team@acmsa.org</a>
              </li>
              <li>
                <a href="/">Back to acmsa.org</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["foot-bottom"]}>
          <span>© 2026 ACM San Antonio · Co-hosted with Greater Gaming Society</span>
          <span>Made in San Antonio · v2</span>
        </div>
      </footer>
    </div>
  );
}
