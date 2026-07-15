import 'dotenv/config';
import compression from 'compression';
import express from 'express';
import { existsSync } from 'fs';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

// Dietro reverse proxy (Nginx/Plesk): fidati di X-Forwarded-Proto/Host per req.protocol
app.set('trust proxy', true);

// Un solo dominio canonico (www): madiateramo.it senza www rimanda sempre a www,
// altrimenti Google/social vedrebbero lo stesso contenuto su due host diversi.
app.use((req, res, next) => {
  if (req.hostname === 'madiateramo.it') {
    return res.redirect(301, `${req.protocol}://www.madiateramo.it${req.originalUrl}`);
  }
  next();
});

app.use(compression());
app.use(express.json());

// ── Brevo ────────────────────────────────────────────────────────────────────
const BREVO_URL  = 'https://api.brevo.com/v3/smtp/email';
const ADMIN      = { email: 'madia.teramo@gmail.com', name: 'Madia Teramo' };
const MITTENTE   = { email: 'madia.teramo@gmail.com', name: 'Madia Teramo' };
const NOREPLY    = { email: 'noreply@madiateramo.it', name: 'Madia Teramo' };

async function brevoSend(payload: Record<string, unknown>) {
  const key = process.env.BREVO_API_KEY;
  if (!key) throw new Error('BREVO_API_KEY non configurata');

  const res = await fetch(BREVO_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'api-key': key },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(`Brevo ${res.status}: ${JSON.stringify(err)}`);
  }
}

// ── HTML email helpers ───────────────────────────────────────────────────────
const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function rowHtml(label: string, value?: string | null) {
  if (!value) return '';
  return `<tr>
    <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:12px;color:#888;width:130px;vertical-align:top">${label}</td>
    <td style="padding:6px 10px;border-bottom:1px solid #f0f0f0;font-family:Arial,sans-serif;font-size:13px;color:#222;vertical-align:top">${value}</td>
  </tr>`;
}

// Email al ristorante (notifica) — semplice e funzionale
function emailAdmin(titolo: string, rows: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #ddd;border-radius:4px;overflow:hidden">
    <div style="background:#062a22;padding:14px 20px">
      <p style="margin:0;color:#c5a059;font-size:13px;font-weight:bold">${titolo}</p>
    </div>
    <div style="padding:20px">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #f0f0f0">${rows}</table>
    </div>
  </div>
</body></html>`;
}

// Email al cliente (conferma) — brand Madia Teramo, del Lei
function emailCliente(nome: string, testo: string) {
  return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f0ece4">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece4;padding:28px 16px">
  <tr><td align="center">
  <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%">

    <!-- Header con logo -->
    <tr>
      <td style="background:#062a22;padding:32px 40px;text-align:center">
        <img src="https://www.madiateramo.it/mtlogo-removebg-preview.png" alt="Madia Teramo" width="120" style="display:block;margin:0 auto;width:120px;height:auto"/>
      </td>
    </tr>

    <!-- Striscia oro -->
    <tr><td style="background:#c5a059;height:2px;line-height:2px;font-size:2px">&nbsp;</td></tr>

    <!-- Corpo -->
    <tr>
      <td style="background:#ffffff;padding:44px 40px 36px">
        <p style="margin:0 0 6px;font-family:Arial,sans-serif;font-size:9px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;color:#c5a059">Conferma ricezione</p>
        <h2 style="margin:0 0 24px;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#062a22">Gentile ${esc(nome)},</h2>
        <p style="margin:0 0 32px;font-family:Georgia,serif;font-size:15px;line-height:1.9;color:#3d3d3d">${testo}</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="border-top:1px solid #e8e2d8;padding-top:20px">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;color:#aaa;text-align:center">Questa è un'email automatica. Per rispondere ci contatti direttamente ai recapiti in calce.</p>
          </td></tr>
        </table>
      </td>
    </tr>

    <!-- Footer contatti -->
    <tr>
      <td style="background:#062a22;padding:24px 40px;text-align:center">
        <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:rgba(255,255,255,0.45);line-height:1.8">
          Piazza Sant&apos;Agostino, 10 &mdash; 64100 Teramo<br/>
          Tel. <a href="tel:+393773334838" style="color:rgba(255,255,255,0.45);text-decoration:none">+39 377 333 4838</a><br/>
          <a href="mailto:madia.teramo@gmail.com" style="color:rgba(197,160,89,0.7);text-decoration:none">madia.teramo@gmail.com</a>
        </p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>
</body></html>`;
}

// ── POST /api/contatto ───────────────────────────────────────────────────────
app.post('/api/contatto', async (req, res) => {
  const { nome, email, telefono, messaggio } = req.body as Record<string, string>;
  if (!nome || !email) return res.status(400).json({ error: 'Nome ed email sono obbligatori.' });

  try {
    await Promise.all([
      // 1. Notifica al ristorante
      brevoSend({
        sender: MITTENTE,
        to: [ADMIN],
        replyTo: { email, name: nome },
        subject: `SITO - Contatti | da ${esc(nome)}`,
        htmlContent: emailAdmin('Nuovo messaggio', [
          rowHtml('Nome',      nome),
          rowHtml('Email',     email),
          rowHtml('Telefono',  telefono),
          rowHtml('Messaggio', messaggio?.replace(/\n/g, '<br>')),
        ].join('')),
      }),
      // 2. Conferma al cliente
      brevoSend({
        sender: NOREPLY,
        to: [{ email, name: nome }],
        subject: 'Abbiamo ricevuto il Suo messaggio — Madia Teramo',
        htmlContent: emailCliente(nome,
          'Abbiamo ricevuto il Suo messaggio e Le risponderemo entro <strong style="color:#062a22">24 ore</strong>.<br>Nel frattempo, se avesse necessità di assistenza immediata può contattarci direttamente.'
        ),
      }),
    ]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/contatto]', err);
    return res.status(500).json({ error: 'Errore durante l\'invio. Riprova più tardi.' });
  }
});

