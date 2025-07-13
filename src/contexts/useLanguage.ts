//contexts/useLanguage.ts
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import { type LanguageContextType } from "./LanguageContext";

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
