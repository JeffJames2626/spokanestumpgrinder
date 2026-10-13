// Case studies content. Everything here is the live case-studies.html copy, verbatim — titles, places,
// dates, service lines, videos, photos and the four story sections. Nothing added. (CLAUDE.md rule 1.)
// Each Wistia video needs its own media id AND aspect (these are vertical clips = 0.5625).

export interface CaseStudy {
  id: string;          // anchor — '#job-3' is linked from elsewhere; keep ids stable
  num: string;
  title: string;
  place: string;
  date: string;
  service: string;
  video: { mediaId: string; aspect: string };
  before: { file: string; alt: string };
  after: { file: string; alt: string };
  story: { situation: string; challenge: string; work: string; result: string };
}

export const hero = {
  eyebrow: 'Case studies',
  h1: 'Real stumps, real yards',
  lede: "Every stump is a little different. These are jobs from around the Spokane and Coeur d'Alene area — what made each one tricky, and how it came out.",
  primary: { label: 'Request an Estimate', href: 'service-request.html' },
  secondary: { label: 'See our services', href: 'services.html' },
};

export const cases: CaseStudy[] = [
  {
    id: 'job-1', num: '01',
    title: 'Backyard Stump Removal & Lawn Restoration',
    place: 'South Hill, Spokane, WA', date: 'Spring 2024', service: 'Stump Grinding',
    video: { mediaId: '5jxxoifr0e', aspect: '0.5625' },
    before: { file: 'case-study-1-before.jpg', alt: 'Backyard before stump grinding, dead grass patch with the stump remnant near the shed' },
    after: { file: 'case-study-1-after.jpg', alt: 'Same backyard after the job, full green lawn grown in' },
    story: {
      situation: 'This Spokane homeowner wanted to reclaim a backyard that had an old stump taking up usable space. Beyond being an eyesore, the stump made it harder to create the clean, open lawn they had in mind. The goal was straightforward: get the stump out of the way, clean up the area, and leave the yard ready for its next step.',
      challenge: "The stump was located in a residential backyard surrounded by mature trees, fencing, landscaping, and nearby structures. That meant access and control mattered just as much as grinding the stump itself. We needed to work carefully around the existing property while taking the stump down far enough that it wouldn't interfere with the finished yard.",
      work: 'We brought our tracked stump grinder into the backyard and ground the stump below grade, working through the stump and surface root flare rather than simply cutting the visible wood flush with the ground. Once the grinding was complete, the remaining wood debris was cleaned up and the area was prepared so the homeowner could move forward with restoring the lawn.',
      result: 'The stump is gone, the yard is cleaned up, and what had been a dry, uneven backyard is now a green, open lawn that can actually be used. This project is a good example of why stump removal is often about more than getting rid of a piece of wood — removing one obstacle can make it possible to completely reclaim an outdoor space.',
    },
  },
  {
    id: 'job-2', num: '02',
    title: 'Old Backyard Stump Ground Out',
    place: 'South Hill, Spokane, WA', date: 'Summer 2026', service: 'Stump grinding and site cleanup',
    video: { mediaId: 'lbqojfs1qv', aspect: '0.5625' },
    before: { file: 'case-study-2-before.jpg', alt: 'Stump remnant sitting in the lawn before grinding' },
    after: { file: 'case-study-2-after.jpg', alt: 'Same spot after grinding, cleared and freshly watered' },
    story: {
      situation: "This homeowner had an old stump sitting right in the middle of an otherwise healthy backyard lawn. Years of decay had broken down the center, but the remaining wood and roots were still firmly in the ground. It was low enough to disappear into the grass from a distance — exactly the kind of stump that's easy to forget about until you catch it with a mower blade or trip over it. The homeowner wanted it gone so the area could become part of the lawn again.",
      challenge: "Older, partially rotted stumps can be deceptive. The exposed center may look like it's nearly gone, while solid wood and roots remain below the surface and extend into the surrounding turf. Because this stump sat in an established lawn, we also wanted to keep the work area contained and avoid unnecessarily disturbing the surrounding grass.",
      work: "We positioned our tracked stump grinder directly over the old stump and ground the remaining wood and root flare below grade. Instead of stopping once the visible stump disappeared, we worked the entire footprint so there wouldn't be large pieces of wood left immediately beneath the lawn. After grinding, we cleaned up the debris and leveled the disturbed area so it was ready for the homeowner to seed and blend back into the surrounding grass.",
      result: 'What had been a hidden obstacle in the middle of the lawn is now a level, usable patch of ground. The finished area is clean and ready for grass, without a stump sticking up, exposed roots, or a pile of grindings left behind. Once the new grass fills in, there will be little indication the stump was ever there.',
    },
  },
  {
    id: 'job-3', num: '03',
    title: 'Multiple Stump Grinding for a Complete Landscape Transformation',
    place: 'South Hill, Spokane, WA', date: 'June 2025', service: 'Multiple stump grinding and site preparation',
    video: { mediaId: '2ct5pz5jbv', aspect: '0.5625' },
    before: { file: 'case-study-3-before.jpg', alt: 'Cleared building site before the finished landscape work' },
    after: { file: 'case-study-3-after.jpg', alt: 'Same site finished with green lawn and landscaping' },
    story: {
      situation: "This Spokane property was in the middle of a major landscape transformation. Trees had already been removed, but several stumps and remaining root systems were still scattered through the future lawn area. With grading, irrigation, and new grass planned, those stumps couldn't simply be cut flush and covered. They needed to be ground below grade so the landscaping crew had a clean surface to work with.",
      challenge: "This wasn't a single-stump backyard job. The work covered a large portion of the property, with multiple stumps located throughout an active landscape project. The finished grade mattered — any substantial wood left near the surface could interfere with grading, irrigation, or establishing the new lawn. We also had to work around existing landscaping, rock borders, irrigation components, and construction taking place around the home.",
      work: 'We moved through the property systematically, grinding each remaining stump and its surface root flare below the planned finished grade. Because the area was being completely landscaped afterward, we focused on getting the remaining woody material out of the way so the site could be graded and prepared without stumps becoming a problem later. Once the stump grinding was finished, the property was ready for the next stages of soil preparation, irrigation, and landscaping.',
      result: 'The before-and-after difference speaks for itself. What started as a bare construction site with felled trees, exposed soil, and stumps is now a finished Spokane landscape with a broad, uninterrupted lawn, established planting beds, rockwork, and irrigation. There are no leftover stumps breaking up the lawn or getting in the way of mowing — just usable green space where the old trees once stood.',
    },
  },
];

export const storyLabels = [
  { key: 'situation', icon: 'info', title: 'The situation' },
  { key: 'challenge', icon: 'triangle-alert', title: 'The challenge' },
  { key: 'work', icon: 'wrench', title: 'What we did' },
  { key: 'result', icon: 'sparkles', title: 'The result' },
] as const;

export const closing = {
  h2: 'Got one like these?',
  text: "Send us photos and the details and we'll tell you what it takes.",
};
