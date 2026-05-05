import { motion } from 'motion/react';
import { ShieldCheck, Flame, Scale } from 'lucide-react';

export function Steakhouse() {
  const cuts = [
    {
      name: 'Fiorentina Dry Aged',
      breed: 'Chianina IGP',
      aging: '60+ Giorni',
      desc: 'Taglio classico toscano da filiera certificata, frollato lentamente in celle a temperatura controllata per una morbidezza ineguagliabile.',
      image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=2574&auto=format&fit=crop'
    },
    {
      name: 'Rubia Gallega',
      breed: 'Espana Vieja',
      aging: '50 Giorni',
      desc: 'Carne galiziana rinomata per il grasso giallo intenso e il sapore burroso, maturata per esaltare le note tostate e di nocciola.',
      image: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?q=80&w=2500&auto=format&fit=crop'
    },
    {
      name: 'Sashi Beef',
      breed: 'Holstein / Friesian',
      aging: '45 Giorni',
      desc: 'Selezione nordica caratterizzata da una marezzatura (Kobe-style) straordinaria che si scioglie in bocca ad ogni morso.',
      image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3c533?q=80&w=2670&auto=format&fit=crop'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-madia-white">
      {/* Hero Header */}
      <section className="bg-madia-green py-32 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 border border-madia-gold/30 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-60 h-60 border border-madia-gold/20 rounded-full"></div>
        </div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-madia-gold uppercase tracking-[0.6em] text-[10px] font-bold block"
          >
            The Ritual of Fire
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif text-madia-white leading-[0.85] font-light"
          >
            Steak House <br /> <span className="italic">Madia</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-madia-white/60 font-sans italic text-base max-w-xl mx-auto leading-relaxed"
          >
            Selezioniamo solo le razze più prestigiose al mondo, seguendo cicli di frollatura artigianali per un'esperienza carnivora autentica.
          </motion.p>
        </div>
      </section>

      {/* Meat Cards */}
      <section className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-40">
          {cuts.map((cut, idx) => (
            <motion.div 
              key={cut.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}
            >
              <div className="lg:w-1/2 relative group">
                <div className="aspect-[4/5] overflow-hidden thin-border p-3 bg-white/50 backdrop-blur-sm shadow-xl">
                  <img 
                    src={cut.image} 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
                    alt={cut.name} 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -inset-4 border border-madia-gold/10 -z-10 group-hover:inset-0 transition-all duration-700"></div>
              </div>
              <div className="lg:w-1/2 space-y-10">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold">{cut.breed}</span>
                <h3 className="text-5xl font-serif text-madia-green font-light italic leading-none">{cut.name.toLowerCase()}</h3>
                <div className="flex items-center gap-6 text-madia-black/40 text-[10px] uppercase tracking-widest font-bold border-b border-black/5 pb-4">
                  <div className="flex items-center gap-2"><Flame size={14} className="text-madia-gold" /> Aging: {cut.aging}</div>
                </div>
                <p className="text-madia-black/60 font-sans text-sm leading-relaxed max-w-md">
                  {cut.desc}
                </p>
                <div className="grid grid-cols-2 gap-12 pt-4">
                   <div className="space-y-2">
                     <span className="text-madia-gold text-[10px] uppercase tracking-widest font-bold">Consistenza</span>
                     <p className="text-xs uppercase text-black/40 font-bold">Burrosa e Fondente</p>
                   </div>
                   <div className="space-y-2">
                     <span className="text-madia-gold text-[10px] uppercase tracking-widest font-bold">Sapore</span>
                     <p className="text-xs uppercase text-black/40 font-bold">Inconfondibile</p>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-madia-green/5 py-24 px-6 border-y border-madia-green/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
             <div className="w-16 h-16 border border-madia-gold text-madia-gold mx-auto flex items-center justify-center">
               <ShieldCheck size={32} />
             </div>
             <h4 className="text-lg font-serif">Altezza della Qualità</h4>
             <p className="text-sm text-madia-black/60 font-light">Selezioniamo solo capi allevati al pascolo con metodi tradizionali.</p>
          </div>
          <div className="text-center space-y-4">
             <div className="w-16 h-16 border border-madia-gold text-madia-gold mx-auto flex items-center justify-center">
               <Scale size={32} />
             </div>
             <h4 className="text-lg font-serif">Frollatura Controllata</h4>
             <p className="text-sm text-madia-black/60 font-light">Monitoriamo umidità e ventilazione ogni ora per 60+ giorni.</p>
          </div>
          <div className="text-center space-y-4">
             <div className="w-16 h-16 border border-madia-gold text-madia-gold mx-auto flex items-center justify-center">
               <Flame size={32} />
             </div>
             <h4 className="text-lg font-serif">Cottura al Carbone</h4>
             <p className="text-sm text-madia-black/60 font-light">Utilizziamo solo legna di rovere e faggio per una grigliatura perfetta.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
         <h2 className="text-3xl font-serif text-madia-green mb-8">Vuoi assaggiare la differenza?</h2>
         <button className="px-12 py-4 bg-madia-green text-madia-white hover:bg-madia-black transition-colors uppercase tracking-widest text-sm font-bold">
            Prenota un tavolo ora
         </button>
      </section>
    </div>
  );
}
