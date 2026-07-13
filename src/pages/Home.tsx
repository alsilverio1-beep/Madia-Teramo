import React, { useEffect, useState, useRef, FormEvent } from 'react';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Phone, Mail, Instagram, MapPin, Facebook, Clock, Star, CalendarDays, UtensilsCrossed } from 'lucide-react';

const googleReviews = [
  {
    name: 'Roberto Lazzaro',
    date: '8 mesi fa',
    rating: 5,
    text: 'Situato nel cuore del centro storico di Teramo, la location esterna è molto suggestiva e c\'è davvero una bella atmosfera, servizio impeccabile e piatti veramente ottimi, in particolare il bao di pollo, la fresella di tonno e anche il panino americano che era di ottima qualità, tra i migliori se non il migliore di Teramo. L\'unica cosa è che le porzioni sono un po\' troppo piccole rapportata ai prezzi sicuramente non propriamente bassi. Consigliato per passare una piacevole serata con ottimi piatti.',
  },
  {
    name: 'khaleesi ms1992',
    date: 'un anno fa',
    rating: 5,
    text: 'Esperienza culinaria straordinaria! Questo ristorante sorprende con piatti innovativi e deliziosi, a partire dal loro padellino: una focaccia con lievitazione perfetta, morbida dentro, croccante fuori, farcita con ingredienti freschissimi. Gli antipasti sono spettacolari, dal baho ripieno di carne, al bombolone salato con ragù, ai ravioli cinesi rivisitati in chiave italiana, un vero viaggio di sapori. 5 stelle sono persino poche! Prezzi assolutamente giusti per la qualità offerta. Imperdibile!',
  },
  {
    name: 'Gabriele Leone',
    date: '8 mesi fa',
    rating: 5,
    text: 'Pizza con bufala eccellente! Croccante e materie prime di qualità. Servizio cortese e rapido. Esperienza molto positiva.',
  },
  {
    name: 'Silvia',
    date: '2 anni fa',
    rating: 5,
    text: 'Siamo stati per la prima volta questa sera e la cena prevedeva un menù di degustazioni fisso per San Valentino. Inutile dire che torneremo: cibo di ottima qualità, la pizza al padellino una nuvola di leggerezza (da provare assolutamente l\'impasto ai cereali con carpaccio di black angus, crema di parmigiano, air bag di patate e polvere di lampone); location molto moderna, piuttosto accogliente; camerieri gentili e molto cortesi. Unica nota "dolente", ambiente leggermente freddo, avrei gradito qualche grado in più. Per il resto, anche i dolci consigliati, è stato un vero piacere!',
  },
  {
    name: 'Jessica D.C.',
    date: '3 mesi fa',
    rating: 3,
    text: 'Siamo stati a cena con amici. Locale pulito e accogliente. La pizza purtroppo non mi è piaciuta..ma la carne era buona! Servizio veloce.',
  },
  {
    name: 'Yuri Sistilli',
    date: '3 anni fa',
    rating: 4,
    text: 'Locale piccolo ma elegante e ben curato. Siamo stati in occasione della festa della donna con menù fisso pensato per l\'occasione: antipasti gourmet molto buoni, ben impiattati ed eleganti accompagnati da pane appena sfornato, tre degustazioni di pizza padellino con impasti leggeri e fragranti (uno più buono dell\'altro) farcite con ingredienti di ottima qualità, dolce per mio gusto personale un po\' stucchevole. Personale gentile, servizio veloce e prezzi nella norma. Torneremo sicuramente presto.',
  },
  {
    name: 'Adele Cortellessa',
    date: '3 mesi fa',
    rating: 5,
    text: 'Bel locale, cameriera bravissima pronta a soddisfare tutte le richieste, piatti sfiziosi e prezzi ottimi. Molta cura ed attenzione per il senza glutine. Lo consiglio vivamente!!!',
  },
  {
    name: 'Fabio Cesano',
    date: '2 anni fa',
    rating: 5,
    text: 'Ristorante moderno e molto curato in centro a Teramo. L\'abbiamo scoperto per caso su Google e siamo stati molto soddisfatti di averlo scelto. Nel menu potete trovare tanti piatti buoni e le pizze classiche ma anche alla pala e padellino. Noi abbiamo preso i frittini come antipasto e diverse stuzzicherie insieme ad una pala Tre pomodori. Piatti davvero molto buoni e saporiti e qualità davvero alta. I frittini sono super consigliati; davvero wow. La cameriera adorabile e molto gentile e il conto non è per niente caro.',
  },
  {
    name: 'Lucia Mosca',
    date: '7 mesi fa',
    rating: 4,
    text: 'Io e le mie colleghe abbiamo deciso di prenotare in questo ristorante situato nel cuore di Teramo, e l\'esperienza è stata complessivamente positiva. Il locale è accogliente e curato. Il personale si è mostrato un po\' assente in alcuni momenti, ma comunque sempre cordiale e disponibile. La pizza si è rivelata gustosa e ben presentata. L\'antipasto di fritti è stato abbondante e variegato, con delle olive ascolane davvero conquista. Un punto a favore è stato il tiramisù senza lattosio, una vera rarità. In generale, il ristorante ha ottimi piatti e un\'ottima posizione.',
  },
  {
    name: 'Viviana Arcangeli',
    date: '2 anni fa',
    rating: 5,
    text: 'Locale in centro a Teramo, con tavolini all\'aperto. Personale efficiente ed attento. Menù con proposte varie ed interessanti, fuori dal comune rispetto alla media e di ottima qualità. Decisamente da provare la tartare di gambero rosso. Rapporto qualità / prezzo assolutamente corretto — rispetto alla media della zona livello di prezzo medio/alto, ma assolutamente giustificato dall\'offerta sia come varietà che come qualità.',
  },
  {
    name: 'Elena Matricardi',
    date: '4 mesi fa',
    rating: 3,
    text: 'Per il locale molto curato le aspettative erano più alte sul menu. Le pizze discrete e buon servizio.',
  },
  {
    name: 'Gabriella Cozzi',
    date: '6 mesi fa',
    rating: 5,
    text: 'Posto molto più alto delle aspettative. Pizza, per una persona intollerante come me, a dir poco fantastica. Spero di tornarci presto.',
  },
];
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { QuoteModal } from '../components/QuoteModal';
import { SEO } from '../components/SEO';

