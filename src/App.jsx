import { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import styled, { createGlobalStyle } from 'styled-components'
import { transparentize } from 'polished'
import Icon from '@mdi/react'
import { mdiAccountEdit } from '@mdi/js'

import { Anchor, Flow } from './components'

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

const Heading = styled.h3({
  color: 'white',
  display: 'flex',
  fontSize: '0.9rem',
  fontWeight: 600,
  letterSpacing: 1.2,
  lineHeight: 1,
  margin: '0 0 0.5rem',
  padding: '0.5rem calc(0.5rem + 2px)',
  position: 'relative',
  textTransform: 'uppercase',
  ':before': {
    borderLeft: '3px solid white',
    borderTop: '3px solid white',
    content: '""',
    height: '0.75rem',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '0.75rem',
  },
})

const Avatar = styled.div({
  alignItems: 'center',
  border: '4px solid white',
  borderRadius: '100px',
  color: 'white',
  cursor: 'pointer',
  display: 'flex',
  height: '200px',
  justifyContent: 'center',
  width: '200px',
  ':hover': {
    background: 'white',
    color: 'black',
  },
})

const Button = styled.button(() => ({
  appearance: 'none',
  // background: transparentize(0.2, 'white'),
  background: 'none',
  border: '4px solid white',
  borderRadius: '1000px',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1.3rem',
  fontWeight: 600,
  outline: 'none',
  padding: '1rem 2rem',
  transitionDuration: '100ms',
  ':hover': {
    background: 'white',
    color: 'black',
  },
}))

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
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '480px',
            overflow: 'hidden',
            padding: '1rem',
            width: '100%',
          }}
        >
          {address ? (
            <>
              <Avatar src="https://source.unsplash.com/500x500/?portrait">
                <Icon color="currentColor" path={mdiAccountEdit} size="80px" />
              </Avatar>
              <Row>
                <Heading>Wallet Address</Heading>
                <Anchor
                  href={`https://rinkeby.etherscan.io/address/${address}`}
                >
                  {address}
                </Anchor>
              </Row>

              <Row>
                <Heading>Flows</Heading>
                {flowsOwned.map(({ id }) => (
                  <Flow id={id} />
                ))}
              </Row>
            </>
          ) : (
            <Row>
              <Button onClick={connect}>Continue with MetaMask</Button>
            </Row>
          )}
        </div>
      </div>
    </>
  )
}
