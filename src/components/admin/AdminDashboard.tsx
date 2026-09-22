import React from 'react';
import { useWedding } from '../../context/WeddingContext';
import { 
  Users, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Gift, 
  MessageSquare, 
  Utensils, 
  Sparkles,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { guests, gifts, messages, setAdminSection, wedding } = useWedding();

  // Metrics calculations
  const totalInvitations = guests.length;
  
  // Total potential people (guests + their plus ones)
  const totalPotentialPeople = guests.reduce((acc, g) => acc + 1 + g.allowedPlusOnes, 0);

  // Confirmed people (attendingCount)
  const confirmedGuests = guests.filter(g => g.rsvpStatus === 'confirmed');
  const confirmedPeopleCount = confirmedGuests.reduce((acc, g) => acc + g.attendingCount, 0);

  // Confirmed plus ones only
  const confirmedPlusOnesCount = confirmedGuests.reduce((acc, g) => acc + (g.attendingCount > 1 ? g.attendingCount - 1 : 0), 0);

  // Declined
  const declinedGuests = guests.filter(g => g.rsvpStatus === 'declined');

  // Pending / Awaiting
  const pendingGuests = guests.filter(g => g.rsvpStatus === 'sent' || g.rsvpStatus === 'not_sent');
  const pendingPeopleCount = pendingGuests.reduce((acc, g) => acc + 1 + g.allowedPlusOnes, 0);

  // Dietary restrictions breakdown
  const dietaryRestrictions = guests.filter(g => g.dietaryRestriction && g.dietaryRestriction !== 'nao');

  // Gifts metrics
  const giftedItems = gifts.filter(g => g.status === 'gifted');
  const totalGiftedValue = giftedItems.reduce((acc, g) => acc + g.price, 0);

  // Messages metrics
  const pendingApprovalMessages = messages.filter(m => !m.isApproved);

  const stats = [
    {
      title: 'Total de Convidados (Estimativa)',
      value: totalPotentialPeople,
      subtitle: `${totalInvitations} convites emitidos`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Confirmados no Evento',
      value: confirmedPeopleCount,
      subtitle: `${confirmedPlusOnesCount} acompanhantes inclusos`,
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Não Comparecerão',
      value: declinedGuests.length,
      subtitle: 'Respostas de ausência',
      icon: XCircle,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
    },
    {
      title: 'Aguardando Resposta',
      value: pendingPeopleCount,
      subtitle: `${pendingGuests.length} convites pendentes`,
      icon: Clock,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8C7355] font-semibold">
            Visão Geral do Evento
          </span>
          <h1 className="font-serif text-3xl text-gray-900 mt-1">
            Painel de Casamento — {wedding.coupleNames}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Data marcada: {wedding.weddingDate} em {wedding.city} ({wedding.ceremonyVenue})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAdminSection('convidados')}
            className="bg-[#8C7355] hover:bg-[#745F46] text-white text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>Gerenciar Convidados</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} />
                </div>
              </div>

              <div>
                <span className="text-3xl font-serif font-semibold text-gray-900 leading-none">
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 block mt-2">
                  {stat.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Cards: Progress bar & Secondary indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RSVP Progress Bar & Confirmation Ratio */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-gray-900">
              Taxa de Resposta do RSVP
            </h3>
            <span className="text-xs text-[#8C7355] font-semibold">
              {totalPotentialPeople > 0 ? Math.round((confirmedPeopleCount / totalPotentialPeople) * 100) : 0}% Confirmado
            </span>
          </div>

          {/* Multi-segment Progress Bar */}
          <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex mb-4">
            <div
              style={{ width: `${totalPotentialPeople > 0 ? (confirmedPeopleCount / totalPotentialPeople) * 100 : 0}%` }}
              className="bg-emerald-500 h-full transition-all duration-500"
              title="Confirmados"
            />
            <div
              style={{ width: `${totalPotentialPeople > 0 ? (declinedGuests.length / totalPotentialPeople) * 100 : 0}%` }}
              className="bg-rose-400 h-full transition-all duration-500"
              title="Não comparecerão"
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs pt-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800">
              <span className="block font-bold text-sm">{confirmedPeopleCount}</span>
              <span className="text-[10px] uppercase tracking-wider">Confirmados</span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800">
              <span className="block font-bold text-sm">{declinedGuests.length}</span>
              <span className="text-[10px] uppercase tracking-wider">Declinados</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800">
              <span className="block font-bold text-sm">{pendingPeopleCount}</span>
              <span className="text-[10px] uppercase tracking-wider">Pendentes</span>
            </div>
          </div>
        </div>

        {/* Gifts & Financial Summary */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-lg text-gray-900">
                Lista de Presentes
              </h3>
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Gift size={16} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-600 pb-2 border-b border-gray-100">
                <span>Presentes Escolhidos:</span>
                <span className="font-semibold text-gray-900">{giftedItems.length} de {gifts.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-600 pb-2 border-b border-gray-100">
                <span>Arrecadação Estimada:</span>
                <span className="font-semibold text-[#8C7355] text-sm">
                  R$ {totalGiftedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setAdminSection('presentes')}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 transition-colors font-medium text-center cursor-pointer"
          >
            Ver Detalhes dos Presentes
          </button>
        </div>

      </div>

      {/* Dietary Restrictions & Messages Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Dietary Restrictions List */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Utensils size={18} className="text-[#8C7355]" />
              <h3 className="font-serif text-lg text-gray-900">
                Restrições Alimentares Sinalizadas
              </h3>
            </div>
            <span className="text-xs bg-[#8C7355]/10 text-[#8C7355] px-2.5 py-0.5 rounded-full font-medium">
              {dietaryRestrictions.length} informadas
            </span>
          </div>

          {dietaryRestrictions.length === 0 ? (
            <p className="text-xs text-gray-500 py-4">Nenhum convidado sinalizou restrições alimentares até o momento.</p>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {dietaryRestrictions.map((g) => (
                <div key={g.id} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-gray-900 block">{g.name}</span>
                    <span className="text-gray-500 text-[11px]">
                      {g.dietaryRestriction === 'vegetariana' && 'Vegetariana'}
                      {g.dietaryRestriction === 'vegana' && 'Vegana'}
                      {g.dietaryRestriction === 'sem_lactose' && 'Sem Lactose'}
                      {g.dietaryRestriction === 'sem_gluten' && 'Sem Glúten'}
                      {g.dietaryRestriction === 'alergia_alimentar' && `Alergia: ${g.dietaryRestrictionDetail || 'Geral'}`}
                      {g.dietaryRestriction === 'outra' && `Outra: ${g.dietaryRestrictionDetail || 'Observar'}`}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">{g.group}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Guestbook Messages */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-[#8C7355]" />
              <h3 className="font-serif text-lg text-gray-900">
                Recados dos Convidados
              </h3>
            </div>
            <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full font-medium">
              {messages.length} recebidos
            </span>
          </div>

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {messages.slice(0, 3).map((m) => (
              <div key={m.id} className="p-3 bg-gray-50 rounded-xl text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-gray-900">{m.name}</span>
                  <span className="text-[10px] text-gray-400">{m.date}</span>
                </div>
                <p className="text-gray-600 line-clamp-2 italic">"{m.message}"</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setAdminSection('recados')}
            className="w-full mt-4 py-2 px-3 rounded-xl border border-gray-200 text-xs text-gray-700 hover:bg-gray-50 transition-colors font-medium text-center cursor-pointer"
          >
            Gerenciar Todos os Recados
          </button>
        </div>

      </div>
    </div>
  );
};
