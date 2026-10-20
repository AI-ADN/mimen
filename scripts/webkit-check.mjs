// WebKit (Safari engine) check of scroll-driven video on an emulated iPhone: node scripts/webkit-check.mjs [baseUrl]
import { webkit, devices } from 'playwright';

const base = process.argv[2] ?? 'http://localhost:5199/';
const browser = await webkit.launch();
const context = await browser.newContext({ ...devices['iPhone 13'] });
const page = await context.newPage();
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));

await page.goto(base, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const readState = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('video.clip')].map((v) => ({
      ready: 'ready' in v.dataset,
      readyState: v.readyState,
      t: Number(v.currentTime.toFixed(2)),
      opacity: v.style.opacity,
    })),
  );

console.log('top', JSON.stringify(await readState()));
const track = await page.evaluate(() => document.getElementById('recorrido').offsetHeight - innerHeight);
for (const p of [0.1, 0.35, 0.6, 0.85]) {
  await page.evaluate((y) => scrollTo(0, y), Math.round(track * p));
  await page.waitForTimeout(900);
  console.log(p, JSON.stringify(await readState()));
  await page.screenshot({ path: `/tmp/mimen-webkit-${p}.png` });
}
console.log('errors', errors);
await browser.close();
