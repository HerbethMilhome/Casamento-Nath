import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Save, Check, Sparkles } from 'lucide-react';

export const AdminWeddingDetails: React.FC = () => {
  const { wedding, updateWeddingDetails } = useWedding();
  const [formData, setFormData] = useState({ ...wedding });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeddingDetails(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Dados Gerais do Casamento
          </h2>
          <p className="text-xs text-gray-500">
            Atualize as informações essenciais exibidas no cabeçalho, rodapé e convite.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Check size={14} />
            <span>Informações salvas com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        
        {/* Names & Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Nomes dos Noivos em Destaque *
            </label>
            <input
              type="text"
              name="coupleNames"
              value={formData.coupleNames}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Link Amigável do Site (Slug)
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 px-3 py-2.5 rounded-l-xl border border-r-0 border-gray-200 text-xs text-gray-500 font-mono">
                casamento.app/
              </span>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-r-xl border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#657153]/40"
              />
            </div>
          </div>
        </div>

        {/* Date, Time, City, State */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Data do Casamento *
            </label>
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Horário da Cerimônia
            </label>
            <input
              type="text"
              name="ceremonyTime"
              value={formData.ceremonyTime}
              onChange={handleChange}
              placeholder="Ex: 16:30"
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Cidade
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Estado (UF)
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>
        </div>

        {/* Monogram & Hashtag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Monograma Oficial (Iniciais)
            </label>
            <input
              type="text"
              name="monogram"
              value={formData.monogram}
              onChange={handleChange}
              placeholder="Ex: N & I"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Hashtag do Casamento
            </label>
            <input
              type="text"
              name="hashtag"
              value={formData.hashtag}
              onChange={handleChange}
              placeholder="#NathalieEIgor2026"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>
        </div>

        {/* Hero Photo URL & Cover Phrase */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              URL da Foto Principal (Capa / Hero)
            </label>
            <input
              type="url"
              name="heroPhotoUrl"
              value={formData.heroPhotoUrl}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
              Frase de Abertura / Subtítulo
            </label>
            <textarea
              rows={2}
              name="coverPhrase"
              value={formData.coverPhrase}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#657153]/40"
            />
          </div>
        </div>

        {/* Financial PIX Setup for Gifts */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-serif text-base text-gray-900 mb-3">
            Dados para Recebimento de Presentes (PIX)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Tipo de Chave
              </label>
              <select
                name="pixType"
                value={formData.pixType}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
              >
                <option value="CPF">CPF</option>
                <option value="Email">E-mail</option>
                <option value="Telefone">Telefone</option>
                <option value="Chave Aleatória">Chave Aleatória</option>
              </select>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Chave PIX
              </label>
              <input
                type="text"
                name="pixKey"
                value={formData.pixKey}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Nome do Titular
              </label>
              <input
                type="text"
                name="pixReceiverName"
                value={formData.pixReceiverName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Privacy & Password Protection */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-serif text-base text-gray-900 mb-2">
            Privacidade & Proteção do Site
          </h4>

          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              id="isPasswordProtected"
              name="isPasswordProtected"
              checked={formData.isPasswordProtected}
              onChange={handleChange}
              className="w-4 h-4 rounded text-[#657153] focus:ring-[#657153]"
            />
            <label htmlFor="isPasswordProtected" className="text-xs text-gray-700 font-medium">
              Proteger o site com senha para os convidados (Acesso Restrito)
            </label>
          </div>

          {formData.isPasswordProtected && (
            <div className="max-w-xs">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Senha para os Convidados
              </label>
              <input
                type="text"
                name="guestAccessPassword"
                value={formData.guestAccessPassword}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-mono"
              />
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#657153] hover:bg-[#4E5941] text-white py-2.5 px-6 rounded-xl text-xs uppercase font-semibold tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Salvar Alterações</span>
          </button>
        </div>

      </form>
    </div>
  );
};
