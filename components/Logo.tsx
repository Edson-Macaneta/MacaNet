import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center gap-2 font-bold text-emerald-600 ${className}`}>
    <div className="relative w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-md">
      <span className="text-sm">MZ</span>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
    </div>
    <span className="text-xl tracking-tight text-slate-800">Conta<span className="text-emerald-600">Moz</span></span>
  </div>
);