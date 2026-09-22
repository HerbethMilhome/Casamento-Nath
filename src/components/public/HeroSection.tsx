import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { CountdownTimer } from './CountdownTimer';
import { Calendar, MapPin, Sparkles, ArrowDown } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';

export const HeroSection: React.FC = () => {
  const { wedding } = useWedding();

  // Format date in Portuguese e.g., 20 de novembro de 2026
  const formatWeddingDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      const monthName = months[parseInt(month, 10) - 1] || 'Novembro';
      return `${parseInt(day, 10)} de ${monthName} de ${year}`;
    } catch {
      return '20 de Novembro de 2026';
    }
  };

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] pt-28 pb-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Ambient background decoration with new botanical palette */}
      <div className="absolute inset-0 mesh-bg opacity-85 pointer-events-none z-0" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#A8CA7E]/20 rounded-full blur-[110px] pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#608334]/15 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Main Grid: Editorial Typography & Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left / Top Editorial Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">
            
            {/* Anagram / Monogram Badge & Tagline */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-4">
              <MonogramCrest size="sm" variant="seal" />
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm italic font-serif text-[#608334] bg-white/70 px-4 py-1.5 rounded-full border border-[#CBDDB5] backdrop-blur-sm shadow-xs">
                <Sparkles size={14} className="text-[#A8CA7E]" />
                <span>Nosso grande dia está chegando</span>
              </div>
            </div>

            {/* Couple Names */}
            <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight text-[#202D17] mb-6">
              {wedding.spouse1.split(' ')[0]} <br className="hidden sm:inline" />
              <span className="text-[#608334] font-light">&</span> {wedding.spouse2.split(' ')[0]}
            </h1>

            {/* Heartfelt Message */}
            <p className="text-sm sm:text-base text-[#38452D] max-w-xl leading-relaxed font-light mb-8 italic">
              "{wedding.shortPhrase}"
            </p>

            {/* Date & Location Pill Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 mb-10 pb-8 border-b border-[#CBDDB5]/60 w-full max-w-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#608334] border border-[#CBDDB5]">
                  <Calendar size={18} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-[#608334] opacity-80 font-semibold">
                    Data do Casamento
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#202D17] font-medium">
                    {formatWeddingDate(wedding.weddingDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center text-[#608334] border border-[#CBDDB5]">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] tracking-[0.2em] uppercase text-[#608334] opacity-80 font-semibold">
                    Cidade & Local
                  </span>
                  <span className="font-serif text-base sm:text-lg text-[#202D17] font-medium">
                    {wedding.city} — {wedding.state}
                  </span>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="w-full max-w-xl mb-10">
              <span className="block text-[10px] tracking-[0.22em] uppercase text-[#608334] font-semibold mb-3">
                Contagem Regressiva para o Casamento
              </span>
              <CountdownTimer
                targetDateStr={wedding.weddingDate}
                targetTimeStr={wedding.weddingTime}
              />
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <button
                id="hero-rsvp-btn"
                onClick={() => scrollTo('#rsvp')}
                className="w-full sm:w-auto bg-[#608334] hover:bg-[#4E6B2A] text-white text-xs tracking-[0.16em] uppercase font-semibold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px] cursor-pointer"
              >
                Confirmar Presença
              </button>

              <button
                id="hero-info-btn"
                onClick={() => scrollTo('#o-grande-dia')}
                className="w-full sm:w-auto glass hover:bg-white/80 text-[#202D17] text-xs tracking-[0.16em] uppercase font-semibold px-7 py-4 rounded-full border border-[#CBDDB5] transition-all cursor-pointer"
              >
                Ver Informações
              </button>
            </div>
          </div>

          {/* Right Column: Frosted Glass Wedding Photo Frame & Teasers */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Photo Card with Frosted Border */}
            <div className="glass rounded-[2rem] p-3 sm:p-4 shadow-xl relative overflow-hidden group border border-[#CBDDB5]">
              <div className="relative h-[360px] sm:h-[420px] rounded-[1.6rem] overflow-hidden">
                <img
                  src={wedding.coverImage}
                  alt={wedding.coupleNames}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Frosted Glass Overlay Badge */}
                <div className="absolute bottom-4 left-4 right-4 glass-dark text-white rounded-2xl p-4 flex items-center justify-between border border-[#CBDDB5]/30">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#CBDDB5] block">
                      Cerimônia & Recepção
                    </span>
                    <span className="font-serif text-sm sm:text-base font-normal">
                      {wedding.ceremonyVenue}
                    </span>
                  </div>
                  <span className="text-xs bg-[#608334]/80 text-white backdrop-blur-md px-3 py-1.5 rounded-full font-mono border border-white/20">
                    {wedding.ceremonyTime}h
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Link Cards */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => scrollTo('#presentes')}
                className="glass rounded-2xl p-4 text-left hover:bg-white/90 transition-all cursor-pointer group border border-[#CBDDB5]"
              >
                <span className="block text-[9px] uppercase tracking-widest text-[#608334] font-semibold mb-1">
                  Lista de Presentes
                </span>
                <span className="font-serif text-sm text-[#202D17] group-hover:text-[#608334] transition-colors">
                  Presentear os noivos →
                </span>
              </button>

              <button
                onClick={() => scrollTo('#dress-code')}
                className="glass rounded-2xl p-4 text-left hover:bg-white/90 transition-all cursor-pointer group border border-[#CBDDB5]"
              >
                <span className="block text-[9px] uppercase tracking-widest text-[#608334] font-semibold mb-1">
                  Dress Code
                </span>
                <span className="font-serif text-sm text-[#202D17] group-hover:text-[#608334] transition-colors">
                  {wedding.dressCodeTitle} →
                </span>
              </button>
            </div>
          </div>

        </div>

        {/* Subtle scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollTo('#historia')}
            className="flex flex-col items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#608334] opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Rolar para a nossa história"
          >
            <span>Conheça Nossa História</span>
            <ArrowDown size={14} className="animate-bounce" />
          </button>
        </div>

      </div>
    </section>
  );
};
