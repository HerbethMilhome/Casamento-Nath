import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { MonogramCrest } from '../common/MonogramCrest';

export const Footer: React.FC = () => {
  const { wedding } = useWedding();

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

      </div>
    </footer>
  );
};
