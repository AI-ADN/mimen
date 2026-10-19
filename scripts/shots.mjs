// Visual check of the scroll journey: node scripts/shots.mjs [baseUrl] [outDir]
import { chromium } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:5183/';
const out = process.argv[3] ?? '/tmp/mimen-shots';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 720 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  { name: 'mobile-se', width: 375, height: 667, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
];

const stops = [0, 0.2, 0.249, 0.4, 0.6, 0.85, 1];

const browser = await chromium.launch();
for (const vp of viewports) {
  const { name, ...opts } = vp;
  const context = await browser.newContext({ viewport: { width: opts.width, height: opts.height }, ...opts });
  const page = await context.newPage();
  const logs = [];
  page.on('console', (m) => ['error', 'warning'].includes(m.type()) && logs.push(m.text()));
  page.on('pageerror', (e) => logs.push(String(e)));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.waitForFunction(() => [...document.querySelectorAll('video')].every((v) => 'ready' in v.dataset), null, {
    timeout: 20000,
  });

  for (const p of stops) {
    await page.evaluate((p) => {
      const t = document.getElementById('recorrido');
      const top = t.getBoundingClientRect().top + scrollY;
      window.scrollTo({ top: top + p * (t.offsetHeight - innerHeight), behavior: 'instant' });
    }, p);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${out}/${name}-${String(p).replace('.', '_')}.png` });
  }

  await page.evaluate(() => document.getElementById('contacto').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${out}/${name}-contact.png` });
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${out}/${name}-end.png` });

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(`${name}: overflow-x=${overflow}px${logs.length ? ` console: ${logs.join(' | ')}` : ''}`);
  await context.close();
}
await browser.close();
