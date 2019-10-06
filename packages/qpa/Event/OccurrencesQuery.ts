import {Query} from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
  query EventsQuery($filter: OccurrencesQueryFilter!) {
    occurrences(filter: $filter) {
      id
      start
      end
      event {
        id
        location {
          address
          name
        }
        infos {
          language
          title
        }
      }
    }
  }
`

interface Variables {
  filter: GQL.IOccurrencesQueryFilter
}

export interface InfoData {
  language: string
  title: string
}

export interface OccurrenceData {
  id: string
  start: string
  end: string
  event: {
    id: string
    infos: InfoData[]
    location: {
      address: string
      name: string
    }
  }
}

interface Data {
  occurrences: OccurrenceData[]
}

export default class OccurrencesQuery extends Query<Data, Variables> {
  static defaultProps = {
    query
  }
}
