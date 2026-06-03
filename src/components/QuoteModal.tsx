import { useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useFormSubmit } from '../hooks/useFormSubmit';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [consent, setConsent]     = useState(false);
  const [nome, setNome]           = useState('');
  const [email, setEmail]         = useState('');
  const [telefono, setTelefono]   = useState('');
  const [data, setData]           = useState('');
  const [invitati, setInvitati]   = useState('');
  const [tipologia, setTipologia] = useState('Compleanno');
  const [note, setNote]           = useState('');
  const { status, errorMsg, submit } = useFormSubmit('/api/preventivo');

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    await submit({ nome, email, telefono, data, invitati, tipologia, note });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-madia-white border-2 border-madia-gold shadow-2xl"
            onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div className="bg-madia-green border-b border-white/30 px-10 py-6 flex items-center justify-center relative">
              <img src="/mtlogo-removebg-preview.png" alt="Madia Teramo" className="h-14 w-auto object-contain" />
              <button onClick={onClose} className="absolute right-6 top-5 text-white/50 hover:text-madia-gold transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Form / Success */}
            <div className="px-10 py-10">
              {status === 'success' ? (
                <div className="text-center space-y-4 py-8">
                  <p className="text-madia-gold text-4xl">✓</p>
                  <p className="text-madia-green font-serif text-2xl font-light">Richiesta inviata!</p>
                  <p className="text-madia-black/50 text-sm">Ti contatteremo entro 24 ore.</p>
                  <button onClick={onClose} className="mt-4 border border-madia-gold text-madia-gold px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-madia-gold hover:text-madia-green transition-all duration-300">
                    Chiudi
                  </button>
                </div>
              ) : (
              <form className="space-y-7" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Nome Completo <span className="text-madia-gold">*</span></label>
                    <input type="text" required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green placeholder:text-madia-green/20" placeholder="Es. Mario Rossi" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Email <span className="text-madia-gold">*</span></label>
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green placeholder:text-madia-green/20" placeholder="mario@email.it" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Telefono</label>
                    <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green placeholder:text-madia-green/20" placeholder="Es. +39 345 000 0000" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Data Evento</label>
                    <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">N° Invitati</label>
                    <input type="number" value={invitati} onChange={e => setInvitati(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green placeholder:text-madia-green/20" placeholder="Es. 30" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Tipologia Evento</label>
                  <select value={tipologia} onChange={e => setTipologia(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green appearance-none cursor-pointer">
                    <option>Compleanno</option>
                    <option>Laurea</option>
                    <option>Anniversario</option>
                    <option>Cena Aziendale</option>
                    <option>Altro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-madia-green/40">Note</label>
                  <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full bg-transparent border-b border-madia-green/20 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-green h-20 resize-none placeholder:text-madia-green/20" placeholder="Raccontaci il tuo evento..." />
                </div>
                <div className="space-y-4 pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-madia-gold w-4 h-4 shrink-0 cursor-pointer" />
                    <span className="text-[10px] text-madia-green/50 leading-relaxed group-hover:text-madia-green/70 transition-colors">
                      Ho letto l'<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-madia-gold transition-colors">Informativa sulla Privacy</a> e acconsento al trattamento dei miei dati personali ai sensi del GDPR (Reg. UE 2016/679). <span className="text-madia-gold">*</span>
                    </span>
                  </label>
                  {status === 'error' && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}
                  <p className="text-[9px] font-sans text-madia-green/30 text-center"><span className="text-madia-gold">*</span> Campi obbligatori</p>
                  <div className="flex justify-center">
                    <button type="submit" disabled={!nome.trim() || !email.trim() || !consent || status === 'loading'}
                      className="px-12 py-4 bg-madia-green text-madia-white uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-madia-gold hover:text-madia-green transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-madia-green disabled:hover:text-madia-white">
                      {status === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
                    </button>
                  </div>
                </div>
              </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
