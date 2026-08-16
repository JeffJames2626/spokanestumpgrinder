# Spokane Stump Grinder — Website

Static 6-page marketing site. No build step, no dependencies.

## Preview

Double-click `index.html`. That's it — the pages link by relative filename and
work straight from disk.

Optional local server (nicer for testing, needs Python):

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload all six `.html` files into the same folder on the web host.
`index.html` must be at the top level. **Do not rename any file** — the nav on
every page links to the others by exact filename.

## Files

| File | Page |
|---|---|
| `index.html` | Homepage |
| `services.html` | Stump grinding + removal/cleanup |
| `booking.html` | Booking / Google Calendar |
| `case-studies.html` | Case studies (3 templates) |
| `about.html` | About us |
| `service-request.html` | Request form (Service Autopilot) |

## Unfinished

Anything not filled in is marked in yellow on the page. Search for
`class="todo"` — 36 markers across `case-studies.html` (24), `about.html` (9),
and `booking.html` (3). Grey dashed boxes are photo/video placeholders.

Also missing: a real logo (favicon is a placeholder gold circle with tree
rings), real photography, and analytics.

## Changing the phone number

Find and replace **both** across all six files:

```
509-434-9554     the visible number
+15094349554     inside tel: links
```

## Notes

`CLAUDE.md` holds the full project context — architecture rules, design tokens,
integration details, and the five defects fixed in the Service Autopilot form.
Read it before making changes.

The form and calendar load from the internet. Offline, those two areas render
blank — expected, not a fault.
