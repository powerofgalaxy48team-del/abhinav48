# Calmer, premium layout pass (no restart)

Keeps: nebula, helmet, violet accent, kanji section labels, all links, projects and text meaning. Changes only structure, spacing and how much content is shown.

No animations, loader, custom cursor or new menu in this pass.

## Global
- Each main section is at least one screen tall, 120px+ top/bottom padding on desktop, centered content ~1100px wide.
- Three type styles only: serif display (headings), clean sans (body), small uppercase letter-spaced caption (kanji labels, eyebrows).
- Colour: near-black background (#0D0D0D), white / soft grey text, violet as the only accent. Gold stays only inside the nebula image — gold buttons, rules, glows, shimmer, medal gold and gold particles switch to violet or are removed.
- Nebula shown once as a fixed, dimmed full-page background with a dark overlay; removed from hero/footer/section overlays.
- Kanji only as small labels above titles; vertical marks, index numbers-as-decoration, Japanese side text removed.
- Remove clutter: extra borders, glows, cosmic parallax, gold particles, section atmosphere bands, orbit decoration beyond what's needed.

## New section order
1. Hero — name, helmet, one role line "Researcher & Web Designer", Japanese poem small and low-contrast below, two buttons: "Explore" (scrolls to work) and "Get in touch" (scrolls to contact).
2. Built things (制作) — moved right after hero. 3 clean cards: placeholder thumbnail area, title, one-line description, "Visit" link.
3. Fields of inquiry (探究) — 3 large numbered blocks stacked vertically:
   - 01 Quantum Physics & Consciousness
   - 02 Micro Plastics & Environment
   - 03 Psychology, Systems & Institutions
   Title + one short sentence each.
4. Achievement — ILLUMINATE-24 kept as one calm focal block (title, project PREL-48, team, school), flat violet badge instead of spinning gold medal. Description shortened to two sentences; "About the contest" link kept.
5. Words (言葉) — only the Rumi quote, large and centered. The other two hidden behind a small "More quotes" toggle.
6. Library (書架) — one row of 5 books: Ahlam, Animal Farm, Meditations, Mastery, Psychology of Money. Desktop hover effect kept. "View full library" button reveals the rest. "Start with Ahlam" link kept.
7. Orbiting interests (興味) — orbit diagram replaced by 4 short items in a small grid: Space exploration & dark matter; Existentialism & Stoicism; Cyberdecks from scrap electronics; Writing stories and poems.
8. Footer / Contact — closing line "I searched for myself and found only God", name, Kerala, India, email and social links. "Get in touch" scrolls here.

## Mobile
- Everything stacks in one column with comfortable spacing.
- Hover-only effects become tap-friendly (library books open on tap) or horizontally scrollable rows.
- Nothing overlaps or scrolls sideways.

## Technical details
- `src/styles.css`: retune tokens (background #0D0D0D, primary = violet, drop gold usage in buttons/rules/text-shine), add fixed `.page-nebula` background layer, remove `.section-atmosphere` overlays, add `.section` spacing utility.
- `src/routes/index.tsx`: reorder sections, rewrite hero/research/achievement markup, remove `CosmicParallax` and `GoldParticles` usage, simplify `Section` wrapper.
- `TiltCard`, `Library`: keep behavior, remove gold glow styling.
- Head metadata unchanged.
