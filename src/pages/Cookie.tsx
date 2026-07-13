import { SEO } from '../components/SEO';

export function Cookie() {
  return (
    <>
      <SEO
        title="Cookie Policy"
        description="Informativa sull'uso dei cookie di Madia Teramo S.r.l., ai sensi del Provvedimento del Garante Privacy del 10 giugno 2021 e delle Linee Guida ePrivacy."
        canonical="/cookie"
        noindex={true}
      />
      <div className="min-h-screen bg-madia-white pt-24 lg:pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="space-y-3">
            <p className="text-madia-gold text-[10px] uppercase tracking-[0.5em]">Informativa legale</p>
            <h1 className="font-serif text-4xl font-light text-madia-green">Cookie Policy</h1>
            <p className="text-xs text-madia-black/40 uppercase tracking-widest">Ai sensi del Provvedimento Garante Privacy del 10 giugno 2021 e della Direttiva ePrivacy 2002/58/CE</p>
          </div>

          <div className="space-y-8 text-sm text-madia-black/70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">1. Cosa sono i cookie</h2>
              <p>
                I cookie sono piccoli file di testo che i siti web visitati dall'utente inviano al suo terminale (computer, tablet, smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva. I cookie consentono al sito di riconoscere il dispositivo e memorizzare alcune informazioni sulle preferenze o sulle azioni precedenti dell'utente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">2. Tipologie di cookie utilizzati</h2>

              <h3 className="font-semibold text-madia-black text-sm">2.1 Cookie tecnici (necessari)</h3>
              <p>
                Sono cookie essenziali per il corretto funzionamento del sito. Senza di essi alcune funzionalità non sarebbero disponibili. Non richiedono consenso ai sensi dell'art. 122 del D.Lgs. 196/2003.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-madia-green/20">
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Nome</th>
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Fornitore</th>
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Finalità</th>
                      <th className="text-left py-2 font-semibold text-madia-green">Durata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-madia-black/10">
                    <tr>
                      <td className="py-2 pr-3">Sessione</td>
                      <td className="py-2 pr-3">madiateramo.it</td>
                      <td className="py-2 pr-3">Mantenimento della sessione di navigazione</td>
                      <td className="py-2">Sessione</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="font-semibold text-madia-black text-sm mt-4">2.2 Cookie di terze parti</h3>
              <p>
                Il sito utilizza servizi di terze parti che possono installare cookie sul dispositivo dell'utente. Di seguito l'elenco dei servizi attivi:
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-madia-green/20">
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Servizio</th>
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Fornitore</th>
                      <th className="text-left py-2 pr-3 font-semibold text-madia-green">Finalità</th>
                      <th className="text-left py-2 font-semibold text-madia-green">Privacy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-madia-black/10">
                    <tr>
                      <td className="py-2 pr-3">CookieYes</td>
                      <td className="py-2 pr-3">CookieYes (RCB Media Ventures Pvt Ltd)</td>
                      <td className="py-2 pr-3">Gestione delle preferenze di consenso ai cookie. Memorizza la scelta dell'utente per non richiederla ad ogni visita.</td>
                      <td className="py-2"><a href="https://www.cookieyes.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-madia-gold hover:underline">Link</a></td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3">Google Maps</td>
                      <td className="py-2 pr-3">Google LLC</td>
                      <td className="py-2 pr-3">Visualizzazione mappa interattiva. Può installare cookie di profilazione se l'utente è autenticato su Google.</td>
                      <td className="py-2"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-madia-gold hover:underline">Link</a></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">3. Consenso e gestione dei cookie</h2>
              <p>
                I cookie tecnici non richiedono consenso. Per i cookie di terze parti, il consenso viene richiesto al primo accesso al sito tramite il banner gestito da CookieYes, che permette di accettare, rifiutare o personalizzare le preferenze per categoria. La scelta può essere modificata in qualsiasi momento riaprendo il pannello delle preferenze cookie (icona dedicata visibile sul sito) oppure agendo sulle impostazioni del proprio browser o tramite i seguenti link:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Google Chrome</strong>: Impostazioni → Privacy e sicurezza → Cookie</li>
                <li><strong>Mozilla Firefox</strong>: Impostazioni → Privacy e sicurezza → Cookie e dati dei siti</li>
                <li><strong>Apple Safari</strong>: Preferenze → Privacy → Gestisci dati dei siti web</li>
                <li><strong>Microsoft Edge</strong>: Impostazioni → Cookie e autorizzazioni del sito</li>
              </ul>
              <p>
                Si avverte che la disabilitazione di alcuni cookie potrebbe compromettere la corretta visualizzazione del sito o la disponibilità di alcuni servizi.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">4. Titolare del trattamento</h2>
              <p>
                <strong className="text-madia-black">Madia Teramo S.r.l.</strong><br />
                Piazza Sant'Agostino, 10 — 64100 Teramo TE<br />
                Email: <a href="mailto:madia.teramo@gmail.com" className="text-madia-gold hover:underline">madia.teramo@gmail.com</a>
              </p>
              <p>
                Per maggiori informazioni sul trattamento dei dati personali si rimanda alla <a href="/privacy" className="text-madia-gold hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">5. Aggiornamenti</h2>
              <p>
                La presente Cookie Policy può essere aggiornata in relazione all'introduzione di nuovi servizi o a variazioni normative. Le modifiche saranno pubblicate su questa pagina.
              </p>
              <p className="text-madia-black/40 text-xs">Ultimo aggiornamento: luglio 2026</p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
