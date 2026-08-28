import { useEffect, useRef, useState } from "react";

type Book = {
  title: string;
  author: string;
  hue: number;
  tall?: boolean;
  note?: string;
  link?: string;
};

const shelfOne: Book[] = [
  {
    title: "Ahlam",
    author: "Thaslim Kabeer",
    hue: 40,
    tall: true,
    note: "Must read",
    link: "https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ",
  },
  { title: "Animal Farm", author: "George Orwell", hue: 20, note: "Favourite" },
  { title: "1984", author: "George Orwell", hue: 350, tall: true },
  { title: "Meditations", author: "Marcus Aurelius", hue: 55 },
  { title: "Mastery", author: "Robert Greene", hue: 265, tall: true },
  { title: "48 Laws of Power", author: "Robert Greene", hue: 285 },
];

const shelfTwo: Book[] = [
  { title: "Wings of Fire", author: "APJ Abdul Kalam", hue: 200, tall: true },
  { title: "Read People Like a Book", author: "Patrick King", hue: 160 },
  { title: "What Every Body is Saying", author: "Joe Navarro", hue: 130, tall: true },
  { title: "Ikigai", author: "Miralles & Garcia", hue: 95 },
  { title: "Psychology of Money", author: "Morgan Housel", hue: 70, tall: true },
  { title: "Thajasiyaya Vhami", author: "Thulasi Kodukal", hue: 320 },
  { title: "New World Order", author: "A. Ralph Epperson", hue: 240 },
];

function Shelf({ books }: { books: Book[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        setMouseX(e.clientX - r.left);
      }}
      onMouseLeave={() => setMouseX(null)}
      className="relative"
      style={{ perspective: "1200px" }}
    >
      <div className="flex items-end justify-center gap-[6px] px-4 pb-1 sm:gap-2">
        {books.map((b) => (
          <Spine key={b.title} book={b} mouseX={mouseX} containerRef={ref} />
        ))}
      </div>
      {/* shelf plank */}
      <div className="relative h-4 rounded-sm bg-gradient-to-b from-[oklch(0.32_0.03_60)] to-[oklch(0.18_0.02_60)] shadow-[0_18px_40px_-18px_oklch(0_0_0/0.9)]" />
      <div className="mx-6 h-6 rounded-b-xl bg-gradient-to-b from-[oklch(0.16_0.02_60)] to-transparent" />
    </div>
  );
}

function Spine({
  book,
  mouseX,
  containerRef,
}: {
  book: Book;
  mouseX: number | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const el = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (!el.current || !containerRef.current) return;
      const r = el.current.getBoundingClientRect();
      const c = containerRef.current.getBoundingClientRect();
      setCenter(r.left - c.left + r.width / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [containerRef]);

  const dist = mouseX === null ? 9999 : Math.abs(mouseX - center);
  const proximity = Math.max(0, 1 - dist / 90);
  const out = proximity * 46;

  return (
    <div ref={el} className="relative" style={{ transformStyle: "preserve-3d" }}>
      <div
        className="relative flex w-[26px] cursor-pointer items-center justify-center rounded-t-[3px] sm:w-[34px]"
        style={{
          height: book.tall ? 210 : 178,
          transform: `translateY(${-out}px) rotateX(${proximity * 6}deg)`,
          transition: "transform 420ms cubic-bezier(0.16,1,0.3,1)",
          background: `linear-gradient(100deg, oklch(0.30 0.07 ${book.hue}), oklch(0.42 0.10 ${book.hue}) 45%, oklch(0.24 0.06 ${book.hue}))`,
          boxShadow: `inset -3px 0 6px oklch(0 0 0/0.45), inset 3px 0 4px oklch(1 0 0/0.06), 0 ${8 + out / 3}px ${14 + out / 2}px -8px oklch(0 0 0/0.8)`,
        }}
      >
        <span
          className="select-none whitespace-nowrap font-display text-[11px] tracking-wide text-foreground/80"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {book.title}
        </span>
        <span
          className="absolute inset-x-[3px] top-[6px] h-[2px] rounded-full"
          style={{ background: `oklch(0.82 0.13 82 / ${0.35 + proximity * 0.5})` }}
        />
      </div>

      <div
        className="pointer-events-none absolute bottom-full left-1/2 z-20 w-52 -translate-x-1/2 rounded-md border border-border bg-popover/95 p-3 text-center backdrop-blur"
        style={{
          opacity: proximity > 0.55 ? 1 : 0,
          transform: `translate(-50%, ${proximity > 0.55 ? -14 : -4}px)`,
          transition: "opacity 260ms ease, transform 260ms ease",
          boxShadow: "var(--shadow-float)",
        }}
      >
        <p className="font-display text-base leading-tight">{book.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">{book.author}</p>
        {book.note && <p className="mt-2 eyebrow text-primary">{book.note}</p>}
      </div>
    </div>
  );
}

export function Library() {
  return (
    <div className="space-y-14">
      <Shelf books={shelfOne} />
      <Shelf books={shelfTwo} />
      <p className="text-center text-xs text-muted-foreground">
        Move your cursor along the shelves — the books lean out to introduce themselves.
      </p>
    </div>
  );
}
