import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { MapPin, Navigation, ExternalLink, Sparkles, Info, Compass } from 'lucide-react';

export const LocationMapSection: React.FC = () => {
  const { wedding } = useWedding();
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'reception'>('ceremony');

  const ceremonyMapsUrl = wedding.ceremonyGoogleMapsUrl || 'https://maps.app.goo.gl/dYZ67yqbERTkgi6q9';
  const receptionMapsUrl = wedding.receptionGoogleMapsUrl || 'https://maps.app.goo.gl/aVc6XUEi3BiLPXxH7';
  const wazeUrl = wedding.wazeUrl || 'https://waze.com/ul?q=Solar+Brasil+Almeida+Guaramiranga';

  const openUrl = (url: string) => {
    window.open(url, '_blank');
  };

  // Embed queries centered on coordinates in Guaramiranga
  const ceremonyEmbedUrl = `https://maps.google.com/maps?q=-4.2472008,-38.9698607+(Capela+Sao+Jose+Guaramiranga)&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const receptionEmbedUrl = `https://maps.google.com/maps?q=-4.2479041,-38.9695798+(Solar+Brasil+Almeida+Guaramiranga)&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="localizacao" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase text-[#8C7355] font-semibold mb-2">
            <Compass size={14} />
            <span>Como Chegar & Trajeto</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2A2623] font-normal mb-3">
            Localização em Guaramiranga - CE
          </h2>
          <div className="w-16 h-[1.5px] bg-[#8C7355]/40 mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#554D47] leading-relaxed">
            A cerimônia na <strong>Capela São José</strong> e a recepção no <strong>Solar Brasil Almeida</strong> ficam a poucos metros de distância (~100m) em meio ao verde da serra cearense.
          </p>
        </div>

        <div className="glass rounded-[2rem] p-6 sm:p-10 shadow-lg border border-white/60 overflow-hidden">
          
          {/* Venue Toggle Tabs */}
          <div className="flex items-center justify-center p-1.5 bg-[#8C7355]/10 rounded-2xl max-w-md mx-auto mb-8 border border-[#8C7355]/20">
            <button
              type="button"
              onClick={() => setActiveVenue('ceremony')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeVenue === 'ceremony'
                  ? 'bg-white text-[#2A2623] shadow-sm font-semibold'
                  : 'text-[#6B635B] hover:text-[#2A2623]'
              }`}
            >
              <Sparkles size={14} className={activeVenue === 'ceremony' ? 'text-[#8C7355]' : 'opacity-60'} />
              <span>1. Capela São José (Cerimônia)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveVenue('reception')}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeVenue === 'reception'
                  ? 'bg-white text-[#2A2623] shadow-sm font-semibold'
                  : 'text-[#6B635B] hover:text-[#2A2623]'
              }`}
            >
              <MapPin size={14} className={activeVenue === 'reception' ? 'text-[#8C7355]' : 'opacity-60'} />
              <span>2. Solar Brasil Almeida (Festa)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Location Details Info */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {activeVenue === 'ceremony' ? (
                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4 border border-[#8C7355]/20 shadow-sm bg-neutral-100">
                    <img
                      src={wedding.ceremonyImage || '/capela-sao-jose.jpg'}
                      alt="Capela São José"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 glass px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold text-[#8C7355] border border-white/60">
                      Capela São José
                    </div>
                  </div>

                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                    Cerimônia Religiosa • {wedding.ceremonyTime}h
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2623] mb-2">
                    {wedding.ceremonyVenue}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#554D47] leading-relaxed mb-4 flex items-start gap-2">
                    <MapPin size={16} className="text-[#8C7355] shrink-0 mt-0.5" />
                    <span>{wedding.ceremonyAddress}</span>
                  </p>

                  <div className="p-4 rounded-2xl bg-white/50 border border-[#8C7355]/15 text-xs text-[#554D47] space-y-2">
                    <p className="font-semibold text-[#2A2623] flex items-center gap-1.5">
                      <Sparkles size={14} className="text-[#8C7355]" />
                      <span>Orientações para a Cerimônia:</span>
                    </p>
                    <ul className="list-disc list-inside space-y-1 opacity-90 leading-relaxed">
                      <li>Início às {wedding.ceremonyTime}h pontualmente.</li>
                      <li>Espaço para estacionamento de convidados no local.</li>
                      <li>Após o Sim, caminhada rápida de 2 minutos (~100m) até a recepção no Solar Brasil Almeida.</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#8C7355] font-semibold block mb-1">
                    Recepção & Jantar • {wedding.receptionTime}h
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#2A2623] mb-2">
                    {wedding.receptionVenue}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#554D47] leading-relaxed mb-4 flex items-start gap-2">
                    <MapPin size={16} className="text-[#8C7355] shrink-0 mt-0.5" />
                    <span>{wedding.receptionAddress}</span>
                  </p>

                  {/* Clarification Alert about Mulungu vs Guaramiranga */}
                  <div className="p-4 rounded-2xl bg-[#8C7355]/10 border border-[#8C7355]/25 text-xs text-[#554D47] space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 font-semibold text-[#2A2623]">
                      <Info size={16} className="text-[#8C7355]" />
                      <span>Atenção à indicação do GPS:</span>
                    </div>
                    <p className="leading-relaxed opacity-95">
                      A cidade indicada em alguns aplicativos de navegação pode constar como <strong>Mulungu</strong>, mas na realidade a propriedade, entrada e endereço oficial pertencem a <strong>Guaramiranga - CE</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/50 border border-[#8C7355]/15 text-xs text-[#554D47] space-y-2">
                    <p className="font-semibold text-[#2A2623]">Dicas de Acesso & Festa:</p>
                    <ul className="list-disc list-inside space-y-1 opacity-90 leading-relaxed">
                      <li>Estacionamento seguro no local.</li>
                      <li>A apenas 100 metros da Capela São José.</li>
                      <li>Noite fresca da serra: recomendamos traje esporte fino confortável.</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons ("Como Chegar") */}
              <div className="space-y-3 pt-2">
                {activeVenue === 'ceremony' ? (
                  <button
                    id="btn-maps-ceremony"
                    type="button"
                    onClick={() => openUrl(ceremonyMapsUrl)}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#8C7355] hover:bg-[#745F46] text-white text-xs tracking-wider uppercase font-medium py-3.5 px-6 rounded-full shadow-md hover:shadow transition-all cursor-pointer"
                  >
                    <Navigation size={16} />
                    <span>Como Chegar: Capela São José (Maps)</span>
                    <ExternalLink size={14} className="opacity-70" />
                  </button>
                ) : (
                  <button
                    id="btn-maps-reception"
                    type="button"
                    onClick={() => openUrl(receptionMapsUrl)}
                    className="w-full flex items-center justify-center gap-2.5 bg-[#8C7355] hover:bg-[#745F46] text-white text-xs tracking-wider uppercase font-medium py-3.5 px-6 rounded-full shadow-md hover:shadow transition-all cursor-pointer"
                  >
                    <Navigation size={16} />
                    <span>Como Chegar: Solar Brasil Almeida (Maps)</span>
                    <ExternalLink size={14} className="opacity-70" />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openUrl(activeVenue === 'ceremony' ? receptionMapsUrl : ceremonyMapsUrl)}
                    className="flex items-center justify-center gap-1.5 glass hover:bg-white/80 text-[#2A2623] text-[11px] font-medium py-2.5 px-3 rounded-full border border-[#8C7355]/30 transition-all cursor-pointer text-center truncate"
                  >
                    <MapPin size={13} className="text-[#8C7355] shrink-0" />
                    <span className="truncate">{activeVenue === 'ceremony' ? 'Ver Solar Brasil' : 'Ver Capela São José'}</span>
                  </button>

                  <button
                    id="map-waze-btn"
                    type="button"
                    onClick={() => openUrl(wazeUrl)}
                    className="flex items-center justify-center gap-1.5 glass hover:bg-white/80 text-[#2A2623] text-[11px] font-medium py-2.5 px-3 rounded-full border border-[#8C7355]/30 transition-all cursor-pointer text-center"
                  >
                    <span>Rota no Waze</span>
                    <ExternalLink size={12} className="opacity-60 shrink-0" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Map Embed */}
            <div className="lg:col-span-7 flex flex-col space-y-3">
              <div className="h-80 sm:h-[420px] rounded-2xl overflow-hidden border border-[#8C7355]/20 shadow-inner relative bg-neutral-100">
                <iframe
                  title="Mapa Guaramiranga"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={activeVenue === 'ceremony' ? ceremonyEmbedUrl : receptionEmbedUrl}
                />
                
                {/* Overlay pin badge */}
                <div className="absolute top-3 left-3 glass px-3.5 py-1.5 rounded-full text-[11px] font-medium tracking-wide uppercase text-[#2A2623] pointer-events-none flex items-center gap-2 shadow-sm border border-white/70">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8C7355] animate-pulse" />
                  <span className="font-semibold">
                    {activeVenue === 'ceremony' ? 'Capela São José' : 'Solar Brasil Almeida'}
                  </span>
                  <span className="text-[10px] text-[#6B635B] hidden sm:inline">• Guaramiranga - CE</span>
                </div>

                <div className="absolute bottom-3 right-3 glass px-3 py-1 rounded-full text-[10px] text-[#554D47] border border-white/60 hidden sm:block">
                  Coordenadas: -4.2472, -38.9698
                </div>
              </div>

              {/* Informative footer below map */}
              <div className="flex flex-wrap items-center justify-between text-[11px] text-[#6B635B] px-2 gap-2">
                <span>📍 Serra de Baturité / Guaramiranga, CE</span>
                <span className="text-[#8C7355] font-medium">✨ Distância entre cerimônia e festa: ~100m</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
