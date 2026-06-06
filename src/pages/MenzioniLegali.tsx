import { SEO } from '../components/SEO';

export function MenzioniLegali() {
  return (
    <>
      <SEO
        title="Menzioni Legali"
        description="Informazioni legali e societarie di Madia Teramo S.r.l."
        canonical="/menzioni-legali"
        noindex={true}
      />
      <div className="min-h-screen bg-madia-white pt-24 lg:pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto space-y-10">

          <div className="space-y-3">
            <p className="text-madia-gold text-[10px] uppercase tracking-[0.5em]">Informativa legale</p>
            <h1 className="font-serif text-4xl font-light text-madia-green">Menzioni Legali</h1>
          </div>

          <div className="space-y-8 text-sm text-madia-black/70 leading-relaxed">

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Titolare del sito</h2>
              <p>
                <strong className="text-madia-black">Madia Teramo S.r.l.</strong><br />
                Piazza Sant'Agostino, 10 — 64100 Teramo (TE)<br />
                P.IVA: 02199950672<br />
                REA: TE-216820<br />
                Capitale sociale: € 10.000,00 i.v.<br />
                Cod. Ateco: 561111<br />
                Email: <a href="mailto:madia.teramo@gmail.com" className="text-madia-gold hover:underline">madia.teramo@gmail.com</a><br />
                PEC: <a href="mailto:madiateramosrl@pec.it" className="text-madia-gold hover:underline">madiateramosrl@pec.it</a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Responsabile del sito</h2>
              <p>
                Il responsabile della pubblicazione è il legale rappresentante di Madia Teramo S.r.l.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Hosting</h2>
              <p>
                Il sito è ospitato su infrastrutture cloud con server localizzati all'interno dell'Unione Europea.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Proprietà intellettuale</h2>
              <p>
                Tutti i contenuti presenti su questo sito — testi, immagini, loghi, grafica, video — sono di proprietà esclusiva di Madia Teramo S.r.l. o utilizzati con licenza. È vietata la riproduzione, anche parziale, senza autorizzazione scritta del titolare.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Limitazione di responsabilità</h2>
              <p>
                Le informazioni presenti su questo sito sono fornite a titolo indicativo. Madia Teramo S.r.l. si riserva il diritto di modificare in qualsiasi momento i contenuti del sito senza preavviso. Non si assume responsabilità per eventuali imprecisioni, errori od omissioni nei contenuti pubblicati.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-xl text-madia-green font-light">Normativa applicabile</h2>
              <p>
                Il presente sito è soggetto alla legge italiana. Per qualsiasi controversia relativa all'utilizzo del sito è competente il Foro di Teramo.
              </p>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
