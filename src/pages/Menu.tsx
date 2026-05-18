import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { menuData } from '../data/menu';
import { cn } from '../lib/utils';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const allImages = import.meta.glob('/src/carosellomenu/*', { eager: true, as: 'url' });
const carouselImages = Object.values(allImages) as string[];

type Section = 'aperitivo' | 'pranzo' | 'cena' | 'pizze' | 'drink';

const sections: { id: Section; label: string; subtitle: string }[] = [
  { id: 'aperitivo', label: 'Aperitivo', subtitle: 'Ogni giorno dalle 18:00 alle 20:00' },
  { id: 'pranzo',   label: 'Pranzo',    subtitle: 'Lunedì – Sabato, 12:00 – 15:00' },
  { id: 'cena',     label: 'Cena',      subtitle: 'Ogni sera, 19:30 – 23:00' },
  { id: 'pizze',    label: 'Pizze',     subtitle: 'Disponibili a pranzo e cena' },
  { id: 'drink',    label: 'Drink',     subtitle: 'Cocktails, birre e vini al calice' },
];

export function Menu() {
  const [activeSection, setActiveSection] = useState<Section>('pranzo');
  const { openBooking } = useBooking();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (carouselImages.length < 2) return;
    const timer = setInterval(() => {
      setCurrentImg(i => (i + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const sectionItems = menuData.filter(item => item.section === activeSection);
  const subcategories = [...new Set(sectionItems.map(i => i.subcategory))];
  const activeMeta = sections.find(s => s.id === activeSection)!;

  return (
    <div className="min-h-screen bg-madia-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-32 pb-5 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto p-8 md:p-12 bg-madia-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Text */}
            <div className="lg:col-span-5">
              <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                Carta Gastronomica
              </span>
              <h1 className="text-5xl md:text-7xl text-madia-green font-serif italic mb-6">
                il menù
              </h1>
              <div className="w-16 h-px bg-madia-gold/40 mb-6" />
              <p className="text-madia-black/60 font-sans text-sm leading-relaxed mb-8">
                Il <strong style={{fontWeight:'inherit'}}>ristorante Madia di Teramo</strong> propone una carta gastronomica che cambia con le stagioni, nel cuore del centro storico. Dalla <strong style={{fontWeight:'inherit'}}>pizza artigianale</strong> con impasto a 48 ore alle <strong style={{fontWeight:'inherit'}}>carni frollate selezionate</strong>, dai primi piatti della tradizione abruzzese ai cocktail dell'aperitivo: ogni proposta nasce dal rispetto per la materia prima e per il territorio del Gran Sasso.
              </p>
              <button
                onClick={openBooking}
                className="inline-block border border-madia-gold text-madia-gold bg-madia-gold/10 px-8 py-4 hover:bg-madia-gold hover:text-madia-green transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-bold"
              >
                Prenota il tuo tavolo
              </button>
            </div>
            {/* Carousel */}
            <div className="lg:col-span-7 thin-border p-2">
              <div className="relative aspect-[3/2] overflow-hidden">
              {carouselImages.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImg}
                      src={carouselImages[currentImg]}
                      alt={`Piatto Madia Teramo ${currentImg + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Arrows */}
                  {carouselImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImg(i => (i - 1 + carouselImages.length) % carouselImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-madia-gold transition-colors duration-300 text-white"
                      >
                        <ChevronLeft size={18} />
                      </button>
                      <button
                        onClick={() => setCurrentImg(i => (i + 1) % carouselImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-madia-gold transition-colors duration-300 text-white"
                      >
                        <ChevronRight size={18} />
                      </button>

                      {/* Dots */}
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
                        {carouselImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentImg(i)}
                            className={cn(
                              'h-1.5 rounded-full transition-all duration-300',
                              i === currentImg ? 'bg-madia-gold w-4' : 'bg-white/50 w-1.5'
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <img
                  src="/src/chef1.jpg"
                  alt="Lo Chef di Madia"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-madia-green px-6 pt-5 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-madia-white">

          {/* ── Sticky filter inside white box ───────────────── */}
          <div className="sticky top-[76px] z-30 bg-madia-white px-8 md:px-12 pt-8 pb-0">
            <div className="flex justify-center gap-16 md:gap-24">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    'relative pb-5 transition-colors duration-300 group whitespace-nowrap',
                    activeSection === s.id ? 'text-madia-green' : 'text-madia-black/25 hover:text-madia-black/60'
                  )}
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{s.label}</span>
                  {activeSection === s.id && (
                    <motion.span
                      layoutId="filter-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-madia-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-madia-gold/30 to-transparent" />
          </div>

          <div className="p-8 md:p-12 pt-8">

        {/* Section header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6" />

            {/* Subcategories */}
            <div className="space-y-16">
              {subcategories.map((sub) => {
                const items = sectionItems.filter(i => i.subcategory === sub);
                return (
                  <div key={sub}>
                    {/* Subcategory title */}
                    <div className="flex items-center gap-6 mb-10">
                      <div className="flex-1 h-px bg-madia-gold/20" />
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-madia-gold">
                        {sub}
                      </span>
                      <div className="flex-1 h-px bg-madia-gold/20" />
                    </div>

                    {/* Items */}
                    <div className={cn('grid gap-x-12 gap-y-8', activeSection === 'drink' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8 group">
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <h3 className="font-serif text-madia-green text-lg leading-snug group-hover:text-madia-gold transition-colors duration-300">
                                {item.name}
                              </h3>
                              {item.isSpecialty && (
                                <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest font-black text-madia-gold border border-madia-gold/40 px-2 py-0.5">
                                  <Star size={8} fill="currentColor" /> Chef
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-madia-black/70 font-sans italic leading-relaxed max-w-xl">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex md:justify-end items-start pt-0.5">
                            <span className="font-serif text-madia-green text-base whitespace-nowrap">
                              € {item.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coperto */}
            <div className="mt-16">
              <div className="flex items-center gap-6 mb-10">
                <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-madia-gold">Coperto</span>
                <div className="flex-1 h-px bg-madia-gold/20" />
              </div>
              <div className="flex justify-between items-baseline gap-4">
                <div>
                  <h3 className="font-serif text-madia-green text-lg leading-snug mb-1.5">Coperto</h3>
                  <p className="text-[11px] text-madia-black/70 font-sans italic leading-relaxed">Per persona.</p>
                </div>
                <span className="font-serif text-madia-green text-base whitespace-nowrap">€ 3,00</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-black/5 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-madia-black/30 max-w-2xl mx-auto leading-loose">
            In caso di allergie o intolleranze alimentari, vi invitiamo a consultare il nostro personale di sala.
          </p>
        </div>

        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
