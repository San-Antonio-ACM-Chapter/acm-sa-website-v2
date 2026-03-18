import styles from "./ContactSection.module.css";
import SocialLink from "@/components/SocialLink/SocialLink";

const ContactSection = () => {
  return (
    <section
      className={styles.contactSection}
      id="contact"
      tabIndex={-1}
    >
      <h2>Contact</h2>
      {/* <!-- WIP --> */}
      <span className={styles.contentWrapper}>
          <div className={styles.column}>
            <h3>Social Media</h3>
            <p>
              contact us on social media by using the following links! extra
              text
            </p>
            <ul className={styles.linkList}>
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
          <div className={styles.column}>
            <h3>Other Organizations we Recommend</h3>
            <p>
              as an organization we often connect and collaborate with these
              great communities!
            </p>
            <ul className={styles.linkList}>
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
  )
}

export default ContactSection;
