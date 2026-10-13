// Services page content. Copy is the live services.html copy, lightly reorganized; facts per CLAUDE.md.
// No prices (hard rule 2). Photos/videos are the real assets already on the page.

export const hero = {
  eyebrow: 'Our services',
  h1: 'Stumps gone. Yard back.',
  lede:
    "We do two things and we do them well: grind stumps down below grade, and haul the mess out so you're left with usable ground instead of a crater full of chips. Serving Spokane and the surrounding area.",
  primary: { label: 'Request an Estimate', href: 'service-request.html' },
  secondary: { label: 'Check availability', href: 'booking.html' },
};

export interface Service {
  id: string;             // anchor — '#removal-cleanup' is linked from 10 places site-wide; keep it
  icon: string;
  name: string;
  tagline: string;
  lede: string;
  included: { title: string; text: string }[];
  goodFit: { title: string; text: string }[];
  photos: { file: string; alt: string; caption: string }[];
  cta: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: 'grinding',
    icon: 'drill',
    name: 'Stump Grinding',
    tagline: 'Grind it down, level it off, walk away with a flat yard.',
    lede:
      'Our grinder chews the stump and the surface roots down below ground level so you can mow over the spot, plant grass, or just stop looking at it. Most single stumps are a same-visit job.',
    included: [
      { title: 'Utility-safe setup', text: 'We confirm locates are in place and probe the work area before the wheel turns.' },
      { title: 'Grinding below grade', text: 'Standard depth takes the stump under the surrounding soil line so turf and roots can be planted over it.' },
      { title: 'Surface root flare', text: 'The visible roots running out from the base get ground down too, not just the trunk.' },
      { title: 'Chip backfill', text: 'Grindings are raked back into the hole and tamped level unless you want them removed.' },
      { title: 'Property protection', text: 'Plywood tracking over soft turf, and shielding around siding, fences, and windows.' },
      { title: 'Blow-down cleanup', text: 'Walks, drives, and patios cleared before we pull out.' },
    ],
    goodFit: [
      { title: "You're replanting grass", text: 'Grinding below grade leaves you room for topsoil and seed or sod over the spot.' },
      { title: 'The stump is a trip or mower hazard', text: 'Common with stumps left mid-lawn by a previous owner or a storm removal.' },
      { title: "You've got several stumps at once", text: "Multiple stumps on one visit share the mobilization, so they're cheaper per stump than one-offs." },
    ],
    // A true before/after pair from the same yard (case study 1), rather than the live page's mixed pair.
    photos: [
      { file: 'case-study-1-before.jpg', alt: 'Backyard before stump grinding, dead grass patch with the stump remnant near the shed', caption: 'Before' },
      { file: 'case-study-1-after.jpg', alt: 'Same backyard after the job, full green lawn grown in', caption: 'After' },
    ],
    cta: { label: 'Get grinding priced', href: 'service-request.html' },
  },
  {
    id: 'removal-cleanup',
    icon: 'truck',
    name: 'Stump Removal & Cleanup',
    tagline: "Chips hauled off, hole backfilled, ground ready for whatever's next.",
    lede:
      'Grinding one stump generates a surprising pile of chips — often several times the volume of the stump itself. Removal and cleanup is the option where we take that material with us and leave you clean, compacted soil instead.',
    included: [
      { title: 'Everything in stump grinding', text: "This builds on the grinding service, it doesn't replace it." },
      { title: 'Chip and debris haul-off', text: 'Grindings loaded out and disposed of, not piled at the curb.' },
      { title: 'Root and wood removal', text: 'Larger surface roots and trunk chunks pulled rather than left buried.' },
      { title: 'Topsoil backfill', text: "The void filled with clean soil and tamped so it doesn't sink over the next season." },
      { title: 'Grade match', text: 'Finished level with the surrounding yard, ready for seed, sod, or a new planting.' },
      { title: 'Final walkthrough', text: 'We look at the finished spot with you before we leave.' },
    ],
    goodFit: [
      { title: "You're building on the spot", text: 'Patios, sheds, fence posts, and footings need soil, not a bed of wood chips that will decompose and settle.' },
      { title: "You're planting a replacement tree", text: 'New roots do better in clean backfill than in a pocket of decaying grindings.' },
      { title: 'You want the yard finished, not just cleared', text: 'No leftover chip pile for you to deal with on a weekend.' },
    ],
    photos: [
      { file: 'services-chip-pile-haul-off.jpg', alt: 'Chip pile with the stump grinder and crew working in the background', caption: 'Chips loaded out' },
      { file: 'services-topsoil-backfill-graded.jpg', alt: 'Ground leveled and graded after stump removal, ready for topsoil', caption: 'Backfilled and graded' },
    ],
    cta: { label: 'Get removal priced', href: 'service-request.html' },
  },
];

