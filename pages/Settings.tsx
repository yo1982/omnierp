
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SunIcon, MoonIcon, SystemIcon } from '../components/icons';

const Settings: React.FC = () => {
  const { language, setLanguage, translations, direction } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="bg-surface p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">{translations.language}</h3>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${language === 'en' ? 'bg-primary text-on-primary' : 'bg-gray-200'}`}
          >
            {translations.english}
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 rounded-md font-semibold text-sm ${language === 'ar' ? 'bg-primary text-on-primary' : 'bg-gray-200'}`}
          >
            {translations.arabic}
          </button>
        </div>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 border-b pb-3 mb-4">{translations.theme}</h3>
        <div className="flex items-center space-x-2 rtl:space-x-reverse rounded-lg bg-gray-100 p-1">
          <button className="flex-1 flex justify-center items-center space-x-2 rtl:space-x-reverse p-2 rounded-md bg-white shadow text-primary">
            <SunIcon className="w-5 h-5" />
            <span>{translations.light}</span>
          </button>
          <button className="flex-1 flex justify-center items-center space-x-2 rtl:space-x-reverse p-2 rounded-md text-gray-600">
            <MoonIcon className="w-5 h-5" />
            <span>{translations.dark}</span>
          </button>
           <button className="flex-1 flex justify-center items-center space-x-2 rtl:space-x-reverse p-2 rounded-md text-gray-600">
            <SystemIcon className="w-5 h-5" />
            <span>{translations.system}</span>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Theme switching is a visual demonstration. Dark mode is not fully implemented.</p>
      </div>
    </div>
  );
};

export default Settings;
