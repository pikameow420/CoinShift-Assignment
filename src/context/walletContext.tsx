// import React, { createContext, useState, useEffect } from 'react';
// import {Core} from '@walletconnect/core'
// import { Web3Wallet, Web3WalletTypes } from '@walletconnect/web3wallet'
// import { buildApprovedNamespaces, getSdkError } from '@walletconnect/utils'
// import { toast } from 'react-toastify';


// // interface WalletConnectContextProps {
// //   address: string | null;
// //   isConnected: boolean;
// //   connectWallet: () => void;
// // }

// const core = new Core({
//   projectId: "532f359b682d4f20f433f45f65855bdf"
// })

// const web3wallet = await Web3Wallet.init({
//   core, // <- pass the shared `core` instance
//   metadata: {
//     name: 'CoinShift',
//     description: 'Demo Client as Wallet/Peer',
//     url: 'www.walletconnect.com',
//     icons: []
//   }
// }
// )

// export const WalletConnectContext = createContext<WalletConnectContextProps | undefined>(undefined);

// export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
 

//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [walletIsConnected, setWalletIsConnected] = useState<boolean>(false);

//   	const [connector, setConnector] = useState<WalletConnectClient>();
// 	const [resolvingUri, setResolvingUri] = useState(false);

// 	useEffect(() => {
// 		let timer: NodeJS.Timeout;
// 		if (resolvingUri) {
// 			timer = setTimeout(() => {
// 				toast.error('QR code is invalid or has expired');
// 				return setResolvingUri(false);
// 			}, 2000);
// 		}

// 		return () => {
// 			clearTimeout(timer);
// 		};
// 	}, [resolvingUri]);

// 	useEffect(() => {
// 		if (connector) {
// 			connector.on('session_request', (error, payload) => {
// 				if (error) {
// 					toast.error(getErrorMessage(error));
// 					setResolvingUri(false);
// 					throw error;
// 				}

// 				// Handle Session Request
// 				const { peerMeta } = payload.params[0];
// 				const { name, description, icons, url } = peerMeta;
// 				dispatch(
// 					walletConnectActions.setAppMeta({ name, description, icons, url })
// 				);
// 				setResolvingUri(false);
// 			});
// 		}
// 	}, [connector, dispatch]);

// 	const approveSession = ({ accounts, chainId }: ApproveSessionParams) => {
// 		connector?.approveSession({
// 			accounts,
// 			chainId,
// 		});
// 	};

// 	const init = (uri: string) => {
// 		if (uri) {
// 			try {
// 				const connector = new WalletConnectClient({
// 					uri,
// 					clientMeta: {
// 						description:
// 							'Connect your Safe on Coinshift to dapps via WalletConnect.',
// 						url: 'https://beta.coinshift.xyz',
// 						icons: ['https://walletconnect.org/walletconnect-logo.png'],
// 						name: 'Coinshift',
// 					},
// 				});
// 				setConnector(connector);
// 			} catch (error) {
// 				toast.error(getErrorMessage(error));
// 			}
// 		}
// 	};

// 	const destroy = () => {
// 		setConnector(undefined);
// 	};


//   return (
//     <WalletConnectContext.Provider value={{ address: walletAddress, isConnected: walletIsConnected, connectWallet }}>
//       {children}
//     </WalletConnectContext.Provider>
//   );
// };