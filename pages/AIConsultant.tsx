import React, { useState } from 'react';
import { Transaction } from '../types';
import { PGC_ACCOUNTS } from '../constants';
import { analyzeFinances } from '../services/gemini';
import { Button } from '../components/ui/Button';
import { Bot, Sparkles, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface AIConsultantProps {
  transactions: Transaction[];
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ transactions }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzeFinances(transactions, PGC_ACCOUNTS);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Bot size={32} />
            </div>
            <h1 className="text-3xl font-bold">Consultor Inteligente</h1>
          </div>
          <p className="text-emerald-50 text-lg max-w-2xl">
            Use a inteligência artificial para analisar o seu fluxo de caixa, identificar custos ocultos e receber conselhos baseados na economia de Moçambique.
          </p>
          
          <div className="mt-8">
            <Button 
                onClick={handleAnalyze} 
                isLoading={loading}
                className="bg-white text-emerald-700 hover:bg-emerald-50 border-none shadow-xl text-lg px-8 py-4"
            >
                <Sparkles size={20} className="mr-2" />
                {analysis ? 'Gerar Nova Análise' : 'Analisar Meu Negócio'}
            </Button>
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>
      </div>

      {analysis && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 animate-fade-in-up">
            <div className="flex items-center gap-2 mb-6 text-emerald-600 font-semibold uppercase tracking-wider text-sm">
                <MessageSquare size={16} />
                Relatório Gerado
            </div>
            <div className="prose prose-slate prose-emerald max-w-none">
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
        </div>
      )}
    </div>
  );
};