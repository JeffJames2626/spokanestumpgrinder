// Booking page content. Copy is the live booking.html copy, verbatim; prep items were the live table rows.
// The calendar embed and direct link are integrations — see CLAUDE.md "Google Calendar". Do not change them.

export const calendar = {
  // Appointment-schedule embed URL (the short link below CANNOT be iframed).
  embedSrc: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ3Dl20bg0qX3ENa4D2aKHVtvONpk9ahrO8jLHmNbmJBLBapFZIsRN2nm2jLoZY693mm19jywzWl?gv=true',
  directLink: 'https://calendar.app.google/aTdtZTwUYeFVpjR17',
};

export const hero = {
  eyebrow: 'On-site consultation',
  h1: 'Book an On-Site Consultation',
  lede: "Grab a spot on the calendar for a free, no-obligation on-site consultation — we call it an OSC for short. We'll take a look at your stump, talk through access and scope, and follow up with a written estimate — nothing gets scheduled or charged before that.",
  primary: { label: 'Book an OSC', href: calendar.directLink, external: true },
  secondary: { label: 'Send details instead', href: 'service-request.html' },
};

export const steps = [
  { title: 'Book your free OSC', text: 'Grab a slot on the calendar. No cost, no obligation — just a look at the job.' },
  { title: 'We walk the property', text: "We look at the stump, check access, and talk through what it'll actually take." },
  { title: 'Get your written estimate', text: 'Scope and price in writing, usually right after the visit.' },
  { title: 'Schedule the work', text: "Approve the estimate and we'll find you a date that fits the job and the equipment it needs." },
];

export const prep = {
  eyebrow: 'Before we arrive',
  h2: 'How to prep for your OSC',
  lede: 'A few minutes of prep on your end helps us look at the whole job and give you an accurate estimate.',
  items: [
    { icon: 'route', title: 'Clear path to the stump', text: 'Move vehicles, trailers, toys, hoses, and patio furniture off the route from the street to the work area.' },
    { icon: 'door-open', title: 'Gate unlocked', text: 'If the stump is in a fenced yard, we need in. Let us know if a gate panel has to come off.' },
    { icon: 'paw-print', title: 'Pets inside', text: "We'll be walking the property and don't want to startle or spook an animal that isn't expecting a stranger in the yard." },
    { icon: 'droplets', title: 'Sprinkler heads flagged', text: 'If you know where your irrigation runs near the stump, mark it. We probe, but you know your yard better.' },
    { icon: 'zap', title: 'Utility locates', text: 'We confirm public locates are in place. Private lines — gas to a fire pit, low-voltage lighting, invisible fence — only you know about, so tell us.' },
    { icon: 'phone', title: 'Someone reachable', text: "You don't have to be home for the OSC, but we'll need to reach you by phone with questions or your written estimate." },
  ],
};

export const closing = {
  h2: 'Ready to book your OSC?',
  text: "Grab a slot from the calendar, or send us the details first if you'd rather start there.",
};
