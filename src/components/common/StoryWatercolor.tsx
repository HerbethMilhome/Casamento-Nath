import React, { useId } from 'react';
import { StoryArtMotif } from '../../types';

interface StoryWatercolorProps {
  motif?: StoryArtMotif;
  className?: string;
  /** Short description of the place, used in the accessible label. */
  label?: string;
}

const OLIVE = '#657153';
const OLIVE_DEEP = '#4E5941';
const GOLD = '#A98C5B';
const NUDE = '#E9DDCC';
const IVORY = '#F9F6EF';

const MOTIF_LABEL: Record<StoryArtMotif, string> = {
  encontro: 'Aquarela de um encontro entre duas pessoas',
  restaurante: 'Aquarela de uma mesa de jantar para dois',
  estrada: 'Aquarela de uma estrada entre colinas',
  serra: 'Aquarela das montanhas da serra',
  cavalo: 'Aquarela de um cavalo no sertão',
  praia: 'Aquarela de praia com mar e coqueiro',
  rio: 'Aquarela de um rio entre as margens',
  estadio: 'Aquarela de um estádio de futebol',
  cachoeira: 'Aquarela de uma cachoeira',
  pedra: 'Aquarela de formações rochosas com pinturas rupestres',
  gestacao: 'Aquarela simbolizando a espera de um bebê',
  alianca: 'Aquarela de duas alianças entrelaçadas',
  capela: 'Aquarela de uma capela na serra',
};

/**
 * Hand-drawn watercolour stand-in for a photo the couple has not uploaded yet.
 * Deliberately abstract: it never depicts faces, so it cannot be mistaken for
 * a real picture of Nathalie and Igor.
 */
