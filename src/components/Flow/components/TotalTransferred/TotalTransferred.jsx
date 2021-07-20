import { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useInterval } from 'react-use'

import { GET_FLOW_QUERY } from './TotalTransferred.gql'

export function TotalTransferred({ flowUpdatedId }) {
  const [totalTransferred, setTotalTransferred] = useState(0)

  const [
    getFlow,
    {
      data: {
        flowUpdated: {
          flow: { token = {} } = {},
          flowRate = 0,
          transaction: { timestamp } = {},
        } = {},
      } = {},
    },
  ] = useLazyQuery(GET_FLOW_QUERY, {
    variables: { id: flowUpdatedId },
  })

  useEffect(() => {
    if (flowUpdatedId) getFlow()
  }, [flowUpdatedId, getFlow])

  useInterval(
    () => {
      const secondsElapsed = Date.now() / 1000 - timestamp
      setTotalTransferred((secondsElapsed * flowRate) / Math.pow(10, 18))
    },
    flowRate && timestamp ? 1000 / 60 : null,
  )

  return `${totalTransferred.toFixed(10)} ${token.symbol}`
}
