import { useState } from 'react';

export function Prenota() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="bg-madia-white min-h-screen flex items-center justify-center py-20 px-6">
      <div className="w-full max-w-3xl relative">
        {!loaded && (
          <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-madia-white z-50">
            <div className="w-12 h-12 border-2 border-madia-gold/30 border-t-madia-gold rounded-full animate-spin" />
            <span className="text-madia-green/50 text-[10px] uppercase tracking-[0.4em] font-bold">Caricamento in corso</span>
          </div>
        )}
        <iframe
          src="https://widget.thefork.com/7ee298e1-d67f-44b1-91b1-94a070c1d883"
          allow="payment *"
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            minHeight: '800px',
            border: 'none',
            overflow: 'scroll',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
          title="Prenota un tavolo - Madia Teramo"
        />
      </div>
    </div>
  );
}
