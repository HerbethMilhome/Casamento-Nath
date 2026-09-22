import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { X, Copy, Check, Share2, Mail, MessageCircle, QrCode } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const { wedding } = useWedding();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://casamento.app/${wedding.slug}`;
  const shareMessage = `Estamos muito felizes em dividir esse momento com você! Criamos nosso site com todas as informações do casamento de ${wedding.coupleNames}. Esperamos você: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const handleEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(`Convite de Casamento — ${wedding.coupleNames}`)}&body=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass rounded-[2rem] p-6 sm:p-8 max-w-md w-full bg-[#F9F6F2] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-white/70">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#554D47] hover:text-[#2A2623] p-1 rounded-full hover:bg-black/5 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#8C7355]/10 text-[#8C7355] flex items-center justify-center mx-auto mb-3">
            <Share2 size={22} />
          </div>
          <h3 className="font-serif text-2xl text-[#2A2623] mb-1">
            Compartilhar Convite
          </h3>
          <p className="text-xs text-[#554D47]">
            Envie para seus convidados através do WhatsApp, e-mail ou copie o link direto.
          </p>
        </div>

        {/* Share buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>Compartilhar via WhatsApp</span>
          </button>

          <button
            onClick={handleEmail}
            className="w-full flex items-center justify-center gap-3 bg-[#4A443F] hover:bg-[#38332F] text-white py-3 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Mail size={18} />
            <span>Enviar por E-mail</span>
          </button>
        </div>

        {/* Link Copy Box */}
        <div className="p-3 bg-white/80 rounded-2xl border border-[#8C7355]/20 mb-4">
          <span className="block text-[10px] uppercase tracking-wider font-semibold text-[#8C7355] mb-1">
            Link Amigável do Site
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-[#2A2623] font-mono truncate">{currentUrl}</span>
            <button
              onClick={handleCopy}
              className="shrink-0 flex items-center gap-1 bg-[#8C7355] text-white px-3 py-1.5 rounded-xl text-[10px] uppercase font-medium hover:bg-[#745F46] transition-colors cursor-pointer"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>
        </div>

        {/* Hashtag tip */}
        <div className="text-center text-[11px] text-[#8C7355] font-medium tracking-wide">
          Hashtag oficial: <span className="font-semibold">{wedding.hashtag}</span>
        </div>

      </div>
    </div>
  );
};
