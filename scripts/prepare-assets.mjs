/**
 * Asset pipeline for KeyPoint Locksmith.
 *
 * Source of truth is the owner-supplied `logo.jpeg` (black + gold wordmark on a
 * white background). Browsers need more than that, so this script derives:
 *
 *   src/assets/logo.png        transparent, trimmed  -> use on LIGHT surfaces
 *   src/assets/logo-light.png  transparent, reversed -> use on DARK surfaces
 *   public/favicon-*.png       square keyhole mark lifted from the logo
 *   public/apple-touch-icon.png
 *   public/og-image.jpg        1200x630 social card, built from `logo_new.jpeg`
 *
 * Run with: npm run assets
 */
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(root, 'logo.jpeg');
/** Owner-supplied wide wordmark, already reversed onto near-black. */
const SOCIAL_SRC = path.join(root, 'logo_new.jpeg');
const ASSETS = path.join(root, 'src', 'assets');
const PUBLIC = path.join(root, 'public');

// Brand colors sampled from the logo.
const GOLD = { r: 0xc9, g: 0x97, b: 0x3f };
const GOLD_ON_DARK = { r: 0xe6, g: 0xb9, b: 0x5f };
const INK = { r: 0x0b, g: 0x0d, b: 0x10 };
/** Flat background of `logo_new.jpeg`; the OG card reuses it so the pasted
 *  wordmark leaves no visible seam. */
const SOCIAL_BG = { r: 0x1b, g: 0x1b, b: 0x1b };

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b;

/**
 * The logo ships as a JPEG on white. Rather than keying out a flat color
 * (which leaves compression halos), derive alpha from luminance: ink is dark,
 * paper is not. The ramp keeps anti-aliased glyph edges smooth.
 */
function alphaFromLuminance(L) {
  return clamp(Math.round(((246 - L) / 18) * 255), 0, 255);
}

/**
 * The supplied JPEG carries a few rows of dark letterboxing along one edge
 * (an export artifact). Those rows would otherwise survive the alpha ramp and
 * blow out the content bounding box, so peel any dark border rows/columns off
 * the paper before anything else looks at the pixels.
 */
async function stripBorderArtifacts() {
  const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  const PAPER = 200;

  const rowMean = (y) => {
    let s = 0;
    for (let x = 0; x < w; x++) { const p = (y * w + x) * ch; s += lum(data[p], data[p + 1], data[p + 2]); }
    return s / w;
  };
  const colMean = (x) => {
    let s = 0;
    for (let y = 0; y < h; y++) { const p = (y * w + x) * ch; s += lum(data[p], data[p + 1], data[p + 2]); }
    return s / h;
  };

  let top = 0, bottom = h - 1, left = 0, right = w - 1;
  while (top < h && rowMean(top) < PAPER) top++;
  while (bottom > top && rowMean(bottom) < PAPER) bottom--;
  while (left < w && colMean(left) < PAPER) left++;
  while (right > left && colMean(right) < PAPER) right--;

  // One extra pixel of margin absorbs the JPEG ringing beside the artifact.
  const inset = 1;
  return {
    left: Math.min(left + inset, w - 1),
    top: Math.min(top + inset, h - 1),
    width: Math.max(1, right - left + 1 - inset * 2),
    height: Math.max(1, bottom - top + 1 - inset * 2),
  };
}

async function loadPixels() {
  const safe = await stripBorderArtifacts();
  const { data, info } = await sharp(SRC)
    .extract(safe)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, w: info.width, h: info.height, ch: info.channels, offset: safe };
}

/** Build both logo variants in one pass over the pixel buffer. */
function buildVariants({ data, w, h, ch }) {
  const normal = Buffer.alloc(w * h * 4);
  const reverse = Buffer.alloc(w * h * 4);

  for (let i = 0, p = 0; i < w * h; i++, p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const a = alphaFromLuminance(lum(r, g, b));
    const o = i * 4;

    normal[o] = r; normal[o + 1] = g; normal[o + 2] = b; normal[o + 3] = a;

    // Reverse variant: neutral ink (black text, key, fob) becomes white so the
    // mark reads on dark surfaces; the gold is kept and lifted slightly.
    const max = Math.max(r, g, b);
    const sat = max === 0 ? 0 : (max - Math.min(r, g, b)) / max;
    const isGold = sat > 0.22 && r >= g && g > b;
    const c = isGold ? GOLD_ON_DARK : { r: 0xf6, g: 0xf7, b: 0xf9 };
    reverse[o] = c.r; reverse[o + 1] = c.g; reverse[o + 2] = c.b; reverse[o + 3] = a;
  }
  return { normal, reverse };
}

