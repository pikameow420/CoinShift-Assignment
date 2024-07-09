import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
} from "@nextui-org/react";
import {
  DynamicWidget
} from "@dynamic-labs/sdk-react-core";

import { LiFiWidget } from "@lifi/widget";
import {Provider, TransactionRequest, TransactionResponse} from "@ethersproject/abstract-provider";
import { Signer, VoidSigner } from "@ethersproject/abstract-signer";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WidgetConfig } from "@lifi/widget";
import WidgetContext from "@/context/onRamperWidgetContext";
import {Deferrable} from "@ethersproject/properties";
import { Interface} from "@ethersproject/abi";
import { Web3 } from 'web3';
import {ethers, JsonRpcSigner} from "ethers";
import { safeABI } from "@/constants/safeABI";

// import {Web3Adapter} from "contract-proxy-kit";

export default function CoinShiftNavbar() {

  const { toggleWidget } = useContext(WidgetContext);
  const { primaryWallet ,network} = useDynamicContext();
  const [walletSigner, setWalletSigner] = useState<JsonRpcSigner>();
  const [safeSigner, setSafeSigner] = useState<Signer>();
  const [provider, setProvider] = useState<Provider>();

  // following EIP712
  const getEip712MessageTypes = (isSafeVersionAbove130: boolean): any => {
    const EIP712_DOMAIN_BEFORE_V130 = [{ type: 'address', name: 'verifyingContract' }];

    const EIP712_DOMAIN = [
      { type: 'uint256', name: 'chainId' },
      { type: 'address', name: 'verifyingContract' },
    ];

    return {
      EIP712Domain: isSafeVersionAbove130 ? EIP712_DOMAIN : EIP712_DOMAIN_BEFORE_V130,
      SafeTx: [
        { type: 'address', name: 'to' },
        { type: 'uint256', name: 'value' },
        { type: 'bytes', name: 'data' },
        { type: 'uint8', name: 'operation' },
        { type: 'uint256', name: 'safeTxGas' },
        { type: 'uint256', name: 'baseGas' },
        { type: 'uint256', name: 'gasPrice' },
        { type: 'address', name: 'gasToken' },
        { type: 'address', name: 'refundReceiver' },
        { type: 'uint256', name: 'nonce' },
      ],
    };
  };


  const eip712Signer = async (safeAddress: string, metadata: any): any => {
    const domain = { verifyingContract: safeAddress, chainId: "42161" };
    const types = getEip712MessageTypes(true);
    return { domain, types, message: metadata, primaryType: 'SafeTx' };
    // return JSON.stringify(typedData);
  };

  useEffect(() => {
    if (!walletSigner) {
      console.error("No wallet signer available")
      return;
    }

    console.warn("Setting safe signer with wallet signer", walletSigner);
    const safeAddress = "0xfd0dff9d055347362e2c2742802b12c101c891c4"; //TODO: hardcode address
    // const provider = new JsonRpcProvider("https://fittest-magical-sky.matic.quiknode.pro/1841f398a4b9e8a36ccb1b375e4508ea59b7dd53/");

    const signer = new VoidSigner(safeAddress, provider);
    // provider.getSigner(safeAddress)
    //     .then((signer) => {
    //       signer.getAddress = () => Promise.resolve(safeAddress);
          signer.getChainId = () => Promise.resolve(42161);

          // override sendTransaction to use the wallet signer
          signer.sendTransaction = async (transaction: Deferrable<TransactionRequest>): Promise<TransactionResponse> => {
            console.log("Sending transaction...")
            if (walletSigner) {
              const web3 = new Web3(new Web3.providers.HttpProvider("https://arb1.arbitrum.io/rpc"));
              // const autoApprovedSignature = web3.eth.abi.encodeParameters(['address', 'uint256', 'uint8'], ["0xA2Cb4cc69253bf983339463457678C2D94894b2f", 0, 1]);

              const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
              // const contract = new web3.eth.Contract(ABI, safeAddress);


              // const safeTxHash = await contract.methods.getTransactionHash(transaction.to, transaction.value, transaction.data, 0, 0, 0, 0, ZERO_ADDRESS, ZERO_ADDRESS, 17).call();

              const eip712SignerResponse = eip712Signer(safeAddress, {
                to: transaction.to,
                value: transaction.value,
                data: transaction.data,
                operation: 0,
                safeTxGas: 0,
                baseGas: 0,
                gasPrice: 0,
                gasToken: ZERO_ADDRESS,
                refundReceiver: ZERO_ADDRESS,
                nonce: 17,
              })

              // const signature = await walletSigner.signTypedData(eip712SignerResponse.domain, eip712SignerResponse.type, eip712SignerResponse.message);
              const signature = await walletSigner.signTypedData({
                chainId: 42161,
                verifyingContract: safeAddress,
              }, {
                SafeTx: [
                  { type: 'address', name: 'to' },
                  { type: 'uint256', name: 'value' },
                  { type: 'bytes', name: 'data' },
                  { type: 'uint8', name: 'operation' },
                  { type: 'uint256', name: 'safeTxGas' },
                  { type: 'uint256', name: 'baseGas' },
                  { type: 'uint256', name: 'gasPrice' },
                  { type: 'address', name: 'gasToken' },
                  { type: 'address', name: 'refundReceiver' },
                  { type: 'uint256', name: 'nonce' },
                ]
              }, {
                to: transaction.to,
                value: transaction.value,
                data: transaction.data,
                operation: 0,
                safeTxGas: 0,
                baseGas: 0,
                gasPrice: 0,
                gasToken: ZERO_ADDRESS,
                refundReceiver: ZERO_ADDRESS,
                nonce: 17,
              });
              // const signature = await walletSigner.signMessage(safeTxHash);
              console.log("Signature: ", signature);

              // const autoApprovedSignature = web3.eth.abi.encodeParameters(['address', 'uint256', 'uint8'], ["0xA2Cb4cc69253bf983339463457678C2D94894b2f", 0, 1]);

              // sleep
              await new Promise(r => setTimeout(r, 5000));

              console.log(`transaction`, transaction.gasLimit?.toString());


              // const ethLibAdapter = new Web3Adapter({ web3 });

              // const autoApprovedSignature = ethLibAdapter.abiEncodePacked(
              //     { type: 'uint256', value: "0xA2Cb4cc69253bf983339463457678C2D94894b2f" }, // r
              //     { type: 'uint256', value: 0 }, // s
              //     { type: 'uint8', value: 1 } // v
              // );

              // const autoApprovedSignature = web3.eth.abi.encodeParameters(['uint256', 'uint256', 'uint8'], ["0xA2Cb4cc69253bf983339463457678C2D94894b2f", 0, 1]);

              // console.log(`autoApprovedSignature`, autoApprovedSignature);

              const sendResponse = await walletSigner.sendTransaction({
                to: safeAddress,
                data: (new Interface(safeABI)).encodeFunctionData("execTransaction", [
                  transaction.to,
                  transaction.value,
                  transaction.data,
                  0,
                  0,
                  0,
                  0,
                  "0x0000000000000000000000000000000000000000",
                  "0x0000000000000000000000000000000000000000",
                  signature,
                ]),
                gasLimit: transaction.gasLimit?.toString(),
                gasPrice: transaction.gasPrice,
              });

              return sendResponse;
            }

            throw new Error("No wallet signer available");
          }

          setSafeSigner(signer);
        // });
    }, [walletSigner])

  useEffect(() => {
    const fetchSignerAndProvider = async () => {
      if (primaryWallet) {
        const signerInstance =
          await primaryWallet?.connector?.ethers?.getSigner();
        const providerInstance =
          await primaryWallet?.connector?.ethers?.getRpcProvider();
        console.log(signerInstance);
        console.log(providerInstance);
        console.log(primaryWallet);

        signerInstance.getChainId = ()=> network

        setWalletSigner(signerInstance);
        setProvider(providerInstance);
        setWalletSigner(signerInstance)

      }
    };
    fetchSignerAndProvider();
  }, [primaryWallet]);

  const [showLiFiWidget, setShowLiFiWidget] = useState(false);

  // const toggleOnRampIframe = () => {
  //   setShowOnRamp((prevState)=>!prevState);
  // }

  const toggleLiFiWidget = () => {
    setShowLiFiWidget((prevState) => !prevState);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const lifiConfig: WidgetConfig = useMemo(() => {
    return {
      variant: "default",
      subvariant: "default",
      appearance: "light",
      integrator: "Coinshift",
      walletManagement: {
        signer: safeSigner,
        connect: async () => {
          if (safeSigner) {
            return safeSigner;
          }
        },
        disconnect: async () => {
          return Promise.resolve();
        },
      },
      theme: {
        palette: {
          primary: {
            main: "#181818",
          },
          secondary: {
            main: "#ffb3b3",
          },
          text: {
            primary: "#181818",
            secondary: "#6B7280",
          },
        },
        typography: {
          fontFamily: "Inter, sans-serif",
        },

        shape: {
          borderRadius: 8,
        },
      },
      containerStyle: {
        boxShadow: "0px 0px 8px 0px ",
        background: "#FEFDFC",
        borderRadius: "16px",
        padding: "8px",
        paddingBottom: "20px ",
      },
    } as unknown;
  }, [walletSigner, provider]);

  return (
    <>
      <Navbar>
        <NavbarBrand>
          <Image height="108" width="108" src="./coinshift-logo.png" />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Waitlist
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/integrations">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            {/* <DynamicConnectButton buttonClassName='Connect'><button>Connect</button></DynamicConnectButton> */}
            <DynamicWidget
              variant="modal"
              buttonClassName="Connect"
              innerButtonComponent={"Connect"}
            ></DynamicWidget>
          </NavbarItem>
          {/* <NavbarItem>
            <Button onClick={initTransak}>Transak</Button>
          </NavbarItem> */}
          <NavbarItem>
            <Button onClick={toggleLiFiWidget}>Swap</Button>
          </NavbarItem>
          <NavbarItem>
            <Button onClick={toggleWidget}>Buy Fiat</Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {showLiFiWidget && (
        <div style={{ zIndex: 1000 }}>
          {/*<WagmiConfig config={createConfig({*/}
          {/*  connectors: connectors,*/}
          {/*  publicClient,*/}
          {/*})}>*/}
            <LiFiWidget config={lifiConfig} integrator="Coinshift" />
          {/*</WagmiConfig>*/}
        </div>
      )}
      {/* {showOnRamp && (
        <div style={{ zIndex: 1000}}>
           <iframe id="cryptoIframe" width="100%" height="500px"></iframe>
        </div>
      )} */}
    </>
  );
}
