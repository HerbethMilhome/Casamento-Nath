import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Godparent } from '../../types';
import { Plus, Edit3, Trash2, X, Sparkles } from 'lucide-react';

export const AdminGodparents: React.FC = () => {
  const { godparents, addGodparent, updateGodparent, deleteGodparent } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGodparent, setEditingGodparent] = useState<Godparent | null>(null);

  const [name, setName] = useState('');
  const [role, setRole] = useState('Padrinho');
  const [side, setSide] = useState<'noiva' | 'noivo' | 'ambos'>('noiva');
  const [bio, setBio] = useState('');
  const [curiosity, setCuriosity] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const openAddModal = () => {
    setEditingGodparent(null);
    setName('');
    setRole('Padrinho');
    setSide('noiva');
    setBio('');
    setCuriosity('');
    setPhotoUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (gp: Godparent) => {
    setEditingGodparent(gp);
    setName(gp.name);
    setRole(gp.role);
    setSide(gp.side);
    setBio(gp.bio);
    setCuriosity(gp.curiosity || '');
    setPhotoUrl(gp.photoUrl);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGodparent) {
      updateGodparent(editingGodparent.id, {
        name: name.trim(),
        role: role.trim(),
        side,
        bio: bio.trim(),
        curiosity: curiosity.trim() || undefined,
        photoUrl: photoUrl.trim(),
      });
    } else {
      addGodparent({
        name: name.trim(),
        role: role.trim(),
        side,
        bio: bio.trim(),
        curiosity: curiosity.trim() || undefined,
        photoUrl: photoUrl.trim(),
        order: godparents.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Padrinhos e Madrinhas
          </h2>
          <p className="text-xs text-gray-500">
            Gerencie os cartões dos padrinhos, depoimentos e curiosidades afetivas.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#8C7355] hover:bg-[#745F46] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Adicionar Padrinho/Madrinha</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {godparents.map((gp) => (
          <div
            key={gp.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={gp.photoUrl}
                  alt={gp.name}
                  className="w-14 h-14 rounded-full object-cover border border-gray-100"
                />
                <div>
                  <h4 className="font-serif text-lg text-gray-900 leading-tight">
                    {gp.name}
                  </h4>
                  <span className="text-[10px] uppercase font-semibold text-[#8C7355]">
                    {gp.role} • {gp.side === 'noiva' ? 'Noiva' : gp.side === 'noivo' ? 'Noivo' : 'Ambos'}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 line-clamp-3 italic mb-2">
                "{gp.bio}"
              </p>

              {gp.curiosity && (
                <p className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded-lg">
                  💡 {gp.curiosity}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => openEditModal(gp)}
                className="p-1.5 text-gray-500 hover:text-[#8C7355] rounded-lg"
                title="Editar"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Excluir ${gp.name}?`)) {
                    deleteGodparent(gp.id);
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="font-serif text-xl text-gray-900">
                {editingGodparent ? 'Editar Padrinho / Madrinha' : 'Novo Padrinho / Madrinha'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome do padrinho ou madrinha"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Papel
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex: Padrinho, Madrinha, Dama de Honra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Lado do Casal
                  </label>
                  <select
                    value={side}
                    onChange={(e) => setSide(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  >
                    <option value="noiva">Lado da Noiva</option>
                    <option value="noivo">Lado do Noivo</option>
                    <option value="ambos">Amigos de Ambos</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  URL da Foto *
                </label>
                <input
                  type="url"
                  required
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Depoimento / Mensagem Afetiva dos Noivos *
                </label>
                <textarea
                  rows={3}
                  required
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Conte o significado dessa pessoa na vida de vocês..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Curiosidade Divertida (opcional)
                </label>
                <input
                  type="text"
                  value={curiosity}
                  onChange={(e) => setCuriosity(e.target.value)}
                  placeholder="Ex: O primeiro a saber do namoro"
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
