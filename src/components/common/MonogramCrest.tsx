import React, { useId, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { formatDateLong } from '../../utils/format';

interface MonogramCrestProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'seal' | 'minimal' | 'card';
  className?: string;
  showText?: boolean;
  textPosition?: 'bottom' | 'side';
  /** Force the engraved date ring on or off. Defaults to on from `md` up. */
  showDate?: boolean;
}

const OLIVE = '#657153';
const OLIVE_DEEP = '#4E5941';
const GOLD = '#A98C5B';
const GOLD_LIGHT = '#C7AC7E';

/**
 * Hand-drawn botanical crest: lilies, olive branches, the couple's monogram and
 * the wedding date engraved on the bottom arc. Drawn as SVG so it stays sharp at
 * every size. If the couple uploads their own crest (`wedding.monogramImage`),
 * that image is used instead.
 */
export const MonogramCrest: React.FC<MonogramCrestProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  showText = false,
  textPosition = 'bottom',
  showDate,
}) => {
  const { wedding } = useWedding();
  const [imgError, setImgError] = useState(false);
  const uid = useId().replace(/:/g, '');
  const arcBottom = `arc-bottom-${uid}`;
  const arcTop = `arc-top-${uid}`;

  const customImage = wedding.monogramImage && !imgError ? wedding.monogramImage : '';
  const monogram = wedding.monogram || 'N & I';
  const dateLong = formatDateLong(wedding.weddingDate);
  const engraved = showDate ?? (size === 'md' || size === 'lg' || size === 'xl');

  const sizeClasses = {
    xs: 'w-9 h-9',
    sm: 'w-12 h-12',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-36 sm:h-36',
    xl: 'w-40 h-40 sm:w-52 sm:h-52',
  };

  const containerVariantClasses = {
    default: 'relative rounded-full p-1 border border-[#657153]/25 bg-white/70 backdrop-blur-md shadow-sm',
    seal: 'relative rounded-full p-1.5 border-2 border-[#E9DDCC] bg-gradient-to-br from-[#F9F6EF] to-[#F3EDE1] shadow-md ring-2 ring-[#A98C5B]/25',
    minimal: 'relative rounded-full overflow-hidden',
    card: 'relative rounded-3xl p-3 border border-[#E9DDCC] bg-white/80 backdrop-blur-md shadow-sm',
  };

  const branch = {
    fill: 'none',
    stroke: OLIVE,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <div className={`inline-flex ${textPosition === 'bottom' ? 'flex-col' : 'flex-row'} items-center justify-center gap-2 ${className}`}>
      <div className={`${sizeClasses[size]} ${containerVariantClasses[variant]} flex items-center justify-center transition-all duration-300 group`}>
        {customImage ? (
          <img
            src={customImage}
            alt={`Brasão de ${wedding.coupleNames}`}
            className="w-full h-full object-contain rounded-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            role="img"
            aria-label={`Brasão de ${wedding.coupleNames} — ${dateLong}, ${wedding.city}`}
            className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500"
          >
            <defs>
              {/* Bottom arc, left to right, for the engraved date */}
              <path id={arcBottom} d="M 30 108 A 70 70 0 0 0 170 108" fill="none" />
              {/* Top arc for the city */}
              <path id={arcTop} d="M 34 96 A 66 66 0 0 1 166 96" fill="none" />
              <linearGradient id={`gold-${uid}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={GOLD_LIGHT} />
                <stop offset="55%" stopColor={GOLD} />
                <stop offset="100%" stopColor="#8A7248" />
              </linearGradient>
            </defs>

            {/* Double gold ring */}
            <circle cx="100" cy="100" r="94" fill="none" stroke={`url(#gold-${uid})`} strokeWidth="2.2" />
            <circle cx="100" cy="100" r="87" fill="none" stroke={GOLD} strokeWidth="0.8" opacity="0.6" />

            {/* Olive branches curving up both sides */}
            <g {...branch} opacity="0.9">
              <path d="M62 150 q-22 -30 -12 -62" />
              <path d="M138 150 q22 -30 12 -62" />
              <g strokeWidth="1.5" opacity="0.85">
                <path d="M53 130 q-14 -4 -18 -16 M51 114 q-14 -3 -17 -15 M52 98 q-13 -4 -15 -16" />
                <path d="M147 130 q14 -4 18 -16 M149 114 q14 -3 17 -15 M148 98 q13 -4 15 -16" />
              </g>
              <g fill={OLIVE} stroke="none" opacity="0.35">
                <ellipse cx="41" cy="122" rx="7" ry="3.4" transform="rotate(-28 41 122)" />
                <ellipse cx="40" cy="106" rx="7" ry="3.4" transform="rotate(-28 40 106)" />
                <ellipse cx="41" cy="90" rx="7" ry="3.4" transform="rotate(-28 41 90)" />
                <ellipse cx="159" cy="122" rx="7" ry="3.4" transform="rotate(28 159 122)" />
                <ellipse cx="160" cy="106" rx="7" ry="3.4" transform="rotate(28 160 106)" />
                <ellipse cx="159" cy="90" rx="7" ry="3.4" transform="rotate(28 159 90)" />
              </g>
            </g>

            {/* Two lilies at the crown */}
            <g transform="translate(100 44)">
              <g fill="none" stroke={OLIVE_DEEP} strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
                <path d="M0 16 q-4 -18 -16 -24 q-3 14 6 22" />
                <path d="M0 16 q4 -18 16 -24 q3 14 -6 22" />
                <path d="M0 16 q-12 -12 -26 -10 q6 12 20 14" />
                <path d="M0 16 q12 -12 26 -10 q-6 12 -20 14" />
                <path d="M0 16 v-22" />
              </g>
              <g fill={GOLD} opacity="0.3" stroke="none">
                <path d="M0 16 q-4 -18 -16 -24 q-3 14 6 22 Z" />
                <path d="M0 16 q4 -18 16 -24 q3 14 -6 22 Z" />
              </g>
              <circle cx="0" cy="17" r="2.6" fill={GOLD} />
            </g>

            {/* Monogram */}
            <text
              x="100"
              y="110"
              textAnchor="middle"
              fill={OLIVE_DEEP}
              style={{ fontFamily: "'Great Vibes', 'Cormorant Garamond', cursive" }}
              fontSize="42"
            >
              {monogram}
            </text>

            {/* Hairline flourish under the monogram */}
            <path d="M68 124 q32 9 64 0" fill="none" stroke={GOLD} strokeWidth="1.2" opacity="0.85" />
            <path d="M92 130 q8 6 16 0" fill="none" stroke={GOLD} strokeWidth="1" opacity="0.6" />

            {engraved && (
              <>
                {/* Engraved date on the bottom arc */}
                <text
                  fill={OLIVE}
                  fontSize="11.5"
                  letterSpacing="1.1"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }}
                >
                  <textPath href={`#${arcBottom}`} startOffset="50%" textAnchor="middle">
                    {dateLong.toUpperCase()}
                  </textPath>
                </text>
                {/* City on the top arc */}
                <text
                  fill={GOLD}
                  fontSize="8.4"
                  letterSpacing="1.7"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600 }}
                >
                  <textPath href={`#${arcTop}`} startOffset="50%" textAnchor="middle">
                    {`${wedding.city} — ${wedding.state}`.toUpperCase()}
                  </textPath>
                </text>
                {/* Small gold pips closing the two arcs */}
                <circle cx="24" cy="100" r="2" fill={GOLD} />
                <circle cx="176" cy="100" r="2" fill={GOLD} />
              </>
            )}
          </svg>
        )}
      </div>

      {showText && (
        <div className="text-center">
          <span className="block font-serif text-sm sm:text-base text-[#2C3225] font-medium tracking-wide">
            {wedding.coupleNames}
          </span>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#A98C5B] font-semibold">
            {dateLong}
          </span>
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#657153] opacity-80">
            {wedding.city} — {wedding.state}
          </span>
        </div>
      )}
    </div>
  );
};
