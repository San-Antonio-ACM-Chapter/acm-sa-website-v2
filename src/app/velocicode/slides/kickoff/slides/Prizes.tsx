import kf from "../kickoff.module.css";
import { Eyebrow } from "../slide-utils";
import type { SlideProps } from "../slide-utils";

const PRIZES = [
  { cat: "Best Overall",      amount: "$200 value",  note: "Split across the whole team.", decided: "Decided by judges", dark: false, rotate: "-1deg"  },
  { cat: "Best Use of Theme", amount: "$100 value",  note: "Split across the whole team.", decided: "Decided by judges", dark: false, rotate: ".8deg"  },
  { cat: "Crowd Favorite",    amount: "$10-20", note: "Per team member.", decided: "Attendee vote", dark: true,  rotate: "-1.4deg" },
];

export function Prizes({ cls }: SlideProps) {
  return (
    <div className={cls} style={{
      background: "var(--vc-mustard)",
      backgroundImage: "radial-gradient(ellipse 1100px 460px at 0% 0%,#f0a830a6,transparent 70%),radial-gradient(ellipse 900px 420px at 100% 100%,#c44d244d,transparent 70%)",
    }}>
      <div className={kf.kfStagger} style={{
        height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "24px", padding: "60px 110px 100px",
      }}>
        <Eyebrow>What you&apos;re playing for</Eyebrow>
        <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: "96px", lineHeight: ".86", color: "var(--vc-ink)" }}>
          THE{" "}
          <span style={{ fontFamily: "var(--vc-font-display-2)", color: "var(--vc-rust)" }}>PRIZES.</span>
        </div>
        <div style={{ display: "flex", gap: "40px", alignItems: "stretch", marginTop: "10px" }}>
          {PRIZES.map(({ cat, amount, note, decided, dark, rotate }) => (
            <div key={cat} style={{
              flex: 1, background: dark ? "var(--vc-ink)" : "var(--vc-paper)",
              border: "2.5px solid var(--vc-ink)",
              boxShadow: `7px 7px 0 ${dark ? "var(--vc-clay)" : "var(--vc-ink)"}`,
              padding: "34px 32px", display: "flex", flexDirection: "column", gap: "14px",
              transform: `rotate(${rotate})`, position: "relative",
            }}>
              {dark && (
                <div style={{
                  position: "absolute", top: "-20px", right: "-14px",
                  fontFamily: "var(--vc-font-stamp)", fontSize: "18px", letterSpacing: ".08em",
                  textTransform: "uppercase", color: "var(--vc-ink)",
                  background: "var(--vc-mustard)", border: "2.5px solid var(--vc-ink)",
                  boxShadow: "3px 3px 0 var(--vc-ink)", padding: "8px 14px", transform: "rotate(5deg)",
                }}>Not split!</div>
              )}
              <div style={{ fontFamily: "var(--vc-font-display-3)", fontSize: "34px", color: dark ? "var(--vc-mustard)" : "var(--vc-ink)" }}>{cat}</div>
              <div style={{ fontFamily: "var(--vc-font-display-1)", fontSize: dark ? "60px" : "64px", lineHeight: ".9", color: dark ? "var(--vc-cream)" : "var(--vc-leaf-deep)" }}>{amount}</div>
              <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "24px", lineHeight: "1.45", color: dark ? "var(--vc-paper)" : "var(--vc-ink)" }}>{note}</div>
              <div style={{
                marginTop: "auto", fontFamily: "var(--vc-font-stamp)", fontSize: "19px",
                letterSpacing: ".1em", textTransform: "uppercase",
                color: dark ? "var(--vc-mustard)" : "var(--vc-rust)",
                borderTop: `2px dashed ${dark ? "var(--vc-mustard)" : "var(--vc-rust)"}`,
                paddingTop: "14px",
              }}>{decided}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
