import React, { useState, useEffect } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Menu, X, Share2 } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';
import { formatDateNumeric } from '../../utils/format';

interface NavbarProps {
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenShare }) => {
  const { wedding } = useWedding();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'História', href: '#historia' },
    { label: 'Padrinhos', href: '#padrinhos' },
    { label: 'O Grande Dia', href: '#o-grande-dia' },
    { label: 'Dress Code', href: '#dress-code' },
    { label: 'Presentes', href: '#presentes' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'RSVP', href: '#rsvp' },
    { label: 'Informações', href: '#informacoes' },
  ];

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-sm py-2.5 border-b border-[#E9DDCC]/60'
          : 'bg-[#F9F6EF]/60 backdrop-blur-md py-3.5 border-b border-[#E9DDCC]/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monogram Brand */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#inicio');
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <MonogramCrest size="xs" variant="minimal" className="shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2C3225] group-hover:text-[#657153] transition-colors">
              {wedding.coupleNames}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#657153] font-medium hidden sm:inline whitespace-nowrap">
              {wedding.city} • {formatDateNumeric(wedding.weddingDate)}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium tracking-[0.14em] uppercase text-[#3F463A]">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="hover:text-[#657153] transition-colors py-1 relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#657153] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Actions (Share, RSVP CTA) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-share-btn"
            onClick={onOpenShare}
            title="Compartilhar convite"
            className="p-2 text-[#3F463A] hover:text-[#657153] hover:bg-[#657153]/10 rounded-full transition-colors cursor-pointer"
          >
            <Share2 size={16} />
          </button>

          <button
            id="nav-rsvp-btn"
            onClick={() => scrollToSection('#rsvp')}
            className="bg-[#657153] hover:bg-[#4E5941] text-white text-[11px] font-medium tracking-[0.15em] uppercase px-5 py-2 rounded-full transition-all shadow-sm hover:shadow cursor-pointer"
          >
            Confirmar Presença
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => scrollToSection('#rsvp')}
            className="bg-[#657153] text-white text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-full"
          >
            RSVP
          </button>
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#2C3225] hover:text-[#657153] focus:outline-none"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass border-b border-[#E9DDCC]/60 px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4">
            <div className="text-center pb-3 border-b border-[#E9DDCC]/40 flex flex-col items-center gap-2">
              <MonogramCrest size="sm" variant="minimal" />
              <span className="font-serif text-lg text-[#2C3225] block">{wedding.coupleNames}</span>
              <span className="text-[10px] tracking-widest uppercase text-[#657153] font-semibold">{wedding.city}, {wedding.state}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs tracking-wider uppercase text-[#3F463A]">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left py-2 px-3 hover:bg-[#657153]/10 hover:text-[#657153] rounded-lg transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E9DDCC]/40 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenShare();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#E9DDCC] text-xs tracking-wider uppercase text-[#657153] bg-white/60 cursor-pointer"
              >
                <Share2 size={14} />
                <span>Compartilhar Convite</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
