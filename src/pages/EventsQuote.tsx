import { motion } from 'motion/react';
import { Calendar, Users, Music, Utensils, MessageSquare } from 'lucide-react';

export function EventsQuote() {
  return (
    <div className="pt-24 min-h-screen bg-madia-green flex items-center">
      <div className="max-w-7xl mx-auto px-12 py-20 flex flex-col lg:flex-row gap-24 items-center">
        {/* Info Side */}
        <div className="lg:w-5/12 text-madia-white space-y-12">
          <div className="space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block"
            >
              Private Celebrations
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-serif text-madia-white font-light lowercase italic leading-none"
            >
              progetta il tuo <br /> <span className="text-madia-gold not-italic font-light">evento</span>
            </motion.h1>
            <p className="text-madia-white/50 font-sans text-sm leading-relaxed max-w-sm italic">
              Dalla pianificazione del menù alla scelta degli allestimenti. Rendiamo ogni tua ricorrenza un momento eterno.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            {[
              { icon: Users, label: 'Spazi Esclusivi' },
              { icon: Utensils, label: 'Gourmet Menù' },
              { icon: Music, label: 'Entertainment' },
              { icon: Calendar, label: 'Design & Decor' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-madia-gold group-hover:border-madia-gold transition-colors">
                  <item.icon size={14} />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 group-hover:opacity-100 transition-opacity">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:w-7/12 bg-white/5 backdrop-blur-xl border border-white/10 p-12 md:p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-madia-gold/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
          
          <form className="space-y-10 relative z-10 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Nominativo</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold" placeholder="Es. Mario Rossi" />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Contatto Email</label>
                <input type="email" className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold" placeholder="mario@email.it" />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Data Evento</label>
                <input type="date" className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold appearance-none [&::-webkit-calendar-picker-indicator]:invert" />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">N° Invitati</label>
                <input type="number" className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold" placeholder="Es. 30" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Tipologia Ricorrenza</label>
              <select className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold appearance-none">
                <option className="bg-madia-green">Compleanno</option>
                <option className="bg-madia-green">Laurea</option>
                <option className="bg-madia-green">Anniversario</option>
                <option className="bg-madia-green">Cena Aziendale</option>
                <option className="bg-madia-green">Altro</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Note & Particolarità</label>
              <textarea className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-lg text-madia-gold h-20 resize-none placeholder:text-white/10" placeholder="Raccontaci la tua visione..."></textarea>
            </div>

            <div className="pt-6">
              <button className="w-full bg-madia-gold text-madia-green py-5 uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-white transition-all shadow-xl shadow-black/20">
                Richiedi Preventivo Esclusivo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
