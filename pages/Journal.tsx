import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { PGC_ACCOUNTS } from '../constants';
import { Button } from '../components/ui/Button';
import { Plus, Search } from 'lucide-react';

interface JournalProps {
  transactions: Transaction[];
  onAddTransaction: (t: Transaction) => void;
}

export const Journal: React.FC<JournalProps> = ({ transactions, onAddTransaction }) => {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [debit, setDebit] = useState(PGC_ACCOUNTS[0].code);
  const [credit, setCredit] = useState(PGC_ACCOUNTS[6].code); // Default to Sales
  const [type, setType] = useState<TransactionType>(TransactionType.INCOME);

  const formatter = new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!desc || !amount) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      description: desc,
      amount: parseFloat(amount),
      debitAccount: debit,
      creditAccount: credit,
      type
    };

    onAddTransaction(newTx);
    setShowForm(false);
    setDesc('');
    setAmount('');
  };

  const filteredTransactions = transactions.filter(t => 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.debitAccount.includes(searchTerm) ||
    t.creditAccount.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Diário Contabilístico</h1>
          <p className="text-slate-500">Lançamentos conforme PGC-NIRF</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus size={18} /> Novo Lançamento
        </Button>
      </header>

      {showForm && (
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-md animate-fade-in-down">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Novo Movimento</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Ex: Venda de Película de Vidro"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Valor (MZN)</label>
              <input 
                type="number" 
                required
                min="1"
                step="0.01"
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType)}
              >
                <option value={TransactionType.INCOME}>Receita (Entrada)</option>
                <option value={TransactionType.EXPENSE}>Despesa (Saída)</option>
                <option value={TransactionType.TRANSFER}>Transferência Interna</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Conta a Débito</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={debit}
                onChange={(e) => setDebit(e.target.value)}
              >
                {PGC_ACCOUNTS.map(acc => (
                  <option key={`deb-${acc.code}`} value={acc.code}>{acc.code} - {acc.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Conta a Crédito</label>
              <select 
                className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                value={credit}
                onChange={(e) => setCredit(e.target.value)}
              >
                {PGC_ACCOUNTS.map(acc => (
                  <option key={`cred-${acc.code}`} value={acc.code}>{acc.code} - {acc.name}</option>
                ))}
              </select>
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
              <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>Cancelar</Button>
              <Button type="submit">Gravar Lançamento</Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center gap-2">
          <Search size={20} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Pesquisar lançamentos..." 
            className="flex-1 outline-none text-sm text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Data</th>
                <th className="px-6 py-3">Descrição</th>
                <th className="px-6 py-3 text-center">Débito</th>
                <th className="px-6 py-3 text-center">Crédito</th>
                <th className="px-6 py-3 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 text-slate-500">{new Date(tx.date).toLocaleDateString('pt-PT')}</td>
                  <td className="px-6 py-3 font-medium text-slate-900">{tx.description}</td>
                  <td className="px-6 py-3 text-center text-slate-600 font-mono text-xs bg-slate-50/50">{tx.debitAccount}</td>
                  <td className="px-6 py-3 text-center text-slate-600 font-mono text-xs bg-slate-50/50">{tx.creditAccount}</td>
                  <td className={`px-6 py-3 text-right font-medium ${tx.type === TransactionType.INCOME ? 'text-emerald-600' : tx.type === TransactionType.EXPENSE ? 'text-red-600' : 'text-slate-900'}`}>
                    {formatter.format(tx.amount)}
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Nenhum lançamento encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};