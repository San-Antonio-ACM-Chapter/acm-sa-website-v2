"use client";
import { useState } from "react";
import styles from "./page.module.css";

export type FaqItem = { q: string; a: string };

export function AccordionFAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles["faq-list"]}>
      {items.map((item, i) => (
        <div
          key={i}
          className={styles["faq-row"]}
          data-open={open === i ? "true" : undefined}
        >
          <button
            className={styles["faq-summary"]}
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {item.q}
            <span className={styles["faq-icon"]} aria-hidden="true">＋</span>
          </button>
          <div className={styles["faq-body"]} aria-hidden={open !== i}>
            <div>
              <p className={styles["faq-answer"]}>{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
