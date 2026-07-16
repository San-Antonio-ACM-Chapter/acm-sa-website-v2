"use client";

import { DM_Mono, Luckiest_Guy, Special_Elite } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import styles from "../../configure/configure.module.css";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const elite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

type SuperlativeEntry = { title: string; winner: string };

function buildUrl(
  origin: string,
  demos: number,
  superlatives: SuperlativeEntry[],
): string {
  const base = `${origin}/velocicode/slides/playtest-night`;
  const p = new URLSearchParams();
  if (demos > 0) p.set("demos", String(demos));
  superlatives.forEach((s, i) => {
    if (s.title.trim()) {
      p.set(`s${i + 1}`, s.title.trim());
      if (s.winner.trim()) p.set(`w${i + 1}`, s.winner.trim());
    }
  });
  const qs = p.toString();
  return qs ? `${base}?${qs}` : base;
}

export default function PlaytestConfigurePage() {
  const [demos, setDemos] = useState(0);
  const [superlatives, setSuperlatives] = useState<SuperlativeEntry[]>([
    { title: "", winner: "" },
  ]);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const url = buildUrl(origin, demos, superlatives);

  const addSuperlative = useCallback(() => {
    setSuperlatives((prev) => [...prev, { title: "", winner: "" }]);
  }, []);

  const removeSuperlative = useCallback((i: number) => {
    setSuperlatives((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const updateSuperlative = useCallback(
    (i: number, field: keyof SuperlativeEntry, value: string) => {
      setSuperlatives((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
      );
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  }, [url]);

  const fontCls = [
    luckiestGuy.className,
    elite.className,
    dmMono.className,
  ].join(" ");

  const filledSuperlatives = superlatives.filter((s) => s.title.trim());

  return (
    <div className={`${styles.page} ${fontCls}`}>
      {/* ── Nav ────────────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.dot} />
          VelociCode · Slides
        </div>
        <a href="/velocicode/slides" className={styles.navLink}>
          ← All slides
        </a>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Event · Jul 17</div>
        <h1 className={`${styles.title} ${luckiestGuy.className}`}>
          Configure Playtest Night
        </h1>
        <p className={styles.sub}>
          Set the demo count and superlatives, then copy the generated link to
          open the deck. Nothing is saved — reconfigure before each segment.
        </p>

        <div className={styles.card}>
          {/* ── Demos ────────────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Demos</div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="demos">
                  Number of demos tonight
                </label>
                <input
                  id="demos"
                  type="number"
                  min={0}
                  max={99}
                  className={styles.input}
                  placeholder="0"
                  value={demos === 0 ? "" : demos}
                  onChange={(e) =>
                    setDemos(Math.max(0, parseInt(e.target.value, 10) || 0))
                  }
                />
              </div>
            </div>
          </div>

          {/* ── Superlatives ─────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Superlatives
              <span
                style={{
                  opacity: 0.55,
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                  marginLeft: "10px",
                }}
              >
                — winners are revealed one by one in the deck
              </span>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {superlatives.map((s, i) => (
                <div
                  key={`sup-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: order-stable list, no reordering
                    i
                  }`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gap: "12px",
                    alignItems: "end",
                  }}
                >
                  <div className={styles.field}>
                    {i === 0 && (
                      <label className={styles.label} htmlFor={`s-title-${i}`}>
                        Superlative
                      </label>
                    )}
                    <input
                      id={`s-title-${i}`}
                      type="text"
                      className={styles.input}
                      placeholder="Best Audio"
                      value={s.title}
                      onChange={(e) =>
                        updateSuperlative(i, "title", e.target.value)
                      }
                    />
                  </div>
                  <div className={styles.field}>
                    {i === 0 && (
                      <label
                        className={styles.label}
                        htmlFor={`s-winner-${i}`}
                      >
                        Winner
                      </label>
                    )}
                    <input
                      id={`s-winner-${i}`}
                      type="text"
                      className={styles.input}
                      placeholder="Team name or person"
                      value={s.winner}
                      onChange={(e) =>
                        updateSuperlative(i, "winner", e.target.value)
                      }
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSuperlative(i)}
                    disabled={superlatives.length === 1}
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "1rem",
                      background: "transparent",
                      border: "2.5px solid #20180c",
                      color: "#20180c",
                      width: "46px",
                      height: "46px",
                      cursor:
                        superlatives.length === 1 ? "not-allowed" : "pointer",
                      opacity: superlatives.length === 1 ? 0.3 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-label="Remove superlative"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              onClick={addSuperlative}
              style={{
                background: "transparent",
                color: "#20180c",
                borderColor: "#20180c",
                boxShadow: "4px 4px 0 #20180c",
                alignSelf: "flex-start",
                marginTop: "4px",
              }}
            >
              + Add superlative
            </button>
          </div>

          {/* ── Summary ──────────────────────────────────────────── */}
          {filledSuperlatives.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionLabel}>Preview</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  fontSize: "0.86rem",
                  opacity: 0.8,
                }}
              >
                {filledSuperlatives.map((s, i) => (
                  <div
                    key={s.title}
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: luckiestGuy.style.fontFamily,
                        fontSize: "12px",
                        background: "#f5c800",
                        border: "1.5px solid #20180c",
                        padding: "2px 7px",
                        minWidth: "22px",
                        textAlign: "center",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span style={{ fontWeight: 500 }}>{s.title}</span>
                    {s.winner && (
                      <>
                        <span style={{ opacity: 0.4 }}>→</span>
                        <span style={{ color: "#8c3914" }}>{s.winner}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Output ─────────────────────────────────────────────── */}
        <div className={styles.outputCard}>
          <div className={styles.outputHeader}>Generated link</div>
          <div className={styles.outputUrl}>{url}</div>
          <div className={styles.outputActions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleCopy}
            >
              {copied ? (
                <span className={styles.copyDone}>✓ Copied</span>
              ) : (
                "Copy link"
              )}
            </button>
            <a
              className={`${styles.btn} ${styles.btnGhost}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Launch deck ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
