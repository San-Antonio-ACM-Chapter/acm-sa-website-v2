"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export type PolaroidPhoto = {
  src: string;    // path relative to /public, e.g. "/velocicode/event-photo-01.jpeg"
  caption: string;
};

const FADE_MS = 600;
const INTERVAL_MS = 15_000;

export function PolaroidSlideshow({ photos }: { photos: PolaroidPhoto[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % photos.length);
        setVisible(true);
      }, FADE_MS);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [photos.length]);

  const photo = photos[index];

  return (
    <div className={styles.polaroid}>
      <div className={styles["polaroid-img"]}>
        <div
          className={styles["polaroid-fade"]}
          style={{ opacity: visible ? 1 : 0 }}
        >
          <Image
            src={`/velocicode/${photo.src}`}
            alt={photo.caption}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 960px) 100vw, 380px"
          />
        </div>
      </div>
      <div
        className={styles["polaroid-cap"]}
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        {photo.caption}
      </div>
    </div>
  );
}
