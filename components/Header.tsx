
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { translations } = useLanguage();
  const [isSynced, setIsSynced] = useState(true);

  useEffect(() => {
    // Simulate periodic background sync
    const interval = setInterval(() => {
      setIsSynced(false);
      setTimeout(() => setIsSynced(true), 2000); // Sync takes 2 seconds
    }, 30000); // Sync every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-surface border-b border-gray-200">
      <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <span className="text-sm font-medium text-gray-600">{translations.syncStatus}:</span>
        {isSynced ? (
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            <span className="text-sm">{translations.synced}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1 rtl:space-x-reverse text-yellow-600">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 20h5v-5M20 4h-5v5"></path></svg>
            <span className="text-sm">{translations.syncing}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
