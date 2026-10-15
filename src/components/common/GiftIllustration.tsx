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
  microondas: 'Ilustração de um micro-ondas',
  arcondicionado: 'Ilustração de um ar-condicionado split',
  liquidificador: 'Ilustração de um liquidificador',
  cafeteira: 'Ilustração de uma cafeteira',
  aspirador: 'Ilustração de um aspirador de pó vertical',
  ferro: 'Ilustração de um ferro de passar',
  sanduicheira: 'Ilustração de uma sanduicheira',
  cama: 'Ilustração de uma cama posta',
  toalhas: 'Ilustração de toalhas dobradas',
  edredom: 'Ilustração de um edredom',
  travesseiros: 'Ilustração de dois travesseiros',
  jogoamericano: 'Ilustração de um jogo americano com prato e talheres',
  manta: 'Ilustração de uma manta dobrada',
  jantar: 'Ilustração de um aparelho de jantar',
  copos: 'Ilustração de copos',
  potes: 'Ilustração de potes herméticos',
  refratarios: 'Ilustração de refratários',
  escorredor: 'Ilustração de um escorredor de louças',
  xicaras: 'Ilustração de xícaras com pires',
  cesto: 'Ilustração de um cesto de roupas',
  varal: 'Ilustração de um varal de chão',
  banheiro: 'Ilustração de acessórios de banheiro',
  lixeira: 'Ilustração de uma lixeira com pedal',
  cabides: 'Ilustração de cabides',
  passadeira: 'Ilustração de uma passadeira a vapor',
  ventilador: 'Ilustração de um ventilador de coluna',
  gavetas: 'Ilustração de organizadores de gaveta',
  coracao: 'Ilustração de um coração',
};

/**
 * Line illustration standing in for a product photo. Every gift is a PIX
 * contribution, so these are decorative on purpose — no picture pretends to be
 * the specific product a guest would be buying.
 */
