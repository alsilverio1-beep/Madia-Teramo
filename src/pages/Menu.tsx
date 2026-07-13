import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { useBooking } from '../context/BookingContext';
import { menuData } from '../data/menu';
import { cn } from '../lib/utils';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Flag } from '../components/Flag';
import { buildMenuJsonLd } from '../lib/menuSchema';

const carouselImages = [
  '/MTcarrist/FOTO-20.jpg',
  '/MTcarrist/FOTO-24.jpg',
  '/MTcarrist/FOTO-29.jpg',
  '/MTcarrist/FOTO-31.jpg',
  '/MTcarrist/FOTO-32.jpg',
  '/MTcarrist/FOTO-36.jpg',
  '/MTcarrist/FOTO-45.jpg',
  '/MTcarrist/FOTO-47.jpg',
  '/MTcarrist/FOTO-76.jpg',
  '/MTcarrist/FOTO-85.jpg',
  '/MTcarrist/FOTO-90.jpg',
  '/MTcarrist/FOTO-94.jpg',
  '/MTcarrist/FOTO-96.jpg',
  '/MTcarrist/FOTO-98.jpg',
  '/MTcarrist/FOTO-101.jpg',
  '/MTcarrist/FOTO-106.jpg',
];

const pizzeSubcategoryMeta: Record<string, { description?: string; note?: string }> = {
  'Padellino': {
    description: 'Percorso evolutivo per la pizza. Impasto idratato all\'85% usando farine 100% italiane macinate a pietra. Lavoriamo in "biga", un pre-fermento di 18 ore a 16 gradi, per rendere il prodotto profumato e friabile contemporaneamente.',
    note: '*Possibilità di richiedere il Padellino per intolleranti al glutine (sovrapprezzo di 2€)',
  },
  'Mini Pala': {
    description: 'Impasto idratato al 90% usando farine 100% italiane macinate a pietra. Lavoriamo in "biga". Per la realizzazione di questo prodotto utilizziamo apposite celle di lievitazione a temperatura controllata che permettono al prodotto finale di essere soffice, croccante e leggero.',
    note: '*Possibilità di scegliere 2 gusti',
  },
  'Pizze al Piatto - Le Nostre Proposte': {
    description: 'Utilizziamo farine 100% italiane macinate a pietra con l\'aggiunta di germe di grano. Impasto maturato 48 ore che rende il prodotto super digeribile.',
  },
};

const aperitivoSubcategoryFootnotes: Record<string, string> = {
  'Signature': 'I drink classici sono disponibili, rivolgersi al barman.',
  'Gintoneria': 'Tutti i nostri gin sono serviti e preparati con tonica Fentimans.',
};

const carneSubcategoryMeta: Record<string, { note?: string }> = {
  'Costate': { note: 'Taglio minimo 1kg' },
  'Entrecote': { note: 'Taglio a scelta' },
};

type Section = 'aperitivo' | 'pranzo' | 'cena' | 'carne' | 'pizze' | 'drink';

const sections: { id: Section; label: string; subtitle: string }[] = [
  { id: 'aperitivo', label: 'Aperitivo', subtitle: 'Ogni giorno dalle 18:00 alle 20:00' },
  { id: 'pranzo',   label: 'Pranzo',    subtitle: 'Lunedì – Venerdì, 12:00 – 15:00' },
  { id: 'cena',     label: 'Cena',      subtitle: 'Ogni sera, 19:30 – 23:00' },
  { id: 'carne',    label: 'Carne',     subtitle: 'Selezione di tagli frollati alla brace' },
  { id: 'pizze',    label: 'Pizze',     subtitle: 'Impasto a 48h, Padellino e Pizza alla Pala' },
  { id: 'drink',    label: 'Drink',     subtitle: 'Cocktails, birre e vini al calice' },
];


function getDefaultSection(): Section {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins >= 11 * 60 && mins < 18 * 60) return 'pranzo';   // 11:00–18:00
  if (mins >= 18 * 60 && mins < 20 * 60) return 'aperitivo'; // 18:00–20:00
  if (mins >= 20 * 60) return 'cena';                        // 20:00–23:59
  return 'pranzo';                                           // 00:00–11:00 (notte/mattina)
}

