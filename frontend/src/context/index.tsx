import React from 'react';

export const AppContext = React.createContext<Record<string, unknown> | null>(null);

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
