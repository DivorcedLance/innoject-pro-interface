import { useState } from 'react';
import { useNumpad } from '../contexts/useNumpad';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import playIcon from '../assets/play.svg';
import dropletBlue from '../assets/droplet-blue.svg';
import dropletYellow from '../assets/droplet-yellow.svg';
import dropletsBlue from '../assets/droplets-blue.svg';
import dropletsYellow from '../assets/droplets-yellow.svg';

const BG = "bg-[#BDE6F3]";
const INPUT_SIZE = "w-[140px] h-[100px] text-4xl";

const testList = [
  { label: 'Test 3-4-5', sub: 'SINGOL', icon: dropletBlue },
  { label: 'Test 1-2', sub: 'SINGOL', icon: dropletYellow },
  { label: 'Test 3-4-5', sub: 'DOSE', icon: dropletsBlue },
  { label: 'Test 1-2', sub: 'DOSE', icon: dropletsYellow },
];

const TestSyringe = () => {
  const { openNumpad } = useNumpad();
  const navigate = useNavigate();
  const [shots, setShots] = useState('13');

  const openNumpadForShots = () => {
    openNumpad({
      initialValue: shots,
      side: 'left',
      onEnter: setShots,
    });
  };

  return (
    <div className="w-[1338px] h-[768px] flex flex-col bg-white overflow-hidden" style={{ boxSizing: 'content-box' }}>
      {/* Barra superior */}
      <div className="flex items-center bg-gray-200 h-[90px] px-8 py-20 justify-between shadow">
        <button
          onClick={() => navigate('/')}
          className="focus:outline-none cursor-pointer transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1"
        >
          <img src={homeIcon} alt="Home" className="w-16 h-16" />
        </button>
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto select-none">TEST SYRINGE</span>
        <span className="w-24"></span>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-row items-center justify-center mt-6 gap-8">
        {/* Lista de tests */}
        <div className={`${BG} rounded-[40px] px-12 py-8 flex flex-col gap-4 items-center min-w-[460px] shadow-xl`}>
          {testList.map((item, idx) => (
            <div
              key={idx}
              className={`
                flex items-center justify-between bg-white rounded-2xl px-10 py-6 min-w-[330px] w-full shadow
                transition-all duration-150
                hover:scale-105 hover:shadow-2xl
                active:scale-110 active:shadow-xl
                cursor-pointer
              `}
            >
              <div>
                <div className="text-2xl font-extrabold">{item.label}</div>
                <div className="text-xl text-gray-600 font-normal mt-1">{item.sub}</div>
              </div>
              <img src={item.icon} alt="" className="w-10 h-10" />
            </div>
          ))}
        </div>

        {/* Syringes Cleaning */}
        <div className={`${BG} rounded-[40px] px-12 py-8 flex flex-col items-center min-w-[460px] shadow-xl`}>
          <span className="text-3xl font-bold mb-8">SYRINGES CLEANING</span>
          <div className="flex flex-row items-center mb-8 gap-3">
            <div className='border-4 border-white rounded-3xl p-1 shadow transition-transform duration-150 hover:scale-110 active:scale-115 active:translate-y-1'>
              <input
                className={`
                  rounded-2xl bg-white font-extrabold text-center ${INPUT_SIZE} cursor-pointer focus:outline-none
                  border-[6px] border-white
                  transition-all duration-200
                  hover:border-blue-400 hover:scale-105
                  active:scale-105 active:border-blue-600
                  shadow
                `}
                value={shots}
                readOnly
                onClick={openNumpadForShots}
              />
            </div>
            <span className="text-2xl font-normal">shots</span>
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
            <span className="mr-6 ml-4">START</span>
            <img src={playIcon} alt="Start" className="w-10 h-10" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestSyringe;
