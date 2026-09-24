import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { StoryMilestone, StoryPhoto } from '../../types';
import { STORY_CLOSING, STORY_SOUNDTRACK } from '../../data/initialWeddingData';
import { StoryWatercolor } from '../common/StoryWatercolor';
import { useReveal } from '../../hooks/useReveal';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Images,
  MapPin,
  Music,
  Pause,
  X,
  ZoomIn,
} from 'lucide-react';

/** One photo slot paired with the milestone it belongs to. */
interface AlbumEntry {
  key: string;
  photo: StoryPhoto;
  milestone: StoryMilestone;
}

/** Photo slots of a milestone, falling back to the legacy single `photoUrl`. */
const slotsOf = (milestone: StoryMilestone): StoryPhoto[] => {
  if (milestone.photos && milestone.photos.length > 0) return milestone.photos;
  if (milestone.photoUrl) {
    return [
      {
        id: `${milestone.id}-legacy`,
        url: milestone.photoUrl,
        caption: milestone.caption,
        art: milestone.art,
      },
    ];
  }
  return [];
};

const Reveal: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}> = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const directionClass =
    direction === 'left' ? 'reveal-left' : direction === 'right' ? 'reveal-right' : '';

  return (
    <div
      ref={ref}
      className={`reveal ${directionClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/** A photo slot: the real picture once uploaded, the watercolour until then. */
const PhotoSlot: React.FC<{
  entry: AlbumEntry;
  onOpen: () => void;
  heightClass?: string;
}> = ({ entry, onOpen, heightClass = 'h-44 sm:h-52' }) => {
  const { photo, milestone } = entry;
  const label = photo.caption || milestone.title;

  return (
    <figure className="group/slot">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar: ${label}`}
        className="relative block w-full overflow-hidden rounded-2xl border border-[#E9DDCC] bg-[#F9F6EF] cursor-pointer focus-gold"
      >
        <div className={`${heightClass} w-full`}>
          {photo.url ? (
            <img
              src={photo.url}
              alt={label}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover/slot:scale-105"
            />
          ) : (
            <StoryWatercolor motif={photo.art || milestone.art} label={photo.caption} />
          )}
        </div>

        <span className="absolute inset-0 bg-[#2C3225]/0 group-hover/slot:bg-[#2C3225]/15 transition-colors" />
        <span className="absolute right-2.5 bottom-2.5 w-8 h-8 rounded-full bg-white/85 text-[#657153] flex items-center justify-center opacity-0 group-hover/slot:opacity-100 transition-opacity shadow-sm">
          <ZoomIn size={15} />
        </span>
        {!photo.url && (
          <span className="absolute left-2.5 top-2.5 text-[9px] tracking-[0.18em] uppercase bg-white/80 text-[#A98C5B] px-2 py-0.5 rounded-full font-semibold">
            Aquarela
          </span>
        )}
      </button>
      {photo.caption && (
        <figcaption className="mt-2 text-[11px] italic text-[#7C7D6C] text-center font-cormorant">
          {photo.caption}
        </figcaption>
      )}
    </figure>
  );
};

