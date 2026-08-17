# Spokane Stump Grinder — Website

Static 8-page marketing site. No build step, no dependencies.

## Preview

Double-click `index.html`. That's it — the pages link by relative filename and
work straight from disk.

Optional local server (nicer for testing, needs Python):

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Deploy

Upload all eight `.html` files into the same folder on the web host.
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
| `contact.html` | Contact — call/text/email, request form, map |
| `service-request.html` | Request form (Service Autopilot) |

## Status

All content is filled in — zero `class="todo"` markers left anywhere on the
site (search the folder for `class="todo"` to confirm; should return
nothing).

Still missing: a real logo (favicon is a placeholder red circle with tree
rings), and analytics.

## Changing the phone number

Find and replace **both** across all eight files:

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
