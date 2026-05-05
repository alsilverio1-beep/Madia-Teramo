import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-madia-black text-madia-white py-12 px-12 border-t border-madia-gold/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-serif tracking-[0.3em] text-madia-gold uppercase">Madia</div>
        
        <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-madia-white/50">
          <Link to="/" className="hover:text-madia-gold transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-madia-gold transition-colors">Menù</Link>
          <a href="#chi-siamo" className="hover:text-madia-gold transition-colors">Chi Siamo</a>
          <Link to="/steakhouse" className="hover:text-madia-gold transition-colors">Steak House</Link>
          <a href="#eventi" className="hover:text-madia-gold transition-colors">Eventi</a>
          <a href="#contatti" className="hover:text-madia-gold transition-colors">Contatti</a>
        </div>

        <div className="flex gap-4">
          <a href="#" className="w-8 h-8 flex items-center justify-center border border-madia-white/10 text-madia-gold hover:border-madia-gold transition-colors">
            <Instagram size={14} />
          </a>
          <a href="#" className="w-8 h-8 flex items-center justify-center border border-madia-white/10 text-madia-gold hover:border-madia-gold transition-colors">
            <Facebook size={14} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-madia-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] text-madia-white/30">
        <div className="flex gap-8">
          <span>Piazza Orsini, Teramo (TE)</span>
          <span>T: +39 0861 123456</span>
        </div>
        <p className="mt-4 md:mt-0 text-madia-gold/60 italic">© {new Date().getFullYear()} Madia Restaurant. Eccellenza e Tradizione.</p>
      </div>
    </footer>
  );
}
