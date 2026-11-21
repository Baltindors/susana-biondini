# Design system

Mobile-first static Vue 3 + Vite literary portfolio and blog for Susana I. Biondini. The visual language is editorial and bookish: warm paper surfaces, a restrained burgundy accent, expressive serif headings, and quiet cards that sit just off the page.

## Architecture & Content Management

This is a **strictly static frontend application** hosted on GitHub Pages. There is no Node.js backend, no custom API, and no traditional database.

- **CMS**: Content is managed via **Sveltia CMS** located at `/admin/`.
- **Data Storage**: Sveltia is a Git-based CMS. All dynamic content (blog posts, gallery data, portfolio items) is saved directly to the GitHub repository as static flat files (Markdown, YAML, JSON) and static media assets.
- **Data Fetching**: The Vue application reads these static content files directly, meaning all content is resolved statically without requiring a server runtime.

## Typography

Load two webfonts from Google Fonts with `display=swap`:

- **Serif:** Newsreader (`font-serif`) for the author’s name, section headings, book titles, pull quotes, and blog `.prose` body. Fallbacks: Georgia, Times New Roman, serif.
- **Sans:** Source Sans 3 (`font-sans`) for navigation, dates, badges, CTAs, and UI metadata. Fallbacks: system-ui, sans-serif.

Hierarchy:

- Page titles: Newsreader, medium weight, about 2.25rem on a phone and larger from `md` up.
- Section headings: Newsreader, about 1.5rem, ink color.
- Body: 1rem to 1.125rem, relaxed line height, generous space between sections.
- Secondary facts (dates, venues, descriptions): muted, never the accent.

## Color

Colors follow `prefers-color-scheme`. There is no manual theme toggle.

| Role | Light | Dark |
| --- | --- | --- |
| Page surface (`paper`) | `#faf8f5` | `#1a1714` |
| Card surface (`card`) | `#ffffff` | `#241f1b` |
| Primary text (`ink`) | `#1c1917` | `#f5f0ea` |
| Secondary text (`muted`) | `#6b6560` | `#a39e97` |
| Accent | `#7a2e3a` | `#c98993` |
| Hairline | `rgb(28 25 23 / 0.1)` | `rgb(245 240 234 / 0.12)` |

The accent is a deep literary burgundy — the only chromatic brand color. Use it for the active nav item, publisher/venue highlights, text links, and primary Amazon CTAs. Book covers carry their own color; do not introduce a second brand accent.

Tokens live in `src/style.css` as CSS variables, then mapped with Tailwind `@theme inline` so utilities such as `bg-paper`, `bg-card`, `text-ink`, `text-muted`, `text-accent`, `font-serif`, and `ring-line` follow the system theme.

## Components

Cards share `AppCard`:

- Radius `1.25rem` (`rounded-card`), with `corner-shape: squircle` where the browser supports continuous corners.
- Padding of at least `1.5rem`.
- Card fill via `bg-card` so cards lift off the warm paper page.
- A two-layer shadow (`shadow-card`): a tight 1px lift and a soft 24px falloff.
- A 1px hairline (`ring-line`) so the edge stays visible in dark mode.

The top bar is sticky, translucent (`bg-paper/70`), and blurred (`backdrop-blur-xl`). After the page scrolls, it also picks up `shadow-card`. Navigation labels are **Perfil**, **Obra**, **Galería**, and **Entrelíneas**. Below the `md` breakpoint they collapse into a hamburger button with Spanish `aria-expanded` labels.

Portraits and book covers use `object-cover`, subtle `ring-line` borders, and paths resolved with `import.meta.env.BASE_URL` so GitHub Pages under `/susana-biondini/` works.

Blog posts use Tailwind Typography (`prose prose-neutral dark:prose-invert`) with Newsreader on the prose body so Markdown stays within the column and long-form reading feels literary.

## Motion

Keep motion short and small.

- Route changes use Vue `<Transition name="page">`: fade plus an 8px upward slide, about 350ms, `mode="out-in"`.
- Sections and cards use `@vueuse/motion` `v-motion` with `visibleOnce`: start at opacity 0 and `y: 12`, then settle once they enter the viewport.
- `prefers-reduced-motion: reduce` disables the route transition. `@vueuse/motion` also respects reduced motion.

Do not add bounce, parallax, or looping animation.
