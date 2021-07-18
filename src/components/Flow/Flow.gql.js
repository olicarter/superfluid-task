import { gql } from '@apollo/client'

export const GET_FLOW_BY_ID = gql`
  query ($id: ID!) {
    flow(id: $id) {
      id
      sum
      flowRate
      lastUpdate
      recipient {
        id
      }
      token {
        id
        symbol
      }
    }
  }
`
