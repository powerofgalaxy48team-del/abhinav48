import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { TiltCard } from "@/components/TiltCard";
import { Library } from "@/components/Library";
import { GoldParticles } from "@/components/GoldParticles";
import { OrbitDiagram } from "@/components/OrbitDiagram";
import { CosmicParallax } from "@/components/CosmicParallax";

import helmet from "@/assets/helmet.png";
import goldenNebula from "@/assets/golden-nebula.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Abhinav Byju — Researcher & Web Designer, Kerala" },
      {
        name: "description",
        content:
          "Portfolio of Abhinav Byju: researcher of quantum physics, microplastics and human consciousness, web designer, DIY electronics tinkerer and avid reader from Kerala, India.",
      },
      { property: "og:title", content: "Abhinav Byju — Researcher & Web Designer" },
      {
        property: "og:description",
        content:
          "Research, web design, quantum curiosity and a library of psychology books — the personal site of Abhinav Byju.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const research = [
  {
    t: "Systems, Agendas & Institutions",
    d: "How governmental structures shape incentive, narrative, and policy — and how global bodies like the WHO and the World Bank move funding and influence.",
  },
  {
    t: "Non-verbal Psychology & Consciousness",
    d: "Micro-expressions, posture, and the sentences bodies say out loud — and beneath them, energy points, awareness models, and the medical frame around them.",
  },
  {
    t: "Micro Plastics",
    d: "Tracing invisible polymers through water, soil, and bloodstreams.",
  },
];

const quotes = [
  {
    vertical: "NIETZSCHE",
    text: "He who fights with the monster should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
    by: "Friedrich Nietzsche",
  },
  {
    vertical: "AURELIUS",
    text: "Everything we hear is an opinion, not a fact.",
    by: "Marcus Aurelius",
  },
  {
    vertical: "RUMI",
    text: "I searched for God and found myself, I searched for myself and found only God.",
    by: "Rumi — my deepest favourite",
  },
  {
    vertical: "MY OWN",
    text: "The universe answers other prayer through you, so be there",
    by: "Abhinav Byju",
  },
];

const topics = [
  "Researching random topics",
  "Space exploration · exoplanets · dark matter",
  "Existentialism ⨯ Nihilism",
  "Stoicism · Cogito · Meta-cogitation",
  "Light Triad / Dark Triad",
  "Frequencies & energy",
  "Cyberdecks from scrap electronics",
  "Writing stories and poems",
];

function Cursor() {
  const [p, setP] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const h = (e: MouseEvent) => setP({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-50 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        left: p.x,
        top: p.y,
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--primary) 11%, transparent), transparent 65%)",
      }}
    />
  );
}

