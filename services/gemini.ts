import { GoogleGenAI } from "@google/genai";
import { Transaction, Account } from '../types';

const apiKey = process.env.API_KEY || ''; // Injected by environment

export const analyzeFinances = async (transactions: Transaction[], accounts: Account[]): Promise<string> => {
  if (!apiKey) {
    return "Chave de API não configurada. Por favor, verifique o ambiente.";
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare context
  const recentTx = transactions.slice(0, 20); // Last 20 transactions
  const contextData = JSON.stringify(recentTx);
  const accountData = JSON.stringify(accounts);

  const prompt = `
    Você é um contabilista sénior em Moçambique, especialista em PGC-NIRF e código comercial moçambicano.
    Analise estas transações recentes de uma microempresa de reparação de celulares e venda de acessórios.
    
    Dados das Contas (PGC): ${accountData}
    Transações Recentes: ${contextData}

    Forneça:
    1. Um breve resumo da saúde financeira em formato de parágrafo.
    2. Identifique tendências de custos ou receitas.
    3. Dê 2 conselhos práticos para melhorar o fluxo de caixa ou reduzir custos, considerando a realidade de Maputo/Moçambique.
    
    Use formatação Markdown. Seja conciso e profissional. Fale em Meticais (MZN).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Não foi possível gerar a análise no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro ao conectar com o assistente inteligente. Verifique sua conexão.";
  }
};