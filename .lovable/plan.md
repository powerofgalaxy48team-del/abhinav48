# Calmer, premium layout pass (no restart)

Keeps: nebula, helmet, violet accent, kanji section labels, all links, projects and text meaning. Changes only structure, spacing and how much content is shown.

Note: the uploaded brief cuts off at "4. Achievement: keep…". Sections after that follow the same global rules (see below); send the rest of the brief to refine them.

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
4. Achievement — ILLUMINATE-24 kept as one calm focal block (title, project PREL-48, team, school), flat violet badge instead of spinning gold medal.
5. Quotes, Library, Interests, Contact — kept, simplified to the same spacing and colour rules (quotes one per row with generous space; library shelf kept; interests as a simple list instead of busy orbit).

## Technical details
- `src/styles.css`: retune tokens (background #0D0D0D, primary = violet, drop gold usage in buttons/rules/text-shine), add fixed `.page-nebula` background layer, remove `.section-atmosphere` overlays, add `.section` spacing utility.
- `src/routes/index.tsx`: reorder sections, rewrite hero/research/achievement markup, remove `CosmicParallax` and `GoldParticles` usage, simplify `Section` wrapper.
- `TiltCard`, `Library`: keep behavior, remove gold glow styling.
- Head metadata unchanged.
