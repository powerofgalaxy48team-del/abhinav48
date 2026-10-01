import { useEffect, useMemo, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Dot = {
  x: number;
  y: number;
  size: number;
  depth: number;
  opacity: number;
  delay: number;
};

function makeDots(count: number): Dot[] {
  const dots: Dot[] = [];
  let seed = 20240;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
  for (let i = 0; i < count; i++) {
    const depth = 0.15 + rand() * 0.85;
    dots.push({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + depth * 2.2,
      depth,
      opacity: 0.25 + depth * 0.55,
      delay: rand() * 6,
    });
  }
  return dots;
}

export function GoldParticles({ count = 78 }: { count?: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const dots = useMemo(() => makeDots(count), [count]);

  useEffect(() => {
    if (isMobile) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame: number | null = null;
    const onScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(() => {
        frame = null;
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--scroll", String(window.scrollY));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div ref={ref} aria-hidden="true" className="gold-particles pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="gold-particles__dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            ["--depth" as string]: d.depth,
          }}
        />
      ))}
    </div>
  );
}
