import type { CSSProperties } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type OrbitStyle = CSSProperties & {
  "--slot-angle": string;
  "--node-depth": string;
};

export function OrbitDiagram({ items }: { items: string[] }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-3" role="list" aria-label="Orbiting interests">
        {items.map((item) => (
          <span
            key={item}
            role="listitem"
            className="inline-block rounded-full border border-border px-5 py-3 text-sm tracking-[0.06em] text-muted-foreground"
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  const midpoint = Math.ceil(items.length / 2);
  const rings = [
    { items: items.slice(0, midpoint), size: "inner", duration: 52, reverse: false, offset: -18 },
    { items: items.slice(midpoint), size: "outer", duration: 76, reverse: true, offset: 18 },
  ];

  return (
    <div className="orrery mx-auto aspect-square w-full max-w-[780px]" role="list" aria-label="Orbiting interests">
      <div className="orrery__stage" aria-hidden="true">
        <div className="orrery__glow" />
        <div className="orrery__axis" />
        {rings.map((ring) => (
          <div key={ring.size} className={`orrery__orbit orrery__orbit--${ring.size}`} aria-hidden="true">
            <div
              className={`orrery__spin${ring.reverse ? " orrery__spin--reverse" : ""}`}
              style={{ animationDuration: `${ring.duration}s` }}
            >
              {ring.items.map((item, index) => {
                const angle = ring.offset + (360 / ring.items.length) * index;
                const placement: OrbitStyle = {
                  "--slot-angle": `${angle}deg`,
                  "--node-depth": `${12 + (index % 4) * 7}px`,
                };
                return (
                  <div key={item} className="orrery__slot" style={placement} role="listitem">
                    <div
                      className={`orrery__counter${ring.reverse ? " orrery__counter--reverse" : ""}`}
                      style={{ animationDuration: `${ring.duration}s` }}
                    >
                      <span className="orrery__chip">{item}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <div className="orrery__core">
          <span className="orrery__core-mark" aria-hidden="true">✳</span>
          <p className="eyebrow">Orbiting</p>
          <p className="orrery__core-title">the mind</p>
          <span className="orrery__core-caption">A private universe</span>
        </div>
      </div>
    </div>
  );
}
