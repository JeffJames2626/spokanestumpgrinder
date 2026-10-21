// THE blog. Newest first. Adding a post = add ONE entry here (+ its page file).
// Everything below updates automatically: /blog.html cards, the homepage "New" pill and feature card,
// and sitemap.xml. (Today that is hand-editing blog.html, index.html twice, sitemap.xml and CLAUDE.md.)
export interface Post {
  file: string;       // existing .html URL (never changes once published)
  date: string;       // shown on the blog index card
  title: string;
  summary: string;
  lastmod: string;    // sitemap <lastmod>
  changefreq: string;
  priority: string;
  kind?: 'Guide' | 'Case study';   // label on the blog index card
  image?: string;                  // a photo the post itself uses (images/<file>); omit = text card
  imageAlt?: string;
}

export const posts: Post[] = [
  { file: "blog-dull-stump-grinder-teeth.html", date: "October 2026", title: "This Is What a Dull Stump Grinder Tooth Looks Like", summary: "Two photos of the teeth on a stump grinder at a Spokane-area rental counter, what a worn carbide tooth does to a rental day, and the 60-second check to do before you tow one home to Cheney, Airway Heights or anywhere in Spokane County.", lastmod: "2026-10-20", changefreq: "monthly", priority: "0.5", kind: "Guide", image: "rental-grinder-tooth-worn-edge.jpg", imageAlt: "Close-up of a worn stump grinder tooth on a rental machine, carbide tip rounded over and polished" },
  { file: "blog-rent-or-hire.html", date: "October 2026", title: "Rent a Stump Grinder, or Hire It Out?", summary: "Which Spokane-area yards actually rent one, what the day really costs once you add the truck, the trailer, the waiver, and the teeth, what a rental machine can handle, and an honest take on when renting wins.", lastmod: "2026-10-04", changefreq: "monthly", priority: "0.5", kind: "Guide", image: "deer-park-stump-grinder.jpg", imageAlt: "Stump grinder cutting wheel grinding a tree stump below grade in a lawn" },
  { file: "blog-north-spokane-bid-we-didnt-get.html", date: "October 2026", title: "The Bid We Didn't Get: A Stump on a Busy North Spokane Street", summary: "We quoted $1,000 for a big old stump on a busy arterial and the homeowner went another way. What the stump and the street each added to the work, how we priced it, and what to ask when one bid comes in high.", lastmod: "2026-10-04", changefreq: "monthly", priority: "0.5", kind: "Case study", image: "north-spokane-arterial-stump.jpg", imageAlt: "Large old weathered tree stump with a wide exposed root flare, surrounded by a dug-out pit and piles of sand and soil, between two houses in north Spokane, WA" },
  { file: "blog-one-stump-or-three.html", date: "September 2026", title: "Is This One Stump or Three? A Deer Park Stump Grinding Case Study", summary: "We took a tree crew's stump count at face value and got burned. How stumps really get counted and measured, why chasing roots adds up, and how to get an accurate quote.", lastmod: "2026-10-02", changefreq: "monthly", priority: "0.5", kind: "Case study", image: "deer-park-multi-trunk-stump.jpg", imageAlt: "Multi-trunk tree stump with several cut faces sharing one root mass in a lawn, Deer Park, WA" },
  { file: "blog-private-locates.html", date: "August 2026", title: "Private Utility Locates: What They Cost and When You Need One", summary: "811 only covers utility-owned lines. Here's what a private locate covers, when it's worth calling one, and what drives the cost.", lastmod: "2026-08-16", changefreq: "monthly", priority: "0.5", kind: "Guide" },
  { file: "blog-811-locates.html", date: "August 2026", title: "Call 811 Before You Dig: What It Means for Your Stump Job", summary: "Why calling 811 before a stump grinding or removal job matters, what's typically buried in a yard, and how the locate process works.", lastmod: "2026-08-16", changefreq: "monthly", priority: "0.5", kind: "Guide" },
];

// The homepage promotes the newest post (posts[0]) with its own punchier copy and photo.
export const feature = {
  file: posts[0].file,
  pillTag: "New",
  pillText: "What a dull stump grinder tooth looks like, up close",
  image: "images/rental-grinder-tooth-worn-edge.jpg",
  imageWidth: 682,
  imageHeight: 910,
  imageAlt: "Close-up of a worn stump grinder tooth on a rental machine, carbide tip rounded over and polished",
  eyebrow: "Guide · Spokane, Cheney & Airway Heights",
  headline: "This is what a dull stump grinder tooth looks like.",
  summary: "Two photos from a Spokane-area rental yard, what a worn carbide tooth does to a rental day, and the 60-second check to do before you tow one home.",
  cta: "See the photos",
}
