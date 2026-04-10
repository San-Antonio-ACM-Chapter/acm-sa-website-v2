import styles from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <p className={styles.copyright}>
              © {currentYear} ACM San Antonio Professional Chapter
            </p>
            <p className={styles.nonprofit}>
              A 501(c)(3) Non-Profit Organization
            </p>
          </div>

          <div className={styles.footerSection}>
            <a
              href="https://www.acm.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.acmLink}
              aria-label="Visit official ACM website (opens in new tab)"
            >
              Official ACM Website
            </a>
            <a
              href="mailto:team@acmsa.org"
              className={styles.emailLink}
              aria-label="Send email to ACM San Antonio"
            >
              team@acmsa.org
            </a>
          </div>

          <div className={styles.footerSection}>
            <p className={styles.version}>
              Version: {process.env.NEXT_PUBLIC_GIT_HASH || "dev"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
