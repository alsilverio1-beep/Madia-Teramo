import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Music, Utensils } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useFormSubmit } from '../hooks/useFormSubmit';

export function EventsQuote() {
  const [consent, setConsent]       = useState(false);
  const [nome, setNome]             = useState('');
  const [email, setEmail]           = useState('');
  const [telefono, setTelefono]     = useState('');
  const [data, setData]             = useState('');
  const [invitati, setInvitati]     = useState('');
  const [tipologia, setTipologia]   = useState('Compleanno');
  const [note, setNote]             = useState('');
  const { status, errorMsg, submit } = useFormSubmit('/api/preventivo');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    await submit({ nome, email, telefono, data, invitati, tipologia, note });
  };

  return (
    <>
      <SEO
        title="Preventivo Eventi Privati — Cene, Feste e Aziendali"
        description="Organizza il tuo evento privato da Madia Teramo: compleanni, cene aziendali, ricevimenti. Richiedi un preventivo personalizzato."
        canonical="/preventivo-eventi"
        noindex={true}
      />
    <div className="pt-24 min-h-screen bg-madia-green flex items-center">
      <div className="max-w-7xl mx-auto px-12 py-20 flex flex-col lg:flex-row gap-24 items-center">
        {/* Info Side */}
        <div className="lg:w-5/12 text-madia-white space-y-12">
          <div className="space-y-6">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block">
              Private Celebrations
            </motion.span>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
              className="text-6xl md:text-7xl font-serif text-madia-white font-light lowercase italic leading-none">
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

          {status === 'success' ? (
            <div className="relative z-10 text-center space-y-4 py-16">
              <p className="text-madia-gold text-4xl">✓</p>
              <p className="text-madia-white font-serif text-2xl font-light">Richiesta inviata!</p>
              <p className="text-madia-white/50 text-sm">Ti contatteremo entro 24 ore per definire ogni dettaglio del tuo evento.</p>
            </div>
          ) : (
          <form className="space-y-10 relative z-10 text-white" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Nome Completo <span className="text-madia-gold">*</span></label>
                <input type="text" required value={nome} onChange={e => setNome(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white" placeholder="Es. Mario Rossi" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Contatto Email <span className="text-madia-gold">*</span></label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white" placeholder="mario@email.it" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Telefono</label>
                <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white" placeholder="Es. +39 345 000 0000" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Data Evento</label>
                <input type="date" value={data} onChange={e => setData(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white appearance-none [&::-webkit-calendar-picker-indicator]:invert" />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">N° Invitati</label>
                <input type="number" value={invitati} onChange={e => setInvitati(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white" placeholder="Es. 30" />
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Tipologia Ricorrenza</label>
              <select value={tipologia} onChange={e => setTipologia(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white appearance-none">
                <option className="bg-madia-green">Compleanno</option>
                <option className="bg-madia-green">Laurea</option>
                <option className="bg-madia-green">Anniversario</option>
                <option className="bg-madia-green">Cena Aziendale</option>
                <option className="bg-madia-green">Altro</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Note & Particolarità</label>
              <textarea value={note} onChange={e => setNote(e.target.value)} className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-madia-gold transition-colors font-sans text-sm text-madia-white h-20 resize-none placeholder:text-white/10" placeholder="Raccontaci la tua visione..."></textarea>
            </div>
            <div className="space-y-5 pt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 accent-madia-gold w-4 h-4 shrink-0 cursor-pointer" />
                <span className="text-[10px] text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                  Ho letto l'<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-madia-gold transition-colors">Informativa sulla Privacy</a> e acconsento al trattamento dei miei dati personali ai sensi del GDPR (Reg. UE 2016/679). <span className="text-madia-gold">*</span>
                </span>
              </label>
              {status === 'error' && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}
              <p className="text-[9px] font-sans text-white/25 text-center"><span className="text-madia-gold">*</span> Campi obbligatori</p>
              <div className="flex justify-center">
                <button type="submit" disabled={!nome.trim() || !email.trim() || !consent || status === 'loading'}
                  className="px-12 py-5 bg-madia-gold text-madia-green uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-white transition-all shadow-xl shadow-black/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-madia-gold disabled:hover:text-madia-green">
                  {status === 'loading' ? 'Invio in corso...' : 'Richiedi Preventivo Esclusivo'}
                </button>
              </div>
            </div>
          </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
