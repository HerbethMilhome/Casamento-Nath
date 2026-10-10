import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Godparent } from '../../types';
import { Sparkles, X } from 'lucide-react';

/** "Joana e Herbeth" -> "J & H"; "Pryscila" -> "P". */
const iniciaisDe = (nome: string): string =>
  nome
    .split(/\s+/)
    .filter((parte) => !['e', '&', 'de', 'da', 'do'].includes(parte.toLowerCase()))
    .map((parte) => parte.charAt(0).toUpperCase())
    .join(' & ');

const ladoDe = (side: Godparent['side']): string =>
  side === 'noiva' ? 'Lado da Noiva' : side === 'noivo' ? 'Lado do Noivo' : 'Amigos de Ambos';

/** Photo, or the initials while there is none. */
const Retrato: React.FC<{ gp: Godparent; className?: string }> = ({ gp, className = '' }) => (
  <>
    {gp.photoUrl ? (
      <img
        src={gp.photoUrl}
        alt={gp.name}
        loading="lazy"
        className={`w-full h-full object-cover object-center ${className}`}
      />
    ) : (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F9F6EF] to-[#F3EDE1] border border-[#E9DDCC]">
        <span className="font-cormorant text-4xl sm:text-5xl text-[#A98C5B]">
          {iniciaisDe(gp.name)}
        </span>
        <span className="text-[9px] tracking-[0.2em] uppercase text-[#657153]/70">
          Foto em breve
        </span>
      </div>
    )}
  </>
);

export const GodparentsSection: React.FC = () => {
  const { godparents } = useWedding();
  const [filter, setFilter] = useState<'todos' | 'noiva' | 'noivo'>('todos');
  const [aberto, setAberto] = useState<Godparent | null>(null);
  const fecharRef = useRef<HTMLButtonElement | null>(null);
  const ultimoFocoRef = useRef<HTMLElement | null>(null);

  const filtered = godparents
    .filter((g) => {
      if (filter === 'todos') return true;
      if (g.side === 'ambos') return true;
      return g.side === filter;
    })
    .sort((a, b) => a.order - b.order);

  const abrir = (gp: Godparent) => {
    ultimoFocoRef.current = document.activeElement as HTMLElement | null;
    setAberto(gp);
  };

  const fechar = useCallback(() => {
    setAberto(null);
    ultimoFocoRef.current?.focus();
  }, []);

  // Esc fecha e a página atrás para de rolar enquanto o texto está aberto
  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar();
    };
    document.addEventListener('keydown', onKey);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    fecharRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflowAnterior;
    };
  }, [aberto, fechar]);

  return (
    <section id="padrinhos" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Pessoas Que Amamos
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Padrinhos e Madrinhas
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Eles estiveram ao nosso lado em cada riso, conselho e celebração. Não poderíamos subir ao altar sem a bênção e a energia deles.
          </p>

          {/* Filter Pills */}
          <div className="inline-flex items-center gap-2 glass p-1.5 rounded-full mt-6 border border-[#657153]/20">
            <button
              onClick={() => setFilter('todos')}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer ${
                filter === 'todos'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Todos ({godparents.length})
            </button>
            <button
              onClick={() => setFilter('noiva')}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer ${
                filter === 'noiva'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Da Noiva
            </button>
            <button
              onClick={() => setFilter('noivo')}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all cursor-pointer ${
                filter === 'noivo'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Do Noivo
            </button>
          </div>
        </div>

        {/* Godparents Cards Grid — every card has the same height; the full
            text lives in the dialog, so a long bio never stretches the row. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((gp) => (
            <article
              key={gp.id}
              className="glass rounded-3xl p-5 sm:p-6 flex flex-col hover:shadow-lg transition-all duration-300 hover:translate-y-[-3px] group border border-white/50"
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 shrink-0">
                <Retrato gp={gp} className="group-hover:scale-105 transition-transform duration-700" />

                <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider uppercase text-[#657153] font-semibold border border-white/40">
                  {gp.role}
                </div>
              </div>

              {/* Name & Relationship */}
              <div className="text-center mb-3">
                <h3 className="font-serif text-xl sm:text-2xl text-[#2C3225] mb-1">
                  {gp.name}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#657153] font-medium block">
                  {ladoDe(gp.side)}
                </span>
              </div>

              {/* Bio preview — clamped so all cards line up */}
              <p className="text-xs sm:text-sm text-[#55594A] leading-relaxed font-light text-center line-clamp-4 mb-4">
                "{gp.bio}"
              </p>

              <button
                type="button"
                onClick={() => abrir(gp)}
                aria-label={`Ler a homenagem completa a ${gp.name}`}
                className="mt-auto self-center text-[11px] tracking-[0.15em] uppercase font-semibold text-[#657153] hover:text-[#2C3225] border border-[#E9DDCC] hover:border-[#657153] rounded-full px-5 py-2 transition-colors cursor-pointer focus-gold"
              >
                Ler mais
              </button>
            </article>
          ))}
        </div>

      </div>

      {/* Full text */}
      {aberto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Homenagem a ${aberto.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2C3225]/85 backdrop-blur-sm"
          onClick={fechar}
        >
          <div
            className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-3xl bg-[#F9F6EF] border border-[#E9DDCC] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-36 rounded-2xl overflow-hidden border border-[#E9DDCC] shrink-0 mb-4">
                  <Retrato gp={aberto} />
                </div>

                <span className="text-[10px] tracking-[0.2em] uppercase text-[#A98C5B] font-semibold">
                  {aberto.role}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C3225] mt-1">
                  {aberto.name}
                </h3>
                <span className="text-[11px] uppercase tracking-wider text-[#657153] font-medium">
                  {ladoDe(aberto.side)}
                </span>
                <div className="w-16 divider-gold my-5" />
              </div>

              <p className="font-cormorant text-base sm:text-lg text-[#55594A] leading-relaxed text-center whitespace-pre-line">
                {aberto.bio}
              </p>

              {aberto.curiosity && (
                <div className="mt-6 bg-[#657153]/5 border border-[#657153]/15 rounded-2xl p-4 text-center">
                  <span className="flex items-center justify-center gap-1 text-[9px] uppercase tracking-widest text-[#657153] font-semibold mb-1">
                    <Sparkles size={10} /> Curiosidade
                  </span>
                  <p className="text-xs text-[#55594A] italic">{aberto.curiosity}</p>
                </div>
              )}
            </div>

            <button
              ref={fecharRef}
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 text-[#2C3225] shadow-md flex items-center justify-center hover:bg-white transition-colors cursor-pointer focus-gold"
            >
              <X size={17} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
