// components/Numpad.tsx
import { useState } from 'react';
import { CheckIcon } from './icons/Check';
import { BackSpaceIcon } from './icons/BackSpace';
import { ArrowPointIcon } from './icons/ArrowPoint';
import { motion, AnimatePresence } from 'framer-motion';

const ANIMATION_DURATION = 0.15; // segundos

interface NumpadProps {
  onClose: () => void;
  initialValue?: string;
  onEnter: (value: string) => void;
  side?: 'left' | 'right';
}

const Numpad = ({
  onClose,
  initialValue,
  onEnter,
  side = 'right',
}: NumpadProps) => {

  // Framer Motion variants
  const variants = {
    initial: { x: side === 'left' ? '-100%' : '100%', opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: ANIMATION_DURATION } },
    exit:    { x: side === 'left' ? '-100%' : '100%', opacity: 0, transition: { duration: ANIMATION_DURATION * 0.7 } },
  };

  const [input, setInput] = useState(initialValue ?? '');
  const [cursor, setCursor] = useState((initialValue ?? '').length);

  // Inserta en la posición del cursor
  const insertAtCursor = (value: string) => {
    const left = input.slice(0, cursor);
    const right = input.slice(cursor);
    setInput(left + value + right);
    setCursor(cursor + value.length);
    console.log(`Pressed: ${value}`);
  };

  // Borra a la izquierda del cursor (como Backspace)
  const handleDelete = () => {
    if (cursor === 0) return;
    const left = input.slice(0, cursor - 1);
    const right = input.slice(cursor);
    setInput(left + right);
    setCursor(cursor - 1);
    console.log('DEL');
  };

  // Limpia todo
  const handleClear = () => {
    setInput('');
    setCursor(0);
    console.log('CLR');
  };

  // Enter
  const handleEnter = () => {
    console.log('ENT:', input);
    onEnter(input);
  };

  // Cambia de signo solo si hay un número válido
  const handleToggleSign = () => {
    if (input.startsWith('-')) {
      setInput(input.slice(1));
      setCursor(Math.max(cursor - 1, 0));
    } else {
      setInput('-' + input);
      setCursor(cursor + 1);
    }
    console.log('+/-');
  };

  // Punto decimal solo si no hay otro en el número actual
  const handleDot = () => {
    if (!input.includes('.')) insertAtCursor('.');
    else console.log('Intento de agregar punto ignorado');
  };

  // Mueve el cursor
  const moveCursor = (delta: number) => {
    let newPos = cursor + delta;
    newPos = Math.max(0, Math.min(input.length, newPos));
    setCursor(newPos);
    console.log(delta < 0 ? 'LEFT' : 'RIGHT');
  };

  // Renderiza el contenido y el cursor visualmente
  const renderInputWithCursor = () => {
    const before = input.slice(0, cursor);
    const after = input.slice(cursor);
    return (
      <span>
        {before}
        <span className="inline-block w-0.5 h-18 align-middle bg-blue-600 animate-pulse mx-0.5" />
        {after}
      </span>
    );
  };

  return (
    <div className="absolute inset-0 z-50 w-full h-full bg-black/30 select-none">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Cerrar Numpad"
        tabIndex={-1}
      />
        <AnimatePresence>
          <motion.div
            key="numpad"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
            // Pegado a derecha o izquierda
            className={`
              w-140 absolute top-0 ${side === 'left' ? 'left-0' : 'right-0'}
              h-full bg-white rounded-none
              flex flex-col justify-center shadow-xl
            `}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-140 h-full flex flex-col items-center justify-center">

              <div className="w-full h-full p-2 px-4 pb-4 bg-white select-none flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-5xl font-light">Numeric Keypad</div>
                  <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9, rotate: -90 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    onClick={onClose}
                    className="text-gray-400 hover:text-red-500 text-5xl font-bold rounded-full w-24 h-24 flex items-center justify-center transition duration-10"
                    aria-label="Cerrar"
                  >
                    ×
                  </motion.button>
                  </div>
                </div>

                {/* Input visual */}
                <div
                  className="w-full border-b-2 border-blue-200 text-7xl p-2 mb-4 h-24 flex items-center overflow-x-auto font-mono cursor-pointer"
                  tabIndex={0}
                  onClick={() => {
                    // Posicionar el cursor: simple, siempre al final
                    setCursor(input.length);
                  }}
                >
                  {input.length === 0}
                  {renderInputWithCursor()}
                </div>

                <div className="flex flex-row gap-2 justify-center pt-14">
                  {/* Left Panel */}
                  <div className="grid grid-cols-3 gap-2">
                    {['1','2','3','4','5','6','7','8','9','+/-','0','.'].map(val => (
                      <button
                        key={val}
                        onClick={() => {
                          if (val === '+/-') handleToggleSign();
                          else if (val === '.') handleDot();
                          else insertAtCursor(val);
                        }}
                        className="bg-gray-200 rounded-full w-24 h-24 text-4xl font-medium hover:bg-gray-300 active:scale-95 transition"
                      >
                        {val}
                      </button>
                    ))}
                  </div>

                  {/* Right Panel */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={handleDelete}
                      className="col-span-2 bg-blue-200 rounded-full h-24 text-xl font-bold hover:bg-blue-300 active:scale-95 transition"
                    >
                      <div className="flex items-center justify-center">
                        <span className="mr-2">DEL</span>
                        <BackSpaceIcon className="w-6 h-6" />
                      </div>
                    </button>
                    
                    <div className="col-span-2 flex items-center justify-between">
                      <button
                        onClick={() => moveCursor(-1)}
                        className="bg-blue-200 rounded-full w-24 h-24 hover:bg-blue-300 active:scale-95 transition"
                      >
                        <div className="flex items-center justify-center">
                          <ArrowPointIcon className="w-6 h-6" />
                        </div>
                      </button>
                      <button
                        onClick={() => moveCursor(1)}
                        className="bg-blue-200 rounded-full w-24 h-24 hover:bg-blue-300 active:scale-95 transition"
                      >
                        <div className="flex items-center justify-center">
                          <ArrowPointIcon className="w-6 h-6 transform rotate-180" />
                        </div>
                      </button>
                    </div>

                    <button
                      onClick={handleClear}
                      className="col-span-2 bg-[#EFD8B3] rounded-full h-24 text-xl font-bold hover:bg-[#eacc9b] active:scale-95 transition"
                    >
                      CLR
                    </button>

                    <button
                      onClick={handleEnter}
                      className="col-span-2 bg-green-300 rounded-full h-24 text-xl font-bold hover:bg-green-400 active:scale-95 transition"
                    >
                      <div className="flex items-center justify-center">
                        <span className="mr-2">ENT</span>
                        <CheckIcon className="w-6 h-6" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default Numpad;
