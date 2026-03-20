import Image from "next/image";
import styles from "./SocialLink.module.css";

type SocialLinkProps = {
  name: string;
  alt: string;
  url: string;
  icon?: string;
};

const SocialLink = ({
  name,
  url,
  alt,
  icon = "/globe.svg",
}: SocialLinkProps) => {
  return (
    <li className={styles.socialLink}>
      <Image src={icon} alt={alt} width={24} height={24} />
      <a href={url} target="_blank" rel="noopener noreferrer">{name}</a>
    </li>
  );
};

export default SocialLink;
