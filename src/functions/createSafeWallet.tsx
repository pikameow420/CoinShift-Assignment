import { useState } from "react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import {
  SafeAccountConfig,
  EthersAdapter,
  SafeFactory,
  SafeDeploymentConfig,
} from "@safe-global/protocol-kit";
import { AbstractSigner, Provider, Signer, ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const useCreateSafeWallet = () => {
  const { primaryWallet } = useDynamicContext();
  const [safeAddress, setSafeAddress] = useState<string | null>(null);

  const address = primaryWallet?.address;

  const getSigner = async (): Promise<ethers.Signer | null> => {
    try {
      return await primaryWallet?.connector?.ethers?.getSigner() as ethers.Signer;
    } catch (error) {
      toast.error("Failed to get signer");
      return null;
    }
  };

  const getProvider = async (): Promise<ethers.Provider | null> => {
    try {
      return await primaryWallet?.connector?.ethers?.getRpcProvider();
    } catch (error) {
      toast.error("Failed to get provider");
      return null;
    }
  };

  const createSafeWallet = async (): Promise<string | null> => {
    try {
      const walletSigner = await getSigner();
      if (!walletSigner) return null;

      const provider = await getProvider();
      if (!provider) {
        toast.error("No provider found");
        return null;
      }
      const ethAdapter = new EthersAdapter({ ethers, signerOrProvider: walletSigner });

      const safeFactory = await SafeFactory.create({ ethAdapter });

      const safeAccountConfig: SafeAccountConfig = {
        owners: [address as string],
        threshold: 1,
      };

      const safeDeploymentConfig: SafeDeploymentConfig = {
        saltNonce: "0x100",
      };

      const safe = await safeFactory.deploySafe({
        safeAccountConfig,
        saltNonce: safeDeploymentConfig.saltNonce,
      });
      

      console.log("Safe", safe)

      // const signer : Promise<Signer> = {


      // }
      const safeAddress = await safe.getAddress();
      setSafeAddress(safeAddress);
      toast.success("Safe wallet created successfully!");

      return safeAddress;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Error creating safe wallet:", error.message);
      }
      return null;
    }
  };


  return {  getSigner, getProvider, createSafeWallet, safeAddress };
};
