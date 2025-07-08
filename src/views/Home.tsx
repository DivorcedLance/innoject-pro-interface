import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Counter } from '../components/Counter';
import msdLogo from '../assets/msd-animal-health-logo.png';
import syringeIcon from '../assets/syringe.svg';
import wifiIcon from '../assets/wifi.svg';
import gearIcon from '../assets/settings.svg';

const SCREEN_WIDTH = 1338;
const SCREEN_HEIGHT = 768;

const Home = () => {
  const [partial, setPartial] = useState(12345);
  const [daily, setDaily] = useState(12345);
  const [total, setTotal] = useState(12345);

  const navigate = useNavigate();

  return (
    <div
      className={`
        w-[${SCREEN_WIDTH}px] h-[${SCREEN_HEIGHT}px]
        bg-white mx-auto my-0
        flex flex-col overflow-hidden
      `}
      style={{ boxSizing: 'content-box' }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-8 pt-4 pb-2">
        <div className="flex flex-col items-start">
          <img src={msdLogo} alt="MSD Logo" className="w-60 mb-2" />
        </div>
        <div className="text-5xl font-extrabold text-right pt-2 pr-2">
          Innoject Pro
        </div>
      </div>

      {/* Counters */}
      <div className="flex justify-center items-start gap-8 mt-8 flex-1">
        <Counter label="Partial Counter" count={partial} onReset={() => setPartial(0)} />
        <Counter label="Daily Counter" count={daily} onReset={() => setDaily(0)} />
        <Counter label="Total Counter" count={total} onReset={() => setTotal(0)} />
      </div>

      {/* Footer Menu */}
      <div className="w-full bg-gray-200 flex justify-self-start gap-16 pl-16 items-center py-6">
        <button
          onClick={() => navigate('/settings')}
          aria-label="Settings"
          className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={gearIcon} alt="Settings" className="w-20 h-20" />
        </button>
        <button
          onClick={() => navigate('/wifi')}
          aria-label="Wifi Settings"
          className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={wifiIcon} alt="WiFi" className="w-20 h-20" />
        </button>
        <button
          onClick={() => navigate('/testsyringe')}
          aria-label="Test Syringe"
          className="p-4 rounded focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={syringeIcon} alt="Syringe" className="w-20 h-20" />
        </button>
      </div>
    </div>
  );
};

export default Home;
