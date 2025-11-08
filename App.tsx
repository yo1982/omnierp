
import React, { useState, useCallback, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import PointOfSale from './pages/PointOfSale';
import Inventory from './pages/Inventory';
import HumanResources from './pages/HumanResources';
import CRM from './pages/CRM';
import Purchasing from './pages/Purchasing';
import Accounting from './pages/Accounting';
import Settings from './pages/Settings';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import type { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('Dashboard');

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'Dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />;
      case 'Point of Sale':
        return <PointOfSale />;
      case 'Inventory':
        return <Inventory />;
      case 'Human Resources':
        return <HumanResources />;
      case 'CRM':
        return <CRM />;
      case 'Purchasing':
        return <Purchasing />;
      case 'Accounting':
        return <Accounting />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage]);
  
  const pageTitle = useMemo(() => currentPage, [currentPage]);

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-background text-on-surface">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Header title={pageTitle} />
          <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
            {renderPage()}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
};

export default App;
