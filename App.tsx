import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Journal } from './pages/Journal';
import { CashFlow } from './pages/CashFlow';
import { AIConsultant } from './pages/AIConsultant';
import { storageService } from './services/storage';
import { MOCKED_USER } from './constants';
import { Transaction, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Initialize data
    const storedUser = storageService.getUser();
    if (storedUser) setUser(storedUser);
    setTransactions(storageService.getTransactions());
  }, []);

  const handleLogin = (u: User) => {
    storageService.saveUser(u);
    setUser(u);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  const handleAddTransaction = (t: Transaction) => {
    const updated = storageService.saveTransaction(t);
    setTransactions(updated);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      user={user} 
      onLogout={handleLogout} 
      activePage={activePage}
      setActivePage={setActivePage}
    >
      {activePage === 'dashboard' && <Dashboard transactions={transactions} />}
      {activePage === 'journal' && <Journal transactions={transactions} onAddTransaction={handleAddTransaction} />}
      {activePage === 'cashflow' && <CashFlow transactions={transactions} />}
      {activePage === 'ai-consultant' && <AIConsultant transactions={transactions} />}
    </Layout>
  );
}

export default App;