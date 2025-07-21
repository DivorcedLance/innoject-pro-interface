import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import homeIcon from "../assets/home.svg";
import dropletBlue from "../assets/droplet-blue.svg";
import dropletYellow from "../assets/droplet-yellow.svg";
import dropletsBlue from "../assets/droplets-blue.svg";
import dropletsYellow from "../assets/droplets-yellow.svg";
import { useToast } from "../contexts/useToast";
import { useState } from "react";

const BG = "bg-[#BDE6F3]";

const testList = [
  {
    labelKey: "testSyringe.test345",
    sub: "SINGOL",
    icon: dropletBlue,
  },
  {
    labelKey: "testSyringe.test12",
    sub: "SINGOL",
    icon: dropletYellow,
  },
  {
    labelKey: "testSyringe.test345",
    sub: "DOSE",
    icon: dropletsBlue,
  },
  {
    labelKey: "testSyringe.test12",
    sub: "DOSE",
    icon: dropletsYellow,
  },
];

const TestSyringe = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [disabled, setDisabled] = useState(false);

  const handleTestClick = async (item: (typeof testList)[number]) => {
    showToast({
      message: `${t('testSyringe.startingTest')}: ${t(item.labelKey)} (${item.sub})`,
      type: "info",
      duration: 2000,
      position: "bottom-center",
    });

    setDisabled(true);
    await new Promise((resolve) =>
      setTimeout(resolve, item.sub === "SINGOL" ? 3000 : 5000)
    );

    showToast({
      message: `${t('testSyringe.testCompleted')}: ${t(item.labelKey)} (${item.sub})`,
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
          {t('testSyringe.title')}
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
                  {t(item.labelKey)}
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
