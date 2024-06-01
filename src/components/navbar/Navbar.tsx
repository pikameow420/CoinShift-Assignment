import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link,} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
// import { useWallet } from '@/hooks/useWallet';
// import ConnectWallet from '@/hooks/connectWallet';
import { DynamicWidget } from '@dynamic-labs/sdk-react-core';

export default function CoinShiftNavbar() {
  // const { address, connectWallet, isConnected } = useWallet();

  return (
    <Navbar>
      <NavbarBrand>
        <Image height="108" width="108" src="./coinshift-logo.png" />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Waitlist
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <DynamicWidget />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
