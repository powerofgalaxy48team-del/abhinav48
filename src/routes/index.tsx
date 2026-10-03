import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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



const projects = [
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
    d: "Plastic Redemption: Earth's Liberation — a working prototype against plastic waste.",
    href: "https://www.youtube.com/watch?v=qmoXq_uKwno",
    tag: "Hardware prototype",
  },
];

const fields = [
  {
    t: "Quantum Physics & Consciousness",
    d: "Where superposition, measurement and awareness quietly break intuition.",
  },
  {
    t: "Micro Plastics & Environment",
    d: "Tracing invisible polymers through water, soil and bloodstreams.",
  },
  {
    t: "Psychology, Systems & Institutions",
    d: "Non-verbal signals, government agendas, the WHO and World Bank — how people and power really move.",
  },
];

const otherQuotes = [
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

// Placeholder contact details — replace with the real ones.
const EMAIL = "hello@abhinavbyju.com";
const socials = [
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
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
      <div className="mx-auto w-full max-w-[1100px] px-6">
        <p className="caption">
          <span className="text-primary">{jp}</span>
          <span className="mx-3 opacity-40">/</span>
          {label}
        </p>
        <h2 className="mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h2>
        <div className="mt-16 md:mt-20">{children}</div>
      </div>
    </section>
  );
}

