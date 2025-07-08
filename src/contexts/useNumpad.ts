// contexts/useNumpad.ts

import { useContext } from 'react';
import { NumpadContext } from './NumpadContext';

export const useNumpad = () => {
  const context = useContext(NumpadContext);
  if (!context) throw new Error('useNumpad debe usarse dentro de <NumpadProvider>');
  return context;
};
