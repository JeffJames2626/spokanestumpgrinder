# Spokane Stump Grinder — Website

Static 9-page marketing site, plus a growing set of blog post pages. No build
step, no dependencies.

## Preview

Double-click `index.html`. That's it — the pages link by relative filename and
work straight from disk.

Optional local server (nicer for testing, needs Python):

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload all nine `.html` files into the same folder on the web host.
`index.html` must be at the top level. **Do not rename any file** — the nav on
every page links to the others by exact filename.

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

Core 9 pages are fully filled in. Two open `class="todo"` markers exist on
`blog-private-locates.html` (a price range and a company-policy detail to
confirm with Jeff) — search the folder for `class="todo"` to find them.

Still missing: a real logo (favicon is a placeholder red circle with tree
rings), and analytics.

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
