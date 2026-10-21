// Service request page content + the intake form's options. Page copy is the live service-request.html copy.
//
// DELIVERY (see CLAUDE.md "Intake form"): the form's JS posts JSON to `api` (api/lead.js on Vercel), which
// creates the lead in Homeworks and sends two emails (alert to Jeff, thank-you to the customer), then the
// browser lands on thank-you.html. If the API fails — or JS is off — the form posts natively to FormSubmit
// (`action`), which emails info@ (cc jeff@) and redirects to `_next`. Nothing is lost either way.

export const form = {
  api: '/api/lead',
  action: 'https://formsubmit.co/779a635b69e3b6c853c44bea7f0760f9', // FormSubmit alias for info@spokanestumpgrinder.com
  method: 'POST',
  hidden: {
    _subject: 'New estimate request — spokanestumpgrinder.com',
    _template: 'table',
    _captcha: 'false',
    _cc: 'jeff@spokanestumpgrinder.com',
  } as Record<string, string>,
  honeypot: '_honey',
  nextDefault: 'https://www.spokanestumpgrinder.com/thank-you.html',
  // Google Maps Platform browser key (Places API (New) enabled, restricted to the site's domains). Baked into the
  // page at build time from the PUBLIC_GOOGLE_MAPS_KEY env var; empty = plain address box, no suggestions.
  mapsKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY || '',
};

export const hero = {
  eyebrow: 'Request service',
  h1: 'Tell us about your stump',
  lede: "Fill out the form below and we'll get you a written estimate. The more detail you give us, the faster we can put a real number on it — and the better the odds we can price it without a site visit.",
};

export const tips = {
  eyebrow: 'Before you start',
  h2: 'Four things that speed this up',
  lede: 'Drop these in the notes box — every one saves a round of back-and-forth.',
  items: [
    { icon: 'ruler', title: 'Diameter at ground level', text: 'Rough inches across the widest point at grade — not the old trunk size. An estimate is fine.' },
    { icon: 'door-open', title: 'How we get to it', text: "Front yard, through a gate, or down a slope. If it's a gate, measure the opening — that decides which machine we bring." },
    { icon: 'sprout', title: "What's going in that spot", text: 'Grass, concrete, a fence post, or a new tree. This changes how deep we need to go.' },
    { icon: 'zap', title: 'Anything buried nearby', text: 'Sprinkler heads, low-voltage lighting, invisible fence, septic. We probe, but you know your yard.' },
  ],
};

export const options = {
  service: [
    { value: 'Stump grinding (chips left on site)', label: 'Stump grinding', help: 'Ground below grade, chips raked back into the hole.' },
    { value: 'Stump removal & cleanup (haul-off + topsoil)', label: 'Removal & cleanup', help: 'Grinding plus chips hauled off and clean topsoil backfilled.' },
    { value: 'Not sure — help me decide', label: 'Not sure yet', help: "Tell us what's going in the spot and we'll recommend one." },
  ],
  notesPlaceholder: 'Roughly how many stumps and how wide at the ground, how we get to it (gate? slope?), and anything buried nearby.',
};

export const talk = {
  eyebrow: 'Rather talk it through?',
  h2: 'Call or text us instead',
  text: "Some stumps are easier to describe out loud. Text us a photo and we'll go from there.",
  note: "Serving Spokane, WA and the Coeur d'Alene region",
};

export const after = {
  eyebrow: 'What happens next',
  h2: 'After you hit submit',
  steps: [
    { title: 'We review the details', text: 'If your notes cover the size and access, we can often price the job without coming out.' },
    { title: 'You get it in writing', text: "Scope and price, spelled out. What's included and what isn't, before anything is scheduled." },
    { title: 'You pick a date', text: "Approve the estimate and we'll find you a slot that fits the job and the equipment it needs." },
    { title: 'We grind and clean up', text: "Work gets done, the site gets cleaned, and we walk the finished spot with you if you're home." },
  ],
};

// thank-you.html — where the customer lands after sending, and what the thank-you email links to.
export const thankYou = {
  eyebrow: 'Request received',
  h1: "Thanks — we've got it.",
  lede: "Your request is in. We'll look over the details and any photos, and follow up with a written estimate. No obligation, no pressure.",
  emailNote: "We've also sent a copy of what you submitted to the email address you gave us.",
  whileYouWait: {
    eyebrow: 'While you wait',
    h2: 'A few things that help',
    items: [
      { icon: 'camera', title: 'More photos always help', text: 'One from a few feet back showing the path in, one close-up with something for scale. Text them to us any time.' },
      { icon: 'ruler', title: 'Measure at the ground', text: 'Across the widest point at grade, root flare included — not the cut on top.' },
      { icon: 'door-open', title: 'Check the gate', text: 'A tracked machine is about 35 inches wide. If your gate is tighter than 36, tell us.' },
      { icon: 'zap', title: '811 is on us', text: 'We file the utility locate as part of scheduling. Private lines — sprinklers, lighting, invisible fence — are the ones to tell us about.' },
    ],
  },
  faster: {
    h2: 'Need it sooner?',
    text: "Call or text and we'll pick it up from there.",
  },
  links: [
    { href: 'booking.html', label: 'Book a free on-site visit', icon: 'calendar-check' },
    { href: 'services.html#pricing', label: 'What moves the price', icon: 'ruler' },
    { href: 'faq.html', label: 'Common questions', icon: 'message-circle' },
  ],
};
