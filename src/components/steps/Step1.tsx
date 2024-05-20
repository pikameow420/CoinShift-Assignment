import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ConnectWallet from "@/hooks/connectWallet";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Step1Props {
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
  setChainId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  handleStepAdvance: () => void;
}

const Step1: React.FC<Step1Props> = ({
  setAddress,
  setChainId,
  setIsConnected,
  handleStepAdvance,
}) => (
  <div className="flex flex-col items-center py-2">
    <Card className=" w-96 items-center space-y-4">
      <CardHeader>
        <CardTitle>Connect Wallet</CardTitle>
      </CardHeader>
      <Avatar>
        <AvatarFallback className="text-2xl">A</AvatarFallback>
      </Avatar>
      <CardContent>
        <ConnectWallet
          setAddress={setAddress}
          setChainId={setChainId}
          setIsConnected={setIsConnected}
          handleStepAdvance={handleStepAdvance}
        />
      </CardContent>
    </Card>
  </div>
);

export default Step1;