export function Menu() {
  const [searchParams] = useSearchParams();
  const urlSection = searchParams.get('section') as Section | null;
  const initialSection: Section =
    urlSection && sections.some(s => s.id === urlSection) ? urlSection : getDefaultSection();
  const [activeSection, setActiveSection] = useState<Section>(initialSection);
  const { openBooking } = useBooking();
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (searchParams.get('section')) {
      setTimeout(() => {
        document.getElementById('menu-content')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, []);

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

  const menuJsonLd = buildMenuJsonLd(
    menuData,
    Object.fromEntries(sections.map(s => [s.id, s.label])),
  );

  return (
    <>
      <SEO
        title="Menu Ristorante — Pranzo, Cena e Aperitivo"
        description="Scopri il menu di Madia Teramo: antipasti, primi, secondi, aperitivo dalle 18:00, selezione di carni frollate alla brace e cocktails. Ingredienti freschi e di qualità."
        canonical="/menu"
        breadcrumb={[{ name: 'Menu', url: '/menu' }]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(menuJsonLd)}</script>
      </Helmet>
    <div className="min-h-screen bg-madia-white">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pt-28 lg:pt-28 pb-5 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto py-8 px-4 md:p-12 bg-madia-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
            {/* Text */}
            <div className="lg:col-span-6 flex flex-col border-l border-madia-gold/30 pl-4 lg:pl-8">
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
              <div className="mt-auto pt-6 border-t border-madia-gold/20 flex justify-center lg:justify-start">
                <button onClick={openBooking} className="group flex items-end gap-3">
                  <div className="text-left">
                    <span className="block text-[8px] uppercase tracking-[0.5em] text-madia-gold mb-1.5">Riserva il tuo posto</span>
                    <span className="block font-serif italic text-madia-green text-xl leading-none group-hover:text-madia-gold transition-colors duration-300">
                      Prenota il tuo tavolo
                    </span>
                  </div>
                  <span className="flex items-center gap-0.5 mb-0.5">
                    <span className="block w-6 h-px bg-madia-gold group-hover:w-10 transition-all duration-500" />
                    <span className="block w-1.5 h-1.5 rotate-45 border-t border-r border-madia-gold -ml-1.5" />
                  </span>
                </button>
              </div>
            </div>
            {/* Carousel */}
            <div className="lg:col-span-6 thin-border p-2 h-full">
              <div className="relative h-full min-h-[320px] overflow-hidden">
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
                  src="/chef1.jpg"
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
          <div id="menu-content" className="md:sticky md:top-[88px] md:z-30 bg-madia-white px-8 md:px-12 pt-8 pb-0">
            {/* Mobile: verticale */}
            <div className="flex flex-col md:hidden border border-madia-gold/20 mb-4">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={cn(
                    'relative px-5 py-3.5 text-left border-b border-madia-gold/15 last:border-b-0 transition-colors duration-300',
                    activeSection === s.id ? 'bg-madia-green text-madia-white' : 'text-madia-black/40 hover:text-madia-black/70'
                  )}
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">{s.label}</span>
                  {activeSection === s.id && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-madia-gold" />
                  )}
                </button>
              ))}
            </div>
            {/* Desktop: orizzontale */}
            <div className="hidden md:flex overflow-x-auto scrollbar-none justify-start md:justify-center gap-8 md:gap-16 lg:gap-24">
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
            <div className="hidden md:block h-px bg-gradient-to-r from-transparent via-madia-gold/30 to-transparent" />
          </div>

          <div className="p-8 md:p-12 pt-8">

        {/* Section content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-3" />

            {activeSection === 'pranzo' && (
              <div className="relative mb-16 max-w-xl mx-auto border border-madia-gold/30 px-8 py-10 md:px-12">
                <span className="absolute -top-px -left-px w-4 h-4 border-t border-l border-madia-gold" />
                <span className="absolute -top-px -right-px w-4 h-4 border-t border-r border-madia-gold" />
                <span className="absolute -bottom-px -left-px w-4 h-4 border-b border-l border-madia-gold" />
                <span className="absolute -bottom-px -right-px w-4 h-4 border-b border-r border-madia-gold" />

                <div className="flex items-center gap-4 mb-6 justify-center">
                  <span className="w-8 h-px bg-madia-gold/40" />
                  <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-madia-gold whitespace-nowrap">Formula Pranzo</span>
                  <span className="w-8 h-px bg-madia-gold/40" />
                </div>

                <p className="text-center text-sm text-madia-black/55 font-sans leading-relaxed font-serif italic">
                  Scegli tra i nostri menù fissi oppure scegli i nostri fuori menù.<br />
                  Acqua 0,5 e Coperto li offriamo noi!!!
                </p>

                <div className="flex items-center justify-center gap-2 my-6">
                  <span className="block w-10 h-px bg-madia-gold/40" />
                  <span className="block w-1.5 h-1.5 rotate-45 border-t border-r border-madia-gold" />
                  <span className="block w-10 h-px bg-madia-gold/40" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs uppercase tracking-[0.15em] text-madia-green font-serif whitespace-nowrap">Antipasto + Primo o Secondo</span>
                    <span className="flex-1 border-b border-dotted border-madia-gold/40 translate-y-[-3px]" />
                    <span className="font-serif text-madia-green text-base whitespace-nowrap">15 €</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs uppercase tracking-[0.15em] text-madia-green font-serif whitespace-nowrap">Primo + Secondo</span>
                    <span className="flex-1 border-b border-dotted border-madia-gold/40 translate-y-[-3px]" />
                    <span className="font-serif text-madia-green text-base whitespace-nowrap">20 €</span>
                  </div>
                </div>
              </div>
            )}

            {/* Subcategories */}
            <div className="space-y-16">
              {subcategories.map((sub) => {
                const items = sectionItems.filter(i => i.subcategory === sub);
                return (
                  <div key={sub}>
                    {sub === 'Birre alla Spina' && activeSection !== 'aperitivo' && activeSection !== 'drink' && (
                      <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl text-madia-green font-serif italic lowercase">bevande</h2>
                      </div>
                    )}
                    <div className="flex items-center gap-6 mb-10">
                      <div className="flex-1 h-px bg-madia-gold/20" />
                      <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-madia-gold">{sub}</span>
                      <div className="flex-1 h-px bg-madia-gold/20" />
                    </div>
                    {activeSection === 'pizze' && pizzeSubcategoryMeta[sub]?.description && (
                      <div className="mb-10 -mt-2 text-center max-w-2xl mx-auto">
                        <p className="text-sm text-madia-black/55 font-sans leading-relaxed font-serif italic">{pizzeSubcategoryMeta[sub].description}</p>
                        {pizzeSubcategoryMeta[sub].note && (
                          <p className="text-[11px] text-madia-black/35 font-sans italic mt-3">{pizzeSubcategoryMeta[sub].note}</p>
                        )}
                      </div>
                    )}
                    {activeSection === 'carne' && carneSubcategoryMeta[sub]?.note && (
                      <div className="mb-10 -mt-2 text-center">
                        <p className="text-[11px] uppercase tracking-[0.3em] text-madia-black/35 font-sans">{carneSubcategoryMeta[sub].note}</p>
                      </div>
                    )}
                    <div className={cn('grid gap-x-12 gap-y-8', activeSection === 'drink' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2')}>
                      {items.map((item) => (
                        <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8 group">
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <h3 className="font-serif text-madia-green text-lg leading-snug group-hover:text-madia-gold transition-colors duration-300 flex items-center gap-2">
                                {item.name}
                                {item.flag && <Flag code={item.flag} />}
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
                            {item.note && (
                              <p className="text-[10px] text-madia-gold/80 font-sans uppercase tracking-widest mt-1">
                                {item.note}
                              </p>
                            )}
                          </div>
                          <div className="flex md:justify-end items-start pt-0.5 gap-4">
                            {item.prices ? (
                              item.prices.map((p, idx) => (
                                <span key={idx} className="font-serif text-madia-green text-base whitespace-nowrap">
                                  € {p}
                                </span>
                              ))
                            ) : item.price !== undefined ? (
                              <span className="font-serif text-madia-green text-base whitespace-nowrap">
                                {typeof item.price === 'number' || /^[0-9]/.test(String(item.price)) ? `€ ${item.price}` : item.price}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ))}
                    </div>
                    {(activeSection === 'aperitivo' || activeSection === 'drink') && aperitivoSubcategoryFootnotes[sub] && (
                      <p className="text-[11px] text-madia-black/35 font-sans italic text-center mt-10">
                        {aperitivoSubcategoryFootnotes[sub]}
                      </p>
                    )}
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
                <span className="font-serif text-madia-green text-base whitespace-nowrap">€ 2,50</span>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Contenuto delle altre 5 sezioni, sempre presente nel markup ma nascosto via CSS.
            Nessun impatto visivo (identico a display:none): serve solo perché Google veda
            sempre tutti i piatti/prezzi del menu, non solo quelli della scheda aperta al
            momento della visita (che varia in base all'ora del giorno). */}
        <div className="hidden">
          {sections
            .filter((s) => s.id !== activeSection)
            .map((s) => {
              const items = menuData.filter((item) => item.section === s.id);
              const subs = [...new Set(items.map((i) => i.subcategory))];
              return (
                <div key={s.id}>
                  <h2>{s.label}</h2>
                  {subs.map((sub) => (
                    <div key={sub}>
                      <h3>{sub}</h3>
                      {items
                        .filter((i) => i.subcategory === sub)
                        .map((item) => (
                          <div key={item.id}>
                            <span>{item.name}</span>
                            <p>{item.description}</p>
                            {item.prices ? (
                              item.prices.map((p, idx) => <span key={idx}>€ {p}</span>)
                            ) : item.price !== undefined ? (
                              <span>{typeof item.price === 'number' ? `€ ${item.price}` : item.price}</span>
                            ) : null}
                          </div>
                        ))}
                    </div>
                  ))}
                </div>
              );
            })}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-black/5 text-center space-y-4">
          <p className="text-[10px] uppercase tracking-[0.4em] text-madia-black/30 max-w-2xl mx-auto leading-loose">
            In caso di allergie o intolleranze alimentari, vi invitiamo a consultare il nostro personale di sala.
          </p>
          <p className="text-[11px] text-madia-black/40 font-sans italic">
            *Richiedi la carta vini al personale
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
