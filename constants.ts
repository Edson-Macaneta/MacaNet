import { Account } from './types';

// Plano de Contas Simplificado para Microempresa (PGC-NIRF)
export const PGC_ACCOUNTS: Account[] = [
  // CLASSE 1: MEIOS FINANCEIROS
  { code: '1.1', name: 'Caixa', class: '1' },
  { code: '1.2', name: 'Bancos', class: '1' },
  
  // CLASSE 2: INVENTÁRIOS E ACTIVOS BIOLÓGICOS
  { code: '2.1', name: 'Mercadorias (Acessórios)', class: '2' },
  { code: '2.2', name: 'Matérias-primas (Peças Reparação)', class: '2' },

  // CLASSE 3: INVESTIMENTOS DE CAPITAL (Simplificado)
  { code: '3.2', name: 'Activos Tangíveis (Equipamentos)', class: '3' },

  // CLASSE 4: CONTAS A RECEBER, A PAGAR E ACRÉSCIMOS E DIFERIMENTOS
  { code: '4.1', name: 'Clientes', class: '4' },
  { code: '4.2', name: 'Fornecedores', class: '4' },
  { code: '4.4', name: 'Estado (Impostos a Pagar)', class: '4' },
  { code: '4.6', name: 'Pessoal (Salários a Pagar)', class: '4' },

  // CLASSE 6: GASTOS E PERDAS
  { code: '6.1', name: 'Custo dos Inventários Vendidos', class: '6' },
  { code: '6.2', name: 'Gastos com Pessoal', class: '6' },
  { code: '6.3', name: 'Fornecimentos e Serviços de Terceiros', class: '6' }, // Luz, Água, Internet, Renda
  { code: '6.8', name: 'Outros Gastos Operacionais', class: '6' },

  // CLASSE 7: RENDIMENTOS E GANHOS
  { code: '7.1', name: 'Vendas (Acessórios)', class: '7' },
  { code: '7.2', name: 'Prestações de Serviços (Reparação)', class: '7' },
];

export const MOCKED_USER = {
  id: 'usr_001',
  name: 'Empresário Moçambicano',
  email: 'gerencia@contamoz.co.mz',
  avatar: 'https://picsum.photos/100/100'
};

export const INITIAL_TRANSACTIONS = [
  {
    id: '1',
    date: new Date().toISOString().split('T')[0],
    description: 'Capital Inicial',
    amount: 50000,
    debitAccount: '1.1',
    creditAccount: '1.1', // Simplified balancing for init
    type: 'INCOME'
  }
];