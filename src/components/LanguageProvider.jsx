import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: () => import('@/locales/en.json'),
  fr: () => import('@/locales/fr.json'),
};

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem('language');
    return stored || 'en';
  });
  const [currentTranslations, setCurrentTranslations] = useState(null);

  useEffect(() => {
    localStorage.setItem('language', language);
    const loadTranslations = async () => {
      const module = await translations[language]();
      setCurrentTranslations(module.default);
    };
    loadTranslations();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  const value = {
    language,
    toggleLanguage,
    translations: currentTranslations,
  };

  if (!currentTranslations) {
    return null; // Or a loading spinner
  }

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};