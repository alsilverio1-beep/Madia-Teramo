import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-madia-white border-2 border-madia-gold shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-madia-green border-b border-white/30 px-10 py-6 flex items-center justify-center relative">
              <img
                src="/mtlogo-removebg-preview.png"
                alt="Madia Teramo"
                className="h-14 w-auto object-contain"
              />
              <button onClick={onClose} className="absolute right-6 top-5 text-white/50 hover:text-madia-gold transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <div className="px-10 py-10">
              <form className="space-y-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Nominativo</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green placeholder:text-madia-green/20"
                      placeholder="Es. Mario Rossi"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Email</label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green placeholder:text-madia-green/20"
                      placeholder="mario@email.it"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Data Evento</label>
                    <input
                      type="date"
                      className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">N° Invitati</label>
                    <input
                      type="number"
                      className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green placeholder:text-madia-green/20"
                      placeholder="Es. 30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Tipologia Evento</label>
                  <select className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green appearance-none cursor-pointer">
                    <option>Compleanno</option>
                    <option>Laurea</option>
                    <option>Anniversario</option>
                    <option>Cena Aziendale</option>
                    <option>Altro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Note</label>
                  <textarea
                    className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-serif text-base text-madia-green h-20 resize-none placeholder:text-madia-green/20"
                    placeholder="Raccontaci il tuo evento..."
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-madia-green text-madia-white py-4 uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-madia-gold hover:text-madia-green transition-all duration-300"
                  >
                    Invia Richiesta
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
