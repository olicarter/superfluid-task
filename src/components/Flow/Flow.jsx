import { useQuery } from '@apollo/client'
import Icon from '@mdi/react'
import { mdiWalletOutline, mdiClockStart, mdiClockOut } from '@mdi/js'

import { Anchor } from '../Anchor'
import { TotalTransferred } from './components'

import { GET_FLOW_QUERY } from './Flow.gql'
import * as Styled from './Flow.styled'

export function Flow({ id }) {
  const {
    data: {
      flowUpdateds: [
        {
          id: flowUpdatedId,
          flow: { recipient = {}, token: { symbol = '' } = {} } = {},
          flowRate = 0,
        } = {},
      ] = [],
    } = {},
  } = useQuery(GET_FLOW_QUERY, {
    variables: { id },
  })

  return (
    <Styled.Flow>
      {/* <Styled.Avatar src="https://source.unsplash.com/500x500/?avatar" /> */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            padding: '0 0 0.5rem',
          }}
        >
          <div style={{ display: 'flex', paddingRight: '0.5rem' }}>
            <Icon color="white" path={mdiWalletOutline} size="20px" />
          </div>
          <Anchor href={`https://rinkeby.etherscan.io/address/${recipient.id}`}>
            {recipient.id}
          </Anchor>
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            padding: '0 0 0.5rem',
          }}
        >
          <div style={{ display: 'flex', paddingRight: '0.5rem' }}>
            <Icon color="white" path={mdiClockOut} size="20px" />
          </div>
          {(flowRate / Math.pow(10, 18)).toFixed(8)} {symbol}/s
        </div>

        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            padding: '0 0 0.5rem',
          }}
        >
          <div style={{ display: 'flex', paddingRight: '0.5rem' }}>
            <Icon color="white" path={mdiClockStart} size="20px" />
          </div>
          <TotalTransferred flowUpdatedId={flowUpdatedId} />
        </div>
      </div>
    </Styled.Flow>
  )
}
