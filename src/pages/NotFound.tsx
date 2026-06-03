import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

export function NotFound() {
  return (
    <>
      <SEO
        title="Pagina non trovata"
        description="La pagina che cerchi non esiste. Torna alla home di Madia Teramo."
        canonical="/404"
        noindex={true}
      />
      <div className="min-h-screen bg-madia-green flex items-center justify-center px-6">
        <div className="text-center space-y-6">
          <p className="text-madia-gold text-[10px] uppercase tracking-[0.5em]">Errore 404</p>
          <h1 className="text-madia-white font-serif text-5xl font-light">Pagina non trovata</h1>
          <p className="text-madia-white/50 text-sm max-w-sm mx-auto">
            La pagina che cerchi non esiste o è stata spostata.
          </p>
          <Link
            to="/"
            className="inline-block border border-madia-gold text-madia-gold px-8 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-madia-gold hover:text-madia-green transition-all duration-500"
          >
            Torna alla home
          </Link>
        </div>
      </div>
    </>
  );
}
