import React from "react";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoinShiftNavbar from "./components/navbar/Navbar";
import { Divider } from "@nextui-org/react";
import {EthersExtension} from "@dynamic-labs/ethers-v6";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { WidgetProvider } from "./context/onRamperWidgetContext";


const App: React.FC = () => {

  return (
    
    <DynamicContextProvider
    settings={{
      environmentId: "f376fc87-dbba-46af-b90b-4a801eb79746",
      walletConnectors: [EthereumWalletConnectors],
      walletConnectorExtensions: [EthersExtension],
      initialAuthenticationMode: "connect-only",
    }}    >
      <WidgetProvider>
        <CoinShiftNavbar />
        <Divider />
        <Home />
        <ToastContainer />
      </WidgetProvider>
    </DynamicContextProvider>
  );
};

export default App;
