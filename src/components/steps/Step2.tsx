import React, { useState } from 'react';
import {Button} from "@nextui-org/button";
import { Avatar, Card, CardHeader, CardBody, Divider, Spinner} from "@nextui-org/react";


interface Step2Props {
  // isConnected: boolean;
  // chainId: number | null;
  // address: string | null;
  handleCreateSafeWallet: () => Promise<void>; // Assuming the function returns a Promise
}

const Step2: React.FC<Step2Props> = ({ handleCreateSafeWallet }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await handleCreateSafeWallet();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-2">
    <Card >
      <CardHeader className='justify-center'>
        <h1>Create Coinshift Account</h1>
      </CardHeader>
      <Divider/>
      <CardBody className="flex flex-col w-64 h-80 items-center justify-between	self-end py-4">
        <div></div>
        <Avatar isBordered src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-24 h-24 text-large" />
        <Button
          onClick={handleClick}
          className={`primary-button ${loading ? 'bg-green-600' : 'bg-blue-500'}`}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" color="white" /> : 'Create Coinshift Account'}
        </Button>
      </CardBody>
    </Card>
  </div>
  );
};

export default Step2;
