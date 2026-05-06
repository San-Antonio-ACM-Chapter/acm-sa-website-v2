import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import Navigator from "@/components/Navigator/Navigator";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Code of Conduct | ACM San Antonio",
  description:
    "Community expectations for ACM San Antonio events, programs, and online spaces.",
};

const CodeOfConductPage = () => {
  return (
    <>
      <Navigator />
      <main className={styles.pageShell}>
        <div className={styles.contentWrapper}>
          <header className={styles.hero}>
            <p className={styles.eyebrow}>Community Standards</p>
            <h1>Code of Conduct</h1>
            <p>
              ACM San Antonio is committed to creating a welcoming, respectful,
              and inclusive community for anyone interested in computing,
              software engineering, and technology.
            </p>
          </header>

          <section className={styles.policySection}>
            <h2>Purpose</h2>
            <p>
              Our events and community spaces exist to help people learn,
              collaborate, and connect within the San Antonio technology
              ecosystem. This code applies to attendees, speakers, organizers,
              volunteers, sponsors, and anyone participating in ACM San Antonio
              spaces online or in person.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Expected Behavior</h2>
            <p>
              Participants are expected to treat others with courtesy,
              professionalism, and respect. We encourage constructive
              discussion, curiosity, and patience, especially when people bring
              different backgrounds, skill levels, and perspectives to the
              conversation.
            </p>
            <p>
              Community members should help newcomers feel welcome, follow the
              guidance of event organizers and moderators, and be mindful of how
              their words and actions affect others.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Unacceptable Behavior</h2>
            <p>
              Harassment, intimidation, discrimination, abuse, or sustained
              disruption are not tolerated. This includes conduct targeting
              race, color, national origin, citizenship, religion, gender,
              gender identity, sexual orientation, age, disability, veteran or
              military status, family status, body size, appearance, economic
              status, or any other protected characteristic.
            </p>
            <p>
              Unacceptable behavior may include threats, personal attacks,
              degrading language, unwanted sexual attention, inappropriate
              physical contact, harassing photography or recording, doxxing, or
              dismissing a concern as a joke after someone has been made
              uncomfortable.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Event Safety</h2>
            <p>
              ACM San Antonio events should remain safe and accessible for all
              participants. Attendees are expected to follow venue rules,
              respect event staff and volunteers, and make responsible
              transportation choices when alcohol is present at partner or
              community events.
            </p>
            <p>
              Weapons, illegal substances, and behavior that creates an unsafe
              environment are not permitted at ACM San Antonio activities.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Online Spaces</h2>
            <p>
              This code also applies to ACM San Antonio spaces such as Discord,
              Meetup discussions, livestream chats, event Q&A, and social media
              interactions connected to the chapter. Moderators may remove
              content or restrict participation when behavior disrupts the
              community or violates this code.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Reporting Concerns</h2>
            <p>
              If you experience or witness behavior that violates this code,
              contact an ACM San Antonio officer, event organizer, or moderator.
              Reports will be handled respectfully and confidentially whenever
              possible.
            </p>
            <p>
              For direct follow-up, email{" "}
              <a href="mailto:team@acmsa.org">team@acmsa.org</a>.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Enforcement</h2>
            <p>
              ACM San Antonio leadership may take action appropriate to the
              situation, including a warning, removal from an event, temporary
              suspension from community platforms, a permanent ban from chapter
              activities, or escalation to ACM when necessary.
            </p>
          </section>

          <section className={styles.policySection}>
            <h2>Relationship to Chapter Governance</h2>
            <p>
              This code supplements ACM San Antonio chapter governance and
              reflects the chapter's commitment to open, accessible, and
              respectful programs for the local computing community.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CodeOfConductPage;
