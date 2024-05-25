import React, { useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import { useCreateSafeWallet } from "../hooks/createSafeWallet";

const Home: React.FC = () => {
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const { createSafeWallet, safeAddress } = useCreateSafeWallet();

  const handleStepAdvance = () => {
    setOnboardingStep(onboardingStep + 1);
  };

  const handleCreateSafeWallet = async () => {
    const safeAddr = await createSafeWallet();
    if (safeAddr) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      console.error("Safe deployment was rejected or failed");
    }
  };

  const Step1Props = { handleStepAdvance };
  const Step2Props = { handleCreateSafeWallet };
  const Step3Props = { safeAddress };

  return (
    <div className="app-container flex flex-row justify-center items-center gap-16 m-auto mt-20">
      <div>
        <Accordion variant="bordered" className="w-full" selectedKeys={`${onboardingStep}`}>
          <AccordionItem key="1" aria-label="Accordion 1" title="Step 1">
            Let's begin by connecting your wallet.
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Step 2">
            Now, let's create a CoinShift Account by deploying a Safe Wallet.
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Step 3">
            Voila! You can now mint your first NFT and become a part of our Waitlist.
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        {onboardingStep === 1 && <Step1 {...Step1Props} />}
        {onboardingStep === 2 && <Step2 {...Step2Props} />}
        {onboardingStep === 3 && <Step3 {...Step3Props} />}
      </div>
    </div>
  );
};

export default Home;
