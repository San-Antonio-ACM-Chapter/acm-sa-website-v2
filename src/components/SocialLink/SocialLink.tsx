import styles from './SocialLink.module.css';

type SocialLinkProps = {
  name: string;
  alt: string;
  url: string;
  icon?: string;
}

const SocialLink = ({name,url,alt,icon = '/globe.svg'}: SocialLinkProps) => {
  return (<li className={styles.socialLink}><img src={icon} alt={alt}/><a href={url}>{name}</a></li>)
}

export default SocialLink;
