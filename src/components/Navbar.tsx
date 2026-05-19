import { useState, useEffect, useRef, MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, ChevronDown } from 'lucide-react';
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
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset hash quando si cambia pagina
  useEffect(() => {
    if (location.pathname !== '/') setActiveHash('');
  }, [location.pathname]);

  // IntersectionObserver per le sezioni della home
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
      children: [
        { title: 'Menù Ristorante', href: '/menu' },
      ],
    },
    {
      title: 'Pizzeria',
      href: '/#pizzeria',
      children: [
        { title: 'Menù Pizza', href: '/menu-pizza' },
      ],
    },
    { title: 'Steak House', href: '/#steakhouse' },
    { title: 'Eventi', href: '/#eventi' },
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
    if (href.startsWith('/#')) {
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
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Top Header */}
      <div className="bg-white border-b border-black/10 px-12 py-1.5 hidden lg:block">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-6 text-madia-green text-[10px] uppercase tracking-[0.2em]">
          <span className="flex items-center gap-2">
            <MapPin size={11} />
            Piazza Sant'Agostino 9/10, Teramo (TE)
          </span>
          <span className="text-madia-green/30">|</span>
          <span className="flex items-center gap-2">
            <Phone size={11} />
            +39 0861 123456
          </span>
        </div>
      </div>

    <nav
      className={cn(
        'bg-madia-green border-b border-white/30 transition-all duration-700',
        isScrolled || isOpen ? 'py-1' : 'py-2'
      )}
    >
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        {/* Logo + separator + tagline */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center group">
            <img
              src="/mtlogo-removebg-preview.png"
              alt="Madia Teramo"
              className="h-11 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>
          <div className="hidden lg:block w-px h-8 bg-white/30" />
          <div className="hidden lg:flex flex-col gap-0.5">
            <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Ristorante</span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Pizzeria</span>
            <span className="text-[8px] uppercase tracking-[0.3em] text-madia-white/60 leading-none">Drink</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10" ref={dropdownRef}>
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
                      className="absolute top-full left-0 mt-2 bg-madia-green border border-madia-gold/20 min-w-[140px] py-2"
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

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-madia-gold focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-madia-green border-t border-madia-gold/20 flex flex-col items-center py-10 space-y-8 lg:hidden"
          >
            {navLinks.map((link) => (
              <div key={link.title} className="flex flex-col items-center gap-4">
                <Link
                  to={link.href}
                  className="text-lg uppercase tracking-[0.2em] font-medium text-madia-white hover:text-madia-gold transition-colors"
                  onClick={(e) => {
                    setIsOpen(false);
                    handleNavClick(e as any, link.href);
                  }}
                >
                  {link.title}
                </Link>
                {link.children?.map((child) => (
                  <Link
                    key={child.title}
                    to={child.href}
                    className="text-sm uppercase tracking-[0.2em] text-madia-white/60 hover:text-madia-gold transition-colors pl-4 border-l border-madia-gold/30"
                    onClick={() => setIsOpen(false)}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            ))}
            <button
              onClick={() => { setIsOpen(false); openBooking(); }}
              className="px-8 py-3 border border-madia-gold text-madia-gold rounded-none uppercase tracking-widest font-bold"
            >
              Prenota il tuo tavolo
            </button>
            <div className="flex space-x-6 text-madia-white/60">
              <Phone size={20} />
              <MapPin size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </div>
  );
}
