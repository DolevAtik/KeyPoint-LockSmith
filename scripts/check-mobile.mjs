import { chromium } from 'playwright';

const viewports = [
  { name: 'iPhone SE', width: 375, height: 667 },
  { name: 'iPhone 14', width: 390, height: 844 },
  { name: 'Pixel 7', width: 412, height: 915 },
  { name: 'iPhone landscape', width: 844, height: 390 },
];

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
});

const results = [];

for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  await page.goto('http://localhost:4324/', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(800);

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const scrollWidth = Math.max(doc.scrollWidth, body.scrollWidth);
    const clientWidth = doc.clientWidth;
    const overflow = scrollWidth - clientWidth;

    const offenders = [];
    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      if (rect.right > clientWidth + 1 || rect.left < -1) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const cls =
          el.className && typeof el.className === 'string'
            ? `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`
            : '';
        offenders.push({
          sel: `${tag}${id}${cls}`.slice(0, 140),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        });
      }
    }

    offenders.sort(
      (a, b) =>
        Math.max(Math.abs(b.right - clientWidth), Math.abs(b.left)) -
        Math.max(Math.abs(a.right - clientWidth), Math.abs(a.left))
    );

    const heroBtn = document.querySelector('[data-cta="hero-call"]');
    const emergencyBtn = document.querySelector('[data-cta="emergency-call"]');

    return {
      scrollWidth,
      clientWidth,
      overflow,
      bodyOverflowX: getComputedStyle(body).overflowX,
      heroBtnOverflow: heroBtn ? heroBtn.scrollWidth > heroBtn.clientWidth + 1 : false,
      emergencyBtnOverflow: emergencyBtn
        ? emergencyBtn.scrollWidth > emergencyBtn.clientWidth + 1
        : false,
      offenders: offenders.slice(0, 12),
    };
  });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(400);

  const bottom = await page.evaluate(() => {
    const sticky = document.getElementById('kp-mobile-cta');
    const footer = document.querySelector('.kp-footer');
    const stickyRect = sticky?.getBoundingClientRect();
    return {
      stickyTop: stickyRect ? Math.round(stickyRect.top) : null,
      stickyHeight: stickyRect ? Math.round(stickyRect.height) : null,
      stickyVisible: sticky?.classList.contains('is-visible') ?? false,
      footerPadBottom: footer?.firstElementChild
        ? getComputedStyle(footer.firstElementChild).paddingBottom
        : null,
      viewportH: window.innerHeight,
      pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  results.push({ viewport: vp, ...metrics, bottom });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
