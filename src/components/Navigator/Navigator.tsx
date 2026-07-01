"use client";
import Image from "next/image";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import styles from "./Navigator.module.css";

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
        <Image src="/acm-logo.svg" alt="ACM Logo" width={44} height={44} />
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
          <li>
            <a href="/#home" onClick={closeMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/#about" onClick={closeMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/#events" onClick={closeMenu}>
              Events
            </a>
          </li>
          <li>
            <a href="/#contact" onClick={closeMenu}>
              Contact
            </a>
          </li>
          <li>
            <a href="/velocicode" onClick={closeMenu}>
              VelociCode
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigator;
