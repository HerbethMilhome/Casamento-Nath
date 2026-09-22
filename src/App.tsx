/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import { PublicWeddingPage } from './components/public/PublicWeddingPage';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { Settings, Eye } from 'lucide-react';

const MainApp: React.FC = () => {
  const { activeView, isAdminLoggedIn, setActiveView } = useWedding();

  return (
    <div className="relative min-h-screen">
      {/* Floating View Switcher Button (fixed on bottom-right for instant evaluation) */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setActiveView(activeView === 'public' ? 'admin' : 'public')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2A2623] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider shadow-2xl transition-all hover:scale-105 border border-white/20 cursor-pointer"
          title={activeView === 'public' ? 'Abrir Painel dos Noivos' : 'Ver Site Público'}
        >
          {activeView === 'public' ? (
            <>
              <Settings size={15} className="text-[#D4AF37]" />
              <span>Área dos Noivos</span>
            </>
          ) : (
            <>
              <Eye size={15} className="text-[#D4AF37]" />
              <span>Ver Site Público</span>
            </>
          )}
        </button>
      </div>

      {/* Screen Render */}
      {activeView === 'public' ? (
        <PublicWeddingPage />
      ) : isAdminLoggedIn ? (
        <AdminLayout />
      ) : (
        <AdminLogin />
      )}
    </div>
  );
};

export default function App() {
  return (
    <WeddingProvider>
      <MainApp />
    </WeddingProvider>
  );
}
