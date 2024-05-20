import { defaultConfig, createWeb3Modal } from '@web3modal/ethers/react';

// Project details and configurations
const projectId = '532f359b682d4f20f433f45f65855bdf';
const testnet = {
  chainId: 11155111,
  name: 'Sepolia Testnet',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://eth-sepolia.public.blastapi.io',
};
const metadata = {
  name: 'CoinShift Assignment',
  description: 'Creating a simple onboarding flow for CoinShift Assignment',
  url: 'https://mywebsite.com',
  icons: ['https://avatars.mywebsite.com/']
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  rpcUrl: 'https://eth-sepolia.public.blastapi.io',
});

export const initializeWeb3Modal = () => {
  createWeb3Modal({
    ethersConfig,
    chains: [testnet],
    projectId,
    enableAnalytics: true
  });
};
