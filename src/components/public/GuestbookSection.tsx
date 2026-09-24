import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { MessageSquareHeart, Send, Heart, Sparkles, Loader2, AlertCircle } from 'lucide-react';

export const GuestbookSection: React.FC = () => {
  const { messages, addGuestbookMessage } = useWedding();
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const approvedMessages = messages.filter((m) => m.isApproved);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !text.trim() || enviando) return;

    setEnviando(true);
    setErro('');

    try {
      await addGuestbookMessage(author.trim(), text.trim());
      setAuthor('');
      setText('');
      setSentSuccess(true);
      setTimeout(() => setSentSuccess(false), 8000);
    } catch {
      setErro(
        'Não conseguimos enviar seu recado agora. Verifique sua conexão e tente novamente.',
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="recados" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Carinho em Palavras
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Livro de Recados
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Deixe seus votos, histórias e energias positivas para os noivos. Cada mensagem será guardada no nosso coração para sempre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Write a Message Form */}
          <div className="lg:col-span-5 glass rounded-3xl p-6 sm:p-8 shadow-sm border border-white/60">
            <div className="flex items-center gap-2 text-[#657153] text-xs uppercase tracking-widest font-semibold mb-3">
              <MessageSquareHeart size={16} />
              <span>Escrever Mensagem</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#55594A] mb-1">
                  Seu Nome ou Família
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Ex: Tio Paulo e Cecília"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#657153]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#55594A] mb-1">
                  Sua Mensagem
                </label>
                <textarea
                  rows={4}
                  required
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Escreva seus votos para os noivos..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#657153]/30 bg-white/80 text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-[#657153]/15 border border-[#657153]/30 text-xs text-[#2C3225] flex items-start gap-2 leading-relaxed">
                  <Sparkles size={14} className="text-[#657153] shrink-0 mt-0.5" />
                  <span>
                    Recado enviado com amor! Ele aparecerá no mural assim que os
                    noivos derem uma olhadinha. Muito obrigado!
                  </span>
                </div>
              )}

              {erro && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2 leading-relaxed">
                  <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
                  <span>{erro}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={enviando}
                className="w-full bg-[#657153] hover:bg-[#4E5941] disabled:bg-[#657153]/60 disabled:cursor-wait text-white text-xs tracking-wider uppercase font-semibold py-3.5 rounded-full transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {enviando ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Publicar Recado</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right / Message Wall Cards */}
          <div className="lg:col-span-7 space-y-4 max-h-[560px] overflow-y-auto pr-1">
            {approvedMessages.length === 0 ? (
              <div className="glass rounded-3xl p-8 text-center text-[#55594A]">
                <Heart size={24} className="text-[#657153] mx-auto mb-2 opacity-50" />
                <p className="text-sm">Seja o primeiro a deixar um lindo recado para os noivos!</p>
              </div>
            ) : (
              approvedMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="glass rounded-2xl p-5 border border-white/60 hover:bg-white/60 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-base sm:text-lg text-[#2C3225] font-medium">
                      {msg.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#657153] opacity-70">
                      {msg.date}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#55594A] leading-relaxed font-light italic">
                    "{msg.message}"
                  </p>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
