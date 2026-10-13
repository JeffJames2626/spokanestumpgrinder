// About page content. Copy is the live about.html copy, lightly reorganized; facts per CLAUDE.md.
// Nothing here is new information — every number, name and credential was already on the live page.

export const hero = {
  eyebrow: 'About us',
  h1: 'Spokane locals. Straight answers.',
  lede:
    "Born and raised in Spokane, Jeff brings more than 14 years of hands-on and management experience in home services, including four years as a business owner. The Spokane and Coeur d'Alene region is home, and stump work is what this side of the business does.",
  primary: { label: 'Request an Estimate', href: 'service-request.html' },
  secondary: { label: 'See our services', href: 'services.html' },
  portrait: { file: 'jeff-james-headshot.png', alt: 'Jeff James, owner of Spokane Stump Grinder' },
};

// Quick facts strip — each one is stated in the live copy or in CLAUDE.md.
export const facts = [
  { icon: 'map-pin', value: 'Spokane', label: 'Born and raised here' },
  { icon: 'history', value: '14+ yrs', label: 'In home services' },
  { icon: 'calendar', value: '2023', label: 'Serving the area since' },
  { icon: 'compass', value: '28', label: 'Communities covered' },
];

export const story = {
  eyebrow: 'Our story',
  h2: 'Built on years of doing the work',
  lead: "Spokane Stump Grinder might be a newer name, but the experience behind it isn't.",
  paragraphs: [
    'Jeff grew up in Spokane and has spent most of his working life taking care of properties here. He started behind a mower at 13 and eventually helped build a local property maintenance company from one truck into a 30-person operation. After years of managing crews, customers, equipment, and everything that comes with a growing service business, he wanted to get back to something simpler.',
    'Stump grinding was a natural fit.',
    "It's a specific problem with a clear result. The stump is either gone or it isn't. The yard is either treated carefully or it isn't. And when the job is finished, the customer should know exactly what they paid for and shouldn't be left cleaning up after us.",
    'So we built Spokane Stump Grinder around that idea: specialize in one thing, invest in the right equipment, communicate clearly, and do the work properly.',
    "We're local, we know the properties and neighborhoods around Spokane and North Idaho, and we're building this business for the long haul.",
    'No big promises. Just good work, straight answers, and one less stump in your yard.',
  ],
  photo: { file: 'about-stump-profile.jpg', alt: 'Freshly cut stump with the grinder in the background' },
  quote: { text: 'Do good work. Be straight with people. Leave things better than you found them.', cite: "how we've run things from day one" },
};

export const pillars = {
  eyebrow: 'What we stand on',
  h2: "Three things we don't bend on",
  items: [
    { icon: 'eye', title: 'Transparency', text: "No hidden fees and no unknowns going into your project. You get the scope and the price in writing, and that's the number." },
    { icon: 'lightbulb', title: 'Innovation', text: "We keep looking for better ways to do the work — the right machine for the access, the right technique for the soil we're in." },
    { icon: 'badge-check', title: 'Professionalism', text: 'Uniformed crew, safety and environmental standards followed, and follow-up after the job to make sure the result held up.' },
  ],
};

export const how = {
  eyebrow: 'How we work',
  h2: 'Look first, then grind',
  lede: 'Our approach on every property has always been the same: find the cause, fix it for good. On stump work that means looking at the actual stump before quoting it.',
  items: [
    { icon: 'search', title: 'We diagnose before we quote', text: "Diameter at grade, root spread, what's buried nearby, and how the machine gets in. Guessing at those is how a job goes sideways halfway through." },
    { icon: 'target', title: 'The plan fits your property and budget', text: "Grind it and leave the chips, or haul everything and backfill with topsoil. We'll tell you which one your project actually needs." },
    { icon: 'shield-check', title: 'We prevent the return problem', text: "Grinding deep enough for what's going in that spot, and backfilling so the ground doesn't sink on you next season." },
    { icon: 'message-circle', title: 'We follow up', text: "A walkthrough at the end if you're home, and a check-in after to make sure the finished grade settled the way it should." },
    { icon: 'snowflake', title: 'We know the seasons here', text: "Inland Northwest soil, frost timing, and what a basalt shelf under a stump feels like. Local isn't a marketing word for us." },
    { icon: 'handshake', title: 'We do what we said', text: "If something on site genuinely changes the job, we stop and call you. You won't get a surprise invoice at the end." },
  ],
};

export const team = {
  eyebrow: "Who you'll deal with",
  h2: 'The people on your property',
  members: [
    {
      name: 'Jeff James',
      role: 'Owner',
      photo: { file: 'jeff-james-headshot.png', alt: 'Jeff James, owner of Spokane Stump Grinder' },
      paragraphs: [
        'Jeff is a Spokane native and the owner of Spokane Stump Grinder. He handles the estimates and oversees the work, so the person you talk to is the person accountable for the job.',
        "He's spent more than 14 years in the property service business and knows what it takes to do good work without making things complicated.",
      ],
    },
  ],
};

// Credentials exactly as published on the live page. Do not edit these values without Jeff.
export const credentials = {
  eyebrow: 'The paperwork',
  h2: 'Licensed, bonded, insured',
  lede: 'Homeowners ask about this before letting a machine into the backyard, and they should.',
  rows: [
    { icon: 'building-2', label: 'Business name', value: 'Spokane Stump Grinder' },
    { icon: 'file-badge', label: 'WA contractor license #', value: 'MARKOS*778D8' },
    { icon: 'id-card', label: 'UBI number', value: '601-939-576' },
    { icon: 'calendar', label: 'Serving the area since', value: '2023' },
  ],
  note: 'Certificate of insurance available on request.',
};

export const closing = {
  h2: "Let's take a look at your stump",
  text: 'Send photos and details, get a written estimate back. Simple as that.',
};