// ── POST /api/preventivo ─────────────────────────────────────────────────────
app.post('/api/preventivo', async (req, res) => {
  const { nome, email, telefono, data, invitati, tipologia, note } = req.body as Record<string, string>;
  if (!nome || !email) return res.status(400).json({ error: 'Nome ed email sono obbligatori.' });

  try {
    await Promise.all([
      // 1. Notifica al ristorante
      brevoSend({
        sender: MITTENTE,
        to: [ADMIN],
        replyTo: { email, name: nome },
        subject: `SITO - Preventivo | da ${esc(nome)}`,
        htmlContent: emailAdmin('Richiesta preventivo evento', [
          rowHtml('Nome',        nome),
          rowHtml('Email',       email),
          rowHtml('Telefono',    telefono),
          rowHtml('Data evento', data),
          rowHtml('N° invitati', invitati),
          rowHtml('Tipologia',   tipologia),
          rowHtml('Note',        note?.replace(/\n/g, '<br>')),
        ].join('')),
      }),
      // 2. Conferma al cliente
      brevoSend({
        sender: NOREPLY,
        to: [{ email, name: nome }],
        subject: 'Richiesta preventivo ricevuta — Madia Teramo',
        htmlContent: emailCliente(nome,
          'Abbiamo ricevuto la Sua richiesta di preventivo per l\'evento.<br>La contatteremo entro <strong style="color:#062a22">24 ore</strong> per definire insieme ogni dettaglio e rendere il Suo evento indimenticabile.'
        ),
      }),
    ]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/preventivo]', err);
    return res.status(500).json({ error: 'Errore durante l\'invio. Riprova più tardi.' });
  }
});

// ── POST /api/candidatura ────────────────────────────────────────────────────
app.post('/api/candidatura', upload.single('curriculum'), async (req, res) => {
  const { nome, email, telefono, posizione, presentazione } = req.body as Record<string, string>;
  if (!nome || !email) return res.status(400).json({ error: 'Nome ed email sono obbligatori.' });

  const attachments = req.file
    ? [{ name: req.file.originalname, content: req.file.buffer.toString('base64') }]
    : undefined;

  try {
    await Promise.all([
      // 1. Notifica al ristorante (con CV allegato)
      brevoSend({
        sender: MITTENTE,
        to: [ADMIN],
        replyTo: { email, name: nome },
        subject: `SITO - Lavora con Noi | da ${esc(nome)}`,
        htmlContent: emailAdmin('Nuova candidatura', [
          rowHtml('Nome',          nome),
          rowHtml('Email',         email),
          rowHtml('Telefono',      telefono),
          rowHtml('Posizione',     posizione),
          rowHtml('Presentazione', presentazione?.replace(/\n/g, '<br>')),
          req.file ? rowHtml('Curriculum', req.file.originalname) : '',
        ].join('')),
        ...(attachments ? { attachment: attachments } : {}),
      }),
      // 2. Conferma al cliente
      brevoSend({
        sender: NOREPLY,
        to: [{ email, name: nome }],
        subject: 'Candidatura ricevuta — Madia Teramo',
        htmlContent: emailCliente(nome,
          'La ringraziamo di cuore per l\'interesse dimostrato verso il nostro team.<br>Abbiamo ricevuto con piacere la Sua candidatura e la leggeremo con la massima attenzione: se il Suo profilo sarà in linea con le nostre ricerche, saremo lieti di ricontattarLa al più presto.'
        ),
      }),
    ]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/candidatura]', err);
    return res.status(500).json({ error: 'Errore durante l\'invio. Riprova più tardi.' });
  }
});

// ── Redirect 301: vecchia URL /menu-pizza confluita in /menu ─────────────────
app.get('/menu-pizza', (_req, res) => res.redirect(301, '/menu?section=pizze'));

// ── Serve frontend in produzione ─────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');

  // Pagine pre-renderizzate in fase di build (scripts/prerender.js): HTML già
  // pieno di contenuto per crawler/social, stessa app React idrata sopra.
  // Se il prerendering è stato saltato in build (es. server senza Chrome), il file
  // non esiste: si serve normalmente lo shell SPA, comportamento identico a prima.
  const servePrerendered = (fileName: string) => (_req: express.Request, res: express.Response) => {
    const prerendered = path.join(distPath, fileName);
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(existsSync(prerendered) ? prerendered : path.join(distPath, 'index.html'));
  };
  app.get('/menu', servePrerendered('menu.html'));
  app.get('/steakhouse', servePrerendered('steakhouse.html'));

  // HTML sempre revalidato (mai servito stantio dalla cache del browser);
  // JS/CSS con hash nel nome file (Vite) cacheable a lungo perché immutabili.
  app.use(
    express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, must-revalidate');
        } else if (filePath.includes(`${path.sep}assets${path.sep}`)) {
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        }
      },
    })
  );
  app.get('*', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`[server] API in ascolto su http://localhost:${PORT}`));
