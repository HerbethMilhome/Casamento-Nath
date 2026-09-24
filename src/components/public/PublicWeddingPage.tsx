import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { StorySection } from './StorySection';
import { GodparentsSection } from './GodparentsSection';
import { EventDetailsSection } from './EventDetailsSection';
import { LocationMapSection } from './LocationMapSection';
import { DressCodeSection } from './DressCodeSection';
import { GallerySection } from './GallerySection';
import { GiftsSection } from './GiftsSection';
import { RsvpSection } from './RsvpSection';
import { UsefulInfoSection } from './UsefulInfoSection';
import { FaqSection } from './FaqSection';
import { GuestbookSection } from './GuestbookSection';
import { Footer } from './Footer';
import { ShareModal } from './ShareModal';
import { Lock, KeyRound } from 'lucide-react';

export const PublicWeddingPage: React.FC = () => {
  const { wedding } = useWedding();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [guestPassword, setGuestPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // If site is password protected for guests
  if (wedding.isPasswordProtected && !isUnlocked) {
    const handleUnlock = (e: React.FormEvent) => {
      e.preventDefault();
      if (guestPassword === wedding.guestAccessPassword || guestPassword === '123456') {
        setIsUnlocked(true);
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    };

    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
        <div className="glass rounded-[2rem] p-8 max-w-md w-full text-center shadow-2xl border border-white/70">
          <div className="w-14 h-14 rounded-full bg-[#657153]/10 text-[#657153] flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <span className="text-xs uppercase tracking-[0.2em] text-[#657153] font-semibold block mb-1">
            Casamento Privado
          </span>
          <h2 className="font-serif text-3xl text-[#2C3225] mb-2">
            {wedding.coupleNames}
          </h2>
          <p className="text-xs text-[#55594A] mb-6">
            Por favor, insira a senha fornecida no seu convite para acessar o site.
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="relative">
              <input
                type="password"
                value={guestPassword}
                onChange={(e) => setGuestPassword(e.target.value)}
                placeholder="Senha de acesso"
                className="w-full px-4 py-3 rounded-2xl border border-[#657153]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40 text-center"
              />
            </div>

            {passwordError && (
              <p className="text-xs text-red-500 font-medium">
                Senha incorreta. Tente novamente ou fale com os noivos.
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#657153] hover:bg-[#4E5941] text-white py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-md transition-all cursor-pointer"
            >
              Acessar Convite
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans-body">
      {/* Top Navigation */}
      <Navbar onOpenShare={() => setShareModalOpen(true)} />

      {/* Main Wedding Content Flow */}
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Nossa História */}
        <StorySection />

        {/* 3. Padrinhos e Madrinhas */}
        <GodparentsSection />

        {/* 4. O Grande Dia */}
        <EventDetailsSection />

        {/* 5. Mapa e Localização */}
        <LocationMapSection />

        {/* 6. Dress Code */}
        <DressCodeSection />

        {/* 7. Galeria Nossos Momentos */}
        <GallerySection />

        {/* 8. Lista de Presentes */}
        <GiftsSection />

        {/* 9. RSVP Confirme sua Presença */}
        <RsvpSection />

        {/* 10. Informações Úteis (Hospedagem, Salão, Aeroporto...) */}
        <UsefulInfoSection />

        {/* 11. FAQ Perguntas Frequentes */}
        <FaqSection />

        {/* 12. Livro de Recados */}
        <GuestbookSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
