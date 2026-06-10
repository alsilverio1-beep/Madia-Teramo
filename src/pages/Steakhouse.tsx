import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { SEO } from '../components/SEO';
import { steakhouseData } from '../data/steakhouse';
import { cn } from '../lib/utils';
import { Star } from 'lucide-react';

type Section = 'italiane' | 'internazionali' | 'territorio' | 'contorni';

const sections: { id: Section; label: string; subtitle: string }[] = [
  { id: 'italiane',       label: 'Razze Italiane',        subtitle: 'Chianina, Fassona, Marchigiana' },
  { id: 'internazionali', label: 'Razze Internazionali',  subtitle: 'Rubia Gallega, Black Angus, Sashi' },
  { id: 'territorio',     label: 'Dal Territorio',        subtitle: 'Agnello e Maiale Abruzzese' },
  { id: 'contorni',       label: 'Contorni & Salse',      subtitle: 'Accompagnamenti e salse artigianali' },
];

export function Steakhouse() {
  const [activeSection, setActiveSection] = useState<Section>('italiane');
  const { openBooking } = useBooking();

  const sectionItems = steakhouseData.filter(item => item.section === activeSection);
  const subcategories = [...new Set(sectionItems.map(i => i.subcategory))];

  return (
    <>
      <SEO
        title="Steak House — Carni Frollate alla Brace a Teramo"
        description="La Steak House di Madia Teramo: tagli frollati di Chianina, Fassona, Black Angus e Wagyu. Razze italiane e internazionali, cotti alla brace nel cuore di Teramo."
        canonical="/steakhouse"
        breadcrumb={[{ name: 'Steak House', url: '/steakhouse' }]}
      />
    <div className="min-h-screen bg-madia-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-24 lg:pt-28 pb-5 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto p-8 md:p-12 bg-madia-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Text */}
            <div className="lg:col-span-5">
              <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                Steak Selection
              </span>
              <h1 className="text-5xl md:text-7xl text-madia-green font-serif italic mb-6">
                steak house
              </h1>
              <div className="w-16 h-px bg-madia-gold/40 mb-6" />
              <p className="text-madia-black/60 font-sans text-sm leading-relaxed mb-8">
                La <strong style={{fontWeight:'inherit'}}>Steak House di Madia</strong> è un punto di riferimento per gli amanti della <strong style={{fontWeight:'inherit'}}>carne a Teramo</strong>. Selezioniamo razze bovine pregiate — dalle <strong style={{fontWeight:'inherit'}}>Chianine IGP</strong> alle <strong style={{fontWeight:'inherit'}}>Rubia Gallega</strong> fino al <strong style={{fontWeight:'inherit'}}>Sashi Beef</strong> — e curiamo ogni frollatura direttamente in house, per garantire un'esperienza autentica e memorabile ad ogni taglio.
              </p>
              <button
                onClick={openBooking}
                className="inline-block border border-madia-gold text-madia-gold bg-madia-gold/10 px-8 py-4 hover:bg-madia-gold hover:text-madia-green transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-bold"
              >
                Prenota il tuo tavolo
              </button>
            </div>
            {/* Video */}
            <div className="lg:col-span-6 lg:col-start-7 thin-border p-2">
              <div className="overflow-hidden max-h-[380px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-auto block"
                  src="/carne1.mp4"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-madia-green px-6 pt-5 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-madia-white">

          {/* ── Sticky filter ────────────────────────────────── */}
          <div className="sticky top-[76px] z-30 bg-madia-white px-8 md:px-12 pt-8 pb-0">
            <div className="flex justify-center gap-10 md:gap-20 flex-wrap">
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

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <div className="mb-6" />

                <div className="space-y-16">
                  {subcategories.map((sub) => {
                    const items = sectionItems.filter(i => i.subcategory === sub);
                    return (
                      <div key={sub}>
                        <div className="flex items-center gap-6 mb-10">
                          <div className="flex-1 h-px bg-madia-gold/20" />
                          <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-madia-gold">
                            {sub}
                          </span>
                          <div className="flex-1 h-px bg-madia-gold/20" />
                        </div>

                        <div className="grid gap-x-12 gap-y-8 grid-cols-1 md:grid-cols-2">
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
                                  {typeof item.price === 'number' ? `€ ${item.price}` : `€ ${item.price}`}
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
                I prezzi al kg sono indicativi e variano in base al peso del taglio selezionato. Per allergie o intolleranze alimentari, consultare il personale di sala.
              </p>
            </div>

          </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
