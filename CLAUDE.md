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

Seven standalone HTML files. **Every page carries its own inline `<style>` block.**
No shared stylesheet, no JS bundle, no build step, no dependencies. Pages link to
each other by bare filename and work opened directly from disk (`file://`).

```
index.html            Homepage — hero, 2 service tiles, why-us, process, pricing band, CTA
services.html         Grinding + removal/cleanup, 8 pricing factors, service area
booking.html          Free-consultation calendar embed, prep table
case-studies.html     3 real case studies (video + before/after each)
about.html            Story, 3 pillars, how-we-work, team, credentials, service area
faq.html              Pricing, the work itself, scheduling, getting started
service-request.html  Service Autopilot request form (inline HTML)
```

### Do not refactor into a shared stylesheet

This was tried and rejected. Each page must stay self-contained so it can be
opened, edited, or replaced on its own. Duplicated CSS across files is the
intended tradeoff. If you change a shared component (header, nav, footer,
button styles), apply it to all seven files.

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
`.footer-map-link` + `.footer-addr` (footer address/map block, all seven pages).

## Hard rules

1. **Never invent facts.** No customer names, job details, prices, dates,
   license numbers, insurance carriers, or years in business unless Jeff
   supplied them. Leave a `<span class="todo">` marker instead. Every
   placeholder currently on the site exists because the real value wasn't
   known.
2. **No pricing figures anywhere.** Stump work is quoted per job. services.html
   explains the 8 cost factors instead of listing dollar amounts. Keep it that way.
3. **Never mention "Automated Lawn & Pest" or "Marko's Sprinklers" by name.**
   Same owners, deliberately separate brand. The Service Autopilot form arrived
   with an ALP header `<h1>` in it — it was removed and must stay removed.
   Exception, deliberately carved out by Jeff: the footer copyright line reads
   "&copy; 2026 Spokane Stump Grinder. All rights reserved. &middot; An
   Automated Company" on all seven pages — a generic ownership-group credit, no
   link, no specific company named. This is the start of a standard footer
   credit Jeff wants across every site he onboards going forward. Don't treat
   it as a slip to "fix" — it's intentional and should stay. Still don't
   spell out "Automated Lawn & Pest" or "Marko's Sprinklers" anywhere.
4. **One `<h1>` per page**, no heading-level skips.
5. Nav is identical on all seven pages; the current page gets `class="active"`.

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
- Owner: Jeff James, Spokane native, working on properties in the area since
  2023. about.html previously named Tiffany as a co-founder and described the
  business as "husband-and-wife" — both removed at Jeff's request; the team
  section now shows only Jeff plus an open "add team member" placeholder.
  Don't reintroduce Tiffany or the husband-and-wife framing without him
  asking for it again.
- Values line used as a pull quote on about.html: "Do good work. Be straight
  with people. Leave things better than you found them."
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

services.html has 1, case-studies.html has 3 (jobs 1 and 2 filled in, job 3
still a grey `.ph.ph-video` box). Uses Wistia's newer `<wistia-player>`
web-component embed (not the older jsonp/responsive-padding style) — full
paste-in instructions live in an HTML comment above each remaining empty
slot. Each video needs its own media ID **and** its own `aspect` value —
check what Wistia's embed code gives you per video, vertical phone footage
(`aspect="0.5625"`) looks nothing like horizontal (`aspect="1.7778"`).

### Photos — images/ folder

Real photos go in `images/`, named `case-study-N-before.jpg` /
`case-study-N-after.jpg` (or similar descriptive names for about.html
team photos, etc.) — no spaces, git tracks them normally. In the page,
swap the placeholder `<div class="ph ph-sq">...</div>` for
`<div class="ph-sq"><img class="photo" src="images/...jpg" alt="..."></div>`
— the `.photo` class (object-fit:cover + rounded corners) is already
defined on every page that has photo placeholders.

**Chat-pasted photos don't reliably land on disk.** Sometimes they show up
in the project folder automatically (mechanism unclear), sometimes not —
don't assume, always check `images/` before asking Jeff to re-send. When
they do land, they can arrive as originals (`IMG_1234.jpg`) sitting loose
in `images/` rather than pre-named — rename with `git mv` before wiring
them in. One raw phone video (`.MOV`, ~19MB) landed in `images/` alongside
real photos once and got pushed to the repo by mistake before anyone
caught it — removed after the fact, but it's still sitting in git history
since rewriting history means a force-push, which wasn't worth the risk
for one oversized file. `.gitignore` now blocks `*.mov`/`*.mp4`/`*.m4v` so
it can't happen again silently; if a real video file is ever needed
in-repo, it'll need an explicit `git add -f`.

