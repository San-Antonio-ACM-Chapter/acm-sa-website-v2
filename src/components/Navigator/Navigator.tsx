import Image from "next/image";
import styles from "./Navigator.module.css";

const Navigator = () => {
  return (
    <nav className={styles.navigatorContainer}>
      <div>
        <Image src="/acm-logo.svg" alt="ACM Logo" width={40} height={40} />
        <h1>ACM SA</h1>
      </div>
      <ul>
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#events">Events</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigator;
