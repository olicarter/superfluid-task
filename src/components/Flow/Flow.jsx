import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import { transparentize } from 'polished'

import { TotalTransferred } from './components'

import { GET_FLOW_QUERY } from './Flow.gql'

const Avatar = styled.img({
  border: `4px solid ${transparentize(0.1, 'white')}`,
  borderRadius: '30px',
  height: '60px',
  width: '60px',
})

export function Flow({ id }) {
  const {
    data: {
      flowUpdateds: [
        {
          id: flowUpdatedId,
          flow: { recipient = {}, token = {} } = {},
          flowRate = 0,
        } = {},
      ] = [],
    } = {},
  } = useQuery(GET_FLOW_QUERY, {
    variables: { id },
  })

  return (
    <>
      <div
        style={{
          color: 'white',
          display: 'flex',
          fontWeight: 600,
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Avatar src="https://source.unsplash.com/500x500/?avatar" />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: '1rem',
          }}
        >
          <div>
            {flowRate / Math.pow(10, 18)} {token.symbol}/s
          </div>
          <TotalTransferred flowUpdatedId={flowUpdatedId} />
        </div>
      </div>
    </>
  )
}
