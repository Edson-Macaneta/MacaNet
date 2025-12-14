import React from 'react';
import { Transaction, TransactionType } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CashFlowProps {
  transactions: Transaction[];
}

export const CashFlow: React.FC<CashFlowProps> = ({ transactions }) => {
  const formatter = new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' });

  // Calculate cumulative balance over time
  const data = React.useMemo(() => {
    // Sort transactions by date ascending
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let runningBalance = 0;
    const points: any[] = [];

    sorted.forEach(t => {
      if (t.type === TransactionType.INCOME) runningBalance += t.amount;
      if (t.type === TransactionType.EXPENSE) runningBalance -= t.amount;
      
      points.push({
        date: t.date,
        balance: runningBalance,
        description: t.description,
        amount: t.type === TransactionType.EXPENSE ? -t.amount : t.amount
      });
    });

    // Simplify for chart (take last balance of each day)
    const chartPoints = points.reduce((acc: any[], curr) => {
      const existing = acc.find(p => p.date === curr.date);
      if (existing) {
        existing.balance = curr.balance; // Update to end of day
      } else {
        acc.push({ date: curr.date, balance: curr.balance });
      }
      return acc;
    }, []);

    return { list: points.reverse(), chart: chartPoints };
  }, [transactions]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Fluxo de Caixa</h1>
        <p className="text-slate-500">Evolução do saldo disponível</p>
      </header>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Evolução do Saldo</h3>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.chart}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit'})} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip 
              formatter={(value: number) => formatter.format(value)}
              contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
            />
            <Area type="monotone" dataKey="balance" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Extrato Detalhado</h3>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium text-left">
                <tr>
                  <th className="px-6 py-3">Data</th>
                  <th className="px-6 py-3">Descrição</th>
                  <th className="px-6 py-3 text-right">Movimento</th>
                  <th className="px-6 py-3 text-right">Saldo Acumulado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.list.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-6 py-3 text-slate-500">{new Date(item.date).toLocaleDateString('pt-PT')}</td>
                    <td className="px-6 py-3 font-medium text-slate-800">{item.description}</td>
                    <td className={`px-6 py-3 text-right font-medium ${item.amount > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {item.amount > 0 ? '+' : ''}{formatter.format(item.amount)}
                    </td>
                    <td className="px-6 py-3 text-right text-slate-600 font-mono">
                      {formatter.format(item.balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};