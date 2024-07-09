import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { ethers } from 'ethers';
import React from 'react'

const useCreateSmartWallet = async () => {
    const { walletConnector, primaryWallet } = useDynamicContext();

    const factoryAddress = '0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a';
    const factoryAbi = [
      "function createAccount(bytes[] calldata owners, uint256 nonce) external payable returns (address account)"
  ];

  const signer = (await walletConnector?.ethers?.getSigner()) as ethers.Signer;
  const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);

  const createSmartWallet = async () => {
    // Owner address (this could be the signer's address)

    const ownerAddress = primaryWallet?.address;

    // Encode the owner address as bytes
    const abiCoder = new ethers.AbiCoder();

    const owners = [abiCoder.encode(['address'], [ownerAddress])];

    // Define a nonce (should be unique)
    const nonce = 1;

    // Estimate gas for the transaction
    // const gasEstimate = await factoryContract.estimateGas.createAccount(owners, nonce, {
    //     value: ethers.parseEther('0') // Example value to send with the transaction
    // });

    console.log('Sending transaction...');

    // Execute the transaction
    const tx = await factoryContract.createAccount(owners, nonce, {
        value: ethers.parseEther('0'), 
        gasLimit: "5000000"
    });

    console.log('Transaction hash:', tx.hash);

    // Wait for the transaction to be mined
    const receipt = await tx.wait();
    console.log('Transaction confirmed in block', receipt.blockNumber);
    console.log('New smart wallet address:', receipt.events[0].args.account);
    return receipt;
}

}
export {useCreateSmartWallet};

