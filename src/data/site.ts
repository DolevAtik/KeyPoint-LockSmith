/**
 * Single source of truth for every piece of business information on the site.
 *
 * Nothing here is invented — it is exactly what the owner supplied. Deliberately
 * ABSENT (and which must not be added without the owner's confirmation):
 * licence numbers, years in business, certifications, opening hours, response
 * time promises, star ratings, guarantees and a street address.
 */

export const site = {
  name: 'KeyPoint Locksmith',
  owner: 'Lidor Menashe',

  /** Human-readable form, used everywhere the number is displayed. */
  phoneDisplay: '+1 747-354-8313',
  /** E.164 — used for tel: links and structured data. */
  phoneE164: '+17473548313',
  /** Digits only, as required by wa.me. */
  whatsappNumber: '17473548313',

  email: 'MenasheLidor@gmail.com',

  /**
   * TODO(owner): paste the full Instagram profile URL here, e.g.
   * 'https://www.instagram.com/your-handle/'.
   * While this is empty every Instagram link on the site is hidden rather than
   * pointing at a guessed profile.
   */
  instagram: '',

  /**
   * TODO(owner): once a Google Business Profile exists, paste its review link
   * here (e.g. 'https://g.page/r/…/review'). The reviews section then shows a
   * "Read our Google reviews" button; while empty, the button is hidden.
   */
  googleReviewUrl: '',

  /** Update to the live domain before launch (also set in astro.config.mjs). */
  url: 'https://keypointlocksmith.com',

  seo: {
    title: 'KeyPoint Locksmith | Emergency Locksmith — Ventura County & Los Angeles',
    description:
      'KeyPoint Locksmith provides residential, commercial and automotive locksmith services across Ventura County, the San Fernando Valley and the greater Los Angeles area. Call or WhatsApp +1 747-354-8313.',
  },
} as const;

export const telHref = `tel:${site.phoneE164}`;
export const mailHref = `mailto:${site.email}`;

/** Builds a WhatsApp click-to-chat link, optionally pre-filling the message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default opener so the customer does not have to type while locked out. */
export const WA_DEFAULT_MESSAGE =
  "Hi KeyPoint Locksmith, I need locksmith help. Here's my situation:";

export const WA_EMERGENCY_MESSAGE =
  "Hi KeyPoint Locksmith, I'm locked out and need urgent help. My location is:";

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Service Areas', href: '#service-areas' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
] as const;
