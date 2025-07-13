//contexts/LanguageProvider.tsx
import React, { useState } from "react";
import { type Language, LanguageContext, LANGUAGES } from "./LanguageContext";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    LANGUAGES[0]
  );

  const setLanguage = (code: string) => {
    const language = LANGUAGES.find((lang) => lang.code === code);
    if (language) {
      setSelectedLanguage(language);
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
