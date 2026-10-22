"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { STOPS } from "../../events";
import { VCSymbols } from "../../graphics/VCSymbols";
import { SlideFrame } from "../SlideFrame";
import { SLIDE_FONT_CLASSES } from "../slide-fonts";
import { cardCls, deriveSlideEvents, makeQR, useSlideNav } from "./slide-utils";
import { Awards } from "./slides/Awards";
import { Build } from "./slides/Build";
import { CoC } from "./slides/CoC";
import { Giveaway } from "./slides/Giveaway";
import { Judging } from "./slides/Judging";
import { Month } from "./slides/Month";
import { Numbers } from "./slides/Numbers";
import { Playtest } from "./slides/Playtest";
import { Prizes } from "./slides/Prizes";
import { QA } from "./slides/QA";
import { Radio } from "./slides/Radio";
import { Route } from "./slides/Route";
import { Rules } from "./slides/Rules";
import { Schedule } from "./slides/Schedule";
import { Showcase } from "./slides/Showcase";
import { Sponsors } from "./slides/Sponsors";
import { ThemeReveal } from "./slides/ThemeReveal";
import { Title } from "./slides/Title";
import { Welcome } from "./slides/Welcome";

function chunkArr<T>(arr: T[], n: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

const SCHEDULE_CHUNKS = chunkArr(deriveSlideEvents(STOPS), 6);
const SCHEDULE_IDX = 12;
const POST = SCHEDULE_IDX + SCHEDULE_CHUNKS.length;
const TOTAL = POST + 6; // Month, Sponsors, Giveaway, ThemeReveal, QA, Build
const THEME_REVEAL_IDX = POST + 3;
const SLIDE_DURATION = 12;

function KickoffRuntime() {
  const params = useSearchParams();
  const initialIdx = Math.max(
    0,
    Math.min(TOTAL - 1, (parseInt(params.get("slide") ?? "1", 10) || 1) - 1),
  );

  const [qrs, setQrs] = useState<Record<string, string | null>>({});
  const [themeStep, setThemeStep] = useState(0);
  const themeStepRef = useRef(0);

  useEffect(() => {
    themeStepRef.current = themeStep;
  }, [themeStep]);

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
    onStep: () => setThemeStep(0),
    onIntercept: (dir, cur) => {
      if (dir === 1 && cur === THEME_REVEAL_IDX && themeStepRef.current < 3) {
        setThemeStep((s) => s + 1);
        return true;
      }
      return false;
    },
  });

  const c = (i: number) => cardCls(i, idx, swapping, outIdx, inIdx);

  return (
    <SlideFrame
      scale={scale}
      idx={idx}
      total={TOTAL}
      footerRight="Kickoff · 7:00 pm · Geekdom 3rd Floor"
      onPrev={onPrev}
      onNext={onNext}
      autoplay={{ progress, paused, onTogglePause }}
      beforeFrame={<VCSymbols />}
    >
      <Title cls={c(0)} />
      <Welcome cls={c(1)} />
      <Numbers cls={c(2)} />
      <Rules cls={c(3)} />
      <Awards cls={c(4)} />
      <Judging cls={c(5)} />
      <Prizes cls={c(6)} />
      <CoC cls={c(7)} qrs={qrs} />
      <Route cls={c(8)} />
      <Radio cls={c(9)} qrs={qrs} />
      <Playtest cls={c(10)} />
      <Showcase cls={c(11)} />
      {SCHEDULE_CHUNKS.map((evts, pi) => (
        <Schedule
          key={evts[0]?.title ?? `sched-${pi}`}
          cls={c(SCHEDULE_IDX + pi)}
          events={evts}
          pageNum={pi + 1}
          totalPages={SCHEDULE_CHUNKS.length}
        />
      ))}
      <Month cls={c(POST)} qrs={qrs} />
      <Sponsors cls={c(POST + 1)} />
      <Giveaway cls={c(POST + 2)} />
      <ThemeReveal cls={c(POST + 3)} themeStep={themeStep} />
      <QA cls={c(POST + 4)} />
      <Build cls={c(POST + 5)} qrs={qrs} />
    </SlideFrame>
  );
}

export default function KickoffPage() {
  return (
    <>
      <span
        className={SLIDE_FONT_CLASSES}
        style={{ display: "none" }}
        aria-hidden="true"
      />
      <Suspense>
        <KickoffRuntime />
      </Suspense>
    </>
  );
}
