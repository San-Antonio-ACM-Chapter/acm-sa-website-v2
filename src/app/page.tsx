import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import EventsSection from "@/components/EventsSection/EventsSection";
import Hero from "@/components/Hero/Hero";
import Navigator from "@/components/Navigator/Navigator";
import styles from "./home.module.css";

const Home = () => {
  return (
    <div>
      <Navigator />
      <section className={styles.sectionHome} id="home" tabIndex={-1}>
        <Hero />
      </section>
      <AboutSection />
      <EventsSection />
      <ContactSection />
    </div>
  );
};

export default Home;
