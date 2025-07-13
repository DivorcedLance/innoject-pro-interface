import { useState } from "react";
import { useNumpad } from "../contexts/useNumpad";
import { useNavigate } from "react-router-dom";

import homeIcon from "../assets/home.svg";
import resetIcon from "../assets/reset.svg";
import arrowLeftIcon from "../assets/arrow-left.svg";
import arrowRightIcon from "../assets/arrow-right.svg";
import keyIcon from "../assets/key.svg";
import playIcon from "../assets/play.svg";
import playWhiteIcon from "../assets/play-white.svg";
import { useToast } from "../contexts/useToast";
import { Check, CheckCircle } from "lucide-react";
import { useLanguage } from "../contexts/useLanguage";

const BG = "bg-[#BDE6F3]";
const BOX = `${BG} rounded-[40px] px-8 py-6 flex flex-col items-center w-[420px] h-[260px]`;
const INPUT_STYLE =
  "rounded-full bg-white font-extrabold text-center text-5xl w-[210px] h-[92px] cursor-pointer border-none focus:outline-none";
const RESET_BTN =
  "absolute bottom-5 right-7 w-10 h-10 cursor-pointer hover:scale-110 active:scale-105 transition";

// Para la página 4:
const BOX_BIG = `${BG} rounded-[40px] px-10 py-6 flex flex-col items-center w-[470px]`;
const LABEL = "text-2xl font-semibold text-center mb-3";
const BIG_INPUT =
  "rounded-full bg-white font-extrabold text-center text-5xl w-[320px] h-[78px] cursor-pointer border-none focus:outline-none";
const INPUT_SIZE = "w-[140px] h-[100px] text-4xl";

const CORRECT_PASSWORD = "1234";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const LANGUAGES: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

type Setting = {
  label: {
    en: string;
    es: string;
  };
  suffix?: string;
  value: string;
  setValue: (v: string) => void;
  side: "left" | "right";
};

const page1Settings = (
  shots1: string,
  setShots1: (v: string) => void,
  shots2: string,
  setShots2: (v: string) => void,
  shots3: string,
  setShots3: (v: string) => void,
  shots4: string,
  setShots4: (v: string) => void
): Setting[] => [
  {
    label: {
      en: "Delay Press",
      es: "Retraso Presionar",
    },
    suffix: "Sec.",
    value: shots1,
    setValue: setShots1,
    side: "right",
  },
  {
    label: {
      en: "Delay Injection Only Vacc. 1-2",
      es: "Retraso Inyección Solo Vac. 1-2",
    },
    suffix: "Sec.",
    value: shots2,
    setValue: setShots2,
    side: "left",
  },
  {
    label: {
      en: "Delay Injection Water Base/ Spray 3-4-5",
      es: "Retraso Inyección Agua Base/ Spray 3-4-5",
    },
    suffix: "Sec.",
    value: shots3,
    setValue: setShots3,
    side: "right",
  },
  {
    label: {
      en: "Timing Injection 1-2",
      es: "Temporización Inyección 1-2",
    },
    suffix: "Sec.",
    value: shots4,
    setValue: setShots4,
    side: "left",
  },
];

const page2Settings = (
  shots5: string,
  setShots5: (v: string) => void,
  shots6: string,
  setShots6: (v: string) => void,
  shots7: string,
  setShots7: (v: string) => void,
  shots8: string,
  setShots8: (v: string) => void
): Setting[] => [
  {
    label: {
      en: "Timing Injection 3-4-5",
      es: "Temporización Inyección 3-4-5",
    },
    suffix: "Sec.",
    value: shots5,
    setValue: setShots5,
    side: "right",
  },
  {
    label: {
      en: "Delay Needles Exit",
      es: "Retraso Salida Agujas",
    },
    suffix: "Sec.",
    value: shots6,
    setValue: setShots6,
    side: "left",
  },
  {
    label: {
      en: "Buzzer",
      es: "Zumbador",
    },
    suffix: "Sec.",
    value: shots7,
    setValue: setShots7,
    side: "right",
  },
  {
    label: {
      en: "Delay Closing Drop Chute",
      es: "Retraso Cierre Canalón",
    },
    suffix: "Sec.",
    value: shots8,
    setValue: setShots8,
    side: "left",
  },
];

