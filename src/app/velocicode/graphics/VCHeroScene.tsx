import styles from "../page.module.css";

export function VCHeroScene() {
  return (
    <svg
      className="scene"
      viewBox="0 0 1600 950"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      {/* SUN with rays */}
      <g className={styles["hero-sun"]} transform="translate(1240 220)">
        <g
          className={styles["sun-rays"]}
          stroke="#f0a830"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        >
          <line x1="0" y1="-180" x2="0" y2="-130" />
          <line x1="120" y1="-130" x2="85" y2="-95" />
          <line x1="180" y1="0" x2="130" y2="0" />
          <line x1="120" y1="130" x2="85" y2="95" />
          <line x1="0" y1="180" x2="0" y2="130" />
          <line x1="-120" y1="130" x2="-85" y2="95" />
          <line x1="-180" y1="0" x2="-130" y2="0" />
          <line x1="-120" y1="-130" x2="-85" y2="-95" />
          <line x1="60" y1="-160" x2="42" y2="-115" />
          <line x1="160" y1="-60" x2="115" y2="-42" />
          <line x1="160" y1="60" x2="115" y2="42" />
          <line x1="60" y1="160" x2="42" y2="115" />
          <line x1="-60" y1="160" x2="-42" y2="115" />
          <line x1="-160" y1="60" x2="-115" y2="42" />
          <line x1="-160" y1="-60" x2="-115" y2="-42" />
          <line x1="-60" y1="-160" x2="-42" y2="-115" />
        </g>
        <circle r="105" fill="#f3c637" stroke="#20180c" strokeWidth="3" />
        <circle
          r="105"
          fill="none"
          stroke="#f0a830"
          strokeWidth="2"
          strokeDasharray="3 8"
          transform="scale(0.85)"
        />
      </g>

      {/* Birds */}
      <g stroke="#20180c" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M380 220 q 14 -16 28 0 q 14 -16 28 0" />
        <path d="M520 180 q 12 -14 24 0 q 12 -14 24 0" />
        <path d="M280 280 q 10 -12 20 0 q 10 -12 20 0" />
      </g>

      {/* Dotted plane route — endpoints extend well off-screen so loop reset is invisible */}
      <path
        className={styles["hero-route-path"]}
        id="hero-route"
        d="M -300 480 Q 250 380 500 460 T 980 380 T 1750 190"
        fill="none"
        stroke="#20180c"
        strokeWidth="3"
        strokeDasharray="4 12"
        opacity="0.55"
      />
      {/* Mobile route: short path that stays within the visible crop area */}
      <path
        className={styles["hero-route-path-mobile"]}
        id="hero-route-mobile"
        d="M 510 540 Q 680 360 820 430 T 1080 280"
        fill="none"
        stroke="#20180c"
        strokeWidth="3"
        strokeDasharray="4 12"
        opacity="0.55"
      />
      {/* Plane animated along route — rotate(90) pre-aligns nose to +X */}
      <g className={styles["hero-route-plane"]}>
        <animateMotion
          dur="18s"
          repeatCount="indefinite"
          rotate="auto"
          calcMode="linear"
        >
          <mpath href="#hero-route" />
        </animateMotion>
        <use
          href="#vc-plane"
          width="64"
          height="64"
          x="-32"
          y="-32"
          transform="rotate(90)"
        />
      </g>
      {/* Mobile plane — follows the shorter mobile route, loops every 7s */}
      <g className={styles["hero-route-plane-mobile"]}>
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          rotate="auto"
          calcMode="linear"
        >
          <mpath href="#hero-route-mobile" />
        </animateMotion>
        <use
          href="#vc-plane"
          width="64"
          height="64"
          x="-32"
          y="-32"
          transform="rotate(90)"
        />
      </g>

      {/* Far hills */}
      <path
        d="M0 660 Q 200 580 400 620 T 800 600 T 1200 620 T 1600 590 L 1600 950 L 0 950 Z"
        fill="#a9c460"
      />
      {/* Mid hills */}
      <path
        d="M0 720 Q 220 660 460 700 T 920 680 T 1380 720 T 1600 690 L 1600 950 L 0 950 Z"
        fill="#6f9a3d"
      />
      {/* Near hills */}
      <path
        d="M0 800 Q 240 740 520 790 T 1020 770 T 1600 800 L 1600 950 L 0 950 Z"
        fill="#2d5a22"
      />
      {/* Foreground ground */}
      <path
        d="M0 880 Q 300 850 600 880 T 1200 880 T 1600 870 L 1600 950 L 0 950 Z"
        fill="#163a10"
      />

      {/* Far palm trees */}
      <g opacity="0.75" color="#2d5a22">
        <g transform="translate(155 665)">
          <use href="#vc-bigleaf" x="-90" y="-190" width="190" height="190" />
        </g>
        <g transform="translate(1435 645)">
          <g transform="scale(-1,1)">
            <use href="#vc-bigleaf" x="-90" y="-190" width="190" height="190" />
          </g>
        </g>
      </g>

      {/* Big foreground palm LEFT */}
      <g transform="translate(60 955)" color="#163a10">
        <use href="#vc-bigleaf" x="-160" y="-420" width="420" height="420" />
      </g>

      {/* Big foreground palm RIGHT */}
      <g transform="translate(1545 955)" color="#163a10">
        <g transform="scale(-1,1)">
          <use href="#vc-bigleaf" x="-160" y="-420" width="420" height="420" />
        </g>
      </g>

      {/* Ferns along the bottom */}
      <g transform="translate(330 920)" fill="#163a10">
        <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
        <ellipse cx="20" cy="-2" rx="22" ry="7" transform="rotate(30)" />
        <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
      </g>
      <g transform="translate(1180 920)" fill="#163a10">
        <ellipse cx="0" cy="0" rx="22" ry="7" transform="rotate(-30)" />
        <ellipse cx="20" cy="-2" rx="22" ry="7" transform="rotate(30)" />
        <ellipse cx="40" cy="0" rx="22" ry="7" transform="rotate(-25)" />
      </g>

      {/* Origami Dino */}
      <g className={styles["hero-dino"]} transform="translate(1020 800)">
        <ellipse cx="0" cy="14" rx="95" ry="10" fill="#000" opacity="0.22" />
        <image
          href="/velocicode-logo.png"
          x="-145"
          y="-255"
          width="290"
          height="290"
        />
      </g>
    </svg>
  );
}
