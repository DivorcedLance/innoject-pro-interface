import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import homeIcon from "../assets/home.svg";
import { useToast } from "../contexts/useToast";
import { Check, CheckCircle, Bot } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";
import AITranslationModal from "../components/AITranslationModal";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "zh-CN", name: "中文(简体)", flag: "🇨🇳" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "sv", name: "Svenska", flag: "🇸🇪" },
];

const Languages = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // Función para cambiar idioma
  const handleLanguageChange = (languageCode: string) => {
    const language = LANGUAGES.find((lang) => lang.code === languageCode);
    setSelectedLanguage(languageCode);
    showToast({
      message: t('language.changed', { 
        language: language?.name || languageCode 
      }),
      icon: CheckCircle,
      type: "success",
      duration: 2000,
      position: "bottom-center",
    });
  };

  return (
    <div
      className="w-[1338px] h-[768px] flex flex-col bg-white overflow-hidden"
      style={{ boxSizing: "content-box" }}
    >
      {/* Barra superior */}
      <div className="flex items-center bg-gray-200 h-[90px] px-8 py-20 justify-between">
        <div className="flex flex-row items-center gap-8">
          <button
            onClick={() => navigate("/")}
            className="focus:outline-none cursor-pointer"
          >
            <img src={homeIcon} alt={t('common.home')} className="w-16 h-16" />
          </button>
        </div>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto">
          {t('language.title')}
        </span>
        <button
          onClick={() => setIsAIModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          title="AI Translation Generator"
        >
          <Bot className="w-5 h-5" />
          <span className="text-sm font-medium">AI Translate</span>
        </button>
      </div>

      {/* Página 5: Language Settings */}

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-6 w-full max-w-[1100px] px-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {t('language.select')}
          </h2>

          <div className="grid grid-cols-3 gap-4 max-h-[480px] overflow-y-auto">
            {LANGUAGES.map((language) => (
              <LanguageOption
                key={language.code}
                language={language}
                isSelected={selectedLanguage.code === language.code}
                onSelect={() => handleLanguageChange(language.code)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI Translation Modal */}
      <AITranslationModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)} 
      />
    </div>
  );
};

function LanguageOption({
  language,
  isSelected,
  onSelect,
}: {
  language: Language;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      className={`
        flex items-center justify-between px-8 py-6 rounded-[30px] cursor-pointer
        transition-all duration-200
        ${
          isSelected
            ? "bg-blue-100 border-3 border-blue-400 shadow-lg"
            : "bg-gray-100 border-3 border-gray-300 hover:bg-gray-200 hover:shadow-md"
        }
      `}
      onClick={onSelect}
    >
      <div className="flex items-center gap-4">
        <span className="text-3xl">{language.flag}</span>
        <span className="text-2xl font-bold text-gray-800">
          {language.name}
        </span>
      </div>

      {isSelected && (
        <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full">
          <Check className="w-6 h-6 text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default Languages;
