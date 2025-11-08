
import React, { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/mockData';

const Inventory: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredProducts = useMemo(() =>
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]);
  
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form data and API calls here.
    console.log("Adding new product...");
    setShowAddForm(false);
  }

  return (
    <div className="space-y-6">
       {showAddForm && (
        <div className="bg-surface p-6 rounded-lg shadow transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{translations.addProduct}</h3>
            <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">{translations.productName}</label>
                        <input type="text" id="productName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">{translations.category}</label>
                        <input type="text" id="category" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700">{translations.price}</label>
                        <input type="number" id="price" step="0.01" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">{translations.stock}</label>
                        <input type="number" id="stock" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
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
          <h2 className="text-2xl font-bold text-gray-800">{translations.products}</h2>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              placeholder={translations.searchInventory}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-64"
            />
             <button onClick={() => setShowAddForm(true)} className="flex items-center bg-primary text-on-primary px-4 py-2 rounded-md font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap">
                <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                {translations.addProduct}
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-4 font-semibold">{translations.productName}</th>
                <th className="p-4 font-semibold">{translations.category}</th>
                <th className="p-4 font-semibold">{translations.price}</th>
                <th className="p-4 font-semibold">{translations.stock}</th>
                <th className="p-4 font-semibold">{translations.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 flex items-center">
                      <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-4 rtl:ml-4 rtl:mr-0" />
                      {product.name}
                  </td>
                  <td className="p-4">{product.category}</td>
                  <td className="p-4">${product.price.toFixed(2)}</td>
                  <td className={`p-4 font-bold ${product.stock < 20 ? 'text-red-500' : 'text-green-600'}`}>
                    {product.stock}
                  </td>
                  <td className="p-4">
                    <button className="text-primary hover:underline">{translations.edit}</button>
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

export default Inventory;
