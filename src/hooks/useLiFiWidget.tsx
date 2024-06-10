import { useEffect, useMemo, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { LiFiWidget, WidgetConfig } from "@lifi/widget";
import { ethers } from "ethers";
import { Signer } from "ethers";
import { useUserWallets } from "@dynamic-labs/sdk-react-core";
import { LiFiWalletManagement } from "@lifi/wallet-management"; 


 const useLiFiWidget = () => {
  const { primaryWallet, network} = useDynamicContext();
  
  const [signer, setSigner] = useState<Signer | null>(null);

  useEffect(() => {
    const getSigner = async () => {
        if (!primaryWallet || !primaryWallet.connector) return;

      const walletSigner = await primaryWallet.connector.getSigner<Signer>();
      setSigner(walletSigner);
    };

    getSigner();
  }, [primaryWallet]);

  const widgetConfig : WidgetConfig = {
      variant: "expandable",
      subvariant: "split",
      appearance: "light",
      theme: {
        palette: {
          primary: {
            main: "#181818",
          },
          secondary: {
            main: "#181818",
          },
          text:{
            primary : '#181818',
            secondary : '#6B7280',
          }
        },
        typography: {
          fontFamily: "Inter, sans-serif",
          
        },
        shape: {
          borderRadius: 8,
        },
      },
      integrator: "CoinShift",
    };
  }

export default useLiFiWidget;