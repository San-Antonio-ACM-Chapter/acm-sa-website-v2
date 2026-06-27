"use client";

import { useState } from "react";
import styles from "./guess.module.css";

const RESPONSES = [
  // on the trail
  "The trail is warm. Keep going.",
  "The expedition scouts approve of that direction.",
  "Your compass may be pointing true.",
  "The field journal says: promising lead.",
  "You've stirred something in the jungle.",
  "Expedition HQ is... intrigued.",
  "The dino tilts its head approvingly.",
  "Signs suggest you're closing in, adventurer.",
  // wrong trail
  "Wrong trail. The jungle disagrees.",
  "The compass spins wildly at that.",
  "Dead end. Consult a different map.",
  "The field guide marks that in red.",
  "The dino winces. Try again.",
  "That trail leads nowhere useful.",
  "Expedition log: negative. Move on.",
  "The jungle shakes its head, slowly.",
  "Redacted. By order of Expedition HQ.",
  // cryptic / neutral
  "The answer is buried. Deeper.",
  "Neither confirmed nor denied by HQ.",
  "Some things are only revealed at kickoff.",
  "The oracle's vision is fogged by expedition humidity.",
  "Classified. Eyes only — and not yours.",
  "Ask the jungle. The jungle knows.",
  "The oracle sees... something. It won't say.",
  "Patience, explorer. The theme drops July 1st.",
  "It has been sealed in the field journal, for now.",
  "The dino knows. The dino won't say.",
  "Outlook: uncertain. Terrain: classified.",
  "The fog is too thick to see clearly.",
  "Consult the stars, not this oracle.",
  "That's above your clearance level, explorer.",
  // playful
  "You made the oracle laugh. Still not confirmed.",
  "Bold guess. Respect. Still not telling.",
  "Hmm. The expedition committee will discuss.",
  "The oracle has heard stranger guesses.",
  "The jungle says: maybe you're overthinking it.",
  "Ask again after you register on itch.io.",
];

export function GuessOracle() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function consult(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    const r = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
    setResponse(r);
    setAnimKey((k) => k + 1);
    setSubmitted(true);
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
          <em>Or does it?</em> Type your best guess below. The compass will
          consult the jungle and return a bearing.
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
              {submitted && (
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
