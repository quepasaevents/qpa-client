import { QueryHookOptions, useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import {
  EventDetailsDataFragment,
  EventDetailsData,
} from "./useEventDetailsQuery"

const query = gql`
  ${EventDetailsDataFragment}
  query GetOccurrenceDetails($id: ID!) {
    occurrence(id: $id) {
      start
      end
      event {
        ...EventDetailsData
      }
    }
  }
`

interface Data {
  occurrence: {
    start: string
    end: string
    event: EventDetailsData
  }
}

interface Variables {
  id: string
}

const useOccurrenceDetailsQuery = (
  options?: QueryHookOptions<Data, Variables>
) => useQuery<Data, Variables>(query, options)

export default useOccurrenceDetailsQuery
