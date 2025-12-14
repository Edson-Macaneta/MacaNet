import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { MOCKED_USER } from '../constants';
import { User } from '../types';
import { User as UserIcon, Plus, ArrowLeft, Mail } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<'welcome' | 'chooser' | 'create'>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleDemoLogin = () => {
    onLogin(MOCKED_USER);
  };

  const handleCreateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name,
      email: email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff`
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden relative">
        {/* Header Section */}
        <div className="p-8 text-center border-b border-slate-50">
           <div className="flex justify-center mb-4">
            <Logo className="scale-110" />
           </div>
           <h2 className="text-xl font-semibold text-slate-800">
             {view === 'create' ? 'Adicionar Conta' : 'Aceder ao Sistema'}
           </h2>
           <p className="text-slate-500 text-sm mt-1">Gestão inteligente para sua loja</p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {view === 'welcome' && (
            <div className="space-y-6">
               <button 
                onClick={() => setView('chooser')}
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm group"
               >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                <span>Continuar com Google</span>
              </button>
              
              <div className="text-center">
                 <p className="text-xs text-slate-400">Ambiente seguro com criptografia PGC-NIRF</p>
              </div>
            </div>
          )}

          {view === 'chooser' && (
            <div className="space-y-4 animate-fade-in">
              <div 
                onClick={handleDemoLogin}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all"
              >
                <img src={MOCKED_USER.avatar} alt="Demo" className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{MOCKED_USER.name}</p>
                  <p className="text-xs text-slate-500">{MOCKED_USER.email}</p>
                </div>
              </div>

              <div 
                onClick={() => setView('create')}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <Plus size={20} className="text-slate-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Usar outra conta</p>
                </div>
              </div>
            </div>
          )}

          {view === 'create' && (
            <form onSubmit={handleCreateLogin} className="space-y-4 animate-fade-in">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">Seu Nome</label>
                <div className="relative">
                  <UserIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Ex: João Machava"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1 ml-1">Email Google</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="nome@gmail.com"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition-colors shadow-sm"
              >
                Entrar
              </button>
            </form>
          )}
        </div>

        {/* Footer/Navigation */}
        <div className="bg-slate-50 p-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
           {view !== 'welcome' ? (
             <button 
               onClick={() => setView('welcome')} 
               className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
             >
               <ArrowLeft size={14} /> Voltar
             </button>
           ) : (
             <span>v1.0.0</span>
           )}
           <p>© ContaMoz</p>
        </div>
      </div>
    </div>
  );
};