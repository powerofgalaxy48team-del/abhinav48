import { useEffect, useRef } from "react";

/**
 * Japanese-style layered parallax: vertical kanji scrolls, ink-wash mountain
 * ridges and drifting gold sakura petals, each moving at a different depth.
 * Fixed behind content; transforms via rAF (no React state). Desktop/tablet only.
 */
const COLUMNS = [
  { text: "真理を求めて", left: "4%", top: 120, speed: 0.35, size: "5rem", op: 0.07 },
  { text: "宇宙と意識", left: "88%", top: 600, speed: 0.6, size: "4rem", op: 0.09 },
  { text: "深淵を覗く", left: "14%", top: 1500, speed: 0.85, size: "3rem", op: 0.1 },
  { text: "静寂の書庫", left: "78%", top: 2200, speed: 0.5, size: "6rem", op: 0.06 },
  { text: "物理と心", left: "6%", top: 3200, speed: 0.7, size: "3.5rem", op: 0.08 },
  { text: "星の言葉", left: "90%", top: 3900, speed: 0.4, size: "4.5rem", op: 0.07 },
];

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53) % 100,
  top: (i * 337) % 4800,
  speed: 0.2 + ((i * 7) % 10) / 12,
  size: 6 + ((i * 3) % 8),
  rot: (i * 47) % 360,
}));

export function JapaneseParallax() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;
    const el = root.current;
    if (!el) return;
    const layers = Array.from(el.querySelectorAll<HTMLElement>("[data-speed]"));
    let frame: number | null = null;
    const update = () => {
      frame = null;
      const y = window.scrollY;
      for (const l of layers) {
        const s = Number(l.dataset.speed);
        const r = Number(l.dataset.rot || 0);
        l.style.transform = `translate3d(0, ${-y * s}px, 0)${r ? ` rotate(${r + y * 0.05}deg)` : ""}`;
      }
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={root} className="jp-parallax" aria-hidden="true">
      {COLUMNS.map((c) => (
        <span
          key={c.text}
          data-speed={c.speed}
          className="jp-parallax__kanji"
          style={{ left: c.left, top: c.top, fontSize: c.size, opacity: c.op }}
        >
          {c.text}
        </span>
      ))}
      {PETALS.map((p, i) => (
        <span
          key={i}
          data-speed={p.speed}
          data-rot={p.rot}
          className="jp-parallax__petal"
          style={{ left: `${p.left}%`, top: p.top, width: p.size, height: p.size * 0.7 }}
        />
      ))}
      <svg data-speed="0.12" className="jp-parallax__ridge" style={{ top: "70vh" }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 120 Q180 40 360 110 T720 90 T1080 120 T1440 70 L1440 200 Z" />
      </svg>
      <svg data-speed="0.25" className="jp-parallax__ridge jp-parallax__ridge--near" style={{ top: "150vh" }} viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path d="M0 200 L0 140 Q240 60 480 130 T960 100 T1440 130 L1440 200 Z" />
      </svg>
    </div>
  );
}
