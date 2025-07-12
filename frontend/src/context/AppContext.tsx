import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IAppContextType, IGlobalState } from './types';

const AppContext = createContext<IAppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [globalState, setGlobalState] = useState<IGlobalState>({
    user: null,
  });
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <AppContext.Provider value={{ globalState, setGlobalState, theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to easily consume AppContext values
export const useAppContext = (): IAppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
