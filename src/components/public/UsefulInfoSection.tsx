import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { UsefulInfoCategory } from '../../types';
import { Hotel, Sparkles, Car, ParkingSquare, Plane, ExternalLink, MapPin } from 'lucide-react';

export const UsefulInfoSection: React.FC = () => {
  const { usefulInfo } = useWedding();
  const [selectedCat, setSelectedCat] = useState<'all' | UsefulInfoCategory>('all');

  const categories = [
    { id: 'all', label: 'Todas as Dicas', icon: Sparkles },
    { id: 'hospedagem', label: 'Onde se Hospedar', icon: Hotel },
    { id: 'salao', label: 'Salão & Beleza', icon: Sparkles },
    { id: 'transporte', label: 'Transporte & Apps', icon: Car },
    { id: 'estacionamento', label: 'Estacionamento', icon: ParkingSquare },
    { id: 'aeroporto', label: 'Aeroporto', icon: Plane },
  ];

  const filteredItems = usefulInfo.filter((item) => {
    if (selectedCat === 'all') return true;
    return item.category === selectedCat;
  }).sort((a, b) => a.order - b.order);

  const getCategoryIcon = (cat: UsefulInfoCategory) => {
    switch (cat) {
      case 'hospedagem': return <Hotel size={18} />;
      case 'salao': return <Sparkles size={18} />;
      case 'transporte': return <Car size={18} />;
      case 'estacionamento': return <ParkingSquare size={18} />;
      case 'aeroporto': return <Plane size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <section id="informacoes" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Guia do Convidado
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Para Ajudar Você a se Preparar
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Reunimos sugestões de hotéis, transporte, aeroporto e salões de beleza para que sua estadia e experiência em Fortaleza sejam perfeitas.
          </p>

          {/* Category Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                    selectedCat === cat.id
                      ? 'bg-[#657153] text-white font-medium shadow-sm'
                      : 'glass text-[#55594A] hover:text-[#657153]'
                  }`}
                >
                  <Icon size={13} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="glass rounded-3xl p-6 flex flex-col justify-between border border-white/60 hover:shadow-md transition-all hover:translate-y-[-2px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#657153]/10 text-[#657153] flex items-center justify-center">
                    {getCategoryIcon(item.category)}
                  </div>
                  {item.distance && (
                    <span className="text-[10px] bg-white/70 px-2.5 py-1 rounded-full text-[#657153] font-medium">
                      {item.distance}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl text-[#2C3225] mb-1">
                  {item.title}
                </h3>

                {item.subtitle && (
                  <span className="text-xs text-[#657153] font-medium block mb-3">
                    {item.subtitle}
                  </span>
                )}

                <p className="text-xs sm:text-sm text-[#55594A] leading-relaxed font-light mb-4">
                  {item.description}
                </p>

                {item.address && (
                  <div className="flex items-start gap-1.5 text-xs text-[#55594A] mb-4 bg-white/40 p-2.5 rounded-xl">
                    <MapPin size={14} className="text-[#657153] shrink-0 mt-0.5" />
                    <span>{item.address}</span>
                  </div>
                )}
              </div>

              {item.link && (
                <div className="pt-3 border-t border-[#657153]/15 mt-2">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#657153] hover:text-[#2C3225] font-medium uppercase tracking-wider transition-colors"
                  >
                    <span>{item.linkText || 'Ver mais informações'}</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
