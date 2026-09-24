import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Sparkles, AlertCircle, Check } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';

export const DressCodeSection: React.FC = () => {
  const { wedding } = useWedding();

  return (
    <section id="dress-code" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <MonogramCrest size="sm" variant="seal" className="mb-4" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Orientações de Traje
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Dress Code: {wedding.dressCodeTitle}
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#3F463A] leading-relaxed font-light">
            {wedding.dressCodeDescription}
          </p>
        </div>

        {/* Dress Code Details Card */}
        <div className="glass rounded-[2rem] p-8 sm:p-12 shadow-sm border border-[#E9DDCC] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* For Women */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#657153] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  <Sparkles size={16} />
                  <span>Para as Mulheres</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2C3225] mb-3">
                  Vestidos fluidos, midi ou longos
                </h3>
                <p className="text-sm text-[#3F463A] leading-relaxed font-light mb-4">
                  {wedding.dressCodeWomen}
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-[#E9DDCC] text-xs text-[#3F463A] flex items-start gap-2.5">
                <Check size={16} className="text-[#657153] shrink-0 mt-0.5" />
                <span>Calçados: como teremos deck e área ajardinada na serra, sugerimos saltos mais grossos (bloco), anabelas ou rasteiras finas de festa.</span>
              </div>
            </div>

            {/* For Men */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#657153] text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                  <Sparkles size={16} />
                  <span>Para os Homens</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#2C3225] mb-3">
                  Camisa social e alfaiataria
                </h3>
                <p className="text-sm text-[#3F463A] leading-relaxed font-light mb-4">
                  {wedding.dressCodeMen}
                </p>
              </div>

              <div className="bg-white/60 p-4 rounded-2xl border border-[#E9DDCC] text-xs text-[#3F463A] flex items-start gap-2.5">
                <Check size={16} className="text-[#657153] shrink-0 mt-0.5" />
                <span>Gravata é opcional. Sapatos mocassim, loafers ou sociais garantem conforto e elegância serrana.</span>
              </div>
            </div>

          </div>

          {/* Colors to Avoid Alert */}
          {wedding.dressCodeAvoid && (
            <div className="mt-10 pt-8 border-t border-[#E9DDCC]/60">
              <div className="bg-[#657153]/10 border border-[#E9DDCC] rounded-2xl p-5 flex items-start gap-3.5">
                <AlertCircle size={20} className="text-[#657153] shrink-0 mt-0.5" />
                <div>
                  <span className="font-serif text-base text-[#2C3225] font-medium block mb-1">
                    Cores Reservadas & A Evitar
                  </span>
                  <p className="text-xs sm:text-sm text-[#3F463A] leading-relaxed">
                    {wedding.dressCodeAvoid}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Visual Color Palette References */}
        {wedding.dressCodeColors && wedding.dressCodeColors.length > 0 && (
          <div className="text-center">
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#657153] font-semibold block mb-4">
              Paleta de Tons Sugeridos & Inspiradores
            </span>

            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              {wedding.dressCodeColors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md border-2 border-white/90 transition-transform hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                  <span className="text-[11px] font-medium text-[#2C3225]">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
