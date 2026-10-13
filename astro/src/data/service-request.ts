// Service request page content + the intake form's options. Page copy is the live service-request.html copy.
// The form itself is ours (replaces the Service Autopilot embed on this branch).
//
// DELIVERY IS NOT CONFIGURED YET. `form.action` is empty on purpose — Jeff picks how submissions reach
// info@spokanestumpgrinder.com (see the "Intake form" note in CLAUDE.md once decided). While it is empty the
// page shows a "delivery not set up" notice and the submit button is disabled, so nothing is silently lost.

export const form = {
  action: '',                 // POST endpoint that emails the submission. Empty = not configured.
  method: 'POST',
  hidden: {} as Record<string, string>, // provider-specific hidden fields (subject, redirect, template…)
  honeypot: 'website',        // hidden anti-bot field name; rename to the provider's expected name if it has one
  nextDefault: 'https://spokanestumpgrinder.com/service-request.html?sent=1',
};

export const hero = {
  eyebrow: 'Request service',
  h1: 'Tell us about your stump',
  lede: "Fill out the form below and we'll get you a written estimate. The more detail you give us, the faster we can put a real number on it — and the better the odds we can price it without a site visit.",
};

export const tips = {
  eyebrow: 'Before you start',
  h2: 'Four things that speed this up',
  lede: 'The form asks for each of these — every one saves a round of back-and-forth.',
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
  diameter: ['Under 12 in', '12–24 in', '24–36 in', 'Over 36 in', 'Not sure'],
  access: ['Open front yard, no gate', 'Gate under 36 in wide', 'Gate 36–48 in wide', 'Gate over 48 in wide', 'Slope, stairs or tight backyard', 'Not sure'],
  after: ['Grass or lawn', 'A new tree or planting bed', 'Concrete, patio, fence post or structure', 'Nothing in particular'],
  nearby: ['Sprinkler heads or irrigation', 'Low-voltage lighting or invisible fence', 'Septic, gas or other buried lines', 'Fence, wall or building within a few feet'],
  contact: ['Text', 'Call', 'Email'],
  heard: ['Google', 'Facebook / Instagram', 'Referral', 'Saw truck / team', 'Other'],
  states: ['WA', 'ID'],
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
