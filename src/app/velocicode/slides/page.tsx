"use client";

import {
  Bowlby_One_SC,
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SPONSORS, COMMUNITY_PARTNERS } from "../allies";
import styles from "./slides.module.css";

/* ── Fonts — loaded at module scope to inject @font-face rules ── */
const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400", display: "swap" });
const rubikDirt   = Rubik_Dirt({ subsets: ["latin"], weight: "400", display: "swap" });
const bowlby      = Bowlby_One_SC({ subsets: ["latin"], weight: "400", display: "swap" });
const caveat      = Caveat_Brush({ subsets: ["latin"], weight: "400", display: "swap" });
const elite       = Special_Elite({ subsets: ["latin"], weight: "400", display: "swap" });
const dmMono      = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

/* Applying these classNames to a DOM element causes Next.js to inject @font-face.
   The .frame CSS module defines --vc-font-* with raw family names, so the fonts
   just need to be declared — no CSS variable mapping needed. */
const FONT_TRIGGER_CLASS = [
  luckiestGuy.className,
  rubikDirt.className,
  bowlby.className,
  caveat.className,
  elite.className,
  dmMono.className,
].join(" ");

/* ── Types ────────────────────────────────────────────────────── */
type CardSlug = "title" | "qr" | "wifi" | "sponsors" | "partners" | "socials" | "newhere" | "brand" | "coc";
type TransMode = "A" | "C";

const DURATIONS: Record<CardSlug, number> = {
  title: 6, qr: 14, wifi: 12, sponsors: 8, partners: 8,
  socials: 8, newhere: 10, brand: 6, coc: 8,
};

const CANONICAL_POOL: CardSlug[] = [
  "qr", "wifi", "sponsors", "partners", "socials", "newhere", "brand", "coc",
];

/* ── Sequence builder ─────────────────────────────────────────── */
function buildSequence(
  hide: string[],
  wifiNetwork: string,
  wifiPassword: string,
  hasEventInfo: boolean,
): CardSlug[] {
  const hiddenSet = new Set(hide.filter((s) => s !== "title"));
  const wifiEligible = Boolean(wifiNetwork && wifiPassword);
  const spacer: CardSlug = hasEventInfo ? "title" : "brand";

  const pool = CANONICAL_POOL.filter((slug) => {
    if (hiddenSet.has(slug)) return false;
    if (slug === "wifi" && !wifiEligible) return false;
    if (!hasEventInfo && slug === "brand") return false;
    return true;
  });

  const seq: CardSlug[] = [];
  for (let i = 0; i < pool.length; i += 2) {
    seq.push(spacer);
    seq.push(pool[i]);
    if (pool[i + 1]) seq.push(pool[i + 1]);
  }
  if (seq.length === 0) seq.push(spacer);
  return seq;
}

/* ── QR code generator ────────────────────────────────────────── */
async function makeQR(data: string, size: number): Promise<string | null> {
  try {
    const mod = await import("qrcode-generator");
    const qrcode = mod.default as (t: number, ec: string) => {
      addData(s: string): void;
      make(): void;
      createDataURL(cellSize: number, margin: number): string;
    };
    const qr = qrcode(0, "M");
    qr.addData(data);
    qr.make();
    const cellSize = Math.max(3, Math.round(size / 33));
    return qr.createDataURL(cellSize, 1);
  } catch {
    return null;
  }
}

/* ── Card class helper ────────────────────────────────────────── */
function cardCls(
  slug: CardSlug,
  seq: CardSlug[],
  idx: number,
  swapping: boolean,
  outIdx: number,
  inIdx: number,
  mode: TransMode,
): string {
  if (swapping) {
    const outSlug = outIdx >= 0 ? seq[outIdx] : null;
    const inSlug  = inIdx  >= 0 ? seq[inIdx]  : null;
    if (slug === outSlug) return `${styles.card} ${mode === "A" ? styles.isOutA : styles.isOutC}`;
    if (slug === inSlug)  return `${styles.card} ${mode === "A" ? styles.isInA  : styles.isInC}`;
    return styles.card;
  }
  return `${styles.card}${seq[idx] === slug ? ` ${styles.isActive}` : ""}`;
}

