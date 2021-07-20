import { useEffect, useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import styled, { createGlobalStyle, css, keyframes } from 'styled-components'
import { transparentize } from 'polished'

import { Background, Flow } from './components'

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

const Avatar = styled.img({
  border: `4px solid ${transparentize(0.1, 'white')}`,
  borderRadius: '100px',
  height: '200px',
  width: '200px',
})

const MyWalletAddress = styled.span({
  color: transparentize(0.1, 'white'),
  fontWeight: 600,
})

const Button = styled.button(() => ({
  appearance: 'none',
  // background: transparentize(0.2, 'white'),
  background: 'none',
  border: `4px solid ${transparentize(0.2, 'white')}`,
  borderRadius: '1000px',
  color: transparentize(0.2, 'white'),
  cursor: 'pointer',
  fontSize: '1.4rem',
  fontWeight: 600,
  outline: 'none',
  padding: '1rem',
  transitionDuration: '100ms',
  ':hover': {
    borderColor: transparentize(0.1, 'white'),
    color: transparentize(0.1, 'white'),
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
          width: '100vw',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '640px',
          }}
        >
          <Avatar src="https://source.unsplash.com/500x500/?portrait" />

          {address ? (
            <>
              <Row>
                <MyWalletAddress>{address}</MyWalletAddress>
              </Row>

              <Row>
                <h2 style={{ color: 'white', margin: 0, padding: 0 }}>Flows</h2>
              </Row>
              <Row>
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
