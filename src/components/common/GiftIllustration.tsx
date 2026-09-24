import React, { useId } from 'react';
import { GiftArtMotif } from '../../types';

interface GiftIllustrationProps {
  motif?: GiftArtMotif;
  className?: string;
  label?: string;
}

const OLIVE = '#657153';
const OLIVE_DEEP = '#4E5941';
const GOLD = '#A98C5B';
const NUDE = '#E9DDCC';
const IVORY = '#F9F6EF';

const MOTIF_LABEL: Record<GiftArtMotif, string> = {
  panela: 'Ilustração de um jogo de panelas',
  airfryer: 'Ilustração de uma fritadeira air fryer',
  cafeteira: 'Ilustração de uma cafeteira',
  jantar: 'Ilustração de um jogo de jantar',
  sofa: 'Ilustração de um sofá',
  cama: 'Ilustração de uma cama posta',
  lavadora: 'Ilustração de uma máquina de lavar',
  vassoura: 'Ilustração de uma vassoura e pá',
  churrasqueira: 'Ilustração de uma churrasqueira',
  chuveiro: 'Ilustração de um chuveiro',
  ferramentas: 'Ilustração de um martelo e uma chave inglesa',
  racao: 'Ilustração de um balde de ração e uma ferradura',
  futebol: 'Ilustração de uma camisa de futebol e uma bola',
  bebe: 'Ilustração de um macacão de bebê e uma chupeta',
  viagem: 'Ilustração de uma mala de viagem',
  planta: 'Ilustração de um vaso de planta',
};

/**
 * Line illustration standing in for a product photo. The gifts are all paid by
 * PIX, so these are decorative on purpose — no stock photo pretends the couple
 * is selling a specific product.
 */
