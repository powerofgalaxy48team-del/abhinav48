import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Library } from "@/components/Library";

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
    t: "Quantum Physics & Consciousness",
    d: "Where measurement breaks intuition, and what awareness itself might be made of.",
  },
  {
    t: "Micro Plastics & Environment",
    d: "Tracing invisible polymers through water, soil and bloodstreams — and how to undo them.",
  },
  {
    t: "Psychology, Systems & Institutions",
    d: "Non-verbal expression, government agendas, the WHO and World Bank — how people and power really move.",
  },
];

const projects = [
  {
    t: "Brilliant Driving Institute",
    d: "A clean, conversion-focused site for a local driving school.",
    href: "https://brillaintdrivinginstitute.netlify.app/",
  },
  {
    t: "Thaslim Kabeer",
    d: "An author's home on the web — quiet typography, book-first layout.",
    href: "https://thaslimkabeer.netlify.app/",
  },
  {
    t: "PREL-48",
    d: "Plastic Redemption: Earth's Liberation — a working prototype tackling plastic waste.",
    href: "https://www.youtube.com/watch?v=qmoXq_uKwno",
  },
];

const rumi = {
  text: "I searched for God and found myself, I searched for myself and found only God.",
  by: "Rumi",
};

const moreQuotes = [
  {
    text: "He who fights with the monster should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you.",
    by: "Friedrich Nietzsche",
  },
  { text: "Everything we hear is an opinion, not a fact.", by: "Marcus Aurelius" },
];

const interests = [
  "Space exploration & dark matter",
  "Existentialism & Stoicism",
  "Cyberdecks from scrap electronics",
  "Writing stories and poems",
];

function Section({
  id,
  label,
  jp,
  title,
  children,
}: {
  id: string;
  label: string;
  jp: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="calm-section">
      <p className="kanji-label">
        {jp} · {label}
      </p>
      <h2 className="mt-5 max-w-2xl text-3xl leading-tight md:text-5xl">{title}</h2>
      <div className="mt-14">{children}</div>
    </section>
  );
}

