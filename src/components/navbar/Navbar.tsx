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

import { LiFiWidget, WidgetWalletManagement } from "@lifi/widget";
import { Provider } from "@ethersproject/abstract-provider";
import { Signer } from "@ethersproject/abstract-signer";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { WidgetConfig } from "@lifi/widget";
import WidgetContext from "@/context/onRamperWidgetContext";
// import {safe} from "@lifi/wallet-management"
import { WagmiConfig, createConfig, configureChains, Connector } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public';
import { sepolia } from 'viem/chains'
import { SafeConnector } from 'wagmi/connectors/safe';

export default function CoinShiftNavbar() {

  const defaultChains = [sepolia];

  const { chains, publicClient } = configureChains(defaultChains, [publicProvider()]);

  const connectors: Connector[] = [
    new SafeConnector({ chains }),
  ];

  const { toggleWidget } = useContext(WidgetContext);
  const { primaryWallet ,network} = useDynamicContext();
  const [walletSigner, setWalletSigner] = useState<Signer>();
  const [provider, setProvider] = useState<Provider>();

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


  // const customSigner = walletSigner;
  // console.log({ walletSigner });

  //@ts-ignore
  const lifiConfig: WidgetConfig = useMemo(() => {
    return {
      variant: "default",
      subvariant: "default",
      appearance: "light",
      integrator: "Coinshift",
      walletManagement: {
        
        signer: walletSigner,
        connect: async () => {
          if (walletSigner) {
            console.log(walletSigner)
            return walletSigner;
          }
        },
        disconnect: async () => {
          return Promise<void>;
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
            <Link color="foreground" href="#">
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
          <WagmiConfig config={createConfig({
            connectors: connectors,
            publicClient,
          })}>
            <LiFiWidget config={lifiConfig} integrator="Coinshift" />
          </WagmiConfig>
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
