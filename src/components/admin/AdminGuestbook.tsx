import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { MessageSquare, Check, X, Trash2, Heart } from 'lucide-react';

export const AdminGuestbook: React.FC = () => {
  const { messages, toggleMessageApproval, deleteMessage } = useWedding();

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Moderação do Livro de Recados
          </h2>
          <p className="text-xs text-gray-500">
            Aprove mensagens enviadas pelos convidados para serem exibidas publicamente no mural do site.
          </p>
        </div>

        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl font-medium">
          Total de {messages.length} recados ({messages.filter(m => m.isApproved).length} aprovados)
        </span>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400">
            Nenhum recado recebido até o momento.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-serif text-base font-semibold text-gray-900">
                    {msg.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400">
                    {msg.date}
                  </span>
                  {msg.isApproved ? (
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Público no Site
                    </span>
                  ) : (
                    <span className="bg-amber-50 text-amber-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                      Pendente de Aprovação
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic">
                  "{msg.message}"
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => toggleMessageApproval(msg.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-colors cursor-pointer ${
                    msg.isApproved
                      ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <Check size={14} />
                  <span>{msg.isApproved ? 'Ocultar' : 'Aprovar'}</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm(`Excluir o recado de ${msg.name}?`)) {
                      deleteMessage(msg.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
