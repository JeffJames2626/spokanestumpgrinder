// Contact page content. Copy is the live contact.html copy, verbatim. Address/phone/email come from site.ts.
// The Google Maps embed src and the directions link are integrations — do not change them.

export const map = {
  embedSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d21494.43968369514!2d-117.3950103810845!3d47.66878523117889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549e190660699b21%3A0x6eaa9fed67721e4a!2sSpokane%20Stump%20Grinder!5e0!3m2!1sen!2sus!4v1786907828703!5m2!1sen!2sus',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=1908+E+Mallon+Ave%2C+Spokane%2C+WA+99202',
};

export const hero = {
  eyebrow: 'Contact',
  h1: 'Get in touch',
  lede: "Call, text, email, or send us the details through the form — whatever's easiest. We're straightforward to reach and quick to respond.",
  primary: { label: 'Request an Estimate', href: 'service-request.html' },
  secondary: { label: 'Book an OSC', href: 'booking.html' },
};

export const reach = {
  eyebrow: 'Reach us directly',
  h2: 'Three ways to get ahold of us',
  lede: "Pick whichever's easiest — we watch all three.",
  ways: [
    { icon: 'phone', title: 'Call or text', text: 'Fastest way to reach us for a quick question or a straight answer.', kind: 'phone' as const },
    { icon: 'mail', title: 'Email', text: 'Good for sending photos, details, or anything easier to explain in writing.', kind: 'email' as const },
    { icon: 'file-text', title: 'Request form', text: "Give us the specifics up front and we'll follow up with a written estimate.", kind: 'form' as const, label: 'Send details', href: 'service-request.html' },
  ],
};

export const location = {
  eyebrow: "Where we're based",
  h2: "Serving Spokane & the Coeur d'Alene region",
  lede: 'Based in Spokane and covering communities across Eastern Washington and North Idaho.',
  townsLink: { label: 'See the full list of towns we serve', href: 'about.html#service-area' },
};

export const closing = {
  h2: 'Ready to talk about your stump?',
  text: "Send us the details and we'll get you a written estimate. No obligation, no pressure.",
};
