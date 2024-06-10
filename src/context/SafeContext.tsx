import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCreateSafeWallet } from '../functions/createSafeWallet';
import { ethers } from 'ethers';

interface SafeContextType {
  createSafeWallet: () => Promise<string | null>;
  safeAddress: string | null;
}

const SafeContext = createContext<SafeContextType | undefined>(undefined);

export const SafeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { createSafeWallet, safeAddress } = useCreateSafeWallet();

  return (
    <SafeContext.Provider value={{createSafeWallet, safeAddress }}>
      {children}
    </SafeContext.Provider>
  );
};

export const useSafe = (): SafeContextType => {
  const context = useContext(SafeContext);
  if (!context) {
    throw new Error('useSafe must be used within a SafeProvider');
  }
  return context;
};
