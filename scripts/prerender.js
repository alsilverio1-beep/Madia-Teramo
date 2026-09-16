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
import { readFile, writeFile } from 'fs/promises';
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
  const TITLE = 'Madia — Pizzeria e Ristorante a Teramo';
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

const BASE_URL = 'https://www.madiateramo.it';

// route pubblica → file di output in dist/ (deve combaciare con i route espliciti in server.ts).
// title/description devono restare identici a quelli passati a <SEO> nelle rispettive pagine
// (src/pages/Menu.tsx, src/pages/Steakhouse.tsx): sono usati SOLO dal fallback "lite" qui sotto.
const ROUTES = [
  { path: '/', outFile: 'index.html' },
  {
    path: '/menu',
    outFile: 'menu.html',
    title: 'Menu Ristorante — Pranzo, Cena e Aperitivo | Madia Teramo',
    description: 'Scopri il menu di Madia Teramo: antipasti, primi, secondi, aperitivo dalle 18:00, selezione di carni frollate alla brace e cocktails. Ingredienti freschi e di qualità.',
  },
  {
    path: '/steakhouse',
    outFile: 'steakhouse.html',
    title: 'Steak House — Carni Frollate alla Brace a Teramo | Madia Teramo',
    description: 'La Steak House di Madia Teramo: tagli frollati di Chianina, Fassona, Black Angus e Wagyu. Razze italiane e internazionali, cotti alla brace nel cuore di Teramo.',
  },
];

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/**
 * Fallback "lite" quando il prerendering completo non è possibile (server senza
 * Chrome, oppure una rotta che fallisce in puppeteer): parte dallo shell SPA di
 * index.html e sostituisce SOLO title / description / canonical / og / twitter con
 * quelli della rotta. Il contenuto resta vuoto (CSR), ma il crawler non vede più il
 * canonical della home su /menu e /steakhouse — che è esattamente ciò che faceva
 * marcare quelle URL come duplicato e quindi "rilevata ma non indicizzata".
 * Prima di questo fallback, server.ts serviva index.html tale e quale su quelle rotte.
 */
function buildLiteShell(indexHtml, route) {
  const url = `${BASE_URL}${route.path}`;
  const title = escapeText(route.title);
  const titleAttr = escapeAttr(route.title);
  const desc = escapeAttr(route.description);
  const repl = [
    [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
    [/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${desc}" />`],
    [/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`],
    [/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${titleAttr}" />`],
    [/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${desc}" />`],
    [/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`],
    [/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${titleAttr}" />`],
    [/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${desc}" />`],
  ];
  return repl.reduce((html, [re, to]) => html.replace(re, to), indexHtml);
}

// Shell SPA "pulito" prodotto da vite build. Va letto PRIMA di qualsiasi scrittura:
// nel prerendering completo la home sovrascrive index.html con il proprio contenuto,
// e uno shell lite costruito da quello mostrerebbe la home sotto /menu.
const pristineShell = readFile(path.join(distPath, 'index.html'), 'utf-8');
pristineShell.catch(() => {}); // l'errore riemerge dove viene atteso, non come unhandled rejection

async function writeLiteShells(routes) {
  const indexHtml = await pristineShell;
  for (const route of routes) {
    if (!route.title) continue; // la home È già index.html
    await writeFile(path.join(distPath, route.outFile), buildLiteShell(indexHtml, route), 'utf-8');
    console.log(`[prerender] ${route.path} → ${route.outFile}  (shell lite, solo meta per-rotta)`);
  }
}

async function main() {
  if (!executablePath) {
    // Il prerendering completo è un miglioramento SEO accessorio, non deve mai bloccare
    // il deploy: se sul server manca Chrome/Chromium (es. hosting Plesk senza browser),
    // generiamo comunque gli shell "lite" con i meta corretti per rotta. Per il
    // prerendering completo installare Chromium sul server o impostare CHROME_PATH.
    console.warn('[prerender] Nessun browser Chrome/Edge trovato — prerendering completo saltato, genero gli shell lite. Imposta CHROME_PATH per abilitarlo.');
    await writeLiteShells(ROUTES);
    return;
  }

  const app = express();
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  const server = app.listen(PORT);

  const browser = await puppeteer.launch({ executablePath, headless: true });

  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      try {
        // 'networkidle0' non va mai bene qui: le hero con video autoPlay+loop
        // (Home, Steakhouse) tengono connessioni di rete aperte all'infinito
        // mentre il video ricomincia, quindi la rete non è mai "idle". Il
        // waitForSelector sotto già garantisce che React abbia renderizzato.
        await page.goto(`http://localhost:${PORT}${route.path}`, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#root > *', { timeout: 10_000 });
        await new Promise(r => setTimeout(r, 300)); // lascia commit agli effect di react-helmet-async

        const title = await page.title();
        const html = stripDuplicateStaticTags(await page.content());

        const outPath = path.join(distPath, route.outFile);
        await writeFile(outPath, html, 'utf-8');
        console.log(`[prerender] ${route.path} → ${route.outFile}  ("${title}", ${(html.length / 1024).toFixed(1)} KB)`);
      } catch (err) {
        // Una route che fallisce non deve bloccare le altre: per quella rotta si
        // scrive comunque lo shell lite (meta corretti), mai lo shell della home.
        console.warn(`[prerender] ${route.path} fallita, uso lo shell lite:`, err.message || err);
        await writeLiteShells([route]);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(async err => {
  // Anche qui: il prerendering non deve mai impedire il deploy del sito.
  // Come ultima rete di sicurezza si tenta lo shell lite, così /menu e /steakhouse
  // non escono mai con il canonical della home.
  console.warn('[prerender] Fallito, provo gli shell lite:', err.message || err);
  await writeLiteShells(ROUTES).catch(e => console.warn('[prerender] Anche gli shell lite sono falliti:', e.message || e));
  process.exit(0);
});
