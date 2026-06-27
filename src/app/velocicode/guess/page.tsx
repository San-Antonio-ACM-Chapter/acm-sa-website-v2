import type { Metadata } from "next";
import {
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";
import Link from "next/link";
import { VCSymbols } from "../graphics/VCSymbols";
import { GuessOracle } from "./GuessCompass";
import styles from "./guess.module.css";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-luckiest-guy",
  display: "swap",
});
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-rubik-dirt",
  display: "swap",
});
const caveatBrush = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-caveat",
  display: "swap",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--vc-special-elite",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--vc-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Compass — VelociCode",
  description: "Consult the compass. Guess the theme.",
  robots: { index: false, follow: false },
};

export default function GuessPage() {
  const fontVars = [
    luckiestGuy.variable,
    rubikDirt.variable,
    caveatBrush.variable,
    specialElite.variable,
    dmMono.variable,
  ].join(" ");

  return (
    <div className={`${styles.page} ${fontVars}`}>
      <VCSymbols />

      <nav className={styles.nav}>
        <div className={styles["nav-inner"]}>
          <div className={styles["nav-brand"]}>
            <span className={styles.dot} />
            ACM SAN ANTONIO
          </div>
          <div className={styles["nav-spacer"]} />
          <Link className={styles["nav-back"]} href="/velocicode">
            ← Back to VelociCode
          </Link>
        </div>
      </nav>

      <GuessOracle />
    </div>
  );
}
