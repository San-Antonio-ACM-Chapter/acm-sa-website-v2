import styles from "./page.module.css";
import type { OrgDirector, OrgMember } from "./people";
import { SectionReveal } from "./SectionReveal";

export type { OrgDirector, OrgMember };

export function OrganizersSection({
  director,
  members,
}: {
  director: OrgDirector | null;
  members: OrgMember[];
}) {
  if (!director && members.length === 0) return null;

  return (
    <SectionReveal className={`${styles.block} ${styles.organizers}`} id="team">
      <div className={styles.content}>
        <div className={styles["section-eye"]}>
          <svg
            className={styles["fossil-badge"]}
            viewBox="0 0 64 64"
            aria-hidden="true"
          >
            <use href="#vc-bone" />
          </svg>
          Field Crew
        </div>
        <h2 className={styles["section-title"]}>
          Who&apos;s <span className={styles.accent}>running it.</span>
          <span className={styles.scribble}>hosts, everyone</span>
        </h2>

        {director && (
          <div className={styles["org-director"]}>
            <div className={styles["org-director-photo"]}>
              {director.photo && (
                // biome-ignore lint/performance/noImgElement: organizer headshot, external URL
                <img
                  src={`/velocicode/people/${director.photo}`}
                  alt={director.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
            <div className={styles["org-director-name"]}>{director.name}</div>
            <div className={styles["org-director-role"]}>{director.role}</div>
            {director.links && director.links.length > 0 && (
              <div className={styles["judge-links"]}>
                {director.links.map((link) => (
                  <a
                    key={link.ariaLabel}
                    className={styles["judge-link"]}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {members.length > 0 && (
          <div className={styles["org-grid"]}>
            {members.map((member) => (
              <div key={member.name} className={styles["org-card"]}>
                <div className={styles["org-photo"]}>
                  {member.photo && (
                    // biome-ignore lint/performance/noImgElement: organizer headshot, external URL
                    <img
                      src={`/velocicode/people/${member.photo}`}
                      alt={member.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </div>
                <div className={styles["org-name"]}>{member.name}</div>
                <div className={styles["org-role"]}>{member.role}</div>
                {member.links && member.links.length > 0 && (
                  <div className={styles["judge-links"]}>
                    {member.links.map((link) => (
                      <a
                        key={link.ariaLabel}
                        className={styles["judge-link"]}
                        href={link.href}
                        aria-label={link.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionReveal>
  );
}
