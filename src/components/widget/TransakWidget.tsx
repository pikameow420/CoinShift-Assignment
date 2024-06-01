// import { useEffect, useState } from "react";
// // import { Transak } from "@transak/transak-sdk";
// import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
// import {Transak} from '../../../../transak-sdk/src/index';


// export default function TransakWidget() {

//     const { primaryWallet } = useDynamicContext();
//     const address = primaryWallet?.address;

//     const [success,setsuccess]=useState(false);
//     const [orderData,setorderData]=useState()

//   useEffect(() => {

//     const transakConfig = {
//       apiKey: "83efadcd-d29c-467f-b3c5-11c613020235",
//       environment:
//         Transak.ENVIRONMENTS.STAGING, 
//       exchangeScreenTitle: 'CoinShift', 
//       walletAddress: address, 
//       defaultFiatAmount: 2775, 
//       defaultFiatCurrency: 'INR', 
//       defaultCryptoCurrency: 'ETH',
//     //   // innerWidth: '40%',
//     //   // innerHeight: '20%',
//     //   defaultNetwork: 'sepolia',
//     //   // hideMenu: true,
//     //   widgetHeight: '80%',
//     //   widgetWidth: '40%',
//     //     colorMode: 'DARK',
//     // //  backgroundColors: 'red'
//       themeColor: 'ff911a',
//       textColors: 'ffffff',
//       borderColors: 'ff911a',
//       isFeeCalculationHidden : true,
//       isAutoFillUserData: true,


//     // networks?: 'string' | string[];
//     //   isTransakOne: true,
//     // countryCode: 'IN', 
//     //   productsAvailed: string | string[];
//     //   countryCode?: string;
//     //   excludeFiatCurrencies?: string | string[];
//     //   defaultPaymentMethod?: string;
//     //   paymentMethod?: string;
//     //   disablePaymentMethods?: string | string[];
//     //   defaultCryptoAmount?: number;
//     //   defaultCryptoCurrency?: string;
//     //   cryptoCurrencyCode?: string;
//     //   cryptoCurrencyList?: string | string[];
//     //   isFeeCalculationHidden?: boolean;
//     //   hideExchangeScreen?: boolean;
//     //   email: string;
//     //   userData: User;
//     //   hideMenu: boolean;
//     //   redirectURL: string;
//     //   partnerOrderId: string;
//     //   partnerCustomerId: string;
//     //   defaultFiatAmount: number;
//     //   fiatAmount: number;
//     //   walletAddressesData?: WalletAddresses;
//     //   disableWalletAddressForm?: boolean;
//     //   isNFT?: boolean;
//     //   tokenId?: number;
//     //   tradeType?: string;
//     //   contractAddress: string;
//     //   calldata?: string;
//     //   smartContractAddress?: string;
//     //   nftData?: NFT[];
//     //   estimatedGasLimit?: number;
//     //   cryptoAmount?: number;
//     //   walletRedirection?: boolean;
//     //   referrerDomain?: string;
//     //   sourceTokenData?: SourceTokenData[];
//     //   cryptoCurrencyData?: CryptoCurrencyData[];
//     //   contractId?: string;
//     //   tokenData?: TokenData[]; 

//       // paymentMethod: 'inr_upi', 
//     };
//     const transak = new Transak(transakConfig);

//     transak.init();

//     Transak.on("*", (data) => {
//       console.log(data);
//     });

//     Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
//         console.log(orderData);
//         setorderData(orderData);
//         setsuccess(true);
//         transak.close();
//     });

//   }, []);
//   return <div>
//     {success?<><h1>Trasaction Done Successfully</h1>
//     </>:null}
//   </div>;
// }