import type { MouseEvent, ReactNode } from "react";
import kf from "./kickoff/kickoff.module.css";
import slides from "./slides.module.css";

interface SlideFrameProps {
  scale: number;
  idx: number;
  total: number;
  /** Right-side footer text, e.g. "Showcase · Aug 1 · St. Mary's University" */
  footerRight: string;
  onPrev: () => void;
  onNext: () => void;
  /** The rendered card stack — goes inside slides.cards */
  children: ReactNode;
  /** Content inside the viewport but outside the frame (e.g. audio elements) */
  beforeFrame?: ReactNode;
  /** Content inside the frame after the card zones (e.g. audio controls) */
  afterCards?: ReactNode;
  /** Renders the progress bar and pause button for auto-advancing decks */
  autoplay?: {
    progress: number;
    paused: boolean;
    onTogglePause: (e: MouseEvent) => void;
  };
}

export function SlideFrame({
  scale,
  idx,
  total,
  footerRight,
  onPrev,
  onNext,
  children,
  beforeFrame,
  afterCards,
  autoplay,
}: SlideFrameProps) {
  return (
    <div className={slides.viewport}>
      {beforeFrame}
      <div className={slides.frame} style={{ transform: `scale(${scale})` }}>
        <div className={slides.contour} />

        <div className={slides.cards}>{children}</div>

        {autoplay && (
          <div className={slides.progressTrack}>
            <div
              className={slides.progressFill}
              style={{ width: `${autoplay.progress * 100}%` }}
            />
          </div>
        )}

        <div className={slides.brand}>
          {/* biome-ignore lint/performance/noImgElement: kiosk slide */}
          <img
            src="/velocicode-logo.png"
            className={slides.brandImg}
            alt="VelociCode"
          />
        </div>

        <div className={kf.kfCount}>
          {idx + 1} / {total}
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
          <span>{footerRight}</span>
        </div>

        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk */}
        <div className={slides.zoneLeft} onClick={onPrev} />
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: presenter kiosk */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: presenter kiosk */}
        <div className={slides.zoneRight} onClick={onNext} />

        {autoplay && (
          <button
            type="button"
            className={slides.pause}
            onClick={autoplay.onTogglePause}
            aria-label={autoplay.paused ? "Play" : "Pause"}
          >
            {autoplay.paused ? "►" : "❙❙"}
          </button>
        )}

        {afterCards}
      </div>
    </div>
  );
}
