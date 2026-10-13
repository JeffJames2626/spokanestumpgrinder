// Homepage content. Every line here is either copy already live on spokanestumpgrinder.com
// or a fact listed under "Content facts (verified)" in CLAUDE.md. No invented claims, reviews,
// credentials, or prices (hard rules 1 and 2).

export const hero = {
  eyebrow: 'Stump grinding & removal · Spokane & Coeur d’Alene region',
  h1: 'That stump has been there long enough.',
  lede:
    'We grind stumps down below grade and haul the mess out, so you get back a yard you can mow, plant, build on, or just stop tripping over. Written estimates before any work starts.',
  primary: { label: 'Get a Free Estimate', href: 'service-request.html' },
  secondary: { label: 'Book a free on-site look', href: 'booking.html' },
  photoAlt: 'A freshly cut tree stump in a frosty Spokane lawn with the tracked stump grinder behind it',
};

// From the existing hero stats. Each one links to the page that backs it up.
export const proof = [
  { icon: 'file-text', title: 'Written estimates', text: 'Scope and price in writing before we schedule.', href: 'service-request.html' },
  { icon: 'move-vertical', title: 'Ground below grade', text: 'Stump and root flare taken down, not cut flush.', href: 'services.html' },
  { icon: 'sparkles', title: 'Clean job sites', text: 'Blown down and walked with you before we leave.', href: 'case-studies.html#job-3' },
  { icon: 'map-pin', title: '28 communities', text: 'Across Eastern WA and North Idaho.', href: 'about.html#service-area' },
];

export const services = [
  {
    icon: 'drill',
    name: 'Stump Grinding',
    summary:
      'The stump and its surface roots ground down below ground level, chips raked back into the hole and tamped level. Most single stumps are a same-visit job.',
    bullets: [
      'Ground below grade so you can mow and seed over it',
      'Surface root flare taken down, not just the trunk',
      'Grindings backfilled and leveled',
      'Walks and drives blown clean before we pull out',
    ],
    href: 'services.html',
    cta: 'Grinding details',
  },
  {
    icon: 'truck',
    name: 'Stump Removal & Cleanup',
    summary:
      'Everything in grinding, plus we haul the chips off and backfill with clean topsoil. This is the one to pick when something is going in that spot.',
    bullets: [
      'Chips and wood debris hauled away, not left curbside',
      'Larger roots and trunk chunks pulled out',
      'Topsoil backfill, tamped so it won’t sink',
      'Finished level with the surrounding yard',
    ],
    href: 'services.html#removal-cleanup',
    cta: 'Removal details',
  },
];

// Before/after pairs come straight from case-studies.html (real jobs, real photos, existing captions).
export const beforeAfter = [
  {
    title: 'Backyard stump removal & lawn restoration',
    place: 'South Hill, Spokane, WA',
    before: { file: 'case-study-1-before.jpg', alt: 'Backyard before stump grinding, dead grass patch with the stump remnant near the shed' },
    after: { file: 'case-study-1-after.jpg', alt: 'Same backyard after the job, full green lawn grown in' },
    href: 'case-studies.html#job-1',
  },
  {
    title: 'Old backyard stump ground out',
    place: 'South Hill, Spokane, WA',
    before: { file: 'case-study-2-before.jpg', alt: 'Stump remnant sitting in the lawn before grinding' },
    after: { file: 'case-study-2-after.jpg', alt: 'Same spot after grinding, cleared and freshly watered' },
    href: 'case-studies.html#job-2',
  },
  {
    title: 'Multiple stumps for a complete landscape transformation',
    place: 'South Hill, Spokane, WA',
    before: { file: 'case-study-3-before.jpg', alt: 'Cleared building site before the finished landscape work' },
    after: { file: 'case-study-3-after.jpg', alt: 'Same site finished with green lawn and landscaping' },
    href: 'case-studies.html#job-3',
  },
];

