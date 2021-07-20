import { gql } from '@apollo/client'

export const GET_FLOW_QUERY = gql`
  query ($id: ID!) {
    flowUpdated(id: $id) {
      id
      flowRate
      transaction {
        id
        timestamp
      }
      flow {
        id
        token {
          id
          symbol
        }
      }
    }
  }
`
