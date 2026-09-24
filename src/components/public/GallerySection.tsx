import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { GalleryPhoto } from '../../types';
import { LayoutGrid, Grid3X3, Columns, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const { photos } = useWedding();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'mosaic' | 'carousel'>('grid');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const sortedPhotos = [...photos].sort((a, b) => a.order - b.order);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextLightbox = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % sortedPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex - 1 + sortedPhotos.length) % sortedPhotos.length);
    }
  };

  return (
    <section id="galeria" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Memórias & Ensaios
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Nossos Momentos
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Um vislumbre dos sorrisos, olhares e viagens que construíram nossa história. Clique nas fotos para ampliar.
          </p>

          {/* Layout Mode Selector */}
          <div className="inline-flex items-center gap-1 glass p-1 rounded-full mt-6 border border-[#657153]/20">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                layoutMode === 'grid'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              <LayoutGrid size={14} />
              <span>Grade</span>
            </button>
            <button
              onClick={() => setLayoutMode('mosaic')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                layoutMode === 'mosaic'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              <Grid3X3 size={14} />
              <span>Mosaico</span>
            </button>
            <button
              onClick={() => setLayoutMode('carousel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                layoutMode === 'carousel'
                  ? 'bg-[#657153] text-white font-medium shadow-sm'
                  : 'text-[#55594A] hover:text-[#657153]'
              }`}
            >
              <Columns size={14} />
              <span>Carrossel</span>
            </button>
          </div>
        </div>

        {/* 1. Grid Mode */}
        {layoutMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative h-72 sm:h-80 rounded-3xl overflow-hidden glass p-2 cursor-pointer shadow-sm hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Foto do casal'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <p className="text-white text-xs sm:text-sm font-serif italic">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Mosaic Mode */}
        {layoutMode === 'mosaic' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {sortedPhotos.map((photo, index) => {
              // Create dynamic spans for mosaic feel
              const spans = [
                'md:col-span-8 md:h-96',
                'md:col-span-4 md:h-96',
                'md:col-span-4 md:h-80',
                'md:col-span-4 md:h-80',
                'md:col-span-4 md:h-80',
                'md:col-span-12 md:h-96',
              ];
              const spanClass = spans[index % spans.length] || 'md:col-span-6 md:h-80';

              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(index)}
                  className={`${spanClass} h-64 relative rounded-3xl overflow-hidden glass p-2 cursor-pointer group shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <p className="text-white text-sm font-serif italic">{photo.caption}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3. Carousel Mode */}
        {layoutMode === 'carousel' && (
          <div className="relative max-w-4xl mx-auto glass rounded-[2.5rem] p-4 sm:p-6 shadow-xl">
            <div className="relative h-[380px] sm:h-[500px] rounded-3xl overflow-hidden">
              <img
                src={sortedPhotos[carouselIndex]?.url}
                alt={sortedPhotos[carouselIndex]?.caption}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
                <p className="font-serif text-lg sm:text-xl italic">
                  {sortedPhotos[carouselIndex]?.caption}
                </p>
                <span className="text-[10px] tracking-widest uppercase opacity-75">
                  Foto {carouselIndex + 1} de {sortedPhotos.length}
                </span>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={() => setCarouselIndex((carouselIndex - 1 + sortedPhotos.length) % sortedPhotos.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-[#2C3225] hover:bg-white transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCarouselIndex((carouselIndex + 1) % sortedPhotos.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass flex items-center justify-center text-[#2C3225] hover:bg-white transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {/* Guest photos future upload teaser */}
        <div className="mt-12 glass rounded-2xl p-6 text-center max-w-xl mx-auto border border-[#657153]/20">
          <div className="w-10 h-10 rounded-full bg-[#657153]/10 text-[#657153] flex items-center justify-center mx-auto mb-3">
            <Camera size={20} />
          </div>
          <h4 className="font-serif text-lg text-[#2C3225] mb-1">
            Espaço para Fotos dos Convidados
          </h4>
          <p className="text-xs text-[#55594A] leading-relaxed">
            No dia do casamento, disponibilizaremos um QR Code especial nas mesas para que todos possam enviar as fotos tiradas durante a celebração diretamente para a nossa galeria!
          </p>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Fechar visualização"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevLightbox}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight size={28} />
          </button>

          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center">
            <img
              src={sortedPhotos[activePhotoIndex].url}
              alt={sortedPhotos[activePhotoIndex].caption}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
            />
            {sortedPhotos[activePhotoIndex].caption && (
              <p className="text-white/90 font-serif text-center mt-4 text-sm sm:text-base italic">
                {sortedPhotos[activePhotoIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
