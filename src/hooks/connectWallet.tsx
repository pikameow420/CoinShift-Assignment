import React, { useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { useIsLoggedIn, useDynamicContext } from '@dynamic-labs/sdk-react-core';

interface ConnectWalletProps {
  handleStepAdvance: () => void;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ handleStepAdvance }) => {
  const { setShowAuthFlow } = useDynamicContext();
  const isLoggedIn = useIsLoggedIn();

  useEffect(() => {
    if (isLoggedIn && handleStepAdvance !== undefined) {
      handleStepAdvance();
    }
  }, [isLoggedIn, handleStepAdvance]);

  const connectWallet = () => {
    setShowAuthFlow(true);
  };

  return (
    <Button color='primary' onClick={connectWallet}>
      {isLoggedIn ? 'Connected' : 'Connect Wallet'}
    </Button>
  );
}

export default ConnectWallet;