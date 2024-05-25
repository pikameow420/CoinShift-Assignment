import React, { createContext, useState, useEffect } from 'react';
import { useWeb3Modal, useWeb3ModalAccount } from '@web3modal/ethers/react';

interface WalletContextProps {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  connectWallet: () => void;
}

export const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open } = useWeb3Modal();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletChainId, setWalletChainId] = useState<number | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false);

  useEffect(() => {
    setWalletAddress(address ?? null);
    setWalletChainId(chainId ?? null);
    setWalletIsConnected(isConnected);
  }, [address, chainId, isConnected]);

  const connectWallet = async () => {
    await open();
  };

  return (
    <WalletContext.Provider value={{ address: walletAddress, chainId: walletChainId, isConnected: walletIsConnected, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