function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame: number | null = null;
    const apply = () => {
      frame = null;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      el.style.transform = `scaleX(${progress})`;
    };
    const h = () => {
      if (frame === null) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", h, { passive: true });
    window.addEventListener("resize", h);
    return () => {
      window.removeEventListener("scroll", h);
      window.removeEventListener("resize", h);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={ref} aria-hidden className="scroll-progress" />;
}

const tickerItems = [
  "QUANTUM PHYSICS",
  "MICROPLASTICS",
  "NON-VERBAL PSYCHOLOGY",
  "HUMAN CONSCIOUSNESS",
  "STOICISM",
  "EXISTENTIALISM",
  "CYBERDECKS",
  "FREQUENCIES & ENERGY",
];

function Ticker() {
  return (
    <div
      className="ticker relative z-10 border-y border-border/60 bg-card/40 py-4 md:py-5"
      aria-hidden="true"
    >
      <div className="ticker__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-none items-center">
            {tickerItems.map((t) => (
              <span key={t} className="flex flex-none items-center">
                <span className="px-5 font-condensed text-xl tracking-[0.08em] text-foreground/70 md:px-7 md:text-3xl">
                  {t}
                </span>
                <span className="text-xs text-primary md:text-sm">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Section({
  id,
  label,
  jp,
  index,
  title,
  className = "",
  children,
}: {
  id: string;
  label: string;
  jp?: string;
  index?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`section-atmosphere relative mx-auto max-w-6xl px-6 py-24 md:py-32 ${className}`}
    >
      {index ? <span className="ghost-index" aria-hidden="true">{index}</span> : null}
      {jp ? <span className="vertical-mark" aria-hidden="true">{jp}</span> : null}
      <div className="relative flex items-center gap-4">
        {index ? <span className="font-mono text-xs text-primary">{index}</span> : null}
        <p className="eyebrow">{label}</p>
        <span className="gold-rule" aria-hidden="true" />
      </div>
      <h2 className="relative mt-5 max-w-2xl text-3xl leading-tight md:text-5xl">{title}</h2>
      <div className="relative mt-12">{children}</div>
    </section>
  );

}

function OrbitModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", h);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="orbit-modal fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label="Orbiting interests"
    >
      <div className="absolute inset-0 bg-void/85 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <div className="orbit-modal__panel relative w-full max-w-3xl overflow-hidden rounded-lg border border-border bg-card/95 shadow-2xl">
        <div className="cosmos-stars absolute inset-0 opacity-25" aria-hidden="true" />
        <button
          onClick={onClose}
          aria-label="Close the orbit"
          className="absolute right-4 top-4 z-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
        >
          Close ✕
        </button>
        <div className="relative px-6 py-10 md:px-10">
          <p className="eyebrow text-center">興味 · The mind, set spinning</p>
          <div className="mt-8">
            <OrbitDiagram items={topics} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [orbitOpen, setOrbitOpen] = useState(false);
  // Desktop hero layers move at different speeds without re-rendering the page.
  const nameRef = useRef<HTMLHeadingElement>(null);
  const helmetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let frame: number | null = null;
    const apply = () => {
      frame = null;
      const distance = desktop.matches ? Math.min(window.scrollY, window.innerHeight) : 0;
      if (nameRef.current) nameRef.current.style.transform = `translate3d(0, ${distance * 0.14}px, 0)`;
      if (helmetRef.current) helmetRef.current.style.transform = `translate3d(0, ${distance * -0.12}px, 0)`;
    };
    const h = () => {
      if (frame === null) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", h, { passive: true });
    desktop.addEventListener("change", h);
    return () => {
      window.removeEventListener("scroll", h);
      desktop.removeEventListener("change", h);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="grain relative min-h-screen overflow-x-clip bg-background">
      <Cursor />
      <ScrollProgress />
      <CosmicParallax />
      {orbitOpen ? <OrbitModal onClose={() => setOrbitOpen(false)} /> : null}

      {/* HERO */}
      <header className="hero-stage relative flex min-h-screen flex-col justify-between overflow-hidden">
        <div className="nebula-veil absolute inset-0" aria-hidden="true">
          <img src={goldenNebula.url} alt="" aria-hidden="true" className="nebula-veil__img" />
        </div>
        <div className="cosmos-stars absolute inset-0" aria-hidden="true" />
        <div className="aurora absolute inset-0" />
        <GoldParticles count={84} />
        <div className="helmet-glow z-[15]" aria-hidden="true" />

        <div className="relative z-30 mx-auto mt-4 max-w-sm px-6 text-center sm:absolute sm:left-6 sm:top-6 sm:mx-0 sm:mt-0 sm:max-w-[210px] sm:px-0 sm:text-left">
          <p className="eyebrow">序 · Prologue</p>
          <p className="mt-3 font-display text-lg leading-tight text-foreground/80 md:text-xl">Between the measurable and the mysterious, I keep looking.</p>
        </div>

        {/* The desktop greeting loops behind the astronaut; the compact name stays on touch layouts. */}
        <div className="hero-title-wrap relative z-10 px-4 pt-0">
          <h1 ref={nameRef} aria-label="Abhinav Byju — Researcher & Web Designer">
            <svg
              viewBox="0 0 1000 185"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="block h-[26vh] w-full md:h-[38vh] lg:hidden"
            >
              <text
                x="0"
                y="182"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fill="currentColor"
                className="text-foreground"
                style={{
                  fontFamily: "var(--font-condensed)",
                  fontWeight: 700,
                  fontSize: "200px",
                  textTransform: "uppercase",
                }}
              >
                ABHINAV BYJU
              </text>
            </svg>
            <span className="hero-title-desktop" aria-hidden="true">
              <span className="hero-title-track">
                <span className="hero-title-phrase">HELLO, I AM ABHINAV BYJU&nbsp; · &nbsp;</span>
                <span className="hero-title-phrase">HELLO, I AM ABHINAV BYJU&nbsp; · &nbsp;</span>
              </span>
            </span>
          </h1>
        </div>

        {/* helmet figure — overlaps the name so the smoke touches the type */}
        <div
          ref={helmetRef}
          className="hero-astronaut pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
        >
          <img
            src={helmet}
            width={1200}
            height={1408}
            alt="Faceless astronaut helmet with violet smoke — the site's cosmic sigil"
            className="float-slow h-[78vh] w-auto object-contain md:h-[92vh] lg:h-[94vh]"
            style={{
              maskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
            }}
          />
        </div>

        {/* corner meta */}
        <div className="relative z-30 mx-auto flex w-full max-w-[1600px] flex-1 flex-col items-center justify-end gap-6 px-6 pb-10 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-end md:justify-between md:text-left">
          <div className="space-y-3">
            <p className="role-stack text-4xl normal-case md:text-6xl lg:text-7xl">
              Researcher &
              <br />
              Web Designer
              <br />
            </p>
            <p className="pt-2">since 2013 · &lt;&lt;&lt;&lt;</p>
            <p className="opacity-60">09.9312 N · 76.2673 E · Kerala</p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center md:items-end md:gap-6 md:text-right">
            <p className="text-shine text-lg leading-relaxed md:text-xl">
              4 幽玄
              <br />
              8 烏鎮
            </p>
            <a
              href="https://cosmic-cool.netlify.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Let's travel to a new universe — open Cosmic Cool portfolio"
              className="black-hole-link group"
            >
              <span className="black-hole-link__disk" aria-hidden="true" />
              <span className="black-hole-link__horizon" aria-hidden="true" />
              <span className="black-hole-link__label">
                Let’s travel
                <br />
                to a new
                <br />
                universe <span aria-hidden="true">↗</span>
              </span>
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-background to-transparent" />
      </header>

      <Ticker />

      {/* RESEARCH */}
      <Section
        id="research"
        label="Fields of inquiry"
        jp="探究"
        index="01"
        title="Six directions I keep walking down, mostly at night."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {research.map((r, i) => (
            <TiltCard key={r.t} className="h-full p-6">
              <span
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <p className="font-mono text-xs text-primary">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-2xl">{r.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* WORK */}
      <Section id="work" label="Built things" jp="制作" index="02" title="Websites and one prototype for the planet.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              t: "Cosmic Cool",
              d: "A cosmic-inspired portfolio website with a fresh visual direction and immersive 3D elements.",
              href: "https://cosmic-cool.netlify.app/",
              tag: "Portfolio website · 2026 · 3D",
            },
            {
              t: "Brilliant Driving Institute",
              d: "A clean, conversion-focused site for a local driving school.",
              href: "https://brillaintdrivinginstitute.netlify.app/",
              tag: "Web design",
            },
            {
              t: "Thaslim Kabeer",
              d: "An author's home on the web — quiet typography, book-first layout.",
              href: "https://thaslimkabeer.netlify.app/",
              tag: "Web design",
            },
            {
              t: "PREL-48",
              d: "Plastic Redemption: Earth's Liberation — a working prototype tackling plastic waste.",
              href: "https://www.youtube.com/watch?v=qmoXq_uKwno",
              tag: "Hardware prototype",
            },
            {
              t: "PinKerala",
              d: "A peer-to-peer marketplace for authentic and pre-loved Kerala goods — listings, request boards, courier logistics and 7-day escrow. Currently 30% built.",
              tag: "Startup · in progress",
            },
          ].map((p) => {
            const card = (
              <TiltCard className="flex h-full flex-col justify-between p-7">
                <div>
                  <p className="eyebrow">{p.tag}</p>
                  <h3 className="mt-4 text-2xl">{p.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                </div>
                <span className="mt-8 inline-block font-mono text-xs text-primary">
                  {p.href ? (
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">Visit ↗</span>
                  ) : (
                    <span className="tracking-[0.14em]">In the making…</span>
                  )}
                </span>
              </TiltCard>
            );
            return p.href ? (
              <a key={p.t} href={p.href} target="_blank" rel="noreferrer" className="shimmer block h-full rounded-lg">
                {card}
              </a>
            ) : (
              <div key={p.t} className="block h-full rounded-lg">
                {card}
              </div>
            );
          })}
        </div>

        <TiltCard className="mt-8 p-8 md:p-12" intensity={5}>
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="medal" aria-hidden="true">
                  <span className="font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.12em]">
                    ILLUMINATE-24
                    <br />
                    NATIONAL
                    <br />
                    FINALIST
                  </span>
                </div>
                <p className="eyebrow mt-6">Achievement</p>
                <h3 className="mt-4 text-3xl leading-tight md:text-4xl">
                  ILLUMINATE-24 National Finalist
                </h3>
                <p className="mt-4 font-mono text-xs tracking-[0.12em] text-primary">
                  Top position in the 10–25 finalist category, all-India
                </p>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  A national school hackathon for grades 6–10, hosted by TELTA-21 at the Centre of
                  Excellence in Teacher Education (CETE), Tata Institute of Social Sciences, Mumbai,
                  and supported by Capgemini India.
                </p>
                <p>
                  Months of mentorship turning raw ideas into working prototypes for real community
                  problems. Team <span className="text-foreground">POWEROFGALAXY48</span>, Crescent
                  Public School — project <span className="text-foreground">PREL-48</span>.
                </p>
                <a
                  href="https://leap21stcentury.org/contest"
                  target="_blank"
                  rel="noreferrer"
                  className="shimmer inline-block border-b border-primary pb-0.5 text-primary"
                >
                  About the contest ↗
                </a>
              </div>
            </div>
        </TiltCard>
      </Section>

      {/* QUOTES */}
      <Section id="quotes" className="section-invert" label="Three lines I live near" jp="言葉" index="03" title="Words that keep rearranging me.">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q) => (
            <TiltCard key={q.by} className="h-full" intensity={8}>
              <div className="flex h-full flex-col p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="quote-mark" aria-hidden="true">“</span>
                  <span className="quote-vertical" aria-hidden="true">{q.vertical}</span>
                </div>
                <p className="mt-6 font-display text-xl not-italic leading-relaxed text-card-foreground md:text-2xl">"{q.text}"</p>
                <div className="mt-auto pt-8">
                  <div className="flex items-center gap-4">
                    <span className="quote-diamond" aria-hidden="true">◆</span>
                    <span className="gold-rule" aria-hidden="true" />
                  </div>
                  <p className="mt-4 eyebrow">{q.by}</p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </Section>

      {/* LIBRARY */}
      <section id="library" className="section-atmosphere relative overflow-hidden py-24 md:py-32">
        <span className="vertical-mark" aria-hidden="true">書架</span>
        <div className="starfield absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-primary">04</span>
            <p className="eyebrow">The library</p>
            <span className="gold-rule" aria-hidden="true" />
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">
            Books I've read, and books that are waiting.
          </h2>
          <div className="mt-16">
            <Library />
          </div>
          <a
            href="https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ"
            target="_blank"
            rel="noreferrer"
            className="shimmer mt-14 block text-center font-mono text-xs tracking-[0.12em] text-primary"
          >
            Start with Ahlam by Thaslim Kabeer ↗
          </a>
        </div>
      </section>

      {/* TOPICS — opens as an overlay on click */}
      <Section id="topics" label="Orbiting interests" jp="興味" index="05" title="What the mind circles when it's free.">
        <div className="flex flex-col items-center gap-8 py-6 text-center">
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            Eight things my attention keeps circling — research rabbit holes, old philosophies, and machines
            wired together from scrap. Open the orbit to watch them turn.
          </p>
          <button
            onClick={() => setOrbitOpen(true)}
            className="shimmer group inline-flex items-center gap-3 border border-border px-8 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-primary transition-all duration-500 hover:border-primary hover:text-primary"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            Enter the orbit
            <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
          </button>
        </div>
      </Section>

      {/* CLOSING QUOTE — a full page of its own on desktop */}
      <section
        id="mantra"
        aria-label="A line I live by"
        className="relative hidden min-h-screen items-center justify-center overflow-hidden border-t border-border lg:flex"
      >
        <div className="starfield absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="cosmos-stars absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="aurora absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <span className="quote-mark block" aria-hidden="true">“</span>
          <p className="mt-10 font-display text-4xl leading-tight md:text-6xl xl:text-7xl">
            The universe answers other prayer through you,
            <br />
            <span className="text-shine italic">so be there</span>.
          </p>
          <div className="mx-auto mt-12 flex max-w-xs items-center justify-center gap-4">
            <span className="gold-rule" aria-hidden="true" />
            <span className="quote-diamond" aria-hidden="true">◆</span>
            <span className="gold-rule" aria-hidden="true" />
          </div>
          <p className="mt-6 eyebrow">Abhinav Byju · a line I live by</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-border">
        <div className="nebula-veil nebula-veil--footer absolute inset-0" aria-hidden="true">
          <img src={goldenNebula.url} alt="" aria-hidden="true" className="nebula-veil__img" />
        </div>
        <div className="aurora absolute inset-0 rotate-180 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="footer-mega select-none" aria-hidden="true">
            ABHINAV BYJU
          </p>
          <p className="mt-8 font-display text-3xl italic md:text-5xl">
            "I searched for myself and found only God ~ Rumi"
          </p>
          <p className="mt-6 eyebrow">幽玄 ·ABHINAV BYJU · KERALA, INDIA · 悟真</p>
        </div>
      </footer>
    </main>
  );
}
