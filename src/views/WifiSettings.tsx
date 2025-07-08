import { useState } from 'react';
import { useNumpad } from '../contexts/useNumpad';
import { useNavigate } from 'react-router-dom';
import homeIcon from '../assets/home.svg';
import penIcon from '../assets/pen.svg';
import searchIcon from '../assets/search.svg';

const WIFI_BG = "bg-[#BDE6F3]";
const INPUT_SIZE = "w-[140px] h-[68px] text-3xl";

const WifiSettings = () => {
  const { openNumpad } = useNumpad();
  const navigate = useNavigate();

  const [ipA, setIpA] = useState('1234');
  const [ipB, setIpB] = useState('1234');
  const [ipC, setIpC] = useState('1234');
  const [ipD, setIpD] = useState('1234');

  const [readA] = useState('1234');
  const [readB] = useState('1234');
  const [readC] = useState('1234');
  const [readD] = useState('1234');

  const openNumpadFor = (
    current: string,
    setter: (value: string) => void,
    side: 'left' | 'right' = 'right'
  ) => {
    openNumpad({
      initialValue: current,
      side,
      onEnter: setter,
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
        <span className="text-5xl font-extrabold text-gray-900 tracking-wide mx-auto select-none">WIFI SETTINGS</span>
        <span className="w-24"></span>
      </div>

      {/* Escribir IP */}
      <div className="flex flex-row items-center justify-center mt-12 gap-8">
        <div className={`${WIFI_BG} rounded-[40px] px-12 py-8 flex flex-col items-center min-w-[700px] shadow-xl`}>
          <span className="text-3xl font-bold mb-8">Write IP-Address</span>
          <div className="flex flex-row gap-6">
            {[ipA, ipB, ipC, ipD].map((val, idx) => (
              <input
                key={idx}
                className={`
                  rounded-2xl bg-white font-bold text-center ${INPUT_SIZE} cursor-pointer 
                  focus:outline-none border-4 border-transparent
                  transition-all duration-200
                  hover:border-blue-400 hover:scale-105
                  active:scale-110 active:border-blue-600
                  shadow
                `}
                value={val}
                readOnly
                onClick={() => openNumpadFor(val, [setIpA, setIpB, setIpC, setIpD][idx], idx <= 1 ? 'right' : 'left')}
              />
            ))}
          </div>
        </div>

        {/* Botón Write */}
        <div className="flex flex-col items-center ml-8 mt-8">
          <button
            className={`
              bg-white rounded-full p-6 mb-2 shadow-xl
              focus:outline-none transition-all duration-150
              hover:bg-gray-100 hover:scale-110
              active:bg-gray-200 active:scale-115 active:translate-y-1
            `}
          >
            <img src={penIcon} alt="Write" className="w-10 h-10" />
          </button>
          <span className="text-lg mt-2 font-medium select-none">Write</span>
        </div>
      </div>

      {/* Leer IP */}
      <div className="flex flex-row items-center justify-center mt-12 gap-8">
        <div className='rounded-[40px] px-12 py-8 flex flex-col items-center min-w-[700px] shadow-xl'>
          <span className="text-3xl font-semibold mb-8">Read IP-Address</span>
          <div className="flex flex-row gap-6">
            {[readA, readB, readC, readD].map((val, idx) => (
              <div key={idx} className={`
                flex flex-col items-center ${INPUT_SIZE}
                transition-all duration-200
                hover:scale-105
                `}>
                <span className="text-3xl font-bold">{val}</span>
                <span className="w-[88px] h-[7px] rounded bg-[#BDE6F3] mt-2 block"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Read */}
        <div className="flex flex-col items-center ml-8 mt-8">
          <button
            className={`
              bg-white rounded-full p-6 mb-2 shadow-xl
              focus:outline-none transition-all duration-150
              hover:bg-gray-100 hover:scale-110
              active:bg-gray-200 active:scale-115 active:translate-y-1
            `}
          >
            <img src={searchIcon} alt="Read" className="w-10 h-10" />
          </button>
          <span className="text-lg mt-2 font-medium select-none">Read</span>
        </div>
      </div>
    </div>
  );
};

export default WifiSettings;
