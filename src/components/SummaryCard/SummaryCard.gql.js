import { gql } from '@apollo/client'

export const ACCOUNT_QUERY = gql`
  query ($id: ID!) {
    account(id: $id) {
      id
      accountWithToken {
        id
        balance
      }
      flowsOwned {
        id
      }
    }
  }
`
