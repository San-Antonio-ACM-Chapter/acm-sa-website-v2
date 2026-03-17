"use client";
import { useState, useEffect } from 'react';
import styles from './Hero.module.css'

type HeroProps = {
  imgOptions?: {
    img?: string;
    alt?: string;
  };
  title?: string;
  city?: string;
  cityTypingSpeed?: number; // Optional prop to control the speed of the city animation
};

/**
 * Hero component
 * @description component to render the hero section of the website, includes the logo, title, and city. the city is
 * animated through CSS animation controls. the last character of the city name is animated to blink like a terminal
 * cursor.
 * @remarks this component is mostly static but has customizable additions if necessary
 * @param imgOptions
 * @param title
 * @param city - the city name to display (e.g., "San Antonio")
 * @param cityAnimationSpeed
 * @example
 * <Hero
 *  imgOptions={
 *    {
 *      img: "/acm-logo.svg",
 *      alt: "The Association for Computing Machinery Logo"}
 *    }
 *  title="The Association for Computing Machinery"
 *  city="San Antonio"
 *  cityTypingSpeed={72}
 * />
 */
const Hero = (
  {
    imgOptions = {
      img: "/acm-logo.svg",
      alt: "The Association for Computing Machinery Logo"
    },
    title = "The Association for Computing Machinery",
    city = "San Antonio",
    cityTypingSpeed = 72
  }: HeroProps
) => {
  const [displayedCity, setDisplayedCity] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < city.length) {
      const timeout = setTimeout(() => {
        setDisplayedCity(city.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, cityTypingSpeed); // 150ms delay between each character

      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, city]);

  /**
   * Splits the city into 3 parts for animation effect:
   * - All words except last + underscore
   * - Last word without final character
   * - Final character
   *
   * Examples:
   * - "Houston" -> ["_", "Housto", "n"]
   * - "San Antonio" -> ["San_", "Antoni", "o"]
   * - "New York City" -> ["New York_", "Cit", "y"]
   */
  const cityParts = (() => {
    const words = displayedCity.split(" ");
    const lastWord = words[words.length - 1];
    const leadingWords = words.slice(0, -1).join(" ");

    return [
      leadingWords ? `${leadingWords}_` : null,
      lastWord.slice(0, -1),
      lastWord.slice(-1)
    ];
  })();

  return (
    <div className={styles.heroContainer}>
        <img src={imgOptions.img} alt={imgOptions.alt} />
        <h1>{title}</h1>
        <span>
          {cityParts.map((part, index) => (
            <h2 key={index}>{part}</h2>
          ))}
          {isTyping && <h2 className={styles.cursor}>_</h2>}
        </span>
    </div>
  )
}

export default Hero;
