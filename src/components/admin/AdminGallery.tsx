import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { GalleryPhoto } from '../../types';
import { Plus, Trash2, X, Image as ImageIcon } from 'lucide-react';

export const AdminGallery: React.FC = () => {
  const { photos, addPhoto, deletePhoto } = useWedding();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');

  const openAddModal = () => {
    setUrl('');
    setCaption('');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    addPhoto({
      url: url.trim(),
      caption: caption.trim() || undefined,
      order: photos.length + 1,
    });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Galeria de Fotos
          </h2>
          <p className="text-xs text-gray-500">
            Gerencie as fotos do ensaio pré-wedding e momentos do casal exibidos no site.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#657153] hover:bg-[#4E5941] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={16} />
          <span>Adicionar Foto</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between group"
          >
            <div className="relative h-48 rounded-xl overflow-hidden mb-3">
              <img
                src={photo.url}
                alt={photo.caption || 'Foto da galeria'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={() => {
                  if (confirm('Excluir foto da galeria?')) {
                    deletePhoto(photo.id);
                  }
                }}
                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                title="Excluir Foto"
              >
                <Trash2 size={14} />
              </button>
            </div>

            <p className="text-xs text-gray-600 italic px-1 truncate">
              {photo.caption || 'Sem legenda'}
            </p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
              <h3 className="font-serif text-lg text-gray-900">Adicionar Nova Foto</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-gray-400">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  URL da Imagem *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Legenda ou Local
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Ex: Ensaio no pôr do sol em Jericoacoara"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
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
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
