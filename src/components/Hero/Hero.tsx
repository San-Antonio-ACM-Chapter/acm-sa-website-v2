import styles from './Hero.module.css'

type HeroProps = {
  imgOptions?: {
    img?: string;
    alt?: string;
  };
  title?: string;
  city?: string;
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
 * @example
 * <Hero
 *  imgOptions={
 *    {
 *      img: "/acm-logo.svg",
 *      alt: "The Association for Computing Machinery Logo"}
 *    }
 *  title="The Association for Computing Machinery"
 *  city="San Antonio"
 * />
 */
const Hero = (
  {
    imgOptions = {
      img: "/acm-logo.svg",
      alt: "The Association for Computing Machinery Logo"
    },
    title = "The Association for Computing Machinery",
    city = "San Antonio"
  }: HeroProps
) => {

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
    const words = city.split(" ");
    const lastWord = words[words.length - 1];
    const leadingWords = words.slice(0, -1).join(" ");

    return [
      leadingWords ? `${leadingWords}_` : "_",
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
        </span>
    </div>
  )
}

export default Hero;
