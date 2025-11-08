
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { employees } from '../data/mockData';

const HumanResources: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredEmployees = useMemo(() =>
    employees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form data and API calls here.
    console.log("Adding new employee...");
    setShowAddForm(false);
  }

  return (
    <div className="space-y-6">
      {showAddForm && (
        <div className="bg-surface p-6 rounded-lg shadow transition-all duration-300">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{translations.newEmployee}</h3>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700">{translations.employeeName}</label>
                    <input type="text" id="employeeName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">{translations.role}</label>
                    <input type="text" id="role" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">{translations.email}</label>
                    <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{translations.phone}</label>
                    <input type="tel" id="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700">{translations.salary}</label>
                    <input type="number" id="salary" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
            </div>
             <div className="flex justify-end items-center space-x-2 pt-2 rtl:space-x-reverse">
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light">
                    {translations.cancel}
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-on-primary bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    {translations.save}
                </button>
            </div>
          </form>
        </div>
      )}
      <div className="bg-surface p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
          <h2 className="text-2xl font-bold text-gray-800">{translations.employees}</h2>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              placeholder={translations.searchEmployees}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            />
            <button onClick={() => setShowAddForm(true)} className="flex items-center bg-primary text-on-primary px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
                <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {translations.newEmployee}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 font-semibold">{translations.employeeName}</th>
                <th className="p-4 font-semibold">{translations.role}</th>
                <th className="p-4 font-semibold">{translations.email}</th>
                <th className="p-4 font-semibold">{translations.phone}</th>
                <th className="p-4 font-semibold">{translations.salary}</th>
                <th className="p-4 font-semibold">{translations.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{employee.name}</td>
                  <td className="p-4">{employee.role}</td>
                  <td className="p-4">{employee.email}</td>
                  <td className="p-4">{employee.phone}</td>
                  <td className="p-4">${employee.salary.toLocaleString()}</td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">{translations.view}</button>
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

export default HumanResources;
