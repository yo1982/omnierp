import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { journalEntries } from '../data/mockData';

const AccountingCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-surface rounded-lg shadow p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-on-surface">{value}</p>
    </div>
    <div className="bg-primary-light text-on-primary rounded-full p-3">
      {icon}
    </div>
  </div>
);

const Accounting: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = useMemo(() =>
    journalEntries.filter(entry =>
      entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.account.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const financialMetrics = useMemo(() => {
    const totalRevenue = journalEntries
      .filter(e => e.account.includes('Revenue'))
      .reduce((sum, e) => sum + e.credit, 0);
    const totalExpenses = journalEntries
      .filter(e => e.account.includes('Expense') || e.account.includes('Cost'))
      .reduce((sum, e) => sum + e.debit, 0);
    const netIncome = totalRevenue - totalExpenses;
    const assets = journalEntries
      .filter(e => ['Cash', 'Inventory'].includes(e.account)) // Simplified assets calculation
      .reduce((sum, e) => sum + e.debit - e.credit, 0);

    return { totalRevenue, totalExpenses, netIncome, assets };
  }, []);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }

  const statCards = [
    { title: translations.totalRevenue, value: formatCurrency(financialMetrics.totalRevenue), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3.333 0-6 2.667-6 6s2.667 6 6 6 6-2.667 6-6-2.667-6-6-6zm0 0V4m0 4h4m-4 0H8"></path></svg> },
    { title: translations.totalExpenses, value: formatCurrency(financialMetrics.totalExpenses), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6"></path></svg> },
    { title: translations.netIncome, value: formatCurrency(financialMetrics.netIncome), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> },
    { title: translations.assets, value: formatCurrency(financialMetrics.assets), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0v-4a2 2 0 012-2h6a2 2 0 012 2v4m-6 0h-2"></path></svg> },
  ]

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map(card => <AccountingCard key={card.title} {...card} />)}
      </div>

      {/* Reports Section */}
      <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{translations.reports}</h2>
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">{translations.incomeStatement}</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">{translations.balanceSheet}</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">{translations.cashFlow}</button>
          </div>
      </div>
      
      {/* General Ledger */}
      <div className="bg-surface p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{translations.generalLedger}</h2>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
             <input
              type="text"
              placeholder={translations.searchTransactions}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            />
            <button className="flex items-center bg-primary text-on-primary px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
                <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
              {translations.addJournalEntry}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="p-4 font-semibold">{translations.date}</th>
                <th className="p-4 font-semibold">{translations.account}</th>
                <th className="p-4 font-semibold">{translations.description}</th>
                <th className="p-4 font-semibold text-right">{translations.debit}</th>
                <th className="p-4 font-semibold text-right">{translations.credit}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 whitespace-nowrap">{entry.date}</td>
                  <td className="p-4 font-medium">{entry.account}</td>
                  <td className="p-4 text-gray-600">{entry.description}</td>
                  <td className="p-4 text-right font-mono text-green-700">{entry.debit > 0 ? formatCurrency(entry.debit) : '-'}</td>
                  <td className="p-4 text-right font-mono text-red-700">{entry.credit > 0 ? formatCurrency(entry.credit) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Accounting;