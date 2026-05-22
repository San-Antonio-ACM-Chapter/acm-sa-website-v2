import type { Metadata } from "next";
import {
  Bowlby_One_SC,
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import { Fragment } from "react";
import { AccordionFAQ, type FaqItem } from "./AccordionFAQ";
import { type PolaroidPhoto, PolaroidSlideshow } from "./PolaroidSlideshow";
import styles from "./page.module.css";
import { RouteSection } from "./RouteSection";
import { buildRouteLayout, type InputStop } from "./routeLayout";
import { SectionReveal } from "./SectionReveal";
import { StatCounter } from "./StatCounter";

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

const META_ITEMS = [
  { label: "Window", value: "Jul 1 → Aug 1" },
  { label: "Kickoff", value: "Wed Jul 1 · 7 pm" },
  { label: "Cost", value: "Free · all levels" },
];

const STOPS: InputStop[] = [
  {
    date: "2026-07-01T17:00",
    title: "Kickoff + Theme Reveal",
    location: "Geekdom Event Centre",
    meta: "In-person + livestream. Doors at 6:30, theme drops at ~7.",
    cta: "RSVP",
    href: RSVP_URL,
    external: true,
  },
  {
    date: "2026-07-08T18:00",
    title: "TBA Event",
    meta: "Details coming soon! Stay tuned to our Meetup and Discord for updates.",
    cta: "Link soon",
    href: "#schedule",
    external: false,
  },
  {
    date: "2026-07-17T18:00",
    title: "Playtest Day",
    location: "TBD",
    meta: "Bring your game, bring your pals, get some live feedback.",
    cta: "Link soon",
    href: "#schedule",
    external: false,
  },
  {
    date: "2026-07-30T23:59",
    title: "Submission Due",
    location: "itch.io",
    meta: "Don't be late — late builds aren't eligible for prizes or presentations. RSVP with the organizers to confirm your spot.",
    cta: "Submit on itch.io",
    href: "https://itch.io/jam/velocicode-2",
    external: false,
  },
  {
    date: "2026-08-01T11:00",
    title: "Showcase — Science-Fair Style",
    location: "Venue TBA",
    meta: "Family-friendly. Tables, laptops, controllers, awards.",
    cta: "RSVP",
    href: "https://www.meetup.com/acm-sa/events/312892527",
    external: false,
  },
];

const POLAROID_PHOTOS: PolaroidPhoto[] = [
  { src: "event-photo-25-01.jpeg", description: "Presentation Day", year: 1 },
  { src: "social-25-01.jpeg", description: "GGS Social", year: 1 },
  { src: "event-photo-25-02.jpeg", description: "Presentation Day", year: 1 },
];

const STATS = [
  { value: "39", label: "Jammers · Year 1" },
  { value: "5", label: "Games shipped" },
  { value: "04", label: "Partner orgs" },
  { value: "01", label: "Charming origami dino" },
];

const PATCHES = [
  {
    icon: "vc-megaphone",
    title: "Spread the word",
    body: "Repost on socials. Hand a flyer to that one student who keeps talking about Godot.",
  },
  {
    icon: "vc-mic",
    title: "Run a workshop",
    body: "60-minute talk on shaders, pixel art, audio, design? We'll help promote the event.",
  },
  {
    icon: "vc-compass",
    title: "Judge",
    body: "In-person at our showcase event on August 1st!",
  },
  {
    icon: "vc-tent",
    title: "Host space",
    body: "Build-night spots, science-fair-friendly showcase floor, or other social events.",
  },
  {
    icon: "vc-medal",
    title: "Sponsor prizes / food",
    body: "Cash, hardware, software, swag, snacks for build night, pizza for playtest.",
  },
  {
    icon: "vc-binoc",
    title: "Share resources",
    body: "Asset packs, license codes, internship leads, conference passes.",
  },
];

const MARQUEE_ITEMS = [
  "VelociCode 02",
  "1 month · 1 game · 0 excuses",
  "Made in San Antonio",
  "First-timers welcome",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Do I need to know how to code?",
    a: "Nope. Artists, designers, writers, audio folks — there's a role for everyone. Show up at kickoff, find a team, contribute what you bring.",
  },
  {
    q: "What engine should I use?",
    a: "Whatever you want. Unity, Unreal, Godot, GameMaker, web (Phaser, p5.js), pen and paper. The only requirement is that the final build runs on something a stranger can play.",
  },
  {
    q: "Is it really free?",
    a: "Yes. RSVP on Meetup, register on itch.io. No fee. Food is provided at the in-person events.",
  },
  {
    q: "I'm not in San Antonio. Can I still join?",
    a: "Yes — itch.io is online and Discord is online. You'll miss kickoff and the showcase in person, but mentorship and the jam itself are remote-friendly.",
  },
  {
    q: "Can I work in a team?",
    a: "Solo or teams up to 4. We'll run team-formation at kickoff if you show up alone.",
  },
  {
    q: "What's with the dino?",
    a: "VelociCode → velociraptor. Last year it was a cardboard cutout. This year it's origami. Next year? Who knows.",
  },
];

