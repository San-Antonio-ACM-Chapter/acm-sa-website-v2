import Hero from "@/components/Hero/Hero";
import Navigator from "@/components/Navigator/Navigator";
import SocialLink from "@/components/SocialLink/SocialLink";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <Navigator />
      <section className={styles.sectionHome} id="home" tabIndex={-1}>
        <Hero />
      </section>
      <section
        className={`${styles.sectionAbout} ${styles.section}`}
        id="about"
        tabIndex={-1}
      >
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
        <h3>What does it mean to be an ACM City Chapter?</h3>
        <p>
          ACM <strong>San Antonio</strong> is a city chapter of the ACM, which
          means that we are a local branch of the larger organization. We are
          dedicated to providing opportunities for everyone in the San Antonio
          area to learn about and engage with computing.
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
      </section>
      <section
        className={`${styles.sectionEvents} ${styles.section}`}
        id="events"
        tabIndex={-1}
      >
        <h2>Events</h2>
        {/* <!-- WIP --> */}
      </section>
      <section
        className={`${styles.sectionContact} ${styles.section}`}
        id="contact"
        tabIndex={-1}
      >
        <h2>Contact</h2>
        {/* <!-- WIP --> */}
        <span>
          <div>
            <h3>Social Media</h3>
            <p>
              contact us on social media by using the following links! extra
              text
            </p>
            <ul>
              <SocialLink
                name={"ACM SA Discord"}
                alt={"discord logo"}
                url={"https://discord.gg/hx9Aewv4"}
                icon={"/discord.svg"}
              />
              <SocialLink
                name={"DEV SA Discord"}
                alt={"devsa logo"}
                url={"https://discord.gg/WqHxcmCX"}
                icon={"/devsa-logo.svg"}
              />
              <SocialLink
                name={"Linkedin"}
                alt={"linkedin logo"}
                url={"https://www.linkedin.com/company/acm-san-antonio"}
                icon={"/linkedin.svg"}
              />
            </ul>
          </div>
          <div>
            <h3>Other Organizations we Recommend</h3>
            <p>
              as an organization we often connect and collaborate with these
              great communities!
            </p>
            <ul>
              <SocialLink
                name={"The Greater Gaming Society"}
                alt={"gaming society logo"}
                url={"https://www.facebook.com/groups/ggssa/"}
              />
              <SocialLink
                name={"Dev SA"}
                alt={"devsa logo"}
                url={"https://devsa.io/"}
                icon={"/devsa-logo.svg"}
              />
              <SocialLink
                name={"geekdom"}
                alt={"geekdom logo"}
                url={"https://geekdom.com/"}
                icon={"/geekdom.svg"}
              />
              <SocialLink
                name={"Techbloc"}
                alt={"techblock logo"}
                url={"https://satechbloc.com/"}
              />
              <SocialLink
                name={"Geeks &&"}
                alt={"geeks and logo"}
                url={"https://www.geeksanddrinks.tech/"}
                icon={"/geeksand.png"}
              />
            </ul>
          </div>
        </span>
      </section>
    </div>
  );
};

export default Home;
