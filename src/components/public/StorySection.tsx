import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Heart, Calendar, BookOpen, Clock } from 'lucide-react';

export const StorySection: React.FC = () => {
  const { milestones, wedding } = useWedding();
  const [viewMode, setViewMode] = useState<'timeline' | 'text'>('timeline');

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  return (
    <section id="historia" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C7355] font-semibold block mb-2">
            Como Tudo Começou
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2A2623] font-normal mb-4">
            Nossa História de Amor
          </h2>
          <div className="w-16 h-[1.5px] bg-[#8C7355]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#554D47] leading-relaxed font-light">
            Cada capítulo vivido nos trouxe até esse momento tão sonhado. Compartilhamos com vocês os passos dessa caminhada a dois.
          </p>

          {/* Mode Switcher: Timeline vs Text */}
          <div className="inline-flex items-center gap-1 glass p-1 rounded-full mt-8 border border-[#8C7355]/20">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                viewMode === 'timeline'
                  ? 'bg-[#8C7355] text-white shadow-sm'
                  : 'text-[#554D47] hover:text-[#8C7355]'
              }`}
            >
              <Clock size={14} />
              <span>Linha do Tempo</span>
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all ${
                viewMode === 'text'
                  ? 'bg-[#8C7355] text-white shadow-sm'
                  : 'text-[#554D47] hover:text-[#8C7355]'
              }`}
            >
              <BookOpen size={14} />
              <span>Texto Narrativo</span>
            </button>
          </div>
        </div>

        {/* View Mode: Timeline */}
        {viewMode === 'timeline' ? (
          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 -ml-[1px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#8C7355]/10 via-[#8C7355]/30 to-[#8C7355]/10" />

            <div className="space-y-12 sm:space-y-16">
              {sortedMilestones.map((milestone, idx) => {
                const isEven = idx % 2 === 0;

                return (
                  <div
                    key={milestone.id}
                    className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-10 ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Box */}
                    <div className="w-full md:w-1/2">
                      <div className="glass rounded-3xl p-6 sm:p-8 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-serif text-2xl sm:text-3xl text-[#8C7355] font-light">
                            {milestone.year}
                          </span>
                          <span className="text-[10px] tracking-widest uppercase bg-[#8C7355]/10 text-[#8C7355] px-2.5 py-1 rounded-full font-medium">
                            Etapa {idx + 1}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-[#2A2623] mb-3">
                          {milestone.title}
                        </h3>

                        <p className="text-sm text-[#554D47] leading-relaxed font-light mb-4">
                          {milestone.description}
                        </p>

                        {milestone.photoUrl && (
                          <div className="mt-4 rounded-2xl overflow-hidden shadow-inner group">
                            <img
                              src={milestone.photoUrl}
                              alt={milestone.title}
                              className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {milestone.caption && (
                              <p className="text-[11px] italic text-[#8C7355] mt-2 text-center">
                                {milestone.caption}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Timeline Center Badge Node */}
                    <div className="relative z-10 w-10 h-10 rounded-full glass border border-[#8C7355]/40 flex items-center justify-center text-[#8C7355] shadow-sm my-[-10px] md:my-0">
                      <Heart size={16} className="fill-[#8C7355]/20" />
                    </div>

                    {/* Empty spacer for desktop layout balance */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* View Mode: Editorial Narrative Text */
          <div className="glass rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-sm">
            <div className="text-center font-serif text-2xl text-[#8C7355] mb-6 italic">
              "Para Sempre Nós"
            </div>
            <div className="space-y-6 text-[#554D47] text-base sm:text-lg leading-relaxed font-light">
              {sortedMilestones.map((m) => (
                <div key={m.id} className="pb-6 border-b border-[#8C7355]/15 last:border-b-0">
                  <span className="font-serif text-xl text-[#8C7355] font-medium block mb-2">
                    {m.year} — {m.title}
                  </span>
                  <p>{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
