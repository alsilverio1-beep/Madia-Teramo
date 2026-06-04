import { useState, useEffect } from 'react';
import { menuData } from '../data/menu';
import { useBooking } from '../context/BookingContext';
import { Star, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { SEO } from '../components/SEO';

const carouselImages = [
  '/pizzeria/carpizza1.jpg',
  '/pizzeria/carpizza2.jpg',
  '/pizzeria/carpizza3.jpg',
  '/pizzeria/carpizza4.jpg',
  '/pizzeria/carpizza5.jpg',
];

const padelloItems = [
  { id: 'pd-1', name: 'Margherita Padellino', description: 'Pomodoro San Marzano, fior di latte di Agerola, basilico fresco e olio EVO.', price: 12 },
  { id: 'pd-2', name: 'Crudo e Stracciatella', description: 'Base bianca, stracciatella pugliese, prosciutto crudo di Norcia, rucola e glassa di aceto balsamico.', price: 16, isSpecialty: true },
  { id: 'pd-3', name: 'Diavola Croccante', description: 'Pomodoro San Marzano, fior di latte, salame piccante calabrese, nduja e miele di castagno.', price: 14 },
  { id: 'pd-4', name: 'Funghi e Tartufo', description: 'Base bianca, funghi porcini trifolati, provola affumicata, scaglie di tartufo nero e olio al tartufo.', price: 18, isSpecialty: true },
  { id: 'pd-5', name: 'Amatriciana Madia', description: 'Pomodoro San Marzano, guanciale croccante, pecorino Romano DOP e peperoncino.', price: 15 },
  { id: 'pd-6', name: 'Zucca e Salsiccia', description: 'Base bianca, crema di zucca, salsiccia artigianale, scamorza affumicata e semi di zucca tostati.', price: 14 },
];

const pizzaItems = menuData.filter(i => i.section === 'pizze');
const subcategories = [...new Set(pizzaItems.map(i => i.subcategory))];

const sections = [
  {
    key: 'padellino',
    label: 'Il Padellino',
    description: 'Impasto idratato all\'85% con farine 100% italiane macinate a pietra. Lavoriamo in "biga", un pre-fermento di 18 ore a 16 gradi, per rendere il prodotto profumato e friabile contemporaneamente.',
    note: '*Possibilità di richiedere il Padellino per intolleranti al glutine (sovrapprezzo di 3€)',
    items: padelloItems,
  },
  ...subcategories.map(sub => ({
    key: sub.toLowerCase(),
    label: sub,
    description: null,
    note: null,
    items: pizzaItems.filter(i => i.subcategory === sub),
  })),
];

function MenuItem({ item }: { item: typeof padelloItems[0] }) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-8 group py-4 border-b border-madia-black/5 last:border-0">
      <div>
        <div className="flex items-center gap-3 mb-1.5">
          <h3 className="font-serif text-madia-green text-lg leading-snug group-hover:text-madia-gold transition-colors duration-300">
            {item.name}
          </h3>
          {(item as any).isSpecialty && (
            <span className="flex items-center gap-1 text-[8px] uppercase tracking-widest font-black text-madia-gold border border-madia-gold/40 px-2 py-0.5">
              <Star size={8} fill="currentColor" /> Chef
            </span>
          )}
        </div>
        <p className="text-[11px] text-madia-black/70 font-sans italic leading-relaxed">
          {item.description}
        </p>
      </div>
      <div className="flex justify-end items-start pt-1">
        <span className="font-serif text-madia-green text-base whitespace-nowrap">€ {item.price}</span>
      </div>
    </div>
  );
}

