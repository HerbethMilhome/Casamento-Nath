import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Sparkles, Heart } from 'lucide-react';

export const GodparentsSection: React.FC = () => {
  const { godparents } = useWedding();
  const [filter, setFilter] = useState<'todos' | 'noiva' | 'noivo'>('todos');

  const filtered = godparents
    .filter((g) => {
      if (filter === 'todos') return true;
      if (g.side === 'ambos') return true;
      return g.side === filter;
    })
    .sort((a, b) => a.order - b.order);

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
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                filter === 'todos'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Todos ({godparents.length})
            </button>
            <button
              onClick={() => setFilter('noiva')}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                filter === 'noiva'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Da Noiva
            </button>
            <button
              onClick={() => setFilter('noivo')}
              className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                filter === 'noivo'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              Do Noivo
            </button>
          </div>
        </div>

        {/* Godparents Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((gp) => (
            <div
              key={gp.id}
              className="glass rounded-3xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:translate-y-[-3px] group border border-white/50"
            >
              <div>
                {/* Photo with soft frosted overlay */}
                <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-5">
                  <img
                    src={gp.photoUrl}
                    alt={gp.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 right-3 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider uppercase text-[#657153] font-semibold border border-white/40">
                    {gp.role}
                  </div>
                </div>

                {/* Name & Relationship */}
                <div className="text-center mb-4">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2C3225] mb-1">
                    {gp.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-wider text-[#657153] font-medium block">
                    {gp.side === 'noiva' ? 'Lado da Noiva' : gp.side === 'noivo' ? 'Lado do Noivo' : 'Amigos de Ambos'}
                  </span>
                </div>

                {/* Affectionate Bio */}
                <p className="text-xs sm:text-sm text-[#55594A] leading-relaxed font-light text-center mb-4">
                  "{gp.bio}"
                </p>
              </div>

              {/* Curiosity / Fun Quote */}
              {gp.curiosity && (
                <div className="pt-3 border-t border-[#657153]/15 bg-[#657153]/5 rounded-xl p-3 text-center">
                  <span className="block text-[9px] uppercase tracking-widest text-[#657153] font-semibold mb-1 flex items-center justify-center gap-1">
                    <Sparkles size={10} /> Curiosidade
                  </span>
                  <p className="text-[11px] text-[#55594A] italic">
                    {gp.curiosity}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
