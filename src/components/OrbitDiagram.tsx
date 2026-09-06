import { useIsMobile } from "@/hooks/use-mobile";

export function OrbitDiagram({ items }: { items: string[] }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-wrap gap-3">
        {items.map((t) => (
          <span
            key={t}
            className="inline-block rounded-full border border-border px-5 py-3 text-sm tracking-[0.06em] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    );
  }

  const inner = items.slice(0, Math.ceil(items.length / 2));
  const outer = items.slice(Math.ceil(items.length / 2));

  return (
    <div className="orbit relative mx-auto aspect-square w-full max-w-[720px]">
      <div className="orbit__ring orbit__ring--inner" aria-hidden="true" />
      <div className="orbit__ring orbit__ring--outer" aria-hidden="true" />
      <div className="orbit__core" aria-hidden="true" />

      <div className="orbit__core-label">
        <p className="eyebrow">Orbiting</p>
        <p className="mt-1 font-display text-2xl">the mind</p>
      </div>

      {[
        { list: inner, radius: 30, duration: 46, reverse: false },
        { list: outer, radius: 46, duration: 66, reverse: true },
      ].map((ring, ri) => (
        <div
          key={ri}
          className="orbit__spinner"
          style={{
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.reverse ? "reverse" : "normal",
          }}
        >
          {ring.list.map((t, i) => {
            const angle = (360 / ring.list.length) * i;
            return (
              <div
                key={t}
                className="orbit__slot"
                style={{ transform: `rotate(${angle}deg) translate(${ring.radius}%) rotate(-${angle}deg)` }}
              >
                <span
                  className="orbit__chip"
                  style={{
                    animationDuration: `${ring.duration}s`,
                    animationDirection: ring.reverse ? "normal" : "reverse",
                  }}
                >
                  {t}
                </span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
