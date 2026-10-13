# Spokane Stump Grinder — Website

Marketing site for Spokane Stump Grinder. **The live site is built from `astro/`**
(Astro, static output) — see `astro/README.md`. The root-level `*.html` files are
frozen legacy copies kept until every page is migrated; they are not served.

## Preview

Double-click `index.html`. That's it — the pages link by relative filename and
work straight from disk.

Optional local server (nicer for testing, needs Python):

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Push to `main`. Vercel runs the build defined in `vercel.json`
(`cd astro && npm ci && npm run build`) and serves `astro/dist`. URLs stay
`name.html`; **do not rename pages** — links use exact filenames.

## Files

| File | Page |
|---|---|
| `index.html` | Homepage |
| `services.html` | Stump grinding + removal/cleanup |
| `booking.html` | Booking / free consultation / Google Calendar |
| `case-studies.html` | Case studies (3 real jobs) |
| `about.html` | About us |
| `faq.html` | FAQ — pricing, the work, scheduling, getting started |
| `blog.html` | Blog index — links to each post below |
| `blog-811-locates.html` | Blog post — calling 811 before stump work |
| `blog-private-locates.html` | Blog post — private locates, what they cost |
| `contact.html` | Contact — call/text/email, request form, map |
| `service-request.html` | Request form (Service Autopilot) |

## Status

All content is filled in — zero `class="todo"` markers left anywhere on the
site (search the folder for `class="todo"` to confirm; should return
nothing).

Still missing: analytics. The real logo is in (header mark + favicon).

## Changing the phone number

Find and replace **both** across all nine files:

```
509-434-9554     the visible number
+15094349554     inside tel: links
```

## Notes

`CLAUDE.md` holds the full project context — architecture rules, design tokens,
and integration details (including the Service Autopilot form's history).
Read it before making changes.

The form and calendar load from the internet. Offline, those two areas render
blank — expected, not a fault.
