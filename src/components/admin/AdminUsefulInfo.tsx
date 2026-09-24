import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { UsefulInfoItem, UsefulInfoCategory } from '../../types';
import { Plus, Edit3, Trash2, X } from 'lucide-react';

export const AdminUsefulInfo: React.FC = () => {
  const { usefulInfo, addUsefulInfo, updateUsefulInfo, deleteUsefulInfo } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UsefulInfoItem | null>(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<UsefulInfoCategory>('hospedagem');
  const [address, setAddress] = useState('');
  const [distance, setDistance] = useState('');
  const [link, setLink] = useState('');
  const [linkText, setLinkText] = useState('');

  const categories: { id: UsefulInfoCategory; label: string }[] = [
    { id: 'hospedagem', label: 'Onde se hospedar' },
    { id: 'salao', label: 'Salão & Beleza' },
    { id: 'transporte', label: 'Transporte' },
    { id: 'estacionamento', label: 'Estacionamento' },
    { id: 'aeroporto', label: 'Aeroporto' },
    { id: 'outros', label: 'Outras Dicas' },
  ];

  const openAddModal = () => {
    setEditingItem(null);
    setTitle('');
    setSubtitle('');
    setDescription('');
    setCategory('hospedagem');
    setAddress('');
    setDistance('');
    setLink('');
    setLinkText('');
    setIsModalOpen(true);
  };

  const openEditModal = (item: UsefulInfoItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSubtitle(item.subtitle || '');
    setDescription(item.description);
    setCategory(item.category);
    setAddress(item.address || '');
    setDistance(item.distance || '');
    setLink(item.link || '');
    setLinkText(item.linkText || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateUsefulInfo(editingItem.id, {
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
        category,
        address: address.trim() || undefined,
        distance: distance.trim() || undefined,
        link: link.trim() || undefined,
        linkText: linkText.trim() || undefined,
      });
    } else {
      addUsefulInfo({
        title: title.trim(),
        subtitle: subtitle.trim() || undefined,
        description: description.trim(),
        category,
        address: address.trim() || undefined,
        distance: distance.trim() || undefined,
        link: link.trim() || undefined,
        linkText: linkText.trim() || undefined,
        order: usefulInfo.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Informações Úteis para os Convidados
          </h2>
          <p className="text-xs text-gray-500">
            Recomendações de hospedagem com desconto, salões de beleza parceiros, transporte e estacionamento.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#657153] hover:bg-[#4E5941] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Nova Informação / Dica</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {usefulInfo.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-semibold text-[#657153] bg-[#657153]/10 px-2 py-0.5 rounded">
                  {categories.find(c => c.id === item.category)?.label || item.category}
                </span>
                {item.distance && (
                  <span className="text-[11px] text-gray-500 font-medium">
                    {item.distance}
                  </span>
                )}
              </div>

              <h4 className="font-serif text-lg text-gray-900 mb-1">
                {item.title}
              </h4>
              {item.subtitle && (
                <span className="text-xs text-[#657153] block mb-2 font-medium">
                  {item.subtitle}
                </span>
              )}
              <p className="text-xs text-gray-600 line-clamp-3 mb-3">
                {item.description}
              </p>
              {item.address && (
                <p className="text-[11px] text-gray-400 truncate">
                  📍 {item.address}
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-end gap-1">
              <button
                onClick={() => openEditModal(item)}
                className="p-1.5 text-gray-500 hover:text-[#657153] rounded-lg"
                title="Editar"
              >
                <Edit3 size={15} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Excluir "${item.title}"?`)) {
                    deleteUsefulInfo(item.id);
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
                {editingItem ? 'Editar Informação' : 'Nova Informação / Dica'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Categoria *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Título Principal *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Hotel Gran Marquise"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Subtítulo / Cupom (opcional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Ex: 15% OFF com cupom NATHALIEEIGOR"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Distância aproximada
                  </label>
                  <input
                    type="text"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Ex: 12 min do local"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Endereço completo (opcional)
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Av. Beira Mar, 3980..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Descrição detalhada *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explique como o convidado utiliza a dica..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Link / Site (opcional)
                  </label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                    placeholder="Ex: Reservar com Desconto"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
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