/** Tight bounding box of everything that isn't fully transparent. */
function contentBounds(rgba, w, h, threshold = 12) {
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (rgba[(y * w + x) * 4 + 3] > threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

const fromRaw = (buf, w, h) =>
  sharp(buf, { raw: { width: w, height: h, channels: 4 } });

async function main() {
  await mkdir(ASSETS, { recursive: true });
  await mkdir(PUBLIC, { recursive: true });

  const px = await loadPixels();
  const { normal, reverse } = buildVariants(px);
  const box = contentBounds(normal, px.w, px.h);
  const pad = 6;
  const crop = {
    left: Math.max(0, box.left - pad),
    top: Math.max(0, box.top - pad),
    width: Math.min(px.w, box.width + pad * 2),
    height: Math.min(px.h, box.height + pad * 2),
  };

  // Retina-ready: the navbar renders the mark at ~46px tall, the footer ~56px.
  const TARGET_H = 320;

  for (const [name, buf] of [['logo', normal], ['logo-light', reverse]]) {
    await fromRaw(buf, px.w, px.h)
      .extract(crop)
      .resize({ height: TARGET_H, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true, quality: 92 })
      .toFile(path.join(ASSETS, `${name}.png`));
  }

  // ---- Square icon mark ---------------------------------------------------
  // The keyhole disc inside the "o" of "Point" is the only square-safe element
  // of the logo, so it becomes the app icon. Its position was measured by
  // isolating the one compact neutral-silver blob in the artwork; expressing it
  // as a fraction of the trimmed box keeps it correct if the logo is re-exported
  // at another resolution.
  const kx = crop.left + crop.width * 0.6371;
  const ky = crop.top + crop.height * 0.6349;
  const kr = crop.width * 0.062;
  // kx/ky live in the border-stripped coordinate space; shift back into the
  // original file's space before extracting from it.
  const keyholeCrop = {
    left: Math.round(kx - kr) + px.offset.left,
    top: Math.round(ky - kr) + px.offset.top,
    width: Math.round(kr * 2),
    height: Math.round(kr * 2),
  };

  const DISC = 320;
  const discMask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${DISC}" height="${DISC}">
       <circle cx="${DISC / 2}" cy="${DISC / 2}" r="${DISC / 2 - 1}" fill="#fff"/>
     </svg>`
  );

  // Round off the crop so the paper-white corners never reach the dark icon plate.
  const keyhole = await sharp(SRC)
    .extract(keyholeCrop)
    .resize(DISC, DISC, { fit: 'cover' })
    .composite([{ input: discMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const iconBg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0" stop-color="#15181D"/>
           <stop offset="1" stop-color="#08090B"/>
         </linearGradient>
       </defs>
       <rect width="512" height="512" rx="112" fill="url(#g)"/>
       <rect x="8" y="8" width="496" height="496" rx="106" fill="none"
             stroke="rgb(${GOLD.r},${GOLD.g},${GOLD.b})" stroke-opacity="0.55" stroke-width="10"/>
     </svg>`
  );

  const icon = await sharp(iconBg)
    .composite([{ input: keyhole, left: 96, top: 96 }])
    .png()
    .toBuffer();

  // Palette-quantised: the artwork is a handful of gradients, so 256 colours is
  // visually identical and roughly 5x smaller than truecolour PNG.
  for (const size of [16, 32, 48, 180, 192, 512]) {
    const out = size === 180 ? 'apple-touch-icon.png' : `favicon-${size}.png`;
    await sharp(icon)
      .resize(size, size)
      .png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 })
      .toFile(path.join(PUBLIC, out));
  }

  // ---- Open Graph card ----------------------------------------------------
  // Facebook/WhatsApp/X all crop toward 1.91:1, so the owner's wordmark is
  // re-laid-out at that ratio instead of being handed over as-is. Its own
  // padding is trimmed first so the mark can be sized against the card rather
  // than against whatever margin the export happened to carry.
  const ogMark = await sharp(SOCIAL_SRC)
    .trim({ background: SOCIAL_BG, threshold: 14 })
    .resize({ width: 700 })
    .png()
    .toBuffer();
  const ogMeta = await sharp(ogMark).metadata();

  // The wordmark carries its own gold rule under "LOCKSMITH", so the card adds
  // no second divider — only the bottom bar that frames the crop.
  const ogBg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
       <rect width="1200" height="630" fill="rgb(${SOCIAL_BG.r},${SOCIAL_BG.g},${SOCIAL_BG.b})"/>
       <rect y="614" width="1200" height="16" fill="rgb(${GOLD.r},${GOLD.g},${GOLD.b})"/>
       <text x="600" y="486" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif"
             font-size="36" font-weight="700" fill="#F6F7F9" letter-spacing="1">
         Emergency Locksmith Services
       </text>
       <text x="600" y="530" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif"
             font-size="26" fill="#A9B1BD" letter-spacing="0.5">
         Residential · Commercial · Automotive — Ventura County &amp; Los Angeles
       </text>
       <text x="600" y="586" text-anchor="middle" font-family="Segoe UI, Arial, Helvetica, sans-serif"
             font-size="36" font-weight="700" fill="rgb(${GOLD_ON_DARK.r},${GOLD_ON_DARK.g},${GOLD_ON_DARK.b})" letter-spacing="1.5">
         +1 747-354-8313
       </text>
     </svg>`
  );

  await sharp(ogBg)
    .composite([
      {
        input: ogMark,
        left: Math.round((1200 - ogMeta.width) / 2),
        top: Math.round(210 - ogMeta.height / 2),
      },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(PUBLIC, 'og-image.jpg'));

  // Inspection sheet: reverse logo over the real page background, so the
  // derived asset can be eyeballed without launching the site.
  await sharp({
    create: { width: 900, height: 260, channels: 4, background: { ...INK, alpha: 1 } },
  })
    .composite([{ input: await fromRaw(reverse, px.w, px.h).extract(crop).resize({ height: 150 }).png().toBuffer(), left: 60, top: 55 }])
    .png()
    .toFile(path.join(root, 'scripts', '_preview-logo-on-dark.png'));

  await writeFile(
    path.join(root, 'public', 'site.webmanifest'),
    JSON.stringify(
      {
        name: 'KeyPoint Locksmith',
        short_name: 'KeyPoint',
        icons: [
          { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: '#0B0D10',
        background_color: '#0B0D10',
        display: 'browser',
      },
      null,
      2
    )
  );

  console.log('crop box  :', JSON.stringify(crop));
  console.log('keyhole   :', JSON.stringify(keyholeCrop));
  console.log('assets written to src/assets + public');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
