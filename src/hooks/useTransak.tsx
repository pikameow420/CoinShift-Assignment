import { useCallback, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import {Transak, TransakConfig} from '@transak/transak-sdk';


export const useTransak = () => {
  const { primaryWallet } = useDynamicContext();
  const address = primaryWallet?.address;
  
  
  const [success, setSuccess] = useState(false);
  const initTransak = () => {
      const transakConfig: TransakConfig = {
        apiKey: "83efadcd-d29c-467f-b3c5-11c613020235",
        environment: Transak.ENVIRONMENTS.STAGING,
        containerId : 'transak-container',
        exchangeScreenTitle: 'Coinshift Checkout',
        walletAddress: address,
        defaultFiatAmount: 20000,
        defaultFiatCurrency: 'IN',
        defaultCryptoCurrency: 'ETH',
        themeColor: '181818',
        textColors: '000000',
        isFeeCalculationHidden: true,
        isAutoFillUserData: true,
        colorMode: 'LIGHT',
        backgroundColors : 'ff911a',
        hideMenu : true,
        widgetHeight : '720px',
        widgetWidth: '480px',
      
      };
      
      const transak = new Transak(transakConfig);
      
      transak.init();
      
      Transak.on("*", (data) => {
        console.log(data);
      });

      Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, () => {
        setSuccess(true);
        transak.close();
      });
    };
    
  return { initTransak, success };
};
