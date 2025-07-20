import { useNavigate } from "react-router-dom";
import homeIcon from "../assets/home.svg";
import dropletBlue from "../assets/droplet-blue.svg";
import dropletYellow from "../assets/droplet-yellow.svg";
import dropletsBlue from "../assets/droplets-blue.svg";
import dropletsYellow from "../assets/droplets-yellow.svg";
import { useToast } from "../contexts/useToast";
import { useLanguage } from "../contexts/useLanguage";
import { useState } from "react";

const BG = "bg-[#BDE6F3]";

const testList = [
  {
    label: {
      en: "Test 3-4-5",
      es: "Probar 3-4-5",
    },
    sub: "SINGOL",
    icon: dropletBlue,
  },
  {
    label: {
      en: "Test 1-2",
      es: "Probar 1-2",
    },
    sub: "SINGOL",
    icon: dropletYellow,
  },
  {
    label: {
      en: "Test 3-4-5",
      es: "Probar 3-4-5",
    },
    sub: "DOSE",
    icon: dropletsBlue,
  },
  {
    label: {
      en: "Test 1-2",
      es: "Probar 1-2",
    },
    sub: "DOSE",
    icon: dropletsYellow,
  },
];

const TestSyringe = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { selectedLanguage } = useLanguage();
  const [disabled, setDisabled] = useState(false);

  const handleTestClick = async (item: (typeof testList)[number]) => {
    showToast({
      message: `${
        selectedLanguage.code === "en" ? "Starting test" : "Iniciando prueba"
      }: ${item.label[selectedLanguage.code as keyof typeof item.label]} (${
        item.sub
      })`,
      type: "info",
      duration: 2000,
      position: "bottom-center",
    });

    setDisabled(true);
    await new Promise((resolve) =>
      setTimeout(resolve, item.sub === "SINGOL" ? 3000 : 5000)
    );

    showToast({
      message: `${
        selectedLanguage.code === "en" ? "Test completed" : "Prueba completada"
      }: ${item.label[selectedLanguage.code as keyof typeof item.label]} (${
        item.sub
      })`,
      type: "success",
      duration: 2000,
      position: "bottom-center",
    });
    setDisabled(false);
  };

  return (
    <div
      className="w-[1338px] h-[768px] flex flex-col bg-white overflow-hidden relative"
      style={{ boxSizing: "content-box" }}
    >
      {/* Barra superior */}
      <div className="flex items-center bg-gray-200 h-[90px] px-8 py-20 justify-between shadow">
        <button
          onClick={() => navigate("/")}
          className="focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={homeIcon} alt="Home" className="w-16 h-16" />
        </button>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto select-none">
          {selectedLanguage.code === "en" ? "TEST SYRINGE" : "PROBAR JERINGA"}
        </span>
        <span className="w-24"></span>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-row items-center justify-center my-auto gap-8">
        {/* Lista de tests */}
        <div
          className={`${BG} rounded-[40px] px-12 py-8 grid grid-cols-2 gap-4 items-center min-w-[460px] shadow-xl`}
        >
          {testList.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex items-center justify-between bg-white rounded-2xl px-10 py-6 min-w-[330px] w-full shadow
                transition-all duration-150
                hover:scale-105 hover:shadow-2xl
                active:scale-110 active:shadow-xl
                cursor-pointer
                ${disabled ? "opacity-80 cursor-not-allowed" : ""}
              `}
              onClick={() => {
                if (disabled) return;
                handleTestClick(item);
              }}
            >
              <div>
                <div className="text-2xl font-extrabold">
                  {item.label[selectedLanguage.code as keyof typeof item.label]}
                </div>
                <div className="text-xl text-gray-600 font-normal mt-1">
                  {item.sub}
                </div>
              </div>
              <img src={item.icon} alt="" className="w-10 h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestSyringe;
