import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/mockData';
import type { Product, CartItem } from '../types';

const PointOfSale: React.FC = () => {
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() =>
    products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    ), [searchTerm]
  );

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: string, newQuantity: number) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const { subtotal, tax, total } = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [cart]);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Product Selection */}
      <div className="lg:w-2/3 flex flex-col">
        <div className="mb-4">
          <input
            type="text"
            placeholder={translations.searchProducts}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-surface rounded-lg shadow p-3 text-center hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <img src={product.imageUrl} alt={product.name} className="w-full h-24 object-cover rounded-md mb-2" />
                <p className="font-semibold text-sm text-gray-800">{product.name}</p>
                <p className="text-xs text-gray-500">${product.price.toFixed(2)}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cart */}
      <div className="lg:w-1/3 bg-surface rounded-lg shadow flex flex-col p-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-3">{translations.cart}</h2>
        {cart.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {translations.emptyCart}
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto -mr-2 pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex items-center justify-between mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 0)}
                    className="w-16 text-center border rounded-md py-1"
                    min="0"
                  />
                  <span className="w-20 text-right font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="border-t pt-4 mt-auto">
          <div className="flex justify-between text-sm mb-1">
            <span>{translations.subtotal}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-2 text-gray-600">
            <span>{translations.tax}</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>{translations.total}</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={clearCart}
              className="w-full bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              disabled={cart.length === 0}
            >
              {translations.clearCart}
            </button>
            <button 
              className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              disabled={cart.length === 0}
            >
              {translations.charge} ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointOfSale;