export const GiftIllustration: React.FC<GiftIllustrationProps> = ({
  motif = 'coracao',
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
    opacity: 0.82,
  };
  const soft = { fill: OLIVE, stroke: 'none', opacity: 0.15 };
  const gold = {
    fill: 'none',
    stroke: GOLD,
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    opacity: 0.8,
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
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor={IVORY} />
        </linearGradient>
      </defs>

      <rect width="320" height="200" fill={`url(#${wash})`} />
      <g filter={`url(#${bleed})`}>
        <ellipse cx="160" cy="104" rx="118" ry="76" fill={NUDE} opacity="0.55" />
        <ellipse cx="96" cy="70" rx="54" ry="36" fill={OLIVE} opacity="0.07" />
        <ellipse cx="236" cy="140" rx="50" ry="30" fill={GOLD} opacity="0.08" />
      </g>
      <path d="M48 168 h224" stroke={GOLD} strokeWidth="2" opacity="0.4" fill="none" />

      {/* ------------------------------------------------ Eletrodomésticos */}
      {motif === 'microondas' && (
        <>
          <rect x="84" y="58" width="152" height="96" rx="12" {...soft} />
          <rect x="84" y="58" width="152" height="96" rx="12" {...ink} />
          <rect x="98" y="72" width="94" height="68" rx="7" {...ink} />
          <path d="M112 88 q14 8 0 16 M130 88 q14 8 0 16" {...gold} />
          <path d="M206 74 v66" {...ink} />
          <circle cx="221" cy="86" r="5" {...ink} />
          <circle cx="221" cy="104" r="5" {...ink} />
          <path d="M214 124 h14 M214 132 h14" {...ink} />
          <path d="M100 154 v10 M220 154 v10" {...ink} />
        </>
      )}

      {motif === 'arcondicionado' && (
        <>
          <rect x="56" y="62" width="208" height="58" rx="16" {...soft} />
          <rect x="56" y="62" width="208" height="58" rx="16" {...ink} />
          <path d="M74 104 h172 M74 112 h172" {...ink} />
          <circle cx="238" cy="80" r="4" fill={GOLD} stroke="none" />
          <path d="M98 136 q10 10 0 20 M138 136 q10 10 0 20 M178 136 q10 10 0 20 M218 136 q10 10 0 20" {...gold} />
        </>
      )}

      {motif === 'liquidificador' && (
        <>
          <path d="M126 46 h68 l-10 76 h-48 Z" {...soft} />
          <path d="M126 46 h68 l-10 76 h-48 Z" {...ink} />
          <path d="M120 40 h80" {...ink} />
          <path d="M194 56 q20 4 18 28 q-2 18 -24 22" {...ink} />
          <path d="M146 96 l14 -8 l14 8" {...gold} />
          <rect x="122" y="122" width="76" height="36" rx="8" {...ink} />
          <circle cx="160" cy="140" r="8" {...ink} />
        </>
      )}

      {motif === 'cafeteira' && (
        <>
          <path d="M112 60 h96 v40 a20 20 0 0 1 -20 20 h-56 a20 20 0 0 1 -20 -20 Z" {...soft} />
          <path d="M112 60 h96 v40 a20 20 0 0 1 -20 20 h-56 a20 20 0 0 1 -20 -20 Z" {...ink} />
          <path d="M208 70 q26 -2 26 18 q0 20 -26 18" {...ink} />
          <path d="M140 120 v22 h40 v-22" {...ink} />
          <path d="M120 154 h80" {...ink} />
          <path d="M140 42 q10 -14 0 -24 M180 42 q10 -14 0 -24" {...gold} />
        </>
      )}

      {motif === 'aspirador' && (
        <>
          <path d="M206 36 l-46 112" {...ink} />
          <path d="M198 30 h22" {...ink} />
          <rect x="166" y="82" width="34" height="46" rx="12" transform="rotate(22 183 105)" {...soft} />
          <rect x="166" y="82" width="34" height="46" rx="12" transform="rotate(22 183 105)" {...ink} />
          <path d="M116 150 h84 a8 8 0 0 1 0 16 h-84 a8 8 0 0 1 0 -16 Z" {...ink} />
          <path d="M126 158 h64" {...gold} />
        </>
      )}

      {motif === 'ferro' && (
        <>
          <path d="M84 140 h150 q-6 -44 -56 -50 h-46 q-36 4 -48 50 Z" {...soft} />
          <path d="M84 140 h150 q-6 -44 -56 -50 h-46 q-36 4 -48 50 Z" {...ink} />
          <path d="M120 90 q0 -28 30 -28 h40 q22 0 24 26" {...ink} />
          <path d="M84 148 h150" {...gold} />
          <path d="M108 50 q8 -10 0 -20 M128 46 q8 -10 0 -20" {...gold} />
        </>
      )}

      {motif === 'sanduicheira' && (
        <>
          <path d="M96 118 h128 v26 a10 10 0 0 1 -10 10 h-108 a10 10 0 0 1 -10 -10 Z" {...soft} />
          <path d="M96 118 h128 v26 a10 10 0 0 1 -10 10 h-108 a10 10 0 0 1 -10 -10 Z" {...ink} />
          <path d="M100 112 q60 -46 120 0 Z" {...ink} />
          <path d="M224 128 h26" {...ink} />
          <path d="M118 128 l24 20 M146 128 l24 20 M174 128 l24 20" {...gold} />
        </>
      )}

      {/* ---------------------------------------------- Cama, mesa e banho */}
      {motif === 'cama' && (
        <>
          <path d="M70 108 h180 v38 h-180 Z" {...soft} />
          <path d="M62 146 v-52 q0 -14 16 -14 h164 q16 0 16 14 v52" {...ink} />
          <path d="M56 146 h208" {...ink} />
          <path d="M84 96 q18 -12 36 0 M200 96 q18 -12 36 0" {...ink} />
          <path d="M62 66 v28 M258 66 v28" {...ink} />
          <path d="M70 158 v12 M250 158 v12" {...ink} />
          <path d="M120 122 q40 -10 80 0" {...gold} />
        </>
      )}

      {motif === 'toalhas' && (
        <>
          <rect x="92" y="122" width="136" height="32" rx="10" {...soft} />
          <rect x="92" y="122" width="136" height="32" rx="10" {...ink} />
          <rect x="100" y="92" width="120" height="30" rx="10" {...ink} />
          <rect x="108" y="64" width="104" height="28" rx="10" {...ink} />
          <path d="M92 142 h136 M100 112 h120 M108 84 h104" {...gold} />
        </>
      )}

      {motif === 'edredom' && (
        <>
          <path d="M70 64 q90 -14 180 0 q8 42 0 84 q-90 14 -180 0 q-8 -42 0 -84 Z" {...soft} />
          <path d="M70 64 q90 -14 180 0 q8 42 0 84 q-90 14 -180 0 q-8 -42 0 -84 Z" {...ink} />
          <path d="M100 66 l120 80 M160 60 l80 54 M80 96 l90 58" {...gold} />
          <path d="M220 66 l-120 80 M160 60 l-80 54 M240 96 l-90 58" {...gold} opacity="0.45" />
        </>
      )}

      {motif === 'travesseiros' && (
        <>
          <path d="M70 80 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...soft} />
          <path d="M70 80 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...ink} />
          <path d="M150 92 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" fill={IVORY} stroke="none" />
          <path d="M150 92 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...ink} />
          <path d="M176 124 q24 -8 48 0" {...gold} />
        </>
      )}

      {motif === 'jogoamericano' && (
        <>
          <rect x="64" y="56" width="192" height="104" rx="14" {...soft} />
          <rect x="64" y="56" width="192" height="104" rx="14" {...ink} />
          <circle cx="160" cy="108" r="34" {...ink} />
          <circle cx="160" cy="108" r="20" {...gold} />
          <path d="M104 80 v56 M98 80 v18 M110 80 v18" {...ink} />
          <path d="M216 80 q10 6 10 22 q0 10 -10 12 v22" {...ink} />
        </>
      )}

      {motif === 'manta' && (
        <>
          <path d="M84 70 h152 v66 h-152 Z" {...soft} />
          <path d="M84 70 h152 v66 h-152 Z" {...ink} />
          <path d="M84 92 h152 M84 114 h152" {...gold} />
          <path d="M92 136 v16 M106 136 v16 M120 136 v16 M134 136 v16 M148 136 v16 M162 136 v16 M176 136 v16 M190 136 v16 M204 136 v16 M218 136 v16 M228 136 v16" {...ink} strokeWidth="2" />
        </>
      )}

      {/* ---------------------------------------------------------- Cozinha */}
      {motif === 'jantar' && (
        <>
          <ellipse cx="160" cy="112" rx="58" ry="34" {...soft} />
          <ellipse cx="160" cy="112" rx="58" ry="34" {...ink} />
          <ellipse cx="160" cy="112" rx="34" ry="19" {...gold} />
          <path d="M84 62 v40 M76 62 v20 M92 62 v20 M84 102 v44" {...ink} />
          <path d="M240 62 q14 6 14 26 q0 14 -14 16 v42" {...ink} />
        </>
      )}

      {motif === 'copos' && (
        <>
          <path d="M96 70 h40 l-6 86 h-28 Z" {...soft} />
          <path d="M96 70 h40 l-6 86 h-28 Z" {...ink} />
          <path d="M140 54 h44 l-6 102 h-32 Z" {...ink} />
          <path d="M188 80 h36 l-5 76 h-26 Z" {...ink} />
          <path d="M100 108 h32 M144 100 h36 M190 116 h32" {...gold} />
        </>
      )}

      {motif === 'potes' && (
        <>
          <rect x="94" y="110" width="132" height="46" rx="8" {...soft} />
          <rect x="94" y="110" width="132" height="46" rx="8" {...ink} />
          <path d="M88 102 h144 v8 h-144 Z" {...ink} />
          <rect x="114" y="64" width="92" height="34" rx="7" {...ink} />
          <path d="M108 58 h104 v6 h-104 Z" {...ink} />
          <path d="M150 54 v-6 h20 v6 M150 98 v4 M170 98 v4" {...gold} />
        </>
      )}

      {motif === 'refratarios' && (
        <>
          <path d="M84 104 h152 l-12 46 h-128 Z" {...soft} />
          <path d="M84 104 h152 l-12 46 h-128 Z" {...ink} />
          <path d="M70 104 h18 M232 104 h18" {...ink} />
          <path d="M108 70 h104 l-8 26 h-88 Z" {...ink} />
          <path d="M100 118 h120" {...gold} />
          <path d="M124 82 h72" {...gold} opacity="0.5" />
        </>
      )}

      {motif === 'escorredor' && (
        <>
          <path d="M80 118 h160 l-10 36 h-140 Z" {...soft} />
          <path d="M80 118 h160 l-10 36 h-140 Z" {...ink} />
          <path d="M100 118 v-20 M124 118 v-20 M148 118 v-20 M172 118 v-20 M196 118 v-20 M220 118 v-20" {...ink} strokeWidth="2" />
          <circle cx="136" cy="88" r="26" fill={IVORY} stroke="none" />
          <circle cx="136" cy="88" r="26" {...ink} />
          <circle cx="184" cy="92" r="22" fill={IVORY} stroke="none" />
          <circle cx="184" cy="92" r="22" {...ink} />
          <circle cx="136" cy="88" r="14" {...gold} />
        </>
      )}

      {motif === 'xicaras' && (
        <>
          <path d="M92 92 h52 v22 a22 22 0 0 1 -22 22 h-8 a22 22 0 0 1 -22 -22 Z" {...soft} />
          <path d="M92 92 h52 v22 a22 22 0 0 1 -22 22 h-8 a22 22 0 0 1 -22 -22 Z" {...ink} />
          <path d="M144 100 q16 0 16 12 q0 12 -16 12" {...ink} />
          <path d="M80 142 h76" {...ink} />
          <path d="M176 92 h52 v22 a22 22 0 0 1 -22 22 h-8 a22 22 0 0 1 -22 -22 Z" {...ink} />
          <path d="M228 100 q16 0 16 12 q0 12 -16 12" {...ink} />
          <path d="M164 142 h76" {...ink} />
          <path d="M112 78 q8 -10 0 -20 M196 78 q8 -10 0 -20" {...gold} />
        </>
      )}

      {/* ------------------------------------------ Organização e utilidades */}
      {motif === 'cesto' && (
        <>
          <path d="M98 74 h124 l-14 84 h-96 Z" {...soft} />
          <path d="M98 74 h124 l-14 84 h-96 Z" {...ink} />
          <path d="M102 96 h116 M106 118 h108 M109 140 h102" {...gold} />
          <path d="M128 74 q32 -28 64 0" {...ink} />
        </>
      )}

      {motif === 'varal' && (
        <>
          <path d="M100 160 l60 -112 l60 112" {...ink} />
          <path d="M112 136 h96 M124 112 h72 M136 88 h48" {...ink} />
          <path d="M150 112 v28 q10 6 20 0 v-28" fill={NUDE} stroke="none" opacity="0.9" />
          <path d="M150 112 v28 q10 6 20 0 v-28" {...gold} />
        </>
      )}

      {motif === 'banheiro' && (
        <>
          <rect x="88" y="78" width="40" height="74" rx="10" {...soft} />
          <rect x="88" y="78" width="40" height="74" rx="10" {...ink} />
          <path d="M108 78 v-14 h18" {...ink} />
          <path d="M146 100 h32 l-4 52 h-24 Z" {...ink} />
          <path d="M156 100 l-4 -30 M168 100 l4 -32" {...gold} />
          <path d="M196 140 q28 -14 56 0 q-28 14 -56 0 Z" {...ink} />
          <ellipse cx="224" cy="134" rx="14" ry="5" {...gold} />
        </>
      )}

      {motif === 'lixeira' && (
        <>
          <path d="M116 74 h88 l-8 82 h-72 Z" {...soft} />
          <path d="M116 74 h88 l-8 82 h-72 Z" {...ink} />
          <path d="M108 66 h104 v8 h-104 Z" {...ink} />
          <path d="M150 66 v-6 h20 v6" {...ink} />
          <path d="M138 92 v46 M160 92 v46 M182 92 v46" {...gold} />
          <path d="M130 156 v8 h22" {...ink} />
        </>
      )}

      {motif === 'cabides' && (
        <>
          <path d="M60 92 h200" {...ink} strokeWidth="2" opacity="0.5" />
          {[96, 160, 224].map((x) => (
            <g key={x}>
              <path d={`M${x} 92 q0 -12 8 -12 q8 0 6 10`} {...ink} />
              <path d={`M${x} 92 l-36 36 h72 Z`} {...ink} />
            </g>
          ))}
          <path d="M136 128 h48" {...gold} />
        </>
      )}

      {motif === 'passadeira' && (
        <>
          <rect x="120" y="128" width="80" height="30" rx="8" {...soft} />
          <rect x="120" y="128" width="80" height="30" rx="8" {...ink} />
          <path d="M150 128 v-80" {...ink} />
          <path d="M136 48 h28" {...ink} />
          <path d="M184 128 q30 -20 22 -56" {...ink} />
          <rect x="196" y="56" width="24" height="18" rx="5" {...ink} />
          <path d="M226 52 q8 -10 0 -20 M240 58 q8 -10 0 -20" {...gold} />
        </>
      )}

      {motif === 'ventilador' && (
        <>
          <circle cx="160" cy="80" r="44" {...soft} />
          <circle cx="160" cy="80" r="44" {...ink} />
          <path d="M160 80 q-6 -30 14 -34 q10 18 -14 34 Z M160 80 q30 -4 32 16 q-18 8 -32 -16 Z M160 80 q-24 18 -40 4 q8 -18 40 -4 Z" {...gold} />
          <circle cx="160" cy="80" r="5" {...ink} />
          <path d="M160 124 v34 M130 160 h60" {...ink} />
        </>
      )}

      {motif === 'gavetas' && (
        <>
          <rect x="76" y="70" width="168" height="80" rx="8" {...soft} />
          <rect x="76" y="70" width="168" height="80" rx="8" {...ink} />
          <path d="M140 70 v80 M76 110 h64 M190 70 v80" {...ink} />
          <path d="M92 90 h32 M96 130 h24 M156 96 q18 -10 18 10 M204 92 h26 M204 120 h26" {...gold} />
        </>
      )}

      {/* --------------------------------------------- Contribuição livre */}
      {motif === 'coracao' && (
        <>
          <path d="M160 150 q-62 -40 -62 -78 q0 -26 28 -26 q22 0 34 22 q12 -22 34 -22 q28 0 28 26 q0 38 -62 78 Z" {...soft} />
          <path d="M160 150 q-62 -40 -62 -78 q0 -26 28 -26 q22 0 34 22 q12 -22 34 -22 q28 0 28 26 q0 38 -62 78 Z" {...ink} />
          <path d="M126 72 q6 -12 18 -10" {...gold} />
          <path d="M232 52 v14 M225 59 h14 M84 120 v10 M79 125 h10" {...gold} />
        </>
      )}
    </svg>
  );
};
