import React, { useState, useRef, FormEvent } from 'react';
import { ChefHat, UtensilsCrossed, Wine, Users, Upload, X, FileText } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useFormSubmit } from '../hooks/useFormSubmit';

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function LavoraConNoi() {
  const [consent, setConsent]           = useState(false);
  const [file, setFile]                 = useState<File | null>(null);
  const [dragging, setDragging]         = useState(false);
  const [role, setRole]                 = useState('');
  const [nome, setNome]                 = useState('');
  const [email, setEmail]               = useState('');
  const [telefono, setTelefono]         = useState('');
  const [presentazione, setPresentazione] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { status, errorMsg, submit } = useFormSubmit('/api/candidatura');

  const handleFile = (f: File) => setFile(f);

  const removeFile = () => {
    setFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const fd = new FormData();
    fd.append('nome', nome);
    fd.append('email', email);
    fd.append('telefono', telefono);
    fd.append('posizione', role);
    fd.append('presentazione', presentazione);
    if (file) fd.append('curriculum', file);
    await submit(fd);
  };

  return (
    <>
      <SEO
        title="Lavora con Noi — Unisciti al Team"
        description="Entra nel team di Madia Teramo. Cerchiamo figure appassionate per sala, cucina, pizzeria e bar. Invia la tua candidatura spontanea."
        canonical="/lavora-con-noi"
        noindex={true}
      />
    <section className="pt-24 lg:pt-28 pb-10 lg:pb-20 px-6 bg-madia-green">
      <div className="max-w-7xl mx-auto bg-madia-white py-8 px-4 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Info — stile sezione ristorante */}
          <div className="lg:col-span-5 space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-4 lg:pl-8">
            <div className="mb-8">
              <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Carriera</span>
              <h1 className="text-5xl md:text-7xl text-madia-green font-serif lowercase italic">lavora con noi</h1>
            </div>
            <p>
              Siamo sempre alla ricerca di persone appassionate che vogliano far parte del team Madia. Se ami la ristorazione e il lavoro di squadra, questa è la tua occasione.
            </p>
            <p>
              Lavoriamo ogni giorno per offrire un'esperienza autentica ai nostri ospiti. Cerchiamo professionisti motivati in sala, cucina, pizzeria e bar — figure che condividano la nostra cura per i dettagli e il piacere dell'accoglienza.
            </p>
            <p>Siamo alla ricerca delle seguenti figure:</p>
            <div className="pt-4 grid grid-cols-2 gap-5">
              {[
                { icon: ChefHat, label: 'Cucina' },
                { icon: UtensilsCrossed, label: 'Sala' },
                { icon: Wine, label: 'Bar' },
                { icon: Users, label: 'Staff' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full border border-madia-gold/40 flex items-center justify-center text-madia-gold shrink-0 group-hover:border-madia-gold transition-colors">
                    <item.icon size={14} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-madia-black/60 group-hover:text-madia-black transition-colors">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form box */}
          <div className="lg:col-span-7 border-2 border-madia-gold p-12 bg-madia-green rounded-2xl">
          {status === 'success' ? (
            <div className="text-center space-y-4 py-16">
              <p className="text-madia-gold text-4xl">✓</p>
              <p className="text-madia-white font-serif text-2xl font-light">Candidatura inviata!</p>
              <p className="text-white/50 text-sm">Abbiamo ricevuto la tua candidatura. Ti contatteremo il prima possibile.</p>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Nome Completo <span className="text-madia-gold">*</span></label>
                  <input
                    type="text"
                    required
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30"
                    placeholder="Es. Mario Rossi"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Email <span className="text-madia-gold">*</span></label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30"
                    placeholder="mario@email.it"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Telefono</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={e => setTelefono(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30"
                    placeholder="Es. +39 345 000 0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Posizione di interesse</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans focus:outline-none focus:border-madia-gold transition-colors appearance-none cursor-pointer ${role ? 'text-madia-white' : 'text-white/30'}`}
                  >
                    <option value="" disabled className="bg-madia-green">Seleziona una posizione</option>
                    <option className="bg-madia-green">Sala</option>
                    <option className="bg-madia-green">Cucina</option>
                    <option className="bg-madia-green">Pizzeria</option>
                    <option className="bg-madia-green">Bar</option>
                    <option className="bg-madia-green">Altro</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Presentati</label>
                <textarea
                  value={presentazione}
                  onChange={e => setPresentazione(e.target.value)}
                  className="bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white w-full h-32 focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30 resize-none"
                  placeholder="Esperienze, motivazioni, disponibilità..."
                />
              </div>

              {/* Allegato curriculum */}
              <div>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.odt,.rtf"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <div
                  onClick={() => !file && fileRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                  onDragEnter={() => setDragging(true)}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`flex flex-col sm:flex-row items-center gap-3 sm:gap-4 px-5 py-5 border border-dashed rounded transition-all duration-300 ${
                    dragging
                      ? 'border-madia-gold bg-white/5 cursor-copy'
                      : file
                      ? 'border-madia-gold/50 cursor-default'
                      : 'border-white/15 hover:border-madia-gold/40 cursor-pointer'
                  }`}
                >
                  {/* Icona */}
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300 ${file ? 'border-madia-gold/40 text-madia-gold' : 'border-white/15 text-white/30'}`}>
                    {file ? <FileText size={14} /> : <Upload size={14} />}
                  </div>

                  {file ? (
                    <>
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <p className="text-sm font-sans text-madia-white truncate leading-none">{file.name}</p>
                        <p className="text-[10px] font-sans text-white/35 mt-1">{formatSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removeFile(); }}
                        className="w-6 h-6 flex items-center justify-center text-white/25 hover:text-madia-gold transition-colors shrink-0"
                      >
                        <X size={13} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="text-center sm:text-left sm:flex-1">
                        <p className="text-sm font-sans text-white/35 leading-none">Allega curriculum</p>
                        <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-white/15 mt-1.5">PDF · DOC · DOCX · ODT</p>
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-madia-gold/40 border border-madia-gold/20 px-3 py-1.5 whitespace-nowrap">
                        Sfoglia
                      </span>
                    </>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 accent-madia-gold w-4 h-4 shrink-0 cursor-pointer"
                />
                <span className="text-[10px] font-sans text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                  Ho letto l'<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-madia-gold transition-colors">Informativa sulla Privacy</a> e acconsento al trattamento dei miei dati personali ai sensi del GDPR (Reg. UE 2016/679). <span className="text-madia-gold">*</span>
                </span>
              </label>

              {status === 'error' && <p className="text-red-400 text-xs text-center">{errorMsg}</p>}
              <p className="text-[9px] font-sans text-white/25 text-center">
                <span className="text-madia-gold">*</span> Campi obbligatori
              </p>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!nome.trim() || !email.trim() || !consent || status === 'loading'}
                  className="px-12 py-4 bg-madia-gold text-madia-green uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-madia-white hover:text-madia-green transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-madia-gold disabled:hover:text-madia-green"
                >
                  {status === 'loading' ? 'Invio in corso...' : 'Invia Candidatura'}
                </button>
              </div>
            </form>
          )}
          </div>

        </div>
      </div>
    </section>
    </>
  );
}
