# spokanestumpgrinder.com

Static marketing site for **Spokane Stump Grinder** — stump grinding and stump
removal/cleanup in Spokane, WA and the Coeur d'Alene region.

## Deployment

Live at **spokanestumpgrinder.com** (and `www.` — both valid). Pipeline:

```
local files → git push → GitHub → Vercel (auto-deploy) → live site
```

- **Repo**: https://github.com/JeffJames2626/spokanestumpgrinder, branch `main`.
  Every push to `main` auto-deploys to production. No staging branch, no CI checks.
- **Host**: Vercel, zero-config static deploy (no framework, no build command —
  it just serves the HTML files as-is).
- **Permanent fallback URL**: spokanestumpgrinder.vercel.app — always resolves
  even if the custom domain's DNS ever breaks.
- **Domain DNS**: managed in Squarespace (domain was registered there; the
  Squarespace *website* product is not used — DNS just points at Vercel).
  `A` record on `@` → Vercel's IP, `CNAME` on `www` → `cname.vercel-dns.com`.
- **Rollback**: Vercel dashboard → Deployments → "..." on any past deploy →
  Promote to Production. Instant, no git operations needed.
- **Git identity**: this repo's commits use a local-only placeholder author
  (`Spokane Stump Grinder <noreply@spokanestumpgrinder.com>`), not the global
  git config — deliberately kept separate from Jeff's other business email
  per the brand-separation rule below.

To push a change: `git add -A && git commit -m "..." && git push` from this
folder. Live within ~1 minute.

## Architecture

Six standalone HTML files. **Every page carries its own inline `<style>` block.**
No shared stylesheet, no JS bundle, no build step, no dependencies. Pages link to
each other by bare filename and work opened directly from disk (`file://`).

```
index.html            Homepage — hero, 2 service tiles, why-us, process, pricing band, CTA
services.html         Grinding + removal/cleanup, 8 pricing factors, service area
booking.html          Google Calendar appointment embed, prep table, scheduling FAQ
case-studies.html     3 case-study templates (video + before/after each)
about.html            Story, 3 pillars, how-we-work, team, credentials, service area
service-request.html  Service Autopilot request form (inline HTML)
```

### Do not refactor into a shared stylesheet

This was tried and rejected. Each page must stay self-contained so it can be
opened, edited, or replaced on its own. Duplicated CSS across files is the
intended tradeoff. If you change a shared component (header, nav, footer,
button styles), apply it to all six files.

### Design tokens

Defined as CSS custom properties in `:root` at the top of every page's style
block. Keep them identical across files.

```
--bark #2f2a24   dark brown — header, footer, dark bands
--bark-2 #453d33 lighter brown — cards on dark
--moss #3d6b3a   green — primary buttons, accents
--moss-dark #2c5029
--chip #c9a227   gold — phone button, eyebrow accents, badges
--sand #f6f3ed   warm off-white — alternating section bands
--line #e0d9cc   borders
--text #2b2823 / --muted #5f594f
```

Shared classes: `.wrap` (1080px container), `.btn` / `.btn-primary` /
`.btn-outline`, `.eyebrow`, `.lead`, `.grid` + `.card`, `.steps` + `.step`,
`.cta`, `.note`, `.band`, `.towns` (service-area list), `.ph` (media
placeholder), `.todo` (yellow unfinished marker), `.footer-map` +
`.footer-map-link` + `.footer-addr` (footer address/map block, all six pages).

## Hard rules

1. **Never invent facts.** No customer names, job details, prices, dates,
   license numbers, insurance carriers, or years in business unless Jeff
   supplied them. Leave a `<span class="todo">` marker instead. Every
   placeholder currently on the site exists because the real value wasn't
   known.
2. **No pricing figures anywhere.** Stump work is quoted per job. services.html
   explains the 8 cost factors instead of listing dollar amounts. Keep it that way.
3. **Never mention "Automated Lawn & Pest" or "Marko's Sprinklers."** Same
   owners, deliberately separate brand. The Service Autopilot form arrived with
   an ALP header `<h1>` in it — it was removed and must stay removed.
4. **One `<h1>` per page**, no heading-level skips.
5. Nav is identical on all six pages; the current page gets `class="active"`.

## Content facts (verified, safe to reuse)

- Phone: **509-434-9554** — temporary, Jeff will change it. Appears in header,
  CTA, and footer of every page. To swap, find-and-replace **both**
  `509-434-9554` (display) and `+15094349554` (tel: hrefs) across all 6 files.
- Address: **1908 E Mallon Ave, Spokane, WA 99202**. In the footer of every
  page: a `.footer-addr` link (opens Google Maps directions, URL-encoded
  as `1908+E+Mallon+Ave%2C+Spokane%2C+WA+99202`), an embedded Google Maps
  iframe (`.footer-map`) pointed at the actual **Google Business Profile
  listing** (not a plain address search) via its `maps/embed?pb=...` share
  code — includes the Place ID `0x549e190660699b21:0x6eaa9fed67721e4a` — and
  a `.footer-map-link` "Get Directions" fallback below the map, which still
  uses the plain address-based directions URL. To change the address, update
  the encoded string in the directions links; the map embed itself is tied
  to the Business Profile listing, not the address, so it won't need to
  change unless the listing itself moves.
