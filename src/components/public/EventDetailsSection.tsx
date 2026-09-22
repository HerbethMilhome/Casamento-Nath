import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Calendar, Clock, MapPin, Sparkles, GlassWater, ExternalLink, Navigation, Info } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';

export const EventDetailsSection: React.FC = () => {
  const { wedding } = useWedding();

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const monthName = months[parseInt(month, 10) - 1] || 'Novembro';
      return {
        day: parseInt(day, 10),
        month: monthName,
        year,
      };
    } catch {
      return { day: 20, month: 'Novembro', year: '2026' };
    }
  };

  const { day, month, year } = formatDate(wedding.weddingDate);

  const openMaps = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <section id="o-grande-dia" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header with Anagram */}
        <div className="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center">
          <MonogramCrest size="sm" variant="seal" className="mb-4" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#608334] font-semibold block mb-2">
            Todos os Detalhes
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#202D17] font-normal mb-4">
            O Grande Dia
          </h2>
          <div className="w-16 h-[1.5px] bg-[#608334]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#38452D] leading-relaxed font-light">
            Preparamos cada detalhe para que esse momento seja inesquecível. Confira a programação, locais da celebração e dicas de trajeto na serra de Guaramiranga.
          </p>
        </div>

        {/* Big Date Display Card */}
        <div className="glass rounded-3xl p-8 sm:p-10 mb-10 text-center max-w-2xl mx-auto shadow-sm border border-[#CBDDB5]">
          <div className="flex items-center justify-center gap-3 text-[#608334] mb-2">
            <Calendar size={20} />
            <span className="text-xs uppercase tracking-[0.25em] font-medium">Data do Casamento</span>
          </div>
          <div className="font-serif text-4xl sm:text-6xl text-[#202D17] font-normal my-2">
            {day} de {month} de {year}
          </div>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#608334] mt-3 font-medium tracking-wide">
            <Clock size={16} />
            <span>Cerimônia às {wedding.ceremonyTime}h pontualmente</span>
          </div>
        </div>

        {/* Venue Information Cards */}
        {wedding.sameLocation ? (
          /* Same location for Ceremony & Reception */
          <div className="glass rounded-3xl p-8 sm:p-12 shadow-sm border border-[#CBDDB5]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#CBDDB5]/60">
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#608334] font-semibold block mb-1">
                  Cerimônia & Recepção Integradas
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#202D17]">
                  {wedding.ceremonyVenue}
                </h3>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#38452D] mt-2">
                  <MapPin size={16} className="text-[#608334] shrink-0" />
                  <span>{wedding.ceremonyAddress}</span>
                </div>
              </div>

              <div className="bg-[#608334]/10 px-6 py-3 rounded-2xl border border-[#CBDDB5] text-center shrink-0">
                <span className="text-[10px] tracking-widest uppercase text-[#608334] block">Horário</span>
                <span className="font-serif text-2xl text-[#202D17] font-medium">{wedding.ceremonyTime}h</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
              <div className="p-4 rounded-2xl bg-white/60 border border-[#CBDDB5]">
                <div className="flex items-center gap-2 text-[#608334] text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles size={16} />
                  <span>A Cerimônia</span>
                </div>
                <p className="text-xs sm:text-sm text-[#38452D] leading-relaxed">
                  A celebração religiosa acontecerá na capela com bênçãos e votos. Pontualidade é fundamental.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 border border-[#CBDDB5]">
                <div className="flex items-center gap-2 text-[#608334] text-xs font-semibold uppercase tracking-wider mb-2">
                  <GlassWater size={16} />
                  <span>A Festa & Jantar</span>
                </div>
                <p className="text-xs sm:text-sm text-[#38452D] leading-relaxed">
                  Logo após a celebração, os convidados serão recebidos com banquete, drinques e pista de dança.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Separate locations for Ceremony & Reception */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* Card Cerimônia Religiosa (Capela São José) */}
              <div className="glass rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CBDDB5] flex flex-col justify-between overflow-hidden relative group">
                <div>
                  {/* Photo of Capela São José */}
                  <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-[#CBDDB5] shadow-sm bg-neutral-100">
                    <img
                      src={wedding.ceremonyImage || '/capela-sao-jose.jpg'}
                      alt="Capela São José"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 glass px-3 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold text-[#608334] border border-[#CBDDB5]">
                      Capela Histórica em Pedra
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium">
                      Início às {wedding.ceremonyTime}h
                    </div>
                  </div>

                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#608334] font-semibold block mb-1">
                    A Cerimônia Religiosa
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#202D17] mb-2">
                    {wedding.ceremonyVenue}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#38452D] flex items-start gap-2 mb-4">
                    <MapPin size={16} className="text-[#608334] shrink-0 mt-0.5" />
                    <span>{wedding.ceremonyAddress}</span>
                  </p>

                  <p className="text-xs text-[#526344] leading-relaxed mb-6">
                    A celebração matrimonial será realizada na charmosa Capela São José, cercada pela natureza serrana e arquitetura rústica em pedra.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#CBDDB5]/60 flex items-center justify-between gap-3">
                  <div className="inline-block bg-[#608334]/10 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#608334] border border-[#CBDDB5]">
                    Início: {wedding.ceremonyTime}h
                  </div>

                  <button
                    type="button"
                    onClick={() => openMaps(wedding.ceremonyGoogleMapsUrl || wedding.googleMapsUrl)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#608334] hover:bg-[#4E6B2A] text-white text-xs font-medium shadow-sm transition-all cursor-pointer"
                  >
                    <Navigation size={13} />
                    <span>Ver no Maps</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </button>
                </div>
              </div>

              {/* Card Recepção & Festa (Solar Brasil Almeida) */}
              <div className="glass rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CBDDB5] flex flex-col justify-between overflow-hidden relative">
                <div>
                  {/* Decorative Banner */}
                  <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden mb-6 border border-[#CBDDB5] shadow-sm bg-gradient-to-br from-[#F7FEEF] via-[#CBDDB5]/40 to-[#A8CA7E]/30 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#608334] mb-3 shadow-inner border border-[#CBDDB5]">
                      <GlassWater size={24} />
                    </div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#608334] font-semibold block mb-1">
                      Festa & Recepção
                    </span>
                    <h4 className="font-serif text-2xl text-[#202D17] font-medium">
                      Solar Brasil Almeida
                    </h4>
                    <p className="text-xs text-[#38452D] mt-1 font-light">
                      Guaramiranga — Ceará
                    </p>
                    <div className="absolute bottom-3 right-3 bg-black/65 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium">
                      Início às {wedding.receptionTime}h
                    </div>
                  </div>

                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#608334] font-semibold block mb-1">
                    A Recepção & Jantar
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#202D17] mb-2">
                    {wedding.receptionVenue}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-[#38452D] flex items-start gap-2 mb-3">
                    <MapPin size={16} className="text-[#608334] shrink-0 mt-0.5" />
                    <span>{wedding.receptionAddress}</span>
                  </p>

                  {/* Clarification Alert about Guaramiranga vs Mulungu */}
                  <div className="p-3 rounded-xl bg-[#608334]/10 border border-[#CBDDB5] text-[11px] text-[#38452D] flex items-start gap-2 mb-6">
                    <Info size={15} className="text-[#608334] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#202D17] block">Atenção ao GPS:</strong>
                      Nos aplicativos de mapa a localidade pode indicar Mulungu pela divisa municipal, mas a entrada oficial e território pertencem a <strong>Guaramiranga - CE</strong>.
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#CBDDB5]/60 flex items-center justify-between gap-3">
                  <div className="inline-block bg-[#608334]/10 px-3.5 py-1.5 rounded-full text-xs font-medium text-[#608334] border border-[#CBDDB5]">
                    Início: {wedding.receptionTime}h
                  </div>

                  <button
                    type="button"
                    onClick={() => openMaps(wedding.receptionGoogleMapsUrl || 'https://maps.app.goo.gl/aVc6XUEi3BiLPXxH7')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#608334] hover:bg-[#4E6B2A] text-white text-xs font-medium shadow-sm transition-all cursor-pointer"
                  >
                    <Navigation size={13} />
                    <span>Ver no Maps</span>
                    <ExternalLink size={12} className="opacity-70" />
                  </button>
                </div>
              </div>

            </div>

            {/* Proximity Callout Banner */}
            <div className="glass rounded-2xl p-4 sm:p-5 border border-[#CBDDB5] text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-[#38452D]">
              <Sparkles size={16} className="text-[#608334] shrink-0" />
              <span>
                <strong>Locais Vizinhos:</strong> A Capela São José e o Solar Brasil Almeida ficam a apenas cerca de <strong>100 metros</strong> de distância um do outro (menos de 2 minutos de caminhada).
              </span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
