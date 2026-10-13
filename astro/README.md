# Spokane Stump Grinder — Astro project (this builds the live site)

Static-output Astro build of the site. Emits the **same `.html` URLs** as the old hand-written
pages (`build.format: 'file'`), inlines all CSS, ships no client framework. Vercel builds this
on every push to `main` (see `/vercel.json`) and serves `dist/`. The root-level `*.html` files
are frozen legacy copies and are not served.

```
npm install          # once (Node >= 22.12)
npm run dev          # http://localhost:4321  (copies images/favicon/robots into public/ first)
npm run build        # -> dist/ (17 pages + sitemap.xml + optimized images)
npm run preview      # serve dist/
```

## Layout

| Path | What |
|---|---|
| `src/layouts/Site.astro` | **v2** layout: design-system CSS, v2 header/footer, sticky mobile call bar. Used by redesigned pages (homepage). |
| `src/layouts/Base.astro` | **legacy** layout: pixel-identical reproduction of the old header/footer/theme toggle. Used by the 16 not-yet-redesigned pages. |
| `src/styles/tokens.css` | Design tokens: shadcn preset `b7Pv8qNNp5` (style luma, base stone, radius 0.875rem, IBM Plex Sans + Source Sans 3, lucide) with brand red/black/white re-mapped. Light + dark. |
| `src/styles/base.css` | Reset, typography, buttons, cards, badges, FAQ accordion, skip link. |
| `src/styles/fonts.css` | `@font-face` for the self-hosted preset fonts in `public/fonts/` (latin subset). |
| `src/styles/shared.css`, `src/styles/pages/*.css` | Legacy CSS split out of the old pages by `tools/convert.mjs`. Do not hand-edit for redesigned pages. |
| `src/components/v2/*` | Design-system components (Header, Footer, ThemeSwitch, MobileCtaBar, Icon, Img, LatestPost). |
| `src/components/*` (top level) | Legacy components used by `Base.astro`. |
| `src/data/site.ts` | Business facts + nav/footer link lists (one place). |
| `src/data/posts.ts` | **The blog.** Add a post here (+ its page) and blog.html cards, the homepage feature, and sitemap.xml update themselves. |
| `src/data/home.ts` | Homepage copy (all of it is verified existing copy / CLAUDE.md facts). |
| `src/fragments/*.html` | Verbatim page bodies that contain third-party scripts (Service Autopilot form, Wistia). Kept byte-identical. |
| `src/pages/*.astro` | One per URL. `sitemap.xml.ts` generates the sitemap. |
| `tools/` | One-shot migration tooling (`convert.mjs`, `dataize.mjs`, `pinned.json`). Not part of the build. |

## Rules carried over from CLAUDE.md
No invented facts, credentials, reviews or prices; keep the existing `.html` URLs; never
touch `src/fragments/service-request-main.html` except via a deliberate, tested change.

## Theme
`data-theme="light|dark"` on `<html>` (set by the switch, stored as `ssg-theme`), falling back
to `prefers-color-scheme`. Same mechanism and key as the legacy toggle, so a visitor's choice
carries across old and new pages during the migration.
