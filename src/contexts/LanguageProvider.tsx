//contexts/LanguageProvider.tsx
import React, { useState, useEffect } from "react";
import { type Language, LanguageContext, LANGUAGES } from "./LanguageContext";
import { useTranslation } from "react-i18next";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    LANGUAGES.find((lang) => lang.code === i18n.language) || LANGUAGES[0]
  );

  useEffect(() => {
    // Update selected language when i18n language changes
    const currentLang = LANGUAGES.find((lang) => lang.code === i18n.language);
    if (currentLang) {
      setSelectedLanguage(currentLang);
    }
  }, [i18n.language]);

  const setLanguage = (code: string) => {
    const language = LANGUAGES.find((lang) => lang.code === code);
    if (language) {
      setSelectedLanguage(language);
      i18n.changeLanguage(code);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ selectedLanguage, setSelectedLanguage: setLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
