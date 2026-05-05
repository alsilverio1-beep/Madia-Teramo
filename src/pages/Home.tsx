import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, Phone, Mail, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
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
            src="/src/hero1.mp4"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#062a22] via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-6 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl flex flex-col items-center gap-6"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-madia-white font-light leading-[0.9]">
              Benvenuti <br /> <span className="italic">da Madia</span>
            </h1>
            <p className="text-madia-white/80 max-w-md text-sm md:text-base font-sans italic leading-relaxed">
              Ci sono gesti semplici che raccontano tutto!<br />Un piatto condiviso, una risata sincera, il piacere di assaporare insieme!
            </p>
            <button className="bg-madia-gold text-madia-green px-12 py-4 hover:bg-white hover:text-madia-green transition-all duration-700 font-bold uppercase tracking-[0.2em] text-[10px]">
              Prenota il tuo tavolo
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Chi Siamo Section */}
      <section id="chi-siamo" className="pt-10 pb-20 px-6 bg-madia-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div className="pl-8">
                <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold mb-4 block">Chi Siamo</span>
                <h2 className="text-5xl md:text-7xl text-madia-green font-serif lowercase italic">il ristorante</h2>
              </div>
              <div className="space-y-6 text-madia-black/70 font-sans text-sm leading-relaxed border-l border-madia-gold/30 pl-8">
                <p>
                  Madia è il ristorante in Piazza Sant'Agostino 9/10, nel cuore del centro storico di Teramo. Un luogo dove tradizione abruzzese e cucina contemporanea si incontrano, con un'offerta gastronomica completa: dal pranzo alla cena, e un menù dedicato all'aperitivo ogni giorno dalle 18 alle 20.
                </p>
                <p>
                  Rinomata per le sue <strong>pizze artigianali</strong> e per l'eccellenza della <strong>Steak House</strong>, Madia propone carni selezionate e frollate con cura, pensate per chi cerca qualità autentica a Teramo. Ogni ingrediente proviene dal territorio, ogni piatto è un invito a scoprire il meglio dell'Abruzzo.
                </p>
                <p>
                  Il nostro menù cambia seguendo le stagioni e i ritmi della terra abruzzese. La mattina il team seleziona le materie prime dai produttori locali, i contadini del Gran Sasso e gli allevatori della provincia di Teramo, per garantire freschezza e autenticità in ogni piatto servito.
                </p>
                <p>
                  La <strong>Steak House di Madia</strong> è oggi un punto di riferimento per gli amanti della <strong>carne a Teramo</strong> e in tutto l'Abruzzo. Le nostre frollature, curate direttamente dallo chef, esaltano il sapore naturale di razze bovine pregiate, servite alla brace con contorni stagionali e salse artigianali.
                </p>
                <p>
                  Le <strong>pizze di Madia</strong> sono preparate con impasto a lunga lievitazione, farine selezionate e ingredienti del territorio. Che tu scelga una classica margherita o una creazione dello chef, ogni pizza è il risultato di un processo artigianale attento e rispettoso della tradizione napoletana rivisitata in chiave abruzzese.
                </p>
                <p>
                  Cerchi un <strong>ristorante a Teramo</strong> per una cena romantica, un pranzo di lavoro o una serata con amici? Da Madia trovi un ambiente curato, un servizio attento e una cucina che non delude. Prenota il tuo tavolo e lasciati sorprendere.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pl-8 pt-4">
                <Link
                  to="/menu"
                  className="border-2 border-madia-gold bg-madia-green text-madia-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-green/80 transition-all duration-500 text-center"
                >
                  🍽️ Consulta il menù
                </Link>
                <a
                  href="#"
                  className="border-2 border-madia-gold bg-madia-green text-madia-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-madia-green/80 transition-all duration-500 text-center"
                >
                  🗓️ Prenota un tavolo
                </a>
              </div>
            </div>
            <div className="lg:col-span-7 relative self-stretch">
              <div className="absolute inset-0 overflow-hidden thin-border p-4 bg-white/50 backdrop-blur-sm">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  src="/src/chisiamo1.mp4"
                />
              </div>
              <div className="absolute -top-8 -left-8 w-24 h-24 border-t border-l border-madia-gold -z-10"></div>
              <div className="absolute -bottom-8 -right-8 w-24 h-24 border-b border-r border-madia-gold -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Steak House (Polished Preview) */}
      <section className="bg-madia-white pt-10 pb-20 px-6 relative overflow-hidden border-y border-madia-gold/10">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-madia-gold/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8 order-2 lg:order-1">
             <span className="text-madia-gold text-[10px] uppercase tracking-[0.4em] font-bold">Steak Selection</span>
             <h2 className="text-5xl md:text-6xl text-madia-green font-serif font-light leading-tight">Eccellenza in <br /> <span className="italic">frollatura</span></h2>
             <p className="text-madia-black/70 max-w-md text-sm font-sans leading-relaxed">
               Dalle migliori razze bovine alle tecniche di dry-aging più avanzate. Ogni taglio è un'opera d'arte maturata nel tempo.
             </p>
             <Link to="/steakhouse" className="inline-flex items-center gap-4 group">
               <div className="w-12 h-12 rounded-full border border-madia-gold/60 flex items-center justify-center text-madia-gold group-hover:bg-madia-gold group-hover:text-madia-white transition-all duration-500">
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </div>
               <span className="text-[10px] uppercase tracking-[0.3em] text-madia-gold font-bold">Scopri di più</span>
             </Link>
           </div>
           <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
             <div className="aspect-[4/5] thin-border p-2 bg-white/5">
                <img src="https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale brightness-75" alt="Meat" referrerPolicy="no-referrer" />
             </div>
             <div className="aspect-[4/5] thin-border p-2 bg-white/5 mt-12">
                <img src="https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover grayscale brightness-75" alt="Meat aging" referrerPolicy="no-referrer" />
             </div>
           </div>
        </div>
      </section>

      {/* 4. Eventi Section */}
      <section id="eventi" className="py-32 bg-white px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center">
          <div className="lg:w-1/2 relative">
             <div className="aspect-square bg-madia-green/5 absolute -inset-8 -z-10 rotate-3"></div>
             <img 
               src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800" 
               className="w-full h-full object-cover thin-border shadow-2xl" 
               alt="Events" 
               referrerPolicy="no-referrer"
             />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <span className="text-madia-gold text-[10px] uppercase tracking-[0.5em] font-bold">Momenti Unici</span>
            <h2 className="text-5xl text-madia-green font-serif lowercase italic">eventi privati</h2>
            <p className="text-madia-black/60 font-sans text-sm leading-relaxed max-w-md">
              Dalla laurea ai compleanni, rendi i tuoi momenti indimenticabili nelle nostre sale esclusive. Curiamo ogni dettaglio per riflettere il tuo stile.
            </p>
            <div className="grid grid-cols-2 gap-8 py-4">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2 border-b border-black/5 pb-2">Business</h4>
                <p className="text-[11px] text-black/50">Cene aziendali e meeting in un contesto raffinato.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest font-bold mb-2 border-b border-black/5 pb-2">Private</h4>
                <p className="text-[11px] text-black/50">Celebrazioni intime e feste indimenticabili.</p>
              </div>
            </div>
            <Link to="/preventivo-eventi" className="inline-block px-12 py-4 border border-madia-green text-madia-green uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-madia-green hover:text-white transition-all duration-500">
               Richiedi un preventivo
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Terrazza Section */}
      <section id="terrazza" className="bg-[#0a0a0a] py-32 px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img 
             src="https://images.unsplash.com/photo-1517505311024-42f09907f152?auto=format&fit=crop&q=80&w=1200" 
             className="w-full h-full object-cover" 
             alt="Terrace" 
             referrerPolicy="no-referrer"
           />
        </div>
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center space-y-10">
          <span className="text-madia-gold text-[10px] uppercase tracking-[0.6em] font-bold">New Dimension</span>
          <h2 className="text-6xl md:text-8xl text-madia-white font-serif font-light leading-none">Terrazza Orsini</h2>
          <p className="text-madia-white/50 max-w-xl text-sm md:text-base font-sans font-light italic">
            Visuale a 360° sulla piazza storica di Teramo. Un'esperienza sospesa tra il cielo e la cattedrale.
          </p>
          <div className="flex flex-col items-center gap-6">
            <Link to="/scopri-terrazza" className="text-[10px] uppercase tracking-[0.4em] text-madia-gold border-b border-madia-gold/40 pb-2 hover:border-madia-gold transition-colors">
              Scopri l'Orizzonte
            </Link>
            <div className="w-[1px] h-20 bg-gradient-to-b from-madia-gold/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* 6. Contatti Section */}
      <section id="contatti" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-5 space-y-12">
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
          </div>

          <div className="lg:col-span-7 bg-madia-green text-white p-12 shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 pointer-events-none"></div>
            <h3 className="text-2xl font-serif mb-10 text-madia-gold">Inviaci un Messaggio</h3>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <input type="text" className="bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30" placeholder="Nome" />
                <input type="text" className="bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30" placeholder="Email" />
              </div>
              <textarea className="bg-transparent border-b border-white/20 py-3 text-sm w-full h-32 focus:outline-none focus:border-madia-gold transition-colors placeholder:text-white/30 resize-none" placeholder="Il tuo messaggio"></textarea>
              <button type="submit" className="px-12 py-4 bg-madia-gold text-madia-green uppercase tracking-[0.3em] font-bold text-[10px] hover:bg-white transition-all duration-500">
                Invia Richiesta
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
