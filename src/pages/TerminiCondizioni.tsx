import { SEO } from '../components/SEO';

export function TerminiCondizioni() {
  return (
    <>
      <SEO
        title="Termini e Condizioni"
        description="Termini e condizioni d'uso del sito web di Madia Teramo S.r.l."
        canonical="/termini-condizioni"
        noindex={true}
      />
      <div className="min-h-screen bg-madia-white pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="space-y-3">
            <p className="text-madia-gold text-[10px] uppercase tracking-[0.5em]">Informativa legale</p>
            <h1 className="font-serif text-4xl font-light text-madia-green">Termini e Condizioni</h1>
            <p className="text-xs text-madia-black/40 uppercase tracking-widest">Ultimo aggiornamento: giugno 2025</p>
          </div>

          <div className="space-y-8 text-sm text-madia-black/70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">1. Accettazione dei termini</h2>
              <p>
                L'accesso e l'utilizzo del sito web <strong className="text-madia-black">madiateramo.it</strong> (di seguito "Sito") implica l'accettazione integrale dei presenti Termini e Condizioni d'uso. In caso di mancata accettazione, si prega di non utilizzare il Sito.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">2. Servizi offerti</h2>
              <p>Il Sito consente agli utenti di:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Consultare informazioni sul ristorante, i menù e i servizi offerti</li>
                <li>Inviare richieste di prenotazione tavolo</li>
                <li>Richiedere preventivi per eventi e cerimonie</li>
                <li>Inviare candidature spontanee di lavoro</li>
                <li>Contattare il locale tramite modulo di contatto</li>
              </ul>
              <p>
                Le prenotazioni e i preventivi inviati tramite il Sito sono da considerarsi richieste e non costituiscono un contratto vincolante fino a conferma esplicita da parte di Madia Teramo S.r.l.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">3. Prenotazioni</h2>
              <p>
                Le richieste di prenotazione tavolo sono soggette a disponibilità e verranno confermate direttamente dal personale del ristorante tramite telefono o email. Madia Teramo S.r.l. si riserva il diritto di rifiutare prenotazioni senza obbligo di motivazione.
              </p>
              <p>
                In caso di impossibilità a onorare la prenotazione, si prega di comunicarlo con congruo anticipo ai recapiti indicati nel Sito.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">4. Correttezza delle informazioni</h2>
              <p>
                L'utente si impegna a fornire informazioni veritiere, accurate e aggiornate nei moduli presenti sul Sito. Madia Teramo S.r.l. non è responsabile per errori derivanti da informazioni errate fornite dall'utente.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">5. Prezzi e menù</h2>
              <p>
                I prezzi e le disponibilità dei piatti indicati sul Sito hanno carattere puramente informativo e possono variare senza preavviso. Il menù aggiornato e i prezzi definitivi sono sempre disponibili direttamente in sede.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">6. Proprietà intellettuale</h2>
              <p>
                Tutti i contenuti del Sito (testi, immagini, loghi, grafica) sono protetti dalla normativa sul diritto d'autore e sono di proprietà esclusiva di Madia Teramo S.r.l. o utilizzati su licenza. È vietata qualsiasi riproduzione o utilizzo non autorizzato.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">7. Limitazione di responsabilità</h2>
              <p>
                Madia Teramo S.r.l. non è responsabile per danni diretti o indiretti derivanti dall'utilizzo o dall'impossibilità di utilizzo del Sito, inclusi interruzioni del servizio, errori tecnici o contenuti di siti terzi raggiungibili tramite link.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">8. Link a siti terzi</h2>
              <p>
                Il Sito può contenere link a siti web di terze parti. Tali link sono forniti a titolo informativo e Madia Teramo S.r.l. non è responsabile per i contenuti, le politiche sulla privacy o le pratiche di tali siti.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">9. Modifiche ai termini</h2>
              <p>
                Madia Teramo S.r.l. si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina e avranno efficacia dalla data di pubblicazione.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">10. Legge applicabile e foro competente</h2>
              <p>
                I presenti Termini e Condizioni sono disciplinati dalla legge italiana. Per qualsiasi controversia è competente in via esclusiva il Foro di Teramo.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
