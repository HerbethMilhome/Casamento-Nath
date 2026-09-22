import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Guest, GuestGroup, RsvpStatus, DietaryRestriction } from '../../types';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Send,
  X,
  Phone,
  Mail,
  UserCheck
} from 'lucide-react';

export const AdminGuests: React.FC = () => {
  const { guests, addGuest, updateGuest, deleteGuest } = useWedding();

  const [searchTerm, setSearchTerm] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [group, setGroup] = useState<GuestGroup>('Amigos');
  const [allowedPlusOnes, setAllowedPlusOnes] = useState(0);
  const [rsvpStatus, setRsvpStatus] = useState<RsvpStatus>('not_sent');
  const [attendingCount, setAttendingCount] = useState(0);
  const [dietaryRestriction, setDietaryRestriction] = useState<DietaryRestriction>('nao');
  const [dietaryRestrictionDetail, setDietaryRestrictionDetail] = useState('');
  const [notes, setNotes] = useState('');

  const groups: GuestGroup[] = ['Família da Noiva', 'Família do Noivo', 'Padrinhos', 'Madrinhas', 'Amigos', 'Trabalho', 'Outros'];

  // Filtered list
  const filteredGuests = guests.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.includes(searchTerm) ||
      (g.email && g.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchGroup = groupFilter === 'all' || g.group === groupFilter;
    const matchStatus = statusFilter === 'all' || g.rsvpStatus === statusFilter;

    return matchSearch && matchGroup && matchStatus;
  });

  const openAddModal = () => {
    setEditingGuest(null);
    setName('');
    setEmail('');
    setPhone('');
    setGroup('Amigos');
    setAllowedPlusOnes(0);
    setRsvpStatus('not_sent');
    setAttendingCount(0);
    setDietaryRestriction('nao');
    setDietaryRestrictionDetail('');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (guest: Guest) => {
    setEditingGuest(guest);
    setName(guest.name);
    setEmail(guest.email || '');
    setPhone(guest.phone);
    setGroup(guest.group);
    setAllowedPlusOnes(guest.allowedPlusOnes);
    setRsvpStatus(guest.rsvpStatus);
    setAttendingCount(guest.attendingCount);
    setDietaryRestriction(guest.dietaryRestriction || 'nao');
    setDietaryRestrictionDetail(guest.dietaryRestrictionDetail || '');
    setNotes(guest.notes || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingGuest) {
      updateGuest(editingGuest.id, {
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim(),
        group,
        allowedPlusOnes: Number(allowedPlusOnes),
        rsvpStatus,
        attendingCount: Number(attendingCount),
        dietaryRestriction,
        dietaryRestrictionDetail: dietaryRestrictionDetail.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    } else {
      addGuest({
        name: name.trim(),
        email: email.trim() || undefined,
        phone: phone.trim(),
        group,
        allowedPlusOnes: Number(allowedPlusOnes),
        rsvpStatus,
        attendingCount: Number(attendingCount),
        plusOneNames: [],
        dietaryRestriction,
        dietaryRestrictionDetail: dietaryRestrictionDetail.trim() || undefined,
        notes: notes.trim() || undefined,
      });
    }

    setIsModalOpen(false);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Nome', 'Grupo', 'Telefone', 'Email', 'Status RSVP', 'Total Confirmados', 'Acompanhantes Nomes', 'Restrição Alimentar', 'Detalhe Restrição', 'Observações'];
    
    const rows = guests.map(g => [
      `"${g.name}"`,
      `"${g.group}"`,
      `"${g.phone}"`,
      `"${g.email || ''}"`,
      `"${g.rsvpStatus}"`,
      g.attendingCount,
      `"${(g.plusOneNames || []).join(', ')}"`,
      `"${g.dietaryRestriction || 'nao'}"`,
      `"${g.dietaryRestrictionDetail || ''}"`,
      `"${g.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `convidados_casamento_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="font-serif text-2xl text-gray-900">
            Convidados & Confirmação (RSVP)
          </h2>
          <p className="text-xs text-gray-500">
            Cadastre convidados, acompanhe confirmações em tempo real e exporte planilhas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-medium hover:bg-gray-50 shadow-sm transition-colors cursor-pointer"
            title="Exportar dados para Excel/CSV"
          >
            <Download size={15} />
            <span>Exportar CSV</span>
          </button>

          <button
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8C7355] hover:bg-[#745F46] text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Plus size={16} />
            <span>Novo Convidado</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, telefone ou e-mail..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#8C7355]/40"
          />
        </div>

        {/* Group Filter */}
        <select
          value={groupFilter}
          onChange={(e) => setGroupFilter(e.target.value)}
          className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 focus:outline-none"
        >
          <option value="all">Todos os Grupos</option>
          {groups.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full md:w-auto px-3 py-2 rounded-xl border border-gray-200 text-xs text-gray-700 focus:outline-none"
        >
          <option value="all">Todos os Status</option>
          <option value="confirmed">Confirmado</option>
          <option value="declined">Não Comparecerá</option>
          <option value="sent">Convite Enviado</option>
          <option value="not_sent">Não Enviado</option>
        </select>
      </div>

      {/* Guests Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 uppercase text-[10px] tracking-wider text-gray-500 border-b border-gray-100">
              <tr>
                <th className="py-3 px-4 font-semibold">Convidado</th>
                <th className="py-3 px-4 font-semibold">Grupo</th>
                <th className="py-3 px-4 font-semibold">Contato</th>
                <th className="py-3 px-4 font-semibold text-center">Acomp. Permitidos</th>
                <th className="py-3 px-4 font-semibold">Status RSVP</th>
                <th className="py-3 px-4 font-semibold">Restrição Alim.</th>
                <th className="py-3 px-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    Nenhum convidado encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => {
                  return (
                    <tr key={guest.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Name & Note */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-gray-900">{guest.name}</div>
                        {guest.plusOneNames && guest.plusOneNames.length > 0 && (
                          <div className="text-[10px] text-emerald-700 mt-0.5">
                            + {guest.plusOneNames.join(', ')}
                          </div>
                        )}
                        {guest.notes && (
                          <div className="text-[10px] text-gray-400 italic mt-0.5 truncate max-w-xs">
                            {guest.notes}
                          </div>
                        )}
                      </td>

                      {/* Group */}
                      <td className="py-3.5 px-4">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] text-gray-700">
                          {guest.group}
                        </span>
                      </td>

                      {/* Contact */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Phone size={12} className="text-gray-400" />
                          <span>{guest.phone}</span>
                        </div>
                        {guest.email && (
                          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] mt-0.5">
                            <Mail size={12} className="text-gray-400" />
                            <span>{guest.email}</span>
                          </div>
                        )}
                      </td>

                      {/* Allowed Plus Ones */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        +{guest.allowedPlusOnes}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {guest.rsvpStatus === 'confirmed' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                            <CheckCircle size={12} /> Confirmado ({guest.attendingCount})
                          </span>
                        )}
                        {guest.rsvpStatus === 'declined' && (
                          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                            <XCircle size={12} /> Declinado
                          </span>
                        )}
                        {guest.rsvpStatus === 'sent' && (
                          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[11px] font-medium">
                            <Send size={12} /> Enviado
                          </span>
                        )}
                        {guest.rsvpStatus === 'not_sent' && (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-[11px]">
                            <Clock size={12} /> Não Enviado
                          </span>
                        )}
                      </td>

                      {/* Dietary Restriction */}
                      <td className="py-3.5 px-4">
                        {guest.dietaryRestriction && guest.dietaryRestriction !== 'nao' ? (
                          <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded text-[10px] font-medium">
                            {guest.dietaryRestriction}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[11px]">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(guest)}
                          className="p-1.5 text-gray-500 hover:text-[#8C7355] hover:bg-gray-100 rounded-lg transition-colors mr-1 cursor-pointer"
                          title="Editar"
                        >
                          <Edit3 size={15} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Excluir convidado "${guest.name}"?`)) {
                              deleteGuest(guest.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Excluir"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <h3 className="font-serif text-xl text-gray-900">
                {editingGuest ? 'Editar Convidado' : 'Novo Convidado'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
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
                  placeholder="Nome do convidado"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Telefone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(85) 99999-9999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    E-mail (opcional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Grupo de Convivência
                  </label>
                  <select
                    value={group}
                    onChange={(e) => setGroup(e.target.value as GuestGroup)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  >
                    {groups.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Acompanhantes Permitidos
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={allowedPlusOnes}
                    onChange={(e) => setAllowedPlusOnes(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Status do RSVP
                  </label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value as RsvpStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  >
                    <option value="not_sent">Não Enviado</option>
                    <option value="sent">Convite Enviado</option>
                    <option value="confirmed">Confirmado</option>
                    <option value="declined">Declinado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                    Total Confirmado (Pessoas)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={attendingCount}
                    onChange={(e) => setAttendingCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Restrição Alimentar
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select
                    value={dietaryRestriction}
                    onChange={(e) => setDietaryRestriction(e.target.value as DietaryRestriction)}
                    className="px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  >
                    <option value="nao">Nenhuma</option>
                    <option value="vegetariana">Vegetariana</option>
                    <option value="vegana">Vegana</option>
                    <option value="sem_lactose">Sem Lactose</option>
                    <option value="sem_gluten">Sem Glúten</option>
                    <option value="alergia_alimentar">Alergia Alimentar</option>
                    <option value="outra">Outra</option>
                  </select>
                  <input
                    type="text"
                    value={dietaryRestrictionDetail}
                    onChange={(e) => setDietaryRestrictionDetail(e.target.value)}
                    placeholder="Especificação do alimento..."
                    className="px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-700 mb-1">
                  Observações Internas (Mesa, Acomodação...)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anotações dos noivos..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-[#8C7355]/40"
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
                  Salvar Convidado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