export const StoryWatercolor: React.FC<StoryWatercolorProps> = ({
  motif = 'serra',
  className = '',
  label,
}) => {
  const uid = useId().replace(/:/g, '');
  const bleed = `bleed-${uid}`;
  const grain = `grain-${uid}`;
  const sky = `sky-${uid}`;
  const wash = `wash-${uid}`;

  const ink = {
    fill: 'none',
    stroke: OLIVE_DEEP,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    opacity: 0.75,
  };

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `${MOTIF_LABEL[motif]} — ${label}` : MOTIF_LABEL[motif]}
      className={`w-full h-full ${className}`}
    >
      <defs>
        {/* Organic edges: displaces the washes so they bleed like wet pigment */}
        <filter id={bleed} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="4" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1.4" />
        </filter>

        {/* Paper tooth */}
        <filter id={grain}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="g" />
          <feColorMatrix in="g" type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.12" />
          </feComponentTransfer>
        </filter>

        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={IVORY} />
          <stop offset="55%" stopColor="#F3EDE1" />
          <stop offset="100%" stopColor={NUDE} />
        </linearGradient>

        <radialGradient id={wash} cx="50%" cy="45%" r="62%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.22" />
          <stop offset="100%" stopColor={OLIVE} stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Paper + ambient wash, shared by every motif */}
      <rect width="400" height="300" fill={`url(#${sky})`} />
      <g filter={`url(#${bleed})`}>
        <ellipse cx="200" cy="150" rx="185" ry="130" fill={`url(#${wash})`} />
        <ellipse cx="96" cy="88" rx="78" ry="54" fill={GOLD} opacity="0.1" />
        <ellipse cx="310" cy="212" rx="92" ry="62" fill={OLIVE} opacity="0.1" />
      </g>

      {motif === 'serra' && (
        <>
          <g filter={`url(#${bleed})`} opacity="0.95">
            <path d="M-10 224 L92 128 L168 196 L236 118 L330 214 L410 166 L410 300 L-10 300 Z" fill={OLIVE} opacity="0.3" />
            <path d="M-10 250 L80 186 L176 246 L268 180 L410 252 L410 300 L-10 300 Z" fill={OLIVE_DEEP} opacity="0.35" />
            <ellipse cx="150" cy="212" rx="120" ry="16" fill={IVORY} opacity="0.55" />
          </g>
          <path d="M-6 236 L88 142 L164 204 L232 132 L326 220" {...ink} />
          <path d="M40 206 q52 -14 104 4 M212 220 q60 -18 118 6" stroke={IVORY} strokeWidth="2.4" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'encontro' && (
        <>
          <g filter={`url(#${bleed})`}>
            <ellipse cx="200" cy="176" rx="118" ry="72" fill={OLIVE} opacity="0.2" />
            <rect x="60" y="232" width="280" height="30" rx="10" fill={OLIVE_DEEP} opacity="0.24" />
          </g>
          {/* two cups of coffee — the conversation that started everything */}
          <g {...ink}>
            <path d="M126 176 h60 v34 a30 30 0 0 1 -60 0 Z" />
            <path d="M186 182 q22 -4 22 12 q0 16 -22 12" />
            <ellipse cx="156" cy="176" rx="30" ry="7" />
            <path d="M214 176 h60 v34 a30 30 0 0 1 -60 0 Z" />
            <path d="M274 182 q22 -4 22 12 q0 16 -22 12" />
            <ellipse cx="244" cy="176" rx="30" ry="7" />
            <path d="M120 236 h160" />
          </g>
          <g stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.7" strokeLinecap="round">
            <path d="M146 158 q8 -12 0 -24 q-8 -12 0 -22 M166 158 q8 -12 0 -24 q-8 -12 0 -22" />
            <path d="M234 158 q8 -12 0 -24 q-8 -12 0 -22 M254 158 q8 -12 0 -24 q-8 -12 0 -22" />
          </g>
          <g fill={GOLD} opacity="0.3" stroke="none">
            <ellipse cx="156" cy="176" rx="26" ry="5.5" />
            <ellipse cx="244" cy="176" rx="26" ry="5.5" />
          </g>
        </>
      )}

      {motif === 'restaurante' && (
        <>
          <g filter={`url(#${bleed})`}>
            <rect x="52" y="214" width="296" height="44" rx="12" fill={OLIVE} opacity="0.26" />
            <ellipse cx="200" cy="120" rx="96" ry="66" fill={GOLD} opacity="0.16" />
          </g>
          <path d="M52 216 h296" {...ink} />
          {/* two long-stem glasses */}
          <path d="M132 118 q22 42 0 58 q-22 -16 0 -58 Z M132 176 v34 M116 212 h32" {...ink} />
          <path d="M268 118 q22 42 0 58 q-22 -16 0 -58 Z M268 176 v34 M252 212 h32" {...ink} />
          <ellipse cx="200" cy="200" rx="30" ry="9" {...ink} />
          <path d="M132 134 q11 6 0 12 q-11 -6 0 -12 Z" fill={GOLD} opacity="0.45" stroke="none" />
          <path d="M268 134 q11 6 0 12 q-11 -6 0 -12 Z" fill={GOLD} opacity="0.45" stroke="none" />
        </>
      )}

      {motif === 'estrada' && (
        <>
          <g filter={`url(#${bleed})`}>
            <path d="M-10 214 L96 138 L186 206 L280 142 L410 210 L410 300 L-10 300 Z" fill={OLIVE} opacity="0.26" />
            <path d="M162 300 q34 -104 6 -160 q-16 -32 34 -58 q44 -22 24 -52" fill="none" stroke={NUDE} strokeWidth="46" opacity="0.85" />
          </g>
          <path d="M162 300 q34 -104 6 -160 q-16 -32 34 -58 q44 -22 24 -52" fill="none" stroke={OLIVE_DEEP} strokeWidth="1.4" opacity="0.5" strokeDasharray="1 0" />
          <path d="M176 288 v-22 M182 240 v-20 M196 190 v-18 M216 148 v-16" stroke={IVORY} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <path d="M-6 216 L96 144 L186 204 L280 148 L406 212" {...ink} />
        </>
      )}

      {motif === 'cavalo' && (
        <>
          <g filter={`url(#${bleed})`}>
            <ellipse cx="200" cy="262" rx="170" ry="26" fill={OLIVE} opacity="0.2" />
            <path
              d="M128 172 q2 -16 16 -22 L224 86 q6 -14 14 -16 l6 -30 l16 30 q16 6 20 26 q18 60 30 96 q10 32 6 84 L196 276 q-12 -44 -20 -66 q-8 -22 -26 -30 q-12 -4 -22 -8 Z"
              fill={OLIVE_DEEP}
              opacity="0.26"
            />
          </g>
          {/* horse head in profile */}
          <path
            d="M128 172 q2 -16 16 -22 L224 86 q6 -14 14 -16 l6 -30 l16 30 q16 6 20 26 q18 60 30 96 q10 32 6 84 L196 276 q-12 -44 -20 -66 q-8 -22 -26 -30 q-12 -4 -22 -8 Z"
            {...ink}
          />
          {/* mane down the crest of the neck */}
          <g stroke={OLIVE_DEEP} strokeWidth="1.8" fill="none" opacity="0.55" strokeLinecap="round">
            <path d="M256 74 q24 32 28 76 q4 40 10 68 M246 88 q24 36 26 80 q2 38 8 66 M236 104 q22 38 22 78 q0 38 6 66" />
          </g>
          <circle cx="192" cy="124" r="3.6" fill={OLIVE_DEEP} opacity="0.85" stroke="none" />
          <path d="M142 162 q7 -5 11 1" stroke={OLIVE_DEEP} strokeWidth="1.6" fill="none" opacity="0.7" />
          <path d="M166 148 q18 16 6 34" stroke={OLIVE_DEEP} strokeWidth="1.4" fill="none" opacity="0.45" />
          {/* bridle */}
          <path d="M150 150 q28 20 48 10 M188 110 q-10 32 -24 50" stroke={GOLD} strokeWidth="2" fill="none" opacity="0.85" />
          {/* horseshoe, for the vaquejada */}
          <g transform="translate(316 206)">
            <path d="M-22 26 q-12 -30 0 -44 q12 -16 24 -16 q12 0 24 16 q12 14 0 44" fill="none" stroke={GOLD} strokeWidth="5" strokeLinecap="round" opacity="0.85" />
            <g fill={GOLD} opacity="0.5" stroke="none">
              <circle cx="-14" cy="6" r="2.2" />
              <circle cx="-8" cy="-12" r="2.2" />
              <circle cx="16" cy="-12" r="2.2" />
              <circle cx="22" cy="6" r="2.2" />
            </g>
          </g>
          <path d="M60 268 q60 -12 130 -4 q66 8 150 -6" stroke={GOLD} strokeWidth="1.8" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'praia' && (
        <>
          <g filter={`url(#${bleed})`}>
            <rect x="-10" y="150" width="420" height="80" fill={OLIVE} opacity="0.22" />
            <rect x="-10" y="222" width="420" height="88" fill={NUDE} opacity="0.9" />
            <circle cx="300" cy="106" r="34" fill={GOLD} opacity="0.35" />
          </g>
          <path d="M-6 152 h412" {...ink} />
          <path d="M20 176 q22 -12 44 0 q22 12 44 0 q22 -12 44 0 M140 200 q24 -12 48 0 q24 12 48 0 q24 -12 48 0" stroke={IVORY} strokeWidth="2.6" fill="none" opacity="0.85" />
          <circle cx="300" cy="106" r="34" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.8" />
          {/* coqueiro */}
          <path d="M88 268 q-8 -56 6 -92" {...ink} />
          <path d="M94 176 q-32 -18 -50 -6 M94 176 q-14 -32 4 -44 M94 176 q30 -22 50 -8 M94 176 q18 -30 42 -26" {...ink} />
          <path d="M-6 268 q70 -16 140 -6" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.6" />
        </>
      )}

      {motif === 'rio' && (
        <>
          <g filter={`url(#${bleed})`}>
            <path d="M-10 300 q90 -60 74 -140 q-8 -44 -30 -70 L410 90 L410 300 Z" fill={OLIVE} opacity="0.2" />
            <path d="M120 -10 q30 90 -18 150 q-52 64 -30 160 L410 300 L410 -10 Z" fill={OLIVE_DEEP} opacity="0.1" />
            <path d="M92 -10 q26 92 -20 152 q-50 66 -24 158" fill="none" stroke="#8A9468" strokeWidth="58" opacity="0.5" />
          </g>
          <path d="M92 -10 q26 92 -20 152 q-50 66 -24 158" fill="none" stroke={OLIVE_DEEP} strokeWidth="1.4" opacity="0.4" />
          <path d="M110 70 q26 10 44 0 M86 140 q26 10 46 -2 M64 210 q26 10 46 -2" stroke={IVORY} strokeWidth="2.4" fill="none" opacity="0.8" />
          <path d="M250 216 q20 -34 42 -2 M290 214 q22 -46 46 -4 M330 216 q16 -30 38 -4" {...ink} />
          <path d="M240 232 h150" stroke={GOLD} strokeWidth="1.6" opacity="0.7" fill="none" />
        </>
      )}

      {motif === 'estadio' && (
        <>
          <g filter={`url(#${bleed})`}>
            <ellipse cx="200" cy="216" rx="164" ry="62" fill={OLIVE} opacity="0.28" />
            <path d="M36 178 q164 -96 328 0 L364 190 q-164 -84 -328 0 Z" fill={OLIVE_DEEP} opacity="0.22" />
          </g>
          <ellipse cx="200" cy="216" rx="164" ry="62" {...ink} />
          <ellipse cx="200" cy="216" rx="42" ry="17" {...ink} />
          <path d="M200 154 v124" {...ink} />
          <path d="M36 178 q164 -96 328 0" {...ink} />
          {/* refletores */}
          <path d="M70 128 v-44 M330 128 v-44" {...ink} />
          <path d="M52 84 h36 M312 84 h36" stroke={GOLD} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.85" />
          <path d="M156 196 q44 -20 88 0 q-44 22 -88 0 Z" fill={GOLD} opacity="0.22" stroke="none" />
        </>
      )}

      {motif === 'cachoeira' && (
        <>
          <g filter={`url(#${bleed})`}>
            <path d="M-10 300 L-10 96 L120 96 L150 240 L410 240 L410 300 Z" fill={OLIVE} opacity="0.26" />
            <rect x="140" y="236" width="270" height="70" fill="#8A9468" opacity="0.4" />
            <path d="M120 96 q34 76 26 144 q-40 6 -56 -2 q6 -70 30 -142 Z" fill={IVORY} opacity="0.92" />
          </g>
          <path d="M-6 98 L118 98 q34 76 28 144" {...ink} />
          <path d="M104 110 q6 60 -4 118 M120 112 q8 58 0 116 M136 118 q8 56 2 112" stroke={IVORY} strokeWidth="2.6" fill="none" opacity="0.95" />
          <path d="M150 250 q34 -16 66 2 q34 18 70 -2 q34 -18 70 2" stroke={IVORY} strokeWidth="2.4" fill="none" opacity="0.8" />
          <path d="M150 276 q40 -14 80 4 q40 16 80 -4" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.6" />
        </>
      )}

      {motif === 'pedra' && (
        <>
          <g filter={`url(#${bleed})`}>
            <path d="M-10 300 L-10 212 L78 120 L170 214 L246 132 L340 214 L410 176 L410 300 Z" fill={GOLD} opacity="0.22" />
            <path d="M40 300 L96 168 L156 300 Z" fill={OLIVE_DEEP} opacity="0.26" />
            <path d="M228 300 L282 152 L340 300 Z" fill={OLIVE} opacity="0.24" />
          </g>
          <path d="M-6 214 L78 126 L170 212 L246 138 L338 212 L406 178" {...ink} />
          {/* pinturas rupestres */}
          <g stroke={GOLD} strokeWidth="2.2" fill="none" opacity="0.85" strokeLinecap="round">
            <path d="M104 236 v22 M104 242 l-10 10 M104 242 l10 10 M104 258 l-8 14 M104 258 l8 14" />
            <circle cx="104" cy="230" r="5" />
            <path d="M292 240 v20 M292 246 l-9 9 M292 246 l9 9 M292 260 l-7 13 M292 260 l7 13" />
            <circle cx="292" cy="234" r="5" />
            <path d="M188 258 q14 -16 30 0 q-6 12 -30 0 Z M218 252 l12 -8" />
          </g>
        </>
      )}

      {motif === 'gestacao' && (
        <>
          <g filter={`url(#${bleed})`}>
            <circle cx="200" cy="158" r="84" fill={GOLD} opacity="0.2" />
            <circle cx="200" cy="158" r="50" fill={OLIVE} opacity="0.16" />
          </g>
          <circle cx="200" cy="158" r="84" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.8" />
          <path d="M200 192 q-26 -24 -26 -42 q0 -18 16 -18 q12 0 10 14 q-2 -14 10 -14 q16 0 16 18 q0 18 -26 42 Z" fill={OLIVE} opacity="0.5" stroke="none" />
          {/* ramos de louro ao redor */}
          <path d="M116 216 q28 24 84 26 q56 -2 84 -26" {...ink} />
          <g stroke={OLIVE_DEEP} strokeWidth="1.4" fill="none" opacity="0.6">
            <path d="M140 230 q-12 -14 -4 -26 M164 242 q-12 -14 -4 -26 M236 242 q12 -14 4 -26 M260 230 q12 -14 4 -26" />
          </g>
        </>
      )}

      {motif === 'alianca' && (
        <>
          <g filter={`url(#${bleed})`}>
            <circle cx="164" cy="156" r="58" fill={GOLD} opacity="0.24" />
            <circle cx="238" cy="172" r="58" fill={OLIVE} opacity="0.2" />
          </g>
          <circle cx="164" cy="156" r="58" stroke={GOLD} strokeWidth="3.2" fill="none" opacity="0.95" />
          <circle cx="238" cy="172" r="58" stroke={GOLD} strokeWidth="3.2" fill="none" opacity="0.7" />
          <circle cx="164" cy="156" r="49" stroke={GOLD} strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M164 92 l9 -16 l9 16 Z" fill={GOLD} opacity="0.9" stroke="none" />
          <path d="M92 246 q54 18 108 16 q54 -2 108 -18" stroke={OLIVE_DEEP} strokeWidth="1.5" fill="none" opacity="0.55" />
          <g stroke={OLIVE_DEEP} strokeWidth="1.3" fill="none" opacity="0.5">
            <path d="M120 256 q-10 -14 -2 -24 M168 264 q-10 -14 -2 -24 M232 264 q10 -14 2 -24 M280 256 q10 -14 2 -24" />
          </g>
        </>
      )}

      {motif === 'capela' && (
        <>
          <g filter={`url(#${bleed})`}>
            <path d="M-10 236 L86 150 L168 214 L252 142 L346 220 L410 184 L410 300 L-10 300 Z" fill={OLIVE} opacity="0.26" />
            <rect x="150" y="150" width="104" height="104" fill={IVORY} opacity="0.95" />
            <path d="M142 152 L202 106 L262 152 Z" fill={NUDE} opacity="0.95" />
          </g>
          <path d="M-6 238 L86 156 L168 212 L252 148 L344 222" {...ink} />
          <rect x="150" y="150" width="104" height="104" {...ink} />
          <path d="M140 152 L202 104 L264 152" {...ink} />
          <path d="M202 104 v-26 M190 88 h24" stroke={GOLD} strokeWidth="2.6" fill="none" opacity="0.95" strokeLinecap="round" />
          <path d="M186 254 v-46 q16 -20 32 0 v46" {...ink} />
          <path d="M202 208 v46 M186 230 h32" stroke={OLIVE_DEEP} strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="202" cy="140" r="7" {...ink} />
          <path d="M96 268 q54 -14 106 -10 q52 4 106 -8" stroke={GOLD} strokeWidth="1.6" fill="none" opacity="0.7" />
        </>
      )}

      {/* Paper tooth on top of everything */}
      <rect width="400" height="300" filter={`url(#${grain})`} opacity="0.5" />
    </svg>
  );
};
