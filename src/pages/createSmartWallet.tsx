import { ethers } from 'ethers';
import React from 'react'
 
const useCreateSmartWallet = async (walletConnector:any, primaryWallet:any) => {
 
 
    const factoryAddress = '0x0BA5ED0c6AA8c49038F819E587E2633c4A9F428a';
    const factoryAbi = [
      "function createAccount(bytes[] calldata owners, uint256 nonce) external payable returns (address account)",
      "function getAddress(bytes[] calldata owners, uint256 nonce) external view returns (address)"
  ];
 
  const signer = (await walletConnector?.ethers?.getSigner()) as ethers.Signer;
  const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
await createSmartWallet(primaryWallet, factoryContract)
 
}
const createSmartWallet = async (primaryWallet:any, factoryContract:any) => {
  // Owner address (this could be the signer's address)
 
  const ownerAddress = primaryWallet?.address;
 
  // Encode the owner address as bytes
  const abiCoder = new ethers.AbiCoder();
 
  const owners = [abiCoder.encode(['address'], [ownerAddress])];
 
  // Define a nonce (should be unique)
  const nonce = "0x0";
 
  // Estimate gas for the transaction
  // const gasEstimate = await factoryContract.estimateGas.createAccount(owners, nonce, {
  //     value: ethers.parseEther('0') // Example value to send with the transaction
  // });
  const address = await factoryContract.getAddress(owners, nonce);
  console.log('Predicted smart wallet address:', address);
 
  console.log('Sending transaction...');
 
  // Execute the transaction
  
  const tx = await factoryContract.createAccount(owners, nonce, {
      value: ethers.parseEther('0'), 
      gasLimit: "500000"
  });
 
  console.log('Transaction hash:', tx.hash);
 
  // Wait for the transaction to be mined
  const receipt = await tx.wait();
  return address;
}
export {useCreateSmartWallet};