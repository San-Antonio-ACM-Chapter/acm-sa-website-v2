import styles from "./AboutSection.module.css";

const AboutSection = () => {
  return (
    <section className={styles.aboutSection} id="about" tabIndex={-1}>
      <div className={styles.contentWrapper}>
        <h2>About</h2>
        <h3>What is ACM?</h3>
        <p>
          The{" "}
          <strong>
            <a
              href="https://www.acm.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Association for Computing Machinery (ACM)
            </a>
          </strong>{" "}
          is a global organization dedicated to advancing computing as a science
          and profession.
        </p>
        <h3>What does it mean to be an ACM Professional Chapter?</h3>
        <p>
          ACM <strong>San Antonio</strong> is a professional chapter of the ACM,
          which means that we are a local branch of the larger organization. We
          are dedicated to providing opportunities for everyone in the San
          Antonio area to learn about and engage with computing.
        </p>
        <p>
          Our primary objective is to foster a community of all things
          technology oriented in the San Antonio area. We believe that by
          bringing together a diverse community we can create a platform for
          learning, collaboration, and innovation. We have conducted a wide
          variety of <a href="#events">events</a> ranging from workshops,
          hackathons, speaker series, focused topics, and more. We are always
          looking for new ways to engage with our community and provide value to
          our members.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
