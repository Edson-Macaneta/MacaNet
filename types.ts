export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER'
}

export interface Account {
  code: string;
  name: string;
  class: string; // PGC-NIRF Class (e.g., "1", "2", "4", "6", "7")
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  debitAccount: string; // Account Code
  creditAccount: string; // Account Code
  type: TransactionType;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface GeminiAnalysis {
  advice: string;
  healthScore: number; // 0-100
  loading: boolean;
}