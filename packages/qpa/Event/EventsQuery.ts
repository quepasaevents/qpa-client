import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
    query EventsQuery($filter: EventsQueryFilter!) {
        events(filter: $filter) {
            id
            status
            infos {
                title
                description
                language
            }
        }
    }
`

interface Variables {
  filter: {
    limit?: number
    owner?: number
    from?: string
    to?: string
    categories?: string[]
  }
}

export interface EventData {
  id: string
  status: string
  infos: Array<{
    title: string
    description: string
    language: string
  }>
}

interface Data {
  events: EventData[]
}

export default class EventsQuery extends Query<Data, Variables> {
  static defaultProps = {
    query
  }
}
