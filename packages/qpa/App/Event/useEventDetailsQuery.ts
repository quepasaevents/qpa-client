import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const query = gql`
  query GetOccurrenceDetails($eventId: ID!) {
    event(id: $eventId) {
      id
      owner {
        id
        name
      }
      infos {
        description
        language
        title
      }
      occurrences {
        id
        start
        end
      }
    }
  }
`

export interface EventDetailsData {
  id: string
  owner: {
    id: string
    name: string
  }
  infos: Array<{
    description
    language
    title
  }>
  occurrences: {
    id: string
    start: string
    end: string
  }
}

interface Data {
  event: EventDetailsData
}
interface Variables {
  eventId: string
}

const useEventDetailsQuery = (
  options: QueryHookOptions<Data, Variables>
) => useQuery<Data, Variables>(query, options)

export default useEventDetailsQuery
