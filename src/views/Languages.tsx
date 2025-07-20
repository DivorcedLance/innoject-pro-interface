import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.svg";
import { useToast } from "../contexts/useToast";
import { Check, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

const Languages = () => {
  const { showToast } = useToast();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const navigate = useNavigate();

  // Función para cambiar idioma
  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    showToast({
      message: `${
        languageCode === "en" ? "Language changed to" : "Idioma cambiado a"
      } ${LANGUAGES.find((lang) => lang.code === languageCode)?.name}`,
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
            <img src={homeIcon} alt="Home" className="w-16 h-16" />
          </button>
        </div>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto">
          {selectedLanguage.code === "en"
            ? "LANGUAGE SETTINGS"
            : "AJUSTES DE IDIOMA"}
        </span>
      </div>

      {/* Página 5: Language Settings */}

      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col gap-6 w-full max-w-[800px] px-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            {selectedLanguage.code === "en"
              ? "Select Your Preferred Language"
              : "Seleccione su idioma preferido"}
          </h2>

          <div className="flex flex-col gap-4">
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
        flex items-center justify-between px-12 py-8 rounded-[40px] cursor-pointer
        transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
        ${
          isSelected
            ? "bg-blue-100 border-4 border-blue-400 shadow-lg"
            : "bg-gray-100 border-4 border-gray-300 hover:bg-gray-200"
        }
      `}
      onClick={onSelect}
    >
      <div className="flex items-center gap-6">
        <span className="text-5xl">{language.flag}</span>
        <span className="text-3xl font-bold text-gray-800">
          {language.name}
        </span>
      </div>

      {isSelected && (
        <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
          <Check className="w-8 h-8 text-white" strokeWidth={3} />
        </div>
      )}
    </div>
  );
}

export default Languages;
