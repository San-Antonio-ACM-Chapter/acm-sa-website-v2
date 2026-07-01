import kf from "../kickoff.module.css";
import type { SlideProps } from "../slide-utils";
import { Eyebrow } from "../slide-utils";

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

export function Judging({ cls }: SlideProps) {
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
          gap: "24px",
          padding: "60px 110px 100px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">How your game gets scored</Eyebrow>
        <div
          style={{
            fontFamily: "var(--vc-font-display-1)",
            fontSize: "96px",
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
            JUDGING.
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "28px",
            alignItems: "stretch",
            marginTop: "10px",
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
                padding: "28px 26px 32px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transform: `rotate(${rotate})`,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--vc-font-display-1)",
                  fontSize: "48px",
                  lineHeight: "1",
                  color: "var(--vc-leaf-deep)",
                }}
              >
                {n}
              </span>
              <div
                style={{
                  fontFamily: "var(--vc-font-display-3)",
                  fontSize: "28px",
                  lineHeight: "1.1",
                  color: "var(--vc-ink)",
                }}
              >
                {cat}
              </div>
              <div
                style={{
                  fontFamily: "var(--vc-font-mono)",
                  fontSize: "18px",
                  lineHeight: "1.55",
                  color: "var(--vc-ink)",
                  marginTop: "6px",
                }}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
