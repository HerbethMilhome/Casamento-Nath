import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Gift, GiftCategory, GiftType } from '../../types';
import { Plus, Edit3, Trash2, X, Check, ExternalLink, Heart } from 'lucide-react';

export const AdminGifts: React.FC = () => {
  const { gifts, addGift, updateGift, deleteGift } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(150);
  const [category, setCategory] = useState<GiftCategory>('Casa');
  const [type, setType] = useState<GiftType>('symbolic');
  const [imageUrl, setImageUrl] = useState('');
  const [externalUrl, setExternalUrl] = useState('');
  const [status, setStatus] = useState<'available' | 'gifted'>('available');
  const [giftedBy, setGiftedBy] = useState('');

  const categories: GiftCategory[] = ['Casa', 'Lua de mel', 'Experiências', 'Cozinha', 'Viagem', 'Outros'];

  const openAddModal = () => {
    setEditingGift(null);
    setTitle('');
    setDescription('');
    setPrice(200);
    setCategory('Casa');
    setType('symbolic');
    setImageUrl('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80');
    setExternalUrl('');
    setStatus('available');
    setGiftedBy('');
    setIsModalOpen(true);
  };

  const openEditModal = (g: Gift) => {
    setEditingGift(g);
    setTitle(g.title);
    setDescription(g.description || '');
    setPrice(g.price);
    setCategory(g.category);
    setType(g.type);
    setImageUrl(g.imageUrl);
    setExternalUrl(g.externalUrl || '');
    setStatus(g.status);
    setGiftedBy(g.giftedBy || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGift) {
      updateGift(editingGift.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        category,
        type,
        imageUrl: imageUrl.trim(),
        externalUrl: externalUrl.trim() || undefined,
        status,
        giftedBy: giftedBy.trim() || undefined,
      });
    } else {
      addGift({
        title: title.trim(),
        description: description.trim() || undefined,
        price: Number(price),
        category,
        type,
        imageUrl: imageUrl.trim(),
        externalUrl: externalUrl.trim() || undefined,
        status,
        giftedBy: giftedBy.trim() || undefined,
        order: gifts.length + 1,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Lista de Presentes & Cotas
          </h2>
          <p className="text-xs text-gray-500">
            Cadastre cotas de lua de mel, itens para o lar ou links para lojas externas parceiras.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#657153] hover:bg-[#4E5941] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Adicionar Presente</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {gifts.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="relative h-36 rounded-xl overflow-hidden mb-3">
                <img
                  src={g.imageUrl}
                  alt={g.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px]">
                  {g.category}
                </span>
                {g.status === 'gifted' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="bg-[#657153] text-white text-[10px] font-semibold uppercase px-2.5 py-1 rounded-full">
                      Já Presenteado
                    </span>
                  </div>
                )}
              </div>

              <h4 className="font-serif text-base text-gray-900 mb-1">
                {g.title}
              </h4>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                {g.description}
              </p>
              <div className="font-serif text-base font-semibold text-[#657153]">
                R$ {g.price.toFixed(2)}
              </div>
              {g.giftedBy && (
                <p className="text-[11px] text-gray-400 mt-1">
                  Presenteado por: <strong>{g.giftedBy}</strong>
                </p>
              )}
            </div>

            <div className="pt-3 border-t border-gray-100 mt-3 flex items-center justify-between">
              <button
                onClick={() => {
                  const nextStatus = g.status === 'available' ? 'gifted' : 'available';
                  updateGift(g.id, { status: nextStatus });
                }}
                className={`text-[10px] font-medium uppercase px-2 py-1 rounded ${
                  g.status === 'gifted'
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                {g.status === 'gifted' ? 'Liberar Item' : 'Marcar Presenteado'}
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEditModal(g)}
                  className="p-1.5 text-gray-500 hover:text-[#657153] rounded-lg"
                  title="Editar"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Excluir ${g.title}?`)) {
                      deleteGift(g.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                  title="Excluir"
                >
                  <Trash2 size={15} />
                </button>
              </div>
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
                {editingGift ? 'Editar Presente' : 'Novo Presente na Lista'}
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
                  Título do Presente ou Cota *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Jantar Romântico na Lua de Mel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Valor Sugerido (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as GiftCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Tipo do Presente
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as GiftType)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  >
                    <option value="symbolic">Cota Simbólica (PIX)</option>
                    <option value="external">Loja Externa (Link)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  >
                    <option value="available">Disponível</option>
                    <option value="gifted">Presenteado</option>
                  </select>
                </div>
              </div>

              {type === 'external' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Link da Loja Externa (URL)
                  </label>
                  <input
                    type="url"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    placeholder="https://loja.com.br/produto"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Descrição do Presente
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Por que esse presente é especial para os noivos..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              {status === 'gifted' && (
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Presenteado por:
                  </label>
                  <input
                    type="text"
                    value={giftedBy}
                    onChange={(e) => setGiftedBy(e.target.value)}
                    placeholder="Nome de quem presenteou"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              )}

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
