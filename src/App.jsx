import { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import styled, { createGlobalStyle } from 'styled-components'
import { motion } from 'framer-motion'

import { Anchor, Avatar, Button, Flow, Heading } from './components'

const GlobalStyle = createGlobalStyle(
  ({
    theme: {
      palette: { white },
    },
  }) => ({
    '*': {
      boxSizing: 'border-box',
    },
    body: {
      fontFamily: 'sans-serif',
      margin: 0,
      padding: 0,
    },
  }),
)

const Row = styled.div({
  marginTop: '2rem',
  width: '100%',
})

const QUERY = gql`
  query ($id: ID!) {
    account(id: $id) {
      id
      accountWithToken {
        id
        balance
      }
      flowsOwned {
        id
      }
    }
  }
`

export function App() {
  const [address, setAddress] = useState(null)

  const [
    getAccounts,
    { data: { account: { flowsOwned = [] } = {} } = {}, error },
  ] = useLazyQuery(QUERY, { variables: { id: address } })

  useEffect(() => {
    if (address) getAccounts()
  }, [getAccounts, address])

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

  return (
    <>
      <GlobalStyle />
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {address ? (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            style={{
              alignItems: 'center',
              backdropFilter: 'blur(6px)',
              backgroundColor: 'hsla(0, 0%, 0%, 0.15)',
              borderRadius: '1rem',
              boxShadow: '0 0 2rem 1rem hsla(0, 0%, 0%, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '480px',
              overflow: 'hidden',
              padding: '2rem',
              width: '100%',
            }}
          >
            <Avatar />
            <Row>
              <Heading>Wallet Address</Heading>
              <Anchor href={`https://rinkeby.etherscan.io/address/${address}`}>
                {address}
              </Anchor>
            </Row>

            <Row>
              <Heading>Flows</Heading>
              {flowsOwned.map(({ id }) => (
                <Flow id={id} />
              ))}
            </Row>
          </motion.div>
        ) : (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0, duration: 2 }}
          >
            <Button onClick={connect}>Continue with MetaMask</Button>
          </motion.div>
        )}
      </div>
    </>
  )
}
