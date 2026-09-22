import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Save, Check, Plus, Trash2 } from 'lucide-react';

export const AdminDressCode: React.FC = () => {
  const { wedding, updateWeddingDetails } = useWedding();
  const [dressCodeTitle, setDressCodeTitle] = useState(wedding.dressCodeTitle);
  const [dressCodeDescription, setDressCodeDescription] = useState(wedding.dressCodeDescription);
  const [dressCodeWomen, setDressCodeWomen] = useState(wedding.dressCodeWomen);
  const [dressCodeMen, setDressCodeMen] = useState(wedding.dressCodeMen);
  const [dressCodeAvoid, setDressCodeAvoid] = useState(wedding.dressCodeAvoid || '');
  const [colors, setColors] = useState(wedding.dressCodeColors || []);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#8C7355');
  const [saved, setSaved] = useState(false);

  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setColors([...colors, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
    setNewColorHex('#8C7355');
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeddingDetails({
      dressCodeTitle,
      dressCodeDescription,
      dressCodeWomen,
      dressCodeMen,
      dressCodeAvoid,
      dressCodeColors: colors,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Dress Code & Paleta de Cores
          </h2>
          <p className="text-xs text-gray-500">
            Defina o estilo do traje, recomendações para homens e mulheres e a cartela de cores.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Check size={14} />
            <span>Dress Code salvo com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
            Nome do Estilo / Traje *
          </label>
          <input
            type="text"
            required
            value={dressCodeTitle}
            onChange={(e) => setDressCodeTitle(e.target.value)}
            placeholder="Ex: Esporte Fino / Praia Elegante"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
            Descrição Geral do Traje
          </label>
          <textarea
            rows={2}
            value={dressCodeDescription}
            onChange={(e) => setDressCodeDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Orientações para Mulheres
            </label>
            <textarea
              rows={3}
              value={dressCodeWomen}
              onChange={(e) => setDressCodeWomen(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Orientações para Homens
            </label>
            <textarea
              rows={3}
              value={dressCodeMen}
              onChange={(e) => setDressCodeMen(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
            Cores a Evitar / Reservadas
          </label>
          <input
            type="text"
            value={dressCodeAvoid}
            onChange={(e) => setDressCodeAvoid(e.target.value)}
            placeholder="Ex: Branco, tons de bege claríssimo e verde oliva reservado às madrinhas"
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
          />
        </div>

        {/* Color Swatches Editor */}
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-3">
            Paleta de Cores Sugeridas aos Convidados
          </label>

          <div className="flex items-center gap-3 flex-wrap mb-4">
            {colors.map((c, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div
                  className="w-6 h-6 rounded-full border border-gray-200"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-xs text-gray-800 font-medium">{c.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveColor(idx)}
                  className="text-gray-400 hover:text-red-500 p-0.5"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          {/* Add color row */}
          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="color"
              value={newColorHex}
              onChange={(e) => setNewColorHex(e.target.value)}
              className="w-9 h-9 rounded-xl border border-gray-200 cursor-pointer p-0.5"
            />
            <input
              type="text"
              value={newColorName}
              onChange={(e) => setNewColorName(e.target.value)}
              placeholder="Nome da cor (ex: Areia)"
              className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
            <button
              type="button"
              onClick={handleAddColor}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-xs font-semibold text-gray-700"
            >
              Adicionar
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#8C7355] hover:bg-[#745F46] text-white py-2.5 px-6 rounded-xl text-xs uppercase font-semibold tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Salvar Dress Code</span>
          </button>
        </div>

      </form>
    </div>
  );
};
