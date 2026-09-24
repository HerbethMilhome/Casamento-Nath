import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { DietaryRestriction } from '../../types';
import { CheckCircle, Calendar, Plus, Trash2, Heart, Send, Loader2, AlertCircle } from 'lucide-react';
import { MonogramCrest } from '../common/MonogramCrest';

export const RsvpSection: React.FC = () => {
  const { submitRsvp, wedding } = useWedding();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [hasPlusOnes, setHasPlusOnes] = useState(false);
  const [plusOneNames, setPlusOneNames] = useState<string[]>([]);
  const [dietaryRestriction, setDietaryRestriction] = useState<DietaryRestriction>('nao');
  const [dietaryDetail, setDietaryDetail] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [responseFeedback, setResponseFeedback] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState('');

  const handleAddPlusOne = () => {
    setPlusOneNames([...plusOneNames, '']);
  };

  const handleUpdatePlusOne = (index: number, val: string) => {
    const updated = [...plusOneNames];
    updated[index] = val;
    setPlusOneNames(updated);
  };

  const handleRemovePlusOne = (index: number) => {
    setPlusOneNames(plusOneNames.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setErro('');

    try {
      const result = await submitRsvp({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        attending: attending === 'yes',
        plusOneNames: attending === 'yes' ? plusOneNames.filter(n => n.trim().length > 0) : [],
        dietaryRestriction,
        dietaryRestrictionDetail: dietaryDetail.trim() || undefined,
        message: message.trim() || undefined,
      });

      // Só mostramos a tela de agradecimento se a planilha confirmou a gravação.
      if (!result.success) {
        setErro(result.message);
        return;
      }

      setResponseFeedback(result.message);
      setSubmitted(true);
    } catch {
      setErro(
        'Não conseguimos registrar sua confirmação agora. Verifique sua conexão e tente novamente em instantes.',
      );
    } finally {
      setEnviando(false);
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAttending('yes');
    setHasPlusOnes(false);
    setPlusOneNames([]);
    setDietaryRestriction('nao');
    setDietaryDetail('');
    setMessage('');
    setSubmitted(false);
    setErro('');
  };

  return (
    <section id="rsvp" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <MonogramCrest size="sm" variant="seal" className="mb-4" />
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Confirmação de Presença
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Celebre Conosco
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#3F463A] leading-relaxed font-light">
            Sua confirmação é essencial para organizarmos todos os detalhes com muito carinho. Por favor, confirme até o dia{' '}
            <strong className="text-[#657153] font-medium">01 de novembro de 2026</strong>.
          </p>
        </div>

        {/* Form Container */}
        <div className="glass rounded-[2.5rem] p-6 sm:p-12 shadow-xl border border-[#E9DDCC] bg-[#F9F6EF]/90">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Attendance Choice Buttons */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#2C3225] mb-3 text-center">
                  Você comparecerá ao casamento? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  <button
                    type="button"
                    onClick={() => setAttending('yes')}
                    className={`py-3.5 px-6 rounded-2xl border text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      attending === 'yes'
                        ? 'bg-[#657153] text-white border-[#657153] shadow-md'
                        : 'bg-white/60 text-[#2C3225] border-[#E9DDCC] hover:border-[#657153]'
                    }`}
                  >
                    <CheckCircle size={18} />
                    <span>Sim, estarei lá com certeza!</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('no')}
                    className={`py-3.5 px-6 rounded-2xl border text-xs sm:text-sm font-medium tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      attending === 'no'
                        ? 'bg-[#3F463A] text-white border-[#3F463A] shadow-md'
                        : 'bg-white/60 text-[#2C3225] border-[#E9DDCC] hover:border-[#657153]'
                    }`}
                  >
                    <span>Infelizmente não poderei ir</span>
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#2C3225] mb-1.5">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#2C3225] mb-1.5">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-medium text-[#2C3225] mb-1.5">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(85) 99999-9999"
                    className="w-full px-4 py-3 rounded-2xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>
              </div>

              {/* If Attending: Plus Ones / Family & Dietary Options */}
              {attending === 'yes' && (
                <div className="space-y-6 pt-4 border-t border-[#E9DDCC]/60">
                  {/* Plus Ones / Family Toggle */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs uppercase tracking-wider font-medium text-[#2C3225]">
                        Possui acompanhante ou familiares no seu convite?
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          const next = !hasPlusOnes;
                          setHasPlusOnes(next);
                          if (next && plusOneNames.length === 0) setPlusOneNames(['']);
                        }}
                        className="text-xs text-[#657153] underline font-medium cursor-pointer"
                      >
                        {hasPlusOnes ? 'Remover acompanhantes' : '+ Adicionar acompanhante'}
                      </button>
                    </div>

                    {hasPlusOnes && (
                      <div className="space-y-3 p-4 rounded-2xl bg-white/60 border border-[#E9DDCC]">
                        {plusOneNames.map((pName, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={pName}
                              onChange={(e) => handleUpdatePlusOne(index, e.target.value)}
                              placeholder={`Nome do acompanhante ${index + 1}`}
                              className="flex-1 px-4 py-2.5 rounded-xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemovePlusOne(index)}
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Remover"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={handleAddPlusOne}
                          className="flex items-center gap-1.5 text-xs text-[#657153] font-medium tracking-wider uppercase pt-1 cursor-pointer"
                        >
                          <Plus size={14} />
                          <span>Adicionar mais uma pessoa</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Dietary Restrictions */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-medium text-[#2C3225] mb-2">
                      Possui alguma restrição alimentar ou alergia?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'nao', label: 'Não' },
                        { id: 'vegetariana', label: 'Vegetariana' },
                        { id: 'vegana', label: 'Vegana' },
                        { id: 'sem_lactose', label: 'Sem lactose' },
                        { id: 'sem_gluten', label: 'Sem glúten' },
                        { id: 'alergia_alimentar', label: 'Alergia alimentar' },
                        { id: 'outra', label: 'Outra' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDietaryRestriction(opt.id as DietaryRestriction)}
                          className={`py-2 px-3 rounded-xl border text-xs transition-all cursor-pointer ${
                            dietaryRestriction === opt.id
                              ? 'bg-[#657153] text-white border-[#657153]'
                              : 'bg-white/60 text-[#2C3225] border-[#E9DDCC] hover:border-[#657153]'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {(dietaryRestriction === 'alergia_alimentar' || dietaryRestriction === 'outra') && (
                      <input
                        type="text"
                        value={dietaryDetail}
                        onChange={(e) => setDietaryDetail(e.target.value)}
                        placeholder="Por favor, especifique qual alimento ou restrição..."
                        className="mt-3 w-full px-4 py-2.5 rounded-xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Message to Couple */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-medium text-[#2C3225] mb-1.5">
                  Quer deixar uma mensagem para os noivos?
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva seus votos, carinho ou recado aos noivos..."
                  className="w-full px-4 py-3 rounded-2xl border border-[#E9DDCC] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              {/* Erro de gravação na planilha */}
              {erro && (
                <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 leading-relaxed">
                  <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-500" />
                  <span>{erro}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={enviando}
                  className="inline-flex items-center justify-center gap-2 bg-[#657153] hover:bg-[#4E5941] disabled:bg-[#657153]/60 disabled:cursor-wait text-white text-xs tracking-[0.2em] uppercase font-semibold px-10 py-4 rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer w-full sm:w-auto"
                >
                  {enviando ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Enviar Confirmação</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          ) : (
            /* Success confirmation display */
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#657153]/15 text-[#657153] flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="fill-[#657153]" />
              </div>
              <h3 className="font-serif text-3xl text-[#2C3225] mb-3">
                {responseFeedback}
              </h3>
              <p className="text-sm text-[#3F463A] max-w-md mx-auto leading-relaxed mb-8">
                Registramos sua resposta com sucesso. Caso precise alterar alguma informação posteriormente, entre em contato conosco.
              </p>
              <button
                onClick={resetForm}
                className="glass hover:bg-white text-[#2C3225] text-xs tracking-wider uppercase px-6 py-2.5 rounded-full border border-[#E9DDCC] cursor-pointer"
              >
                Enviar outra confirmação
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
