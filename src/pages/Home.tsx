import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Phone, Mail, Instagram, MapPin, Facebook } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { QuoteModal } from '../components/QuoteModal';

export function Home() {
  const { openBooking } = useBooking();
  const location = useLocation();
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    const scrollTo = (location.state as any)?.scrollTo;
    if (scrollTo) {
      setTimeout(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section & Carousel */}
      <section className="relative h-screen flex items-center bg-[#062a22] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            src="/hero1.mp4"
          />
          <div className="absolute inset-0 0"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#062a22] via-transparent to-transparent opacity-80"></div>
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
              className="h-24 md:h-36 w-auto object-contain drop-shadow-2xl"
            />
            <div className="flex items-center gap-3 text-madia-white/50 text-[9px] uppercase tracking-[0.4em]">
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
            <button onClick={openBooking} className="border border-madia-gold text-madia-gold bg-madia-gold/15 px-8 py-4 hover:bg-madia-gold hover:text-madia-green transition-all duration-700 font-bold uppercase tracking-[0.2em] text-[10px]">
              Prenota il tuo tavolo
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Chi Siamo Section */}
      <section id="chi-siamo" className="pt-10 pb-20 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto bg-madia-white p-8 md:p-12 space-y-20">

          {/* Block 1: media sinistra — testo destra */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="flex flex-col justify-between gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/5] thin-border p-2">
                  <video autoPlay muted loop playsInline className="w-full h-full object-cover" src="/chisiamo1.mp4" />
                </div>
                <div className="aspect-[4/5] thin-border p-2 mt-12">
                  <img src="/chef1.jpg" className="w-full h-full object-cover" alt="Lo chef di Madia Teramo" />
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
            <div className="space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-8">
              <div className="mb-8">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Chi Siamo</span>
                <h2 className="text-5xl md:text-7xl text-madia-green font-serif lowercase italic">il ristorante</h2>
              </div>
              <p>
                Madia è il ristorante in Piazza Sant'Agostino 9/10, nel cuore del centro storico di Teramo. Un luogo dove tradizione abruzzese e cucina contemporanea si incontrano, con un'offerta gastronomica completa: dal pranzo alla cena, e un menù dedicato all'aperitivo ogni giorno dalle 18 alle 20.
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
            <div className="space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-8">
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
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[4/5] thin-border p-2 mt-8">
                <img src="/chisiamo2.jpg" className="w-full h-full object-cover" alt="Ristorante Madia Teramo" />
              </div>
              <div className="aspect-[4/5] thin-border p-2">
                <img src="/chisiamo3.jpg" className="w-full h-full object-cover" alt="Cucina Madia Teramo" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Pizzeria Section */}
      <section id="pizzeria" className="bg-madia-white pt-10 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-madia-green p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

            {/* Testo sinistra */}
            <div className="flex flex-col text-madia-white/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-8">
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
              <div className="mt-auto pt-6 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/menu-pizza"
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
            <div className="grid grid-cols-[1fr_2fr] gap-4 h-full">
              <div className="flex flex-col gap-4 h-full">
                <div className="thin-border p-2 flex-1">
                  <img
                    src="/carosellomenu/SnapInsta.to_656174364_18006384617850586_565458671926232155_n.jpg"
                    className="w-full h-full object-cover"
                    alt="Impasto pizza Madia"
                  />
                </div>
                <div className="thin-border p-2 flex-1">
                  <img
                    src="/carosellomenu/SnapInsta.to_673833218_18009802070850586_7908104023682527934_n.jpg"
                    className="w-full h-full object-cover"
                    alt="Farine artigianali Madia Teramo"
                  />
                </div>
              </div>
              <div className="thin-border p-2 h-full">
                <img
                  src="/carosellomenu/SnapInsta.to_670633682_18008912618850586_7096193815917506183_n.jpg"
                  className="w-full h-full object-cover"
                  alt="Pizza Padellino Madia Teramo"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Steak House (Polished Preview) */}
      <section id="steakhouse" className="bg-madia-green pt-10 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto bg-madia-white p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
           <div className="grid grid-cols-[2fr_1fr] gap-4 h-full">
             <div className="thin-border p-2  h-full">
               <img src="/grill1.jpg" className="w-full h-full object-cover" alt="Grill" />
             </div>
             <div className="flex flex-col gap-4 h-full">
               <div className="thin-border p-2  flex-1">
                 <img src="/grill2.jpg" className="w-full h-full object-cover" alt="Grill" />
               </div>
               <div className="thin-border p-2  flex-1">
                 <img src="/grill3.jpg" className="w-full h-full object-cover" alt="Grill" />
               </div>
             </div>
           </div>
           <div className="flex flex-col">
             <div className="border-l border-madia-gold/30 pl-8 flex flex-col gap-8">
               <div className="mb-2">
                 <span className="text-madia-gold text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">Steak Selection</span>
                 <h2 className="text-5xl md:text-6xl text-madia-green font-serif font-light leading-tight">Eccellenza in <br /> <span className="italic">frollatura</span></h2>
               </div>
               <div className="space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed">
                 <p>
                   La <strong style={{fontWeight:'inherit'}}><a href="/steakhouse" style={{fontWeight:'inherit'}}>Steak House di Madia</a></strong> è un viaggio nella cultura della carne di qualità. Selezioniamo razze bovine pregiate, dalle Marchigiane alle Chianine, fino ai tagli internazionali di Angus e Wagyu, per garantire ad ogni ospite un'esperienza autentica e memorabile.
                 </p>
                 <p>
                   Il cuore della nostra cucina è la <strong style={{fontWeight:'inherit'}}>frollatura dry-aging</strong>: un processo lento e controllato che intensifica i sapori, ammorbidisce le fibre e trasforma ogni taglio in qualcosa di straordinario. Le nostre celle di frollatura sono monitorate quotidianamente dallo chef per assicurare la perfezione ad ogni stadio.
                 </p>
                 <p>
                   Alla brace lavoriamo con legna selezionata, a temperature precise, per ottenere quella crosticina esterna e quella morbidezza interna che rendono una <strong style={{fontWeight:'inherit'}}>bistecca a Teramo</strong> un momento indimenticabile. Ogni taglio è servito con contorni stagionali e salse artigianali preparate in cucina.
                 </p>
                 <p>
                   Che tu scelga una <strong style={{fontWeight:'inherit'}}>fiorentina</strong>, una costata o un taglio del giorno consigliato dallo chef, da Madia trovi sempre qualità certificata, filiera corta e passione per il dettaglio.
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
        <div className="max-w-7xl mx-auto bg-madia-green p-8 md:p-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
             <img
               src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800"
               className="w-full h-full object-cover thin-border"
               alt="Events"
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold">Momenti Unici</span>
            <h2 className="text-5xl text-madia-white font-serif lowercase italic">eventi privati</h2>
            <p className="text-madia-white/70 font-sans text-sm leading-relaxed max-w-md">
              Dalla laurea ai compleanni, rendi i tuoi momenti indimenticabili nelle nostre sale esclusive. Curiamo ogni dettaglio per riflettere il tuo stile.
            </p>
            <div className="grid grid-cols-2 gap-8 py-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-madia-white mb-2 border-b border-white/10 pb-2">Business</h4>
                <p className="text-[11px] text-madia-white/50">Cene aziendali e meeting in un contesto raffinato.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold text-madia-white mb-2 border-b border-white/10 pb-2">Private</h4>
                <p className="text-[11px] text-madia-white/50">Celebrazioni intime e feste indimenticabili.</p>
              </div>
            </div>
            <button onClick={() => setQuoteOpen(true)} className="inline-block px-12 py-4 border border-madia-white text-madia-white uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-madia-white hover:text-madia-green transition-all duration-500">
               Richiedi un preventivo
            </button>
          </div>
          </div>
        </div>
      </section>


      {/* 7. Contatti Section */}
      <section id="contatti" className="pt-10 pb-20 px-6 bg-madia-green">
        <div className="max-w-7xl mx-auto p-8 md:p-12">
          <div className="mb-10 text-center">
            <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Vieni a trovarci</span>
            <h2 className="text-5xl md:text-6xl text-madia-white font-serif lowercase italic">siamo qui per te</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 border-2 border-madia-gold p-12 space-y-12 bg-[#F8F4EC]">
            <div>
              <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">Mettersi in Contatto</span>
              <h2 className="text-5xl text-madia-green font-serif lowercase italic">contatti</h2>
            </div>
            <div className="space-y-10 pt-4">
              {[
                { label: 'Indirizzo', value: "Piazza Sant'Agostino 9/10, Teramo (TE)", icon: MapPin },
                { label: 'Telefono', value: '+39 0861 123456', icon: Phone },
                { label: 'Email', value: 'info@madiateramo.it', icon: Mail },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-6 group">
                  <div className="w-10 h-10 border border-madia-gold/20 flex items-center justify-center text-madia-gold group-hover:bg-madia-gold group-hover:text-white transition-all duration-500">
                    <item.icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-madia-black/30 mb-1">{item.label}</h4>
                    <p className="text-lg font-serif text-madia-green">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-madia-black/30 mb-4">Seguici sui social</p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 border border-madia-gold/20 flex items-center justify-center text-madia-gold hover:bg-madia-gold hover:text-white transition-all duration-500">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-10 h-10 border border-madia-gold/20 flex items-center justify-center text-madia-gold hover:bg-madia-gold hover:text-white transition-all duration-500">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-10 h-10 border border-madia-gold/20 flex items-center justify-center text-madia-gold hover:bg-madia-gold hover:text-white transition-all duration-500">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12.006 4.295c-2.67 0-5.338.784-7.645 2.353H0l1.963 2.135a5.997 5.997 0 0 0 4.04 10.43 5.976 5.976 0 0 0 4.075-1.6L12 19.705l1.922-2.09a5.972 5.972 0 0 0 4.072 1.598 6 6 0 0 0 6-5.998 5.982 5.982 0 0 0-1.957-4.432L24 6.648h-4.35a13.573 13.573 0 0 0-7.644-2.353zM12 6.255c1.531 0 3.063.303 4.504.903C13.943 8.138 12 10.43 12 13.1c0-2.671-1.942-4.962-4.504-5.942A11.72 11.72 0 0 1 12 6.256zM6.002 9.157a4.059 4.059 0 1 1 0 8.118 4.059 4.059 0 0 1 0-8.118zm11.992.002a4.057 4.057 0 1 1 .003 8.115 4.057 4.057 0 0 1-.003-8.115zm-11.992 1.93a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256zm11.992 0a2.128 2.128 0 0 0 0 4.256 2.128 2.128 0 0 0 0-4.256z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="pt-4 border-t border-madia-black/5 flex items-center gap-3">
              <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-madia-black/20">Disponibile</p>
              <div className="opacity-50">
                <svg width="36" height="15" viewBox="0 0 48 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="20" rx="4" fill="#0072bc"/>
                  <text x="50%" y="14" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="13" fill="white" letterSpacing="0.5">sky</text>
                </svg>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 border-2 border-madia-gold p-12 relative bg-[#F8F4EC]">
            <h3 className="text-2xl font-serif mb-10 text-madia-green">Inviaci un Messaggio</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" className="bg-transparent border-b border-madia-green/20 py-3 text-sm text-madia-black focus:outline-none focus:border-madia-gold transition-colors placeholder:text-madia-black/30" placeholder="Nome" />
                <input type="text" className="bg-transparent border-b border-madia-green/20 py-3 text-sm text-madia-black focus:outline-none focus:border-madia-gold transition-colors placeholder:text-madia-black/30" placeholder="Email" />
              </div>
              <textarea className="bg-transparent border-b border-madia-green/20 py-3 text-sm text-madia-black w-full h-32 focus:outline-none focus:border-madia-gold transition-colors placeholder:text-madia-black/30 resize-none" placeholder="Il tuo messaggio"></textarea>
              <button type="submit" className="px-12 py-4 bg-madia-green text-madia-white uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-madia-gold hover:text-madia-green transition-all duration-500">
                Invia Richiesta
              </button>
            </form>
          </div>
          </div>
        </div>
      </section>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  );
}