/* ── QR image element ─────────────────────────────────────────── */
function QRImg({ src, size }: { src: string | null; size: number }) {
  if (!src) return <div style={{ width: size, height: size, background: "#eee" }} />;
  return (
    <img
      src={src}
      width={size}
      height={size}
      alt=""
      style={{ display: "block", imageRendering: "pixelated" }}
    />
  );
}

/* ── Ally float card ──────────────────────────────────────────── */
function AllyCard({
  src,
  name,
  delay,
  shadow,
  rotate,
}: {
  src: string;
  name: string;
  delay: number;
  shadow: string;
  rotate: string;
}) {
  return (
    <div
      className={styles.float}
      style={{
        background: "var(--vc-paper)",
        border: "4px solid #20180c",
        borderRadius: "22px",
        padding: "36px 46px",
        boxShadow: shadow,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "280px",
        height: "180px",
        transform: rotate,
        animationDelay: `${delay}s`,
        flex: "0 0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "13px",
          border: "2px dashed rgba(32,24,12,0.5)",
          borderRadius: "14px",
        }}
      />
      <img
        src={src}
        alt={name}
        style={{ maxWidth: "200px", maxHeight: "100px", objectFit: "contain" }}
      />
    </div>
  );
}

/* ── Main runtime ─────────────────────────────────────────────── */
function SlidesRuntime() {
  const params = useSearchParams();

  const title       = params.get("title")        ?? "VelociCode";
  const time        = params.get("time")         ?? "";
  const location    = params.get("location")     ?? "";
  const hideParam   = params.get("hide")         ?? "";
  const wifiNetwork = params.get("wifiNetwork")  ?? "";
  const wifiPassword= params.get("wifiPassword") ?? "";
  const wifiSecurity= params.get("wifiSecurity") ?? "";

  const hideSlugs   = hideParam.split(",").filter(Boolean);
  const hasEventInfo = Boolean(time || location);
  const seq          = buildSequence(hideSlugs, wifiNetwork, wifiPassword, hasEventInfo);
  const seqRef    = useRef(seq);
  useEffect(() => { seqRef.current = seq; }, [seq]);

  /* ── Display state ──────────────────────────────────────────── */
  const [idx,       setIdx]      = useState(0);
  const [outIdx,    setOutIdx]   = useState(-1);
  const [inIdx,     setInIdx]    = useState(-1);
  const [mode,      setMode]     = useState<TransMode>("A");
  const [swapping,  setSwapping] = useState(false);
  const [wiping,    setWiping]   = useState(false);
  const [paused,    setPaused]   = useState(false);
  const [progress,  setProgress] = useState(0);
  const [scale,     setScale]    = useState(1);
  const [qrs,       setQrs]      = useState<Record<string, string | null>>({});

  /* Refs so timer callback always reads latest values */
  const pausedRef   = useRef(paused);
  const swappingRef = useRef(swapping);
  const idxRef      = useRef(idx);
  const swapCountRef= useRef(0);
  const elapsedRef  = useRef(0);
  const lastRef     = useRef(0);
  const swapTimerRef= useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reducedRef  = useRef(false);

  useEffect(() => { pausedRef.current   = paused;   }, [paused]);
  useEffect(() => { swappingRef.current = swapping; }, [swapping]);
  useEffect(() => { idxRef.current      = idx;      }, [idx]);

  /* ── Scale to viewport ──────────────────────────────────────── */
  useEffect(() => {
    const fit = () => {
      setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  /* ── Reduced-motion flag ────────────────────────────────────── */
  useEffect(() => {
    reducedRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  /* ── QR generation ──────────────────────────────────────────── */
  useEffect(() => {
    const wifiPayload =
      wifiNetwork && wifiPassword && wifiSecurity
        ? `WIFI:T:${wifiSecurity};S:${wifiNetwork};P:${wifiPassword};;`
        : null;

    const gen = async () => {
      const [discord, itch, site, member, coc, wifi] = await Promise.all([
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://itch.io/jam/velocicode-2", 300),
        makeQR("https://acmsa.org/velocicode", 300),
        makeQR("https://acmsa.org", 240),
        makeQR("https://acmsa.org/code-of-conduct", 150),
        wifiPayload ? makeQR(wifiPayload, 280) : Promise.resolve(null),
      ]);
      setQrs({ discord, itch, site, member, coc, wifi });
    };
    gen();
  }, [wifiNetwork, wifiPassword, wifiSecurity]);

  /* ── Advance card ───────────────────────────────────────────── */
  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const n    = seqRef.current.length;
    const next = (((idxRef.current + dir) % n) + n) % n;
    const sc   = swapCountRef.current + 1;
    const m: TransMode = sc % 3 === 0 ? "C" : "A";

    swapCountRef.current = sc;
    elapsedRef.current   = 0;
    lastRef.current      = performance.now();

    setSwapping(true);
    setOutIdx(idxRef.current);
    setInIdx(next);
    setIdx(next);
    setMode(m);
    setWiping(m === "C");
    setProgress(0);

    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    const dur = reducedRef.current ? 60 : m === "C" ? 2050 : 860;
    swapTimerRef.current = setTimeout(() => {
      setSwapping(false);
      setOutIdx(-1);
      setInIdx(-1);
      setWiping(false);
      lastRef.current = performance.now();
    }, dur);
  }, []);

  /* ── Timer loop ─────────────────────────────────────────────── */
  useEffect(() => {
    lastRef.current = performance.now();
    const tick = setInterval(() => {
      if (pausedRef.current || swappingRef.current) {
        lastRef.current = performance.now();
        return;
      }
      const now = performance.now();
      const dt  = now - lastRef.current;
      lastRef.current = now;
      elapsedRef.current += dt;

      const slug = seqRef.current[idxRef.current] ?? "title";
      const dur  = DURATIONS[slug] * 1000;
      const p    = Math.min(1, elapsedRef.current / dur);

      if (elapsedRef.current >= dur) {
        advance(1);
      } else {
        setProgress(p);
      }
    }, 80);
    return () => clearInterval(tick);
  }, [advance]);

  /* ── Keyboard navigation ────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") advance(1);
      if (e.key === "ArrowLeft")  advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  /* ── Handlers ───────────────────────────────────────────────── */
  const onPrev = useCallback(() => advance(-1), [advance]);
  const onNext = useCallback(() => advance(1), [advance]);
  const onTogglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPaused((p) => !p);
  }, []);

  /* ── Convenience ────────────────────────────────────────────── */
  const cls = (slug: CardSlug) =>
    cardCls(slug, seq, idx, swapping, outIdx, inIdx, mode);

  const spacer = hasEventInfo ? "title" : "brand";
  const footerVisible = seq[idx] !== spacer;

  const footerMeta = [time, location].filter(Boolean).join(" · ");

  return (
    <div className={styles.viewport}>
      <div
        className={styles.frame}
        style={{ transform: `scale(${scale})` }}
      >
        {/* Ambient contour overlay */}
        <div className={styles.contour} />

        {/* ── Card stack ──────────────────────────────────────── */}
        <div className={styles.cards}>

          {/* ── TITLE ─────────────────────────────────────────── */}
          <div
            className={cls("title")}
            style={{
              background:
                "linear-gradient(180deg,#f7d289 0%,#f5e6c2 54%,#ecd197 100%)",
            }}
          >
            {/* Sun */}
            <svg
              width="540"
              height="540"
              viewBox="0 0 200 200"
              style={{ position: "absolute", top: "-160px", right: "-130px", overflow: "visible" }}
              aria-hidden="true"
            >
              <circle
                className={styles.sun}
                cx="100" cy="100" r="74"
                fill="none" stroke="#f0a830" strokeWidth="30" strokeDasharray="5 27"
              />
              <circle cx="100" cy="100" r="46" fill="#f5c800" stroke="#20180c" strokeWidth="4" />
            </svg>

            {/* Decorative flora */}
            <img src="/velocicode/fern.svg" alt=""
              style={{ position: "absolute", left: "-50px", bottom: "-40px", width: "380px", opacity: 0.92, transform: "rotate(6deg)" }} />
            <img src="/velocicode/palm-tree.svg" alt=""
              style={{ position: "absolute", right: "-40px", bottom: "60px", width: "300px", opacity: 0.85, transform: "scaleX(-1) rotate(8deg)" }} />
            <img src="/velocicode-logo.png" alt=""
              style={{ position: "absolute", right: "150px", bottom: "120px", width: "280px", transform: "rotate(-3deg)", filter: "drop-shadow(8px 10px 0 rgba(32,24,12,.18))" }} />

            {/* Compass */}
            <svg width="150" height="150" viewBox="0 0 150 150"
              style={{ position: "absolute", left: "96px", bottom: "150px" }}
              aria-hidden="true"
            >
              <circle cx="75" cy="75" r="66" fill="#f8edcceb" stroke="#20180c" strokeWidth="4" />
              <circle cx="75" cy="75" r="58" fill="none" stroke="#20180c" strokeWidth="1" strokeDasharray="2 10" />
              <text x="75" y="27" textAnchor="middle" fontFamily="Special Elite" fontSize="17" fill="#8c3914">N</text>
              <g className={styles.needle}>
                <polygon points="75,30 84,75 75,82 66,75" fill="#c44d24" stroke="#20180c" strokeWidth="2" />
                <polygon points="75,120 84,75 75,68 66,75" fill="#1e6016" stroke="#20180c" strokeWidth="2" />
              </g>
              <circle cx="75" cy="75" r="6" fill="#20180c" />
            </svg>

            {/* Content */}
            <div
              className={styles.stagger}
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "34px",
                textAlign: "center",
                padding: "0 120px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "27px",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                background: "#f8edccbf",
                border: "2.5px dashed var(--vc-rust)",
                padding: "11px 26px",
                transform: "rotate(-.6deg)",
              }}>
                ★&nbsp;&nbsp;VelociCode · Expedition 02&nbsp;&nbsp;★
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "240px",
                lineHeight: ".8",
                color: "var(--vc-leaf-deep)",
                textShadow: "6px 6px 0 #f5c800,13px 13px 0 #20180c",
                transform: "rotate(-1.5deg)",
              }}>
                {title.toUpperCase()}
              </div>
              <div style={{
                display: "inline-flex",
                gap: "36px",
                alignItems: "center",
                background: "var(--vc-ink)",
                color: "var(--vc-cream)",
                padding: "20px 44px",
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "35px",
                letterSpacing: ".13em",
                textTransform: "uppercase",
                border: "2.5px solid #000",
                boxShadow: "8px 8px 0 #5a3a18",
              }}>
                {time && (
                  <>
                    <span>
                      <span style={{ color: "var(--vc-mustard)" }}>{time}</span>
                    </span>
                    {location && <span style={{ color: "#f5e6c24d" }}>✦</span>}
                  </>
                )}
                {location && <span>📍 {location}</span>}
                {!time && !location && (
                  <span style={{ color: "var(--vc-mustard)" }}>VelociCode</span>
                )}
              </div>
            </div>
          </div>

          {/* ── QR CODES ──────────────────────────────────────── */}
          <div
            className={cls("qr")}
            style={{
              background: "var(--vc-paper)",
              backgroundImage: "repeating-linear-gradient(180deg,transparent 0 47px,rgba(90,58,24,.06) 47px 48px)",
            }}
          >
            <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "96px 120px 130px" }}>
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "18px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-clay)" }} />
                Field channels · scan in
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "104px",
                lineHeight: ".9",
                color: "var(--vc-ink)",
              }}>
                GET ON THE{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>RADIO.</span>
              </div>
              <div
                className={styles.stagger}
                style={{
                  display: "flex",
                  gap: "96px",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  marginTop: "auto",
                  paddingTop: "30px",
                }}
              >
                {[
                  { key: "discord", label: "Discord",  sub: "find your team ↗" },
                  { key: "itch",    label: "itch.io jam", sub: "submit your game ↗" },
                  { key: "site",    label: "acmsa.org", sub: "the whole route ↗" },
                ].map(({ key, label, sub }) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                    <div className={styles.scan} style={{ padding: "24px", background: "#fff", border: "3px solid #20180c" }}>
                      <QRImg src={qrs[key] ?? null} size={300} />
                    </div>
                    <div style={{ fontFamily: "var(--vc-font-display-3)", fontSize: "38px", color: "var(--vc-ink)" }}>{label}</div>
                    <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "23px", color: "var(--vc-rust)" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── WI-FI ─────────────────────────────────────────── */}
          <div className={cls("wifi")} style={{ background: "var(--vc-sand)" }}>
            <div
              className={styles.stagger}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "30px",
                padding: "0 130px 78px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-clay)" }} />
                Get online
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "120px",
                lineHeight: ".86",
                color: "var(--vc-ink)",
              }}>
                WI<span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>-FI.</span>
              </div>
              <div style={{ display: "flex", gap: "60px", alignItems: "stretch", marginTop: "6px" }}>
                <div style={{
                  flex: 1,
                  background: "var(--vc-paper)",
                  border: "2.5px solid #20180c",
                  boxShadow: "8px 8px 0 #5a3a18",
                  padding: "44px 50px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                  transform: "rotate(-.6deg)",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--vc-font-stamp)",
                      fontSize: "22px",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--vc-rust)",
                      marginBottom: "8px",
                    }}>Network</div>
                    <div style={{ fontFamily: "var(--vc-font-display-3)", fontSize: "56px", color: "var(--vc-ink)" }}>
                      {wifiNetwork}
                    </div>
                  </div>
                  <div style={{ borderTop: "2px dashed var(--vc-rust)", paddingTop: "26px" }}>
                    <div style={{
                      fontFamily: "var(--vc-font-stamp)",
                      fontSize: "22px",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "var(--vc-rust)",
                      marginBottom: "8px",
                    }}>Password</div>
                    <div style={{
                      fontFamily: "var(--vc-font-mono)",
                      fontWeight: 500,
                      fontSize: "56px",
                      color: "var(--vc-ink)",
                      letterSpacing: ".02em",
                    }}>
                      {wifiPassword}
                    </div>
                  </div>
                </div>
                {qrs.wifi && wifiSecurity && (
                  <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", justifyContent: "center" }}>
                    <div className={styles.scan} style={{ padding: "24px", background: "#fff", border: "3px solid #20180c" }}>
                      <QRImg src={qrs.wifi} size={280} />
                    </div>
                    <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "23px", color: "var(--vc-rust)" }}>scan to join ↗</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── SPONSORS ──────────────────────────────────────── */}
          <div
            className={cls("sponsors")}
            style={{
              background: "var(--vc-mustard)",
              backgroundImage:
                "radial-gradient(ellipse 1100px 460px at 0% 0%,#f0a830a6,transparent 70%),radial-gradient(ellipse 900px 420px at 100% 100%,#c44d244d,transparent 70%)",
            }}
          >
            <div
              className={styles.stagger}
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
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-clay)" }} />
                Outfitted by
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "104px",
                lineHeight: ".9",
                color: "var(--vc-ink)",
              }}>
                OUR{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-rust)" }}>SPONSORS.</span>
              </div>
              <div style={{
                display: "flex",
                gap: "48px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "30px",
              }}>
                {SPONSORS.map((s, i) => (
                  <AllyCard
                    key={s.name}
                    src={s.src}
                    name={s.name}
                    delay={i * 0.55}
                    shadow="7px 7px 0 #20180c"
                    rotate={i % 3 === 0 ? "rotate(-2deg)" : i % 3 === 1 ? "rotate(1.4deg)" : "rotate(-1deg)"}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── COMMUNITY PARTNERS ────────────────────────────── */}
          <div className={cls("partners")} style={{ background: "var(--vc-leaf-deep)" }}>
            <img src="/velocicode/palm-tree.svg" alt=""
              style={{ position: "absolute", right: "-60px", top: "40px", width: "420px", opacity: 0.16 }} />
            <div
              className={styles.stagger}
              style={{
                position: "relative",
                zIndex: 2,
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
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-mustard)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-mustard)" }} />
                Co-hosts on the expedition
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "96px",
                lineHeight: ".9",
                color: "var(--vc-mustard)",
              }}>
                COMMUNITY{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-leaf-far)" }}>PARTNERS.</span>
              </div>
              <div style={{
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                marginTop: "20px",
              }}>
                {COMMUNITY_PARTNERS.map((p, i) => (
                  <AllyCard
                    key={p.name}
                    src={p.src}
                    name={p.name}
                    delay={i * 0.4}
                    shadow="7px 7px 0 #0d3a08"
                    rotate={i % 2 === 0 ? `rotate(${1.2 - i * 0.4}deg)` : `rotate(${-1 + i * 0.3}deg)`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── SOCIALS ───────────────────────────────────────── */}
          <div className={cls("socials")} style={{ background: "var(--vc-ink)" }}>
            <div
              className={styles.stagger}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "26px",
                padding: "0 150px 78px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-mustard)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-mustard)" }} />
                Follow along · ACM SA
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "104px",
                lineHeight: ".9",
                color: "var(--vc-cream)",
              }}>
                FIND US{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-mustard)" }}>OUT THERE.</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "30px", marginTop: "14px" }}>
                {[
                  { icon: "/instagram.svg", label: "Instagram", handle: "@acm_sa" },
                  { icon: "/linkedin.svg",  label: "LinkedIn",  handle: "ACM San Antonio" },
                  { icon: "/youtube.svg",   label: "YouTube",   handle: "ACM SA" },
                  { icon: "/discord.svg",   label: "Discord",   handle: "discord.gg/acmsa" },
                ].map(({ icon, label, handle }) => (
                  <div key={label} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    fontFamily: "var(--vc-font-stamp)",
                    fontSize: "46px",
                    letterSpacing: ".02em",
                    color: "var(--vc-cream)",
                  }}>
                    <span style={{
                      width: "88px",
                      height: "88px",
                      border: "3px solid var(--vc-mustard)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flex: "none",
                    }}>
                      <img src={icon} alt="" style={{ width: "44px", filter: "invert(1)" }} />
                    </span>
                    <span style={{ color: "var(--vc-mustard)", width: "300px" }}>{label}</span>
                    {handle}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── NEW HERE ──────────────────────────────────────── */}
          <div
            className={cls("newhere")}
            style={{
              background: "var(--vc-cream)",
              backgroundImage: "repeating-linear-gradient(180deg,transparent 0 47px,rgba(90,58,24,.06) 47px 48px)",
            }}
          >
            <div
              className={styles.stagger}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "24px",
                padding: "0 130px 80px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-clay)" }} />
                New here?
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "96px",
                lineHeight: ".88",
                color: "var(--vc-ink)",
              }}>
                WANDER IN.{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-clay)" }}>STAY A WHILE.</span>
              </div>
              <div style={{
                fontFamily: "var(--vc-font-mono)",
                fontSize: "30px",
                lineHeight: "1.6",
                color: "var(--vc-ink)",
                maxWidth: "60%",
              }}>
                Hello, friend — VelociCode is run by{" "}
                <strong style={{ color: "var(--vc-clay)" }}>ACM San Antonio</strong>.
                New to all this? Here&apos;s how to find us after tonight.
              </div>
              <div style={{ display: "flex", gap: "70px", alignItems: "center", marginTop: "14px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  {[
                    { icon: "/instagram.svg", label: "Instagram", handle: "@acm_sa", filter: "none" },
                    { icon: "/linkedin.svg",  label: "LinkedIn",  handle: "ACM San Antonio", filter: "none" },
                  ].map(({ icon, label, handle, filter }) => (
                    <div key={label} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      fontFamily: "var(--vc-font-stamp)",
                      fontSize: "40px",
                      color: "var(--vc-ink)",
                    }}>
                      <span style={{
                        width: "78px",
                        height: "78px",
                        border: "3px solid var(--vc-ink)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flex: "none",
                      }}>
                        <img src={icon} alt="" style={{ width: "40px", filter }} />
                      </span>
                      <span style={{ color: "var(--vc-rust)", width: "260px" }}>{label}</span>
                      {handle}
                    </div>
                  ))}
                </div>
                <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
                  <div className={styles.scan} style={{ padding: "22px", background: "#fff", border: "3px solid #20180c" }}>
                    <QRImg src={qrs.member ?? null} size={240} />
                  </div>
                  <div style={{ fontFamily: "var(--vc-font-hand)", fontSize: "34px", color: "var(--vc-clay)" }}>
                    become a member →
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BRAND ─────────────────────────────────────────── */}
          <div
            className={cls("brand")}
            style={{ background: "linear-gradient(180deg,#f7d289 0%,#f5e6c2 48%,#5ab348 100%)" }}
          >
            <svg
              width="560" height="560" viewBox="0 0 200 200"
              style={{ position: "absolute", top: "-180px", left: "-150px", overflow: "visible" }}
              aria-hidden="true"
            >
              <circle
                className={styles.sun}
                cx="100" cy="100" r="74"
                fill="none" stroke="#f0a830" strokeWidth="30" strokeDasharray="5 27"
              />
              <circle cx="100" cy="100" r="46" fill="#f5c800" stroke="#20180c" strokeWidth="4" />
            </svg>
            <img src="/velocicode/fern.svg" alt=""
              style={{ position: "absolute", right: "-50px", bottom: "-30px", width: "420px", opacity: 0.9, transform: "scaleX(-1) rotate(-6deg)" }} />
            <img src="/velocicode-logo.png" alt=""
              style={{ position: "absolute", right: "200px", bottom: "40px", width: "360px", transform: "rotate(-4deg)", filter: "drop-shadow(10px 12px 0 rgba(13,58,8,.25))" }} />
            <div
              className={styles.stagger}
              style={{
                position: "relative",
                zIndex: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "18px",
                padding: "0 150px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "26px",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "var(--vc-rust)",
                background: "#f8edccbf",
                border: "2.5px dashed var(--vc-rust)",
                padding: "11px 26px",
                transform: "rotate(-.6deg)",
                marginBottom: "24px",
              }}>
                ★&nbsp;&nbsp;One month · one game · zero excuses&nbsp;&nbsp;★
              </div>
              <div style={{ display: "flex", alignItems: "center", lineHeight: ".82" }}>
                <span style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "200px",
                  color: "var(--vc-leaf-deep)",
                  textShadow: "6px 6px 0 #f5c800,13px 13px 0 #20180c",
                  transform: "rotate(-1.5deg)",
                }}>VELOCI</span>
                <span style={{
                  fontFamily: "var(--vc-font-display-2)",
                  fontSize: "200px",
                  color: "var(--vc-clay)",
                  textShadow: "7px 7px 0 #20180c",
                  transform: "rotate(1.5deg)",
                }}>CODE</span>
                <span style={{
                  fontFamily: "var(--vc-font-hand)",
                  fontSize: "150px",
                  color: "var(--vc-ink)",
                  transform: "rotate(-12deg) translateY(-18px)",
                }}>!</span>
              </div>
              <div style={{
                fontFamily: "var(--vc-font-hand)",
                fontSize: "64px",
                color: "var(--vc-rust)",
                transform: "rotate(-1.5deg)",
              }}>
                <span style={{
                  textDecoration: "line-through",
                  textDecorationColor: "var(--vc-clay)",
                  textDecorationThickness: "4px",
                  opacity: 0.5,
                  marginRight: ".35em",
                }}>a hackathon</span>
                a month-long game jam.
              </div>
            </div>
          </div>

          {/* ── CODE OF CONDUCT ───────────────────────────────── */}
          <div className={cls("coc")} style={{ background: "var(--vc-rust)" }}>
            <div
              className={styles.stagger}
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "28px",
                padding: "0 140px 80px",
              }}
            >
              <div style={{
                fontFamily: "var(--vc-font-stamp)",
                fontSize: "25px",
                letterSpacing: ".28em",
                textTransform: "uppercase",
                color: "var(--vc-mustard)",
                display: "inline-flex",
                alignItems: "center",
                gap: "16px",
              }}>
                <span style={{ width: "46px", height: "2px", background: "var(--vc-mustard)" }} />
                Field rules
              </div>
              <div style={{
                fontFamily: "var(--vc-font-display-1)",
                fontSize: "118px",
                lineHeight: ".86",
                color: "var(--vc-paper)",
              }}>
                BE KIND.{" "}
                <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-mustard)" }}>BUILD WEIRD.</span>
              </div>
              <div style={{
                fontFamily: "var(--vc-font-mono)",
                fontSize: "32px",
                lineHeight: "1.6",
                color: "var(--vc-paper)",
                maxWidth: "62%",
              }}>
                Respect every explorer — beginners, artists, audio folks, all of us.
                No exhaustion-as-flex, no jerks. The full code of conduct lives here.
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "14px" }}>
                <div style={{
                  fontFamily: "var(--vc-font-stamp)",
                  fontSize: "30px",
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: "var(--vc-paper)",
                  border: "2.5px solid var(--vc-paper)",
                  boxShadow: "6px 6px 0 #20180c",
                  padding: "18px 28px",
                }}>
                  acmsa.org/code-of-conduct ↗
                </div>
                <div style={{ padding: "18px", background: "#fff", border: "3px solid #20180c", boxShadow: "5px 5px 0 #20180c" }}>
                  <QRImg src={qrs.coc ?? null} size={150} />
                </div>
              </div>
            </div>
          </div>

        </div>{/* /cards */}

        {/* ── Plane wipe overlay (transition C) ─────────────────── */}
        {wiping && (
          <div className={styles.planeWipe}>
            <svg className={styles.trail} viewBox="0 0 1920 1080" preserveAspectRatio="none">
              <path d="M-260 -160 L2100 1240" />
            </svg>
            <div className={styles.plane}>
              <svg width="360" height="250" viewBox="0 0 150 104">
                <rect x="22" y="44" width="86" height="13" fill="#f5c800" stroke="#20180c" strokeWidth="3" />
                <path d="M8 50 L100 41 L128 50 L100 59 Z" fill="#8c3914" stroke="#20180c" strokeWidth="3" />
                <path d="M100 41 L116 20 L120 46 Z" fill="#8c3914" stroke="#20180c" strokeWidth="3" />
                <circle cx="74" cy="50" r="7" fill="#9fe0c0" stroke="#20180c" strokeWidth="2" />
                <line x1="9" y1="38" x2="9" y2="62" stroke="#20180c" strokeWidth="5" />
              </svg>
            </div>
          </div>
        )}

        {/* ── Progress bar ───────────────────────────────────────── */}
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${paused ? progress * 100 : progress * 100}%` }}
          />
        </div>

        {/* ── Brand mark ────────────────────────────────────────── */}
        <div className={styles.brand}>
          <img src="/velocicode-logo.png" alt="VelociCode" className={styles.brandImg} />
        </div>

        {/* ── Footer (all cards except title) ───────────────────── */}
        {footerVisible && (
          <div className={styles.footer}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
              <span className={styles.footerDot} />
              VelociCode · Expedition 02
            </span>
            <span>
              {title}
              {footerMeta && (
                <>
                  <span style={{ color: "var(--vc-mustard)", margin: "0 12px" }}>·</span>
                  {footerMeta}
                </>
              )}
            </span>
          </div>
        )}

        {/* ── Click zones ────────────────────────────────────────── */}
        <div className={styles.zoneLeft}  onClick={onPrev} />
        <div className={styles.zoneRight} onClick={onNext} />

        {/* ── Pause / play ───────────────────────────────────────── */}
        <button
          type="button"
          className={styles.pause}
          onClick={onTogglePause}
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? "►" : "❙❙"}
        </button>

      </div>{/* /frame */}
    </div>
  );
}

/* ── Page export ──────────────────────────────────────────────── */
export default function SlidesPage() {
  return (
    <>
      {/* Invisible element triggers Next.js @font-face injection for all VC fonts */}
      <span className={FONT_TRIGGER_CLASS} style={{ display: "none" }} aria-hidden="true" />
      <Suspense>
        <SlidesRuntime />
      </Suspense>
    </>
  );
}
