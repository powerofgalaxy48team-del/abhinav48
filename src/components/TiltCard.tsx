import { useIsMobile } from "@/hooks/use-mobile";
import { memo, useCallback, useEffect, useRef, type ReactNode } from "react";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

type TiltPoint = { x: number; y: number };

function TiltCardComponent({
  children,
  className = "",
  intensity = 10,
}: TiltCardProps) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const currentRef = useRef<TiltPoint>({ x: 0, y: 0 });
  const targetRef = useRef<TiltPoint>({ x: 0, y: 0 });
  const activeRef = useRef(false);

  const renderFrame = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const current = currentRef.current;
    const target = targetRef.current;
    current.x += (target.x - current.x) * 0.16;
    current.y += (target.y - current.y) * 0.16;

    el.style.transform = `perspective(900px) rotateY(${current.x * intensity}deg) rotateX(${-current.y * intensity}deg) translateZ(${activeRef.current ? 18 : 0}px)`;
    el.style.setProperty("--mx", `${(current.x + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(current.y + 0.5) * 100}%`);

    const settled = Math.abs(target.x - current.x) < 0.002 && Math.abs(target.y - current.y) < 0.002;
    if (!activeRef.current && settled) {
      currentRef.current = { x: 0, y: 0 };
      el.style.transform = "";
      el.removeAttribute("data-tilting");
      frameRef.current = null;
      return;
    }

    frameRef.current = requestAnimationFrame(renderFrame);
  }, [intensity]);

  const requestRender = useCallback(() => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(renderFrame);
  }, [renderFrame]);

  const onPointerEnter = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || e.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;
    rectRef.current = el.getBoundingClientRect();
    activeRef.current = true;
    el.dataset["tilting"] = "true";
  }, [isMobile]);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (isMobile || !activeRef.current) return;
    const rect = rectRef.current;
    if (!rect) return;
    targetRef.current = {
      x: Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5)),
      y: Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5)),
    };
    requestRender();
  }, [isMobile, requestRender]);

  const onPointerLeave = useCallback(() => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    activeRef.current = false;
    targetRef.current = { x: 0, y: 0 };
    el.dataset["tilting"] = "false";
    requestRender();
  }, [isMobile, requestRender]);

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      ref={ref}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-mobile={isMobile ? "true" : "false"}
      className={`card-3d group relative overflow-hidden rounded-lg border border-border bg-card/60 backdrop-blur-sm ${isMobile ? "card-3d--mobile" : ""} ${className}`}
      style={{ boxShadow: isMobile ? "var(--shadow-float-soft)" : "var(--shadow-float)" }}
    >
      {!isMobile && <div className="card-3d__glare pointer-events-none absolute inset-0" aria-hidden="true" />}
      <div className="card-3d__content relative">{children}</div>
    </div>
  );
}

const MemoTiltCard = memo(TiltCardComponent);

export function TiltCard(props: TiltCardProps) {
  return <MemoTiltCard {...props} />;
}
