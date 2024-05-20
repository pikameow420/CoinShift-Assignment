import { Button } from '@/components/ui/button'
import { useWeb3Modal } from '@web3modal/ethers/react'
import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { useEffect } from 'react'

interface ConnectWalletProps {
  setAddress: (address: string | null) => void
  setChainId: (chainId: number | null) => void
  setIsConnected: (isConnected: boolean) => void
  handleStepAdvance: () => void
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ setAddress, setChainId, setIsConnected, handleStepAdvance }) => {
  const { open } = useWeb3Modal()
  const { address, chainId, isConnected } = useWeb3ModalAccount()

  useEffect(() => {
    if (isConnected) {
      setAddress(address ?? null)
      setChainId(chainId ?? null)
      setIsConnected(isConnected)
      handleStepAdvance()
    }
  }, [address, chainId, isConnected, setAddress, setChainId, setIsConnected, handleStepAdvance])

  return (
    <Button onClick={() => open()}>Connect Wallet</Button>
  )
}

export default ConnectWallet