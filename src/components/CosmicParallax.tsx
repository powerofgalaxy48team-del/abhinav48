import { useEffect, useRef } from "react";

/**
 * Deep-space layered parallax: nebula glows, gold orbit rings, constellation
 * lines and drifting orbs, each moving at a different depth as you scroll.
 * Fixed behind content; transforms via rAF (no React state). Desktop/tablet only.
 */
const NEBULAE = [
  { left: "-10%", top: 300, speed: 0.1, size: 900, hue: "gold", op: 0.1 },
  { left: "60%", top: 1400, speed: 0.18, size: 1100, hue: "violet", op: 0.08 },
  { left: "5%", top: 2800, speed: 0.26, size: 800, hue: "ember", op: 0.09 },
  { left: "55%", top: 4100, speed: 0.14, size: 1000, hue: "gold", op: 0.07 },
];

const RINGS = [
  { left: "78%", top: 500, speed: 0.32, size: 340, tilt: 62, op: 0.14 },
  { left: "2%", top: 1900, speed: 0.45, size: 260, tilt: 70, op: 0.12 },
  { left: "70%", top: 3300, speed: 0.38, size: 420, tilt: 58, op: 0.1 },
];

const ORBS = Array.from({ length: 12 }, (_, i) => ({
  left: (i * 83 + 7) % 96,
  top: (i * 421 + 200) % 4600,
  speed: 0.25 + ((i * 5) % 10) / 14,
  size: 3 + ((i * 4) % 6),
  op: 0.25 + ((i * 3) % 5) / 10,
}));

const CONSTELLATIONS = [
  { left: "10%", top: 900, speed: 0.22, op: 0.16, flip: false },
  { left: "62%", top: 2500, speed: 0.3, op: 0.13, flip: true },
  { left: "18%", top: 3900, speed: 0.2, op: 0.14, flip: false },
];

export function CosmicParallax() {
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
        const s = Number(l.dataset["speed"]);
        const spin = l.dataset["spin"] ? ` rotate(${y * 0.02}deg)` : "";
        l.style.transform = `translate3d(0, ${-y * s}px, 0)${spin}`;
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
    <div ref={root} className="cosmic-parallax" aria-hidden="true">
      {NEBULAE.map((n, i) => (
        <span
          key={`n${i}`}
          data-speed={n.speed}
          className={`cosmic-parallax__nebula cosmic-parallax__nebula--${n.hue}`}
          style={{ left: n.left, top: n.top, width: n.size, height: n.size, opacity: n.op }}
        />
      ))}
      {RINGS.map((r, i) => (
        <span
          key={`r${i}`}
          data-speed={r.speed}
          data-spin="1"
          className="cosmic-parallax__ring"
          style={{
            left: r.left,
            top: r.top,
            width: r.size,
            height: r.size,
            opacity: r.op,
            ["--tilt" as string]: `${r.tilt}deg`,
          }}
        />
      ))}
      {CONSTELLATIONS.map((c, i) => (
        <svg
          key={`c${i}`}
          data-speed={c.speed}
          className="cosmic-parallax__constellation"
          style={{ left: c.left, top: c.top, opacity: c.op, transform: c.flip ? "scaleX(-1)" : undefined }}
          width="320"
          height="220"
          viewBox="0 0 320 220"
          fill="none"
        >
          <path d="M20 180 L90 120 L150 150 L220 70 L300 40" stroke="currentColor" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="20" cy="180" r="2.4" fill="currentColor" />
          <circle cx="90" cy="120" r="3" fill="currentColor" />
          <circle cx="150" cy="150" r="2" fill="currentColor" />
          <circle cx="220" cy="70" r="3.4" fill="currentColor" />
          <circle cx="300" cy="40" r="2.2" fill="currentColor" />
        </svg>
      ))}
      {ORBS.map((o, i) => (
        <span
          key={`o${i}`}
          data-speed={o.speed}
          className="cosmic-parallax__orb"
          style={{ left: `${o.left}%`, top: o.top, width: o.size, height: o.size, opacity: o.op }}
        />
      ))}
    </div>
  );
}
