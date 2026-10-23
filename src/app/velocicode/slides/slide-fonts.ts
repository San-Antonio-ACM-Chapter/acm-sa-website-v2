import {
  Bowlby_One_SC,
  Caveat_Brush,
  DM_Mono,
  Luckiest_Guy,
  Rubik_Dirt,
  Special_Elite,
} from "next/font/google";

const luckiestGuy = Luckiest_Guy({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const bowlby = Bowlby_One_SC({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const caveat = Caveat_Brush({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const elite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Add as a hidden span className to trigger Next.js font loading on any slide page.
// All slide components use CSS variables (--vc-font-display-1 etc.) defined on .frame
// in slides.module.css — these font objects exist solely for the loading trigger.
export const SLIDE_FONT_CLASSES = [
  luckiestGuy.className,
  rubikDirt.className,
  bowlby.className,
  caveat.className,
  elite.className,
  dmMono.className,
].join(" ");