export const StorySection: React.FC = () => {
  const { milestones, wedding } = useWedding();
  const theme = wedding.theme;
  const olive = theme?.primaryColor || '#657153';
  const gold = theme?.accentColor || '#A98C5B';

  const [viewMode, setViewMode] = useState<'timeline' | 'text'>('timeline');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement | null>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const sortedMilestones = useMemo(
    () => [...milestones].sort((a, b) => a.order - b.order),
    [milestones]
  );

  /** Flat album, in timeline order, so the lightbox can walk the whole story. */
  const album = useMemo<AlbumEntry[]>(() => {
    const entries: AlbumEntry[] = [];
    sortedMilestones.forEach((milestone) => {
      slotsOf(milestone).forEach((photo) => {
        entries.push({ key: `${milestone.id}-${photo.id}`, photo, milestone });
      });
    });
    return entries;
  }, [sortedMilestones]);

  const openLightbox = useCallback((index: number) => {
    if (index < 0) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    lastFocusedRef.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setLightboxIndex((current) => {
        if (current === null || album.length === 0) return current;
        return (current + delta + album.length) % album.length;
      });
    },
    [album.length]
  );

  // Keyboard control and scroll lock while the lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    lightboxCloseRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex, closeLightbox, step]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const indexOfEntry = (key: string) => album.findIndex((entry) => entry.key === key);
  const activeEntry = lightboxIndex === null ? null : album[lightboxIndex];

  return (
    <section
      id="historia"
      aria-labelledby="historia-titulo"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden paper-grain"
    >
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-semibold block mb-3"
            style={{ color: gold }}
          >
            2020 — 2026
          </span>
          <h2
            id="historia-titulo"
            className="font-script text-5xl sm:text-7xl leading-[1.15] font-normal mb-3"
            style={{ color: olive }}
          >
            Nossa História de Amor
          </h2>
          <div className="w-24 divider-gold mx-auto mb-6" />
          <p className="text-base sm:text-lg text-[#55594A] leading-relaxed font-cormorant">
            Seis anos, muitas estradas e um sim. Cada capítulo vivido nos trouxe até esse
            momento tão sonhado — compartilhamos com vocês os passos dessa caminhada a dois.
          </p>

          {/* Mode switcher & optional soundtrack */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div
              className="inline-flex items-center gap-1 glass p-1 rounded-full"
              role="tablist"
              aria-label="Forma de ver a nossa história"
            >
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'timeline'}
                onClick={() => setViewMode('timeline')}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all cursor-pointer focus-gold"
                style={
                  viewMode === 'timeline'
                    ? { backgroundColor: olive, color: '#FFFFFF' }
                    : { color: '#55594A' }
                }
              >
                <Clock size={14} />
                <span>Linha do Tempo</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'text'}
                onClick={() => setViewMode('text')}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium transition-all cursor-pointer focus-gold"
                style={
                  viewMode === 'text'
                    ? { backgroundColor: olive, color: '#FFFFFF' }
                    : { color: '#55594A' }
                }
              >
                <BookOpen size={14} />
                <span>Texto Narrativo</span>
              </button>
            </div>

            {STORY_SOUNDTRACK.url && (
              <>
                <button
                  type="button"
                  onClick={toggleMusic}
                  aria-pressed={isPlaying}
                  className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs tracking-wider uppercase font-medium text-[#55594A] hover:text-[#2C3225] transition-colors cursor-pointer focus-gold"
                >
                  {isPlaying ? <Pause size={14} /> : <Music size={14} />}
                  <span>{isPlaying ? 'Pausar música' : 'Ouvir nossa música'}</span>
                </button>
                <audio
                  ref={audioRef}
                  src={STORY_SOUNDTRACK.url}
                  preload="none"
                  onEnded={() => setIsPlaying(false)}
                />
              </>
            )}
          </div>
        </Reveal>

        {viewMode === 'timeline' ? (
          <>
            <div className="relative">
              {/* Gold trace: left rail on mobile, centre line on desktop */}
              <div
                aria-hidden="true"
                className="absolute top-2 bottom-2 w-[2px] left-[21px] md:left-1/2 -translate-x-1/2 timeline-trace"
              />

              <ol className="space-y-12 sm:space-y-16 list-none">
                {sortedMilestones.map((milestone, idx) => {
                  const onRight = idx % 2 === 0;
                  const slots = slotsOf(milestone);

                  return (
                    <li key={milestone.id} className="relative">
                      {/* Heart node on the trace */}
                      <div
                        aria-hidden="true"
                        className="absolute top-7 left-[21px] md:left-1/2 -translate-x-1/2 z-20 w-10 h-10 rounded-full glass flex items-center justify-center shadow-sm"
                        style={{ color: gold }}
                      >
                        <Heart size={15} style={{ fill: `${gold}33` }} />
                      </div>

                      <Reveal
                        direction={onRight ? 'right' : 'left'}
                        className={`pl-14 md:pl-0 md:w-[calc(50%-2.75rem)] ${onRight ? 'md:ml-auto' : ''}`}
                      >
                        <article className="glass rounded-3xl p-6 sm:p-7 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between gap-3 mb-2">
                            <span
                              className="font-cormorant text-2xl sm:text-3xl font-light"
                              style={{ color: gold }}
                            >
                              {milestone.year}
                            </span>
                            <span
                              className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full font-medium"
                              style={{ backgroundColor: `${olive}1A`, color: olive }}
                            >
                              Capítulo {idx + 1}
                            </span>
                          </div>

                          {milestone.dateLabel && milestone.dateLabel !== milestone.year && (
                            <p className="text-[11px] tracking-[0.16em] uppercase text-[#7C7D6C] font-semibold mb-1.5">
                              {milestone.dateLabel}
                            </p>
                          )}

                          <h3 className="font-cormorant text-2xl sm:text-3xl text-[#2C3225] mb-2 leading-snug">
                            {milestone.title}
                          </h3>

                          {milestone.location && (
                            <p className="flex items-start gap-1.5 text-xs text-[#657153] mb-3 font-medium">
                              <MapPin size={13} className="mt-[2px] shrink-0" />
                              <span>{milestone.location}</span>
                            </p>
                          )}

                          <p className="font-cormorant text-base sm:text-lg text-[#55594A] leading-relaxed mb-4">
                            {milestone.description}
                          </p>

                          {slots.length > 0 && (
                            <div className={`grid gap-3 ${slots.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                              {slots.map((photo) => {
                                const key = `${milestone.id}-${photo.id}`;
                                return (
                                  <PhotoSlot
                                    key={key}
                                    entry={{ key, photo, milestone }}
                                    onOpen={() => openLightbox(indexOfEntry(key))}
                                    heightClass={slots.length > 1 ? 'h-32 sm:h-36' : 'h-48 sm:h-56'}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </article>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            </div>

            {/* Closing */}
            <Reveal className="mt-16 text-center max-w-2xl mx-auto">
              <div className="w-24 divider-gold mx-auto mb-6" />
              <p className="font-script text-3xl sm:text-4xl leading-snug mb-5" style={{ color: olive }}>
                {STORY_CLOSING.phrase}
              </p>
              <blockquote className="glass rounded-3xl px-6 py-5 inline-block">
                <p className="font-cormorant italic text-base sm:text-lg text-[#55594A]">
                  “{STORY_CLOSING.verseText}”
                </p>
                <cite
                  className="block mt-2 text-[10px] tracking-[0.22em] uppercase font-semibold not-italic"
                  style={{ color: gold }}
                >
                  {STORY_CLOSING.verseRef}
                </cite>
              </blockquote>
            </Reveal>

            {/* Final gallery */}
            {album.length > 0 && (
              <Reveal className="mt-16">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Images size={15} style={{ color: gold }} />
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-[#2C3225]">
                    Nosso Álbum de Memórias
                  </h3>
                </div>
                <p className="text-center text-xs sm:text-sm text-[#7C7D6C] font-cormorant mb-6 max-w-xl mx-auto">
                  Cada moldura guarda um lugar da nossa história. As aquarelas são apenas o
                  espaço reservado para as fotografias que ainda vamos colocar aqui.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {album.map((entry, index) => (
                    <PhotoSlot
                      key={`album-${entry.key}`}
                      entry={entry}
                      onOpen={() => openLightbox(index)}
                      heightClass="h-28 sm:h-32"
                    />
                  ))}
                </div>
              </Reveal>
            )}
          </>
        ) : (
          /* Editorial narrative */
          <Reveal className="glass rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-sm">
            <p className="text-center font-script text-3xl mb-8" style={{ color: olive }}>
              Para sempre nós
            </p>
            <div className="space-y-7">
              {sortedMilestones.map((m) => (
                <div key={m.id} className="pb-7 border-b border-[#E9DDCC] last:border-b-0 last:pb-0">
                  <span
                    className="block text-[11px] tracking-[0.18em] uppercase font-semibold mb-1"
                    style={{ color: gold }}
                  >
                    {m.dateLabel || m.year}
                  </span>
                  <h3 className="font-cormorant text-xl sm:text-2xl text-[#2C3225] mb-2">{m.title}</h3>
                  <p className="font-cormorant text-base sm:text-lg text-[#55594A] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <p className="font-script text-2xl sm:text-3xl mb-3" style={{ color: olive }}>
                {STORY_CLOSING.phrase}
              </p>
              <p className="font-cormorant italic text-sm text-[#55594A]">
                “{STORY_CLOSING.verseText}” — {STORY_CLOSING.verseRef}
              </p>
            </div>
          </Reveal>
        )}
      </div>

      {/* Lightbox */}
      {activeEntry && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeEntry.photo.caption || activeEntry.milestone.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2C3225]/85 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-3xl" onClick={(event) => event.stopPropagation()}>
            <div className="rounded-3xl overflow-hidden bg-[#F9F6EF] border border-[#E9DDCC] shadow-2xl">
              <div className="h-[46vh] sm:h-[58vh] w-full bg-[#F3EDE1]">
                {activeEntry.photo.url ? (
                  <img
                    src={activeEntry.photo.url}
                    alt={activeEntry.photo.caption || activeEntry.milestone.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <StoryWatercolor
                    motif={activeEntry.photo.art || activeEntry.milestone.art}
                    label={activeEntry.photo.caption}
                  />
                )}
              </div>
              <div className="p-5 text-center">
                <span
                  className="block text-[10px] tracking-[0.2em] uppercase font-semibold mb-1"
                  style={{ color: gold }}
                >
                  {activeEntry.milestone.dateLabel || activeEntry.milestone.year}
                </span>
                <p className="font-cormorant text-lg text-[#2C3225]">
                  {activeEntry.photo.caption || activeEntry.milestone.title}
                </p>
                {activeEntry.milestone.location && (
                  <p className="text-xs text-[#7C7D6C] mt-1">{activeEntry.milestone.location}</p>
                )}
                {!activeEntry.photo.url && (
                  <p className="text-[11px] italic text-[#A98C5B] mt-2">
                    Aquarela do destino — fotografia em breve
                  </p>
                )}
                <span className="block text-[10px] text-[#7C7D6C] mt-3">
                  {(lightboxIndex ?? 0) + 1} de {album.length}
                </span>
              </div>
            </div>

            <button
              ref={lightboxCloseRef}
              type="button"
              onClick={closeLightbox}
              aria-label="Fechar"
              className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white text-[#2C3225] shadow-lg flex items-center justify-center hover:bg-[#F3EDE1] transition-colors cursor-pointer focus-gold"
            >
              <X size={18} />
            </button>

            {album.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Foto anterior"
                  className="absolute top-1/2 -translate-y-1/2 left-2 sm:-left-14 w-10 h-10 rounded-full bg-white/90 text-[#2C3225] shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer focus-gold"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Próxima foto"
                  className="absolute top-1/2 -translate-y-1/2 right-2 sm:-right-14 w-10 h-10 rounded-full bg-white/90 text-[#2C3225] shadow-lg flex items-center justify-center hover:bg-white transition-colors cursor-pointer focus-gold"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
