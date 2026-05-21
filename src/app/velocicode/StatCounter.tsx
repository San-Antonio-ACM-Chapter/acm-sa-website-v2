"use client";
import { useEffect, useRef, useState } from "react";

export function StatCounter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const target = parseInt(value, 10);
    if (isNaN(target)) return;
    const width = value.length;
    const duration = 900;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const started = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - started) / duration, 1);
          const eased = 1 - (1 - t) ** 3;
          setDisplay(String(Math.round(eased * target)).padStart(width, "0"));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} className={className}>{display}</div>;
}
