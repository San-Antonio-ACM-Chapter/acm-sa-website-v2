import AboutSection from "@/components/AboutSection/AboutSection";
import ContactSection from "@/components/ContactSection/ContactSection";
import EventsSection from "@/components/EventsSection/EventsSection";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navigator from "@/components/Navigator/Navigator";
import { getDevsaAcmEvents } from "@/lib/devsaEvents";
import styles from "./home.module.css";

const Home = async () => {
  const events = await getDevsaAcmEvents();

  return (
    <div>
      <Navigator />
      <section className={styles.sectionHome} id="home" tabIndex={-1}>
        <Hero />
      </section>
      <AboutSection />
      <EventsSection events={events} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;
