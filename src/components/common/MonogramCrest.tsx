import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';

interface MonogramCrestProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'seal' | 'minimal' | 'card';
  className?: string;
  showText?: boolean;
  textPosition?: 'bottom' | 'side';
}

export const MonogramCrest: React.FC<MonogramCrestProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  showText = false,
  textPosition = 'bottom',
}) => {
  const { wedding } = useWedding();
  const [imgError, setImgError] = useState(false);
  const monogramSrc = wedding.monogramImage || '/monograma-ni.jpg';

  const sizeClasses = {
    xs: 'w-9 h-9',
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-52 sm:h-52',
  };

  const imageSizes = {
    xs: 'w-9 h-9',
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-52 sm:h-52',
  };

  const containerVariantClasses = {
    default: 'relative rounded-full p-1 border border-[#608334]/25 bg-white/70 backdrop-blur-md shadow-sm',
    seal: 'relative rounded-full p-1.5 border-2 border-[#CBDDB5] bg-gradient-to-br from-[#F7FEEF] to-[#E9F5DD] shadow-md ring-2 ring-[#608334]/20',
    minimal: 'relative rounded-full overflow-hidden',
    card: 'relative rounded-3xl p-3 border border-[#CBDDB5] bg-white/80 backdrop-blur-md shadow-sm',
  };

  return (
    <div className={`inline-flex ${textPosition === 'bottom' ? 'flex-col' : 'flex-row'} items-center justify-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} ${containerVariantClasses[variant]} flex items-center justify-center transition-all duration-300 group`}>
        {!imgError ? (
          <img
            src={monogramSrc}
            alt={`Anagrama Monograma ${wedding.coupleNames}`}
            className={`${imageSizes[size]} object-contain rounded-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback engraved botanical crest in case image fails */
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-2 rounded-full border border-[#608334]/30 bg-[#F7FEEF]">
            <span className="font-serif italic text-base sm:text-xl font-bold text-[#608334] tracking-widest">
              {wedding.monogram || 'N & I'}
            </span>
          </div>
        )}

        {/* Subtle decorative concentric ring on larger variants */}
        {(size === 'lg' || size === 'xl') && (
          <div className="absolute inset-[-4px] rounded-full border border-[#608334]/15 pointer-events-none" />
        )}
      </div>

      {showText && (
        <div className="text-center">
          <span className="block font-serif text-sm sm:text-base text-[#202D17] font-medium tracking-wide">
            {wedding.coupleNames}
          </span>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#608334] font-semibold">
            {wedding.city} • 2026
          </span>
        </div>
      )}
    </div>
  );
};
