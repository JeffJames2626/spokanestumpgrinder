// FAQ page content. Questions and answers are the live faq.html copy, verbatim; grouped the same way.
// `a` may contain inline <a> links (rendered with set:html); `plain` feeds the FAQPage JSON-LD.
// No prices (hard rule 2). Payment methods list is the live page's own.

export const hero = {
  eyebrow: 'FAQ',
  h1: 'Questions we get a lot',
  lede: 'Pricing, scheduling, and how the work actually happens — the questions homeowners ask most, answered straight.',
  primary: { label: 'Request an Estimate', href: 'service-request.html' },
  secondary: { label: 'Book an OSC', href: 'booking.html' },
};

export interface Faq { q: string; a: string; plain?: string }
export interface Group { id: string; icon: string; eyebrow: string; h2: string; lede?: string; items: Faq[] }

export const groups: Group[] = [
  {
    id: 'pricing',
    icon: 'ruler',
    eyebrow: 'Pricing & estimates',
    h2: 'What things cost, and why',
    lede: "Stump work is quoted per job, not off a price list. Here's what actually moves the number.",
    items: [
      { q: "Why don't you post flat-rate pricing?", a: 'Two stumps the same width across can be an hour apart in real work. Diameter at grade, root spread, depth needed, and access all move the number, so we look at your actual stump before quoting it.' },
      { q: 'What actually affects the price?', a: 'Diameter at grade, root flare spread, grinding depth, access, nearby obstacles, soil conditions, how many stumps, and the cleanup level you want. Full breakdown is on our <a href="services.html#pricing">Services page</a>.', plain: 'Diameter at grade, root flare spread, grinding depth, access, nearby obstacles, soil conditions, how many stumps, and the cleanup level you want. Full breakdown is on our Services page.' },
      { q: 'Do multiple stumps cost less each?', a: 'Yes. Setup and travel get shared across the visit, so the per-stump cost drops when you get several done at once.' },
      { q: 'Is the on-site consultation (OSC) really free?', a: "Yes — no cost, no obligation. An OSC is us coming out to look at the job in person before anything's written up. You get a written estimate afterward and decide from there." },
    ],
  },
  {
    id: 'the-work',
    icon: 'drill',
    eyebrow: 'The work itself',
    h2: 'What actually happens to your stump',
    lede: 'The mechanics of grinding and removal, in plain terms.',
    items: [
      { q: "What's the difference between grinding and removal?", a: 'Grinding takes the stump below grade and rakes the chips back into the hole. Removal &amp; Cleanup builds on that — we haul the chips off and backfill with clean topsoil instead.', plain: 'Grinding takes the stump below grade and rakes the chips back into the hole. Removal & Cleanup builds on that — we haul the chips off and backfill with clean topsoil instead.' },
      { q: 'How deep do you grind?', a: "Standard depth takes the stump under the surrounding soil line so grass or new roots can go in over it. Pouring concrete or planting a tree in the exact spot? Tell us up front and we'll price it deeper." },
      { q: 'Will grinding get every root out?', a: "No — grinding removes the stump and the root flare, not the entire root system. If you're building or planting right in that spot, mention it and we'll talk through going deeper or a full removal instead." },
      { q: 'Do you protect the yard while you work?', a: 'Plywood tracking over soft turf, shielding around fences, siding, and windows. We also confirm utility locates and probe the area before the wheel turns.' },
    ],
  },
  {
    id: 'scheduling',
    icon: 'calendar-check',
    eyebrow: 'Scheduling & booking',
    h2: 'Booking and what to expect',
    items: [
      { q: 'Do I need to be home for the OSC?', a: "Not usually. As long as we have access to the stump and you're reachable by phone, we can take a look and follow up with your estimate." },
      { q: 'How long does a stump take?', a: "Depends on diameter, root spread, and access. We'll give you a realistic time window with your estimate rather than a generic answer here." },
      { q: 'What about weather?', a: "We work through most Inland Northwest weather. Saturated ground or frozen conditions can push a date — we'll call you, not just no-show." },
      { q: 'Can I change the scope on the day?', a: 'Often yes, but it may affect price and timing. Better to call ahead so we can bring what the change needs.' },
      { q: 'Need to reschedule?', a: 'Use the link in your Google Calendar confirmation, or call or text us. Things happen — just give us as much notice as possible.' },
      { q: 'What payment do you take?', a: "Cash, check, ACH bank transfer, credit card, PayPal, Venmo, or select cryptocurrency — whatever's easiest for you. Payment timing is confirmed along with your written estimate." },
    ],
  },
  {
    id: 'getting-started',
    icon: 'clipboard-check',
    eyebrow: 'Getting started',
    h2: 'Before you reach out',
    lede: 'A little detail up front saves a round of back-and-forth.',
    items: [
      { q: 'What should I include when I request an estimate?', a: "Rough diameter at ground level, how we get to the stump (through a gate? down a slope?), what's going in that spot afterward, and anything buried nearby you know about." },
      { q: 'What happens after I submit a request?', a: 'We review the details, send you scope and price in writing, you pick a date once you approve it, and we grind and clean up on the day.' },
      { q: 'Do I have to book an OSC, or can I just send photos?', a: 'Either works. Send photos and details through the <a href="service-request.html">request form</a>, or grab a free slot on the <a href="booking.html">OSC calendar</a> if you\'d rather we take a look in person.', plain: "Either works. Send photos and details through the request form, or grab a free slot on the OSC calendar if you'd rather we take a look in person." },
    ],
  },
];

export const closing = {
  h2: 'Still have a question?',
  text: "Send us the details and we'll get you a straight answer, no obligation.",
};
