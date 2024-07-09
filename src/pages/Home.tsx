import React, { useContext, useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardFooter,
  CardHeader,
  Modal,
} from "@nextui-org/react";
import Step1 from "../components/steps/Step1";
import Step2 from "../components/steps/Step2";
import Step3 from "../components/steps/Step3";
import { useCreateSafeWallet } from "../functions/createSafeWallet";
import { OnRamperWidget } from "@/components/widget/OnRamperWidget";
import WidgetContext from "@/context/onRamperWidgetContext";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useCreateSmartWallet } from "./createSmartWallet";
 
const Home: React.FC = () => {
  const { walletConnector, primaryWallet } = useDynamicContext();
  const onramper_key = import.meta.env.VITE_APP_ONRAMPER;
 
  // const { isWidgetOpen } = useContext(OnRamperWidget);
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const { createSafeWallet } = useCreateSafeWallet();
  const { isWidgetOpen } = useContext(WidgetContext);
 
 
 
  const handleStepAdvance = () => {
    setOnboardingStep(onboardingStep + 1);
  };
 
  const handleCreateSafeWallet = async () => {
    const safeAddr = await useCreateSmartWallet();
    if (safeAddr) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      console.error("Safe deployment was rejected or failed");
    }
  };
 
  const handleCreateSmartWallet = async () => {
      const walletAddress = await useCreateSmartWallet(walletConnector, primaryWallet)
     if(walletAddress){
       console.log('Smart wallet created at address:', walletAddress);
     } 
    else {
      console.error('Error creating smart wallet:');
    }
  } 
 
  const safeAddress = "0xaddress";
 
  const Step1Props = { handleStepAdvance };
  const Step2Props = { handleCreateSafeWallet };
  const Step3Props = { safeAddress };
 
 
  // const getSigner = async (): Promise<ethers.Signer | null> => {
  //   try {
  //     return await primaryWallet?.connector?.ethers?.getSigner() as ethers.Signer;
  //   } catch (error) {
  //     toast.error("Failed to get signer");
  //     return null;
  //   }
  // };
 
  // const getProvider = async (): Promise<ethers.Provider | null> => {
  //   try {
  //     const provider = await primaryWallet?.connector?.ethers?.getRpcProvider() as ethers.Provider
  //     console.log(provider)
  //     return provider;
  //   } catch (error) {
  //     toast.error("Failed to get provider");
  //     return null;
  //   }
  // };
 
//   const Meow = async () => {
 
//     const factoryAddress = '0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a';
//     const factoryAbi = [
//       "function createAccount(bytes[] calldata owners, uint256 nonce) external payable returns (address account)"
//   ];
 
//   const signer = (await walletConnector?.ethers?.getSigner()) as ethers.Signer;
//   const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
 
 
//   const createSmartWallet = async () => {
//     // Owner address (this could be the signer's address)
//     const ownerAddress = primaryWallet?.address;
 
//     // Encode the owner address as bytes
//     const abiCoder = new ethers.AbiCoder();
 
//     const owners = [abiCoder.encode(['address'], [ownerAddress])];
 
//     // Define a nonce (should be unique)
//     const nonce = 1;
 
//     // Estimate gas for the transaction
//     // const gasEstimate = await factoryContract.estimateGas.createAccount(owners, nonce, {
//     //     value: ethers.parseEther('0') // Example value to send with the transaction
//     // });
 
//     console.log('Sending transaction...');
 
//     // Execute the transaction
//     const tx = await factoryContract.createAccount(owners, nonce, {
//         value: ethers.parseEther('0'), 
//         gasLimit: "5000000"
//     });
 
//     console.log('Transaction hash:', tx.hash);
 
//     // Wait for the transaction to be mined
//     const receipt = await tx.wait();
//     console.log('Transaction confirmed in block', receipt.blockNumber);
//     console.log('New smart wallet address:', receipt.events[0].args.account);
// }
 
// };
 
 
  return (
    <div className="app-container flex flex-row flex-wrap justify-center items-center gap-8 m-auto mt-20">
      <div>{isWidgetOpen && <OnRamperWidget />}</div>
      <div>
        {/* <Accordion
          variant="bordered"
          className="w-full"
          selectedKeys={`${onboardingStep}`}
        >
          <AccordionItem key="1" aria-label="Accordion 1" title="Step 1">
            Let's begin by connecting your wallet.
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Step 2">
            Now, let's create a CoinShift Account.
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Step 3">
            Voila! You can now mint your first NFT and become a part of our
            Waitlist.
          </AccordionItem>
          {/* <AccordionItem key="4" aria-label="Accordion 4" title="Step 4">
            This shit is going to be fun.
          </AccordionItem> */}
        {/* </Accordion> */}
      </div>
 
      <div>
        {/* {onboardingStep === 1 && <Step1 {...Step1Props} />}
        {onboardingStep === 2 && <Step2 {...Step2Props} />}
        {onboardingStep === 3 && <Step3 {...Step3Props} />} */}
        <Card>
          <CardHeader>Meow</CardHeader>
          <CardFooter>
            <Button onPress={handleCreateSmartWallet}>Create Coinbase Wallet</Button>
          </CardFooter>
        </Card>
 
        {/* {onboardingStep === 4 && <Step4 />} */}
      </div>
    </div>
  );
};
 
export default Home;