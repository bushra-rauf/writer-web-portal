'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('english');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('siteLanguage');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage and update document direction
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('siteLanguage', newLanguage);

    // Update document direction
    if (typeof document !== 'undefined') {
      document.documentElement.dir = newLanguage === 'urdu' ? 'rtl' : 'ltr';
      document.documentElement.lang = newLanguage === 'urdu' ? 'ur' : 'en';
    }
  };

  // Set initial direction
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = language === 'urdu' ? 'rtl' : 'ltr';
      document.documentElement.lang = language === 'urdu' ? 'ur' : 'en';
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
