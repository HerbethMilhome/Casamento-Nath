import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { FaqItem } from '../../types';
import { Plus, Edit3, Trash2, X } from 'lucide-react';

export const AdminFaq: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const openAddModal = () => {
    setEditingFaq(null);
    setQuestion('');
    setAnswer('');
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FaqItem) => {
    setEditingFaq(faq);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingFaq) {
      updateFaq(editingFaq.id, {
        question: question.trim(),
        answer: answer.trim(),
      });
    } else {
      addFaq({
        question: question.trim(),
        answer: answer.trim(),
        order: faqs.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-xs text-gray-500">
            Esclareça dúvidas comuns sobre estacionamento, crianças, acompanhantes e horários.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#657153] hover:bg-[#4E5941] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Nova Pergunta</span>
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start justify-between gap-4"
          >
            <div>
              <h4 className="font-serif text-base text-gray-900 font-semibold mb-1">
                {faq.question}
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => openEditModal(faq)}
                className="p-1.5 text-gray-500 hover:text-[#657153] rounded-lg"
                title="Editar"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Excluir pergunta "${faq.question}"?`)) {
                    deleteFaq(faq.id);
                  }
                }}
                className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                title="Excluir"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg text-gray-900">
                {editingFaq ? 'Editar Pergunta' : 'Nova Pergunta Frequente'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Pergunta *
                </label>
                <input
                  type="text"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: Que horas devo chegar?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Resposta *
                </label>
                <textarea
                  rows={4}
                  required
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Explique com carinho e clareza para os convidados..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#657153] text-white text-xs font-semibold uppercase tracking-wider"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
