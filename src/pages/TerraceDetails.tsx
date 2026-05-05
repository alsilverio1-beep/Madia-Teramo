import { motion } from 'motion/react';
import { Compass, Eye, MapPin, Camera } from 'lucide-react';

export function TerraceDetails() {
  return (
    <div className="pt-24 min-h-screen bg-madia-white">
      {/* Immersive Header */}
      <section className="relative h-[90vh] bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 grayscale opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1517505311024-42f09907f152?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover" 
            alt="Panoramic View" 
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-madia-white"></div>
        
        <div className="relative z-10 text-center space-y-10 px-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-16 h-16 border border-madia-gold/40 rounded-full flex items-center justify-center mx-auto text-madia-gold backdrop-blur-sm"
          >
            <Compass className="animate-spin-slow" size={24} />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-serif text-madia-white leading-[0.8] font-light"
          >
            Terrazza <br /> <span className="italic">Orsini</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-madia-gold uppercase tracking-[0.8em] text-[10px] font-bold">Inaugurazione 2026</span>
            <div className="w-[1px] h-12 bg-madia-gold/40"></div>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="section-padding max-w-7xl mx-auto flex flex-col items-center space-y-20">
        <div className="max-w-3xl text-center space-y-8">
           <h2 className="text-4xl md:text-6xl font-serif text-madia-green font-light leading-none italic">
            Uno sguardo privilegiato <br /> <span className="not-italic text-madia-gold">sulla storia.</span>
          </h2>
          <p className="text-madia-black/60 font-sans text-sm leading-relaxed italic">
            "Terrazza Orsini non è solo un ampliamento, ma l'elevazione definitiva dell'esperienza Madia. Uno spazio sospeso dove il tessuto medievale di Teramo incontra l'avanguardia gastronomica."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
             <div className="space-y-6">
                <h3 className="text-2xl font-serif text-madia-green">Orizzonti Inediti</h3>
                <p className="text-madia-black/50 text-sm leading-loose">
                  Posta sulla sommità dell'edificio storico, la terrazza offrirà una vista inedita a 360 gradi. Dalla maestosità della Cattedrale di San Berardo alle vette del Gran Sasso in lontananza.
                </p>
             </div>
             <div className="grid grid-cols-2 gap-8">
                <div className="p-6 border border-black/5 space-y-3">
                   <Eye size={20} className="text-madia-gold" />
                   <h4 className="text-[10px] uppercase tracking-widest font-bold">Panoramic Area</h4>
                   <p className="text-[11px] text-black/40 font-sans uppercase">Salotto a cielo aperto</p>
                </div>
                <div className="p-6 border border-black/5 space-y-3">
                   <MapPin size={20} className="text-madia-gold" />
                   <h4 className="text-[10px] uppercase tracking-widest font-bold">Top Location</h4>
                   <p className="text-[11px] text-black/40 font-sans uppercase">Centro Storico</p>
                </div>
             </div>
          </div>
          <div className="relative p-3 thin-border bg-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full grayscale" 
                alt="Atmosphere" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-madia-gold/20 -z-10 hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Visual Mood Board */}
      <section className="bg-madia-green py-32 px-12 overflow-hidden border-y border-madia-gold/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-end">
             <div className="space-y-2">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.4em] font-bold leading-none">Vibe & Texture</span>
                <h2 className="text-4xl text-madia-white font-serif italic font-light">Moodboard Esclusiva</h2>
             </div>
             <div className="hidden lg:block w-1/3 h-[1px] bg-white/10"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Sunset Vision', img: 'https://images.unsplash.com/photo-1520174691701-bc555a3404ca?auto=format&fit=crop&q=80&w=600' },
              { label: 'Elegant Place', img: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=600' },
              { label: 'Details Matter', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600' }
            ].map((item, idx) => (
              <motion.div 
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="aspect-[3/4] relative group overflow-hidden thin-border p-2 bg-white/5"
              >
                <img src={item.img} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt={item.label} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-madia-green/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute bottom-4 left-4 p-4">
                  <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">{item.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
