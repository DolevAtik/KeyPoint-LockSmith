import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('scripts/mobile-shots', { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

const page = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

await page.goto('http://localhost:4324/', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(600);

await page.screenshot({ path: 'scripts/mobile-shots/01-hero.png', fullPage: false });

await page.locator('#benefits-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/02-benefits.png', fullPage: false });

await page.locator('#services-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/03-services.png', fullPage: false });

await page.locator('#emergency-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/04-emergency.png', fullPage: false });

await page.locator('#areas-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/05-areas.png', fullPage: false });

await page.locator('#contact-heading').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/06-contact.png', fullPage: false });

// Open contact form and check if submit sits under sticky CTA
const disclosure = page.locator('#kp-form-disclosure');
const isOpen = await disclosure.evaluate((el) => el.open);
if (!isOpen) {
  await page.locator('#kp-form-disclosure > summary').click();
  await page.waitForTimeout(300);
}

await page.locator('[data-cta="lead-submit"]').scrollIntoViewIfNeeded();
await page.waitForTimeout(300);

const coverCheck = await page.evaluate(() => {
  const submit = document.querySelector('[data-cta="lead-submit"]');
  const sticky = document.getElementById('kp-mobile-cta');
  if (!submit || !sticky) return null;
  const s = submit.getBoundingClientRect();
  const b = sticky.getBoundingClientRect();
  const overlap = Math.max(0, Math.min(s.bottom, b.bottom) - Math.max(s.top, b.top));
  return {
    submitBottom: Math.round(s.bottom),
    stickyTop: Math.round(b.top),
    overlapPx: Math.round(overlap),
    stickyVisible: sticky.classList.contains('is-visible'),
  };
});

await page.screenshot({ path: 'scripts/mobile-shots/07-form-submit.png', fullPage: false });

await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(300);
await page.screenshot({ path: 'scripts/mobile-shots/08-footer.png', fullPage: false });

console.log(JSON.stringify({ coverCheck }, null, 2));
await browser.close();