- Business credentials (about.html credentials table): Business name
  **Spokane Stump Grinder**, WA contractor license **MARKOS\*778D8**, UBI
  **601-939-576**. Note the license number contains "MARKOS" — flagged to
  Jeff since it brushes against the brand-separation rule above, but it's
  the real license string he supplied, not content we chose. Liability
  insurance and bonded rows were **removed** from the table at his request
  (not left as TODOs — he doesn't want those disclosed).
- Service area: 28 communities, same list as the owners' other company —
  21 in WA (Airway Heights, Chattaroy, Cheney, Chewelah, Colbert, Colville,
  Davenport, Deer Park, Elk, Freeman, Green Bluff, Hangman Valley, Hillyard,
  Liberty Lake, Mead, Medical Lake, Newport, Nine Mile Falls, Otis Orchards,
  Spokane Valley, Veradale) and 7 in ID (Coeur d'Alene, Hayden, Hayden Lake,
  Post Falls, Priest Lake, Priest River, Sandpoint).
  Listed on services.html and about.html.
- Owners: Jeff James (owner) and Tiffany (co-founder), both Spokane natives,
  working on properties in the area since 2021.
- Values line used as a pull quote on about.html: "Work hard, tell the truth,
  do what you say you'll do, and take care of people."
- Three pillars: Transparency, Innovation, Professionalism.

## Integrations

### Service Autopilot form — service-request.html

Inline HTML version. Form ID `968e21cf-2114-493e-aa17-4397e0df47df`, posts to
`https://my.serviceautopilot.com/ProcessForm.aspx`.

Two earlier approaches **failed and must not be reintroduced**: the
`BacktellForms.js` script embed and the `viewform.html` iframe. Both depended on
my.serviceautopilot.com responding. The inline version has no external
dependency at render time.

Five defects in Service Autopilot's generated code were fixed in our copy. If
the form is ever regenerated from SA, re-apply all five:

1. Removed the `Automated Lawn & Pest - Marko's Sprinklers` `<h1>` (branding).
2. Removed `{ credit - card - logic }` — an unsubstituted template placeholder
   in their JS. It threw `ReferenceError: credit is not defined` on failed
   validation, killing the function before the re-enable code ran and leaving
   Submit permanently dead until page reload.
3. `.saButton` → `.sabutton` — CSS is case-sensitive and the element uses
   `class="sabutton"`, so the button rendered completely unstyled.
4. Removed one stray unmatched `</div>`.
5. `width:640px` → `max-width:640px` for mobile.

Left as-is (harmless): a `value="" \>` backslash typo; `$.getUrlVars` requiring
jQuery (only reachable on the honeypot/bot path).

### Google Calendar — booking.html

Embedded appointment schedule iframe. A direct link
(`https://calendar.app.google/aTdtZTwUYeFVpjR17`) and the phone number sit below
it as fallbacks. Note: that short link **cannot** be iframed — the embed uses
Google's `calendar.google.com/calendar/appointments/schedules/<ID>?gv=true` URL.

### Wistia video slots

services.html has 1, case-studies.html has 3. Each is a grey `.ph.ph-video` box
with full paste-in instructions in an HTML comment directly above it. Each needs
its own Wistia media ID.

## Unfinished work

31 markers, all `<span class="todo">`. Search the folder for `class="todo"`.

| File | Count | Needs |
|---|---|---|
| case-studies.html | 24 | 3 real jobs: titles, city, month/year, 4 story fields each, videos, before/after photos |
| about.html | 4 | Idaho registration, team photos, Jeff's equipment background, Tiffany's last name if public |
| booking.html | 3 | Payment methods, reschedule notice window, storm/emergency policy |

Business name, WA contractor license #, and UBI number are filled in on
about.html (verified facts below). The liability-insurance and bonded rows
were removed from the credentials table entirely, at Jeff's request — not
just left blank.

Also missing sitewide: logo (header uses a plain colored circle), real
photography (every `.ph` box), analytics.

`favicon.svg`, `robots.txt`, and `sitemap.xml` now exist at the project root
and are linked from all six pages (`<link rel="icon" type="image/svg+xml"
href="favicon.svg">` in each `<head>`). The favicon is a placeholder — colored
circle with dark tree rings, matching the header's brand mark — swap it if a
real logo shows up. `sitemap.xml` hardcodes `https://spokanestumpgrinder.com/`;
update it if the domain changes.

## Open questions for Jeff

- Service-area list reaches Sandpoint, Colville, and Priest Lake (60–90 min from
  Spokane). Workable for recurring lawn routes, marginal for one-time stump
  jobs — may want a tighter core list.
- Idaho contractor registration is required for work in CdA / Post Falls /
  Sandpoint.
- The SA form doesn't collect stump diameter or gate width — currently handled
  by pointing people at the Notes box. Real fields would give cleaner data.

## Verifying changes

No test suite. After edits, confirm:

```bash
# structural validation
tidy -q -e *.html

# no dead links, all pages paint (needs python)
python -m http.server 8000    # then click through all six pages
```

Manual checklist: one `<h1>` per page, no heading skips, nav `active` matches
the file, no horizontal overflow at 390px, phone number consistent, no invented
facts, no ALP/Marko's references.
