import { useQuery } from '@apollo/client'
import { mdiWalletOutline, mdiClockStart, mdiClockOut } from '@mdi/js'

import { IconRow } from '../IconRow'
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
      <div>
        <IconRow
          href={`https://rinkeby.etherscan.io/address/${recipient.id}`}
          icon={mdiWalletOutline}
          text={recipient.id}
        />

        <IconRow
          icon={mdiClockOut}
          text={`${(flowRate / Math.pow(10, 18)).toFixed(8)} ${symbol}/s`}
        />

        <IconRow
          icon={mdiClockStart}
          text={<TotalTransferred flowUpdatedId={flowUpdatedId} />}
        />
      </div>
    </Styled.Flow>
  )
}
