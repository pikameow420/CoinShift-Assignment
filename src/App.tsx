import React, { useEffect } from "react";
import Home from "./pages/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoinShiftNavbar from "./components/navbar/Navbar";
import { Divider } from "@nextui-org/react";
import { WalletProvider } from "./context/walletContext";
import { initializeWeb3Modal } from "./lib/web3ModalConfig";

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  useEffect(() => {
    const initialize = async () => {
      await initializeWeb3Modal();
      setIsInitialized(true);
    };

    initialize();
  }, []);

  if (!isInitialized) {
    return <div>Loading...</div>; 
  }

  return (
    <WalletProvider>
      <CoinShiftNavbar />
      <Divider />
      <Home />
      <ToastContainer />
    </WalletProvider>
  );
};

export default App;
