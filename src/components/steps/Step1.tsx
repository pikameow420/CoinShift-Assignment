import React from "react";
import { Card, Avatar, CardBody, CardHeader, Divider } from "@nextui-org/react";
import ConnectWallet from "@/hooks/connectWallet";

interface Step1Props {
  handleStepAdvance: () => void;
}

const Step1: React.FC<Step1Props> = ({ handleStepAdvance }) => {  console.log("helllo",typeof handleStepAdvance); return (
  <div>
    <Card>
      <CardHeader className="justify-center">Connect Wallet</CardHeader>
      <Divider />
      <CardBody className="flex flex-col w-64 h-80 items-center justify-between self-end py-4">
        <div></div>
        <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 text-large" />
        <ConnectWallet handleStepAdvance={handleStepAdvance} />
      </CardBody>
    </Card>
  </div>
);
}
export default Step1;