export function Home() {
  const { openBooking } = useBooking();
  const location = useLocation();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [contactConsent, setContactConsent] = useState(false);
  const [contactNome, setContactNome] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTel, setContactTel] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const { status: contactStatus, errorMsg: contactError, submit: submitContatto } = useFormSubmit('/api/contatto');
  const [reviewPaused, setReviewPaused] = useState(false);
  const [reviewExpanded, setReviewExpanded] = useState<Set<number>>(new Set());
  const [reviewOverflow, setReviewOverflow] = useState<Set<number>>(new Set());
  const reviewParaRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reviewTrackRef = useRef<HTMLDivElement>(null);
  const reviewAnimRef = useRef<number>(0);
  const reviewLastTs = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollStart = useRef(0);

  const toggleReviewExpanded = (idx: number) => {
    setReviewExpanded(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  useEffect(() => {
    const next = new Set<number>();
    reviewParaRefs.current.forEach((el, idx) => {
      if (el && el.scrollHeight > el.clientHeight) next.add(idx);
    });
    setReviewOverflow(next);
  }, []);

  useEffect(() => {
    const track = reviewTrackRef.current;
    if (!track || reviewPaused) return;
    reviewLastTs.current = 0;
    const animate = (ts: number) => {
      if (!isDragging.current) {
        if (reviewLastTs.current !== 0) {
          const elapsed = ts - reviewLastTs.current;
          track.scrollLeft += 80 * elapsed / 1000;
          if (track.scrollLeft >= track.scrollWidth / 2) {
            track.scrollLeft -= track.scrollWidth / 2;
          }
        }
        reviewLastTs.current = ts;
      } else {
        reviewLastTs.current = 0;
      }
      reviewAnimRef.current = requestAnimationFrame(animate);
    };
    reviewAnimRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(reviewAnimRef.current);
  }, [reviewPaused]);

  const onReviewMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragScrollStart.current = reviewTrackRef.current?.scrollLeft ?? 0;
  };

  const onReviewMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !reviewTrackRef.current) return;
    const dx = e.clientX - dragStartX.current;
    reviewTrackRef.current.scrollLeft = dragScrollStart.current - dx;
    const half = reviewTrackRef.current.scrollWidth / 2;
    if (reviewTrackRef.current.scrollLeft < 0) reviewTrackRef.current.scrollLeft += half;
    if (reviewTrackRef.current.scrollLeft >= half) reviewTrackRef.current.scrollLeft -= half;
  };

  const onReviewMouseUp = () => { isDragging.current = false; };


  useEffect(() => {
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <>
      <SEO
        title="Ristorante e Pizzeria a Teramo — Centro Storico"
        description="Madia è il ristorante e pizzeria in Piazza Sant'Agostino 9/10, Teramo. Cucina contemporanea, pizza padellino con biga 18 ore, steak house e aperitivo ogni giorno dalle 18:00."
        canonical="/"
      />
    <div className="overflow-hidden">
      {/* 1. Hero Section & Carousel */}
      <section className="relative h-screen flex items-center bg-[#062a22] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/hero1-poster.jpg"
            width={540}
            height={960}
            className="w-full h-full object-cover"
            src="/hero1.mp4"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#062a22] via-transparent to-transparent opacity-80"></div>
          <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(6,42,34,0.55) 0%, transparent 100%)'}}></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl flex flex-col items-center gap-5 mt-16"
          >
            <img
              src="/mtlogo-removebg-preview.png"
              alt="Madia Teramo"
              fetchPriority="high"
              className="h-24 md:h-36 w-auto object-contain drop-shadow-2xl"
            />
            <div className="flex items-center gap-3 text-madia-white/80 text-[9px] uppercase tracking-[0.4em]">
              <span>Ristorante</span>
              <span className="text-madia-gold">·</span>
              <span>Pizzeria</span>
              <span className="text-madia-gold">·</span>
              <span>Drink</span>
            </div>
            <p className="text-madia-white/85 text-xs md:text-sm font-serif italic leading-loose tracking-widest text-center max-w-xs">
              Ci sono gesti semplici che raccontano tutto.<br />Un piatto condiviso, una risata sincera,<br />il piacere di assaporare insieme.
            </p>
            <div className="w-16 h-px bg-madia-gold opacity-70"></div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={openBooking}
                className="group flex items-center justify-center gap-3 border-2 border-madia-gold text-madia-white bg-madia-gold/40 w-64 py-4 hover:bg-madia-gold hover:text-madia-green transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[10px] whitespace-nowrap"
              >
                <CalendarDays size={13} className="opacity-80 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
                Prenota il tuo tavolo
              </button>
              <Link
                to="/menu"
                className="group flex items-center justify-center gap-3 border-2 border-madia-gold text-madia-white bg-madia-gold/40 w-64 py-4 hover:bg-madia-gold hover:text-madia-green transition-all duration-500 font-bold uppercase tracking-[0.2em] text-[10px] whitespace-nowrap"
              >
                <UtensilsCrossed size={13} className="opacity-80 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1.5} />
                Consulta il menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Chi Siamo Section */}
      <section id="chi-siamo" className="pt-10 pb-20 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto bg-madia-white py-8 px-4 md:p-12 space-y-12 lg:space-y-20">

          {/* Block 1: media sinistra — testo destra */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="order-2 lg:order-1 flex flex-col justify-between gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[2/3] thin-border p-2">
                  <img src="/MTrist/1.jpg" loading="lazy" className="w-full h-full object-cover" alt="Ristorante Madia Teramo" />
                </div>
                <div className="aspect-[2/3] thin-border p-2 mt-6">
                  <img src="/MTrist/2.jpg" loading="lazy" className="w-full h-full object-cover" alt="Lo chef di Madia Teramo" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu"
                  className="border-2 border-madia-gold bg-madia-green text-madia-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-green/80 transition-all duration-500 text-center"
                >
                  🍽️ Consulta il menù
                </Link>
                <button
                  onClick={openBooking}
                  className="border-2 border-madia-gold bg-madia-green text-madia-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-green/80 transition-all duration-500 text-center"
                >
                  🗓️ Prenota un tavolo
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-4 lg:pl-8">
              <div className="mb-8">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Chi Siamo</span>
                <h2 className="text-5xl md:text-7xl text-madia-green font-serif lowercase italic">il ristorante</h2>
              </div>
              <p>
                Madia è il ristorante in Piazza Sant'Agostino, 10, nel cuore del centro storico di Teramo. Un luogo dove tradizione abruzzese e cucina contemporanea si incontrano, con un'offerta gastronomica completa: dal pranzo alla cena, e un menù dedicato all'aperitivo ogni giorno dalle 18 alle 20.
              </p>
              <p>
                Rinomata per le sue <strong style={{fontWeight:'inherit'}}>pizze artigianali</strong> e per l'eccellenza della <strong style={{fontWeight:'inherit'}}>Steak House</strong>, Madia propone carni selezionate e frollate con cura, pensate per chi cerca qualità autentica a Teramo. Ogni ingrediente proviene dal territorio, ogni piatto è un invito a scoprire il meglio dell'Abruzzo.
              </p>
              <p>
                Il nostro menù cambia seguendo le stagioni e i ritmi della terra abruzzese. La mattina il team seleziona le materie prime dai produttori locali, i contadini del Gran Sasso e gli allevatori della provincia di Teramo, per garantire freschezza e autenticità in ogni piatto servito.
              </p>
            </div>
          </div>

          {/* Block 2: testo sinistra — media destra */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="order-2 lg:order-1 space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-4 lg:pl-8">
              <p>
                La <strong style={{fontWeight:'inherit'}}>Steak House di Madia</strong> è oggi un punto di riferimento per gli amanti della <strong style={{fontWeight:'inherit'}}>carne a Teramo</strong> e in tutto l'Abruzzo. Le nostre frollature, curate direttamente dallo chef, esaltano il sapore naturale di razze bovine pregiate, servite alla brace con contorni stagionali e salse artigianali.
              </p>
              <p>
                Le <strong style={{fontWeight:'inherit'}}>pizze di Madia</strong> sono preparate con impasto a lunga lievitazione, farine selezionate e ingredienti del territorio. Che tu scelga una classica margherita o una creazione dello chef, ogni pizza è il risultato di un processo artigianale attento e rispettoso della tradizione napoletana rivisitata in chiave abruzzese.
              </p>
              <p>
                Cerchi un <strong style={{fontWeight:'inherit'}}>ristorante a Teramo</strong> per una cena romantica, un pranzo di lavoro o una serata con amici? Da Madia trovi un ambiente curato, un servizio attento e una cucina che non delude. Prenota il tuo tavolo e lasciati sorprendere.
              </p>
            </div>
            <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
              <div className="aspect-[2/3] thin-border p-2">
                <img src="/MTrist/FOTO-44.jpg" loading="lazy" className="w-full h-full object-cover" alt="Ristorante Madia Teramo" />
              </div>
              <div className="aspect-[2/3] thin-border p-2 mt-6">
                <img src="/MTrist/FOTO-60.jpg" loading="lazy" className="w-full h-full object-cover" alt="Cucina Madia Teramo" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Pizzeria Section */}
      <section id="pizzeria" className="bg-madia-white pt-10 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-madia-green py-8 px-4 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

            {/* Testo sinistra */}
            <div className="order-1 lg:order-1 flex flex-col text-madia-white/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-4 lg:pl-8">
              <div className="mb-8">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Pizzeria</span>
                <h2 className="text-5xl md:text-7xl text-madia-white font-serif lowercase italic">il nostro padellino</h2>
              </div>
              <div className="space-y-6">
              <p>
                La parola <strong style={{fontWeight:'inherit'}}>"Madia"</strong> si riferisce tradizionalmente al contenitore di legno per la lavorazione della farina e la preparazione dell'impasto — simbolo di panificazione artigianale e convivialità. È da qui che nasce la nostra filosofia della pizza.
              </p>
              <p>
                Il nostro <strong style={{fontWeight:'inherit'}}>Pizza Padellino</strong> è un percorso evolutivo: impasto idratato all'<strong style={{fontWeight:'inherit'}}>85%</strong> con farine 100% italiane macinate a pietra. Lavoriamo in <strong style={{fontWeight:'inherit'}}>"biga"</strong>, un pre-fermento di 18 ore a 16 gradi, per ottenere un prodotto profumato e friabile allo stesso tempo.
              </p>
              <p>
                Utilizziamo solo <strong style={{fontWeight:'inherit'}}>farine di alta qualità</strong> provenienti da mulini artigianali con metodi tradizionali: farine integrali, di cereali e semi-integrali, ricche di nutrienti. La lievitazione è naturale con <strong style={{fontWeight:'inherit'}}>lievito fresco</strong>, per una morbidezza e una fragranza ineguagliabili.
              </p>
              <p className="text-madia-white/50 text-xs italic">
                *Possibilità di richiedere il Padellino per <strong style={{fontWeight:'inherit'}}>intolleranti al glutine</strong> (sovrapprezzo di 3€)
              </p>
              </div>
              {/* Pulsanti — dentro la colonna testo, spinti in fondo */}
              <div className="mt-auto pt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu?section=pizze"
                  className="border-2 border-madia-gold bg-madia-white text-madia-green px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-white/80 transition-all duration-500 text-center"
                >
                  🍽️ Consulta il menù pizza
                </Link>
                <button
                  onClick={openBooking}
                  className="border-2 border-madia-gold bg-madia-white text-madia-green px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-white/80 transition-all duration-500 text-center"
                >
                  🗓️ Prenota un tavolo
                </button>
              </div>
            </div>

            {/* Media destra */}
            <div className="order-2 lg:order-2 grid grid-cols-2 lg:grid-cols-[1fr_2fr] gap-4 h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="flex-1 thin-border p-2 overflow-hidden">
                  <img
                    src="/MTpizzeria/FOTO-4.jpg"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    alt="Pizzeria Madia Teramo"
                  />
                </div>
                <div className="flex-1 thin-border p-2 overflow-hidden">
                  <img
                    src="/MTpizzeria/FOTO-45.jpg"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    alt="Pizzeria Madia Teramo"
                  />
                </div>
              </div>
              <div className="thin-border p-2 h-full overflow-hidden">
                <img
                  src="/MTpizzeria/FOTO-53.jpg"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  alt="Pizzeria Madia Teramo"
                />
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* 4. Steak House (Polished Preview) */}
      <section id="steakhouse" className="bg-madia-green pt-10 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-madia-white py-8 px-4 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
           <div className="order-2 lg:order-1 grid grid-cols-2 lg:grid-cols-[2fr_1fr] gap-4 h-full">
             <div className="thin-border p-2  h-full">
               <img src="/grill1.jpg" loading="lazy" className="w-full h-full object-cover" alt="Grill Madia Teramo" />
             </div>
             <div className="flex flex-col gap-4 h-full">
               <div className="flex-1 thin-border p-2">
                 <img src="/grill2.jpg" loading="lazy" className="w-full h-full object-cover" alt="Brace Madia Teramo" />
               </div>
               <div className="flex-1 thin-border p-2">
                 <img src="/grill3.jpg" loading="lazy" className="w-full h-full object-cover" alt="Steak House Madia Teramo" />
               </div>
             </div>
           </div>
           <div className="order-1 lg:order-2 flex flex-col">
             <div className="border-l border-madia-gold/30 pl-4 lg:pl-8 flex flex-col gap-8">
               <div className="mb-2">
                 <span className="text-madia-gold text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Selezione Carni</span>
                 <h2 className="text-5xl md:text-6xl text-madia-green font-serif font-light leading-tight">eccellenza in <br /> <span className="italic">frollatura</span></h2>
               </div>
               <div className="space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed">
                 <p>
                   La <strong style={{fontWeight:'inherit'}}><a href="/steakhouse" style={{fontWeight:'inherit'}}>Steak House di Madia</a></strong> è un viaggio nella cultura della carne di qualità. Selezioniamo razze bovine pregiate, italiane e internazionali, per garantire ad ogni ospite un'esperienza autentica e memorabile.
                 </p>
                 <p>
                   Il cuore della nostra cucina è la <strong style={{fontWeight:'inherit'}}>frollatura dry-aging</strong>: un processo lento e controllato che intensifica i sapori, ammorbidisce le fibre e trasforma ogni taglio in qualcosa di straordinario. Le nostre celle di frollatura sono monitorate quotidianamente dallo chef per assicurare la perfezione ad ogni stadio.
                 </p>
                 <p>
                   Alla brace lavoriamo con legna selezionata, a temperature precise, per ottenere quella crosticina esterna e quella morbidezza interna che rendono una <strong style={{fontWeight:'inherit'}}>bistecca a Teramo</strong> un momento indimenticabile. Ogni taglio è servito con contorni stagionali e salse artigianali preparate in cucina.
                 </p>
                 <p>
                   Che tu scelga il <strong style={{fontWeight:'inherit'}}>taglio del giorno</strong> consigliato dallo chef o una delle nostre proposte alla brace, da Madia trovi sempre qualità certificata, filiera corta e passione per il dettaglio.
                 </p>
               </div>
               <Link to="/menu?section=carne" className="inline-flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-full border border-madia-gold/60 flex items-center justify-center text-madia-gold group-hover:bg-madia-gold group-hover:text-madia-white transition-all duration-500">
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <span className="text-[10px] uppercase tracking-[0.3em] text-madia-gold font-bold">Scopri di più</span>
             </Link>
           </div>
          </div>
        </div>
        </div>
      </section>

      {/* 5. Eventi Section */}
      <section id="eventi" className="pt-10 pb-20 px-6 bg-madia-white">
        <div className="max-w-7xl mx-auto bg-madia-green py-8 px-4 md:p-12">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          <div className="order-1 lg:w-1/2">
            <div className="inline-flex flex-col gap-8 border-l border-madia-gold/30 pl-4 lg:pl-8 w-full">
              <div>
                <span className="block text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold leading-none mb-4">Momenti Unici</span>
                <h2 className="text-5xl text-madia-white font-serif lowercase italic">eventi privati</h2>
              </div>
              <p className="text-madia-white/70 font-sans text-sm leading-relaxed max-w-md">
                <strong className="font-[inherit]">Madia</strong> è il ristorante ideale a Teramo per organizzare{' '}
                <strong className="font-[inherit]">eventi privati</strong> su misura. Grazie ai suoi ampi spazi accoglie{' '}
                <strong className="font-[inherit]">cene aziendali</strong>,{' '}
                <strong className="font-[inherit]">compleanni</strong> e celebrazioni con un{' '}
                <strong className="font-[inherit]">menù dedicato</strong> studiato insieme a voi, in un'atmosfera esclusiva e riservata.
              </p>
              <div className="border-t border-white/10 pt-6">
                <p className="text-[9px] uppercase tracking-[0.4em] text-madia-white/30 mb-5 font-bold">I nostri ambienti</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-l border-madia-gold/40 pl-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-madia-white mb-2">Sala Principale</h4>
                    <p className="text-[11px] text-madia-white/40 leading-relaxed">Il cuore del ristorante, per gruppi e occasioni speciali.</p>
                  </div>
                  <div className="border-l border-madia-gold/40 pl-4 relative">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-madia-white mb-2">Piano Superiore</h4>
                    <div
                      className="absolute -top-6 right-0 flex items-center justify-center"
                      style={{
                        width: 52,
                        height: 52,
                        transform: 'rotate(-14deg)',
                        clipPath: 'polygon(50% 0%,61% 22%,85% 15%,74% 37%,98% 45%,74% 52%,83% 76%,59% 66%,50% 90%,41% 66%,17% 76%,26% 52%,2% 45%,26% 37%,15% 15%,39% 22%)',
                        background: 'linear-gradient(135deg, #c9a84c, #e8c96d)',
                      }}
                    >
                      <span style={{ transform: 'rotate(-14deg)' }} className="text-[6.5px] uppercase font-black text-madia-green tracking-tight text-center leading-tight flex flex-col items-center">
                        <span>stay</span>
                        <span>tuned</span>
                      </span>
                    </div>
                    <p className="text-[11px] text-madia-white/40 leading-relaxed">Sala riservata al primo piano, totalmente privata.</p>
                  </div>
                  <div className="border-l border-madia-gold/40 pl-4">
                    <h4 className="text-[10px] uppercase tracking-widest font-bold text-madia-white mb-2">Dehors Esterno</h4>
                    <p className="text-[11px] text-madia-white/40 leading-relaxed">Dehors su Piazza Sant'Agostino, aperto in stagione.</p>
                  </div>
                </div>
              </div>
              {/* Desktop only */}
              <button onClick={() => setQuoteOpen(true)} className="hidden lg:block border-2 border-madia-gold bg-madia-white text-madia-green px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-white/80 transition-all duration-500 text-center">
                📋 Richiedi un preventivo
              </button>
            </div>
          </div>
          <div className="order-2 lg:w-1/2 thin-border p-2">
            <div className="relative overflow-hidden min-h-[300px] h-full">
              <img
                src="/eventi1.jpg"
                className="absolute inset-0 w-full h-full object-cover"
                alt="Eventi privati a Teramo - La Madia"
              />
            </div>
          </div>
          {/* Mobile only — dopo la foto */}
          <button onClick={() => setQuoteOpen(true)} className="order-3 lg:hidden border-2 border-madia-gold bg-madia-white text-madia-green px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-white/80 transition-all duration-500 text-center">
            📋 Richiedi un preventivo
          </button>
          </div>
        </div>
      </section>


      {/* 6. Recensioni Google */}
      <section className="pt-10 pb-20 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto bg-madia-white p-8 md:p-12">

          {/* Header */}
          <div className="mb-12 text-center">
            <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Cosa Dicono di Noi</span>
            <h2 className="text-5xl md:text-6xl text-madia-green mb-1 leading-tight font-light tracking-tight lowercase">
              <span className="font-serif italic">Recensioni </span>
              <span className="font-sans font-bold not-italic">Google</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-bold font-sans text-madia-green">4,6</span>
              <Star size={13} fill="currentColor" className="text-madia-gold" />
              <span className="text-[11px] tracking-[0.15em] text-madia-black/40 font-sans ml-1">Verificato su Google</span>
              <svg viewBox="0 0 48 48" width="20" height="20" className="ml-1">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
            </div>
          </div>

          {/* Carousel — scroll continuo + drag */}
          <div
            ref={reviewTrackRef}
            className="reviews-track overflow-x-scroll cursor-grab active:cursor-grabbing select-none"
            onMouseEnter={() => setReviewPaused(true)}
            onMouseLeave={() => { setReviewPaused(false); isDragging.current = false; }}
            onMouseDown={onReviewMouseDown}
            onMouseMove={onReviewMouseMove}
            onMouseUp={onReviewMouseUp}
          >
            <div className="flex items-stretch">
              {[...googleReviews, ...googleReviews].map((review, i) => {
                const isExpanded = reviewExpanded.has(i);
                const isOverflowing = reviewOverflow.has(i);
                return (
                  <div key={i} className="w-[360px] flex-shrink-0 px-3">
                    <div className={`border border-madia-gold/15 border-l-4 border-l-madia-gold/60 rounded-2xl p-6 space-y-4 hover:border-madia-gold/30 hover:border-l-madia-gold transition-colors flex flex-col ${isExpanded ? 'h-auto' : 'h-[260px]'}`}>
                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }).map((_, s) => (
                          <Star key={s} size={12} fill="currentColor" className="text-madia-gold" />
                        ))}
                      </div>

                      {/* Testo */}
                      <div className="flex-1">
                        <p
                          ref={el => { reviewParaRefs.current[i] = el; }}
                          className={`text-sm font-sans text-madia-black/70 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}
                        >
                          {review.text}
                        </p>
                        {isOverflowing && (
                          <button
                            onClick={() => toggleReviewExpanded(i)}
                            className="mt-2 text-[9px] uppercase tracking-[0.25em] font-bold text-madia-gold hover:text-madia-green transition-colors"
                          >
                            {isExpanded ? 'Leggi di meno' : 'Leggi di più'}
                          </button>
                        )}
                      </div>

                      {/* Autore */}
                      <div className="pt-3 border-t border-madia-gold/10 flex items-center justify-between">
                        <div>
                          <p className="text-[11px] font-bold text-madia-green uppercase tracking-wide">{review.name}</p>
                          <p className="text-[10px] text-madia-black/30 font-sans mt-0.5">{review.date}</p>
                        </div>
                        <svg viewBox="0 0 24 24" width="16" height="16" className="opacity-25 shrink-0">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Contatti Section */}
      <section id="contatti" className="pt-10 pb-20 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto bg-madia-white py-8 px-4 md:p-12">
          <div className="mb-10 text-center">
            <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Vieni a trovarci</span>
            <h2 className="text-5xl md:text-6xl text-madia-green font-serif lowercase italic">siamo qui per te</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col gap-1">

            {/* Box 1 — Indirizzi e social */}
            <div className="border-2 border-madia-gold p-6 lg:p-10 space-y-6 bg-madia-green rounded-2xl">
              <div className="space-y-6">
                {[
                  { value: "Piazza Sant'Agostino, 10, 64100 Teramo TE", icon: MapPin },
                  { value: '+39 377 333 4838', icon: Phone },
                  { value: 'madia.teramo@gmail.com', icon: Mail },
                ].map((item) => (
                  <div key={item.value} className="flex items-center gap-3">
                    <item.icon size={18} className="text-madia-gold shrink-0" />
                    <p className="text-xs lg:text-sm font-sans text-madia-white">{item.value}</p>
                  </div>
                ))}

                <div className="flex items-start gap-3 pt-1">
                  <Clock size={18} className="text-madia-gold shrink-0 mt-0.5" />
                  <div className="text-xs lg:text-sm font-sans text-madia-white space-y-1">
                    <div className="flex gap-2">
                      <span className="text-white/40 w-20 shrink-0">Lun – Ven</span>
                      <span className="flex flex-col"><span>12:30–14:30</span><span>18:00–23:00</span></span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-white/40 w-20 shrink-0">Sab – Dom</span>
                      <span>18:00–23:00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[9px] uppercase tracking-[0.35em] text-white/40 text-center block mb-4">Social Network</p>
                <div className="flex items-center justify-center gap-5">
                  <a href="https://www.facebook.com/madia.teramo/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-madia-gold hover:text-white transition-colors duration-300">
                    <Facebook size={24} />
                  </a>
                  <a href="https://www.instagram.com/madia_teramo/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-madia-gold hover:text-white transition-colors duration-300">
                    <Instagram size={24} />
                  </a>
                  <a href="https://www.tripadvisor.it/Restaurant_Review-g660757-d25375490-Reviews-MADIA-Teramo_Province_of_Teramo_Abruzzo.html" target="_blank" rel="noopener noreferrer" aria-label="TripAdvisor" className="text-madia-gold hover:text-white transition-colors duration-300">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Box 2 — Sport dal vivo */}
            <div className="border-2 border-madia-gold p-6 lg:p-10 bg-madia-green rounded-2xl flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/40 text-center block">Segui lo sport dal vivo</span>
              <div className="flex items-center justify-center gap-6">
                <img src="/Sky_logo_2025.svg.png" alt="Sky" loading="lazy" className="h-8 w-auto opacity-60" />
                <img src="/dazn5.png" alt="DAZN" loading="lazy" className="h-10 w-auto opacity-60" />
              </div>
            </div>

            {/* Box 3 — Scopri anche */}
            <div className="border-2 border-madia-gold p-6 lg:p-10 bg-madia-green rounded-2xl flex flex-col gap-3">
              <span className="text-[9px] uppercase tracking-[0.35em] text-white/40 text-center block">Scopri anche</span>
              <div className="flex items-center justify-center gap-6">
                <a href="https://www.madiamare.it" target="_blank" rel="noopener noreferrer" aria-label="Madia Mare" className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <img src="/logo3MM.png" alt="Madia Mare" loading="lazy" className="h-16 w-24 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(62%) sepia(80%) saturate(350%) hue-rotate(358deg) brightness(88%)' }} />
                </a>
                <img src="/logojerry-removebg-preview.png" alt="Jerry" loading="lazy" className="h-16 w-24 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(62%) sepia(80%) saturate(350%) hue-rotate(358deg) brightness(88%)' }} />
              </div>
            </div>

          </div>

          <div className="lg:hidden border-t-2 border-madia-gold/60 mx-4" />

          <div className="lg:col-span-7 border-2 border-madia-gold p-6 md:p-12 relative bg-madia-green rounded-2xl">
<form className="space-y-8" onSubmit={async (e: FormEvent) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                if (!form.checkValidity()) { form.reportValidity(); return; }
                await submitContatto({ nome: contactNome, email: contactEmail, telefono: contactTel, messaggio: contactMsg });
              }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Nome Completo <span className="text-madia-gold">*</span></label>
                  <input type="text" required value={contactNome} onChange={e => setContactNome(e.target.value)} className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30" placeholder="Es. Mario Rossi" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Email <span className="text-madia-gold">*</span></label>
                  <input type="email" required value={contactEmail} onChange={e => setContactEmail(e.target.value)} className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30" placeholder="mario@email.it" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Telefono</label>
                  <input type="tel" value={contactTel} onChange={e => setContactTel(e.target.value)} className="w-full bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30" placeholder="Es. +39 345 000 0000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-[0.3em] text-white/40">Messaggio</label>
                <textarea value={contactMsg} onChange={e => setContactMsg(e.target.value)} className="bg-transparent border-b border-white/20 pb-3 text-sm font-sans text-madia-white w-full h-32 focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30 resize-none" placeholder="Raccontaci come possiamo aiutarti..."></textarea>
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={contactConsent} onChange={(e) => setContactConsent(e.target.checked)} className="mt-0.5 accent-madia-gold w-4 h-4 shrink-0 cursor-pointer" />
                <span className="text-[10px] font-sans text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                  Ho letto l'<a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-madia-gold transition-colors">Informativa sulla Privacy</a> e acconsento al trattamento dei miei dati personali ai sensi del GDPR (Reg. UE 2016/679). <span className="text-madia-gold">*</span>
                </span>
              </label>
              {contactStatus === 'error' && <p className="text-red-400 text-xs text-center">{contactError}</p>}
              {contactStatus === 'success' && <p className="text-madia-gold text-xs text-center">✓ Messaggio inviato! Ti risponderemo al più presto.</p>}
              <p className="text-[9px] font-sans text-white/25 text-center"><span className="text-madia-gold">*</span> Campi obbligatori</p>
              <div className="flex justify-center">
                <button type="submit" disabled={!contactNome.trim() || !contactEmail.trim() || !contactConsent || contactStatus === 'loading' || contactStatus === 'success'}
                  className="px-12 py-4 bg-madia-gold text-madia-green uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-madia-white hover:text-madia-green transition-all duration-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-madia-gold disabled:hover:text-madia-green">
                  {contactStatus === 'loading' ? 'Invio in corso...' : 'Invia Richiesta'}
                </button>
              </div>
            </form>
          </div>
          </div>

          <div className="mt-8 rounded-2xl overflow-hidden border-2 border-madia-gold">
            <iframe
              src="https://www.google.com/maps?q=Piazza+Sant%27Agostino+9%2F10%2C+Teramo+TE&output=embed&z=17"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Madia Teramo - Mappa"
            />
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
    </>
  );
}
