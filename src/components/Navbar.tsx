import { useState, useEffect, MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'Il Menù', href: '/menu' },
    { title: 'Chi Siamo', href: '/#chi-siamo' },
    { title: 'Steak House', href: '/steakhouse' },
    { title: 'Eventi', href: '/#eventi' },
    { title: 'Terrazza', href: '/#terrazza' },
    { title: 'Contatti', href: '/#contatti' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-700',
        isScrolled || isOpen
          ? 'bg-madia-black/95 backdrop-blur-md border-b border-madia-gold/30 text-madia-white py-4'
          : 'bg-transparent text-madia-white py-8'
      )}
    >
      <div className="max-w-7xl mx-auto px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-2xl md:text-2xl font-serif tracking-[0.3em] font-light text-madia-gold uppercase group-hover:opacity-80 transition-opacity">
            Madia
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
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
          ))}
          <Link
            to="/prenota"
            className="px-8 py-2.5 border border-madia-gold/60 text-madia-gold hover:bg-madia-gold hover:text-madia-black transition-all duration-500 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            Prenota
          </Link>
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
              <Link
                key={link.title}
                to={link.href}
                className="text-lg uppercase tracking-[0.2em] font-medium text-madia-white hover:text-madia-gold transition-colors"
                onClick={(e) => {
                  setIsOpen(false);
                  handleNavClick(e as any, link.href);
                }}
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/prenota"
              onClick={() => setIsOpen(false)}
              className="px-8 py-3 border border-madia-gold text-madia-gold rounded-none uppercase tracking-widest font-bold"
            >
              Prenota il tuo tavolo
            </Link>
            <div className="flex space-x-6 text-madia-white/60">
              <Phone size={20} />
              <MapPin size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
