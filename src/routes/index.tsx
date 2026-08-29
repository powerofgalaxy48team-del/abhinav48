import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";
import { Library } from "@/components/Library";

import helmet from "@/assets/helmet.png";

import nietzsche from "@/assets/nietzsche.png.asset.json";
import aurelius from "@/assets/aurelius.webp.asset.json";
import rumi from "@/assets/rumi.webp.asset.json";

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
  { t: "Quantum Physics", d: "Superposition, entanglement, and where measurement quietly breaks intuition." },
  { t: "Micro Plastics", d: "Tracing invisible polymers through water, soil, and bloodstreams." },
  { t: "Non-verbal Psychology", d: "Micro-expressions, posture, and the sentences bodies say out loud." },
  { t: "Systems & Agendas", d: "How governmental structures shape incentive, narrative, and policy." },
  { t: "WHO & World Banks", d: "Global institutions, funding flows, and the mechanics of influence." },
  { t: "Human Consciousness", d: "Energy points, awareness models, and the medical frame around them." },
];

const quotes = [
  {
    img: nietzsche.url,
    text: "He who fights with the monster should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
    by: "Friedrich Nietzsche",
    ratio: "aspect-[16/9]",
  },
  {
    img: aurelius.url,
    text: "Everything we hear is an opinion, not a fact.",
    by: "Marcus Aurelius",
    ratio: "aspect-[3/4]",
  },
  {
    img: rumi.url,
    text: "I searched for God and found myself, I searched for myself and found only God.",
    by: "Rumi — my deepest favourite",
    ratio: "aspect-[3/4]",
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
          "radial-gradient(circle, color-mix(in oklab, var(--accent) 14%, transparent), transparent 65%)",
      }}
    />
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <Reveal>
        <p className="eyebrow">{label}</p>
        <h2 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">{title}</h2>
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function Index() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <main className="grain relative min-h-screen overflow-x-hidden bg-background">
      <Cursor />

      {/* HERO — cosmos.studio style */}
      <header className="relative flex min-h-screen flex-col justify-between overflow-hidden">
        <div className="cosmos-stars absolute inset-0" aria-hidden="true" />
        <div className="aurora absolute inset-0" />

        {/* giant name */}
        <div className="relative z-10 px-4 pt-8 md:pt-12">
          <h1
            aria-label="Abhinav Byju — Researcher & Web Designer"
            style={{ transform: `translateY(${scrollY * -0.06}px)` }}
          >
            <svg
              viewBox="0 0 1000 185"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="block h-[22vh] w-full md:h-[34vh]"
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
          </h1>
        </div>


        {/* helmet figure — overlaps the name so the smoke touches the type */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        >
          <img
            src={helmet}
            width={1200}
            height={1408}
            alt="Faceless astronaut helmet with violet smoke — the site's cosmic sigil"
            className="float-slow h-[78vh] w-auto object-contain md:h-[92vh]"
            style={{
              maskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
            }}
          />
        </div>

        {/* corner meta */}
        <div className="relative z-30 mx-auto flex w-full max-w-[1600px] flex-1 items-end justify-between gap-6 px-6 pb-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <div className="space-y-3">
            <p className="role-stack text-4xl normal-case md:text-6xl lg:text-7xl">
              Researcher
              <br />
              Web Designer
              <br />
              Quantum &amp; DIY
            </p>
            <p className="pt-2">since 2013 · &lt;&lt;&lt;&lt;</p>
            <p className="opacity-60">09.9312 N · 76.2673 E · Kerala</p>
          </div>

          <div className="hidden flex-col items-end gap-6 text-right md:flex">
            <p className="leading-relaxed">
              Creating
              <br />
              memorable
              <br />
              digital
              <br />
              experiences
            </p>
            <a
              href="#work"
              className="group grid h-28 w-28 place-items-center rounded-full border border-border/60 text-xs tracking-[0.2em] transition-all duration-500 hover:border-primary hover:text-primary"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              <span className="transition-transform duration-500 group-hover:-translate-y-0.5">
                Explore
              </span>
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-background to-transparent" />
      </header>


      {/* RESEARCH */}
      <Section
        id="research"
        label="Fields of inquiry"
        title="Six directions I keep walking down, mostly at night."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {research.map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
              <TiltCard className="h-full p-6">
                <p className="font-mono text-xs text-primary">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 text-2xl">{r.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.d}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WORK */}
      <Section id="work" label="Built things" title="Websites and one prototype for the planet.">
        <div className="grid gap-6 md:grid-cols-3">
          {[
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
          ].map((p, i) => (
            <Reveal key={p.t} delay={i * 90}>
              <a href={p.href} target="_blank" rel="noreferrer" className="block h-full">
                <TiltCard className="flex h-full flex-col justify-between p-7">
                  <div>
                    <p className="eyebrow">{p.tag}</p>
                    <h3 className="mt-4 text-2xl">{p.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                  </div>
                  <span className="mt-8 font-mono text-xs text-primary">Visit ↗</span>
                </TiltCard>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <TiltCard className="mt-8 p-8 md:p-12" intensity={5}>
            <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow">Achievement</p>
                <h3 className="mt-4 text-3xl leading-tight md:text-4xl">
                  ILLUMINATE-24 National Finalist
                </h3>
                <p className="mt-4 font-mono text-xs text-primary">
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
                  className="inline-block border-b border-primary pb-0.5 text-primary"
                >
                  About the contest ↗
                </a>
              </div>
            </div>
          </TiltCard>
        </Reveal>
      </Section>

      {/* QUOTES */}
      <Section id="quotes" label="Three lines I live near" title="Words that keep rearranging me.">
        <div className="grid gap-8 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.by} delay={i * 100}>
              <TiltCard className="h-full" intensity={8}>
                <div className={`overflow-hidden ${q.ratio}`}>
                  <img
                    src={q.img}
                    alt={`Illustration for the quote by ${q.by}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="font-display text-lg italic leading-snug">"{q.text}"</p>
                  <p className="mt-3 eyebrow">{q.by}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* LIBRARY */}
      <section id="library" className="relative overflow-hidden py-24 md:py-32">
        <div className="starfield absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6">
          <Reveal>
            <p className="eyebrow">The library</p>
            <h2 className="mt-3 max-w-2xl text-3xl leading-tight md:text-5xl">
              Books I've read, and books that are waiting.
            </h2>
          </Reveal>
          <div className="mt-16">
            <Library />
          </div>
          <Reveal>
            <a
              href="https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ"
              target="_blank"
              rel="noreferrer"
              className="mt-14 block text-center font-mono text-xs text-primary"
            >
              Start with Ahlam by Thaslim Kabeer ↗
            </a>
          </Reveal>
        </div>
      </section>

      {/* TOPICS */}
      <Section id="topics" label="Orbiting interests" title="What the mind circles when it's free.">
        <div className="flex flex-wrap gap-3">
          {topics.map((t, i) => (
            <Reveal key={t} delay={i * 50}>
              <span className="inline-block rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-foreground">
                {t}
              </span>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-border">
        <div className="aurora absolute inset-0 rotate-180 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <p className="font-display text-3xl italic md:text-5xl">
            "I searched for myself and found only God."
          </p>
          <p className="mt-6 eyebrow">幽玄 ·ABHINAV BYJU · KERALA, INDIA · 悟真</p>
        </div>
      </footer>
    </main>
  );
}
