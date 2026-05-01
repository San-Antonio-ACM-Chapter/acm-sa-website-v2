import styles from "./Footer.module.css";

const siteLinks = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Events", href: "/#events" },
  { label: "Contact", href: "/#contact" },
  { label: "Code of Conduct", href: "/code-of-conduct" },
];

const connectLinks = [
  { label: "ACM SA Discord", href: "https://discord.gg/t94zZC3Ktm" },
  { label: "DEVSA Discord", href: "https://discord.gg/cvHHzThrEw" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/acm-san-antonio",
  },
  {
    label: "team@acmsa.org",
    href: "mailto:team@acmsa.org",
    ariaLabel: "Send email to ACM San Antonio",
  },
  {
    label: "Official ACM Website",
    href: "https://www.acm.org/",
    ariaLabel: "Visit official ACM website (opens in new tab)",
  },
];

const isExternalLink = (href: string) => href.startsWith("http");

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const renderLinks = (
    links: { label: string; href: string; ariaLabel?: string }[],
  ) =>
    links.map(({ label, href, ariaLabel }) => (
      <li key={`${label}-${href}`}>
        <a
          href={href}
          aria-label={ariaLabel}
          {...(isExternalLink(href)
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      </li>
    ));

  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.footerContent}>
          <div className={styles.brandSection}>
            <p className={styles.chapterName}>ACM San Antonio</p>
            <p className={styles.chapterBlurb}>
              A professional chapter connecting technologists, builders, and
              learners across San Antonio.
            </p>
            <p className={styles.nonprofit}>
              A 501(c)(3) Non-Profit Organization
            </p>
          </div>

          <nav className={styles.linkColumns} aria-label="Footer navigation">
            <div className={styles.footerSection}>
              <h2>Site</h2>
              <ul>{renderLinks(siteLinks)}</ul>
            </div>

            <div className={styles.footerSection}>
              <h2>Connect</h2>
              <ul>{renderLinks(connectLinks)}</ul>
            </div>
          </nav>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} ACM San Antonio Professional Chapter
          </p>
          <p className={styles.version}>
            Version: {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
