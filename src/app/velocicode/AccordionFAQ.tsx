"use client";
import { useState } from "react";
import styles from "./page.module.css";

export type FaqItem = { q: string; a: string };

export function AccordionFAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className={styles["faq-list"]}>
      {items.map((item) => (
        <div
          key={item.q}
          className={styles["faq-row"]}
          data-open={open === item.q ? "true" : undefined}
        >
          <button
            type="button"
            className={styles["faq-summary"]}
            onClick={() => setOpen(open === item.q ? null : item.q)}
            aria-expanded={open === item.q}
          >
            {item.q}
            <span className={styles["faq-icon"]} aria-hidden="true">
              ＋
            </span>
          </button>
          <div className={styles["faq-body"]} aria-hidden={open !== item.q}>
            <div>
              <p className={styles["faq-answer"]}>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
