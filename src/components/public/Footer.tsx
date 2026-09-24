import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Heart, Lock } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';

export const Footer: React.FC = () => {
  const { wedding, setActiveView } = useWedding();

  const year = wedding.weddingDate.split('-')[0] || '2026';

  return (
    <footer className="relative z-10 border-t border-[#E9DDCC]/60 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center bg-[#F9F6EF]/70 backdrop-blur-md">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Monogram Crest Emblem */}
        <div className="flex justify-center">
          <MonogramCrest size="md" variant="seal" />
        </div>

        {/* Couple Names */}
        <h3 className="font-serif text-2xl sm:text-3xl text-[#2C3225] tracking-tight">
          {wedding.coupleNames}
        </h3>

        {/* Heartfelt Quote */}
        <p className="text-xs sm:text-sm text-[#3F463A] italic font-light max-w-md mx-auto">
          "Feito com amor para celebrar esse momento inesquecível ao lado de quem amamos."
        </p>

        {/* Wedding Hashtag & Year */}
        <div className="flex items-center justify-center gap-4 text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold">
          <span>{wedding.city}, {wedding.state}</span>
          <span>•</span>
          <span>{wedding.hashtag}</span>
          <span>•</span>
          <span>{year}</span>
        </div>

        {/* Discreet Admin Login Link for the Couple */}
        <div className="pt-6 border-t border-[#E9DDCC]/40 flex items-center justify-center">
          <button
            onClick={() => setActiveView('admin')}
            className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#657153] hover:text-[#2C3225] transition-colors py-1 px-3 rounded-full hover:bg-[#657153]/10 cursor-pointer"
          >
            <Lock size={12} />
            <span>Acesso dos Noivos (Painel Administrativo)</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
