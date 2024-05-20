import React, { useState, useEffect } from "react";
import { initializeWeb3Modal } from "../lib/web3ModalConfig";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import Step2 from "../components/steps/Step2";
import Step1 from "../components/steps/Step1";
import Stepper from "../components/ui/Stepper";
import Step3 from "../components/steps/Step3";
import { useCreateSafeWallet } from "../hooks/createSafeWallet"; // Import the hook

const Home: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const { createSafeWallet, safeAddress } = useCreateSafeWallet();

  useEffect(() => {
    const initialize = async () => {
      await initializeWeb3Modal();
      setIsInitialized(true);
    };

    initialize();
  }, []);

  const handleStepAdvance = () => {
    setOnboardingStep(onboardingStep + 1);
  };

  const handleCreateSafeWallet = async () => {
    const safeAddr = await createSafeWallet();
    if (safeAddr) {
      setOnboardingStep(3);
    } else {
      console.error("Safe deployment was rejected or failed");
    }
  };

  const Step1Props = {
    setAddress,
    setChainId,
    setIsConnected,
    handleStepAdvance,
  };

  const Step2Props = {
    isConnected,
    chainId,
    address,
    handleCreateSafeWallet,
  };

  const Step3Props = {
    safeAddress,
  };

  if (!isInitialized) {
    return <div>Loading...</div>; // Show a loading state while initializing
  }

  return (
    <div className="app-container mx-auto p-6">
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <div className={`step-circle bg-black text-white w-10 h-10 rounded-full flex items-center justify-center `}>C</div>
          <CardTitle>Coinshift Personal</CardTitle>
        </div>
        <hr className="mb-4" />
        <CardContent>
          <Stepper currentStep={onboardingStep} />
          {onboardingStep === 1 && <Step1 {...Step1Props} />}
          {onboardingStep === 2 && <Step2 {...Step2Props} />}
          {onboardingStep === 3 && <Step3 {...Step3Props} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
