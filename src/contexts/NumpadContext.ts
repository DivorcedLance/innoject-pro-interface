// contexts/NumpadContext.ts

import { createContext } from 'react';

export type NumpadOptions = {
  initialValue?: string;
  side?: 'left' | 'right';
  onEnter: (value: string) => void;
};

export type NumpadContextType = {
  openNumpad: (options: NumpadOptions) => void;
};

export const NumpadContext = createContext<NumpadContextType | undefined>(undefined);
