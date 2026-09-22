import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminGuests } from './AdminGuests';
import { AdminWeddingDetails } from './AdminWeddingDetails';
import { AdminStory } from './AdminStory';
import { AdminGodparents } from './AdminGodparents';
import { AdminGifts } from './AdminGifts';
import { AdminDressCode } from './AdminDressCode';
import { AdminLocation } from './AdminLocation';
import { AdminGallery } from './AdminGallery';
import { AdminUsefulInfo } from './AdminUsefulInfo';
import { AdminFaq } from './AdminFaq';
import { AdminGuestbook } from './AdminGuestbook';
import { AdminAppearance } from './AdminAppearance';
import { 
  LayoutDashboard, 
  Users, 
  Heart, 
  Clock, 
  UserCheck, 
  Gift, 
  Shirt, 
  MapPin, 
  Image, 
  Info, 
  HelpCircle, 
  MessageSquare, 
  Palette, 
  LogOut, 
  Eye, 
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { 
    adminSection, 
    setAdminSection, 
    logoutAdmin, 
    setActiveView, 
    wedding, 
    resetToInitialData 
  } = useWedding();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'convidados', label: 'Convidados & RSVP', icon: Users },
    { id: 'casamento', label: 'Dados dos Noivos', icon: Heart },
    { id: 'historia', label: 'Nossa História', icon: Clock },
    { id: 'padrinhos', label: 'Padrinhos & Madrinhas', icon: UserCheck },
    { id: 'presentes', label: 'Lista de Presentes', icon: Gift },
    { id: 'dresscode', label: 'Dress Code & Paleta', icon: Shirt },
    { id: 'localizacao', label: 'Localização & Mapa', icon: MapPin },
    { id: 'galeria', label: 'Galeria de Fotos', icon: Image },
    { id: 'informacoes', label: 'Informações Úteis', icon: Info },
    { id: 'faq', label: 'Perguntas Frequentes', icon: HelpCircle },
    { id: 'recados', label: 'Mural de Recados', icon: MessageSquare },
    { id: 'aparencia', label: 'Aparência & Temas', icon: Palette },
  ];

  const handleSelectSection = (id: any) => {
    setAdminSection(id);
    setMobileMenuOpen(false);
  };

  const handleReset = () => {
    if (confirm('Deseja restaurar todos os dados e fotos originais de demonstração?')) {
      resetToInitialData();
      alert('Dados restaurados com sucesso!');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F7] flex flex-col md:flex-row text-gray-800">
      
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="font-serif text-lg font-medium text-[#2A2623]">
          {wedding.coupleNames}
        </div>

        <button
          onClick={() => setActiveView('public')}
          className="p-2 text-[#8C7355] rounded-lg hover:bg-gray-100"
          title="Ver site"
        >
          <Eye size={20} />
        </button>
      </div>

      {/* Sidebar navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto md:z-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-gray-100">
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C7355] font-semibold block mb-1">
              Painel Administrativo
            </span>
            <h2 className="font-serif text-xl text-gray-900 leading-tight">
              {wedding.coupleNames}
            </h2>
            <span className="text-[11px] text-gray-400 font-mono">
              {wedding.weddingDate}
            </span>
          </div>

          {/* Nav items */}
          <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-230px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = adminSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#8C7355] text-white font-semibold shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-white' : 'text-gray-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <button
            onClick={() => setActiveView('public')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-medium transition-colors cursor-pointer"
          >
            <Eye size={14} />
            <span>Ver Site Público</span>
          </button>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 cursor-pointer"
              title="Restaurar dados de exemplo"
            >
              <RotateCcw size={12} />
              <span>Restaurar</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <LogOut size={12} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {adminSection === 'dashboard' && <AdminDashboard />}
        {adminSection === 'convidados' && <AdminGuests />}
        {adminSection === 'casamento' && <AdminWeddingDetails />}
        {adminSection === 'historia' && <AdminStory />}
        {adminSection === 'padrinhos' && <AdminGodparents />}
        {adminSection === 'presentes' && <AdminGifts />}
        {adminSection === 'dresscode' && <AdminDressCode />}
        {adminSection === 'localizacao' && <AdminLocation />}
        {adminSection === 'galeria' && <AdminGallery />}
        {adminSection === 'informacoes' && <AdminUsefulInfo />}
        {adminSection === 'faq' && <AdminFaq />}
        {adminSection === 'recados' && <AdminGuestbook />}
        {adminSection === 'aparencia' && <AdminAppearance />}
      </main>

    </div>
  );
};
