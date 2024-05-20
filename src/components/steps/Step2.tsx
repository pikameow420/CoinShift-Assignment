import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Step2Props {
  isConnected: boolean;
  chainId: number | null;
  address: string | null;
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
      <Card className="w-96 items-center space-y-4">
        <CardHeader>
          <CardTitle>Create Coinshift Account</CardTitle>
        </CardHeader>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <CardContent>
          <Button
            onClick={handleClick}
            className={`primary-button ${loading ? 'bg-gray-500' : 'bg-blue-500'}`}
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Coinshift Account'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step2;
