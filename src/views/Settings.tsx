import { useState } from 'react';
import { useNumpad } from '../contexts/useNumpad';
import { useNavigate } from 'react-router-dom';

import homeIcon from '../assets/home.svg';
import resetIcon from '../assets/reset.svg';
import arrowLeftIcon from '../assets/arrow-left.svg';
import arrowRightIcon from '../assets/arrow-right.svg';
import keyIcon from '../assets/key.svg';
import testIcon from '../assets/test.svg';

const BG = "bg-[#BDE6F3]";
const BOX = `${BG} rounded-[40px] px-8 py-6 flex flex-col items-center w-[420px] h-[260px]`;
const INPUT_STYLE = "rounded-full bg-white font-extrabold text-center text-5xl w-[210px] h-[92px] cursor-pointer border-none focus:outline-none";
const RESET_BTN = "absolute bottom-5 right-7 w-10 h-10 cursor-pointer hover:scale-110 active:scale-105 transition";

// Para la página 4:
const BOX_BIG = `${BG} rounded-[40px] px-10 py-6 flex flex-col items-center w-[470px]`;
const LABEL = "text-2xl font-semibold text-center mb-3";
const BIG_INPUT = "rounded-full bg-white font-extrabold text-center text-5xl w-[320px] h-[78px] cursor-pointer border-none focus:outline-none";

type Setting = {
  label: string;
  suffix?: string;
  value: string;
  setValue: (v: string) => void;
  side: 'left' | 'right';
};

const page1Settings = (
  shots1: string, setShots1: (v: string) => void,
  shots2: string, setShots2: (v: string) => void,
  shots3: string, setShots3: (v: string) => void,
  shots4: string, setShots4: (v: string) => void,
): Setting[] => [
  {
    label: 'Delay Press',
    suffix: 'Sec.',
    value: shots1,
    setValue: setShots1,
    side: 'right',
  },
  {
    label: 'Delay Injection Only Vacc. 1-2',
    suffix: 'Sec.',
    value: shots2,
    setValue: setShots2,
    side: 'left',
  },
  {
    label: 'Delay Injection Water Base/ Spray 3-4-5',
    suffix: 'Sec.',
    value: shots3,
    setValue: setShots3,
    side: 'right',
  },
  {
    label: 'Timing Injection 1-2',
    suffix: 'Sec.',
    value: shots4,
    setValue: setShots4,
    side: 'left',
  },
];

const page2Settings = (
  shots5: string, setShots5: (v: string) => void,
  shots6: string, setShots6: (v: string) => void,
  shots7: string, setShots7: (v: string) => void,
  shots8: string, setShots8: (v: string) => void,
): Setting[] => [
  {
    label: 'Timing Injection 3-4-5',
    suffix: 'Sec.',
    value: shots5,
    setValue: setShots5,
    side: 'right',
  },
  {
    label: 'Delay Needles Exit',
    suffix: 'Sec.',
    value: shots6,
    setValue: setShots6,
    side: 'left',
  },
  {
    label: 'Buzzer',
    suffix: 'Sec.',
    value: shots7,
    setValue: setShots7,
    side: 'right',
  },
  {
    label: 'Delay Closing Drop Chute',
    suffix: 'Sec.',
    value: shots8,
    setValue: setShots8,
    side: 'left',
  },
];

const page3Settings = (
  shots9: string, setShots9: (v: string) => void,
  shots10: string, setShots10: (v: string) => void,
): Setting[] => [
  {
    label: 'Time Closing Drop Chute',
    suffix: 'Sec.',
    value: shots9,
    setValue: setShots9,
    side: 'right',
  },
  {
    label: 'Number Chicks Per Box',
    suffix: 'Sec.',
    value: shots10,
    setValue: setShots10,
    side: 'left',
  },
];

