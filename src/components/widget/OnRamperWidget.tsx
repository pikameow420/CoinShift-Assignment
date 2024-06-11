import { useContext } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import WidgetContext from '@/context/onRamperWidgetContext';


const onramper_key = import.meta.env.VITE_APP_ONRAMPER


export const OnRamperWidget = () => {
    const {primaryWallet} = useDynamicContext();
    const address = primaryWallet?.address;
    const { toggleWidget } = useContext(WidgetContext);
    const outsideWidget = useOutsideClick(toggleWidget);

    const onRamperConfig = {
        apiKey: onramper_key,
        defaultCrypto: 'MATIC',
        containerColor: "ffffff",
        background: "181818",
        primaryColor: "181818",
        borderRadius: 0.75,
        wgBorderRadius: 1.5,
        wallets: `matic_polygon${address}`
      };

    const searchParams = new URLSearchParams(
        Object.entries(onRamperConfig).map(([key, value]) => [key, String(value)]),
      );

    const onRamperSrc = `https://buy.onramper.com/?${searchParams.toString()}`;



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div ref={outsideWidget} className="bg-white rounded-lg shadow-lg">
        <iframe
          src={onRamperSrc}
          height="630px"
          width="416px"
          title="Onramper widget"
          allow="accelerometer; autoplay; camera; gyroscope; payment"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  )
}



