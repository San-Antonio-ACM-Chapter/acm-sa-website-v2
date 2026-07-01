"use client";

import { DM_Mono, Luckiest_Guy, Special_Elite } from "next/font/google";
import { useCallback, useState } from "react";
import styles from "./configure.module.css";

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

const HIDEABLE_CARDS = [
  { slug: "qr", label: "QR Codes" },
  { slug: "wifi", label: "Wi-Fi" },
  { slug: "sponsors", label: "Sponsors" },
  { slug: "partners", label: "Partners" },
  { slug: "socials", label: "Socials" },
  { slug: "newhere", label: "New Here?" },
  { slug: "brand", label: "Brand" },
  { slug: "coc", label: "Code of Conduct" },
] as const;

type HideSlug = (typeof HIDEABLE_CARDS)[number]["slug"];

function buildUrl(fields: {
  title: string;
  time: string;
  location: string;
  wifiNetwork: string;
  wifiPassword: string;
  wifiSecurity: string;
  hidden: Set<HideSlug>;
}): string {
  if (!fields.title.trim()) return "";

  const base =
    typeof window !== "undefined"
      ? `${window.location.origin}/velocicode/slides/display`
      : "https://acmsa.org/velocicode/slides/display";

  const p = new URLSearchParams();
  p.set("title", fields.title.trim());
  if (fields.time.trim()) p.set("time", fields.time.trim());
  if (fields.location.trim()) p.set("location", fields.location.trim());
  if (fields.wifiNetwork.trim() && fields.wifiPassword.trim()) {
    p.set("wifiNetwork", fields.wifiNetwork.trim());
    p.set("wifiPassword", fields.wifiPassword.trim());
    if (fields.wifiSecurity && fields.wifiSecurity !== "none") {
      p.set("wifiSecurity", fields.wifiSecurity);
    }
  }
  if (fields.hidden.size > 0) {
    p.set("hide", [...fields.hidden].join(","));
  }
  return `${base}?${p.toString()}`;
}

export default function ConfigurePage() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [wifiNetwork, setWifiNetwork] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState("none");
  const [hidden, setHidden] = useState<Set<HideSlug>>(new Set());
  const [copied, setCopied] = useState(false);

  const url = buildUrl({
    title,
    time,
    location,
    wifiNetwork,
    wifiPassword,
    wifiSecurity,
    hidden,
  });

  const toggleHide = useCallback((slug: HideSlug) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const handleCopy = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback: select text */
    }
  }, [url]);

  const fontCls = [
    luckiestGuy.className,
    elite.className,
    dmMono.className,
  ].join(" ");

  return (
    <div className={`${styles.page} ${fontCls}`}>
      {/* ── Nav ────────────────────────────────────────────────── */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          <span className={styles.dot} />
          VelociCode · Slides
        </div>
        <a
          href="/velocicode/slides/display"
          className={styles.navLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open runtime ↗
        </a>
      </nav>

      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Expedition HQ</div>
        <h1 className={`${styles.title} ${luckiestGuy.className}`}>
          Configure
        </h1>
        <p className={styles.sub}>
          Fill in the fields, grab the generated link, and open it on the venue
          screen. Nothing is saved — generate a new link before each event.
        </p>

        <div className={styles.card}>
          {/* ── Event info ───────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Event info</div>
            <div className={styles.row}>
              <div className={`${styles.field} ${styles.full}`}>
                <label className={styles.label} htmlFor="title">
                  Event / segment name{" "}
                  <span className={styles.required}>*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  className={styles.input}
                  placeholder="Kickoff"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="time">
                  Time
                </label>
                <input
                  id="time"
                  type="text"
                  className={styles.input}
                  placeholder="7:00 pm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="location">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className={styles.input}
                  placeholder="Geekdom 3rd Floor"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ── Wi-Fi ────────────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>
              Wi-Fi{" "}
              <span
                style={{
                  opacity: 0.55,
                  fontWeight: 400,
                  textTransform: "none",
                  letterSpacing: 0,
                }}
              >
                — adds the Wi-Fi card when both network &amp; password are
                filled
              </span>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wifiNetwork">
                  Network name
                </label>
                <input
                  id="wifiNetwork"
                  type="text"
                  className={styles.input}
                  placeholder="Geekdom Guest"
                  value={wifiNetwork}
                  onChange={(e) => setWifiNetwork(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wifiPassword">
                  Password
                </label>
                <input
                  id="wifiPassword"
                  type="text"
                  className={styles.input}
                  placeholder="expedition26"
                  value={wifiPassword}
                  onChange={(e) => setWifiPassword(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="wifiSecurity">
                  Security type{" "}
                  <span
                    style={{
                      opacity: 0.55,
                      textTransform: "none",
                      letterSpacing: 0,
                    }}
                  >
                    (enables QR code)
                  </span>
                </label>
                <select
                  id="wifiSecurity"
                  className={styles.select}
                  value={wifiSecurity}
                  onChange={(e) => setWifiSecurity(e.target.value)}
                >
                  <option value="WPA2">WPA2</option>
                  <option value="WPA">WPA</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">No password</option>
                  <option value="none">None (text-only, no QR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Hide cards ───────────────────────────────────────── */}
          <div className={styles.section}>
            <div className={styles.sectionLabel}>Hide cards</div>
            <div className={styles.toggleGrid}>
              {HIDEABLE_CARDS.map(({ slug, label }) => {
                const checked = hidden.has(slug);
                return (
                  <label
                    key={slug}
                    className={styles.toggle}
                    data-checked={checked ? "true" : "false"}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleHide(slug)}
                    />
                    <span className={styles.toggleMark}>
                      {checked ? "✕" : ""}
                    </span>
                    {label}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        {/* /card */}

        {/* ── Output ─────────────────────────────────────────────── */}
        <div className={styles.outputCard}>
          <div className={styles.outputHeader}>Generated link</div>
          <div className={styles.outputUrl}>
            {url || (
              <span style={{ opacity: 0.4 }}>
                Enter an event name above to generate a link.
              </span>
            )}
          </div>
          <div className={styles.outputActions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleCopy}
              disabled={!url}
            >
              {copied ? (
                <span className={styles.copyDone}>✓ Copied</span>
              ) : (
                "Copy link"
              )}
            </button>
            {url && (
              <a
                className={`${styles.btn} ${styles.btnGhost}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
