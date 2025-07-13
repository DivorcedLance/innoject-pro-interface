// components/Counter.tsx
import React from "react";
import { useRef, useState, useEffect } from "react";
import { ResetIcon } from "./icons/Reset";

interface CounterProps {
  label: string;
  count: number | string;
  onReset?: () => void;
}

export const Counter: React.FC<CounterProps> = ({ label, count, onReset }) => {
  const [isHolding, setIsHolding] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseDown = () => {
    setIsHolding(true);
    timeoutRef.current = setTimeout(() => {
      if (onReset) onReset();
      setIsHolding(false);
    }, 5000);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // También limpia el timer cuando el mouse sale del botón
  const handleMouseLeave = () => {
    setIsHolding(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#D9D9D9] rounded-3xl p-6 w-[340px] h-[370px] shadow-sm relative">
      <div className="text-3xl text-black font-medium mt-8 text-center">
        {label}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-2xl flex items-center justify-center w-[260px] h-[110px]">
          <span className="text-6xl font-extrabold tracking-wide">{count}</span>
        </div>
      </div>
      {onReset && (
        <button
          className={`absolute bottom-6 right-6 w-9 h-9 flex items-center justify-center text-gray-700 hover:text-black transition-all duration-200 ${
            isHolding ? "bg-gray-200 rounded-full scale-95" : ""
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          aria-label="Reset"
        >
          <ResetIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
