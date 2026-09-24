import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { StoryArtMotif, StoryMilestone, StoryPhoto } from '../../types';
import { Plus, Edit3, Trash2, ArrowUp, ArrowDown, X, Image } from 'lucide-react';

const ART_OPTIONS: { value: StoryArtMotif; label: string }[] = [
  { value: 'encontro', label: 'Encontro (duas pessoas)' },
  { value: 'restaurante', label: 'Jantar a dois' },
  { value: 'estrada', label: 'Estrada / viagem' },
  { value: 'serra', label: 'Serra / montanhas' },
  { value: 'cavalo', label: 'Cavalo / sertão' },
  { value: 'praia', label: 'Praia / mar' },
  { value: 'rio', label: 'Rio' },
  { value: 'estadio', label: 'Estádio de futebol' },
  { value: 'cachoeira', label: 'Cachoeira' },
  { value: 'pedra', label: 'Pedras / pinturas rupestres' },
  { value: 'gestacao', label: 'Gestação' },
  { value: 'alianca', label: 'Alianças' },
  { value: 'capela', label: 'Capela' },
];

const emptySlot = (): StoryPhoto => ({
  id: `photo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
  url: '',
  caption: '',
});

export const AdminStory: React.FC = () => {
  const { milestones, addMilestone, updateMilestone, deleteMilestone } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMilestone, setEditingMilestone] = useState<StoryMilestone | null>(null);

  const [year, setYear] = useState('');
  const [dateLabel, setDateLabel] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [art, setArt] = useState<StoryArtMotif>('serra');
  const [photos, setPhotos] = useState<StoryPhoto[]>([]);

  const sortedMilestones = [...milestones].sort((a, b) => a.order - b.order);

  const openAddModal = () => {
    setEditingMilestone(null);
    setYear(new Date().getFullYear().toString());
    setDateLabel('');
    setTitle('');
    setLocation('');
    setDescription('');
    setArt('serra');
    setPhotos([emptySlot()]);
    setIsModalOpen(true);
  };

  const openEditModal = (m: StoryMilestone) => {
    setEditingMilestone(m);
    setYear(m.year);
    setDateLabel(m.dateLabel || '');
    setTitle(m.title);
    setLocation(m.location || '');
    setDescription(m.description);
    setArt(m.art || 'serra');
    setPhotos(
      m.photos && m.photos.length > 0
        ? m.photos.map((p) => ({ ...p, url: p.url || '', caption: p.caption || '' }))
        : [{ ...emptySlot(), url: m.photoUrl || '', caption: m.caption || '' }]
    );
    setIsModalOpen(true);
  };

  const updateSlot = (id: string, updates: Partial<StoryPhoto>) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanPhotos = photos
      .filter((p) => (p.url || '').trim() || (p.caption || '').trim())
      .map((p) => ({
        id: p.id,
        url: (p.url || '').trim() || undefined,
        caption: (p.caption || '').trim() || undefined,
        art: p.art,
      }));

    const payload = {
      year: year.trim(),
      dateLabel: dateLabel.trim() || undefined,
      title: title.trim(),
      location: location.trim() || undefined,
      description: description.trim(),
      art,
      photos: cleanPhotos,
      // First real photo also feeds anything still reading the legacy field
      photoUrl: cleanPhotos.find((p) => p.url)?.url,
      caption: cleanPhotos.find((p) => p.url)?.caption,
    };

    if (editingMilestone) {
      updateMilestone(editingMilestone.id, payload);
    } else {
      addMilestone(payload);
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

  const thumbOf = (m: StoryMilestone) =>
    m.photos?.find((p) => p.url)?.url || m.photoUrl || '';

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Nossa História & Linha do Tempo
          </h2>
          <p className="text-xs text-gray-500">
            Adicione e ordene os momentos mais marcantes do relacionamento do casal. Onde
            não houver foto, o site mostra uma aquarela do destino.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#657153] hover:bg-[#4E5941] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Adicionar Momento</span>
        </button>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {sortedMilestones.map((m, idx) => {
          const thumb = thumbOf(m);
          const slotCount = m.photos?.length || (m.photoUrl ? 1 : 0);
          const filledCount = m.photos?.filter((p) => p.url).length ?? (m.photoUrl ? 1 : 0);

          return (
            <div
              key={m.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={m.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-gray-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                    <Image size={24} />
                  </div>
                )}

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-[#657153]">
                      {m.year}
                    </span>
                    <span className="text-xs font-semibold text-gray-900">
                      — {m.title}
                    </span>
                  </div>
                  {(m.dateLabel || m.location) && (
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {[m.dateLabel, m.location].filter(Boolean).join(' • ')}
                    </p>
                  )}
                  <p className="text-xs text-gray-600 line-clamp-2 mt-1">
                    {m.description}
                  </p>
                  {slotCount > 0 && (
                    <p className="text-[11px] text-gray-400 mt-1">
                      {filledCount} de {slotCount} espaço(s) de foto preenchido(s)
                    </p>
                  )}
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
                  className="p-1.5 text-gray-500 hover:text-[#657153] rounded-lg"
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
          );
        })}
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
                    Selo do Ano *
                  </label>
                  <input
                    type="text"
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Ex: Mar 2020"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Data Completa (opcional)
                  </label>
                  <input
                    type="text"
                    value={dateLabel}
                    onChange={(e) => setDateLabel(e.target.value)}
                    placeholder="Ex: 6 de março de 2020"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Título do Momento *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Nosso Primeiro Encontro"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Lugar (opcional)
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ex: Guaramiranga, Ceará"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Aquarela do Destino
                </label>
                <select
                  value={art}
                  onChange={(e) => setArt(e.target.value as StoryArtMotif)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40 bg-white"
                >
                  {ART_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-gray-400 mt-1">
                  Usada como fundo enquanto o espaço não tiver fotografia.
                </p>
              </div>

              {/* Photo slots */}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700">
                    Espaços de Fotografia
                  </label>
                  <button
                    type="button"
                    onClick={() => setPhotos((prev) => [...prev, emptySlot()])}
                    className="flex items-center gap-1 text-[11px] font-semibold text-[#657153] hover:text-[#4E5941] cursor-pointer"
                  >
                    <Plus size={13} />
                    <span>Adicionar espaço</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {photos.map((slot, slotIdx) => (
                    <div key={slot.id} className="rounded-xl border border-gray-200 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-gray-500">
                          Foto {slotIdx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => setPhotos((prev) => prev.filter((p) => p.id !== slot.id))}
                          className="p-1 text-gray-400 hover:text-red-600 rounded-lg"
                          title="Remover espaço"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={slot.url || ''}
                        onChange={(e) => updateSlot(slot.id, { url: e.target.value })}
                        placeholder="URL da foto ou /arquivo-na-pasta-public.jpg"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs font-mono"
                      />
                      <input
                        type="text"
                        value={slot.caption || ''}
                        onChange={(e) => updateSlot(slot.id, { caption: e.target.value })}
                        placeholder="Legenda — ex: Jericoacoara, 2023"
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs"
                      />
                      <select
                        value={slot.art || ''}
                        onChange={(e) =>
                          updateSlot(slot.id, {
                            art: (e.target.value || undefined) as StoryArtMotif | undefined,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs bg-white"
                      >
                        <option value="">Aquarela: usar a do momento</option>
                        {ART_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  Espaços sem URL continuam aparecendo no site como aquarela — é assim que o
                  álbum fica pronto para receber as fotos reais depois.
                </p>
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
                  className="px-5 py-2 rounded-xl bg-[#657153] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#4E5941]"
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
