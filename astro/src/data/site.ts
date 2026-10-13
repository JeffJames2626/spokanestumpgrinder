// Single source of truth for navigation. Header and Footer both read this, so adding,
// renaming or reordering a page is ONE edit instead of an edit in every one of 17 files.
export interface NavItem {
  href: string;      // keep the existing .html URLs exactly
  icon: string;      // HTML entity, rendered before the label
  label: string;
  className?: string;
}

export const nav: NavItem[] = [
  { href: 'index.html',           icon: '&#8962;', label: 'Home' },
  { href: 'services.html',        icon: '&#9881;', label: 'Services' },
  { href: 'booking.html',         icon: '&#9638;', label: 'Booking', className: 'nav-booking' },
  { href: 'case-studies.html',    icon: '&#9636;', label: 'Case Studies' },
  { href: 'about.html',           icon: '&#8505;', label: 'About' },
  { href: 'faq.html',             icon: '?',       label: 'FAQ' },
  { href: 'blog.html',            icon: '&#9998;', label: 'Blog' },
  { href: 'contact.html',         icon: '&#9993;', label: 'Contact' },
  { href: 'service-request.html', icon: '&#10003;', label: 'Request Service' },
];

export const footerServices: NavItem[] = [
  { href: 'services.html', icon: '&#9881;', label: 'Stump Grinding' },
  { href: 'services.html', icon: '&#9851;', label: 'Stump Removal &amp; Cleanup' },
];

export const footerCompany: NavItem[] = [
  { href: 'about.html',           icon: '&#8505;',  label: 'About Us' },
  { href: 'case-studies.html',    icon: '&#9636;',  label: 'Case Studies' },
  { href: 'booking.html',         icon: '&#9638;',  label: 'Booking' },
  { href: 'faq.html',             icon: '?',        label: 'FAQ' },
  { href: 'blog.html',            icon: '&#9998;',  label: 'Blog' },
  { href: 'contact.html',         icon: '&#9993;',  label: 'Contact' },
  { href: 'service-request.html', icon: '&#10003;', label: 'Request Service' },
];

export const business = {
  name: 'Spokane Stump Grinder',
  phoneDisplay: '509-434-9554',
  phoneHref: '+15094349554',
  email: 'info@spokanestumpgrinder.com',
  street: '1908 E Mallon Ave',
  cityStateZip: 'Spokane, WA 99202',
};