// Grinding vs removal at a glance (derived from the two "What's included" lists above).
export const compare = {
  rows: [
    { item: 'Utility locates confirmed, area probed', grinding: true, removal: true },
    { item: 'Stump + root flare ground below grade', grinding: true, removal: true },
    { item: 'Yard protection, blow-down cleanup', grinding: true, removal: true },
    { item: 'Chips raked back into the hole', grinding: true, removal: false },
    { item: 'Chips and debris hauled away', grinding: false, removal: true },
    { item: 'Larger roots and trunk chunks pulled', grinding: false, removal: true },
    { item: 'Topsoil backfill, tamped and grade-matched', grinding: false, removal: true },
    { item: 'Final walkthrough of the finished spot', grinding: false, removal: true },
  ],
};

export const factors = {
  eyebrow: 'What drives the price',
  h2: "Every stump prices differently — here's why",
  lede: "We don't quote stump work off a flat rate, because two stumps the same width can be an hour apart in real work. These are the things we look at when we put a number on your job.",
  items: [
    { icon: 'ruler', title: 'Diameter at grade', text: "Measured across the widest point of the stump at ground level, not the tree's old trunk size. This is the single biggest factor." },
    { icon: 'trees', title: 'Root flare spread', text: 'Some species throw wide surface roots that add several feet of grinding beyond the stump itself.' },
    { icon: 'move-vertical', title: 'Grinding depth', text: 'Standard below-grade depth costs less than the deeper cut needed for concrete, footings, or a replacement tree.' },
    { icon: 'truck', title: 'Access', text: 'Gate width, slope, stairs, and how far the machine has to travel from the truck. Tight backyard access takes a smaller machine and more time.' },
    { icon: 'shield-check', title: 'Obstacles nearby', text: 'Fences, sprinkler heads, utilities, retaining walls, and buried lines all mean slower, more careful work.' },
    { icon: 'layers', title: 'Soil and debris in the stump', text: 'Stumps with rock, embedded gravel, or old fill packed into the roots are hard on teeth and slow to cut.' },
    { icon: 'hammer', title: 'Stump count', text: 'Several stumps on one visit spread the setup and travel across the job, lowering the per-stump cost.' },
    { icon: 'sparkles', title: 'Cleanup level', text: 'Chips raked back in is the base. Haul-off, topsoil backfill, and grade matching add material and disposal.' },
  ],
  cta: { label: 'Get your stump priced', href: 'service-request.html' },
};

export const steps = [
  { title: 'Send us the details', text: 'Fill out the service request with a photo, a rough diameter, and a note about access. Photos save everyone a trip.' },
  { title: 'Get a written estimate', text: 'We put the scope and price in writing before anything is scheduled, so you know exactly what’s included.' },
  { title: 'Pick your date', text: 'Approve the estimate and book a slot that works for you. We confirm before we roll out.' },
  { title: 'We grind and clean up', text: 'Work gets done, the site gets cleaned, and we walk the finished spot with you if you’re home.' },
];

export const videos = {
  big: { mediaId: '1ney7dzfis', aspect: '0.5625', eyebrow: 'Watch', h2: 'Our biggest machine at work', text: 'A short clip of the machine we bring out for the toughest stumps.' },
  grinder: { mediaId: '1b5nf9f3r8', aspect: '0.5625' },
};
