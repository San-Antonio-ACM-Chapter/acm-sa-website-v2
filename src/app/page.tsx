import Hero from "@/components/Hero/Hero";
import Navigator from "@/components/Navigator/Navigator";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <Navigator/>
      <section id="home" title="home">
        <Hero/>
      </section>
      <section className={`${styles.sectionAbout} ${styles.section}`} id="about" title="about">
        <h2>About</h2>
        <h3>What is ACM?</h3>
        <p>
          The <strong><a href="https://www.acm.org/" target="_blank" rel="noopener noreferrer">Association for Computing Machinery (ACM)</a></strong> is a global organization dedicated to advancing computing as a science and profession.
        </p>
        <h3>
          What does it mean to be an ACM City Chapter?
        </h3>
        <p>
          ACM <strong>San Antonio</strong> is a city chapter of the ACM, which means that we are a local branch of the larger organization. We are dedicated to providing opportunities for everyone in the San Antonio area to learn about and engage with computing.
        </p>
        <p>
          Our primary objective is to foster a community of all things technology oriented in the San Antonio area. We believe that by bringing together a diverse community we can create a platform for learning, collaboration, and innovation. We have conducted a wide variety of events ranging from workshops, hackathons, speaker series, focused topics, and more. We are always looking for new ways to engage with our community and provide value to our members.
        </p>
      </section>
      <section className={`${styles.sectionEvents} ${styles.section}`} id="events" title="events">
        <h2>Events</h2>
        {/* <!-- WIP --> */}
      </section>
      <section id="contact" title="contact">
        <h2>Contact</h2>
        {/* <!-- WIP --> */}
      </section>
    </div>
  );
}

export default Home;
