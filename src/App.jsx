import { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import styled from 'styled-components'

import { Flow } from './components'

const Avatar = styled.div({
  backgroundColor: 'dodgerblue',
  borderRadius: '50px',
  height: '100px',
  width: '100px',
})

const QUERY = gql`
  query ($id: ID!) {
    accounts(where: { id: $id }) {
      id
      accountWithToken {
        id
        balance
      }
      flowsOwned {
        id
        sum
        flowRate
        lastUpdate
        recipient {
          id
        }
      }
    }
  }
`

export function App() {
  // const [me, setMe] = useState(null)
  const [address, setAddress] = useState(null)

  const [
    getAccounts,
    {
      data: { accounts, accounts: [{ flowsOwned = [] } = {}] = [] } = {},
      error,
    },
  ] = useLazyQuery(QUERY, { variables: { id: address } })

  console.log('accounts', accounts)
  console.log('error', error)

  // const isConnected = window.ethereum.isConnected()

  async function connect() {
    try {
      const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum),
      })

      await sf.initialize()

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const me = sf.user({
        address: accounts[0],
        // Rinkeby fDAIx address https://docs.superfluid.finance/superfluid/networks/networks
        token: '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90',
      })
      setAddress(me.address)
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
    if (address) {
      getAccounts()
      // ;(async () => {
      //   const details = await me.details()
      //   console.log('details', details)
      // })()
    }
  }, [getAccounts, address])

  return (
    <div>
      {!address ? <button onClick={connect}>Connect</button> : null}
      {address ? (
        <>
          <Avatar />
          <h1>{address}</h1>
          <h2>flows</h2>
          {flowsOwned.map(({ id }) => (
            <Flow id={id} />
          ))}
        </>
      ) : null}
    </div>
  )
}
