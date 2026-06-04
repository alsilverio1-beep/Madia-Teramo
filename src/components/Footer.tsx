import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-madia-black text-madia-white px-12 pt-8 pb-8 border-t-2 border-madia-gold/70">
      <div className="max-w-7xl mx-auto">

        {/* Main row: logo left — nav center — social right */}
        <div className="flex justify-between items-center pb-6">
          <div className="flex items-center gap-4">
            <img src="/mtlogo-removebg-preview.png" alt="Madia Teramo" className="h-16 w-auto object-contain" />
            <div className="w-px h-10 bg-white/20" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Ristorante</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Pizzeria</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Drink</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Home', to: '/' },
              { label: 'Ristorante', to: '/#chi-siamo' },
              { label: 'Pizzeria', to: '/#pizzeria' },
              { label: 'Steak House', to: '/steakhouse' },
              { label: 'Eventi', to: '/#eventi' },
              { label: 'Lavora con Noi', to: '/lavora-con-noi' },
            ].map(({ label, to }) => (
              <Link key={label} to={to} className="text-[9px] uppercase tracking-[0.2em] text-madia-white/50 hover:text-madia-gold transition-colors duration-300">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <a href="https://www.facebook.com/madia.teramo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-madia-gold/60 hover:text-madia-gold transition-colors duration-300">
              <Facebook size={18} />
            </a>
            <a href="https://www.instagram.com/madia_teramo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-madia-gold/60 hover:text-madia-gold transition-colors duration-300">
              <Instagram size={18} />
            </a>
            <a href="https://www.tripadvisor.it/Restaurant_Review-g660757-d25375490-Reviews-MADIA-Teramo_Province_of_Teramo_Abruzzo.html" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="text-madia-gold/60 hover:text-madia-gold transition-colors duration-300">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-madia-gold/20" />

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col items-center gap-3 text-madia-white/30">
          <p className="uppercase tracking-[0.15em] text-[9px] text-center">
            © {new Date().getFullYear()} Madia Teramo S.r.l. · P.IVA 02199950672 · REA TE-216820 · Cap. Soc. € 10.000,00 i.v. · Cod. Ateco 561111 · PEC madiateramosrl@pec.it
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 uppercase tracking-[0.15em] text-[9px]">
            <Link to="/privacy" className="hover:text-madia-gold transition-colors duration-300">Privacy Policy</Link>
            <span>·</span>
            <Link to="/cookie" className="hover:text-madia-gold transition-colors duration-300">Cookie Policy</Link>
            <span>·</span>
            <Link to="/termini-condizioni" className="hover:text-madia-gold transition-colors duration-300">Termini e Condizioni</Link>
            <span>·</span>
            <Link to="/menzioni-legali" className="hover:text-madia-gold transition-colors duration-300">Menzioni Legali</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
