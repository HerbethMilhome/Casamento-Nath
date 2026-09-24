import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { ThemePreset, ThemeConfig } from '../../types';
import { Check, Eye } from 'lucide-react';

export const AdminAppearance: React.FC = () => {
  const { theme, setThemeConfig, applyThemePreset, setActiveView } = useWedding();
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>({ ...theme });
  const [savedNotice, setSavedNotice] = useState(false);

  const presets: { id: ThemePreset; name: string; description: string; colors: string[] }[] = [
    {
      id: 'frosted_glass',
      name: 'Frosted Glass (Tema Atual)',
      description: 'Elegância etérea com vidro fosco translúcido, reflexos suaves e paleta nobre de bronze dourado e areia.',
      colors: ['#657153', '#A98C5B', '#E9DDCC', '#F9F6EF'],
    },
    {
      id: 'classico',
      name: 'Clássico Sofisticado',
      description: 'Estética atemporal de alta celebração, com tons de dourado nobre, champanhe e linho claro.',
      colors: ['#A98C5B', '#C5A059', '#F3EDE1', '#F9F6EF'],
    },
    {
      id: 'minimalista',
      name: 'Minimalista Contemporâneo',
      description: 'Linhas puras, alto contraste, preto ébano refinado, cinzas quentes e tipografia editorial de vanguarda.',
      colors: ['#2C3225', '#55594A', '#E9DDCC', '#FFFFFF'],
    },
    {
      id: 'romantico',
      name: 'Romântico & Floral',
      description: 'Aura apaixonada e delicada, com nuances de rosé acetinado, blush e toques dourados.',
      colors: ['#A06870', '#D89E9E', '#F7ECEB', '#FFF9F9'],
    },
    {
      id: 'jardim',
      name: 'Jardim Botânico',
      description: 'Inspirado na natureza, folhagens de eucalipto, verde oliva toscano e madeira clara.',
      colors: ['#4E5941', '#8A9468', '#F3EDE1', '#F9F6EF'],
    },
    {
      id: 'terracota',
      name: 'Terracota & Pôr do Sol',
      description: 'Calor e aconchego em tons de terracota queimada, argila, areia e sol poente.',
      colors: ['#A65B43', '#D9826C', '#F3E5E0', '#F9F6EF'],
    },
  ];

  const handleSelectPreset = (presetId: ThemePreset) => {
    applyThemePreset(presetId);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleCustomChange = (key: keyof ThemeConfig, val: any) => {
    const updated = { ...currentConfig, [key]: val };
    setCurrentConfig(updated);
    setThemeConfig(updated);
  };

  return (
    <div className="space-y-8">
      
      {/* Top Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Aparência & Personalização Visual
          </h2>
          <p className="text-xs text-gray-500">
            Personalize as cores, fontes, estilo dos botões e temas do site sem escrever uma linha de código.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              <Check size={14} /> Tema Aplicado!
            </span>
          )}
          <button
            onClick={() => setActiveView('public')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            <Eye size={14} />
            <span>Visualizar no Site</span>
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('presets')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            activeTab === 'presets'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Temas Prontos (6 Estilos)
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
            activeTab === 'custom'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          Ajuste Fino de Cores & Fontes
        </button>
      </div>

      {/* 1. Presets View */}
      {activeTab === 'presets' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {presets.map((p) => {
            const isSelected = theme.presetId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => handleSelectPreset(p.id)}
                className={`bg-white rounded-3xl p-6 border transition-all cursor-pointer relative shadow-sm hover:shadow-md ${
                  isSelected
                    ? 'border-[#657153] ring-2 ring-[#657153]/30'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 bg-[#657153] text-white p-1 rounded-full">
                    <Check size={14} />
                  </span>
                )}

                {/* Color Swatch Bar */}
                <div className="flex items-center gap-2 mb-4">
                  {p.colors.map((c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>

                <h4 className="font-serif text-lg text-gray-900 mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {p.description}
                </p>

                <div className="pt-3 border-t border-gray-100">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${
                    isSelected ? 'text-[#657153]' : 'text-gray-400'
                  }`}>
                    {isSelected ? 'Tema em uso no site' : 'Clique para aplicar'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Custom Fine Tuning */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 max-w-2xl">
          
          <div>
            <h4 className="font-serif text-base text-gray-900 mb-3">
              Paleta Cromática Personalizada
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Cor Primária (Destaques & Acentos)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.primaryColor}
                    onChange={(e) => handleCustomChange('primaryColor', e.target.value)}
                    className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={currentConfig.primaryColor}
                    onChange={(e) => handleCustomChange('primaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Cor Secundária (Textos & Títulos)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.secondaryColor}
                    onChange={(e) => handleCustomChange('secondaryColor', e.target.value)}
                    className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={currentConfig.secondaryColor}
                    onChange={(e) => handleCustomChange('secondaryColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Cor de Fundo da Página
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.backgroundColor}
                    onChange={(e) => handleCustomChange('backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={currentConfig.backgroundColor}
                    onChange={(e) => handleCustomChange('backgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Cor de Acento / Detalhes
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentConfig.accentColor}
                    onChange={(e) => handleCustomChange('accentColor', e.target.value)}
                    className="w-10 h-10 rounded-xl border border-gray-200 cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={currentConfig.accentColor}
                    onChange={(e) => handleCustomChange('accentColor', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-serif text-base text-gray-900 mb-3">
              Tipografia & Fontes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Fonte dos Títulos (Display)
                </label>
                <select
                  value={currentConfig.headingFont}
                  onChange={(e) => handleCustomChange('headingFont', e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                >
                  <option value="cormorant">Cormorant Garamond (Clássica / Editorial)</option>
                  <option value="playfair">Playfair Display (Sofisticada)</option>
                  <option value="montserrat">Montserrat (Contemporânea)</option>
                  <option value="sans">Plus Jakarta Sans (Moderna / Clean)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Fonte dos Textos (Corpo)
                </label>
                <select
                  value={currentConfig.bodyFont}
                  onChange={(e) => handleCustomChange('bodyFont', e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                >
                  <option value="sans">Plus Jakarta Sans (Legível & Contemporânea)</option>
                  <option value="montserrat">Montserrat (Equilibrada)</option>
                  <option value="serif">Serif Clássica</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <h4 className="font-serif text-base text-gray-900 mb-3">
              Cantos dos Botões & Cartões
            </h4>
            <div className="grid grid-cols-4 gap-3">
              {[
                { id: 'pill', label: 'Pill (Redondo)' },
                { id: 'rounded-xl', label: 'Suave (16px)' },
                { id: 'rounded-md', label: 'Médio (8px)' },
                { id: 'square', label: 'Reto (0px)' },
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleCustomChange('buttonRadius', r.id)}
                  className={`p-3 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    currentConfig.buttonRadius === r.id
                      ? 'bg-[#657153] text-white border-[#657153]'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