export function MenuPizza() {
  const { openBooking } = useBooking();
  const [current, setCurrent] = useState(0);
  const [openSection, setOpenSection] = useState<string>('padellino');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <SEO
        title="Pizzeria — Pizza Padellino e alla Pala a Teramo"
        description="La pizzeria di Madia Teramo: pizza padellino con impasto all'85% di idratazione e biga 18 ore, farine 100% italiane macinate a pietra. Scopri tutte le proposte."
        canonical="/menu-pizza"
      />
      <div className="min-h-screen bg-madia-white">

        {/* Hero */}
        <section className="pt-32 pb-5 px-6 bg-madia-green">
          <div className="max-w-7xl mx-auto p-8 md:p-12 bg-madia-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">
              <div className="lg:col-span-6 flex flex-col">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                  Pizzeria
                </span>
                <h1 className="text-5xl md:text-7xl text-madia-green font-serif italic mb-6">
                  le nostre proposte
                </h1>
                <div className="w-16 h-px bg-madia-gold/40 mb-6" />
                <p className="text-madia-black/60 font-sans text-sm leading-relaxed mb-8">
                  La nostra carta delle pizze nasce da una ricerca continua su impasti, farine e abbinamenti. Il <strong style={{fontWeight:'inherit'}}>Padellino</strong> è la nostra proposta distintiva: una base croccante fuori e morbida dentro, frutto di un processo artigianale attento. Accanto ad esso trovi le <strong style={{fontWeight:'inherit'}}>Classiche</strong>, nelle versioni Rosse e Bianche, e le <strong style={{fontWeight:'inherit'}}>Speciali</strong> dello chef, con ingredienti selezionati e abbinamenti fuori dall'ordinario.
                </p>
                <div className="mt-auto pt-6 border-t border-madia-gold/20">
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
              <div className="lg:col-span-6 thin-border p-2 h-full">
                <div className="relative h-full min-h-[320px] overflow-hidden">
                  {carouselImages.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Pizza Madia Teramo ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}
                  <button
                    onClick={() => setCurrent(i => (i - 1 + carouselImages.length) % carouselImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-madia-gold text-white flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrent(i => (i + 1) % carouselImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/30 hover:bg-madia-gold text-white flex items-center justify-center transition-all duration-300"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {carouselImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-madia-gold w-4' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Accordion */}
        <div className="bg-madia-green px-6 pt-5 pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-madia-white p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">

                {/* Left column — category list */}
                <div className="border-r border-madia-black/10 pr-8 lg:pr-12">
                  <p className="text-[9px] uppercase tracking-[0.4em] text-madia-gold mb-6 text-center">Categorie</p>
                  <div className="space-y-1">
                    {sections.map(section => {
                      const isOpen = openSection === section.key;
                      return (
                        <button
                          key={section.key}
                          onClick={() => setOpenSection(isOpen ? '' : section.key)}
                          className={`w-full flex items-center justify-between py-4 px-4 transition-all duration-300 group ${
                            isOpen
                              ? 'bg-madia-green text-madia-white'
                              : 'text-madia-green hover:bg-madia-black/5'
                          }`}
                        >
                          <span className={`font-serif text-xl transition-colors duration-300 ${isOpen ? 'text-madia-white' : 'text-madia-green'}`}>
                            {section.label}
                          </span>
                          <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-300 ${
                            isOpen
                              ? 'border-madia-gold text-madia-gold'
                              : 'border-madia-green/30 text-madia-green group-hover:border-madia-gold group-hover:text-madia-gold'
                          }`}>
                            {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right column — items */}
                <div className="lg:pl-12 pt-8 lg:pt-0">
                  {sections.map(section => {
                    if (openSection !== section.key) return null;
                    return (
                      <div key={section.key}>
                        <p className="text-[9px] uppercase tracking-[0.4em] text-madia-gold mb-2">{section.label}</p>
                        {section.description && (
                          <p className="text-sm text-madia-black/60 font-sans leading-relaxed mb-2">
                            {section.description}
                          </p>
                        )}
                        {section.note && (
                          <p className="text-xs text-madia-black/40 font-sans italic mb-6">{section.note}</p>
                        )}
                        <div className="mt-4">
                          {section.items.map((item: any) => (
                            <MenuItem key={item.id} item={item} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {!openSection && (
                    <div className="flex items-center justify-center h-full min-h-[200px]">
                      <p className="text-madia-black/30 font-serif italic text-lg">Seleziona una categoria</p>
                    </div>
                  )}
                </div>

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

              {/* Footer note */}
              <div className="mt-10 pt-8 border-t border-black/5 text-center">
                <p className="text-[10px] uppercase tracking-[0.4em] text-madia-black/30 max-w-2xl mx-auto leading-loose">
                  In caso di allergie o intolleranze alimentari, vi invitiamo a consultare il nostro personale di sala.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
