import React, { useEffect, useState } from "react";
import {
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  useDisclosure,
  Divider,
  Spinner,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { abi } from "@/constants/contractABI";
import chainList from "@/constants/chainLIst";
// import { useWeb3ModalProvider } from "@web3modal/ethers/react;
import NFTCheckoutModal from "./NFTCheckoutModal";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import Safe, {
  CreateTransactionProps,
  EthersAdapter,
} from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  SafeTransactionDataPartial,
} from "@safe-global/safe-core-sdk-types";

interface Step3Props {
  safeAddress: string;
}

const Step3: React.FC<Step3Props> = ({ safeAddress }) => {
  if (!safeAddress) return;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [chain, setChain] = useState<string>("");
  const { primaryWallet, walletConnector } = useDynamicContext();
  const [address, setAddress] = useState<string>("");
  const [signer, setSigner] = useState<any>(null);

  useEffect(() => {
    if (!primaryWallet) return;
    const chainId = primaryWallet.network;
    if (typeof chainId === "number") {
      const chainName = chainList[chainId];
      if (chainName) {
        setChain(chainName);
        console.log(chainName);
      } else {
        setChain("");
      }
    }
  }, [primaryWallet?.network]);

  async function getSigner() {
    const _signer = await walletConnector?.getSigner();
    const _address = await walletConnector?.getAddress();
    console.log("_signer", _signer);
    console.log("_address", _address);
    setSigner(_signer);
    setAddress(_address!);
  }

  useEffect(() => {
    console.log("walletConnector", walletConnector);
    getSigner();
  }, [walletConnector]);

  const handleMint = async () => {
    setLoading(true);
    try {
      const provider = await primaryWallet?.connector?.ethers?.getRpcProvider();
      if (!provider) {
        toast.error("Wallet provider is not available");
        return null;
      }
      const chainId = primaryWallet?.network;
      console.log(chainId);
      // const provider = new BrowserProvider(walletProvider);
      // const signer = await provider.getSigner();

      // // Send the mint transaction
      // const tx = await contract.mint(BigInt(0), BigInt(1));
      // await tx.wait();

      const signer =
        (await primaryWallet?.connector?.ethers?.getSigner()) as ethers.Signer;

      // const provider = await primaryWallet?.connector?.ethers?.getRpcProvider();
      const nftAddress = "0x6075d05c5dF214DbA57ff62455ea1D054B1296Ac";
      const Sepolia_nftAddress = "0x5d8f1a74740557ed320a71e1241228eaf7160e70";

      const contract = new ethers.Contract(Sepolia_nftAddress, abi, signer);
      console.log(contract);

      const mintTransactionData = contract.interface.encodeFunctionData(
        "mint",
        [BigInt(0), BigInt(1)]
      );

      // const metaTransactionData: MetaTransactionData[] = [
      //   {
      //     to: Sepolia_nftAddress,
      //     data: mintTransactionData,
      //     value: "0",
      //   },
      // ];

      const safeTransactionData: SafeTransactionDataPartial = {
        to: Sepolia_nftAddress,
        data: mintTransactionData,
        value: "0",
      };

      //Create Transaction

      const ethAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });

      const safeInstance = await Safe.create({
        ethAdapter,
        safeAddress,
      });
      console.log("Safe Instance", safeInstance);
      const safeTransaction = await safeInstance.createTransaction({
        transactions: [safeTransactionData],
      });

      console.log(safeTransaction.getSignature);

      //Approve Transaction
      let signedSafeTransaction;
      try {
        // Sign the safeTransaction
        signedSafeTransaction = await safeInstance.signTransaction(
          safeTransaction
        );
      } catch (err) {
        console.log(err);
        return;
      }

      let result;
      //Execute Transaction
      try {
        result = await safeInstance.executeTransaction(signedSafeTransaction);
      } catch (err) {
        console.log(err);
        return;
      }
      console.log(result);
      toast.success("NFT Minted successfully!");
    } catch (error) {
      console.error("Minting error:", error);
      toast.error("Minting failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Card>
        <CardHeader className="justify-center">Join Waitlist</CardHeader>
        <Divider />
        <CardBody className="flex flex-col w-64 h-80 items-center justify-between	self-end py-4">
          <div></div>
          <Avatar
            isBordered
            src="https://i.pravatar.cc/150?u=a04258114e29026708c"
            className="w-24 h-24 text-large"
          ></Avatar>
          {safeAddress ? (
            <>
              <Button
                href={`https://app.safe.global/${chain}:${safeAddress}`}
                as={Link}
                isExternal={true}
                showAnchorIcon
                variant="solid"
              >
                Safe Wallet{" "}
              </Button>
              <Button color="primary" onClick={onOpen}>
                Join Waitlist
              </Button>{" "}
            </>
          ) : (
            toast.error("Safe address not found")
          )}
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader>Mint Your NFT</ModalHeader>
          <Divider />
          <ModalBody>
            To join our waitlist, Mint an exclusive CoinShift NFT.
            <Image
              src="./CoinShift.gif"
              alt="NFT Preview"
              className="w-full h-auto"
            />
          </ModalBody>
          <ModalFooter>
            {/* <Button
              href="https://testnets.opensea.io/assets/sepolia/0x5d8f1a74740557ed320a71e1241228eaf7160e70/0"
              as={Link}
              isExternal={true}
              showAnchorIcon
              variant="solid"
            >
              OpenSea{" "}
            </Button> */}
            {/* <Button color="primary" onClick={handleMint} disabled={loading}>
              {loading ? <Spinner size="sm" color="white" /> : "Mint NFT"}
            </Button> */}
            <CrossmintPayButton
              collectionId="e8ab0f6b-4084-4331-b2dc-340eeb9c1caa"
              projectId="e485aeb4-3267-464d-9099-1f5a33286691"
              mintConfig={{
                type: "erc-1155",
                tokenId :"0",
                totalPrice: "0.00001",
                quantity: "1",
              }}
              environment="staging"
              checkoutProps={{ paymentMethods: ["fiat", "ETH", "SOL"] }}
              mintTo={address}
            />
            <Button
              color="danger"
              variant="flat"
              onClick={() => onOpenChange()}
              disabled={loading}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Step3;
