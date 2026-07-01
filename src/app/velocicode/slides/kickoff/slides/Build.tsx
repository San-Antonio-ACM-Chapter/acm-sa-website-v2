import slides from "../../slides.module.css";
import kf from "../kickoff.module.css";
import { Eyebrow, QRImg } from "../slide-utils";
import type { QRSlideProps } from "../slide-utils";

const QR_ITEMS = [
  { key: "discord", label: "Discord",     sub: "find your team ↗" },
  { key: "itch",    label: "itch.io jam", sub: "submit your game ↗" },
  { key: "site",    label: "acmsa.org",   sub: "full calendar & info ↗" },
];

export function Build({ cls, qrs }: QRSlideProps) {
  return (
    <div className={cls} style={{ background: "linear-gradient(180deg,#f7d289 0%,#f5e6c2 48%,#5ab348 100%)" }}>
      <img src="/velocicode/fern.svg" alt=""
        style={{ position: "absolute", left: "-50px", bottom: "-40px", width: "340px", opacity: 0.85, transform: "rotate(6deg)" }} />
      <div className={kf.kfStagger} style={{
        position: "relative", zIndex: 2, height: "100%",
        display: "flex", flexDirection: "column",
        justifyContent: "center", gap: "26px", padding: "0 130px 80px",
      }}>
        <Eyebrow>Go build · find your team</Eyebrow>
        <div style={{
          fontFamily: "var(--vc-font-display-1)", fontSize: "148px", lineHeight: ".82",
          color: "var(--vc-leaf-deep)", textShadow: "5px 5px 0 #f5c800,11px 11px 0 #20180c",
          transform: "rotate(-1.5deg)",
        }}>
          LET&apos;S BUILD.
        </div>
        <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "30px", lineHeight: "1.55", color: "var(--vc-ink)", maxWidth: "820px" }}>
          No need to rush out so stick around, find your teammates, swap Discord handles, and hang out.
          The kickoff crew is right here in this room.
        </div>
        <div style={{ display: "flex", gap: "48px", marginTop: "10px" }}>
          {QR_ITEMS.map(({ key, label, sub }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
              <div className={slides.scan} style={{ padding: "18px", background: "#fff", border: "3px solid #20180c" }}>
                <QRImg src={qrs[key] ?? null} size={220} />
              </div>
              <div style={{ fontFamily: "var(--vc-font-stamp)", fontSize: "21px", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--vc-ink)" }}>{label}</div>
              <div style={{ fontFamily: "var(--vc-font-mono)", fontSize: "18px", color: "var(--vc-rust)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
