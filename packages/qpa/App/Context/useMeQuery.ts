import gql from "graphql-tag"
import { useQuery } from "@apollo/react-hooks"

export const query = gql`
    query Me {
      me {
        id
        username
        events {
          id
        }
      }
    }
`

export interface UserEventData {
  id: string
}

export interface UserData {
  id: string
  username: string
  events: UserEventData[]
}

interface Data {
  me: UserData
}

const useMeQuery = () => useQuery<Data>(query)
export default useMeQuery
