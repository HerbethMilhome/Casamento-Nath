import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { StoryMilestone } from '../../types';
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown, X, Image } from 'lucide-react';

export const AdminStory: React.FC = () => {
  const { milestones, addMilestone, updateMilestone, deleteMilestone } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<StoryMilestone | null>(null);

  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [caption, setCaption] = useState('');

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  const openAddModal = () => {
    setEditingMilestone(null);
    setYear(new Date().getFullYear().toString());
    setTitle('');
    setDescription('');
    setPhotoUrl('');
    setCaption('');
    setIsModalOpen(true);
  };

  const openEditModal = (m: StoryMilestone) => {
    setEditingMilestone(m);
    setYear(m.year);
    setTitle(m.title);
    setDescription(m.description);
    setPhotoUrl(m.photoUrl || '');
    setCaption(m.caption || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMilestone) {
      updateMilestone(editingMilestone.id, {
        year,
        title: title.trim(),
        description: description.trim(),
        photoUrl: photoUrl.trim() || undefined,
        caption: caption.trim() || undefined,
      });
    } else {
      addMilestone({
        year,
        title: title.trim(),
        description: description.trim(),
        photoUrl: photoUrl.trim() || undefined,
        caption: caption.trim() || undefined,
        order: sortedMilestones.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  const moveOrder = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index > 0) {
      const current = sortedMilestones[index];
      const prev = sortedMilestones[index - 1];
      updateMilestone(current.id, { order: prev.order });
      updateMilestone(prev.id, { order: current.order });
    } else if (direction === 'down' && index < sortedMilestones.length - 1) {
      const current = sortedMilestones[index];
      const next = sortedMilestones[index + 1];
      updateMilestone(current.id, { order: next.order });
      updateMilestone(next.id, { order: current.order });
    }
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Nossa História & Linha do Tempo
          </h2>
          <p className="text-xs text-gray-500">
            Adicione e ordene os momentos mais marcantes do relacionamento do casal.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8C7355] hover:bg-[#745F46] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Adicionar Momento</span>
        </button>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {sortedMilestones.map((m, idx) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              {m.photoUrl ? (
                <img
                  src={m.photoUrl}
                  alt={m.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                  <Image size={24} />
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif text-lg font-semibold text-[#8C7355]">
                    {m.year}
                  </span>
                  <span className="text-xs font-semibold text-gray-900">
                    — {m.title}
                  </span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                  {m.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
              <button
                onClick={() => moveOrder(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg"
                title="Mover para cima"
              >
                <ArrowUp size={15} />
              </button>
              <button
                onClick={() => moveOrder(idx, 'down')}
                disabled={idx === sortedMilestones.length - 1}
                className="p-1.5 text-gray-400 hover:text-gray-700 disabled:opacity-30 rounded-lg"
                title="Mover para baixo"
              >
                <ArrowDown size={15} />
              </button>
              <button
                onClick={() => openEditModal(m)}
                className="p-1.5 text-gray-500 hover:text-[#8C7355] rounded-lg"
                title="Editar"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Excluir o momento "${m.title}"?`)) {
                    deleteMilestone(m.id);
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

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="font-serif text-xl text-gray-900">
                {editingMilestone ? 'Editar Momento' : 'Novo Momento da História'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Ano *
                  </label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Ex: 2021"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Título do Momento *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: O Primeiro Encontro"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Descrição Afetiva *
                </label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Conte como aconteceu esse capítulo..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  URL da Foto (opcional)
                </label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Legenda da Foto (opcional)
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ex: Primeira viagem juntos a Paris"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#8C7355] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#745F46]"
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
