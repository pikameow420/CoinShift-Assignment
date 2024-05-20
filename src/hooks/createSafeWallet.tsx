import { useState } from "react";
import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import {
  SafeAccountConfig,
  EthersAdapter,
  SafeFactory,
  SafeDeploymentConfig,
} from "@safe-global/protocol-kit";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const useCreateSafeWallet = () => {
  const { walletProvider } = useWeb3ModalProvider();
  const [safeAddress, setSafeAddress] = useState<string | null>(null);

  const createSafeWallet = async (): Promise<string | null> => {
    if (!walletProvider) {
      toast.error("Wallet provider is not available");
      return null;
    }

    try {
      const provider = new BrowserProvider(walletProvider);
      const signer = await provider.getSigner();

      if (signer) {
        const ethAdapter = new EthersAdapter({
          ethers,
          signerOrProvider: signer,
        });

        const safeFactory = await SafeFactory.create({ ethAdapter });

        const safeAccountConfig: SafeAccountConfig = {
          owners: [await signer.getAddress()],
          threshold: 1,
        };

        const safeDeploymentConfig: SafeDeploymentConfig = {
          saltNonce: "0x20",
        };

        const safe = await safeFactory.deploySafe({
          safeAccountConfig,
          saltNonce: safeDeploymentConfig.saltNonce,
        });

        const safeAddress = await safe.getAddress();
        setSafeAddress(safeAddress);

        return safeAddress;
      } else {
        toast.error("No signer found");
        return null;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error deploying SAFE, maybe try another saltNonce");
        console.log(error.message)
      }
      return null;
    }
  };

  return { createSafeWallet, safeAddress };
};
