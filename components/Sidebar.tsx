
import React from 'react';
import type { Page } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { DashboardIcon, PosIcon, InventoryIcon, HumanResourcesIcon, CrmIcon, PurchasingIcon, AccountingIcon, SettingsIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const { translations, direction } = useLanguage();

  const navItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'Dashboard', label: translations.dashboard, icon: <DashboardIcon /> },
    { page: 'Point of Sale', label: translations.pointOfSale, icon: <PosIcon /> },
    { page: 'Inventory', label: translations.inventory, icon: <InventoryIcon /> },
    { page: 'Human Resources', label: translations.humanResources, icon: <HumanResourcesIcon /> },
    { page: 'CRM', label: translations.crm, icon: <CrmIcon /> },
    { page: 'Purchasing', label: translations.purchasing, icon: <PurchasingIcon /> },
    { page: 'Accounting', label: translations.accounting, icon: <AccountingIcon /> },
  ];

  const bottomNavItems: { page: Page; label: string; icon: React.ReactNode }[] = [
    { page: 'Settings', label: translations.settings, icon: <SettingsIcon /> },
  ];

  const NavLink: React.FC<{ item: { page: Page; label: string; icon: React.ReactNode } }> = ({ item }) => (
    <button
      onClick={() => setCurrentPage(item.page)}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-150 ${
        currentPage === item.page
          ? 'bg-primary-dark text-on-primary'
          : 'text-gray-300 hover:bg-primary hover:text-on-primary'
      } ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
    >
      {item.icon}
      <span className={`transition-all duration-200 ${direction === 'rtl' ? 'mr-4' : 'ml-4'}`}>{item.label}</span>
    </button>
  );

  return (
    <aside className="z-20 hidden w-64 overflow-y-auto bg-gray-800 md:block flex-shrink-0">
      <div className="py-4 text-gray-400">
        <a className={`flex items-center text-lg font-bold text-white ${direction === 'rtl' ? 'flex-row-reverse pr-6' : 'pl-6'}`} href="#">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            Omni ERP
        </a>
        <ul className="mt-6">
          {navItems.map((item) => (
            <li className="relative" key={item.page}>
              <NavLink item={item} />
            </li>
          ))}
        </ul>
        <div className="absolute bottom-0 w-full">
            <ul>
                {bottomNavItems.map((item) => (
                    <li className="relative" key={item.page}>
                        <NavLink item={item} />
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
