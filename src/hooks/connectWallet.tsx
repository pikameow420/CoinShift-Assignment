import React, { useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { useWallet } from '../hooks/useWallet';

interface ConnectWalletProps {
  handleStepAdvance: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ handleStepAdvance }) => {
  const { connectWallet, isConnected, address } = useWallet();
  
  useEffect(() => {
    if (isConnected && handleStepAdvance !== undefined) {
      handleStepAdvance()
    }
  }, [isConnected]);

  return (
    <Button color='primary' onClick={connectWallet}>
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
}

export default ConnectWallet;
