import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { menuData } from '../data/menu';
import { cn } from '../lib/utils';
import { Sparkles, Star } from 'lucide-react';

const categories = [
  { id: 'all', label: 'Tutto' },
  { id: 'antipasti', label: 'Antipasti' },
  { id: 'primi', label: 'Primi' },
  { id: 'secondi', label: 'Meat & Co' },
  { id: 'pizze', label: 'Le Nostre Pizze' },
  { id: 'dolci', label: 'Dolci' },
];

export function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems = activeCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-madia-white">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-12 mb-20 text-center">
        <span className="text-madia-gold text-[10px] uppercase tracking-[0.6em] font-bold mb-4 block">Carta Gastronomica</span>
        <h1 className="text-6xl md:text-8xl font-serif text-madia-green font-light italic mb-8">il menù</h1>
        <p className="max-w-2xl mx-auto text-madia-black/50 font-sans text-sm italic">
          Una selezione curata di ingredienti d'eccellenza, frollature d'autore e la passione per la nostra terra, declinata tra innovazione e tradizione.
        </p>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-20 z-30 bg-madia-white/80 backdrop-blur-md py-6 border-y border-black/5 mb-16">
        <div className="max-w-7xl mx-auto px-12 overflow-x-auto">
          <div className="flex justify-center items-center gap-12 min-w-max pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative",
                  activeCategory === cat.id 
                    ? "text-madia-gold" 
                    : "text-madia-black/30 hover:text-madia-black"
                )}
              >
                {cat.label}
                {activeCategory === cat.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-madia-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-12">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group space-y-6"
              >
                <div className="aspect-[4/5] overflow-hidden thin-border bg-madia-black/5 p-2 transition-all duration-700 group-hover:p-0">
                  <div className="w-full h-full relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover grayscale brightness-90 transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {item.isSpecialty && (
                      <div className="absolute top-4 right-4 bg-madia-gold text-madia-green px-3 py-1 text-[8px] uppercase tracking-widest font-black flex items-center gap-1">
                        <Star size={10} fill="currentColor" /> Specialty
                      </div>
                    )}
                    {item.isDaily && (
                      <div className="absolute top-4 left-4 bg-white/90 text-madia-green px-3 py-1 text-[8px] uppercase tracking-widest font-black flex items-center gap-1 backdrop-blur-sm">
                        <Sparkles size={10} /> Daily Selection
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-baseline gap-4">
                    <h3 className="text-xl font-serif text-madia-green group-hover:text-madia-gold transition-colors">{item.name}</h3>
                    <div className="h-[1px] flex-1 bg-madia-gold/20 hidden md:block"></div>
                    <span className="text-sm font-serif text-madia-gold">€{item.price}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-madia-black/50 font-sans italic">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Wine/Allergy Note */}
      <section className="max-w-7xl mx-auto px-12 mt-32 pt-16 border-t border-black/5 text-center space-y-6">
        <p className="text-[10px] uppercase tracking-[0.4em] text-madia-black/30 max-w-2xl mx-auto leading-loose">
          In caso di allergie o intolleranze alimentari, vi invitiamo a consultare il nostro personale di sala per consultare il libro degli ingredienti.
        </p>
        <div className="flex justify-center items-center gap-4">
          <div className="w-8 h-[1px] bg-madia-gold/30"></div>
          <span className="text-madia-gold font-serif italic">Madia Restaurant & Grill</span>
          <div className="w-8 h-[1px] bg-madia-gold/30"></div>
        </div>
      </section>
    </div>
  );
}
