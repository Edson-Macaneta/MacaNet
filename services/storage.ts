import { Transaction, User } from '../types';
import { INITIAL_TRANSACTIONS } from '../constants';

const TRANSACTIONS_KEY = 'contamoz_transactions';
const USER_KEY = 'contamoz_user';

export const storageService = {
  getTransactions: (): Transaction[] => {
    const data = localStorage.getItem(TRANSACTIONS_KEY);
    return data ? JSON.parse(data) : INITIAL_TRANSACTIONS;
  },

  saveTransaction: (transaction: Transaction) => {
    const transactions = storageService.getTransactions();
    const updated = [transaction, ...transactions];
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(updated));
    return updated;
  },

  getUser: (): User | null => {
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  saveUser: (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  }
};