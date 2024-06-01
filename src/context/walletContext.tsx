import React, { createContext, useState, useEffect } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface WalletContextProps {
  address: string | null;
  isConnected: boolean;
  connectWallet: () => void;
}

export const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { primaryWallet, setShowAuthFlow } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false);

  useEffect(() => {
    if (primaryWallet) {
      setWalletAddress(primaryWallet.address);
      setWalletIsConnected(true);
    } else {
      setWalletAddress(null);
      setWalletIsConnected(false);
    }
  }, [primaryWallet]);

  const connectWallet = async () => {
    setShowAuthFlow(true);
  };

  return (
    <WalletContext.Provider value={{ address: walletAddress, isConnected: walletIsConnected, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};