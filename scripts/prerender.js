/**
 * Prerendering statico delle pagine pubbliche indicizzabili (Home, Menu, Steakhouse).
 * Esegue il build già pronto in dist/, lo serve in locale, apre ogni rotta con Chrome
 * headless (via puppeteer-core, nessun download di Chromium) e salva l'HTML già
 * renderizzato al posto dello shell vuoto — utile per crawler/social che non eseguono JS
 * e per velocizzare la prima indicizzazione.
 *
 * Non modifica alcun componente React: il bundle client resta identico e fa il proprio
 * render normale sopra l'HTML già presente.
 */
import express from 'express';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.join(__dirname, '..', 'dist');
const PORT = 4173;

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
].filter(Boolean);

const executablePath = CHROME_CANDIDATES.find(p => existsSync(p));
if (!executablePath) {
  console.error('[prerender] Nessun browser Chrome/Edge trovato. Imposta CHROME_PATH.');
  process.exit(1);
}

/**
 * react-helmet-async aggiunge <title>/<meta>/<link> per-pagina in testa a <head>,
 * ma non rimuove mai i tag statici di fallback già presenti in index.html (non li ha
 * mai gestiti lui). Il risultato è un head con due <title>, due canonical, due
 * description, ecc. — un doppione title/canonical pre-idratazione che confonde i
 * crawler (Google può ignorare del tutto due canonical in conflitto).
 *
 * L'ordine di inserimento di Helmet non è affidabile per capire quale dei due
 * tenere (verificato: per <title> Helmet finisce prima, per canonical/description
 * finisce dopo) — quindi rimuoviamo puntualmente il valore statico noto di
 * index.html, lasciando intatto qualunque valore Helmet abbia effettivamente reso.
 */
function stripDuplicateStaticTags(html) {
  const TITLE = 'Madia Teramo — Ristorante, Pizzeria e Steak House';
  const DESC = 'Madia è il ristorante e pizzeria in Piazza Sant\'Agostino 9/10, Teramo. Cucina contemporanea, pizza padellino con biga 18 ore, steak house e aperitivo ogni giorno dalle 18:00.';
  const TWITTER_DESC = 'Madia è il ristorante e pizzeria in Piazza Sant\'Agostino 9/10, Teramo. Cucina contemporanea, pizza padellino, steak house e aperitivo.';
  const CANONICAL = 'https://www.madiateramo.it/';
  const OG_IMAGE = 'https://www.madiateramo.it/og-image.jpg';

  // rimuove UNA sola occorrenza del tag il cui valore combacia esattamente con lo statico
  const removeStaticMatch = (tagRegex, staticValue) => {
    let removed = false;
    html = html.replace(tagRegex, (match, value) => {
      if (!removed && value === staticValue) { removed = true; return ''; }
      return match;
    });
  };

  removeStaticMatch(/<title>(.*?)<\/title>/gs, TITLE);
  removeStaticMatch(/<meta name="description" content="([^"]*)"\s*\/?>/g, DESC);
  removeStaticMatch(/<meta name="robots" content="([^"]*)"\s*\/?>/g, 'index,follow');
  removeStaticMatch(/<link rel="canonical" href="([^"]*)"\s*\/?>/g, CANONICAL);
  removeStaticMatch(/<meta property="og:type" content="([^"]*)"\s*\/?>/g, 'website');
  removeStaticMatch(/<meta property="og:locale" content="([^"]*)"\s*\/?>/g, 'it_IT');
  removeStaticMatch(/<meta property="og:title" content="([^"]*)"\s*\/?>/g, TITLE);
  removeStaticMatch(/<meta property="og:description" content="([^"]*)"\s*\/?>/g, DESC);
  removeStaticMatch(/<meta property="og:url" content="([^"]*)"\s*\/?>/g, CANONICAL);
  removeStaticMatch(/<meta property="og:image" content="([^"]*)"\s*\/?>/g, OG_IMAGE);
  removeStaticMatch(/<meta property="og:image:width" content="([^"]*)"\s*\/?>/g, '1200');
  removeStaticMatch(/<meta property="og:image:height" content="([^"]*)"\s*\/?>/g, '630');
  removeStaticMatch(/<meta property="og:image:alt" content="([^"]*)"\s*\/?>/g, 'Madia Teramo — Ristorante e Pizzeria');
  removeStaticMatch(/<meta name="twitter:card" content="([^"]*)"\s*\/?>/g, 'summary_large_image');
  removeStaticMatch(/<meta name="twitter:title" content="([^"]*)"\s*\/?>/g, TITLE);
  removeStaticMatch(/<meta name="twitter:description" content="([^"]*)"\s*\/?>/g, TWITTER_DESC);
  removeStaticMatch(/<meta name="twitter:image" content="([^"]*)"\s*\/?>/g, OG_IMAGE);

  return html;
}

// route pubblica → file di output in dist/ (deve combaciare con i route espliciti in server.ts)
const ROUTES = [
  { path: '/', outFile: 'index.html' },
  { path: '/menu', outFile: 'menu.html' },
  { path: '/steakhouse', outFile: 'steakhouse.html' },
];

async function main() {
  const app = express();
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  const server = app.listen(PORT);

  const browser = await puppeteer.launch({ executablePath, headless: true });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'networkidle0' });
      await page.waitForSelector('#root > *', { timeout: 10_000 });
      await new Promise(r => setTimeout(r, 300)); // lascia commit agli effect di react-helmet-async

      const title = await page.title();
      const html = stripDuplicateStaticTags(await page.content());
      await page.close();

      const outPath = path.join(distPath, route.outFile);
      await writeFile(outPath, html, 'utf-8');
      console.log(`[prerender] ${route.path} → ${route.outFile}  ("${title}", ${(html.length / 1024).toFixed(1)} KB)`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(err => {
  console.error('[prerender] Fallito:', err);
  process.exit(1);
});
