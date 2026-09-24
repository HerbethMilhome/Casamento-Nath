import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const { faqs } = useWedding();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const sortedFaqs = [...faqs].sort((a, b) => a.order - b.order);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-2">
            Tire Suas Dúvidas
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2C3225] font-normal mb-4">
            Perguntas Frequentes
          </h2>
          <div className="w-16 h-[1.5px] bg-[#657153]/40 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#55594A] leading-relaxed font-light">
            Reunimos as respostas para as perguntas mais comuns para que você venha sem nenhuma dúvida ao nosso casamento.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {sortedFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.id}
                className="glass rounded-2xl border border-white/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/40 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#2C3225] font-normal">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#657153]/10 flex items-center justify-center text-[#657153] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#657153] text-white' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-[#55594A] leading-relaxed font-light border-t border-[#657153]/10 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
