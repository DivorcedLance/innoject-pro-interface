// contexts/NumpadProvider.tsx

import { useState } from 'react';
import type { ReactNode } from 'react';
import Numpad from '../components/Numpad';
import { NumpadContext } from './NumpadContext';
import type { NumpadOptions } from './NumpadContext';

export const NumpadProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<NumpadOptions | null>(null);

  const openNumpad = (opts: NumpadOptions) => setOptions(opts);
  const handleClose = () => setOptions(null);

  return (
    <NumpadContext.Provider value={{ openNumpad }}>
      {children}
      {options && <Numpad
            initialValue={options.initialValue}
            onEnter={value => {
              options.onEnter(value);
              handleClose();
            }}
            onClose={handleClose}
            side={options.side}
      />}
    </NumpadContext.Provider>
  );
};