export const whyUs = [
  { icon: 'file-text', title: 'You know the price before we start', text: 'Every job gets a written estimate with the scope spelled out. What’s included and what isn’t, in plain language, before anything is scheduled.' },
  { icon: 'shield-check', title: 'We protect the yard we’re working in', text: 'Plywood tracking over soft turf, shielding around siding, fences, and windows. The machine is heavy and we treat your lawn like it matters.' },
  { icon: 'badge-check', title: 'Utilities get checked first', text: 'We confirm locates are in place and probe the work area before the wheel turns. Grinding blind next to a gas or irrigation line is how yards get wrecked.' },
  { icon: 'sparkles', title: 'The site gets cleaned', text: 'Hard surfaces blown down, debris handled per your scope, and a walkthrough with you at the end if you’re home.' },
  { icon: 'message-square', title: 'Straight answers on tricky stumps', text: 'Tight backyard access, stumps against a foundation, rock in the roots — we’ll tell you what it actually takes instead of quoting low and renegotiating on site.' },
  { icon: 'layers', title: 'Multiple stumps cost less each', text: 'Setup and travel get shared across the visit. If you’ve got three or four, get them all done at once.' },
];

export const steps = [
  { title: 'Send us the details', text: 'Fill out the service request with a photo, a rough diameter, and a note about access. Photos save everyone a trip.' },
  { title: 'Get a written estimate', text: 'We put the scope and price in writing before anything is scheduled, so you know exactly what’s included.' },
  { title: 'Pick your date', text: 'Approve the estimate and book a slot that works for you. We confirm before we roll out.' },
  { title: 'We grind and clean up', text: 'Work gets done, the site gets cleaned, and we walk the finished spot with you if you’re home.' },
];

export const pricing = {
  eyebrow: 'Straight talk on pricing',
  h2: 'Why we don’t post a flat rate',
  text: 'Two stumps the same width across can be an hour apart in real work. Diameter at grade, root spread, how deep it needs to go, and whether the machine can even reach the backyard all move the number. We look at your actual stump and put a real price in writing.',
  cta: { label: 'See what drives the price', href: 'services.html' },
};

// Verbatim from faq.html (the live FAQ page).
export const faq = [
  { q: 'Why don’t you post flat-rate pricing?', a: 'Two stumps the same width across can be an hour apart in real work. Diameter at grade, root spread, depth needed, and access all move the number, so we look at your actual stump before quoting it.' },
  { q: 'How deep do you grind?', a: 'Standard depth takes the stump under the surrounding soil line so grass or new roots can go in over it. Pouring concrete or planting a tree in the exact spot? Tell us up front and we’ll price it deeper.' },
  { q: 'Will grinding get every root out?', a: 'No — grinding removes the stump and the root flare, not the entire root system. If you’re building or planting right in that spot, mention it and we’ll talk through going deeper or a full removal instead.' },
  { q: 'Do I have to book an OSC, or can I just send photos?', a: 'Either works. Send photos and details through the request form, or grab a free slot on the OSC calendar if you’d rather we take a look in person.' },
  { q: 'Do multiple stumps cost less each?', a: 'Yes. Setup and travel get shared across the visit, so the per-stump cost drops when you get several done at once.' },
  { q: 'What happens after I submit a request?', a: 'We review the details, send you scope and price in writing, you pick a date once you approve it, and we grind and clean up on the day.' },
];

// The 28 verified communities (CLAUDE.md). Three have their own pages today.
export const towns: { name: string; href?: string }[] = [
  { name: 'Airway Heights, WA', href: 'community-airway-heights.html' }, { name: 'Chattaroy, WA', href: 'community-chattaroy.html' }, { name: 'Cheney, WA', href: 'community-cheney.html' },
  { name: 'Chewelah, WA' }, { name: 'Colbert, WA' }, { name: 'Colville, WA' }, { name: 'Davenport, WA' }, { name: 'Deer Park, WA' }, { name: 'Elk, WA' }, { name: 'Freeman, WA' },
  { name: 'Green Bluff, WA' }, { name: 'Hangman Valley, WA' }, { name: 'Hillyard, WA' }, { name: 'Liberty Lake, WA' }, { name: 'Mead, WA' }, { name: 'Medical Lake, WA' }, { name: 'Newport, WA' },
  { name: 'Nine Mile Falls, WA' }, { name: 'Otis Orchards, WA' }, { name: 'Spokane Valley, WA' }, { name: 'Veradale, WA' },
  { name: 'Coeur d’Alene, ID' }, { name: 'Hayden, ID' }, { name: 'Hayden Lake, ID' }, { name: 'Post Falls, ID' }, { name: 'Priest Lake, ID' }, { name: 'Priest River, ID' }, { name: 'Sandpoint, ID' },
];

export const closing = {
  h2: 'Ready to get that stump out of your yard?',
  text: 'Send us the details and we’ll get you a written estimate. No obligation, no pressure.',
};
