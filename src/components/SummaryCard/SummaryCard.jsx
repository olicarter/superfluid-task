import { useState } from 'react'
import { useQuery } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'
import { motion } from 'framer-motion'

import { Anchor } from '../Anchor'
import { Avatar } from '../Avatar'
import { Button } from '../Button'
import { Flow } from '../Flow'
import { Heading } from '../Heading'

import { ACCOUNT_QUERY } from './SummaryCard.gql'
import * as Styled from './SummaryCard.styled'

export function SummaryCard() {
  const [address, setAddress] = useState(null)

  const { data: { account: { flowsOwned = [] } = {} } = {} } = useQuery(
    ACCOUNT_QUERY,
    { variables: { id: address } },
  )

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

  return address ? (
    <Styled.Card animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      <Avatar />

      <Styled.Row>
        <Heading>Wallet Address</Heading>

        <Anchor href={`https://rinkeby.etherscan.io/address/${address}`}>
          {address}
        </Anchor>
      </Styled.Row>

      <Styled.Row>
        <Heading>Flows</Heading>

        {flowsOwned.map(({ id }) => (
          <Flow key={id} id={id} />
        ))}
      </Styled.Row>
    </Styled.Card>
  ) : (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0, duration: 2 }}
    >
      <Button onClick={connect}>Continue with MetaMask</Button>
    </motion.div>
  )
}
