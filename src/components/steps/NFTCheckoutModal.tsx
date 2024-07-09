import React, { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";
import { arbitrumSepolia, sepolia } from "viem/chains";


const NFTCheckoutModal: React.FC = ({}) => {
  const { primaryWallet, network, walletConnector } = useDynamicContext();

  const [address, setAddress] = useState<string>("");
  const [signer, setSigner] = useState<any>(null);


  const chainIdMap = {
    "arbitrumSepolia": 421614,
    "base-sepolia": 84532,
    "ethereum-sepolia": 11155111,
    "optimism-sepolia": 11155420,
  };


  async function getSigner() {
    const _signer = await walletConnector?.getSigner();
    const _address = await walletConnector?.getAddress();
    console.log("_signer", _signer);
    console.log("_address", _address);
    console.log(typeof arbitrumSepolia.id)
    setSigner(_signer);
    setAddress(_address!);
  }

  useEffect(() => {
    console.log("walletConnector", walletConnector);
    getSigner();
  }, [walletConnector]);

  if (
    signer == null ||
    !address ||
    !["EVM", "ETH"].includes(walletConnector?.connectedChain || "")
  ) {
    return <p>Connect wallet</p>;
  }

  return (
    <>
    <div className="w-full h-full mt-4">
      <CrossmintPaymentElement
        environment="staging"
        collectionId="e8ab0f6b-4084-4331-b2dc-340eeb9c1caa"
        projectId="e485aeb4-3267-464d-9099-1f5a33286691"
        recipient={{
          wallet: address,
        }}
        mintConfig={{
          tokenId: 0,
          totalPrice: `${0}`,
          quantity: 1,
        }}
        signer={{
          address,
          signAndSendTransaction: async (transaction) => {
            const signRes = await signer.sendTransaction(transaction);
            console.log("signRes", signRes);
            return signRes.hash;
          },
          // handleChainSwitch: async (chain) => {
          //   walletConnector?.switchNetwork({
          //     // chainId: chainIdMap[chain as keyof typeof chainIdMap],
          //   });
          // },
          supportedChains: [
            "arbitrumSepolia",
            "base-sepolia",
            "ethereum-sepolia",
            "optimism-sepolia",
          ],
          // chain: Object.keys(chainIdMap).find(
          //   (key) =>
          //     chainIdMap[key as keyof typeof chainIdMap] === chainId
          // ) as Blockchain | undefined,
        }}

        onEvent={(event) => {
          console.log(event);

          if (event.type === "quote:status.changed") {
            console.log("QUOTE STATUS CHANGED", event);
          }

          if (event.type === "payment:process.succeeded") {
            console.log("PAYMENT SUCCESS. SHOW MINTING", event);
          }
        }}
      />
    </div>
    </>
  );
};

export default NFTCheckoutModal;