const page3Settings = (
  shots9: string,
  setShots9: (v: string) => void,
  shots10: string,
  setShots10: (v: string) => void
): Setting[] => [
  {
    label: {
      en: "Time Closing Drop Chute",
      es: "Retraso Cierre Canalón",
    },
    suffix: "Sec.",
    value: shots9,
    setValue: setShots9,
    side: "right",
  },
  {
    label: {
      en: "Number Chicks Per Box",
      es: "Número de Pollitos Por Caja",
    },
    suffix: "Sec.",
    value: shots10,
    setValue: setShots10,
    side: "left",
  },
];

const Settings = () => {
  const { showToast } = useToast();
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const { openNumpad } = useNumpad();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Estados para cada valor de las páginas 1-3
  const [shots1, setShots1] = useState("0.03");
  const [shots2, setShots2] = useState("0.03");
  const [shots3, setShots3] = useState("0");
  const [shots4, setShots4] = useState("0.20");
  const [shots5, setShots5] = useState("0.20");
  const [shots6, setShots6] = useState("0.05");
  const [shots7, setShots7] = useState("3");
  const [shots8, setShots8] = useState("0.35");
  const [shots9, setShots9] = useState("12");
  const [shots10, setShots10] = useState("40");

  // Estados para la página 4 (Needles Disinfection)
  const [cycleCounter, setCycleCounter] = useState("120");
  const [disinfectionCycle, setDisinfectionCycle] = useState("40");
  const [timer, setTimer] = useState("3");
  const [syringesShots, setSyringesShots] = useState("13");

  const openNumpadForShots = () => {
    openNumpad({
      initialValue: syringesShots,
      side: "left",
      onEnter: setSyringesShots,
    });
  };

  // Switches (Page 3)
  const [enable1, setEnable1] = useState(false);
  const [enable2, setEnable2] = useState(false);

  const [page, setPage] = useState(1);

  const handlePasswordChange = (newPassword: string) => {
    setPassword(newPassword);
    setPasswordError(""); // Limpiar error al cambiar contraseña
  };

  // Verificar contraseña
  const verifyPassword = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Contraseña incorrecta");
      setPassword(""); // Limpiar campo
    }
  };

  // Pantalla de contraseña
  if (!isAuthenticated) {
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
              ? "ACCESS TO SETTINGS"
              : "ACCESO A CONFIGURACIÓN"}
          </span>
          <div className="flex flex-row items-center gap-8">
            {/* Espacio para mantener centrado el título */}
          </div>
        </div>

        {/* Contenido de contraseña */}
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-6">
            {/* Icono de llave */}
            <div className="border-8 border-black rounded-full w-32 h-32 flex items-center justify-center">
              <img src={keyIcon} alt="Key" className="w-20 h-20" />
            </div>

            {/* Título */}
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {selectedLanguage.code === "en"
                ? "Enter Password"
                : "Ingrese la Contraseña"}
            </h2>

            {/* Campo de contraseña */}
            <div
              className={`${
                passwordError ? "bg-red-100" : BG
              } rounded-[40px] px-12 py-8 flex flex-col items-center gap-6`}
            >
              {passwordError && (
                <span className="text-red-700 rounded-lg text-xl font-semibold">
                  {passwordError}
                </span>
              )}

              <input
                type="password"
                className="rounded-full bg-white font-extrabold text-center text-4xl w-[280px] h-[80px] cursor-pointer border-none focus:outline-none tracking-[0.3em]"
                value={password}
                readOnly
                placeholder="••••"
                onClick={() =>
                  openNumpad({
                    initialValue: password,
                    side: "right",
                    onEnter: handlePasswordChange,
                  })
                }
              />

              {/* Botones */}
              <div className="flex gap-6">
                <button
                  onClick={verifyPassword}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors"
                >
                  {selectedLanguage.code === "en" ? "CONFIRM" : "CONFIRMAR"}
                </button>
                <button
                  onClick={() => {
                    setPassword("");
                    setPasswordError("");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full text-xl transition-colors"
                >
                  {selectedLanguage.code === "en" ? "CLEAR" : "LIMPIAR"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Configura cada página
  let settings: Setting[] = [];
  if (page === 1)
    settings = page1Settings(
      shots1,
      setShots1,
      shots2,
      setShots2,
      shots3,
      setShots3,
      shots4,
      setShots4
    );
  if (page === 2)
    settings = page2Settings(
      shots5,
      setShots5,
      shots6,
      setShots6,
      shots7,
      setShots7,
      shots8,
      setShots8
    );
  if (page === 3)
    settings = page3Settings(shots9, setShots9, shots10, setShots10);

  // Función para cambiar idioma
  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    showToast({
      message: `Idioma cambiado a ${
        LANGUAGES.find((lang) => lang.code === languageCode)?.name
      }`,
      icon: CheckCircle,
      type: "success",
      duration: 2000,
      position: "bottom-center",
    });
  };

  // Abre el teclado por el lado adecuado
  const openInputNumpad = (
    value: string,
    setter: (v: string) => void,
    side: "left" | "right"
  ) => {
    openNumpad({
      initialValue: value,
      side,
      onEnter: setter,
    });
  };

  const startDesinfection = () => {
    showToast({
      message: selectedLanguage.code === "en"
        ? "Disinfection started"
        : "Desinfección iniciada",
      icon: CheckCircle,
      type: "success",
      duration: 2000,
      position: "bottom-left",
    });

    setTimeout(() => {
      showToast({
        message: selectedLanguage.code === "en"
          ? "Disinfection completed"
          : "Desinfección completada",
        icon: CheckCircle,
        type: "success",
        duration: 2000,
        position: "bottom-left",
      });
    }, 3000); // Simula un tiempo de desinfección de 3 segundos
  };

  const getPageTitle = () => {
    switch (page) {
      case 1:
      case 2:
      case 3:
        return selectedLanguage.code === "en"
          ? `SETUP - PAGE ${page}`
          : `CONFIGURACIÓN - PÁGINA ${page}`;
      case 4:
        return selectedLanguage.code === "en"
          ? "NEEDLES DISINFECTION"
          : "DESINFECCIÓN DE AGUJAS";
      case 5:
        return selectedLanguage.code === "en"
          ? "LANGUAGE SETTINGS"
          : "AJUSTES DE IDIOMA";
      default:
        return "SETUP";
    }
  };

  return (
    <div
      className="w-[1338px] h-[768px] flex flex-col bg-white overflow-hidden"
      style={{ boxSizing: "content-box" }}
    >
      {/* Barra superior */}
      <div className="flex items-center bg-gray-200 h-[90px] px-8 py-20 justify-between">
        <div className="flex flex-row items-center gap-8">
          {page > 1 && (
            <button
              onClick={() => setPage(page - 1)}
              className="focus:outline-none cursor-pointer"
            >
              <img src={arrowLeftIcon} alt="Prev" className="w-16 h-16" />
            </button>
          )}
          <button
            onClick={() => navigate("/")}
            className="focus:outline-none cursor-pointer"
          >
            <img src={homeIcon} alt="Home" className="w-16 h-16" />
          </button>
        </div>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto">
          {getPageTitle()}
        </span>
        <div className="flex flex-row items-center gap-8">
          {page < 5 && (
            <button
              onClick={() => setPage(page + 1)}
              className="focus:outline-none cursor-pointer"
            >
              <img src={arrowRightIcon} alt="Next" className="w-16 h-16" />
            </button>
          )}
          {/* Llave abajo derecha solo en page 3 */}
        </div>
      </div>

      {/* Contenido */}
      {page <= 3 && (
        <div
          className={`flex-1 flex flex-col items-center justify-center gap-10 pt-2 relative`}
        >
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            {settings.map((setting, idx) => (
              <div key={idx} className="relative">
                <div className={BOX}>
                  {/* Altura fija para el label */}
                  <span className="text-2xl font-semibold text-center mb-3 h-[56px] flex items-center justify-center">
                    {
                      setting.label[
                        selectedLanguage.code as keyof typeof setting.label
                      ]
                    }
                  </span>
                  <div className="flex flex-row items-center gap-3 mt-2 w-full">
                    <input
                      className={INPUT_STYLE + " w-32 flex-shrink-0"}
                      value={setting.value}
                      readOnly
                      onClick={() =>
                        openInputNumpad(
                          setting.value,
                          setting.setValue,
                          setting.side
                        )
                      }
                    />
                    <span className="text-2xl font-normal min-w-[32px] text-center">
                      {setting.suffix}
                    </span>
                    <div className="flex-1"></div>
                    <button
                      onClick={() => setting.setValue("0")}
                      className={RESET_BTN + " flex-shrink-0"}
                    >
                      <img src={resetIcon} alt="Reset" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Switches de la página 3 */}
          {page === 3 && (
            <>
              <div className="flex flex-col gap-6 w-full px-32 my-6">
                <SettingSwitch
                  label={
                    selectedLanguage.code === "en"
                      ? "Enable Injection 1-2"
                      : "Habilitar Inyección 1-2"
                  }
                  checked={enable1}
                  onChange={setEnable1}
                />
                <SettingSwitch
                  label={
                    selectedLanguage.code === "en"
                      ? "Enable Injection 3-4-5"
                      : "Habilitar Inyección 3-4-5"
                  }
                  checked={enable2}
                  onChange={setEnable2}
                />
              </div>
              {/* Llave abajo derecha */}
              <div className="border-8 border-black rounded-full w-24 h-24 absolute right-10 bottom-5 z-20 flex items-center justify-center">
                <img src={keyIcon} alt="Key" className="w-18 h-18" />
              </div>
            </>
          )}
        </div>
      )}

      {/* Página 4: Needles Disinfection */}
      {page === 4 && (
        <div className="flex flex-row items-center justify-center mt-2 gap-24 flex-1">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Counter */}
            <div className={BOX_BIG}>
              <span className={LABEL}>
                {selectedLanguage.code === "en"
                  ? "Cycle Counter"
                  : "Contador de Ciclos"}
              </span>
              <input
                className={BIG_INPUT}
                value={cycleCounter}
                readOnly
                onClick={() =>
                  openNumpad({
                    initialValue: cycleCounter,
                    side: "right",
                    onEnter: setCycleCounter,
                  })
                }
              />
            </div>
            {/* Disinfection Cycle */}
            <div className={BOX_BIG}>
              <span className={LABEL}>
                {selectedLanguage.code === "en"
                  ? "Disinfection Cycle"
                  : "Ciclo de Desinfección"}
              </span>
              <div className="flex flex-row items-center">
                <input
                  className={BIG_INPUT}
                  value={disinfectionCycle}
                  readOnly
                  onClick={() =>
                    openNumpad({
                      initialValue: disinfectionCycle,
                      side: "left",
                      onEnter: setDisinfectionCycle,
                    })
                  }
                />
                <span className="ml-5 text-2xl font-normal">Num.</span>
              </div>
            </div>
            {/* Timer */}
            <div className={BOX_BIG}>
              <span className={LABEL}>
                {selectedLanguage.code === "en"
                  ? "Disinfection Timer"
                  : "Temporizador de Desinfección"}
              </span>
              <div className="flex flex-row items-center">
                <input
                  className={BIG_INPUT}
                  value={timer}
                  readOnly
                  onClick={() =>
                    openNumpad({
                      initialValue: timer,
                      side: "right",
                      onEnter: setTimer,
                    })
                  }
                />
                <span className="ml-5 text-2xl font-normal">Sec.</span>
              </div>
            </div>

            <div className="w-full flex flex-col items-center">
              <button
                className="bg-[#54AFFF] rounded-[32px] w-[420px] h-[140px] flex gap-4 items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                onClick={startDesinfection}
              >
                <img src={playWhiteIcon} alt="Test" className="w-14 h-14" />
                <span className="text-3xl text-white font-bold tracking-wider">
                  {selectedLanguage.code === "en"
                    ? "Start Disinfection"
                    : "Iniciar Desinfección"}
                </span>
              </button>
            </div>

            {/* Syringes Cleaning */}
            <div
              className={`col-span-2 ${BG} rounded-[40px] px-12 py-4 flex items-center justify-between min-w-[460px] shadow-xl`}
            >
              <span className="text-3xl font-bold max-w-1/4 text-wrap">
                {selectedLanguage.code === "en"
                  ? "SYRINGES CLEANING"
                  : "LIMPIEZA DE JERINGAS"}
              </span>
              <div className="flex flex-row items-center gap-3">
                <div className="border-4 border-white rounded-3xl p-1 shadow transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1">
                  <input
                    className={`
                  rounded-2xl bg-white font-extrabold text-center ${INPUT_SIZE} cursor-pointer focus:outline-none
                  border-[6px] border-white
                  transition-all duration-200
                  hover:border-blue-400 hover:scale-105
                  active:scale-105 active:border-blue-600
                  shadow
                `}
                    value={syringesShots}
                    readOnly
                    onClick={openNumpadForShots}
                  />
                </div>
                <span className="text-2xl font-normal">
                  {selectedLanguage.code === "en" ? "shots" : "disparos"}
                </span>
              </div>
              <button
                className={`
              bg-white rounded-full flex items-center justify-center w-[240px] h-[60px]
              text-2xl font-extrabold shadow-xl cursor-pointer
              hover:bg-gray-100 hover:scale-110
              transition-all duration-150
              active:bg-gray-200 active:scale-115 active:translate-y-1
            `}
                onClick={() => {}}
              >
                <span className="mr-6 ml-4">
                  {selectedLanguage.code === "en" ? "START" : "INICIAR"}
                </span>
                <img src={playIcon} alt="Start" className="w-10 h-10" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Página 5: Language Settings */}
      {page === 5 && (
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
      )}
    </div>
  );
};

function SettingSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-row items-center justify-between bg-gray-300 rounded-3xl px-10 py-6 text-2xl font-semibold w-full max-w-[640px] mx-auto">
      <span>{label}</span>
      <div
        className="flex items-center cursor-pointer ml-10"
        onClick={() => onChange(!checked)}
      >
        <div
          className={`relative w-[120px] h-[46px] rounded-full border-2 transition
            ${
              checked
                ? "bg-blue-400 border-blue-500"
                : "bg-gray-200 border-gray-400"
            }
          `}
        >
          {/* Texto ON (izquierda) */}
          <span
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold transition select-none
              ${checked ? "text-white" : "text-transparent"}
              pointer-events-none
              `}
          >
            ON
          </span>
          {/* Texto OFF (derecha) */}
          <span
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold transition select-none
              ${!checked ? "text-gray-700" : "text-transparent"}
              pointer-events-none
              `}
          >
            OFF
          </span>
          {/* Círculo */}
          <div
            className={`absolute left-1 rounded-full bg-white w-[40px] h-[40px] shadow-md transition-transform
              ${checked ? "translate-x-[70px]" : ""}
            `}
          />
        </div>
      </div>
    </div>
  );
}

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

export default Settings;
