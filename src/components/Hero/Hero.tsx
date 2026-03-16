import styles from './Hero.module.css'

type HeroProps = {
  imgOptions?: {
    img?: string;
    alt?: string;
  };
  title?: string;
  subTitle?: string;
};

/**
 * Hero component
 * @description component to render the hero section of the website, includes the logo, title, and subtitle
 * @remarks this component is mostly static but has customizable additions if necessary
 * @param imgOptions
 * @param title
 * @param subTitle
 * @example
 * <Hero
 *  imgOptions={
 *    {
 *      img: "/acm-logo.svg",
 *      alt: "The Association for Computing Machinery Logo"}
 *    }
 *  title="The Association for Computing Machinery"
 *  subTitle="San Antonio"
 * />
 */
const Hero = (
  {
    imgOptions = {
      img: "/acm-logo.svg",
      alt: "The Association for Computing Machinery Logo"
    },
    title = "The Association for Computing Machinery",
    subTitle = "San Antonio"
  }: HeroProps
) => {
  const subTitleSplit = subTitle.split(" ");
  return (
    <div className={styles.heroContainer}>
        <img src={imgOptions.img} alt={imgOptions.alt} />
        <h1>{title}</h1>
        <span>
          <h2>{subTitleSplit[0]}_</h2>
          <h2>{subTitleSplit[1].substring(0,subTitleSplit[1].length - 1)}</h2>
          <h2>{subTitleSplit[1][subTitleSplit[1].length - 1]}</h2>
        </span>
    </div>
  )
}

export default Hero;
