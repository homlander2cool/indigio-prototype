// Node + Playwright scraper: npm i playwright
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const START_URL = 'https://indigio.club/';
const OUT_DIR = path.resolve(process.cwd(), 'out');

(async () => {
  await fs.promises.mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const visited = new Set();
  const toVisit = [START_URL];

  while (toVisit.length) {
    const url = toVisit.shift();
    if (visited.has(url)) continue;
    try {
      console.log('Visiting', url);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const pathname = new URL(url).pathname.replace(/\//g, '_') || 'home';
      const filePath = path.join(OUT_DIR, `page${pathname}.html`);
      const html = await page.content();
      await fs.promises.writeFile(filePath, html, 'utf8');

      // Extract links to same-origin pages (limit depth implicitly by checking duplicates)
      const anchors = await page.$$eval('a[href]', els => els.map(a => a.href));
      for (const href of anchors) {
        try {
          const u = new URL(href, url);
          if (u.origin === new URL(START_URL).origin && !visited.has(u.href) && !toVisit.includes(u.href)) {
            toVisit.push(u.href);
          }
        } catch(e){}
      }

      // Extract image and asset URLs (img/src, link[href] to .pdf)
      const assets = await page.evaluate(() => {
        const urls = [];
        document.querySelectorAll('img').forEach(img => { if (img.src) urls.push(img.src); });
        document.querySelectorAll('a').forEach(a => { if (a.href && a.href.match(/\\.pdf$/i)) urls.push(a.href); });
        document.querySelectorAll('link[rel=\"icon\"], link[rel=\"shortcut icon\"], link[rel=\"apple-touch-icon\"]').forEach(l => { if (l.href) urls.push(l.href); });
        return Array.from(new Set(urls));
      });

      const assetsDir = path.join(OUT_DIR, 'assets');
      await fs.promises.mkdir(assetsDir, { recursive: true });
      for (const aurl of assets) {
        try {
          const u = new URL(aurl, url).href;
          const fname = path.basename(new URL(u).pathname).split('?')[0] || 'asset';
          const dest = path.join(assetsDir, `${Date.now()}_${fname}`);
          const response = await page.request.get(u);
          if (response.ok()) {
            await fs.promises.writeFile(dest, Buffer.from(await response.body()));
            console.log('Saved asset', u, '->', dest);
          } else {
            console.log('Failed to fetch asset', u, response.status());
          }
        } catch(e){ console.log('Asset error', e.message); }
      }

      visited.add(url);
    } catch (err) {
      console.error('Error visiting', url, err.message);
    }
  }

  await browser.close();
  // Produce a manifest of discovered pages
  await fs.promises.writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify({ visited: Array.from(visited) }, null, 2));
  console.log('Done. Output in', OUT_DIR);
})();