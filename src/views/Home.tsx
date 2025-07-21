import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Counter } from "../components/Counter";
import msdLogo from "../assets/msd-animal-health-logo.png";
import syringeIcon from "../assets/syringe.svg";
import languageIcon from "../assets/languages.svg";
//import wifiIcon from '../assets/wifi.svg';
import gearIcon from "../assets/settings.svg";
import { useToast } from "../contexts/useToast";
import { CheckCircle } from "lucide-react";
import { settingIcons } from "../components/icons/SettingsIcons";

const SCREEN_WIDTH = 1338;
const SCREEN_HEIGHT = 768;

const Home = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [partial, setPartial] = useState(5);
  const [daily, setDaily] = useState(1);
  const [total, setTotal] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setDaily((prev) => prev + 2);
      setTotal((prev) => prev + 2);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const showCustomToast = useCallback(() => {
    showToast({
      message: t('home.injectionReached', { count: daily }),
      icon: CheckCircle,
      type: "success",
      duration: 2000,
      position: "bottom-left",
    });
  }, [t, daily, showToast]);

  useEffect(() => {
    if (partial > 0 && daily % partial === 0) {
      showCustomToast();
    }
  }, [daily, partial, showCustomToast]);

  return (
    <div
      className={`
        w-[${SCREEN_WIDTH}px] h-[${SCREEN_HEIGHT}px]
        bg-white mx-auto my-0
        flex flex-col overflow-hidden relative
      `}
      style={{ boxSizing: "content-box" }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-4 pb-2">
        <div className="flex flex-col items-start">
          <img src={msdLogo} alt="MSD Logo" className="w-60 mb-2" />
        </div>
        <div className="text-5xl font-extrabold text-right pt-2 pr-2">
          {t('home.title')}
        </div>
      </div>

      {/* Counters */}
      <div className="flex justify-center items-start gap-8 mt-8 flex-1">
        <Counter
          label={t('home.partialCounter')}
          count={partial}
          onReset={() => setPartial(0)}
          icon={settingIcons.partialCounter}
        />
        <Counter
          label={t('home.dailyCounter')}
          count={daily}
          onReset={() => setDaily(0)}
          icon={settingIcons.dailyCounter}
        />
        <Counter
          label={t('home.totalCounter')}
          count={total}
          icon={settingIcons.totalCounter}
        />
      </div>

      {/* Footer Menu */}
      <div className="w-full bg-gray-200 flex justify-between pl-16 pr-16 items-center py-6">
        <div className="flex gap-16">
          <button
            onClick={() => navigate("/settings")}
            aria-label={t('common.settings')}
            className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
          >
            <img src={gearIcon} alt={t('common.settings')} className="w-20 h-20" />
          </button>
          {/*         <button
            onClick={() => navigate('/wifi')}
            aria-label="Wifi Settings"
            className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
          >
            <img src={wifiIcon} alt="WiFi" className="w-20 h-20" />
          </button> */}
          <button
            onClick={() => navigate("/testsyringe")}
            aria-label={t('common.test') + ' ' + t('common.syringe')}
            className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
          >
            <img src={syringeIcon} alt={t('common.syringe')} className="w-20 h-20" />
          </button>
        </div>
        <button
          onClick={() => navigate("/language")}
          aria-label={t('common.language')}
          className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={languageIcon} alt={t('common.language')} className="w-20 h-20" />
        </button>
      </div>
    </div>
  );
};

export default Home;