export const GiftIllustration: React.FC<GiftIllustrationProps> = ({
  motif = 'planta',
  className = '',
  label,
}) => {
  const uid = useId().replace(/:/g, '');
  const wash = `gift-wash-${uid}`;
  const bleed = `gift-bleed-${uid}`;

  const ink = {
    fill: 'none',
    stroke: OLIVE_DEEP,
    strokeWidth: 3,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    opacity: 0.8,
  };

  const soft = {
    fill: OLIVE,
    stroke: 'none',
    opacity: 0.16,
  };

  return (
    <svg
      viewBox="0 0 320 200"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label ? `${MOTIF_LABEL[motif]} — ${label}` : MOTIF_LABEL[motif]}
      className={`w-full h-full ${className}`}
    >
      <defs>
        <filter id={bleed} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="10" xChannelSelector="R" yChannelSelector="G" />
          <feGaussianBlur stdDeviation="1" />
        </filter>
        <linearGradient id={wash} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={IVORY} />
          <stop offset="100%" stopColor={NUDE} />
        </linearGradient>
      </defs>

      <rect width="320" height="200" fill={`url(#${wash})`} />
      <g filter={`url(#${bleed})`}>
        <ellipse cx="160" cy="100" rx="128" ry="82" fill={GOLD} opacity="0.13" />
        <ellipse cx="86" cy="66" rx="58" ry="40" fill={OLIVE} opacity="0.1" />
      </g>
      <path d="M40 168 h240" stroke={GOLD} strokeWidth="2" opacity="0.45" fill="none" />

      {motif === 'panela' && (
        <>
          <path d="M96 84 h116 v54 a16 16 0 0 1 -16 16 h-84 a16 16 0 0 1 -16 -16 Z" {...soft} />
          <path d="M96 84 h116 v54 a16 16 0 0 1 -16 16 h-84 a16 16 0 0 1 -16 -16 Z" {...ink} />
          <path d="M88 74 h132 M154 74 v-12" {...ink} />
          <circle cx="154" cy="56" r="7" {...ink} />
          <path d="M212 96 h26 a10 10 0 0 1 0 20 h-26 M96 96 H70 a10 10 0 0 0 0 20 h26" {...ink} />
          <path d="M132 40 q10 -12 0 -22 M176 40 q10 -12 0 -22" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'airfryer' && (
        <>
          <path d="M104 48 h112 a14 14 0 0 1 14 14 v78 a14 14 0 0 1 -14 14 h-112 a14 14 0 0 1 -14 -14 v-78 a14 14 0 0 1 14 -14 Z" {...soft} />
          <path d="M104 48 h112 a14 14 0 0 1 14 14 v78 a14 14 0 0 1 -14 14 h-112 a14 14 0 0 1 -14 -14 v-78 a14 14 0 0 1 14 -14 Z" {...ink} />
          <rect x="110" y="66" width="76" height="44" rx="8" {...ink} />
          <circle cx="210" cy="88" r="12" {...ink} />
          <path d="M210 80 v8" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M104 154 v10 M216 154 v10" {...ink} />
          <path d="M128 92 q10 -12 0 -20 M158 92 q10 -12 0 -20" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'cafeteira' && (
        <>
          <path d="M112 60 h96 v40 a20 20 0 0 1 -20 20 h-56 a20 20 0 0 1 -20 -20 Z" {...soft} />
          <path d="M112 60 h96 v40 a20 20 0 0 1 -20 20 h-56 a20 20 0 0 1 -20 -20 Z" {...ink} />
          <path d="M208 70 q26 -2 26 18 q0 20 -26 18" {...ink} />
          <path d="M140 120 v22 h40 v-22" {...ink} />
          <path d="M120 154 h80" {...ink} />
          <path d="M140 42 q10 -14 0 -24 M180 42 q10 -14 0 -24" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.75" />
        </>
      )}

      {motif === 'jantar' && (
        <>
          <ellipse cx="160" cy="112" rx="58" ry="34" {...soft} />
          <ellipse cx="160" cy="112" rx="58" ry="34" {...ink} />
          <ellipse cx="160" cy="112" rx="34" ry="19" stroke={GOLD} strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M84 62 v40 M76 62 v20 M92 62 v20 M84 102 v44" {...ink} />
          <path d="M240 62 q14 6 14 26 q0 14 -14 16 v42" {...ink} />
        </>
      )}

      {motif === 'sofa' && (
        <>
          <path d="M74 96 q0 -24 22 -24 h128 q22 0 22 24 v30 h-172 Z" {...soft} />
          <path d="M74 96 q0 -24 22 -24 h128 q22 0 22 24 v30 h-172 Z" {...ink} />
          <path d="M62 100 q12 0 12 18 v24 h172 v-24 q0 -18 12 -18 q14 0 14 20 v30 h-224 v-30 q0 -20 14 -20 Z" {...ink} />
          <path d="M160 72 v54" {...ink} />
          <path d="M96 170 v10 M224 170 v10" {...ink} />
        </>
      )}

      {motif === 'cama' && (
        <>
          <path d="M70 108 h180 v38 h-180 Z" {...soft} />
          <path d="M62 146 v-52 q0 -14 16 -14 h164 q16 0 16 14 v52" {...ink} />
          <path d="M56 146 h208" {...ink} />
          <path d="M84 96 q18 -12 36 0 M200 96 q18 -12 36 0" {...ink} />
          <path d="M62 66 v28 M258 66 v28" {...ink} />
          <path d="M70 158 v12 M250 158 v12" {...ink} />
          <path d="M120 122 q40 -10 80 0" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'lavadora' && (
        <>
          <rect x="98" y="42" width="124" height="118" rx="14" {...soft} />
          <rect x="98" y="42" width="124" height="118" rx="14" {...ink} />
          <path d="M98 72 h124" {...ink} />
          <circle cx="160" cy="118" r="30" {...ink} />
          <circle cx="160" cy="118" r="17" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.75" />
          <circle cx="200" cy="57" r="5" fill={GOLD} stroke="none" opacity="0.8" />
          <path d="M118 57 h34" {...ink} />
        </>
      )}

      {motif === 'vassoura' && (
        <>
          <path d="M150 34 l-34 84 h56 l12 -84 Z" {...soft} />
          <path d="M176 34 l-18 78" {...ink} />
          <path d="M132 112 h56 l12 44 q-40 12 -80 0 Z" {...ink} />
          <path d="M146 118 v32 M160 118 v34 M174 118 v32" stroke={GOLD} strokeWidth="2.5" opacity="0.6" fill="none" />
          <path d="M214 156 h44 l-8 -34 h-30 q-10 16 -6 34 Z" {...ink} />
        </>
      )}

      {motif === 'churrasqueira' && (
        <>
          <path d="M84 90 h152 q-8 52 -50 56 h-52 q-42 -4 -50 -56 Z" {...soft} />
          <path d="M84 90 h152 q-8 52 -50 56 h-52 q-42 -4 -50 -56 Z" {...ink} />
          <path d="M110 146 l-14 26 M210 146 l14 26 M160 148 v24" {...ink} />
          <path d="M100 90 h120" {...ink} />
          <path d="M120 70 q10 -16 0 -30 M160 66 q12 -18 0 -34 M200 70 q10 -16 0 -30" stroke={GOLD} strokeWidth="3" fill="none" opacity="0.75" />
        </>
      )}

      {motif === 'chuveiro' && (
        <>
          <path d="M120 58 h80 q10 0 10 10 t-10 10 h-80 q-10 0 -10 -10 t10 -10 Z" {...soft} />
          <path d="M116 58 h88 q8 0 8 10 t-8 10 h-88 q-8 0 -8 -10 t8 -10 Z" {...ink} />
          <path d="M160 58 v-24 q0 -10 14 -10 h34" {...ink} />
          <g stroke={GOLD} strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none">
            <path d="M128 92 v20 M148 92 v34 M168 92 v26 M188 92 v38 M138 120 v16 M178 128 v16" />
          </g>
        </>
      )}

      {motif === 'ferramentas' && (
        <>
          <path d="M96 140 l60 -60 l18 18 l-60 60 Z" {...soft} />
          <path d="M96 140 l60 -60 l18 18 l-60 60 Z" {...ink} />
          <path d="M150 62 q18 -18 38 -8 l-18 18 l14 14 l18 -18 q10 20 -8 38 q-14 14 -32 8" {...ink} />
          <path d="M214 132 q16 4 22 18 l-26 10 q-8 -14 -2 -24 Z" {...ink} />
          <path d="M84 152 l18 18" stroke={GOLD} strokeWidth="3" strokeLinecap="round" opacity="0.7" fill="none" />
        </>
      )}

      {motif === 'racao' && (
        <>
          <path d="M104 78 h84 l-10 74 h-64 Z" {...soft} />
          <path d="M104 78 h84 l-10 74 h-64 Z" {...ink} />
          <path d="M98 78 h96" {...ink} />
          <g fill={GOLD} opacity="0.55" stroke="none">
            <circle cx="126" cy="66" r="6" />
            <circle cx="146" cy="58" r="6" />
            <circle cx="166" cy="66" r="6" />
          </g>
          <path d="M212 142 q-16 -36 0 -54 q14 -18 30 -18 q16 0 30 18 q16 18 0 54" fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        </>
      )}

      {motif === 'futebol' && (
        <>
          <path d="M126 52 l34 14 l34 -14 l30 18 l-16 28 l-14 -6 v62 h-68 v-62 l-14 6 l-16 -28 Z" {...soft} />
          <path d="M126 52 l34 14 l34 -14 l30 18 l-16 28 l-14 -6 v62 h-68 v-62 l-14 6 l-16 -28 Z" {...ink} />
          <path d="M140 84 v70 M180 84 v70" stroke={GOLD} strokeWidth="3" opacity="0.6" fill="none" />
          <circle cx="248" cy="136" r="24" {...ink} />
          <path d="M248 118 l12 10 l-6 16 h-14 l-6 -16 Z" fill={OLIVE_DEEP} opacity="0.55" stroke="none" />
        </>
      )}

      {motif === 'bebe' && (
        <>
          <path d="M126 50 q34 18 68 0 l18 16 l-16 20 l-8 -6 v64 q-34 12 -56 0 v-64 l-8 6 l-16 -20 Z" {...soft} />
          <path d="M126 50 q34 18 68 0 l18 16 l-16 20 l-8 -6 v64 q-34 12 -56 0 v-64 l-8 6 l-16 -20 Z" {...ink} />
          <path d="M160 132 v12" {...ink} />
          <circle cx="246" cy="120" r="16" {...ink} />
          <path d="M246 104 q14 -10 22 0 q-8 12 -22 8" {...ink} />
          <path d="M138 96 q22 10 44 0" stroke={GOLD} strokeWidth="2.5" fill="none" opacity="0.7" />
        </>
      )}

      {motif === 'viagem' && (
        <>
          <rect x="96" y="70" width="128" height="86" rx="12" {...soft} />
          <rect x="96" y="70" width="128" height="86" rx="12" {...ink} />
          <path d="M136 70 v-14 q0 -8 10 -8 h28 q10 0 10 8 v14" {...ink} />
          <path d="M96 100 h128 M96 126 h128" stroke={GOLD} strokeWidth="2.5" opacity="0.6" fill="none" />
          <path d="M112 156 v12 M208 156 v12" {...ink} />
          <path d="M238 52 l32 14 l-32 14 l6 -14 Z" fill={GOLD} opacity="0.55" stroke="none" />
        </>
      )}

      {motif === 'planta' && (
        <>
          <path d="M120 112 h80 l-12 46 h-56 Z" {...soft} />
          <path d="M116 112 h88 l-12 46 q-32 8 -64 0 Z" {...ink} />
          <path d="M160 112 v-46" {...ink} />
          <path d="M160 88 q-28 -6 -36 -30 q28 0 36 22 M160 76 q26 -8 32 -30 q-26 2 -32 24" {...ink} />
          <path d="M112 104 h96" stroke={GOLD} strokeWidth="2.5" opacity="0.6" fill="none" />
        </>
      )}
    </svg>
  );
};
