import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

export const query = gql`
    query Me {
      me {
        id
        name
        events {
          id
        }
        roles {
          type
        }
      }
    }
`

export interface UserEventData {
  id: string
}

export interface UserData {
  id: string
  name: string
  events: UserEventData[]
  roles: Array<{
    type: string
  }>
}

interface Data {
  me?: UserData
}

const useMeQuery = () => useQuery<Data>(query)
export default useMeQuery
