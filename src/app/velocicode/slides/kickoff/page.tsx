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
import slides from "../slides.module.css";
import kf from "./kickoff.module.css";
import { makeQR } from "./slide-utils";
import { Build }        from "./slides/Build";
import { CoC }          from "./slides/CoC";
import { Giveaway }     from "./slides/Giveaway";
import { Month }        from "./slides/Month";
import { Numbers }      from "./slides/Numbers";
import { Playtest }     from "./slides/Playtest";
import { Prizes }       from "./slides/Prizes";
import { QA }           from "./slides/QA";
import { Radio }        from "./slides/Radio";
import { Route }        from "./slides/Route";
import { Rules }        from "./slides/Rules";
import { Schedule }     from "./slides/Schedule";
import { Showcase }     from "./slides/Showcase";
import { Sponsors }     from "./slides/Sponsors";
import { ThemeReveal }  from "./slides/ThemeReveal";
import { Title }        from "./slides/Title";
import { Welcome }      from "./slides/Welcome";

const luckiestGuy = Luckiest_Guy({ subsets: ["latin"], weight: "400", display: "swap" });
const rubikDirt   = Rubik_Dirt({ subsets: ["latin"], weight: "400", display: "swap" });
const bowlby      = Bowlby_One_SC({ subsets: ["latin"], weight: "400", display: "swap" });
const caveat      = Caveat_Brush({ subsets: ["latin"], weight: "400", display: "swap" });
const elite       = Special_Elite({ subsets: ["latin"], weight: "400", display: "swap" });
const dmMono      = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const FONT_TRIGGER_CLASS = [
  luckiestGuy.className, rubikDirt.className, bowlby.className,
  caveat.className, elite.className, dmMono.className,
].join(" ");

const TOTAL = 17;
const SLIDE_DURATION = 12;
const THEME_REVEAL_IDX = 14;

function cardCls(i: number, current: number, swapping: boolean, outIdx: number, inIdx: number): string {
  if (swapping) {
    if (i === outIdx) return `${kf.kfCard} ${kf.kfIsOut}`;
    if (i === inIdx)  return `${kf.kfCard} ${kf.kfIsIn}`;
    return kf.kfCard;
  }
  return `${kf.kfCard}${i === current ? ` ${kf.kfIsActive}` : ""}`;
}

function KickoffRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(0, Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1") || 1) - 1));

  const [idx,       setIdx]      = useState(initialIdx);
  const [outIdx,    setOutIdx]   = useState(-1);
  const [inIdx,     setInIdx]    = useState(-1);
  const [swapping,  setSwapping] = useState(false);
  const [paused,    setPaused]   = useState(true);
  const [progress,  setProgress] = useState(0);
  const [scale,     setScale]    = useState(1);
  const [qrs,       setQrs]      = useState<Record<string, string | null>>({});
  const [themeStep, setThemeStep]= useState(0);

  const pausedRef    = useRef(true);
  const swappingRef  = useRef(false);
  const idxRef       = useRef(initialIdx);
  const themeStepRef = useRef(0);
  const elapsedRef   = useRef(0);
  const lastRef      = useRef(0);
  const swapTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const reducedRef   = useRef(false);

  useEffect(() => { pausedRef.current    = paused;    }, [paused]);
  useEffect(() => { swappingRef.current  = swapping;  }, [swapping]);
  useEffect(() => { idxRef.current       = idx;       }, [idx]);
  useEffect(() => { themeStepRef.current = themeStep; }, [themeStep]);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    (async () => {
      const [discord, itch, site, coc] = await Promise.all([
        makeQR("https://discord.gg/t94zZC3Ktm", 300),
        makeQR("https://itch.io/jam/velocicode-2", 300),
        makeQR("https://acmsa.org/velocicode", 300),
        makeQR("https://acmsa.org/code-of-conduct", 180),
      ]);
      setQrs({ discord, itch, site, coc });
    })();
  }, []);

  const advance = useCallback((dir: 1 | -1) => {
    if (swappingRef.current) return;
    const next = (((idxRef.current + dir) % TOTAL) + TOTAL) % TOTAL;

    elapsedRef.current = 0;
    lastRef.current    = performance.now();

    setSwapping(true);
    setOutIdx(idxRef.current);
    setInIdx(next);
    setIdx(next);
    setProgress(0);
    setThemeStep(0);

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
      const dt  = now - lastRef.current;
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
  const onNext = useCallback(() => {
    if (idxRef.current === THEME_REVEAL_IDX && themeStepRef.current < 3) {
      setThemeStep(s => s + 1);
      elapsedRef.current = 0;
    } else {
      advance(1);
    }
  }, [advance]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") onNext();
      if (e.key === "ArrowLeft")  onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onNext, onPrev]);

  const onTogglePause = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setPaused(p => !p);
  }, []);

  const c = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <div className={slides.viewport}>
      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>
          <Title        cls={c(0)} />
          <Welcome      cls={c(1)} />
          <Numbers      cls={c(2)} />
          <Rules        cls={c(3)} />
          <CoC          cls={c(4)}  qrs={qrs} />
          <Route        cls={c(5)} />
          <Radio        cls={c(6)}  qrs={qrs} />
          <Playtest     cls={c(7)} />
          <Showcase     cls={c(8)} />
          <Schedule     cls={c(9)} />
          <Month        cls={c(10)} qrs={qrs} />
          <Prizes       cls={c(11)} />
          <Sponsors     cls={c(12)} />
          <Giveaway     cls={c(13)} />
          <ThemeReveal  cls={c(14)} themeStep={themeStep} />
          <QA           cls={c(15)} />
          <Build        cls={c(16)} qrs={qrs} />
        </div>

        <div className={slides.progressTrack}>
          <div className={slides.progressFill} style={{ width: `${progress * 100}%` }} />
        </div>

        <div className={slides.brand}>
          <img src="/velocicode-logo.png" alt="VelociCode" className={slides.brandImg} />
        </div>

        <div className={kf.kfCount}>{idx + 1} / {TOTAL}</div>

        <div className={slides.footer}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "16px" }}>
            <span className={slides.footerDot} />
            Velocicode · Expedition 02
          </span>
          <span>Kickoff · 7:00 pm · Geekdom 3rd Floor</span>
        </div>

        <div className={slides.zoneLeft}  onClick={onPrev} />
        <div className={slides.zoneRight} onClick={onNext} />

        <button type="button" className={slides.pause} onClick={onTogglePause}
          aria-label={paused ? "Play" : "Pause"}>
          {paused ? "►" : "❙❙"}
        </button>
      </div>
    </div>
  );
}

export default function KickoffPage() {
  return (
    <>
      <span className={FONT_TRIGGER_CLASS} style={{ display: "none" }} aria-hidden="true" />
      <Suspense>
        <KickoffRuntime />
      </Suspense>
    </>
  );
}
