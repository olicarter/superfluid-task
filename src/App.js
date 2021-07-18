import { useEffect, useState } from 'react'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'

export function App() {
  const [me, setMe] = useState(null)

  const isConnected = window.ethereum.isConnected()

  async function handleAccountsChanged() {}

  async function connect() {
    try {
      const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum),
      })

      await sf.initialize()

      const walletAddress = await window.ethereum.request({
        method: 'eth_requestAccounts',
        // params: [{ eth_accounts: {} }],
      })
      console.log('walletAddress', walletAddress)
      setMe(
        sf.user({
          address: walletAddress[0],
          // Rinkeby fDAIx address https://docs.superfluid.finance/superfluid/networks/networks
          token: '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90',
        }),
      )
    } catch (error) {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.')
      } else {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (me) {
      ;(async () => {
        const details = await me.details()
        console.log('details', details)
      })()
    }
  }, [me])

  return (
    <div>
      Superfluid task
      {!me ? <button onClick={connect}>Connect</button> : null}
    </div>
  )
}
