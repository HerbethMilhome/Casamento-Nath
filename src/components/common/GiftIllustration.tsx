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
  racao: 'Ilustração de um balde de ração e uma ferradura',
  vaquejada: 'Ilustração de uma senha de vaquejada com ferradura',
  sela: 'Ilustração de uma sela de couro',
  patinho: 'Ilustração de um patinho',
  montanhas: 'Ilustração de montanhas com um coração',
  bebe: 'Ilustração de um macacão de bebê',
  rodizio: 'Ilustração de um espeto de churrasco e uma fatia de pizza',
  panela: 'Ilustração de uma panela',
  jantar: 'Ilustração de um aparelho de jantar',
  cafeteira: 'Ilustração de uma cafeteira',
  airfryer: 'Ilustração de uma air fryer',
  aspirador: 'Ilustração de um aspirador de pó vertical',
  potes: 'Ilustração de potes herméticos',
  cabides: 'Ilustração de cabides',
  toalhas: 'Ilustração de toalhas dobradas',
  cama: 'Ilustração de uma cama posta',
  liquidificador: 'Ilustração de um liquidificador',
  limpeza: 'Ilustração de um balde e uma vassoura',
  utensilios: 'Ilustração de utensílios de cozinha pendurados',
  cesto: 'Ilustração de um cesto de roupas',
  tacas: 'Ilustração de duas taças brindando',
  despensa: 'Ilustração de uma prateleira de despensa com potes',
  arcondicionado: 'Ilustração de um ar-condicionado split',
  microondas: 'Ilustração de um micro-ondas',
  ventilador: 'Ilustração de um ventilador de coluna',
  edredom: 'Ilustração de um edredom',
  churrasqueira: 'Ilustração de uma churrasqueira',
  batedeira: 'Ilustração de uma batedeira planetária',
  faqueiro: 'Ilustração de garfo, faca e colher',
  malas: 'Ilustração de uma mala de viagem',
  robo: 'Ilustração de um robô aspirador',
  ferramentas: 'Ilustração de um martelo e uma chave inglesa',
  refratarios: 'Ilustração de travessas de forno',
  copos: 'Ilustração de copos e uma jarra',
  panelapressao: 'Ilustração de uma panela de pressão elétrica',
  ferro: 'Ilustração de um ferro de passar',
  varal: 'Ilustração de um varal de chão',
  sanduicheira: 'Ilustração de uma sanduicheira',
  lixeira: 'Ilustração de uma lixeira com pedal',
  travesseiros: 'Ilustração de dois travesseiros',
  sapateira: 'Ilustração de uma sapateira com sapatos',
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

      {/* ------------------------------ Presentes especiais do nosso universo */}
      {motif === 'racao' && (
        <>
          <path d="M104 78 h84 l-10 74 h-64 Z" {...soft} />
          <path d="M104 78 h84 l-10 74 h-64 Z" {...ink} />
          <path d="M98 78 h96" {...ink} />
          <g fill={GOLD} opacity="0.55" stroke="none">
            <circle cx="126" cy="68" r="6" />
            <circle cx="146" cy="60" r="6" />
            <circle cx="166" cy="68" r="6" />
          </g>
          <path d="M214 142 q-16 -36 0 -54 q14 -18 30 -18 q16 0 30 18 q16 18 0 54" fill="none" stroke={GOLD} strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        </>
      )}

      {motif === 'vaquejada' && (
        <>
          <path d="M80 70 h160 v20 a12 12 0 0 0 0 24 v20 h-160 v-20 a12 12 0 0 0 0 -24 Z" {...soft} />
          <path d="M80 70 h160 v20 a12 12 0 0 0 0 24 v20 h-160 v-20 a12 12 0 0 0 0 -24 Z" {...ink} />
          <path d="M180 74 v56" {...ink} strokeDasharray="4 6" />
          <text x="130" y="112" textAnchor="middle" fill={OLIVE_DEEP} opacity="0.8" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 600 }} fontSize="30">Nº 20</text>
          <path d="M200 120 q-10 -22 0 -34 q8 -10 10 -10 q2 0 10 10 q10 12 0 34" fill="none" stroke={GOLD} strokeWidth="4" strokeLinecap="round" opacity="0.85" />
        </>
      )}

      {motif === 'sela' && (
        <>
          <path d="M84 104 q24 -44 76 -36 q30 4 44 -10 q14 -8 22 6 q8 14 -12 22 q-16 8 -16 30 q-4 30 -58 30 q-44 0 -56 -42 Z" {...soft} />
          <path d="M84 104 q24 -44 76 -36 q30 4 44 -10 q14 -8 22 6 q8 14 -12 22 q-16 8 -16 30 q-4 30 -58 30 q-44 0 -56 -42 Z" {...ink} />
          <path d="M150 104 v40 M150 144 q-10 0 -10 10 h20 q0 -10 -10 -10" {...ink} />
          <path d="M100 110 q48 18 96 -6" {...gold} />
          <path d="M112 90 q36 -14 72 -6" {...gold} opacity="0.5" />
        </>
      )}

      {motif === 'patinho' && (
        <>
          <path d="M96 128 q0 -36 44 -36 h20 q-8 -10 -8 -24 q0 -24 24 -24 q22 0 24 22 l20 6 l-20 8 q-2 10 -10 16 q26 10 26 32 q0 26 -50 26 h-30 q-40 0 -40 -26 Z" {...soft} />
          <path d="M96 128 q0 -36 44 -36 h20 q-8 -10 -8 -24 q0 -24 24 -24 q22 0 24 22 l20 6 l-20 8 q-2 10 -10 16 q26 10 26 32 q0 26 -50 26 h-30 q-40 0 -40 -26 Z" {...ink} />
          <circle cx="182" cy="62" r="3.5" fill={OLIVE_DEEP} stroke="none" opacity="0.85" />
          <path d="M210 66 l20 6 l-20 8 Z" fill={GOLD} opacity="0.7" stroke="none" />
          <path d="M124 124 q20 14 44 0" {...gold} />
          <path d="M70 162 q30 -10 60 0 q30 10 60 0 q30 -10 60 0" stroke="#8A9468" strokeWidth="2.5" fill="none" opacity="0.6" />
        </>
      )}

      {motif === 'montanhas' && (
        <>
          <path d="M56 160 L118 76 L160 128 L206 64 L268 160 Z" {...soft} />
          <path d="M56 160 L118 76 L160 128 L206 64 L268 160" {...ink} />
          <path d="M104 96 l14 -20 l12 16 M194 82 l12 -18 l12 16" stroke={IVORY} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M160 58 q-14 -12 -14 -20 q0 -8 7 -8 q5 0 7 5 q2 -5 7 -5 q7 0 7 8 q0 8 -14 20 Z" fill={GOLD} opacity="0.8" stroke="none" />
          <path d="M82 150 q40 -10 80 0 q40 10 80 0" {...gold} opacity="0.5" />
        </>
      )}

      {motif === 'bebe' && (
        <>
          <path d="M126 50 q34 18 68 0 l18 16 l-16 20 l-8 -6 v64 q-34 12 -56 0 v-64 l-8 6 l-16 -20 Z" {...soft} />
          <path d="M126 50 q34 18 68 0 l18 16 l-16 20 l-8 -6 v64 q-34 12 -56 0 v-64 l-8 6 l-16 -20 Z" {...ink} />
          <path d="M160 132 v12" {...ink} />
          <path d="M150 96 q-6 -8 0 -14 q6 -4 10 2 q4 -6 10 -2 q6 6 0 14 l-10 10 Z" fill={GOLD} opacity="0.6" stroke="none" />
          <circle cx="240" cy="120" r="16" {...ink} />
          <path d="M240 104 q14 -10 22 0 q-8 12 -22 8" {...ink} />
        </>
      )}

      {motif === 'rodizio' && (
        <>
          <path d="M70 70 l120 60" {...ink} />
          <rect x="86" y="70" width="22" height="18" rx="6" transform="rotate(27 97 79)" {...soft} />
          <rect x="86" y="70" width="22" height="18" rx="6" transform="rotate(27 97 79)" {...ink} />
          <rect x="118" y="86" width="22" height="18" rx="6" transform="rotate(27 129 95)" {...ink} />
          <rect x="150" y="102" width="22" height="18" rx="6" transform="rotate(27 161 111)" {...ink} />
          <path d="M200 70 l52 0 l-26 80 Z" {...soft} />
          <path d="M200 70 l52 0 l-26 80 Z" {...ink} />
          <path d="M200 70 q26 -12 52 0" {...ink} />
          <circle cx="220" cy="88" r="5" fill={GOLD} opacity="0.7" stroke="none" />
          <circle cx="234" cy="104" r="4" fill={GOLD} opacity="0.7" stroke="none" />
          <circle cx="224" cy="118" r="4" fill={GOLD} opacity="0.7" stroke="none" />
        </>
      )}

      {/* ------------------------------------------ Nossa casa, nossas regras */}
      {motif === 'panela' && (
        <>
          <path d="M96 84 h116 v54 a16 16 0 0 1 -16 16 h-84 a16 16 0 0 1 -16 -16 Z" {...soft} />
          <path d="M96 84 h116 v54 a16 16 0 0 1 -16 16 h-84 a16 16 0 0 1 -16 -16 Z" {...ink} />
          <path d="M88 74 h132 M154 74 v-12" {...ink} />
          <circle cx="154" cy="56" r="7" {...ink} />
          <path d="M212 96 h26 a10 10 0 0 1 0 20 h-26 M96 96 H70 a10 10 0 0 0 0 20 h26" {...ink} />
          <path d="M132 40 q10 -12 0 -22 M176 40 q10 -12 0 -22" {...gold} />
        </>
      )}

      {motif === 'jantar' && (
        <>
          <ellipse cx="160" cy="112" rx="58" ry="34" {...soft} />
          <ellipse cx="160" cy="112" rx="58" ry="34" {...ink} />
          <ellipse cx="160" cy="112" rx="34" ry="19" {...gold} />
          <path d="M84 62 v40 M76 62 v20 M92 62 v20 M84 102 v44" {...ink} />
          <path d="M240 62 q14 6 14 26 q0 14 -14 16 v42" {...ink} />
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

      {motif === 'airfryer' && (
        <>
          <path d="M104 48 h112 a14 14 0 0 1 14 14 v78 a14 14 0 0 1 -14 14 h-112 a14 14 0 0 1 -14 -14 v-78 a14 14 0 0 1 14 -14 Z" {...soft} />
          <path d="M104 48 h112 a14 14 0 0 1 14 14 v78 a14 14 0 0 1 -14 14 h-112 a14 14 0 0 1 -14 -14 v-78 a14 14 0 0 1 14 -14 Z" {...ink} />
          <rect x="110" y="66" width="76" height="44" rx="8" {...ink} />
          <circle cx="210" cy="88" r="12" {...ink} />
          <path d="M210 80 v8" stroke={GOLD} strokeWidth="3" strokeLinecap="round" />
          <path d="M104 154 v10 M216 154 v10" {...ink} />
          <path d="M128 92 q10 -12 0 -20 M158 92 q10 -12 0 -20" {...gold} />
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

      {motif === 'toalhas' && (
        <>
          <rect x="92" y="122" width="136" height="32" rx="10" {...soft} />
          <rect x="92" y="122" width="136" height="32" rx="10" {...ink} />
          <rect x="100" y="92" width="120" height="30" rx="10" {...ink} />
          <rect x="108" y="64" width="104" height="28" rx="10" {...ink} />
          <path d="M92 142 h136 M100 112 h120 M108 84 h104" {...gold} />
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
          <path d="M120 122 q40 -10 80 0" {...gold} />
          <path d="M160 88 q-8 -7 -8 -12 q0 -5 4 -5 q3 0 4 3 q1 -3 4 -3 q4 0 4 5 q0 5 -8 12 Z" fill={GOLD} opacity="0.7" stroke="none" />
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

      {motif === 'limpeza' && (
        <>
          <path d="M96 100 h64 l-8 56 h-48 Z" {...soft} />
          <path d="M96 100 h64 l-8 56 h-48 Z" {...ink} />
          <path d="M100 100 q28 -30 56 0" {...ink} />
          <path d="M108 118 q20 8 40 0" {...gold} />
          <path d="M226 34 l-24 84" {...ink} />
          <path d="M184 118 h44 l10 38 q-32 10 -64 0 Z" {...ink} />
          <path d="M196 124 v26 M208 124 v28 M220 124 v26" {...gold} opacity="0.6" />
        </>
      )}

      {motif === 'utensilios' && (
        <>
          <path d="M70 52 h180" {...ink} />
          <path d="M104 52 v62" {...ink} />
          <rect x="94" y="114" width="20" height="36" rx="5" {...soft} />
          <rect x="94" y="114" width="20" height="36" rx="5" {...ink} />
          <path d="M160 52 v50" {...ink} />
          <path d="M160 102 q-16 4 -16 24 q0 24 16 26 q16 -2 16 -26 q0 -20 -16 -24 Z" {...ink} />
          <path d="M152 112 v34 M168 112 v34" {...gold} />
          <path d="M216 52 v58" {...ink} />
          <path d="M216 110 a16 16 0 1 0 0.1 0" {...ink} />
          <path d="M204 126 q12 8 24 0" {...gold} />
        </>
      )}

      {motif === 'cesto' && (
        <>
          <path d="M98 74 h124 l-14 84 h-96 Z" {...soft} />
          <path d="M98 74 h124 l-14 84 h-96 Z" {...ink} />
          <path d="M102 96 h116 M106 118 h108 M109 140 h102" {...gold} />
          <path d="M128 74 q32 -28 64 0" {...ink} />
        </>
      )}

      {motif === 'tacas' && (
        <>
          <path d="M108 52 h40 q2 36 -20 46 q-22 -10 -20 -46 Z" {...soft} />
          <path d="M108 52 h40 q2 36 -20 46 q-22 -10 -20 -46 Z" transform="rotate(-12 128 75)" {...ink} />
          <path d="M172 52 h40 q2 36 -20 46 q-22 -10 -20 -46 Z" transform="rotate(12 192 75)" {...ink} />
          <path d="M132 98 l-8 50 M108 150 h32" {...ink} />
          <path d="M188 98 l8 50 M180 150 h32" {...ink} />
          <path d="M152 44 l8 -12 M160 46 l12 -8 M146 40 l2 -14" {...gold} />
        </>
      )}

      {motif === 'despensa' && (
        <>
          <path d="M70 100 h180 M70 156 h180" {...ink} />
          <path d="M70 44 v118 M250 44 v118" {...ink} opacity="0.5" />
          {[[96, 62], [142, 54], [190, 66]].map(([x, y]) => (
            <g key={x}>
              <rect x={x} y={y} width="34" height={100 - y} rx="6" {...soft} />
              <rect x={x} y={y} width="34" height={100 - y} rx="6" {...ink} />
              <path d={`M${x - 2} ${y} h38`} {...gold} />
            </g>
          ))}
          {[[100, 118], [150, 112], [198, 120]].map(([x, y]) => (
            <rect key={x} x={x} y={y} width="30" height={156 - y} rx="6" {...ink} />
          ))}
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

      {motif === 'ventilador' && (
        <>
          <circle cx="160" cy="80" r="44" {...soft} />
          <circle cx="160" cy="80" r="44" {...ink} />
          <path d="M160 80 q-6 -30 14 -34 q10 18 -14 34 Z M160 80 q30 -4 32 16 q-18 8 -32 -16 Z M160 80 q-24 18 -40 4 q8 -18 40 -4 Z" {...gold} />
          <circle cx="160" cy="80" r="5" {...ink} />
          <path d="M160 124 v34 M130 160 h60" {...ink} />
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

      {motif === 'churrasqueira' && (
        <>
          <path d="M84 90 h152 q-8 52 -50 56 h-52 q-42 -4 -50 -56 Z" {...soft} />
          <path d="M84 90 h152 q-8 52 -50 56 h-52 q-42 -4 -50 -56 Z" {...ink} />
          <path d="M110 146 l-14 26 M210 146 l14 26 M160 148 v24" {...ink} />
          <path d="M100 90 h120" {...ink} />
          <path d="M120 70 q10 -16 0 -30 M160 66 q12 -18 0 -34 M200 70 q10 -16 0 -30" {...gold} />
        </>
      )}

      {motif === 'batedeira' && (
        <>
          <path d="M84 156 h128 v-14 h-128 Z" {...soft} />
          <path d="M84 156 h128 v-14 h-128 Z" {...ink} />
          <path d="M100 142 v-86 q0 -14 14 -14 h70 q24 0 24 22 q0 18 -24 18 h-24" {...ink} />
          <path d="M156 84 v16" {...ink} />
          <path d="M156 100 q-8 8 0 14 q8 6 0 12" {...gold} />
          <path d="M126 112 h60 l-8 30 h-44 Z" {...ink} />
          <circle cx="190" cy="62" r="4" fill={GOLD} stroke="none" />
        </>
      )}

      {motif === 'faqueiro' && (
        <>
          <path d="M112 152 l20 -100" {...ink} />
          <path d="M126 52 l-2 22 M134 52 l-2 22 M142 54 l-2 22" {...ink} />
          <path d="M160 152 v-60 q0 -28 12 -40 q6 30 -2 50 l-10 4" {...ink} />
          <path d="M160 92 l10 -4" {...gold} />
          <path d="M208 152 l-20 -78" {...ink} />
          <ellipse cx="184" cy="62" rx="12" ry="18" transform="rotate(-14 184 62)" {...soft} />
          <ellipse cx="184" cy="62" rx="12" ry="18" transform="rotate(-14 184 62)" {...ink} />
          <path d="M96 156 q64 12 128 0" {...gold} opacity="0.6" />
        </>
      )}

      {motif === 'malas' && (
        <>
          <rect x="96" y="70" width="128" height="86" rx="12" {...soft} />
          <rect x="96" y="70" width="128" height="86" rx="12" {...ink} />
          <path d="M136 70 v-14 q0 -8 10 -8 h28 q10 0 10 8 v14" {...ink} />
          <path d="M96 100 h128 M96 126 h128" {...gold} />
          <path d="M112 156 v12 M208 156 v12" {...ink} />
          <path d="M238 52 l32 14 l-32 14 l6 -14 Z" fill={GOLD} opacity="0.55" stroke="none" />
        </>
      )}

      {motif === 'robo' && (
        <>
          <ellipse cx="160" cy="120" rx="80" ry="34" {...soft} />
          <ellipse cx="160" cy="120" rx="80" ry="34" {...ink} />
          <path d="M80 120 v10 q0 30 80 30 q80 0 80 -30 v-10" {...ink} />
          <ellipse cx="160" cy="114" rx="20" ry="8" {...gold} />
          <circle cx="206" cy="108" r="4" fill={GOLD} stroke="none" />
          <path d="M84 70 q8 -6 16 0 M70 60 q22 -16 44 0" {...gold} opacity="0.6" />
        </>
      )}

      {motif === 'ferramentas' && (
        <>
          <path d="M96 140 l60 -60 l18 18 l-60 60 Z" {...soft} />
          <path d="M96 140 l60 -60 l18 18 l-60 60 Z" {...ink} />
          <path d="M150 62 q18 -18 38 -8 l-18 18 l14 14 l18 -18 q10 20 -8 38 q-14 14 -32 8" {...ink} />
          <path d="M214 132 q16 4 22 18 l-26 10 q-8 -14 -2 -24 Z" {...ink} />
          <path d="M84 152 l18 18" {...gold} />
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

      {motif === 'copos' && (
        <>
          <path d="M84 84 h34 l-5 72 h-24 Z" {...soft} />
          <path d="M84 84 h34 l-5 72 h-24 Z" {...ink} />
          <path d="M126 84 h34 l-5 72 h-24 Z" {...ink} />
          <path d="M178 62 h46 l-4 94 h-38 Z" {...ink} />
          <path d="M224 76 q20 2 18 26 q-2 22 -20 24" {...ink} />
          <path d="M178 62 l-8 -8" {...ink} />
          <path d="M88 116 h26 M130 116 h26 M182 104 h38" {...gold} />
        </>
      )}

      {motif === 'panelapressao' && (
        <>
          <path d="M104 74 h112 v74 a10 10 0 0 1 -10 10 h-92 a10 10 0 0 1 -10 -10 Z" {...soft} />
          <path d="M104 74 h112 v74 a10 10 0 0 1 -10 10 h-92 a10 10 0 0 1 -10 -10 Z" {...ink} />
          <path d="M98 74 q62 -34 124 0 Z" {...ink} />
          <path d="M160 48 v-10 M150 38 h20" {...ink} />
          <rect x="134" y="102" width="52" height="30" rx="6" {...ink} />
          <path d="M144 117 h32" {...gold} />
          <path d="M184 34 q8 -10 0 -18" {...gold} />
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

      {motif === 'varal' && (
        <>
          <path d="M100 160 l60 -112 l60 112" {...ink} />
          <path d="M112 136 h96 M124 112 h72 M136 88 h48" {...ink} />
          <path d="M150 112 v28 q10 6 20 0 v-28" fill={NUDE} stroke="none" opacity="0.9" />
          <path d="M150 112 v28 q10 6 20 0 v-28" {...gold} />
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

      {motif === 'travesseiros' && (
        <>
          <path d="M70 80 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...soft} />
          <path d="M70 80 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...ink} />
          <path d="M150 92 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" fill={IVORY} stroke="none" />
          <path d="M150 92 q50 -16 100 0 q8 30 0 60 q-50 16 -100 0 q-8 -30 0 -60 Z" {...ink} />
          <path d="M176 124 q24 -8 48 0" {...gold} />
        </>
      )}

      {motif === 'sapateira' && (
        <>
          <rect x="76" y="48" width="168" height="112" rx="6" {...soft} />
          <rect x="76" y="48" width="168" height="112" rx="6" {...ink} />
          <path d="M76 86 h168 M76 124 h168" {...ink} />
          {[[96, 82], [176, 82], [96, 120], [176, 120], [96, 158], [176, 158]].map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x} ${y} v-12 q0 -6 8 -6 q6 0 10 8 l16 4 q10 2 10 6 Z`} {...gold} />
          ))}
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
