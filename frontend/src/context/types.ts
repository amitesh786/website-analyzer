import React from 'react';

// Represents the global state stored in the context, including user info and crawl stats
export interface IGlobalState {
  user: string | null;
}

// Defines the shape of the app context, including state and updater functions
export interface IAppContextType {
  globalState: IGlobalState;
  setGlobalState: React.Dispatch<React.SetStateAction<IGlobalState>>;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}
