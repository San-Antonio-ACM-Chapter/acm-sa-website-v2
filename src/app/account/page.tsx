/**
 * Account Zone - Work In Progress placeholder page
 *
 * This page will be removed once the Account zone app is live and the
 * rewrite in next.config.ts takes over routing for /account/*.
 *
 * See: https://nextjs.org/docs/app/guides/multi-zones
 */

import styles from "./account-wip.module.css";

// ...existing code...

const AccountWIPPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.wipHeading}>
        <div className={styles.hazardStripe} />
        <h1>Work In Progress</h1>
        <div className={styles.hazardStripe} />
      </div>
      <p>The Account section is coming soon. Check back later!</p>
      <a href="/" className={styles.backLink}>← Back to Home</a>
    </main>
  );
};

export default AccountWIPPage;

