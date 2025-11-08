
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { customers } from '../data/mockData';

const CRM: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = useMemo(() =>
    customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  return (
    <div className="bg-surface p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{translations.customers}</h2>
        <input
          type="text"
          placeholder={translations.searchCustomers}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 font-semibold">{translations.customerName}</th>
              <th className="p-4 font-semibold">{translations.email}</th>
              <th className="p-4 font-semibold">{translations.phone}</th>
              <th className="p-4 font-semibold">{translations.loyaltyPoints}</th>
              <th className="p-4 font-semibold">{translations.actions}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{customer.name}</td>
                <td className="p-4">{customer.email}</td>
                <td className="p-4">{customer.phone}</td>
                <td className="p-4 font-bold text-secondary">{customer.loyaltyPoints}</td>
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

export default CRM;
