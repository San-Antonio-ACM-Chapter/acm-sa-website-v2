"use client";

import { useRef, useState } from "react";
import styles from "./guess.module.css";

const POSITIVE = [
  "The trail is warm. Keep going.",
  "The expedition scouts approve of that direction.",
  "Your compass may be pointing true.",
  "The field journal says: promising lead.",
  "You've stirred something in the jungle.",
  "Expedition HQ is... intrigued.",
  "The dino tilts its head approvingly.",
  "Signs suggest you're closing in, adventurer.",
];

const NEGATIVE = [
  "Wrong trail. The jungle disagrees.",
  "The compass spins wildly at that.",
  "Dead end. Consult a different map.",
  "The field guide marks that in red.",
  "The dino winces. Try again.",
  "That trail leads nowhere useful.",
  "Expedition log: negative. Move on.",
  "The jungle shakes its head, slowly.",
  "Redacted. By order of Expedition HQ.",
];

const CRYPTIC = [
  "The answer is buried. Deeper.",
  "Neither confirmed nor denied by HQ.",
  "Some things are only revealed at kickoff.",
  "The compass needle blurs in this humidity.",
  "Classified. Eyes only — and not yours.",
  "Ask the jungle. The jungle knows.",
  "The compass sees... something. It won't say.",
  "Patience, explorer. The theme drops July 1st.",
  "It has been sealed in the field journal, for now.",
  "The dino knows. The dino won't say.",
  "Outlook: uncertain. Terrain: classified.",
  "The fog is too thick to see clearly.",
  "Consult the stars, not this compass.",
  "That's above your clearance level, explorer.",
  "You made the compass spin. Still not confirmed.",
  "Bold guess. Respect. Still not telling.",
  "Hmm. The expedition committee will discuss.",
  "The compass has seen stranger bearings.",
  "The jungle says: maybe you're overthinking it.",
  "Ask again after you register on itch.io.",
];

// Unlocks after 4 submissions — rewards persistence without hinting
const PERSISTENT = [
  "Still at it? Bold.",
  "The compass respects the commitment.",
  "Most explorers give up by now. Not you.",
  "Persistence noted in the expedition log.",
  "The jungle is starting to take you seriously.",
];

const DEDUP_WINDOW = 5;

function pickFrom(pool: string[], exclude: string[]): string {
  const eligible = pool.filter((r) => !exclude.includes(r));
  const source = eligible.length > 0 ? eligible : pool;
  return source[Math.floor(Math.random() * source.length)];
}

function pickResponse(submitCount: number, recentlyUsed: string[]): string {
  // After 4 submissions, persistent responses get a 25% shot
  if (submitCount >= 4 && Math.random() < 0.25) {
    return pickFrom(PERSISTENT, recentlyUsed);
  }

  // Weighted bucket draw: 20% positive, 30% negative, 50% cryptic
  const roll = Math.random();
  const pool = roll < 0.2 ? POSITIVE : roll < 0.5 ? NEGATIVE : CRYPTIC;
  return pickFrom(pool, recentlyUsed);
}

export function GuessOracle() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);
  const recentlyUsed = useRef<string[]>([]);

  function consult(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const next = submitCount + 1;
    const r = pickResponse(next, recentlyUsed.current);

    recentlyUsed.current = [r, ...recentlyUsed.current].slice(0, DEDUP_WINDOW);
    setResponse(r);
    setAnimKey((k) => k + 1);
    setSubmitCount(next);
  }

  return (
    <div className={styles["oracle-wrap"]}>
      <div className={styles["oracle-card"]}>
        <div className={styles["oracle-eye"]}>Field Compass · Expedition 02</div>

        <h1 className={styles["oracle-title"]}>
          <span className={styles["oracle-title-a"]}>THE</span>{" "}
          <span className={styles["oracle-title-b"]}>COMPASS</span>
        </h1>

        <p className={styles["oracle-sub"]}>
          The theme drops at kickoff on July 1st.{" "}
          <em>Type your best guess below.</em> The compass will consult the
          jungle and return a bearing.
        </p>

        <form className={styles["prompt-form"]} onSubmit={consult}>
          <div className={styles["input-row"]}>
            <input
              className={styles.input}
              type="text"
              placeholder="your guess..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            <button className={styles["consult-btn"]} type="submit">
              Consult ↗
            </button>
          </div>
        </form>

        <div className={styles["response-area"]} aria-live="polite">
          {response && (
            <div key={animKey} className={styles["response-note"]}>
              <div className={styles["response-stamp"]}>compass</div>
              <p className={styles["response-text"]}>{response}</p>
              {submitCount > 0 && (
                <div className={styles["response-hint"]}>
                  — try a different guess, or{" "}
                  <a
                    href="https://itch.io/jam/velocicode-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    just register and find out ↗
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