function Index() {
  const [showQuotes, setShowQuotes] = useState(false);
  const [fullLibrary, setFullLibrary] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background">
      <div className="page-nebula" aria-hidden="true">
        <img src={goldenNebula.url} alt="" />
      </div>

      {/* HERO */}
      <header className="relative z-[1] flex min-h-screen flex-col overflow-hidden">
        <div className="relative z-10 px-4 pt-6">
          <h1 aria-label="Abhinav Byju — Researcher & Web Designer">
            <svg viewBox="0 0 1000 185" preserveAspectRatio="none" aria-hidden="true" className="block h-[18vh] w-full md:h-[32vh]">
              <text
                x="0"
                y="182"
                textLength="1000"
                lengthAdjust="spacingAndGlyphs"
                fill="currentColor"
                className="text-foreground"
                style={{ fontFamily: "var(--font-condensed)", fontWeight: 700, fontSize: "200px", textTransform: "uppercase" }}
              >
                ABHINAV BYJU
              </text>
            </svg>
          </h1>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center">
          <img
            src={helmet}
            width={1200}
            height={1408}
            alt="Faceless astronaut helmet — the site's cosmic sigil"
            className="h-[60vh] w-auto object-contain opacity-90 md:h-[80vh]"
            style={{
              maskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto mt-auto flex w-full max-w-[1100px] flex-col gap-8 px-6 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kanji-label">Kerala, India</p>
            <p className="mt-3 font-display text-3xl md:text-5xl">Researcher &amp; Web Designer</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#work" className="btn-primary">Explore</a>
              <a href="#contact" className="btn-ghost">Get in touch</a>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground/70 md:text-right">
            目に見える世界の
            <br />
            すぐその下に隠された
            <br />
            深く、究極の真理を
            <br />
            見出すこと
          </p>
        </div>
      </header>

      {/* WORK */}
      <Section id="work" label="Built things" jp="制作" title="Websites and one prototype for the planet.">
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.t} className="flex flex-col rounded-lg bg-card/70 p-5">
              <div className="aspect-[16/10] w-full rounded-md bg-muted" aria-label={`${p.t} screenshot placeholder`} />
              <h3 className="mt-6 text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              <a href={p.href} target="_blank" rel="noreferrer" className="mt-6 text-sm text-primary hover:underline">
                Visit ↗
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* RESEARCH */}
      <Section id="research" label="Fields of inquiry" jp="探究" title="Three directions I keep walking down.">
        <div className="space-y-16 md:space-y-20">
          {research.map((r, i) => (
            <div key={r.t} className="grid gap-4 md:grid-cols-[120px_1fr]">
              <p className="font-display text-4xl text-primary md:text-5xl">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-2xl md:text-4xl">{r.t}</h3>
                <p className="mt-3 max-w-xl text-muted-foreground">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ACHIEVEMENT */}
      <Section id="achievement" label="Achievement" jp="栄誉" title="ILLUMINATE-24 National Finalist">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
          <div className="grid h-28 w-28 place-items-center rounded-full border border-primary text-center">
            <span className="font-mono text-[11px] uppercase leading-tight tracking-[0.12em] text-primary">
              1st
              <br />
              ILLUM 24
            </span>
          </div>
          <div className="max-w-xl space-y-4 text-muted-foreground">
            <p>
              Top position at a national school hackathon hosted by TELTA-21 at CETE, Tata Institute of Social
              Sciences, Mumbai, supported by Capgemini India. Team{" "}
              <span className="text-foreground">POWEROFGALAXY48</span> from Crescent Public School built{" "}
              <span className="text-foreground">PREL-48</span>, a prototype for plastic waste.
            </p>
            <a href="https://leap21stcentury.org/contest" target="_blank" rel="noreferrer" className="inline-block text-primary hover:underline">
              About the contest ↗
            </a>
          </div>
        </div>
      </Section>

      {/* WORDS */}
      <Section id="quotes" label="Words" jp="言葉" title="The line I live near.">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-3xl italic leading-snug md:text-5xl">“{rumi.text}”</blockquote>
          <figcaption className="kanji-label mt-8">{rumi.by}</figcaption>
        </figure>
        <div className="mt-14 text-center">
          <button type="button" onClick={() => setShowQuotes((v) => !v)} className="btn-ghost" aria-expanded={showQuotes}>
            {showQuotes ? "Fewer quotes" : "More quotes"}
          </button>
        </div>
        {showQuotes ? (
          <div className="mx-auto mt-12 max-w-2xl space-y-10 text-center">
            {moreQuotes.map((q) => (
              <figure key={q.by}>
                <blockquote className="font-display text-xl italic leading-snug md:text-2xl">“{q.text}”</blockquote>
                <figcaption className="kanji-label mt-4">{q.by}</figcaption>
              </figure>
            ))}
          </div>
        ) : null}
      </Section>

      {/* LIBRARY */}
      <Section id="library" label="The library" jp="書架" title="Books I've read, and books that are waiting.">
        <Library expanded={fullLibrary} />
        <div className="mt-12 flex flex-col items-center gap-6">
          <button type="button" onClick={() => setFullLibrary((v) => !v)} className="btn-ghost" aria-expanded={fullLibrary}>
            {fullLibrary ? "Show fewer books" : "View full library"}
          </button>
          <a
            href="https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-primary hover:underline"
          >
            Start with Ahlam by Thaslim Kabeer ↗
          </a>
        </div>
      </Section>

      {/* INTERESTS */}
      <Section id="topics" label="Orbiting interests" jp="興味" title="What the mind circles when it's free.">
        <ul className="grid gap-4 sm:grid-cols-2">
          {interests.map((t) => (
            <li key={t} className="rounded-lg bg-card/70 px-6 py-5 text-lg">
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {/* CONTACT */}
      <footer id="contact" className="calm-section text-center">
        <p className="kanji-label">連絡 · Contact</p>
        <p className="mx-auto mt-8 max-w-3xl font-display text-3xl italic md:text-5xl">
          “I searched for myself and found only God.”
        </p>
        <p className="mt-10 text-xl">Abhinav Byju</p>
        <p className="mt-2 text-muted-foreground">Kerala, India</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="mailto:hello@abhinavbyju.com" className="btn-primary">Email me</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="btn-ghost">Instagram</a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="btn-ghost">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}
