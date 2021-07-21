import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import SuperfluidSDK from '@superfluid-finance/js-sdk'
import { Web3Provider } from '@ethersproject/providers'

import { Anchor } from '../Anchor'
import { Avatar } from '../Avatar'
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

  useEffect(() => {
    ;(async () => {
      const sf = new SuperfluidSDK.Framework({
        ethers: new Web3Provider(window.ethereum),
      })

      // This throws the following error for new domain connections so have commented out for now
      // Error: unknown account #0 (operation="getAddress", code=UNSUPPORTED_OPERATION, version=providers/5.4.1)
      // await sf.initialize()

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const me = sf.user({
        address: accounts[0],
        // Rinkeby fDAIx address https://docs.superfluid.finance/superfluid/networks/networks
        token: '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90',
      })

      setAddress(me.address)
    })()
  }, [])

  return (
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
  )
}