function Index() {
  // Parallax: the helmet sinks and fades as you scroll, uncovering the name.
  const nameRef = useRef<HTMLDivElement>(null);
  const helmetRef = useRef<HTMLDivElement>(null);
  const [moreQuotes, setMoreQuotes] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame: number | null = null;
    const apply = () => {
      frame = null;
      const y = Math.min(window.scrollY, window.innerHeight);
      const p = y / window.innerHeight;
      if (nameRef.current) nameRef.current.style.transform = `translate3d(0, ${y * -0.15}px, 0)`;
      if (helmetRef.current) {
        helmetRef.current.style.transform = `translate3d(0, ${y * 0.55}px, 0) scale(${1 - p * 0.12})`;
        helmetRef.current.style.opacity = String(Math.max(0, 1 - p * 1.3));
      }
    };
    const h = () => {
      if (frame === null) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", h, { passive: true });
    return () => {
      window.removeEventListener("scroll", h);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip">
      <div className="page-nebula" aria-hidden="true">
        <img src={goldenNebula.url} alt="" />
      </div>

      {/* HERO */}
      <header className="relative flex min-h-screen flex-col overflow-hidden">
        <div ref={nameRef} className="relative z-10 px-4 pt-6 will-change-transform">
          <h1 aria-label="Abhinav Byju — Researcher & Web Designer">
            <svg viewBox="0 0 1000 185" preserveAspectRatio="none" aria-hidden="true" className="block h-[22vh] w-full md:h-[34vh]">
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

        <div ref={helmetRef} className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex justify-center will-change-transform">
          <img
            src={helmet}
            width={1200}
            height={1408}
            alt="Faceless astronaut helmet with violet smoke"
            className="h-[62vh] w-auto object-contain md:h-[80vh]"
            style={{
              maskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
              WebkitMaskImage: "linear-gradient(to bottom, #000 55%, transparent 96%)",
            }}
          />
        </div>

        <div className="hero-fade" aria-hidden="true" />
        <div className="relative z-30 mx-auto mt-auto flex w-full max-w-[1100px] flex-col gap-8 px-6 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl md:text-5xl">Researcher &amp; Web Designer</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground/70">
              目に見える世界のすぐその下に隠された
              <br />
              深く、究極の真理を見出すこと
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#work" className="btn-primary">Explore</a>
            <a href="#contact" className="btn-ghost">Get in touch</a>
          </div>
        </div>
      </header>

      {/* WORK */}
      <Section id="work" label="Built things" jp="制作" title="Websites and one prototype for the planet.">
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((p) => (
            <article key={p.t} className="calm-card flex flex-col">
              <div className="aspect-[16/10] rounded-md bg-muted/60" aria-label={`${p.t} screenshot placeholder`} />
              <p className="caption mt-6">{p.tag}</p>
              <h3 className="mt-3 text-2xl">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
              <a href={p.href} target="_blank" rel="noreferrer" className="mt-6 text-sm text-primary hover:underline">
                Visit ↗
              </a>
            </article>
          ))}
        </div>
      </Section>

      {/* RESEARCH */}
      <Section id="research" label="Fields of inquiry" jp="探究" title="Three directions I keep walking down, mostly at night.">
        <div className="space-y-20 md:space-y-28">
          {fields.map((f, i) => (
            <div key={f.t} className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-10">
              <p className="font-display text-5xl text-primary md:text-6xl">{String(i + 1).padStart(2, "0")}</p>
              <div>
                <h3 className="text-3xl md:text-4xl">{f.t}</h3>
                <p className="mt-4 max-w-xl text-muted-foreground">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ACHIEVEMENT */}
      <Section id="achievement" label="Achievement" jp="栄誉" title="ILLUMINATE-24 National Finalist.">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start">
          <div className="grid h-24 w-24 place-items-center rounded-full border border-primary/60 font-mono text-xs uppercase tracking-[0.12em] text-primary">
            1st
          </div>
          <div className="max-w-2xl space-y-5 text-muted-foreground">
            <p>
              Top position in a national school hackathon hosted by TELTA-21 at CETE, Tata Institute of Social Sciences, and supported by Capgemini.
              Team <span className="text-foreground">POWEROFGALAXY48</span> from Crescent Public School built <span className="text-foreground">PREL-48</span>, a prototype tackling plastic waste.
            </p>
            <a href="https://leap21stcentury.org/contest" target="_blank" rel="noreferrer" className="inline-block text-primary hover:underline">
              About the contest ↗
            </a>
          </div>
        </div>
      </Section>

      {/* QUOTES */}
      <Section id="quotes" label="Words" jp="言葉" title="The line I live nearest.">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="font-display text-3xl italic leading-snug md:text-5xl">
            “I searched for God and found myself, I searched for myself and found only God.”
          </blockquote>
          <figcaption className="caption mt-8">Rumi</figcaption>
        </figure>
        <div className="mt-16 text-center">
          <button type="button" onClick={() => setMoreQuotes((v) => !v)} className="btn-ghost" aria-expanded={moreQuotes}>
            {moreQuotes ? "Fewer quotes" : "More quotes"}
          </button>
        </div>
        {moreQuotes && (
          <div className="mx-auto mt-14 grid max-w-3xl gap-12">
            {otherQuotes.map((q) => (
              <figure key={q.by} className="text-center">
                <blockquote className="font-display text-xl italic leading-snug md:text-2xl">“{q.text}”</blockquote>
                <figcaption className="caption mt-4">{q.by}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>

      {/* LIBRARY */}
      <Section id="library" label="The library" jp="書架" title="Books I've read, and books that are waiting.">
        <Library />
        <a
          href="https://play.google.com/store/books/details/Thaslim_Kabeer_Ahlam?id=2mPHEQAAQBAJ"
          target="_blank"
          rel="noreferrer"
          className="mt-10 block text-center text-sm text-primary hover:underline"
        >
          Start with Ahlam by Thaslim Kabeer ↗
        </a>
      </Section>

      {/* INTERESTS */}
      <Section id="topics" label="Orbiting interests" jp="興味" title="What the mind circles when it's free.">
        <ul className="grid gap-6 sm:grid-cols-2">
          {interests.map((t) => (
            <li key={t} className="border-t border-border pt-5 text-xl">{t}</li>
          ))}
        </ul>
      </Section>

      {/* CONTACT */}
      <footer id="contact" className="calm-section">
        <div className="mx-auto w-full max-w-[1100px] px-6 text-center">
          <p className="caption"><span className="text-primary">連絡</span><span className="mx-3 opacity-40">/</span>Contact</p>
          <p className="mx-auto mt-8 max-w-3xl font-display text-3xl italic md:text-5xl">“I searched for myself and found only God.”</p>
          <p className="mt-12 text-lg">Abhinav Byju</p>
          <p className="mt-1 text-sm text-muted-foreground">Kerala, India</p>
          <a href={`mailto:${EMAIL}`} className="mt-8 inline-block text-primary hover:underline">{EMAIL}</a>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="hover:text-primary">{s.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
