import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

const query = gql`
  query GetOccurrenceDetails($occurrenceId: ID!) {
    occurrence(id: $occurrenceId) {
      id
      start
      end
      event {
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
      }
    }
  }
`

export interface OccurrenceDetailsData {
  occurrence: {
    id: string
    start: string
    end: string
    event: {
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
    }
  }
}

interface Variables {
  occurrenceId: string
}

const useOccurrenceDetailsQuery = (
  options: QueryHookOptions<OccurrenceDetailsData, Variables>
) => useQuery<OccurrenceDetailsData, Variables>(query, options)

export default useOccurrenceDetailsQuery
