import { useQuery } from '@apollo/client'

import { GET_FLOW_BY_ID } from './Flow.gql'

export function Flow({ id }) {
  const {
    data,
    data: { flow: { flowRate, recipient = {}, token = {} } = {} } = {},
    error,
  } = useQuery(GET_FLOW_BY_ID, {
    variables: { id },
  })

  console.log('flow', id, data)
  console.log(error)

  return (
    <>
      <h4>to: {recipient.id}</h4>
      <h4>
        flow rate: {flowRate / Math.pow(10, 18)} {token.symbol}/s
      </h4>
    </>
  )
}
