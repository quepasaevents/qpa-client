import {QueryHookOptions, useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const query = gql`
  query EventsQuery($filter: OccurrencesQueryFilter!, $language: String!) {
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
        info(lang: $language) {
          title
          description
        }
        tags {
          id
          name
          translation(language: $language) {
            id
            language
            text
          }
        }
      }
    }
  }
`

interface Variables {
  filter: GQL.IOccurrencesQueryFilter,
  language: string
}

export interface InfoData {
  language: string
  title: string
}

interface TagData {
  id: string
  name: string
  translation: {
    id: string
    language: string
    text: string
  }
}

export interface OccurrenceData {
  id: string
  start: string
  end: string
  event: {
    id: string
    info: InfoData
    location: {
      address: string
      name: string
    }
    tags: TagData[]
  }
}

interface Data {
  occurrences: OccurrenceData[]
}

const useOccurrencesQuery = (options?: QueryHookOptions<Data,Variables>) => useQuery<Data, Variables>(query, options)
export default useOccurrencesQuery
