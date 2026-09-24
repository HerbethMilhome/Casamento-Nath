import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Gift, GiftCategory } from '../../types';
import { Gift as GiftIcon, ExternalLink, QrCode, Check, Copy, Heart, X, Sparkles } from 'lucide-react';

export const GiftsSection: React.FC = () => {
  const { gifts, wedding, giftItem } = useWedding();
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedType, setSelectedType] = useState<'all' | 'symbolic' | 'external'>('all');
  const [activeGift, setActiveGift] = useState<Gift | null>(null);
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [copiedPix, setCopiedPix] = useState(false);
  const [giftCompleted, setGiftCompleted] = useState(false);

  const categories: (string | GiftCategory)[] = ['Todas', 'Lua de mel', 'Experiências', 'Casa', 'Cozinha', 'Viagem', 'Outros'];

  const filteredGifts = gifts.filter((g) => {
    const matchCat = selectedCategory === 'Todas' || g.category === selectedCategory;
    const matchType = selectedType === 'all' || g.type === selectedType;
    return matchCat && matchType;
  }).sort((a, b) => a.order - b.order);

  const handleOpenGiftModal = (gift: Gift) => {
    if (gift.type === 'external' && gift.externalUrl) {
      window.open(gift.externalUrl, '_blank');
      return;
    }
    setActiveGift(gift);
    setDonorName('');
    setDonorMessage('');
    setCopiedPix(false);
    setGiftCompleted(false);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(wedding.pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  const handleConfirmGift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGift) return;
    giftItem(activeGift.id, donorName.trim() || 'Convidado Especial');
    setGiftCompleted(true);
  };

  return (
    <section id="presentes" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Mimo & Carinho
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Lista de Presentes
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Sua presença é nosso maior presente! Se desejar nos abençoar com uma lembrança para nosso lar ou lua de mel, criamos cotas e opções especiais abaixo.
          </p>

          {/* Category Pills */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#657153] text-white font-medium shadow-sm'
                    : 'glass text-[#55594A] hover:text-[#657153]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => {
            const isGifted = gift.status === 'gifted';

            return (
              <div
                key={gift.id}
                className={`glass rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 border border-white/60 hover:shadow-md ${
                  isGifted ? 'opacity-85' : 'hover:translate-y-[-2px]'
                }`}
              >
                <div>
                  {/* Image */}
                  <div className="relative h-44 rounded-2xl overflow-hidden mb-4">
                    <img
                      src={gift.imageUrl}
                      alt={gift.title}
                      className="w-full h-full object-cover object-center"
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-2.5 left-2.5 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider text-white font-medium">
                      {gift.category}
                    </div>

                    {/* Status badge */}
                    {isGifted && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center p-3 text-center">
                        <span className="bg-[#657153] text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1 rounded-full shadow">
                          Já Presenteado ❤️
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg text-[#2C3225] leading-snug mb-1">
                    {gift.title}
                  </h3>

                  {gift.description && (
                    <p className="text-xs text-[#55594A] leading-relaxed line-clamp-2 mb-3 opacity-90">
                      {gift.description}
                    </p>
                  )}
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="pt-3 border-t border-[#657153]/15 mt-2 flex items-center justify-between">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-[#657153] font-semibold">
                      Valor
                    </span>
                    <span className="font-serif text-base sm:text-lg text-[#2C3225] font-semibold">
                      R$ {gift.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  {isGifted ? (
                    <span className="text-[10px] text-[#657153] font-medium italic">
                      {gift.giftedBy ? `por ${gift.giftedBy}` : 'Presenteado'}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenGiftModal(gift)}
                      className="flex items-center gap-1.5 bg-[#657153] hover:bg-[#4E5941] text-white text-[11px] tracking-wider uppercase font-medium px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      {gift.type === 'external' ? (
                        <>
                          <span>Loja</span>
                          <ExternalLink size={12} />
                        </>
                      ) : (
                        <>
                          <Heart size={12} />
                          <span>Presentear</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Gifting / PIX Modal */}
      {activeGift && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass rounded-3xl p-6 sm:p-8 max-w-lg w-full bg-[#F9F6EF] shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 border border-white/70 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveGift(null)}
              className="absolute top-5 right-5 text-[#55594A] hover:text-[#2C3225] p-1 rounded-full hover:bg-black/5"
            >
              <X size={20} />
            </button>

            {!giftCompleted ? (
              <div>
                <div className="flex items-center gap-2 text-[#657153] text-xs uppercase tracking-widest font-semibold mb-2">
                  <Sparkles size={14} />
                  <span>Presentear com Carinho</span>
                </div>

                <h3 className="font-serif text-2xl text-[#2C3225] mb-1">
                  {activeGift.title}
                </h3>
                <p className="text-xs text-[#55594A] mb-6">
                  Valor sugerido da cota: <strong className="text-base text-[#657153]">R$ {activeGift.price.toFixed(2)}</strong>
                </p>

                {/* PIX Details Box */}
                <div className="p-4 rounded-2xl bg-white/70 border border-[#657153]/20 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#657153] flex items-center gap-1">
                      <QrCode size={14} /> Chave PIX dos Noivos ({wedding.pixType})
                    </span>
                    <span className="text-[10px] text-[#55594A]">{wedding.pixReceiverName}</span>
                  </div>

                  <div className="flex items-center justify-between gap-2 p-2.5 bg-black/5 rounded-xl text-xs font-mono text-[#2C3225] break-all">
                    <span>{wedding.pixKey}</span>
                    <button
                      onClick={handleCopyPix}
                      className="shrink-0 flex items-center gap-1 bg-[#657153] text-white px-3 py-1 rounded-lg text-[10px] font-sans uppercase font-medium hover:bg-[#4E5941] transition-colors"
                    >
                      {copiedPix ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedPix ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#55594A] mt-3 leading-relaxed">
                    Você pode transferir qualquer quantia através do app do seu banco utilizando a chave PIX acima.
                  </p>
                </div>

                {/* Confirmation Form */}
                <form onSubmit={handleConfirmGift} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#55594A] mb-1">
                      Seu Nome (para agradecimento dos noivos)
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Ex: Família Silveira, Amigos da Faculdade..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#657153]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#55594A] mb-1">
                      Mensagem de carinho (opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Deixe um recado especial para acompanhar o presente..."
                      className="w-full px-4 py-2.5 rounded-xl border border-[#657153]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#657153] hover:bg-[#4E5941] text-white text-xs tracking-wider uppercase font-semibold py-3.5 rounded-full transition-all shadow-md mt-2 cursor-pointer"
                  >
                    Confirmar Presente
                  </button>
                </form>
              </div>
            ) : (
              /* Success confirmation state */
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#657153]/15 text-[#657153] flex items-center justify-center mx-auto mb-4">
                  <Heart size={32} className="fill-[#657153]" />
                </div>
                <h3 className="font-serif text-2xl text-[#2C3225] mb-2">
                  Muito obrigado pelo carinho!
                </h3>
                <p className="text-xs sm:text-sm text-[#55594A] leading-relaxed mb-6">
                  Recebemos a sua intenção com o coração aquecido. Esse mimo tornará nossa nova jornada ainda mais inesquecível!
                </p>
                <button
                  onClick={() => setActiveGift(null)}
                  className="bg-[#657153] text-white text-xs tracking-wider uppercase px-6 py-2.5 rounded-full"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
