import Image from "next/image";
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

const partnerLinks = [
  { label: "Geeks && {...}", href: "https://www.geeksanddrinks.tech/" },
  { label: "DEVSA", href: "https://www.devsa.community/" },
  { label: "Geekdom", href: "https://geekdom.com/" },
  { label: "TechBloc", href: "https://satechbloc.com/" },
  {
    label: "Greater Gaming Society",
    href: "https://www.facebook.com/groups/ggssa/",
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
            <Image
              src="/acm-logo.svg"
              alt="ACM San Antonio logo"
              width={48}
              height={48}
              className={styles.logo}
            />
            <p className={styles.copyright}>
              © {currentYear} ACM San Antonio Professional Chapter
            </p>
            <p className={styles.nonprofit}>
              A 501(c)(3) Non-Profit Organization
            </p>
            <p className={styles.version}>
              Version: {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
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

            <div className={styles.footerSection}>
              <h2>Community</h2>
              <ul>{renderLinks(partnerLinks)}</ul>
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