## Unfinished work

1 marker, `<span class="todo">`, in faq.html (moved there from booking.html —
see "FAQ page" section below). Search the folder for `class="todo"`.

| File | Count | Needs |
|---|---|---|
| faq.html | 1 | Payment methods |

The "Do you do storm or emergency work?" card was removed entirely at
Jeff's request, not left as a TODO — he doesn't want rush/emergency work
addressed on the site at all right now. The reschedule-notice-window TODO
is resolved: "Things happen — just give us as much notice as possible,"
no specific window promised.

Jeff's bio (about.html) is filled in: mowing since age 13, ran a local
maintenance company for 14 years (1 truck to 30 employees), went out on his
own in 2023, stump grinding grew from a hobby into its own specialty.
**Business start year is 2023**, confirmed by Jeff — every "serving since"
reference sitewide (about.html meta description, hero copy, story section,
credentials table) was updated from the earlier placeholder 2021 to 2023.

case-studies.html is fully complete: all 3 jobs have real titles, locations,
dates, service lines, 4 story fields each, Wistia videos, and before/after
photos. No markers left on that page.

The "Note for Jeff" launch-prep box that used to sit at the top of
case-studies.html is gone too — removed at Jeff's request once all 3 jobs
were filled in, not just a temporary hide.

### FAQ page

faq.html is a 7th page added after the original 6-page build. Structure:
Pricing & Estimates, The Work Itself, Scheduling & Booking, Getting Started,
then a closing CTA — same `.eyebrow`/`.grid`/`.card` pattern as every other
page, alternating plain/`.band` sections. The Scheduling & Booking section
is the old "Good to Know" FAQ that used to live on booking.html, moved here
verbatim (including its 3 `.todo` markers) rather than duplicated. The
other three sections are new content Jeff asked for ("in addition to
anything else you want to add") — all of it traceable to facts already
established elsewhere on the site (services.html's pricing factors,
service-request.html's "what to include," the grinding-vs-removal
distinction), nothing invented. booking.html's CTA now links to faq.html
for visitors with non-scheduling questions, since the full FAQ section no
longer lives there.

### "OSC" terminology

"On-Site Consultation," abbreviated **OSC**, is Jeff's chosen term for the
free calendar-booked visit (both in-house and customer-facing — this isn't
internal jargon we're hiding from visitors). Used throughout booking.html
and faq.html, both plain "on-site consultation" spelled out on first mention
per page and "OSC" afterward. Don't revert to generic "consultation" or
"appointment" in this context — it's a deliberate, consistent choice, not
interchangeable wording. If a page introduces the free-visit concept for
the first time, spell it out once ("on-site consultation (OSC)") before
shortening to OSC, same pattern used on both existing pages.

The credentials table on about.html is fully filled in: business name, WA
contractor license #, and UBI number are real values (verified facts below).
The liability-insurance, bonded, and Idaho-registration rows were removed
from the table entirely, at Jeff's request — not just left blank. The
"these are left blank" lead-in sentence above the table was removed too,
since nothing in it is blank anymore.

Also missing sitewide: logo (header uses a plain colored circle), real
photography (every `.ph` box), analytics.

`favicon.svg`, `robots.txt`, and `sitemap.xml` now exist at the project root
and are linked from all seven pages (`<link rel="icon" type="image/svg+xml"
href="favicon.svg">` in each `<head>`). The favicon is a placeholder — colored
circle with dark tree rings, matching the header's brand mark — swap it if a
real logo shows up. `sitemap.xml` hardcodes `https://spokanestumpgrinder.com/`;
update it if the domain changes, and remember to add/remove `<url>` entries
if a page is ever added or removed (faq.html's entry was added by hand when
that page was created — it's not auto-generated).

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
python -m http.server 8000    # then click through all seven pages
```

Manual checklist: one `<h1>` per page, no heading skips, nav `active` matches
the file, no horizontal overflow at 390px, phone number consistent, no invented
facts, no ALP/Marko's references.
