
// import Safe from '@safe-global/protocol-kit';
// import { SafeTransactionDataPartial } from '@safe-global/safe-core-sdk-types';
// import { toast } from 'react-toastify';
// import {}


// const {getSigner} = 

// export const safeTransaction = () => {

//   const createTransaction = async (
//       safe: Safe,
//       to: string,
//       value: string,
//       data: string
//     ) => {
//       const safeTransactionData: SafeTransactionDataPartial = {
//         to,
//         value,
//         data,
//       };
  
//       const safeTransaction = await safe.createTransaction({ safeTransactionData });
//       return safeTransaction;
//     };
  
//     const executeTransaction = async (safe: Safe, transaction: any) => {
//       try {
//         const executeTxResponse = await safe.executeTransaction(transaction);
//         await executeTxResponse.transactionResponse?.wait(); // Wait for the transaction to be mined
//         toast.success("Transaction executed successfully!");
//       } catch (error) {
//         toast.error("Failed to execute transaction");
//         console.error("Error executing transaction:", error);
//       }
//     };
  
//     const sendTransaction = async (to: string, value: string, data: string) => {
//       const signer = await getSigner();
//       if (!signer) return;
  
//       if (!safeAddress) {
//         toast.error("Safe address not found");
//         return;
//       }
  
//       const safe = await initializeSafe(safeAddress, signer);
  
//       const safeTransaction = await createTransaction(safe, to, value, data);
//       await executeTransaction(safe, safeTransaction);
//     };

//     return {createTransaction, executeTransaction, sendTransaction}

// }