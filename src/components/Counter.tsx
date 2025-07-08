// components/Counter.tsx
import React from 'react';
import { ResetIcon } from './icons/Reset';

interface CounterProps {
  label: string;
  count: number | string;
  onReset: () => void;
}

export const Counter: React.FC<CounterProps> = ({ label, count, onReset }) => (
  <div className="flex flex-col items-center bg-[#D9D9D9] rounded-3xl p-6 w-[340px] h-[370px] shadow-sm relative">
    <div className="text-3xl text-black font-medium mt-8 text-center">{label}</div>
    <div className="flex-1 flex items-center justify-center">
      <div className="bg-white rounded-2xl flex items-center justify-center w-[260px] h-[110px]">
        <span className="text-6xl font-extrabold tracking-wide">{count}</span>
      </div>
    </div>
    <button
      className="absolute bottom-6 right-6 w-9 h-9 flex items-center justify-center text-gray-700 hover:text-black"
      onClick={onReset}
      aria-label="Reset"
    >
      <ResetIcon className="w-6 h-6" />
    </button>
  </div>
);
