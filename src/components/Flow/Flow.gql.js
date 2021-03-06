import { gql } from '@apollo/client'

export const GET_FLOW_QUERY = gql`
  query ($id: ID!) {
    flowUpdateds(where: { flow_contains: $id }) {
      id
      flowRate
      transaction {
        id
        timestamp
      }
      flow {
        owner {
          id
          accountWithToken {
            id
            balance
          }
        }
        recipient {
          id
        }
        token {
          id
          symbol
        }
      }
    }
  }
`
