"use client";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Navigator.module.css";

const navOptions: navOptionType[] = [
  { name: "Home", url: "#home" },
  { name: "About", url: "#about" },
  { name: "Events", url: "#events" },
  { name: "Contact", url: "#contact" },
  { name: "Account", url: "/account"}, // TODO: next zone
]

type navOptionType = {
  name: string;
  url: string;
};

const Navigator = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styles.navigatorContainer}>
      <div className={styles.logoContainer}>
        <Image src="/acm-logo.svg" alt="ACM Logo" width={40} height={40} />
        <h1>ACM SA</h1>
      </div>
      <div className={styles.navRight}>
        <ThemeToggle />
        <button
          type="button"
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className={isMenuOpen ? styles.menuOpen : ""}>
          {navOptions.map((option) => (
            <NavOption key={option.name} {...option} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigator;

/**
 * NavOption component
 * @param name - the name of the nav option
 * @param url - the url of the nav option
 *
 * @example
 * ```tsx
 * <NavOption name="Home" url="#home" />
 * ```
 */
const NavOption = ({ name, url }: navOptionType) => {
  return (
    <li>
      <a href={url}>{name}</a>
    </li>
  );
};
