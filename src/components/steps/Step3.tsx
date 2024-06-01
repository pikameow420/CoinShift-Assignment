import React, { useState } from "react";
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
// import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';



interface Step3Props {
  safeAddress: string | null;
}

const Step3: React.FC<Step3Props> = ({ safeAddress }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, setLoading] = useState(false);

  // const { walletProvider } = useWeb3ModalProvider();
  const { primaryWallet } = useDynamicContext();
  

  // const provider = await primaryWallet?.connector?.ethers?.getProvider();
  const handleMint = async () => {
    setLoading(true);
    try {
      // if (!provider) {
      //   toast.error("Wallet provider is not available");
      //   return null;
      // }
      const signer = await primaryWallet?.connector?.ethers?.getSigner();
      
      // const provider = await primaryWallet?.connector?.ethers?.getRpcProvider();
      // const provider = new BrowserProvider(walletProvider);
      // const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        "0xdD5544d3a85CB8fF56CafF9B54CE51D45bB8cd2f",
        abi,
        signer
      );

      // Send the mint transaction
      const tx = await contract.mint(BigInt(0), BigInt(1));
      await tx.wait();

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
              href={`https://app.safe.global/sep:${safeAddress}`}
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
            <Button
              href="https://testnets.opensea.io/assets/sepolia/0x5d8f1a74740557ed320a71e1241228eaf7160e70/0"
              as={Link}
              isExternal={true}
              showAnchorIcon
              variant="solid"
            >
              OpenSea{" "}
            </Button>
            <Button color="primary" onClick={handleMint} disabled={loading}>
              {loading ? <Spinner size="sm" color="white" /> : "Mint NFT"}
            </Button>
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