const Settings = () => {
  const navigate = useNavigate();
  const { openNumpad } = useNumpad();

  // Estados para cada valor de las páginas 1-3
  const [shots1, setShots1] = useState('12.34');
  const [shots2, setShots2] = useState('12.34');
  const [shots3, setShots3] = useState('12.34');
  const [shots4, setShots4] = useState('12.34');
  const [shots5, setShots5] = useState('12.34');
  const [shots6, setShots6] = useState('12.34');
  const [shots7, setShots7] = useState('12.34');
  const [shots8, setShots8] = useState('12.34');
  const [shots9, setShots9] = useState('12.34');
  const [shots10, setShots10] = useState('12.34');

  // Estados para la página 4 (Needles Disinfection)
  const [cycleCounter, setCycleCounter] = useState('123456791');
  const [disinfectionCycle, setDisinfectionCycle] = useState('123456791');
  const [timer, setTimer] = useState('12.3');

  // Switches (Page 3)
  const [enable1, setEnable1] = useState(false);
  const [enable2, setEnable2] = useState(false);

  const [page, setPage] = useState(1);

  // Configura cada página
  let settings: Setting[] = [];
  if (page === 1) settings = page1Settings(shots1, setShots1, shots2, setShots2, shots3, setShots3, shots4, setShots4);
  if (page === 2) settings = page2Settings(shots5, setShots5, shots6, setShots6, shots7, setShots7, shots8, setShots8);
  if (page === 3) settings = page3Settings(shots9, setShots9, shots10, setShots10);

  // Abre el teclado por el lado adecuado
  const openInputNumpad = (value: string, setter: (v: string) => void, side: 'left' | 'right') => {
    openNumpad({
      initialValue: value,
      side,
      onEnter: setter,
    });
  };

  return (
    <div className="w-[1338px] h-[768px] flex flex-col bg-white overflow-hidden" style={{ boxSizing: 'content-box' }}>
      {/* Barra superior */}
      <div className="flex items-center bg-gray-200 h-[90px] px-8 py-20 justify-between">
        <div className="flex flex-row items-center gap-8">
          {page > 1 && (
            <button onClick={() => setPage(page - 1)} className="focus:outline-none cursor-pointer">
              <img src={arrowLeftIcon} alt="Prev" className="w-16 h-16" />
            </button>
          )}
          <button onClick={() => navigate('/')} className="focus:outline-none cursor-pointer">
            <img src={homeIcon} alt="Home" className="w-16 h-16" />
          </button>
        </div>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto">
          {page === 4 ? "NEEDLES DISINFECTION" : `SETUP - PAGE ${page}`}
        </span>
        <div className="flex flex-row items-center gap-8">
          {page < 4 && (
            <button onClick={() => setPage(page + 1)} className="focus:outline-none cursor-pointer">
              <img src={arrowRightIcon} alt="Next" className="w-16 h-16" />
            </button>
          )}
          {/* Llave abajo derecha solo en page 3 */}
        </div>
      </div>

      {/* Contenido */}
      {page <= 3 && (
        <div className={`flex-1 flex flex-col items-center justify-center gap-10 pt-2 relative`}>
          <div className="grid grid-cols-2 gap-x-16 gap-y-10">
            {settings.map((setting, idx) => (
              <div key={idx} className="relative">
                <div className={BOX}>
                  {/* Altura fija para el label */}
                  <span className="text-2xl font-semibold text-center mb-3 h-[56px] flex items-center justify-center">
                    {setting.label}
                  </span>
                  <div className="flex flex-row items-center gap-3 mt-2 w-full">
                    <input
                      className={INPUT_STYLE + " w-32 flex-shrink-0"}
                      value={setting.value}
                      readOnly
                      onClick={() => openInputNumpad(setting.value, setting.setValue, setting.side)}
                    />
                    <span className="text-2xl font-normal min-w-[32px] text-center">
                      {setting.suffix}
                    </span>
                    <div className="flex-1"></div>
                    <button
                      onClick={() => setting.setValue('0')}
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
                  label="Enable Injection 1-2"
                  checked={enable1}
                  onChange={setEnable1}
                />
                <SettingSwitch
                  label="Enable Injection 3-4-5"
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
          <div className="flex flex-col gap-4 items-center">
            {/* Counter */}
            <div className={BOX_BIG}>
              <span className={LABEL}>Cycle Counter</span>
              <input
                className={BIG_INPUT}
                value={cycleCounter}
                readOnly
                onClick={() => openNumpad({ initialValue: cycleCounter, side: 'right', onEnter: setCycleCounter })}
              />
            </div>
            {/* Disinfection Cycle */}
            <div className={BOX_BIG}>
              <span className={LABEL}>Disinfection Cycle</span>
              <div className="flex flex-row items-center">
                <input
                  className={BIG_INPUT}
                  value={disinfectionCycle}
                  readOnly
                  onClick={() => openNumpad({ initialValue: disinfectionCycle, side: 'right', onEnter: setDisinfectionCycle })}
                />
                <span className="ml-5 text-2xl font-normal">Num.</span>
              </div>
            </div>
            {/* Timer */}
            <div className={BOX_BIG}>
              <span className={LABEL}>Disinfection Timer</span>
              <div className="flex flex-row items-center">
                <input
                  className={BIG_INPUT}
                  value={timer}
                  readOnly
                  onClick={() => openNumpad({ initialValue: timer, side: 'right', onEnter: setTimer })}
                />
                <span className="ml-5 text-2xl font-normal">Sec.</span>
              </div>
            </div>
          </div>

          {/* Botón TEST */}
          <div className="flex flex-col items-center">
            <button className="bg-[#54AFFF] border-6 border-[#BDE6F3] rounded-[32px] w-[270px] h-[200px] flex flex-col items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition">
              <img src={testIcon} alt="Test" className="w-28 h-28" />
              <span className="text-3xl text-white font-bold tracking-wider">TEST</span>
            </button>
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
}: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-row items-center justify-between bg-gray-300 rounded-3xl px-10 py-6 text-2xl font-semibold w-full max-w-[640px] mx-auto">
      <span>{label}</span>
      <div
        className="flex items-center cursor-pointer ml-10"
        onClick={() => onChange(!checked)}
      >
        <div
          className={`relative w-[120px] h-[46px] rounded-full border-2 transition
            ${checked ? 'bg-blue-400 border-blue-500' : 'bg-gray-200 border-gray-400'}
          `}
        >
            {/* Texto ON (izquierda) */}
            <span
              className={`
              absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold transition select-none
              ${checked ? 'text-white' : 'text-transparent'}
              pointer-events-none
              `}
            >
              ON
            </span>
            {/* Texto OFF (derecha) */}
            <span
              className={`
              absolute right-4 top-1/2 -translate-y-1/2 text-lg font-bold transition select-none
              ${!checked ? 'text-gray-700' : 'text-transparent'}
              pointer-events-none
              `}
            >
              OFF
            </span>
          {/* Círculo */}
          <div
            className={`absolute left-1 rounded-full bg-white w-[40px] h-[40px] shadow-md transition-transform
              ${checked ? 'translate-x-[70px]' : ''}
            `}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
