import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Phone, MapPin, ChevronDown, Mail } from 'lucide-react';
import { cn } from '../lib/utils';
import { useBooking } from '../context/BookingContext';

type NavLink = {
  title: string;
  href: string;
  children?: { title: string; href: string }[];
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 1023px)').matches);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') setActiveHash('');
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/') return;
    const ids = ['chi-siamo', 'pizzeria', 'steakhouse', 'eventi', 'contatti'];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [location.pathname]);

  const navLinks: NavLink[] = [
    { title: 'Home', href: '/' },
    {
      title: 'Ristorante',
      href: '/#chi-siamo',
      children: [{ title: 'Menù Ristorante', href: '/menu' }],
    },
    {
      title: 'Pizzeria',
      href: '/#pizzeria',
      children: [{ title: 'Menù Pizza', href: '/menu-pizza' }],
    },
    { title: 'Steak House', href: '/#steakhouse' },
    { title: 'Eventi Privati', href: '/#eventi' },
    { title: 'Contatti', href: '/#contatti' },
  ];

  const { openBooking } = useBooking();
  const navigate = useNavigate();

  const isActive = (href: string) => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    if (href === '/') return path === '/' && activeHash === '';
    if (href.startsWith('/#')) return path === '/' && activeHash === href.slice(1);
    return path === href.replace(/\/$/, '');
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/') {
      e.preventDefault();
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.split('#')[1];
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: id } });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-lg">

      {/* ── Top info bar (solo desktop) ─────────────────── */}
      <div className="hidden lg:block bg-white border-b border-black/10 px-12 py-1.5">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 text-madia-green text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <MapPin size={11} />
            Piazza Sant'Agostino, 10, 64100 Teramo TE
          </span>
          <span className="text-madia-green/30">|</span>
          <span className="flex items-center gap-2">
            <Phone size={11} />
            +39 377 333 4838
          </span>
        </div>
      </div>

      {/* ── Navbar bar ──────────────────────────────────── */}
      <nav className={cn(
        'bg-madia-green border-b-2 border-madia-gold/70 transition-all duration-700',
        isScrolled || isOpen ? (isMobile ? 'py-2' : 'py-1') : (isMobile ? 'py-3' : 'py-2')
      )}>

        {/* ── MOBILE: logo centrato assoluto + burger destra ── */}
        {isMobile && (
        <div className="relative px-4 flex items-center h-14">
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center group">
            <img src="/mtlogo-removebg-preview.png" alt="Madia Teramo" className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity" />
          </Link>
          <button
            className="ml-auto relative z-10"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={26} color="#c5a059" strokeWidth={2} />
          </button>
        </div>
        )}

        {/* ── DESKTOP: logo sinistra + links destra ── */}
        {!isMobile && <div className="max-w-7xl mx-auto px-12 flex items-center justify-between h-11">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center group">
              <img src="/mtlogo-removebg-preview.png" alt="Madia Teramo" className="h-11 w-auto object-contain group-hover:opacity-80 transition-opacity" />
            </Link>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Ristorante</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Pizzeria</span>
              <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Drink</span>
            </div>
          </div>
          <div className="flex items-center gap-10" ref={dropdownRef}>
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.title}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.title)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      'flex items-center gap-1 text-[10px] uppercase tracking-[0.25em] font-medium transition-colors luxury-underline pb-1',
                      isActive(link.href) ? 'text-madia-gold' : 'text-madia-white/80 hover:text-madia-gold'
                    )}
                    onClick={(e) => handleNavClick(e as any, link.href)}
                  >
                    {link.title}
                    <ChevronDown size={10} className={cn('transition-transform duration-200', openDropdown === link.title ? 'rotate-180' : '')} />
                  </Link>
                  <AnimatePresence>
                    {openDropdown === link.title && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 bg-madia-green border border-madia-gold/20 min-w-[200px] py-3"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.title}
                            to={child.href}
                            className="block px-5 py-2.5 text-[10px] uppercase tracking-[0.25em] text-madia-white/80 hover:text-madia-gold transition-colors"
                          >
                            {child.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.title}
                  to={link.href}
                  className={cn(
                    'text-[10px] uppercase tracking-[0.25em] font-medium transition-colors luxury-underline pb-1',
                    isActive(link.href) ? 'text-madia-gold' : 'text-madia-white/80 hover:text-madia-gold'
                  )}
                  onClick={(e) => handleNavClick(e as any, link.href)}
                >
                  {link.title}
                </Link>
              )
            )}
            <button
              onClick={openBooking}
              className="px-8 py-2.5 border border-madia-gold/60 text-madia-gold hover:bg-madia-gold hover:text-madia-black transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-bold"
            >
              Prenota
            </button>
          </div>
        </div>}

        {/* ── Menu mobile overlay ─────────────────────────── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 w-full min-h-[100dvh] bg-madia-green border-t border-madia-gold/20 overflow-y-auto"
              style={{display: 'block'}}
            >
              {/* Voci di menu */}
              <div className="flex flex-col w-full pt-6">
                {navLinks.map((link, i) => (
                  <div key={link.title} className={cn('w-full', i > 0 && 'border-t border-madia-gold/10')}>
                    {link.children ? (
                      <>
                        <div className="flex items-center justify-between px-8 py-4">
                          <Link
                            to={link.href}
                            className="text-[11px] uppercase tracking-[0.3em] font-bold text-madia-white hover:text-madia-gold transition-colors"
                            onClick={(e) => {
                              handleNavClick(e as any, link.href);
                              setIsOpen(false);
                              setOpenMobileAccordion(null);
                            }}
                          >
                            {link.title}
                          </Link>
                          <button
                            className="p-1 text-madia-gold focus:outline-none"
                            onClick={() =>
                              setOpenMobileAccordion(openMobileAccordion === link.title ? null : link.title)
                            }
                          >
                            <ChevronDown
                              size={14}
                              className={cn('transition-transform duration-300', openMobileAccordion === link.title ? 'rotate-180' : '')}
                            />
                          </button>
                        </div>
                        <AnimatePresence>
                          {openMobileAccordion === link.title && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-madia-green/80 border-t border-madia-gold/10"
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.title}
                                  to={child.href}
                                  className="flex items-center gap-3 px-12 py-3.5 text-[10px] uppercase tracking-[0.3em] text-madia-white/70 hover:text-madia-gold transition-colors"
                                  onClick={() => { setIsOpen(false); setOpenMobileAccordion(null); }}
                                >
                                  <span className="w-3 h-px bg-madia-gold/50 inline-block" />
                                  {child.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.href}
                        className="flex items-center px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-bold text-madia-white hover:text-madia-gold transition-colors"
                        onClick={(e) => {
                          setIsOpen(false);
                          setOpenMobileAccordion(null);
                          handleNavClick(e as any, link.href);
                        }}
                      >
                        {link.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider + info contatti */}
              <div className="border-t border-madia-gold/30 mx-8 mt-2" />
              <div className="flex flex-col items-center gap-4 px-8 pt-16 pb-10">
                <p className="text-[8px] uppercase tracking-[0.35em] text-madia-gold/60 font-bold">Dove siamo</p>
                <div className="flex flex-col items-center gap-3">
                  <span className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-madia-white/70 whitespace-nowrap">
                    <MapPin size={11} className="text-madia-gold/70 shrink-0" />
                    Piazza Sant'Agostino, 10 — 64100 Teramo
                  </span>
                  <span className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-madia-white/70 whitespace-nowrap">
                    <Phone size={11} className="text-madia-gold/70 shrink-0" />
                    +39 377 333 4838
                  </span>
                  <a
                    href="mailto:madia.teramo@gmail.com"
                    className="flex items-center gap-2 text-[10px] tracking-[0.15em] text-madia-white/70 hover:text-madia-gold transition-colors whitespace-nowrap"
                  >
                    <Mail size={11} className="text-madia-gold/70 shrink-0" />
                    madia.teramo@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </div>
  );
}
