import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface Step3Props {
  safeAddress: string | null;
}

const Step3: React.FC<Step3Props> = ({ safeAddress }) => {
  const handleJoinWaitlist = () => {
    toast.success("Joined waitlist!", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="flex flex-col items-center py-2 step-content">
      <Card className=" w-96 items-center space-y-4">
        <CardHeader>
          <CardTitle>Your Coinshift Account is Ready</CardTitle>
        </CardHeader>
        <Avatar>
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <CardContent>
          {safeAddress ? (
            <>
              <p>
                {safeAddress.slice(0, 5) +
                  "...." +
                  safeAddress.slice(safeAddress.length - 6)}
              </p>
              <Button onClick={handleJoinWaitlist}>Join Waitlist</Button>
            </>
          ) : (
            <p>Meow</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Step3;
