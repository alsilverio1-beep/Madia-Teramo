import { SEO } from '../components/SEO';

export function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Informativa sul trattamento dei dati personali di Madia Teramo S.r.l., ai sensi del Regolamento UE 2016/679 (GDPR)."
        canonical="/privacy"
        noindex={true}
      />
      <div className="min-h-screen bg-madia-white pt-24 lg:pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="space-y-3">
            <p className="text-madia-gold text-[10px] uppercase tracking-[0.5em]">Informativa legale</p>
            <h1 className="font-serif text-4xl font-light text-madia-green">Privacy Policy</h1>
            <p className="text-xs text-madia-black/40 uppercase tracking-widest">Ai sensi del Regolamento UE 2016/679 (GDPR) e del D.Lgs. 196/2003</p>
          </div>

          <div className="space-y-8 text-sm text-madia-black/70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">1. Titolare del trattamento</h2>
              <p>
                <strong className="text-madia-black">Madia Teramo S.r.l.</strong><br />
                Piazza Sant'Agostino, 10 — 64100 Teramo TE<br />
                P.IVA 02199950672 — REA TE-216820<br />
                Email: <a href="mailto:madia.teramo@gmail.com" className="text-madia-gold hover:underline">madia.teramo@gmail.com</a><br />
                PEC: <a href="mailto:madiateramosrl@pec.it" className="text-madia-gold hover:underline">madiateramosrl@pec.it</a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">2. Tipologie di dati trattati</h2>
              <p>In base alle interazioni con il sito, possono essere trattati i seguenti dati personali:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Dati di navigazione</strong> — indirizzo IP, tipo di browser, pagine visitate, orari di accesso. Raccolti automaticamente dai sistemi informatici del sito per finalità tecniche.</li>
                <li><strong>Dati forniti volontariamente</strong> — nome, cognome, indirizzo email, numero di telefono, curriculum vitae e ogni altro dato inserito nei moduli di contatto, prenotazione, candidatura o richiesta preventivo.</li>
                <li><strong>Dati statistici aggregati</strong> — tramite Google Analytics, per comprendere in forma aggregata e anonima come gli utenti navigano il sito (pagine visitate, provenienza geografica, dispositivo). Attivo solo previo consenso alla categoria "Analitica" tramite il banner cookie; consultare la <a href="/cookie" className="text-madia-gold hover:underline">Cookie Policy</a> per i dettagli.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">3. Finalità e base giuridica del trattamento</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-madia-green/20">
                      <th className="text-left py-2 pr-4 font-semibold text-madia-green">Finalità</th>
                      <th className="text-left py-2 pr-4 font-semibold text-madia-green">Base giuridica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-madia-black/10">
                    <tr><td className="py-2 pr-4">Rispondere a richieste di contatto e prenotazioni</td><td className="py-2">Esecuzione di misure precontrattuali (art. 6.1.b GDPR)</td></tr>
                    <tr><td className="py-2 pr-4">Gestione candidature di lavoro</td><td className="py-2">Consenso dell'interessato (art. 6.1.a GDPR)</td></tr>
                    <tr><td className="py-2 pr-4">Gestione preventivi per eventi</td><td className="py-2">Esecuzione di misure precontrattuali (art. 6.1.b GDPR)</td></tr>
                    <tr><td className="py-2 pr-4">Funzionamento tecnico del sito</td><td className="py-2">Legittimo interesse del titolare (art. 6.1.f GDPR)</td></tr>
                    <tr><td className="py-2 pr-4">Statistiche di navigazione (Google Analytics)</td><td className="py-2">Consenso dell'interessato (art. 6.1.a GDPR)</td></tr>
                    <tr><td className="py-2 pr-4">Adempimento di obblighi di legge</td><td className="py-2">Obbligo legale (art. 6.1.c GDPR)</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">4. Modalità del trattamento e conservazione</h2>
              <p>
                I dati personali sono trattati con strumenti informatici e telematici, con l'adozione di misure di sicurezza adeguate a prevenire la perdita, l'uso illecito o l'accesso non autorizzato.
              </p>
              <p>
                I dati sono conservati per il tempo strettamente necessario al conseguimento delle finalità per cui sono stati raccolti:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Dati di contatto e prenotazione: <strong>12 mesi</strong> dalla richiesta, salvo necessità contrattuali o legali.</li>
                <li>Candidature di lavoro: <strong>6 mesi</strong> dalla ricezione, salvo consenso esplicito alla conservazione più lunga.</li>
                <li>Dati di navigazione tecnica: <strong>30 giorni</strong> nei log del server.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">5. Comunicazione e diffusione dei dati</h2>
              <p>
                I dati personali non sono ceduti a terzi né diffusi. Possono essere comunicati a soggetti che svolgono funzioni necessarie all'erogazione dei servizi richiesti (es. piattaforme di invio email, servizi di hosting), i quali agiscono in qualità di Responsabili del trattamento ai sensi dell'art. 28 GDPR.
              </p>
              <p>
                I dati non sono trasferiti al di fuori dell'Unione Europea.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">6. Diritti dell'interessato</h2>
              <p>Ai sensi degli artt. 15–22 del GDPR, l'interessato ha il diritto di:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Accedere ai propri dati personali (art. 15)</li>
                <li>Rettificare dati inesatti o incompleti (art. 16)</li>
                <li>Ottenere la cancellazione dei dati ("diritto all'oblio") (art. 17)</li>
                <li>Limitare il trattamento (art. 18)</li>
                <li>Opporsi al trattamento (art. 21)</li>
                <li>Ricevere i propri dati in formato portabile (art. 20)</li>
                <li>Revocare il consenso in qualsiasi momento, senza pregiudizio per la liceità del trattamento precedente</li>
              </ul>
              <p>
                Le richieste possono essere inviate a <a href="mailto:madia.teramo@gmail.com" className="text-madia-gold hover:underline">madia.teramo@gmail.com</a>. In caso di mancato riscontro entro 30 giorni, è possibile proporre reclamo all'Autorità Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-madia-gold hover:underline">www.garanteprivacy.it</a>).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">7. Cookie</h2>
              <p>
                Per informazioni dettagliate sull'utilizzo dei cookie da parte di questo sito, si rinvia all'apposita <a href="/cookie" className="text-madia-gold hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">8. Aggiornamenti</h2>
              <p>
                La presente informativa può essere aggiornata in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento.
              </p>
              <p className="text-madia-black/40 text-xs">Ultimo aggiornamento: luglio 2026</p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
