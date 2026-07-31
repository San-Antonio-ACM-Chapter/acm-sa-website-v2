import type { WinnerCategory } from "./people";
import { SectionReveal } from "./SectionReveal";
import styles from "./page.module.css";

export type { WinnerCategory };

export function WinnersSection({
  categories,
}: {
  categories: WinnerCategory[];
}) {
  if (categories.length === 0) return null;

  return (
    <SectionReveal className={`${styles.block} ${styles.winners}`} id="winners">
      <div className={styles.content}>
        <div className={styles["section-eye"]}>Expedition Results</div>
        <h2 className={styles["section-title"]}>
          Who <span className={styles.accent}>won it.</span>
        </h2>

        <div className={styles["winners-3col"]}>
            {categories.map((cat) => (
              <div
                key={cat.title}
                className={
                  cat.isOverall
                    ? `${styles["winner-card3"]} ${styles["winner-card3--overall"]}`
                    : styles["winner-card3"]
                }
              >
                {cat.ribbon && (
                  <div className={styles["winner-card3-ribbon"]}>
                    {cat.ribbon}
                  </div>
                )}
                <div className={styles["winner-icon-circle"]}>
                  <svg viewBox="0 0 64 64" aria-hidden="true">
                    <use href={`#${cat.icon}`} />
                  </svg>
                </div>
                <div>
                  <span className={styles["winner-eyebrow-hand"]}>
                    {cat.eyebrow}
                  </span>
                  <div className={styles["winner-card3-title"]}>{cat.title}</div>
                </div>
                <div className={styles["winner-card3-divider"]} />
                <div className={styles["winner-projects"]}>
                  {cat.projects.map((p) => (
                    <div key={p.title} className={styles["winner-project"]}>
                      <span
                        className={styles["winner-project-rank"]}
                        data-rank={p.rankNum}
                      >
                        {p.rankLabel}
                      </span>
                      <div className={styles["winner-project-title"]}>
                        {p.title}
                      </div>
                      <span className={styles["winner-project-team"]}>
                        — {p.team}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
    </SectionReveal>
  );
}
