// contexts/LanguageContext.ts
import { createContext } from "react";

export type Language = {
  code: string;
  name: string;
};

export type LanguageContextType = {
  selectedLanguage: Language;
  setSelectedLanguage: (code: string) => void;
};

export const LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
];

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
