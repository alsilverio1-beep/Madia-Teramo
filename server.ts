import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.use(express.json());

// ── Brevo ────────────────────────────────────────────────────────────────────
const BREVO_URL  = 'https://api.brevo.com/v3/smtp/email';
const ADMIN      = { email: 'al.silverio1@gmail.com', name: 'Madia Teramo' };
const TEST_EMAIL = 'al.silverio1@gmail.com'; // ← rimuovi per produzione
const MITTENTE   = { email: 'madia.teramo@gmail.com', name: 'Madia Teramo' };

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

function wrap(content: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
  <body style="margin:0;padding:20px;background:#f4f0e8">
    <div style="max-width:580px;margin:0 auto;border-radius:4px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10)">
      <div style="background:#062a22;padding:28px 32px">
        <p style="margin:0;color:#c5a059;font-size:11px;text-transform:uppercase;letter-spacing:0.3em;font-family:sans-serif">Madia Teramo</p>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.3);font-size:10px;font-family:sans-serif">madiateramo.it</p>
      </div>
      <div style="background:#fff;padding:36px 32px;font-family:sans-serif">${content}</div>
      <div style="background:#f8f6f0;padding:16px 32px;text-align:center">
        <p style="font-family:sans-serif;color:#aaa;font-size:11px;margin:0">Via Savini 2 &middot; 64100 Teramo &nbsp;&middot;&nbsp; <a href="mailto:madia.teramo@gmail.com" style="color:#c5a059;text-decoration:none">madia.teramo@gmail.com</a></p>
      </div>
    </div>
  </body></html>`;
}

function rowHtml(label: string, value?: string | null) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 12px;background:#f8f6f0;color:#888;font-size:12px;white-space:nowrap;font-weight:600">${label}</td>
    <td style="padding:8px 12px;background:#f8f6f0;color:#111;font-size:13px">${value}</td>
  </tr><tr><td colspan="2" style="padding:0;height:2px;background:#fff"></td></tr>`;
}

// Email al ristorante (notifica)
function emailAdmin(titolo: string, rows: string) {
  return wrap(`
    <p style="color:#c5a059;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;margin:0 0 8px">Notifica dal sito</p>
    <h2 style="color:#062a22;font-size:20px;font-weight:400;margin:0 0 24px;font-family:Georgia,serif">${titolo}</h2>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
  `);
}

// Email al cliente (conferma)
function emailCliente(nome: string, testo: string) {
  return wrap(`
    <p style="color:#c5a059;font-size:10px;text-transform:uppercase;letter-spacing:0.3em;margin:0 0 8px">Conferma ricezione</p>
    <h2 style="color:#062a22;font-size:22px;font-weight:400;margin:0 0 8px;font-family:Georgia,serif">Grazie, ${esc(nome)}.</h2>
    <p style="color:#555;font-size:14px;line-height:1.8;margin:0 0 20px">${testo}</p>
    <div style="border-top:1px solid #e8e4dc;padding-top:20px;margin-top:4px">
      <p style="color:#aaa;font-size:11px;text-align:center;margin:0">Questa è un'email automatica — per rispondere contattaci direttamente.</p>
    </div>
  `);
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
        subject: `Nuovo messaggio da ${esc(nome)} — Madia Teramo`,
        htmlContent: emailAdmin('Nuovo messaggio', [
          rowHtml('Nome',      nome),
          rowHtml('Email',     email),
          rowHtml('Telefono',  telefono),
          rowHtml('Messaggio', messaggio?.replace(/\n/g, '<br>')),
        ].join('')),
      }),
      // 2. Conferma al cliente
      brevoSend({
        sender: MITTENTE,
        to: [{ email: TEST_EMAIL, name: nome }],
        subject: 'Abbiamo ricevuto il tuo messaggio — Madia Teramo',
        htmlContent: emailCliente(nome,
          'Abbiamo ricevuto il tuo messaggio e ti risponderemo entro <strong style="color:#062a22">24 ore</strong>.<br>Nel frattempo, se hai bisogno di assistenza immediata puoi contattarci direttamente.'
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
        subject: `Richiesta preventivo da ${esc(nome)} — Madia Teramo`,
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
        sender: MITTENTE,
        to: [{ email: TEST_EMAIL, name: nome }],
        subject: 'Richiesta preventivo ricevuta — Madia Teramo',
        htmlContent: emailCliente(nome,
          'Abbiamo ricevuto la tua richiesta di preventivo per l\'evento.<br>Ti contatteremo entro <strong style="color:#062a22">24 ore</strong> per definire insieme ogni dettaglio e rendere il tuo evento indimenticabile.'
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
        subject: `Nuova candidatura${posizione ? ` — ${posizione}` : ''} da ${esc(nome)} — Madia Teramo`,
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
        sender: MITTENTE,
        to: [{ email: TEST_EMAIL, name: nome }],
        subject: 'Candidatura ricevuta — Madia Teramo',
        htmlContent: emailCliente(nome,
          'Abbiamo ricevuto la tua candidatura e la esamineremo con attenzione.<br>Ti contatteremo il prima possibile se il tuo profilo corrisponde alle nostre esigenze.'
        ),
      }),
    ]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('[/api/candidatura]', err);
    return res.status(500).json({ error: 'Errore durante l\'invio. Riprova più tardi.' });
  }
});

// ── Serve frontend in produzione ─────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
}

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, () => console.log(`[server] API in ascolto su http://localhost:${PORT}`));
