/**
 * Icon geometry, shared by IconSprite.astro (which emits one <symbol> per icon)
 * and Icon.astro (which renders a <use> reference).
 *
 * Every glyph is drawn on a 24x24 grid. Presentation attributes — fill, stroke,
 * stroke-width, linecap, linejoin — live on the referencing <svg> rather than
 * here, because all of them inherit into <use> content. That keeps each usage
 * site to a couple of dozen bytes instead of a full copy of the path data.
 */

/** Glyphs drawn as solid shapes rather than strokes. */
export const FILLED_ICONS = new Set(['star', 'whatsapp', 'pause', 'play']);

export const iconPaths: Record<string, string> = {
  // ---- Services -----------------------------------------------------------
  'lock-open': `<rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 7.7-1.5"/><circle cx="12" cy="15.5" r="1.3"/>`,
  'car-key': `<rect x="3.5" y="7" width="9" height="12" rx="4"/><circle cx="8" cy="11" r="1.2"/><path d="M8 14v3"/><path d="M16 9.5a4.5 4.5 0 0 1 0 7"/><path d="M19 6.5a8.5 8.5 0 0 1 0 13"/>`,
  rekey: `<circle cx="8.5" cy="15.5" r="3.2"/><path d="m10.8 13.2 6.4-6.4"/><path d="m15 9 2 2"/><path d="M13.5 3.6a7 7 0 0 1 6.9 6.9"/><path d="M20.4 7.2v3.4H17"/>`,
  'key-cut': `<rect x="9" y="3" width="12" height="12" rx="2.5"/><path d="M15 18v1.5A1.5 1.5 0 0 1 13.5 21h-9A1.5 1.5 0 0 1 3 19.5v-9A1.5 1.5 0 0 1 4.5 9H6"/><circle cx="13" cy="11" r="2"/><path d="m14.5 9.6 3.9-3.9"/><path d="m16.9 7.2 1.4 1.4"/>`,
  'lock-install': `<rect x="2.5" y="2.5" width="11" height="19" rx="1.5"/><circle cx="10.5" cy="12" r="1"/><rect x="14.5" y="13" width="7" height="6" rx="1.5"/><path d="M16.3 13v-1.6a1.7 1.7 0 0 1 3.4 0V13"/>`,
  wrench: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/>`,
  'broken-key': `<circle cx="6.5" cy="16.5" r="3"/><path d="m8.6 14.4 2.6-2.6"/><path d="m13.4 9.6 1.4-1.4"/><path d="m16.6 6.4 2.4-2.4"/><path d="m15.4 8.6 1.8 1.8"/>`,
  'master-key': `<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5v3.5"/><path d="M5.5 14.5V13a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1.5"/><path d="M12 11v3.5"/><rect x="3" y="14.5" width="5" height="4.5" rx="1.2"/><rect x="9.5" y="14.5" width="5" height="4.5" rx="1.2"/><rect x="16" y="14.5" width="5" height="4.5" rx="1.2"/>`,
  'shield-lock': `<path d="M12 2.5 4.5 5.4v5.9c0 4.6 3.1 8.6 7.5 10.2 4.4-1.6 7.5-5.6 7.5-10.2V5.4z"/><rect x="9.4" y="11.2" width="5.2" height="4.6" rx="1.1"/><path d="M10.6 11.2V9.9a1.4 1.4 0 0 1 2.8 0v1.3"/>`,
  'smart-lock': `<rect x="3" y="10.5" width="12" height="10.5" rx="2.5"/><path d="M6.2 10.5V7a2.8 2.8 0 0 1 5.6 0v3.5"/><circle cx="9" cy="15.6" r="1.2"/><path d="M17.6 6.6a4.2 4.2 0 0 1 0 5.9"/><path d="M20.3 3.9a8 8 0 0 1 0 11.3"/>`,
  safe: `<rect x="2.5" y="3.5" width="19" height="16" rx="2"/><circle cx="9.8" cy="11.5" r="4"/><path d="M9.8 9v2.5"/><path d="M16.5 8v7"/><path d="M5.5 19.5V21"/><path d="M18.5 19.5V21"/>`,
  'access-control': `<rect x="6" y="2.5" width="12" height="19" rx="2"/><rect x="8.8" y="5.8" width="6.4" height="4.2" rx="1"/><circle cx="12" cy="14.6" r="1.3"/><path d="M9.5 18.4h5"/>`,
  'key-fob': `<rect x="7" y="2.5" width="10" height="19" rx="3.5"/><rect x="9.6" y="5.6" width="4.8" height="2.8" rx="1"/><circle cx="12" cy="12.8" r="1.2"/><circle cx="12" cy="17.2" r="1.2"/>`,
  rfid: `<rect x="2.5" y="6" width="13" height="12" rx="2"/><circle cx="7" cy="12" r="1.6"/><path d="M18 9.2a4.4 4.4 0 0 1 0 5.6"/><path d="M20.8 6.6a8.2 8.2 0 0 1 0 10.8"/>`,
  deadbolt: `<circle cx="12" cy="12" r="8.5"/><rect x="10.6" y="6.4" width="2.8" height="7.2" rx="1.4"/><path d="M12 16.6v1.6"/>`,
  ignition: `<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v2.8"/><circle cx="12" cy="12" r="2.4"/><path d="M12 14.4v4.4"/><path d="M12 17h2.2"/>`,
  keyless: `<rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><circle cx="9.2" cy="8" r="1.05"/><circle cx="14.8" cy="8" r="1.05"/><circle cx="9.2" cy="12.4" r="1.05"/><circle cx="14.8" cy="12.4" r="1.05"/><circle cx="9.2" cy="16.8" r="1.05"/><circle cx="14.8" cy="16.8" r="1.05"/>`,
  mailbox: `<path d="M2.5 12a4.5 4.5 0 0 1 9 0v7h-9z"/><path d="M11.5 19H20a1 1 0 0 0 1-1v-6a4.5 4.5 0 0 0-4.5-4.5H7"/><path d="M5.5 12h3"/><path d="M17.5 7.5V4h-3.2"/>`,
  garage: `<path d="M2.5 10 12 4.2 21.5 10"/><path d="M4.5 21V10.6h15V21"/><path d="M8 13.8h8"/><path d="M8 17.2h8"/><path d="M3 21h18"/>`,
  'key-machine': `<circle cx="7" cy="15.5" r="3"/><path d="m9.1 13.4 5.6-5.6"/><path d="m13.2 9.3 1.8 1.8"/><circle cx="17.8" cy="5.4" r="2.6"/><path d="M17.8 1.2v1.1"/><path d="M17.8 8.5v1.1"/><path d="M22 5.4h-1.1"/><path d="M14.7 5.4h-1.1"/>`,

  // ---- Trust / benefit ----------------------------------------------------
  bolt: `<path d="M13.2 2 4 13.6h6.6L10 22l9.5-11.9h-6.9z"/>`,
  'shield-check': `<path d="M12 2.5 4.5 5.4v5.9c0 4.6 3.1 8.6 7.5 10.2 4.4-1.6 7.5-5.6 7.5-10.2V5.4z"/><path d="m8.7 11.9 2.5 2.5 4.3-4.5"/>`,
  home: `<path d="M3 10.6 12 3.2l9 7.4"/><path d="M5.4 9.4V20a1 1 0 0 0 1 1h11.2a1 1 0 0 0 1-1V9.4"/><path d="M9.6 21v-6.2h4.8V21"/>`,
  building: `<rect x="4" y="2.5" width="16" height="19" rx="1.5"/><path d="M8.2 7h2.2"/><path d="M13.6 7h2.2"/><path d="M8.2 11h2.2"/><path d="M13.6 11h2.2"/><path d="M8.2 15h2.2"/><path d="M13.6 15h2.2"/><path d="M10 21.5v-3.2h4v3.2"/>`,
  car: `<path d="M3 13.6 4.9 8.1a2 2 0 0 1 1.9-1.4h10.4a2 2 0 0 1 1.9 1.4L21 13.6"/><path d="M3 13.6h18v4.3a1 1 0 0 1-1 1h-1.6a1 1 0 0 1-1-1v-1H6.6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><circle cx="7" cy="16" r="1"/><circle cx="17" cy="16" r="1"/>`,
  'map-pin': `<path d="M20 10.2c0 5.9-8 11.8-8 11.8s-8-5.9-8-11.8a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.9"/>`,
  clock: `<circle cx="12" cy="12" r="9"/><path d="M12 6.8V12l3.4 2"/>`,
  key: `<circle cx="7.5" cy="15.5" r="3.4"/><path d="M9.9 13.1 20 3"/><path d="m16.9 6.1 2.4 2.4"/><path d="m14.5 8.5 2.4 2.4"/>`,
  alert: `<path d="M13.3 3.6 22 18.8a1.5 1.5 0 0 1-1.3 2.2H3.3A1.5 1.5 0 0 1 2 18.8L10.7 3.6a1.5 1.5 0 0 1 2.6 0z"/><path d="M12 9.4v4.2"/><circle cx="12" cy="17" r=".95"/>`,
  quote: `<path d="M9.4 5.5H5.6a1.6 1.6 0 0 0-1.6 1.6v3.4a1.6 1.6 0 0 0 1.6 1.6H8v.9a3.9 3.9 0 0 1-3.2 3.8"/><path d="M20.4 5.5h-3.8A1.6 1.6 0 0 0 15 7.1v3.4a1.6 1.6 0 0 0 1.6 1.6H19v.9a3.9 3.9 0 0 1-3.2 3.8"/>`,

  // ---- Contact / UI -------------------------------------------------------
  phone: `<path d="M21.5 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.6 4.2 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L7.6 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4 12.8 12.8 0 0 0 2.8.7 2 2 0 0 1 1.7 2z"/>`,
  whatsapp: `<path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.03 1.01-1.03 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.88 9.88 0 0 1 12.06 1.9c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7 9.88 9.88 0 0 1-9.89 10M20.46 3.5A11.82 11.82 0 0 0 12.05.02C5.5.02.16 5.35.16 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.005c6.55 0 11.89-5.34 11.89-11.9a11.82 11.82 0 0 0-3.48-8.41"/>`,
  mail: `<rect x="2.5" y="4.5" width="19" height="15" rx="2.2"/><path d="m3 8 8 5.3a2 2 0 0 0 2.2 0L21 8"/>`,
  instagram: `<rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" stroke="none"/>`,
  star: `<polygon points="12 2.2 15.1 8.5 22 9.5 17 14.4 18.2 21.3 12 18 5.8 21.3 7 14.4 2 9.5 8.9 8.5"/>`,
  check: `<path d="m20 6.5-11 11-5-5"/>`,
  'arrow-right': `<path d="M4.5 12h15"/><path d="m13 5.5 6.5 6.5-6.5 6.5"/>`,
  'chevron-down': `<path d="m6 9.5 6 6 6-6"/>`,
  'chevron-right': `<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>`,
  menu: `<path d="M3.5 7h17"/><path d="M3.5 12h17"/><path d="M3.5 17h17"/>`,
  close: `<path d="M18.5 5.5 5.5 18.5"/><path d="m5.5 5.5 13 13"/>`,
  plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
  pause: `<rect x="6.5" y="4.5" width="4" height="15" rx="1.3"/><rect x="13.5" y="4.5" width="4" height="15" rx="1.3"/>`,
  play: `<path d="M7.5 5.1a1 1 0 0 1 1.5-.87l10 6.9a1 1 0 0 1 0 1.74l-10 6.9a1 1 0 0 1-1.5-.87z"/>`,
};

export const iconNames = Object.keys(iconPaths);
