"use client";

import { DM_Mono, Luckiest_Guy, Special_Elite } from "next/font/google";

const luckiestGuy = Luckiest_Guy({
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

const LINKS = [
  {
    href: "/velocicode/slides/configure",
    label: "Configure Display",
    description:
      "Generate a display link with event info, Wi-Fi, and card settings.",
    tag: "Tool",
    bg: "#f8edcc",
    fg: "#20180c",
    accent: "#c44d24",
    border: "#20180c",
  },
  {
    href: "/velocicode/slides/display",
    label: "Ambient Display",
    description: "Auto-looping kiosk for venue screens between event segments.",
    tag: "Runtime",
    bg: "#1e6016",
    fg: "#f5e6c2",
    accent: "#f5c800",
    border: "#0d3a08",
  },
  {
    href: "/velocicode/slides/kickoff",
    label: "Kickoff Deck",
    description:
      "Presenter deck for the July 1 kickoff — includes the theme reveal.",
    tag: "Event · Jul 1",
    bg: "linear-gradient(135deg,#f7d289,#f5e6c2)",
    fg: "#20180c",
    accent: "#1e6016",
    border: "#20180c",
  },
  {
    href: "/velocicode/slides/unreal-engine-5-whats-new",
    label: "Powering Up with UE5",
    description:
      "Presenter deck for the July 8 Unreal Engine SA session — speakers, agenda, events, sponsors.",
    tag: "Event · Jul 8",
    bg: "linear-gradient(135deg,#0b1a0e,#1c3420)",
    fg: "#f5e6c2",
    accent: "#f5c800",
    border: "#0b1a0e",
  },
] as const;

export default function SlidesHubPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "#f5e6c2",
        color: "#20180c",
        fontFamily: `${dmMono.style.fontFamily}, ui-monospace, monospace`,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <nav
        style={{
          background: "#20180c",
          color: "#f5e6c2",
          borderBottom: "2.5px solid #000",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            fontSize: "0.78rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase" as const,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              width: "10px",
              height: "10px",
              background: "#c44d24",
              borderRadius: "50%",
            }}
          />
          VelociCode · Slides
        </div>
        <a
          href="/velocicode"
          style={{
            marginLeft: "auto",
            color: "#f5e6c2",
            fontSize: "0.78rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase" as const,
            textDecoration: "none",
            opacity: 0.6,
          }}
        >
          ← Back to VelociCode
        </a>
      </nav>

      <div
        style={{
          maxWidth: "860px",
          margin: "0 auto",
          padding: "60px 40px 80px",
        }}
      >
        <div
          style={{
            fontFamily: elite.style.fontFamily,
            fontSize: "0.78rem",
            letterSpacing: "0.28em",
            textTransform: "uppercase" as const,
            color: "#8c3914",
            marginBottom: "16px",
          }}
        >
          Expedition HQ
        </div>
        <h1
          style={{
            fontFamily: luckiestGuy.style.fontFamily,
            fontSize: "clamp(48px, 6vw, 80px)",
            color: "#20180c",
            margin: "0 0 16px",
            lineHeight: 0.88,
          }}
        >
          Slides
        </h1>
        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.65,
            color: "#5a3a18",
            margin: "0 0 48px",
            maxWidth: "480px",
          }}
        >
          Presentations and displays for VelociCode events.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {LINKS.map(
            ({ href, label, description, tag, bg, fg, accent, border }) => (
              <a
                key={href}
                href={href}
                style={{
                  display: "block",
                  background: bg,
                  color: fg,
                  border: `2.5px solid ${border}`,
                  boxShadow: `6px 6px 0 ${border}`,
                  padding: "28px 32px",
                  textDecoration: "none",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontFamily: elite.style.fontFamily,
                    fontSize: "0.72rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase" as const,
                    color: accent,
                    marginBottom: "8px",
                  }}
                >
                  {tag}
                </div>
                <div
                  style={{
                    fontFamily: luckiestGuy.style.fontFamily,
                    fontSize: "clamp(22px, 3vw, 32px)",
                    marginBottom: "8px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.55,
                    opacity: 0.75,
                  }}
                >
                  {description}
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "32px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontFamily: luckiestGuy.style.fontFamily,
                    fontSize: "24px",
                    color: accent,
                  }}
                >
                  →
                </div>
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
