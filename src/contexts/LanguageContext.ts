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
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "zh-CN", name: "中文(简体)" },
  { code: "ru", name: "Русский" },
  { code: "nl", name: "Nederlands" },
  { code: "sv", name: "Svenska" },
];

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);
