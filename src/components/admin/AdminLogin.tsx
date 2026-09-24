import React, { useState } from 'react';
import { useWedding } from '../../context/WeddingContext';
import { Lock, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setActiveView, wedding } = useWedding();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginAdmin(password);
    if (!ok) {
      setError(true);
    }
  };

  const handleDemoLogin = () => {
    loginAdmin('123456');
  };

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <div className="glass rounded-[2rem] p-8 sm:p-10 max-w-md w-full bg-[#F9F6EF]/90 shadow-2xl border border-white/80 relative">
        
        {/* Back to public site button */}
        <button
          onClick={() => setActiveView('public')}
          className="flex items-center gap-1.5 text-xs text-[#657153] hover:text-[#2C3225] mb-6 font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Voltar para o site público</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#657153]/10 text-[#657153] flex items-center justify-center mx-auto mb-3">
            <Lock size={26} />
          </div>
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#657153] font-semibold block mb-1">
            Painel dos Noivos
          </span>
          <h2 className="font-serif text-3xl text-[#2C3225]">
            {wedding.coupleNames}
          </h2>
          <p className="text-xs text-[#55594A] mt-1">
            Área administrativa protegida para gestão de convidados, informações e personalização.
          </p>
        </div>

        {/* Demo Fast Login Notice & Button */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-600/20 mb-6 text-center">
          <span className="text-[11px] font-medium text-amber-900 block mb-2">
            Acesso Rápido para Avaliação:
          </span>
          <button
            onClick={handleDemoLogin}
            className="w-full bg-[#657153] hover:bg-[#4E5941] text-white py-2.5 px-4 rounded-xl text-xs font-medium uppercase tracking-wider transition-all shadow cursor-pointer flex items-center justify-center gap-1.5"
          >
            <Sparkles size={14} />
            <span>Entrar com 1 Clique (Demonstração)</span>
          </button>
        </div>

        {/* Standard Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#55594A] mb-1.5">
              Senha de Acesso dos Noivos
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Digite a senha (padrão: 123456)"
                className="w-full px-4 py-3 rounded-xl border border-[#657153]/30 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#657153]/40"
              />
              <KeyRound size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            {error && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                Senha incorreta. Use a senha de demonstração (123456) ou o botão acima.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#2C3225] hover:bg-black text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            Entrar no Painel
          </button>
        </form>

      </div>
    </div>
  );
};
