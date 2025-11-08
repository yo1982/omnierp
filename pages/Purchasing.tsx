
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { purchaseOrders } from '../data/mockData';

const StatusBadge: React.FC<{ status: 'Pending' | 'Completed' | 'Cancelled' }> = ({ status }) => {
    const baseClasses = 'px-2 py-1 text-xs font-semibold rounded-full';
    const statusClasses = {
        Pending: 'bg-yellow-100 text-yellow-800',
        Completed: 'bg-green-100 text-green-800',
        Cancelled: 'bg-red-100 text-red-800',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const Purchasing: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPOs = useMemo(() =>
    purchaseOrders.filter(po =>
      po.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="bg-surface p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{translations.purchaseOrders}</h2>
        <input
          type="text"
          placeholder={translations.searchPOs}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">{translations.supplier}</th>
              <th className="p-4 font-semibold">{translations.date}</th>
              <th className="p-4 font-semibold">{translations.status}</th>
              <th className="p-4 font-semibold">{translations.totalAmount}</th>
              <th className="p-4 font-semibold">{translations.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPOs.map((po) => (
              <tr key={po.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono text-sm text-gray-600">{po.id}</td>
                <td className="p-4">{po.supplier}</td>
                <td className="p-4">{po.date}</td>
                <td className="p-4"><StatusBadge status={po.status} /></td>
                <td className="p-4 font-semibold">${po.total.toFixed(2)}</td>
                <td className="p-4">
                  <button className="text-primary hover:underline">{translations.view}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Purchasing;