export default function VelociCodePage() {
  const {
    stops: computedStops,
    pathD,
    segments,
    wrapMinHeight,
    pathTopFrac,
    pathBottomFrac,
  } = buildRouteLayout(STOPS);

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

          {/* Palm tree — game-icons/delapouite (CC BY 3.0) */}
          <symbol id="vc-bigleaf" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M179.125 20.625c-28.052.12-54.046 5.813-66.72 9.78 0 0 114.968 19.51 124.532 98.876C149.573 3.32 54.28 155.657 54.28 155.657c19.868-5.212 76.76-20.682 114.75-14.156 25.992 4.465 51.33 28.03 50.236 27.733-61.943 15.24-160.35 290.92-143.64 313.308 14.9 17.12 29.816 11.28 44.718 2.595 7.376-58.425 64.938-314.765 135.375-294.072.01.003.02-.003.03 0 5.93 2.03 11.54 5.59 11.844 11.03.58 10.363-6.11 27.3-4.53 39.063 3.662 27.296 9.007 36.79 16.78 46.313 18.564-10.435 36.326-48.057 40-67.564 16.634 7.284 43.373 24.155 65.187 86.813 11.404-58.716-5.042-105.03-59.03-125.595 23.38-10.105 125.142 41.03 137.563 69.53C475.648 199.264 390.167 136.378 319 139.72c13.644-3.56 28.638.6 42.906-9.907 19.146-14.098 41.474-26.24 62.28-39.282-69.972-30.435-134.545-15.407-139.092 16.095-3.573-69.916-57.83-86.204-105.97-86z"
            />
          </symbol>

          {/* Fern — game-icons/delapouite (CC BY 3.0) */}
          <symbol id="vc-frond" viewBox="0 0 512 512">
            <path
              fill="currentColor"
              d="M127.3 21.33c-8.7 3.74-15.7 8.57-21.9 14.01 2.5 4.7 5.1 9.41 7.7 14.15 7-9.07 12.3-19.08 14.2-28.16zM48.18 35.86c-5.47.1-11.12.85-17.01 2.59 10 10.35 26.54 17.43 42.18 19.64-2.11-6.66-4.07-13.27-5.87-19.82-6.24-1.52-12.63-2.5-19.3-2.41zm37.84 1.07C108.6 116.3 155.9 207.1 214 288.5c62.5 87.4 137.5 164 205.5 205.5h72c-164.8-99-318-289.6-405.48-457.07zm65.58.6c-13.3 5.97-23.5 14.12-32.2 23.3 3.4 5.95 6.8 11.92 10.3 17.9 10.7-12.79 19.2-27.8 21.9-41.2zm36.6 10.95c-22.2 10.69-37.1 26.96-49.9 44.61 4.1 6.72 8.2 13.41 12.5 20.21 17.8-18 33.2-43.11 37.4-64.82zM47.86 68.68c-7.31 0-14.87.83-22.77 2.76C39.3 83.57 63.75 91.51 85.6 92.93c-2.62-6.81-5.09-13.58-7.42-20.31-9.76-2.33-19.78-3.97-30.32-3.94zm174.64 9.48c-27.8 10.8-45.5 30.34-61.8 50.54 3.5 5.4 7.1 10.8 10.7 16.2 22.4-15.8 44.3-42.9 51.1-66.74zm28.1 25.94c-31.5 13.4-50.6 35-67.8 57.6 4.3 6.2 8.7 12.4 13.1 18.5 25.3-18.7 49-49.8 54.7-76.1zm-188.95 1.7c-13.6.1-27.46 2.2-41.65 7.7 20.75 13 53.96 18.8 81 16.3-3.28-7.3-6.4-14.5-9.38-21.7-9-1.3-18.07-2.2-27.25-2.3zm217.95 33.5c-32.7 13.9-52 36.7-69.7 60.2 4.3 5.8 8.7 11.6 13.1 17.3 26.1-18.4 50.7-50.5 56.6-77.5zm-185.3 3.3c-21.73.1-43.47 2.5-64.55 14.4 23.57 10.2 59.64 10.3 85.15 2.3-2.7-5.5-5.4-11.1-8-16.6-2.7-.1-5.5-.1-8.25-.1zm219.1 23.7c-35.5 15.8-57.7 40.9-77.3 67.3 6 7.7 12.2 15.4 18.5 23 27.7-23.8 52.5-59.6 58.8-90.3zm-194.5 16.2c-26.84-.1-54.08 2.3-82.42 17.9 26.28 12.8 69.92 12.3 101.12 1.6-3.7-6.5-7.2-12.9-10.7-19.4-2.7-.1-5.3-.1-8-.1zm236.3 17.3c-39.6 17.7-62.6 46.7-84 76.5 5.8 6.7 11.6 13.4 17.5 20 30.7-23.4 59.6-63 66.5-96.5zm-220.3 19.4c-26.8 0-54.11 2.3-82.43 17.9 27.65 13.4 74.43 12.3 105.73-.1-3.6-5.8-7.1-11.7-10.6-17.6-4.2-.1-8.4-.2-12.7-.2zm261.6 8.4c-43.5 19.8-68.7 52.4-92.2 85.9 6.7 7.1 13.4 14.2 20.2 21.2 33.4-26.1 64.5-69.9 72-107.1zm45.2 27.5c-49.1 23.2-75.2 59.8-100.4 96.5 6.7 6.6 13.5 13.2 20.3 19.6 37.7-27.1 73.5-76 80.1-116.1zm-270.9 1.8c-36.9 1.5-74.06 4.6-110.83 28.2 34.33 13.8 88.63 9.8 125.63-5.8-5-7.4-10-14.9-14.8-22.4zM486.3 280c-51 26.5-77.5 68.7-103.4 110.6 7.4 6.6 14.9 13.1 22.5 19.4 38.1-30.4 74.2-85 80.9-130zm-283.6 23.5c-40.4 3.3-81.2 6.4-120.44 34.1 37.84 13.2 98.04 4.6 133.74-15.9-4.5-6-8.9-12.1-13.3-18.2zM494 342.6c-32.9 25.6-48.1 51.6-68.4 83.8 8.8 6.9 17.6 13.6 26.5 20 17.5-14.4 28.2-33.1 41.9-53.3zm-257.2 5.7c-42.1 9.6-84.4 19.9-121 54.6 41.5 7.9 101.6-8.3 138.2-33.7-5.8-6.8-11.6-13.8-17.2-20.9zm35.5 41.9c-41.7 14.1-83.6 29.4-118.8 69.8 42.1 4.8 101.9-18.4 138-49.1-6.5-6.7-12.9-13.7-19.2-20.7zm45.4 46.9c-43.1 10.9-86.1 23.1-123.5 56.9h70.6c28.5-7.5 56.2-20 76.9-35-8-7-16-14.3-24-21.9zm46.4 40.4c-15.6 4.9-31.3 10-46.6 16.5h68.8c-7.4-5.2-14.8-10.7-22.2-16.5z"
            />
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
            <a href="/#home">Home</a>
            <a href="/#about">About</a>
            <a href="/#events">Events</a>
            <a href="/#contact">Connect</a>
          </div>
          <a
            className={styles["nav-cta"]}
            href="https://itch.io/jam/velocicode-2"
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
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* SUN with rays */}
            <g className={styles["hero-sun"]} transform="translate(1240 220)">
              <g
                className={styles["sun-rays"]}
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

            {/* Dotted plane route — id used by animateMotion below; endpoints extend well off-screen so loop reset is invisible */}
            <path
              className={styles["hero-route-path"]}
              id="hero-route"
              d="M -300 480 Q 250 380 500 460 T 980 380 T 1750 190"
              fill="none"
              stroke="#20180c"
              strokeWidth="3"
              strokeDasharray="4 12"
              opacity="0.55"
            />
            {/* Mobile route: short path that stays within the visible crop area (SVG x ≈ 500–1100) */}
            <path
              className={styles["hero-route-path-mobile"]}
              id="hero-route-mobile"
              d="M 510 540 Q 680 360 820 430 T 1080 280"
              fill="none"
              stroke="#20180c"
              strokeWidth="3"
              strokeDasharray="4 12"
              opacity="0.55"
            />
            {/* Plane animated along route — rotate(90) pre-aligns nose to +X so rotate="auto" faces direction of travel */}
            <g className={styles["hero-route-plane"]}>
              <animateMotion
                dur="18s"
                repeatCount="indefinite"
                rotate="auto"
                calcMode="linear"
              >
                <mpath href="#hero-route" />
              </animateMotion>
              <use
                href="#vc-plane"
                width="64"
                height="64"
                x="-32"
                y="-32"
                transform="rotate(90)"
              />
            </g>
            {/* Mobile plane — follows the shorter mobile route, loops every 7s */}
            <g className={styles["hero-route-plane-mobile"]}>
              <animateMotion
                dur="7s"
                repeatCount="indefinite"
                rotate="auto"
                calcMode="linear"
              >
                <mpath href="#hero-route-mobile" />
              </animateMotion>
              <use
                href="#vc-plane"
                width="64"
                height="64"
                x="-32"
                y="-32"
                transform="rotate(90)"
              />
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
            <g opacity="0.75" color="#2d5a22">
              <g transform="translate(155 665)">
                <use
                  href="#vc-bigleaf"
                  x="-90"
                  y="-190"
                  width="190"
                  height="190"
                />
              </g>
              <g transform="translate(1435 645)">
                <g transform="scale(-1,1)">
                  <use
                    href="#vc-bigleaf"
                    x="-90"
                    y="-190"
                    width="190"
                    height="190"
                  />
                </g>
              </g>
            </g>

            {/* Big foreground palm LEFT */}
            <g transform="translate(60 955)" color="#163a10">
              <use
                href="#vc-bigleaf"
                x="-160"
                y="-420"
                width="420"
                height="420"
              />
            </g>

            {/* Big foreground palm RIGHT */}
            <g transform="translate(1545 955)" color="#163a10">
              <g transform="scale(-1,1)">
                <use
                  href="#vc-bigleaf"
                  x="-160"
                  y="-420"
                  width="420"
                  height="420"
                />
              </g>
            </g>

            {/* Ferns along the bottom */}
            <g transform="translate(330 920)" fill="#163a10">
              <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
              <ellipse cx="20" cy="-2" rx="22" ry="7" transform="rotate(30)" />
              <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
            </g>
            <g transform="translate(1180 920)" fill="#163a10">
              <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
              <ellipse cx="20" cy="-2" rx="22" ry="7" transform="rotate(30)" />
              <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
            </g>

            {/* Origami Dino */}
            <g className={styles["hero-dino"]} transform="translate(1020 800)">
              <ellipse
                cx="0"
                cy="14"
                rx="95"
                ry="10"
                fill="#000"
                opacity="0.22"
              />
              <image
                href="/velocicode-logo.png"
                x="-145"
                y="-255"
                width="290"
                height="290"
              />
            </g>
          </svg>

          {/* Hero overlay: title + CTAs */}
          <div className={styles["hero-overlay"]}>
            <span className={styles.eyebrow}>
              ★ ACM SA × Greater Gaming Society ★ Expedition 02
            </span>
            <h1 className={styles.wordmark}>
              <span className={styles["wm-veloci"]}>
                {"VELOCI".split("").map((ch, i) => (
                  <span
                    key={ch}
                    className={styles["wm-letter"]}
                    style={{ animationDelay: `${80 + i * 30}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className={styles["wm-code"]}>
                {"CODE".split("").map((ch, i) => (
                  <span
                    key={ch}
                    className={styles["wm-letter"]}
                    style={{ animationDelay: `${80 + (6 + i) * 30}ms` }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
              <span className={styles["wm-bang"]}>
                <span
                  className={styles["wm-letter"]}
                  style={{ animationDelay: `${80 + 10 * 30}ms` }}
                >
                  !
                </span>
              </span>
            </h1>
            <div className={styles.tagline}>
              <span className={styles.strike}>a hackathon</span>a month-long
              game jam.
            </div>
            <div className={styles["hero-cta"]}>
              <a
                className={`${styles.btn} ${styles["btn-primary"]}`}
                href="https://itch.io/jam/velocicode-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Register on Itch.io ↗
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

        {/* ─── FOLIAGE FRAMING ──────────────────────────────────────── */}
        <div className={styles["foliage-left"]} aria-hidden="true">
          <svg
            style={{
              bottom: "0",
              left: "-10px",
              width: "200px",
              height: "200px",
            }}
            viewBox="0 0 512 512"
            overflow="visible"
            color="var(--leaf-far)"
            aria-hidden="true"
          >
            <g transform="translate(512,0) scale(-1,1)">
              <use href="#vc-frond" />
            </g>
          </svg>
        </div>

        <div className={styles["foliage-right"]} aria-hidden="true">
          <svg
            style={{
              bottom: "0",
              left: "-5px",
              width: "200px",
              height: "200px",
            }}
            viewBox="0 0 512 512"
            overflow="visible"
            color="var(--leaf-far)"
            aria-hidden="true"
          >
            <use href="#vc-frond" />
          </svg>
        </div>
      </header>

      {/* ─── META STRIP ─────────────────────────────────────────────── */}
      <div className={styles["meta-strip"]}>
        {META_ITEMS.map((item, i) => (
          <Fragment key={item.label}>
            {i > 0 && (
              <div className={styles.sep} aria-hidden="true">
                ✦
              </div>
            )}
            <div className={styles.item}>
              <span className={styles.lbl}>{item.label}</span> {item.value}
            </div>
          </Fragment>
        ))}
      </div>

      {/* ─── MARQUEE ─────────────────────────────────────────────────── */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles["mq-track"]}>
          {[0, 1].map((set) => (
            <span key={set}>
              {MARQUEE_ITEMS.map((item) => (
                <Fragment key={item}>
                  <span>{item}</span>
                  <span className={styles["mq-dot"]} />
                </Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ─── THEME REVEAL (env-gated) ────────────────────────────────── */}
      {process.env.VELOCICODE_THEME && (
        <section className={styles["theme-reveal"]}>
          <div className={styles["theme-eye"]}>The Theme Is Revealed</div>
          <div className={styles["theme-name"]}>
            {process.env.VELOCICODE_THEME}
          </div>
          {process.env.VELOCICODE_KICKOFF_VIDEO && (
            <a
              className={styles["theme-video-btn"]}
              href={process.env.VELOCICODE_KICKOFF_VIDEO}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Watch the Kickoff
            </a>
          )}
        </section>
      )}

      {/* ─── ABOUT ──────────────────────────────────────────────────── */}
      <SectionReveal className={`${styles.block} ${styles.about}`} id="about">
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Field Journal · Entry 01</div>
          <h2 className={styles["section-title"]}>
            One month, <span className={styles.accent}>one game.</span>
            <span className={styles.scribble}>— scrappy on purpose</span>
          </h2>

          <div className={styles["about-grid"]}>
            <div className={styles["about-body"]}>
              <p>
                <span className={styles.hand}>Hello, friend —</span>
                <strong>VelociCode</strong> is San Antonio&apos;s month-long
                game jam. Year one was small and scrappy and full of
                first-timers — so good we couldn&apos;t <em>not</em> do it
                again. Year two doubles down: a full month to build, a community
                kickoff, mid-jam playtest, and a science-fair-style showcase.
              </p>
              <p>
                Hosted by <strong>ACM San Antonio</strong> and the{" "}
                <strong>
                  <a
                    href="https://www.meetup.com/greater-gaming-society-of-san-antonio/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Greater Gaming Society
                  </a>
                </strong>
                , the jam is built for the{" "}
                <strong>
                  <a
                    href="https://www.devsa.community/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    San Antonio community
                  </a>
                </strong>{" "}
                — students, hobbyists, designers, artists, devs, first-timers.
                Show up solo, find a team, ship something you can hand a
                controller to.
              </p>
              <p>
                It&apos;s not a hackathon — there&apos;s no all-nighter, no
                exhaustion-as-flex. It&apos;s a month. Make a tiny thing. Make
                it weird. Make it yours.
              </p>
            </div>

            <div>
              <PolaroidSlideshow photos={POLAROID_PHOTOS} />
            </div>
          </div>

          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <StatCounter value={s.value} className={styles.n} />
                <div className={styles.l}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>

      {/* ─── SCHEDULE ───────────────────────────────────────────────── */}
      <section className={`${styles.block} ${styles.schedule}`} id="schedule">
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Expedition Itinerary</div>
          <h2 className={styles["section-title"]}>
            The <span className={styles.accent}>route.</span>
            <span className={styles.scribble}>five waypoints, one month</span>
          </h2>
          <p style={{ maxWidth: "60ch", marginTop: "8px" }}>
            Hit them all or just the ones you can — the whole jam runs through
            the month, so you&apos;re never out of bounds.
          </p>

          <RouteSection
            stops={computedStops}
            pathD={pathD}
            segments={segments}
            wrapMinHeight={wrapMinHeight}
            pathTopFrac={pathTopFrac}
            pathBottomFrac={pathBottomFrac}
          />
        </div>
      </section>

      {/* ─── INVOLVED ───────────────────────────────────────────────── */}
      <SectionReveal
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
            {PATCHES.map((p) => (
              <div key={p.icon} className={styles.patch}>
                <svg
                  className={styles["patch-icon"]}
                  viewBox="0 0 64 64"
                  aria-hidden="true"
                >
                  <use href={`#${p.icon}`} />
                </svg>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.talk}>
            <div>
              <strong>Talk to us.</strong>
              <span>team@acmsa.org · or DM in the ACM SA</span>
            </div>
            <a
              className={`${styles.btn} ${styles["btn-yellow"]}`}
              href="mailto:team@acmsa.org?subject=VelociCode%202%20%E2%80%94%20interested"
            >
              Email the org →
            </a>
          </div>
        </div>
      </SectionReveal>

      {/* ─── FAQ ────────────────────────────────────────────────────── */}
      <SectionReveal className={`${styles.block} ${styles.faq}`} id="faq">
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

          <AccordionFAQ items={FAQ_ITEMS} />
        </div>
      </SectionReveal>

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
                <a href={RSVP_URL} target="_blank" rel="noopener noreferrer">
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
          <span>
            © ${new Date().getFullYear()} ACM San Antonio · Co-hosted with
            Greater Gaming Society
          </span>
          <span>Made in San Antonio · v2</span>
        </div>
      </footer>
    </div>
  );
}
