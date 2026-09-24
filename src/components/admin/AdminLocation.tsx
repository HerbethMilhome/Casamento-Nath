import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Save, Check, MapPin } from 'lucide-react';

export const AdminLocation: React.FC = () => {
  const { wedding, updateWeddingDetails } = useWedding();
  const [sameLocation, setSameLocation] = useState(wedding.sameLocation);
  const [ceremonyVenue, setCeremonyVenue] = useState(wedding.ceremonyVenue);
  const [ceremonyAddress, setCeremonyAddress] = useState(wedding.ceremonyAddress);
  const [ceremonyTime, setCeremonyTime] = useState(wedding.ceremonyTime);
  const [ceremonyImage, setCeremonyImage] = useState(wedding.ceremonyImage || '/capela-sao-jose.jpg');
  const [ceremonyGoogleMapsUrl, setCeremonyGoogleMapsUrl] = useState(wedding.ceremonyGoogleMapsUrl || '');
  const [receptionVenue, setReceptionVenue] = useState(wedding.receptionVenue);
  const [receptionAddress, setReceptionAddress] = useState(wedding.receptionAddress);
  const [receptionTime, setReceptionTime] = useState(wedding.receptionTime);
  const [receptionGoogleMapsUrl, setReceptionGoogleMapsUrl] = useState(wedding.receptionGoogleMapsUrl || '');
  const [googleMapsUrl, setGoogleMapsUrl] = useState(wedding.googleMapsUrl || '');
  const [wazeUrl, setWazeUrl] = useState(wedding.wazeUrl || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateWeddingDetails({
      sameLocation,
      ceremonyVenue,
      ceremonyAddress,
      ceremonyTime,
      ceremonyImage,
      ceremonyGoogleMapsUrl,
      receptionVenue,
      receptionAddress,
      receptionTime,
      receptionGoogleMapsUrl,
      googleMapsUrl: ceremonyGoogleMapsUrl || googleMapsUrl,
      wazeUrl,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Localização, Cerimônia & Recepção
          </h2>
          <p className="text-xs text-gray-500">
            Configure endereços, horários e links do Google Maps e Waze para os convidados chegarem com facilidade.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            <Check size={14} />
            <span>Localização salva com sucesso!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        
        {/* Same location toggle */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <input
            type="checkbox"
            id="sameLocation"
            checked={sameLocation}
            onChange={(e) => setSameLocation(e.target.checked)}
            className="w-4 h-4 rounded text-[#657153] focus:ring-[#657153]"
          />
          <label htmlFor="sameLocation" className="text-xs text-gray-800 font-medium cursor-pointer">
            A cerimônia e a festa de recepção serão realizadas no <strong>mesmo local</strong>.
          </label>
        </div>

        {/* Ceremony details */}
        <div>
          <h4 className="font-serif text-base text-gray-900 mb-3 flex items-center gap-2">
            <MapPin size={16} className="text-[#657153]" />
            <span>{sameLocation ? 'Local da Cerimônia & Recepção' : 'Local da Cerimônia Religiosa'}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Nome do Espaço / Igreja *
              </label>
              <input
                type="text"
                required
                value={ceremonyVenue}
                onChange={(e) => setCeremonyVenue(e.target.value)}
                placeholder="Ex: Espaço Jangada Beach Club"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Horário da Cerimônia *
              </label>
              <input
                type="text"
                required
                value={ceremonyTime}
                onChange={(e) => setCeremonyTime(e.target.value)}
                placeholder="16:30"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div className="sm:col-span-3">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Endereço Completo com Bairro e Cidade *
              </label>
              <input
                type="text"
                required
                value={ceremonyAddress}
                onChange={(e) => setCeremonyAddress(e.target.value)}
                placeholder="Serrinha / Zona Rural, Guaramiranga - CE"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Foto da Capela / Local da Cerimônia (URL ou caminho)
              </label>
              <input
                type="text"
                value={ceremonyImage}
                onChange={(e) => setCeremonyImage(e.target.value)}
                placeholder="/capela-sao-jose.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
              />
            </div>

            <div className="sm:col-span-1">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Pré-visualização
              </label>
              <div className="w-full h-10 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                {ceremonyImage ? (
                  <img src={ceremonyImage} alt="Prévia" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] text-gray-400">Sem imagem</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reception details (if separate) */}
        {!sameLocation && (
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between gap-2 mb-3">
              <h4 className="font-serif text-base text-gray-900 flex items-center gap-2">
                <MapPin size={16} className="text-[#657153]" />
                <span>Local da Recepção & Festa</span>
              </h4>
              <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                Distância: ~100m da Capela
              </span>
            </div>

            {/* Note about Mulungu vs Guaramiranga */}
            <div className="p-3 mb-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              <strong>Nota sobre Guaramiranga x Mulungu:</strong> Alguns mapas e aplicativos de GPS indicam Mulungu pela proximidade com a divisa, mas o endereço e território oficial do Solar Brasil Almeida pertencem a <strong>Guaramiranga - CE</strong>.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Nome do Salão de Festas *
                </label>
                <input
                  type="text"
                  required
                  value={receptionVenue}
                  onChange={(e) => setReceptionVenue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Horário da Recepção *
                </label>
                <input
                  type="text"
                  required
                  value={receptionTime}
                  onChange={(e) => setReceptionTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Endereço da Recepção *
                </label>
                <input
                  type="text"
                  required
                  value={receptionAddress}
                  onChange={(e) => setReceptionAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Map Links */}
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-serif text-base text-gray-900 mb-3">
            Links Diretos para GPS / Rota (Google Maps & Waze)
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Google Maps — Cerimônia (Capela São José)
              </label>
              <input
                type="url"
                value={ceremonyGoogleMapsUrl}
                onChange={(e) => setCeremonyGoogleMapsUrl(e.target.value)}
                placeholder="https://maps.app.goo.gl/dYZ67yqbERTkgi6q9"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Google Maps — Festa (Solar Brasil Almeida)
              </label>
              <input
                type="url"
                value={receptionGoogleMapsUrl}
                onChange={(e) => setReceptionGoogleMapsUrl(e.target.value)}
                placeholder="https://maps.app.goo.gl/aVc6XUEi3BiLPXxH7"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                Link do Waze (Solar Brasil Almeida / Capela São José)
              </label>
              <input
                type="url"
                value={wazeUrl}
                onChange={(e) => setWazeUrl(e.target.value)}
                placeholder="https://waze.com/ul?q=Solar+Brasil+Almeida+Guaramiranga"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#657153] hover:bg-[#4E5941] text-white py-2.5 px-6 rounded-xl text-xs uppercase font-semibold tracking-wider shadow-sm transition-all cursor-pointer"
          >
            <Save size={15} />
            <span>Salvar Localização</span>
          </button>
        </div>

      </form>
    </div>
  );
};
