import type { Metadata } from "next";
import {
  Bowlby_One_SC,
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import Image from "next/image";
import { Fragment } from "react";
import { AccordionFAQ, type FaqItem } from "./AccordionFAQ";
import { VCHeroScene } from "./graphics/VCHeroScene";
import { VCSymbols } from "./graphics/VCSymbols";
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
    date: "2026-07-16T18:00",
    title: "TBA Event",
    meta: "Details coming soon! Stay tuned to our Meetup and Discord for updates.",
    cta: "Link soon",
    href: "#schedule",
    external: false,
  },
  {
    date: "2026-07-17T18:00",
    title: "Playtest Day",
    location: "Zelifcam",
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

const CHALLENGES = [
  {
    pos: "left" as const,
    icon: "vc-compass",
    badge: null,
    rank: "the prompt, nailed",
    title: "Best Theme",
    desc: "The cleverest, weirdest, most heartfelt take on this year's theme reveal — the game that makes the prompt sing. Surprise us.",
  },
  {
    pos: "center" as const,
    icon: "vc-medal",
    badge: "★ the headline award ★",
    rank: "the big one",
    title: "Best Overall",
    desc: "Fun to play, polished, and it sticks with you. The judges' pick for the game that nails it top to bottom — story, feel, and finish.",
  },
  {
    pos: "right" as const,
    icon: "vc-megaphone",
    badge: null,
    rank: "voted by the room",
    title: "Crowd Favorite",
    desc: "Decided by the community. Everyone at the showcase gets a ticket to vote — the people's champ takes it home, no judges required.",
  },
];

const SPONSORS: { name: string; src: string; href?: string }[] = [];

const COMMUNITY_PARTNERS: { name: string; src: string; href?: string }[] = [
  {
    name: "Greater Gaming Society",
    src: "/ggs-logo.png",
    href: "https://www.meetup.com/greater-gaming-society-of-san-antonio/",
  },
  {
    name: "DEVSA",
    src: "/devsa-logo.svg",
    href: "https://www.devsa.community/",
  },
  { name: "Geekdom", src: "/geekdom.svg", href: "https://geekdom.com/" },
  {
    name: "Alamo Tech Collective",
    src: "/alamo-tech-collective-logo.png",
    href: "https://www.meetup.com/alamotechcollective/",
  },
  {
    name: "Unreal Engine San Antonio",
    src: "/unreal-engine-sa-logo-color.png",
    href: "https://communities.unrealengine.com/san-antonio/",
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
      <VCSymbols />

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
          <VCHeroScene />

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

      {/* ─── CHALLENGE ──────────────────────────────────────────────── */}
      <SectionReveal
        className={`${styles.block} ${styles.challenge}`}
        id="challenge"
      >
        <div className={styles.content}>
          <div className={styles["section-eye"]}>The expedition · Glory</div>
          <h2 className={styles["section-title"]}>
            Top of the <span className={styles.accent}>heap.</span>
            <span className={styles.scribble}>mind the podium</span>
          </h2>
          <p className={styles["sec-lead"]}>
            Three prizes, one month of building. Chase all three or just the one
            that&apos;s yours — every game you actually finish is in the
            running. No brackets, no gatekeeping, just the showcase and a room
            full of people who get it.
          </p>

          <div className={styles.podium}>
            {CHALLENGES.map((c) => (
              <div
                key={c.title}
                className={`${styles.pcard} ${styles[`pcard-${c.pos}`]}`}
              >
                {c.badge && (
                  <div className={styles["pcard-badge"]}>{c.badge}</div>
                )}
                <div
                  className={`${styles["pcard-icon"]}${c.pos === "center" ? ` ${styles["pcard-icon-clay"]}` : ""}`}
                >
                  <svg viewBox="0 0 64 64" aria-hidden="true">
                    <use href={`#${c.icon}`} />
                  </svg>
                </div>
                <span className={styles["pcard-rank"]}>{c.rank}</span>
                <h3>{c.title}</h3>
                <p className={styles["pcard-desc"]}>{c.desc}</p>
                <div className={styles["pcard-prize"]}>Prize · TBA</div>
              </div>
            ))}
          </div>

          {/* loot callout — hidden until prizes are finalized
          <div className={styles.loot}>
            <div className={styles["loot-badge"]}>★ The loot ★</div>
            <h3>What you&apos;re playing for.</h3>
            <p>
              Here&apos;s the part that gets loud once our sponsors lock in —
              cash, hardware, swag, and a year of bragging rights, split across
              the three awards. Drop the real numbers in when they&apos;re set.
            </p>
            <div className={styles["loot-slots"]}>
              {CHALLENGES.map((c) => (
                <div key={c.title} className={styles["loot-slot"]}>
                  <span className={styles["ls-l"]}>{c.title}</span>
                  <span className={styles["ls-v"]}>$ TBA</span>
                  <span className={styles["ls-n"]}>prize to be announced</span>
                </div>
              ))}
            </div>
          </div>
          */}
        </div>
      </SectionReveal>

      {/* ─── PARTNERS ───────────────────────────────────────────────── */}
      <SectionReveal
        className={`${styles.block} ${styles.partners}`}
        id="partners"
      >
        <div className={styles.content}>
          <div className={styles["section-eye"]}>Field journal · Allies</div>
          <h2 className={styles["section-title"]}>
            Earn your <span className={styles.accent}>stripes.</span>
            <span className={styles.scribble}>stitched on tight</span>
          </h2>
          <p className={styles["sec-lead"]}>
            Last year a handful of local crews turned a friendly gathering into
            a real event. These are the folks lending space, prizes, and time —
            pinned up like patches, because that&apos;s exactly what they are.
          </p>

          {/* Sponsors — only rendered when SPONSORS array is populated */}
          {SPONSORS.length > 0 && (
            <>
              <div className={styles["wall-label"]}>
                Sponsors{" "}
                <span className={styles["wall-label-note"]}>
                  — the crews chipping in prizes &amp; support
                </span>
              </div>
              <div className={styles.wall}>
                {SPONSORS.map((s) => {
                  const Tag = s.href ? "a" : "div";
                  return (
                    <Tag
                      key={s.name}
                      className={styles.ally}
                      {...(s.href
                        ? {
                            href: s.href,
                            target: "_blank",
                            rel: "noopener noreferrer",
                          }
                        : {})}
                    >
                      <div className={styles["logo-box"]}>
                        {s.src ? (
                          <Image
                            src={s.src}
                            alt={s.name}
                            fill
                            style={{ objectFit: "contain", padding: "8px" }}
                          />
                        ) : (
                          <span className={styles["logo-ph"]}>{s.name}</span>
                        )}
                      </div>
                      <span className={styles["ally-name"]}>{s.name}</span>
                    </Tag>
                  );
                })}
                <a
                  className={`${styles.ally} ${styles["ally-add"]}`}
                  href="mailto:team@acmsa.org?subject=VelociCode%202%20%E2%80%94%20interested"
                >
                  <span className={styles["ally-add-plus"]}>＋</span>
                  <span className={styles["ally-name"]}>Sponsor the jam</span>
                </a>
              </div>
            </>
          )}

          {/* Community Partners */}
          <div className={styles["wall-label"]}>
            Community partners{" "}
            <span className={styles["wall-label-note"]}>
              — the groups making it a San Antonio thing
            </span>
          </div>
          <div className={styles.wall}>
            {COMMUNITY_PARTNERS.map((p) => {
              const Tag = p.href ? "a" : "div";
              return (
                <Tag
                  key={p.name}
                  className={styles.ally}
                  {...(p.href
                    ? {
                        href: p.href,
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                >
                  <div className={styles["logo-box"]}>
                    {p.src ? (
                      <Image
                        src={p.src}
                        alt={p.name}
                        fill
                        style={{ objectFit: "contain", padding: "8px" }}
                      />
                    ) : (
                      <span className={styles["logo-ph"]}>{p.name}</span>
                    )}
                  </div>
                  <span className={styles["ally-name"]}>{p.name}</span>
                </Tag>
              );
            })}
            <a
              className={`${styles.ally} ${styles["ally-add"]}`}
              href="mailto:team@acmsa.org?subject=VelociCode%202%20%E2%80%94%20interested"
            >
              <span className={styles["ally-add-plus"]}>＋</span>
              <span className={styles["ally-name"]}>Join the wall</span>
            </a>
          </div>

          <div className={styles.thanks}>
            <div>
              <strong className={styles["thanks-strong"]}>
                Thank you, friends.
              </strong>
              <span className={styles["thanks-body"]}>
                VelociCode runs on people who show up for it — venues, prizes,
                mentors, snacks. Want your logo up here next year? We&apos;ve
                always got room on the wall.
              </span>
            </div>
            <a
              className={`${styles.btn} ${styles["btn-yellow"]}`}
              href="mailto:team@acmsa.org?subject=VelociCode%202%20%E2%80%94%20interested"
            >
              Become a partner →
            </a>
          </div>
        </div>
      </SectionReveal>

      {/* ─── INVOLVED — set VELOCICODE_SHOW_INVOLVED=false to hide ──── */}
      {process.env.VELOCICODE_SHOW_INVOLVED !== "false" && (
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
      )}

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
