import gql from "graphql-tag"
import { Query } from "react-apollo"

const query = gql`
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

export default class MeQuery extends Query<Data> {
  static defaultProps = {
    query,
  }
}
