/* =============================================================================
 *  ██  PLACEHOLDER CONTENT — REPLACE BEFORE THE SITE GOES LIVE  ██
 * =============================================================================
 *
 *  The reviews below are NOT real customer reviews. No real reviews were
 *  supplied, so this file ships sample copy purely so the section can be
 *  designed, laid out and tested.
 *
 *  DO NOT PUBLISH THIS SITE WITH `REVIEWS_ARE_PLACEHOLDER = true`.
 *
 *  To go live:
 *    1. Replace the entries in `reviews` with real, permission-granted
 *       customer reviews (first name + last initial is the usual convention).
 *    2. Set REVIEWS_ARE_PLACEHOLDER to false.
 *
 *  While the flag is true the build prints a warning and the section renders a
 *  clearly-labelled notice instead of presenting the samples as genuine, so
 *  nothing misleading can be published by accident.
 *
 *  Note on SEO: review/aggregateRating structured data is deliberately NOT
 *  emitted anywhere on this site. Marking up invented reviews violates Google's
 *  structured-data policy and can get the whole site penalised. Once real
 *  reviews exist, the honest route is a Google Business Profile — see README.
 * ===========================================================================*/

export const REVIEWS_ARE_PLACEHOLDER = true;

export interface Review {
  /** Customer name as it should be displayed. */
  name: string;
  /** Whole stars, 1–5. */
  rating: number;
  review: string;
  /** Condensed quote for tight spots (hero rotator) — must read whole, no ellipsis. */
  short?: string;
  /** Optional — the job that was carried out. */
  service?: string;
  /** Optional — where the customer is based. */
  location?: string;
}

export const reviews: Review[] = [
  {
    name: 'Danielle R.',
    rating: 5,
    review:
      'Locked myself out at night with the baby already asleep in the car. Lidor talked me through it on the phone, showed up, and had the door open without a scratch on it.',
    short: 'Locked out at night with the baby asleep in the car. Door open, not a scratch on it.',
    service: 'Emergency Lockout',
    location: 'Thousand Oaks',
  },
  {
    name: 'Marcus T.',
    rating: 5,
    review:
      'Lost the only key to my work van. He cut and programmed a new one on site and I was back on my route the same day. Straightforward and no runaround on the price.',
    short: 'Lost the only key to my work van. Cut and programmed on site, back on my route.',
    service: 'Automotive Key Programming',
    location: 'Van Nuys',
  },
  {
    name: 'Priya S.',
    rating: 5,
    review:
      'We just closed on our house and wanted every lock changed. He rekeyed all five doors to one key and fitted a new deadbolt on the side entry. Clean work, tidy afterwards.',
    short: 'Rekeyed all five doors of our new house to one key. Clean work and tidy afterwards.',
    service: 'Rekeying & Deadbolt Installation',
    location: 'Simi Valley',
  },
  {
    name: 'Jonathan K.',
    rating: 5,
    review:
      'Our storefront lock jammed twenty minutes before opening. He got it working, then came back to fit a proper high-security cylinder. Explained the options without upselling me.',
    short: 'Our storefront lock jammed before opening. Working again in time, no upselling.',
    service: 'Lock Repair & High-Security Locks',
    location: 'Woodland Hills',
  },
  {
    name: 'Elena M.',
    rating: 5,
    review:
      'Key snapped off inside the front door and I assumed the whole lock was ruined. He extracted the broken half, cut me two new keys, and the lock works better than before.',
    short: 'Key snapped inside the front door. He pulled it out and the lock works like new.',
    service: 'Broken Key Extraction',
    location: 'Oxnard',
  },
  {
    name: 'Robert A.',
    rating: 5,
    review:
      'Fitted a keypad lock at the office and set up separate codes for each of the staff. He walked the whole team through it and answered my follow-up question over WhatsApp.',
    short: 'Keypad lock at the office with a separate code per staff member. Easy to use.',
    service: 'Smart Locks & Keyless Entry',
    location: 'Camarillo',
  },
];
