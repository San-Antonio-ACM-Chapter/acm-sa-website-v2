import kf from "../kickoff.module.css";
import type { SlideProps } from "../slide-utils";
import { Eyebrow } from "../slide-utils";

const AWARDS = [
  {
    icon: "vc-compass",
    badge: null,
    rank: "the prompt, nailed",
    title: "Best Theme",
    desc: "The cleverest, boldest, most heartfelt take on this year's theme reveal — the game that makes the prompt sing. Surprise us.",
    center: false,
    rotate: "-1.2deg",
    translateY: "0",
  },
  {
    icon: "vc-medal",
    badge: "★ the headline award ★",
    rank: "the big one",
    title: "Best Overall",
    desc: "Fun to play, polished, and it sticks with you. The judges' pick for the game that nails it top to bottom — story, feel, and finish.",
    center: true,
    rotate: "-0.5deg",
    translateY: "-36px",
  },
  {
    icon: "vc-megaphone",
    badge: null,
    rank: "voted by the room",
    title: "Crowd Favorite",
    desc: "Decided by the community. Everyone at the showcase gets a ticket to vote — the people's champ takes it home, no judges required.",
    center: false,
    rotate: "1deg",
    translateY: "0",
  },
];

export function Awards({ cls }: SlideProps) {
  return (
    <div
      className={cls}
      style={{
        background: "var(--vc-leaf-deep)",
        backgroundImage:
          "repeating-linear-gradient(45deg,transparent 0 22px,rgba(13,58,8,.4) 22px 24px)",
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
          padding: "60px 110px 80px",
        }}
      >
        <Eyebrow color="var(--vc-mustard)">
          What you&apos;re playing for
        </Eyebrow>
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
            AWARDS.
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.15fr 1fr",
            gap: "32px",
            alignItems: "end",
            marginTop: "10px",
          }}
        >
          {AWARDS.map(
            ({
              icon,
              badge,
              rank,
              title,
              desc,
              center,
              rotate,
              translateY,
            }) => (
              <div
                key={title}
                style={{
                  position: "relative",
                  background: center ? "var(--vc-sand)" : "var(--vc-paper)",
                  border: "2.5px solid var(--vc-ink)",
                  boxShadow: "7px 7px 0 var(--vc-ink)",
                  padding: center ? "52px 32px 34px" : "34px 30px 30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                  transform: `rotate(${rotate}) translateY(${translateY})`,
                  color: "var(--vc-ink)",
                }}
              >
                {badge && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-17px",
                      left: "30px",
                      background: "var(--vc-rust)",
                      color: "var(--vc-paper)",
                      border: "2.5px solid var(--vc-ink)",
                      fontFamily: "var(--vc-font-stamp)",
                      fontSize: "17px",
                      letterSpacing: ".16em",
                      textTransform: "uppercase",
                      padding: "7px 14px",
                      transform: "rotate(-2deg)",
                    }}
                  >
                    {badge}
                  </div>
                )}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    border: "2.5px solid var(--vc-ink)",
                    background: center ? "var(--vc-clay)" : "var(--vc-mustard)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    viewBox="0 0 64 64"
                    width="46"
                    height="46"
                    aria-hidden="true"
                  >
                    <use href={`#${icon}`} />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "var(--vc-font-hand)",
                    fontSize: "36px",
                    lineHeight: 1,
                    color: "var(--vc-rust)",
                    display: "inline-block",
                    transform: "rotate(-1.5deg)",
                  }}
                >
                  {rank}
                </span>
                <div
                  style={{
                    fontFamily: "var(--vc-font-display-3)",
                    fontSize: "40px",
                    lineHeight: 1.05,
                    color: "var(--vc-ink)",
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    fontFamily: "var(--vc-font-mono)",
                    fontSize: "21px",
                    lineHeight: 1.55,
                    color: "rgba(32,24,12,.82)",
                  }}
                >
                  {desc}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
